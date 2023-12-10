import { Typography } from "@mui/material";
import useAuth from "hook/useAuth";
import { useRouter } from "next/router";

export default function Page() {
  const user = useAuth();
  const router = useRouter();
  if (!user) {
    router.push("/auth/login");
  }
  return <Typography>Home page</Typography>;
}
