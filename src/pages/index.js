import { CircularProgress, Container, Typography } from "@mui/material";
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
      } else {
        router.push("/social");
      }
    }
  }, [user, router]);

  console.log(user);
  return (
    <Container
      disableGutters
      maxWidth="md"
      component="main"
      align="center"
      sx={{ pt: 8, pb: 6 }}
    >
      <CircularProgress />
    </Container>
  );
}
