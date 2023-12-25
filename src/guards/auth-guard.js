// Combined AuthGuard and withAuthGuard
import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/router";
import PropTypes from "prop-types";
import { useAuth } from "hook/useAuth";

const AuthGuard = ({ children }) => {
  const router = useRouter();
  const { isAuthenticated } = useAuth();
  const [checked, setChecked] = useState(false);

  const check = useCallback(() => {
    if (!isAuthenticated) {
      const searchParams = new URLSearchParams({
        returnTo: globalThis.location.href,
      }).toString();
      router.replace("/auth/login");
    } else {
      setChecked(true);
    }
  }, [isAuthenticated, router]);

  useEffect(() => {
    check();
  }, []);

  if (!checked) {
    return null;
  }

  return <>{children}</>;
};

AuthGuard.propTypes = {
  children: PropTypes.node,
};

const withAuthGuard = (Component) => (props) =>
  (
    <AuthGuard>
      <Component {...props} />
    </AuthGuard>
  );

export default withAuthGuard;
