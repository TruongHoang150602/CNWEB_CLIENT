import { useEffect, useRef } from "react";
import Head from "next/head";
import Menu01Icon from "@untitled-ui/icons-react/build/esm/Menu01";
import {
  Box,
  Button,
  CircularProgress,
  Divider,
  IconButton,
  SvgIcon,
} from "@mui/material";
import { ChatBlank } from "components/chat/chat-blank";
import { ChatContainer } from "components/chat/chat-container";
import { ChatThread } from "components/chat/chat-thread";
import { useDispatch, useSelector } from "react-redux";
import {
  openOrCloseSidebar,
  receiveMessages,
  selectChatList,
  selectCurrentChat,
  selectError,
  selectIsLoading,
  selectIsOpenSideBar,
  selectView,
} from "redux/slices/chat";
import { Container } from "@untitled-ui/icons-react";
import { ChatSidebar } from "components/chat/chat-sidebar";
import { useAuth } from "hook/useAuth";
import { listenForChatUpdates } from "pages/api/chat";
import DashboardLayout from "layouts/dashboard/DashboardLayout";

const Page = () => {
  const rootRef = useRef(null);
  const { user } = useAuth();
  const dispatch = useDispatch();

  const chatlist = useSelector(selectChatList);
  const currentChat = useSelector(selectCurrentChat);
  const isLoading = useSelector(selectIsLoading);
  const error = useSelector(selectError);
  const isOpenSidebar = useSelector(selectIsOpenSideBar);
  const view = useSelector(selectView);

  useEffect(() => {
    const listener = listenForChatUpdates(user.id, (updatedData, type) => {
      dispatch(receiveMessages({ updatedData, type }));
    });
  }, [dispatch, user]);

  if (isLoading) {
    return (
      <Container
        disableGutters
        maxWidth="md"
        component="main"
        align="center"
        sx={{ pt: 8, pb: 6 }}
      >
        <CircularProgress />
      </Container>
    );
  }

  const onOpenCloseSidebar = () => {
    console.log("close");
    dispatch(openOrCloseSidebar());
  };

  return (
    <>
      <Head>
        <title>Chat | QuizzifyME</title>
      </Head>
      <Box
        sx={{
          backgroundColor: "background.paper",
          flex: "1 1 auto",
          overflow: "hidden",
          position: "relative",
          height: "calc(100vh - 150px)",
          minHeight: "500px",
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
          <ChatSidebar
            container={rootRef.current}
            onClose={onOpenCloseSidebar}
            open={isOpenSidebar}
            chatlist={chatlist}
            chatId={currentChat?.id}
          />
          <ChatContainer open={isOpenSidebar}>
            <Box sx={{ p: 2 }}>
              <IconButton onClick={onOpenCloseSidebar}>
                <SvgIcon>
                  <Menu01Icon />
                </SvgIcon>
              </IconButton>
            </Box>
            <Divider />
            {view == "blank" && <ChatBlank />}
            {view == "chat" && <ChatThread currentChat={currentChat} />}
          </ChatContainer>
        </Box>
      </Box>
    </>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
