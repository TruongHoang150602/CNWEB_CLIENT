import NextLink from "next/link";
import PropTypes from "prop-types";
import { Box, Container, Stack } from "@mui/material";
import { styled } from "@mui/material/styles";
import { Logo } from "components/logo";
import { AccountButton } from "./account-button";
import { NotificationsButton } from "./notifications-button";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
import SchoolOutlinedIcon from "@mui/icons-material/SchoolOutlined";
import { useRouter } from "next/router";
import TopNav from "./top-nav";
const TOP_NAV_HEIGHT = 64;

const LayoutRoot = styled("div")(({ theme }) => ({
  backgroundColor: theme.palette.background.default,
  backgroundRepeat: "repeat",
  backgroundPosition: "top center",
  backgroundImage: 'url("/background/background2.jpg")',
  display: "flex",
  flex: "1 1 auto",
  flexDirection: "column",
  height: "100%",
}));

export const Layout = (props) => {
  const { children } = props;
  return (
    <LayoutRoot>
      <Box
        component="header"
        sx={{
          backgroundColor: "#f0f0f0",
          left: 0,
          position: "fixed",
          right: 0,
          top: 0,
          zIndex: (theme) => theme.zIndex.appBar,
        }}
      >
        <Container maxWidth="lg">
          <Stack direction="row" spacing={2} sx={{ height: TOP_NAV_HEIGHT }}>
            <Stack
              alignItems="center"
              justifyContent="center"
              component={NextLink}
              direction="row"
              display="inline-flex"
              href="/blog"
              spacing={1}
              sx={{ textDecoration: "none" }}
            >
              <Box
                sx={{
                  display: "inline-flex",
                  height: 24,
                  width: 24,
                }}
              >
                <Logo />
              </Box>
              <Box
                sx={{
                  color: "text.primary",
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  fontSize: 14,
                  fontWeight: 800,
                  letterSpacing: "0.3px",
                  lineHeight: 2.5,
                  "& span": {
                    color: "primary.main",
                  },
                }}
              >
                Quizzify<span>ME</span>
              </Box>
            </Stack>

            <Stack
              alignItems="center"
              direction="row"
              sx={{
                flex: 1,
                justifyContent: "center",
                backgroundColor: "#f0f0f0", // Background color for the tabs
                borderRadius: "8px", // Border radius for rounded corners
                padding: "8px", // Padding for each tab
              }}
            >
              <TopNav href="/blog">
                <HomeRoundedIcon sx={{ width: "32px", height: "32px" }} />
              </TopNav>
              <TopNav href="/chat">
                <ChatBubbleOutlineOutlinedIcon
                  sx={{ width: "32px", height: "32px" }}
                />
              </TopNav>
              <TopNav href="/education">
                <SchoolOutlinedIcon sx={{ width: "32px", height: "32px" }} />
              </TopNav>
            </Stack>

            <Stack
              alignItems="center"
              direction="row"
              spacing={4}
              sx={{ justifyContent: "flex-end" }}
            >
              <NotificationsButton />
              {/* <ContactsButton /> */}
              <AccountButton />
            </Stack>
          </Stack>
        </Container>
      </Box>
      <Box
        sx={{
          alignItems: "center",
          display: "flex",
          justifyContent: "center",
          flex: "1 1 auto",
        }}
      >
        <Container
          maxWidth="lg"
          sx={{
            pt: "100px",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {children}
        </Container>
      </Box>
    </LayoutRoot>
  );
};

Layout.propTypes = {
  children: PropTypes.node,
};
