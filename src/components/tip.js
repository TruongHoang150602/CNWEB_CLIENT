import PropTypes from "prop-types";
import Lightbulb04Icon from "@untitled-ui/icons-react/build/esm/Lightbulb04";
import { SvgIcon, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";

export const Tip = (props) => {
  const { message } = props;

  return (
    <>
      <SvgIcon color="action" sx={{ mr: 1 }}>
        <Lightbulb04Icon />
      </SvgIcon>
      <Typography
        color="text.secondary"
        sx={{
          alignItems: "center",
          display: "flex",
          "& span": {
            fontWeight: 700,
            mr: 0.5,
          },
        }}
        variant="caption"
      >
        <span>Tip.</span> {message}
      </Typography>
    </>
  );
};

Tip.propTypes = {
  message: PropTypes.string.isRequired,
};
