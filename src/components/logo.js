import { useTheme } from "@mui/material/styles";

export const Logo = () => {
  const theme = useTheme();

  return <img src="/logo.png"></img>;
};
