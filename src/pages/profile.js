import { useCallback, useEffect, useState } from "react";
import NextLink from "next/link";
import Head from "next/head";
import MessageChatSquareIcon from "@untitled-ui/icons-react/build/esm/MessageChatSquare";
import DotsHorizontalIcon from "@untitled-ui/icons-react/build/esm/DotsHorizontal";
import Image01Icon from "@untitled-ui/icons-react/build/esm/Image01";
import UserPlus02Icon from "@untitled-ui/icons-react/build/esm/UserPlus02";
import {
  Avatar,
  Box,
  Button,
  Container,
  Divider,
  IconButton,
  Stack,
  SvgIcon,
  Tab,
  Tabs,
  Tooltip,
  Typography,
} from "@mui/material";
import { blueGrey } from "@mui/material/colors";
import { Layout as DashboardLayout } from "layouts/dashboard";
import { SocialTimeline } from "sections/dashboard/social/social-timeline";

const useProfile = () => {
  const [profile, setProfile] = useState(null);

  const getProfile = useCallback(async () => {
    try {
      const response = await socialApi.getProfile();

      if (isMounted()) {
        setProfile(response);
      }
    } catch (err) {
      console.error(err);
    }
  }, [isMounted]);

  useEffect(
    () => {
      getProfile();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  return profile;
};

const usePosts = () => {
  const [posts, setPosts] = useState([]);

  const getPosts = useCallback(async () => {
    try {
      const response = await socialApi.getPosts();

      if (isMounted()) {
        setPosts(response);
      }
    } catch (err) {
      console.error(err);
    }
  }, [isMounted]);

  useEffect(
    () => {
      getPosts();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  return posts;
};

export const SocialProfile = () => {
  const profile = useProfile();
  const posts = usePosts();

  if (!profile) {
    return null;
  }

  return (
    <>
      <Head>
        <title>Profile</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth="lg">
          <div>
            <Box
              style={{ backgroundImage: `url("/background/subtle-prism.svg")` }}
              sx={{
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
                borderRadius: 1,
                height: 348,
                position: "relative",
                "&:hover": {
                  "& button": {
                    visibility: "visible",
                  },
                },
              }}
            >
              <Button
                startIcon={
                  <SvgIcon>
                    <Image01Icon />
                  </SvgIcon>
                }
                sx={{
                  backgroundColor: blueGrey[900],
                  bottom: {
                    lg: 24,
                    xs: "auto",
                  },
                  color: "common.white",
                  position: "absolute",
                  right: 24,
                  top: {
                    lg: "auto",
                    xs: 24,
                  },
                  visibility: "hidden",
                  "&:hover": {
                    backgroundColor: blueGrey[900],
                  },
                }}
                variant="contained"
              >
                Change Cover
              </Button>
            </Box>
            <Stack
              alignItems="center"
              direction="row"
              spacing={2}
              sx={{ mt: 5 }}
            >
              <Stack alignItems="center" direction="row" spacing={2}>
                <Avatar
                  src={profile.avatar}
                  sx={{
                    height: 64,
                    width: 64,
                  }}
                />
                <div>
                  <Typography color="text.secondary" variant="overline">
                    {profile.bio}
                  </Typography>
                  <Typography variant="h6">{profile.name}</Typography>
                </div>
              </Stack>
              <Box sx={{ flexGrow: 1 }} />
              <Stack
                alignItems="center"
                direction="row"
                spacing={2}
                sx={{
                  display: {
                    md: "block",
                    xs: "none",
                  },
                }}
              >
                <Button
                  component={NextLink}
                  href="/chat"
                  size="small"
                  startIcon={
                    <SvgIcon>
                      <MessageChatSquareIcon />
                    </SvgIcon>
                  }
                  variant="contained"
                >
                  Send Message
                </Button>
              </Stack>
              <Tooltip title="More options">
                <IconButton>
                  <SvgIcon>
                    <DotsHorizontalIcon />
                  </SvgIcon>
                </IconButton>
              </Tooltip>
            </Stack>
          </div>

          <Box sx={{ mt: 3 }}>
            <SocialTimeline posts={posts} profile={profile} />
          </Box>
        </Container>
      </Box>
    </>
  );
};

SocialProfile.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default SocialProfile;
