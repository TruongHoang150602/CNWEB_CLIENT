import Attachment01Icon from "@untitled-ui/icons-react/build/esm/Attachment01";
import FaceSmileIcon from "@untitled-ui/icons-react/build/esm/FaceSmile";
import Image01Icon from "@untitled-ui/icons-react/build/esm/Image01";
import Link01Icon from "@untitled-ui/icons-react/build/esm/Link01";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  IconButton,
  OutlinedInput,
  Stack,
  SvgIcon,
  useMediaQuery,
} from "@mui/material";
import { getInitials } from "utils/get-initials";
import { useAuth } from "hook/useAuth";
import { useCallback, useRef, useState } from "react";
import { createNewPostAPI } from "pages/api/social";
import toast from "react-hot-toast";

export const SocialPostAdd = (props) => {
  const { onPost } = props;
  const { user } = useAuth();
  const smUp = useMediaQuery((theme) => theme.breakpoints.up("sm"));
  const fileInputRef = useRef(null);
  const [body, setBody] = useState("");
  const [attachment, setAttachment] = useState(null);

  const handleAttach = useCallback(() => {
    fileInputRef.current?.click();
  }, []);

  const handleFileChange = useCallback((event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile && selectedFile.type.startsWith("image/")) {
      setAttachment(selectedFile);
    } else {
      toast.error("Invalid file type. Please select an image.");
    }
  }, []);

  const handleChange = useCallback((event) => {
    setBody(event.target.value);
  }, []);

  const handleSend = useCallback(() => {
    if (!body) {
      return;
    }

    console.log(body, attachment);
    const newPost = {
      author_id: user.id,
      content: body,
      attachment: attachment ? "/background/cover2.jpeg" : null,
    };
    onPost?.(newPost);
    setBody("");
    setAttachment(null);
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
    <Card {...props}>
      <CardContent>
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
            <OutlinedInput
              fullWidth
              multiline
              placeholder="What's on your mind"
              rows={3}
              onChange={handleChange}
              onKeyUp={handleKeyUp}
              value={body}
            />

            {attachment && ( // Display the selected image
              <Box mt={2}>
                <img
                  src={URL.createObjectURL(attachment)}
                  alt="Selected Image"
                  style={{ maxWidth: "100%", maxHeight: "200px" }}
                />
              </Box>
            )}

            <Stack
              alignItems="center"
              direction="row"
              justifyContent="space-between"
              spacing={3}
            >
              {smUp && (
                <Stack alignItems="center" direction="row" spacing={1}>
                  <IconButton onClick={handleAttach}>
                    <SvgIcon>
                      <Image01Icon />
                    </SvgIcon>
                  </IconButton>
                  <IconButton onClick={handleAttach}>
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
                  <input
                    hidden
                    ref={fileInputRef}
                    type="file"
                    onChange={handleFileChange} // Handle file changes
                  />
                </Stack>
              )}
              <div>
                <Button variant="contained">Post</Button>
              </div>
            </Stack>
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
};
