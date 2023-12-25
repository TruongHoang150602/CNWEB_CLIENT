import { useTheme } from "@mui/material/styles";
import Image from "next/image";

export const Logo = () => {
  const theme = useTheme();

  return <Image width={40} height={40} src="/logo.png" alt="/logo.png"></Image>;
};
