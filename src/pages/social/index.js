import { useCallback, useEffect, useState } from "react";
import Head from "next/head";
import { Box, Container, Stack, Typography } from "@mui/material";
import { createNewPostAPI, getRecentPostsAPI } from "pages/api/social";
import DashboardLayout from "layouts/dashboard/DashboardLayout";
import { SocialPostCard } from "components/social/social-post-card";
import { SocialPostAdd } from "components/social/social-post-add";

const usePosts = () => {
  const [posts, setPosts] = useState([]);

  const getPosts = useCallback(async () => {
    try {
      const response = await getRecentPostsAPI();
      setPosts(response);
    } catch (err) {
      console.error(err);
    }
  }, []);

  const createNewPost = async (newPost) => {
    try {
      await createNewPostAPI(newPost);

      getPosts();
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getPosts();
  }, []); // eslint-disable-next-line react-hooks/exhaustive-deps

  return { posts, createNewPost };
};

const SocialFeed = () => {
  const { posts, createNewPost } = usePosts();

  console.log(posts);

  return (
    <>
      <Head>
        <title>Social</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 4,
        }}
      >
        <Container maxWidth="lg">
          <Stack spacing={3} sx={{ mt: 3 }}>
            <SocialPostAdd onPost={createNewPost} />
            {posts.map((post) => (
              <SocialPostCard
                key={post.id}
                authorAvatar={post.author.avatar}
                authorName={post.author.name}
                comments={post.comments}
                createdAt={post.createdAt}
                likedList={post.likedList}
                attachment={post.attachment}
                content={post.content}
              />
            ))}
          </Stack>
        </Container>
      </Box>
    </>
  );
};

SocialFeed.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default SocialFeed;
