import { useCallback, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { alpha } from "@mui/material/styles";
import {
  Box,
  Divider,
  Typography,
  Stack,
  MenuItem,
  Avatar,
  IconButton,
  Popover,
} from "@mui/material";
import { useAuth } from "hook/useAuth";
import Iconify from "components/iconfy";
import toast from "react-hot-toast";

const MENU_OPTIONS = [
  {
    label: "Home",
    icon: "eva:home-fill",
    link: "/dashboard",
  },
  {
    label: "Profile",
    icon: "eva:person-fill",
    link: "/social/",
  },
  {
    label: "Settings",
    icon: "eva:settings-2-fill",
    link: "/setting",
  },
];

const AccountPopover = () => {
  const router = useRouter();
  const [open, setOpen] = useState(null);
  const auth = useAuth();
  const { user } = useAuth();

  const handleOpen = (event) => {
    setOpen(event.currentTarget);
  };

  const handleClose = useCallback(() => {
    setOpen(null);
  }, []);

  const handleSignOut = useCallback(async () => {
    try {
      handleClose();
      auth.signOut();
      router.push("/auth/login");
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong!");
    }
  }, [router, handleClose, auth]);

  return (
    <>
      <IconButton
        onClick={handleOpen}
        sx={{
          p: 0,
          ...(open && {
            "&:before": {
              zIndex: 1,
              content: "''",
              width: "100%",
              height: "100%",
              borderRadius: "50%",
              position: "absolute",
              bgcolor: (theme) => alpha(theme.palette.grey[900], 0.8),
            },
          }),
        }}
      >
        <Avatar src={user.avatar} alt="photoURL" />
      </IconButton>

      <Popover
        open={Boolean(open)}
        anchorEl={open}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        sx={{
          p: 0,
          mt: 1.5,
          ml: 0.75,
          width: 200,
          "& .MuiMenuItem-root": {
            typography: "body2",
            borderRadius: 0.75,
          },
        }}
      >
        <Box sx={{ my: 1.5, px: 2.5 }}>
          <Typography variant="subtitle2" noWrap>
            {user.name}
          </Typography>
          <Typography variant="body2" sx={{ color: "text.secondary" }} noWrap>
            {user.email}
          </Typography>
        </Box>

        <Divider sx={{ borderStyle: "dashed" }} />

        <Stack sx={{ p: 1 }}>
          {MENU_OPTIONS.map((option) => (
            <Link href={option.link} key={option.label}>
              <MenuItem>{option.label}</MenuItem>
            </Link>
          ))}
        </Stack>

        <Divider sx={{ borderStyle: "dashed" }} />

        <MenuItem onClick={handleSignOut} sx={{ m: 1 }}>
          Logout
        </MenuItem>
      </Popover>
    </>
  );
};

export default AccountPopover;
