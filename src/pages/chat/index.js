import { useCallback, useEffect, useRef, useState } from "react";
import Head from "next/head";
import { useSearchParams } from "next/navigation";
import Menu01Icon from "@untitled-ui/icons-react/build/esm/Menu01";
import {
  Box,
  Divider,
  IconButton,
  SvgIcon,
  Typography,
  getCardActionsUtilityClass,
} from "@mui/material";
import { ChatBlank } from "components/chat/chat-blank";
import { ChatContainer } from "components/chat/chat-container";
import { ChatComposer } from "components/chat/chat-composer";
import { ChatThread } from "components/chat/chat-thread";
import { getChatById } from "thunk/chat";
import { useDispatch } from "react-redux";

const Page = () => {
  const rootRef = useRef(null);
  const view = "blank";
  const dispatch = useDispatch();
  const chatId = "salMwoMV5oX2bZY5348h";
  useEffect(() => {
    dispatch(getChatById({ chatId }));
  }, [dispatch]);

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
