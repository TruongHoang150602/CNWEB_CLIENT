import { Typography } from "@mui/material";
import { useAuth } from "hook/useAuth";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function Page() {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== "undefined") {
      if (!user) {
        router.push("/auth/login");
      }
    }
  }, [user, router]);

  if (!user) {
    // Return some loading state or redirecting message
    return <Typography>Loading...</Typography>;
  }

  return <Typography>Home page</Typography>;
}
