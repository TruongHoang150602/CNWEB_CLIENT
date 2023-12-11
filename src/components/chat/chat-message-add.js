import { useCallback, useRef, useState } from "react";
import PropTypes from "prop-types";
import Attachment01Icon from "@untitled-ui/icons-react/build/esm/Attachment01";
import Camera01Icon from "@untitled-ui/icons-react/build/esm/Camera01";
import Send01Icon from "@untitled-ui/icons-react/build/esm/Send01";
import {
  Avatar,
  Box,
  IconButton,
  OutlinedInput,
  Stack,
  SvgIcon,
  Tooltip,
} from "@mui/material";
import useAuth from "hook/useAuth";

export const ChatMessageAdd = (props) => {
  const { disabled, onSend, ...other } = props;
  const user = useAuth();
  const fileInputRef = useRef(null);
  const [body, setBody] = useState("");

  const handleAttach = useCallback(() => {
    fileInputRef.current?.click();
  }, []);

  const handleChange = useCallback((event) => {
    setBody(event.target.value);
  }, []);

  const handleSend = useCallback(() => {
    if (!body) {
      return;
    }

    onSend?.(body);
    setBody("");
  }, [body, onSend]);

  const handleKeyUp = useCallback(
    (event) => {
      if (event.code === "Enter") {
        handleSend();
      }
    },
    [handleSend]
  );

  return (
    <Stack
      alignItems="center"
      direction="row"
      spacing={2}
      sx={{
        px: 3,
        py: 1,
      }}
      {...other}
    >
      <Avatar
        sx={{
          display: {
            xs: "none",
            sm: "inline",
          },
        }}
        src="https://lh3.googleusercontent.com/a/ACg8ocKvBtPswksA84XNlOmIIf_Ic_80DpgiwaWZjvMtZlX0=s96-c"
      />
      <OutlinedInput
        disabled={disabled}
        fullWidth
        onChange={handleChange}
        onKeyUp={handleKeyUp}
        placeholder="Leave a message"
        size="small"
        value={body}
      />
      <Box
        sx={{
          alignItems: "center",
          display: "flex",
          m: -2,
          ml: 2,
        }}
      >
        <Tooltip title="Send">
          <Box sx={{ m: 1 }}>
            <IconButton
              color="primary"
              disabled={!body || disabled}
              sx={{
                backgroundColor: "primary.main",
                color: "primary.contrastText",
                "&:hover": {
                  backgroundColor: "primary.dark",
                },
              }}
              onClick={handleSend}
            >
              <SvgIcon>
                <Send01Icon />
              </SvgIcon>
            </IconButton>
          </Box>
        </Tooltip>
        <Tooltip title="Attach photo">
          <Box
            sx={{
              display: {
                xs: "none",
                sm: "inline-flex",
              },
              m: 1,
            }}
          >
            <IconButton disabled={disabled} edge="end" onClick={handleAttach}>
              <SvgIcon>
                <Camera01Icon />
              </SvgIcon>
            </IconButton>
          </Box>
        </Tooltip>
        <Tooltip title="Attach file">
          <Box
            sx={{
              display: {
                xs: "none",
                sm: "inline-flex",
              },
              m: 1,
            }}
          >
            <IconButton disabled={disabled} edge="end" onClick={handleAttach}>
              <SvgIcon>
                <Attachment01Icon />
              </SvgIcon>
            </IconButton>
          </Box>
        </Tooltip>
      </Box>
      <input hidden ref={fileInputRef} type="file" />
    </Stack>
  );
};

ChatMessageAdd.propTypes = {
  disabled: PropTypes.bool,
  onSend: PropTypes.func,
};

ChatMessageAdd.defaultProps = {
  disabled: false,
};
