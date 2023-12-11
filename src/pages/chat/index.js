import { useCallback, useEffect, useRef, useState } from "react";
import Head from "next/head";
import { useSearchParams } from "next/navigation";
import Menu01Icon from "@untitled-ui/icons-react/build/esm/Menu01";
import { Box, Divider, IconButton, SvgIcon, Typography } from "@mui/material";
import { ChatBlank } from "components/chat/chat-blank";
import { ChatContainer } from "components/chat/chat-container";
import { ChatComposer } from "components/chat/chat-composer";
import { ChatThread } from "components/chat/chat-thread";

/**
 * NOTE:
 * In our case there two possible routes
 * one that contains /chat and one with a chat?threadKey={{threadKey}}
 * if threadKey does not exist, it means that the chat is in compose mode
 */

const useParams = () => {
  const searchParams = useSearchParams();
  const compose = searchParams.get("compose") === "true";
  const threadKey = searchParams.get("threadKey") || undefined;

  return {
    compose,
    threadKey,
  };
};

const useThreads = () => {
  const dispatch = useDispatch();

  const getThreads = useCallback(() => {
    dispatch(thunks.getThreads());
  }, [dispatch]);

  useEffect(
    () => {
      getThreads();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );
};

const Page = () => {
  const rootRef = useRef(null);

  const view = "blank";

  return (
    <>
      <Head>
        <title>Chat | QuizzifyME</title>
      </Head>
      <Divider />
      <Box
        component="main"
        sx={{
          backgroundColor: "background.paper",
          flex: "1 1 auto",
          overflow: "hidden",
          position: "relative",
          height: "600px",
          margin: "40px",
          borderRadius: "20px",
        }}
      >
        <Box
          ref={rootRef}
          sx={{
            bottom: 0,
            display: "flex",
            left: 0,
            position: "absolute",
            right: 0,
            top: 0,
          }}
        >
          <ChatContainer open={true}>
            <Box sx={{ p: 2 }}>
              <IconButton>
                <SvgIcon>
                  <Menu01Icon />
                </SvgIcon>
              </IconButton>
            </Box>
            <Divider />
            <ChatThread />
          </ChatContainer>
        </Box>
      </Box>
    </>
  );
};

export default Page;
