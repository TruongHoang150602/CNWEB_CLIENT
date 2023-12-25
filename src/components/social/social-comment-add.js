import FaceSmileIcon from "@untitled-ui/icons-react/build/esm/FaceSmile";
import Link01Icon from "@untitled-ui/icons-react/build/esm/Link01";
import Attachment01Icon from "@untitled-ui/icons-react/build/esm/Attachment01";
import PlusIcon from "@untitled-ui/icons-react/build/esm/Plus";
import Image01Icon from "@untitled-ui/icons-react/build/esm/Image01";
import {
  Avatar,
  Button,
  IconButton,
  Stack,
  SvgIcon,
  TextField,
  useMediaQuery,
} from "@mui/material";
import { getInitials } from "utils/get-initials";
import { useAuth } from "hook/useAuth";
import { useCallback, useState } from "react";

export const SocialCommentAdd = (props) => {
  const { addComment, social_id } = props;
  const smUp = useMediaQuery((theme) => theme.breakpoints.up("sm"));
  const { user } = useAuth();

  const [body, setBody] = useState("");
  const handleChange = useCallback((event) => {
    setBody(event.target.value);
  }, []);

  const handleSend = useCallback(() => {
    if (!body) {
      return;
    }

    const newComment = {
      author: user,
      content: body,
      createdAt: new Date().toISOString(),
      attachment: null,
    };
    addComment(newComment, social_id);
    console.log(body);
    setBody("");
  }, [body]);

  const handleKeyUp = useCallback(
    (event) => {
      if (event.code === "Enter") {
        handleSend();
      }
    },
    [handleSend]
  );

  return (
    <div {...props}>
      <Stack alignItems="flex-start" direction="row" spacing={2}>
        <Avatar
          src={user.avatar}
          sx={{
            height: 40,
            width: 40,
          }}
        >
          {getInitials(user.name)}
        </Avatar>
        <Stack spacing={3} sx={{ flexGrow: 1 }}>
          <TextField
            fullWidth
            multiline
            placeholder="Type your reply"
            rows={3}
            variant="outlined"
            onChange={handleChange}
            onKeyUp={handleKeyUp}
            value={body}
          />
          <Stack
            alignItems="center"
            direction="row"
            justifyContent="space-between"
            spacing={3}
          >
            <Stack alignItems="center" direction="row" spacing={1}>
              {!smUp && (
                <IconButton>
                  <SvgIcon>
                    <PlusIcon />
                  </SvgIcon>
                </IconButton>
              )}
              {smUp && (
                <>
                  <IconButton>
                    <SvgIcon>
                      <Image01Icon />
                    </SvgIcon>
                  </IconButton>
                  <IconButton>
                    <SvgIcon>
                      <Attachment01Icon />
                    </SvgIcon>
                  </IconButton>
                  <IconButton>
                    <SvgIcon>
                      <Link01Icon />
                    </SvgIcon>
                  </IconButton>
                  <IconButton>
                    <SvgIcon>
                      <FaceSmileIcon />
                    </SvgIcon>
                  </IconButton>
                </>
              )}
            </Stack>
            <div>
              <Button variant="contained">Send</Button>
            </div>
          </Stack>
        </Stack>
      </Stack>
    </div>
  );
};
