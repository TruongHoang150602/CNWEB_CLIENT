import PropTypes from "prop-types";
import { useEffect } from "react";
import { useRouter } from "next/router";
import NextLink from "next/link"; // Replace Link from 'react-router-dom' with NextLink
import { styled, alpha } from "@mui/system"; // Import from '@mui/system' instead of '@mui/material/styles'
import {
  Box,
  Link,
  Button,
  Drawer,
  Typography,
  Avatar,
  Stack,
  useMediaQuery,
  Divider,
} from "@mui/material";

import { useAuth } from "hook/useAuth";
import { Scrollbar } from "components/scrollbar";
import { Logo } from "components/logo";
import NavSection from "components/nav-section/NavSection";
import navConfig from "./config";

const NAV_WIDTH = 280;

const StyledLogo = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  borderRadius: Number(theme.shape.borderRadius) * 1.5,
}));

const StyledAccount = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(2, 2.5),
  borderRadius: Number(theme.shape.borderRadius) * 1.5,
  backgroundColor: alpha(theme.palette.grey[500], 0.12),
}));

Nav.propTypes = {
  openNav: PropTypes.bool,
  onCloseNav: PropTypes.func,
};

export default function Nav({ openNav, onCloseNav }) {
  const router = useRouter(); // Use useRouter instead of useLocation

  const isDesktop = useMediaQuery((theme) => theme.breakpoints.up("lg"));
  const { user } = useAuth();
  useEffect(() => {
    if (openNav) {
      onCloseNav();
    }
  }, [router.asPath, openNav, onCloseNav]); // Use router.asPath instead of pathname

  const renderContent = (
    <Scrollbar
      sx={{
        height: 1,
        "& .simplebar-content": {
          height: 1,
          display: "flex",
          flexDirection: "column",
        },
      }}
    >
      <Box sx={{ px: 2.5, py: 3, display: "inline-flex" }}>
        <StyledLogo>
          <Logo />
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
            Quizzify<span>Me</span>
          </Box>
        </StyledLogo>
      </Box>

      <Box sx={{ mx: 2.5 }}>
        <NextLink href="/" passHref>
          <Link underline="none">
            <StyledAccount>
              <Avatar src={user.avatar} alt="photoURL" />

              <Box sx={{ ml: 2 }}>
                <Typography variant="subtitle2" sx={{ color: "text.primary" }}>
                  {user.name}
                </Typography>
              </Box>
            </StyledAccount>
          </Link>
        </NextLink>
      </Box>

      <NavSection data={navConfig} />

      <Divider />

      <Box sx={{ px: 2.5, pb: 3, mt: 10 }}>
        <Stack alignItems="center" spacing={3} sx={{ pt: 5, borderRadius: 2 }}>
          <Box
            component="img"
            src="/assets/illustrations/think.png"
            sx={{ width: 150, top: -50 }}
          />

          <Box sx={{ textAlign: "center" }}>
            <Typography variant="body2" sx={{ color: "text.secondary" }}>
              QuizzifyMe - Connect, Share, Learn - Where Social Networking gets
              Smart!
            </Typography>
          </Box>
        </Stack>
      </Box>
    </Scrollbar>
  );

  return (
    <Box
      component="nav"
      sx={{
        flexShrink: { lg: 0 },
        width: { lg: NAV_WIDTH },
      }}
    >
      {isDesktop ? (
        <Drawer
          open
          variant="permanent"
          PaperProps={{
            sx: {
              width: NAV_WIDTH,
              bgcolor: "background.default",
              borderRightStyle: "dashed",
            },
          }}
        >
          {renderContent}
        </Drawer>
      ) : (
        <Drawer
          open={openNav}
          onClose={onCloseNav}
          ModalProps={{
            keepMounted: true,
          }}
          PaperProps={{
            sx: { width: NAV_WIDTH },
          }}
        >
          {renderContent}
        </Drawer>
      )}
    </Box>
  );
}
