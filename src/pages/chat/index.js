import { Container } from "@mui/material";
import ChatSidebar from "components/chat/chat-sidebar";
import useAuth from "hook/useAuth";

const Page = (props) => {
  const user = useAuth();
  return (
    <Container>
      <ChatSidebar user={user} />
    </Container>
  );
};
