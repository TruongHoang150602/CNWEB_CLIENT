import { useState } from "react";
// @mui
import { styled } from "@mui/material/styles";

//
import Nav from "./nav";
import Header from "./header";
import withAuthGuard from "guards/auth-guard";

// ----------------------------------------------------------------------

const APP_BAR_MOBILE = 64;
const APP_BAR_DESKTOP = 92;

const StyledRoot = styled("div")(({ theme }) => ({
  backgroundColor: theme.palette.background.default,
  backgroundRepeat: "repeat",
  backgroundPosition: "top center",
  backgroundImage: 'url("/background/background2.jpg")',
  display: "flex",
  width: "100%",
  minHeight: "100%",
  overflow: "hidden",
}));

const Main = styled("div")(({ theme }) => ({
  flexGrow: 1,
  overflow: "auto",
  minHeight: "100vh",
  paddingTop: APP_BAR_MOBILE + 24,
  paddingBottom: theme.spacing(10),
  paddingBottom: "30px",

  [theme.breakpoints.up("lg")]: {
    paddingTop: APP_BAR_DESKTOP + 24,
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
  },
}));

// ----------------------------------------------------------------------

const DashboardLayout = withAuthGuard((props) => {
  const { children } = props;

  const [open, setOpen] = useState(false);

  return (
    <StyledRoot>
      <Header onOpenNav={() => setOpen(true)} />
      <Nav openNav={open} onCloseNav={() => setOpen(false)} />
      <Main>{children}</Main>
    </StyledRoot>
  );
});

export default DashboardLayout;
