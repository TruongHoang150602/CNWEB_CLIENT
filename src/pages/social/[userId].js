import { useCallback, useEffect, useState } from "react";
import NextLink from "next/link";
import Head from "next/head";
import MessageChatSquareIcon from "@untitled-ui/icons-react/build/esm/MessageChatSquare";
import DotsHorizontalIcon from "@untitled-ui/icons-react/build/esm/DotsHorizontal";
import Image01Icon from "@untitled-ui/icons-react/build/esm/Image01";
import {
  Avatar,
  Box,
  Button,
  Container,
  IconButton,
  Stack,
  SvgIcon,
  Tooltip,
  Typography,
} from "@mui/material";
import { blueGrey } from "@mui/material/colors";
import { getFullUserInfoIdAPI } from "pages/api/user";
import { getPostByUserIdAPI } from "pages/api/social";
import { useAuth } from "hook/useAuth";
import DashboardLayout from "layouts/dashboard/DashboardLayout";
import { SocialTimeline } from "components/social/social-timeline";
import { useRouter } from "next/router";

const useProfile = (userId) => {
  const [profile, setProfile] = useState(null);

  const getProfile = useCallback(async (userId) => {
    try {
      const response = await getFullUserInfoIdAPI(userId);
      setProfile(response);
    } catch (err) {
      console.error(err);
    }
  }, []);

  useEffect(() => {
    getProfile(userId);
  }, [getProfile, userId]);

  return profile;
};

const usePosts = (userId) => {
  const [posts, setPosts] = useState([]);

  const getPosts = useCallback(async (userId) => {
    try {
      const response = await getPostByUserIdAPI(userId);
      setPosts(response);
    } catch (err) {
      console.error(err);
    }
  }, []);

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
  const { query } = useRouter();
  const { userId } = query;
  const profile = useProfile(userId);
  const posts = usePosts(userId);

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
          py: 4,
        }}
      >
        <Container maxWidth="lg">
          <div>
            <Box
              style={{ backgroundImage: `url("/background/cover2.jpeg")` }}
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
                    {profile.description}
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
