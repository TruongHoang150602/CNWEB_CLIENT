import { Box } from "@mui/material";
import NextLink from "next/link";
import { useRouter } from "next/router";

const TopNav = ({ href, children }) => {
  const { pathname } = useRouter();
  console.log(pathname, href);
  const isActive = pathname === href;

  return (
    <Box
      component={NextLink}
      href={href}
      minWidth={100}
      className={isActive ? "active" : ""}
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        borderBottom: "2px solid transparent",
        color: "#555",
        "&:hover": {
          color: "#000",
        },
        "&.active": {
          color: "#007bff",
          borderBottomColor: "#007bff",
        },
      }}
    >
      {children}
    </Box>
  );
};

export default TopNav;
