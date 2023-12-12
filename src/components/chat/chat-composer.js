import { Box, Divider } from "@mui/material";
import { ChatComposerRecipients } from "./chat-composer-recipients";
import { ChatMessageAdd } from "./chat-message-add";

export const ChatComposer = (props) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        flexGrow: 1,
      }}
      {...props}
    >
      <ChatComposerRecipients
        onRecipientAdd={{}}
        onRecipientRemove={{}}
        recipients={[]}
      />
      <Divider />
      <Box sx={{ flexGrow: 1 }} />
      <Divider />
      <ChatMessageAdd disabled={false} onSend={{}} />
    </Box>
  );
};
