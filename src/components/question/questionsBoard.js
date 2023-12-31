import { chooseQuestion, openModal, startGame } from "redux/slices/question";
import { Box, Button, Grid, Typography } from "@mui/material";
import ReplayIcon from "@mui/icons-material/Replay";
import { useDispatch } from "react-redux";
import styles from "styles/Education.module.css";

export default function QuestionsBoard(props) {
  const { userAnswer, currentQuestion, isSubmitted, type } = props; // Fix typo in variable name
  const dispatch = useDispatch();

  const onClickQuestion = (index) => {
    dispatch(chooseQuestion(index));
  };

  const onClickSubmit = () => {
    dispatch(openModal());
  };

  const onClickRestart = () => {
    dispatch(startGame());
  };

  const checkCorrect = (options) => {
    return options.every((option) => {
      return (
        (option.isSelected && option.is_correct) ||
        (!option.isSelected && !option.is_correct)
      );
    });
  };
  return (
    <Box
      sx={{
        background: "#FFFFFF",
        height: "275px",
        borderRadius: "15px",
        borderTopLeftRadius: "0px",
        position: "relative",
      }}
    >
      <Typography
        sx={{
          background: "#FFFFFF",
          width: "100px",
          height: "30px",
          borderRadius: "15px",
          borderBottomLeftRadius: "0px",
          borderBottomRightRadius: "0px",
          fontWeight: "600",
          fontSize: "16px",
          lineHeight: "40px",
          position: "absolute",
          top: "-30px",
        }}
        align="center"
      >
        Level 8
      </Typography>

      <Box sx={{ padding: "16px" }}>
        <Typography>Question Palette</Typography>
        <Grid container spacing={1} pt={2}>
          {userAnswer.map((answer, index) => (
            <Grid item xs={2} key={index}>
              <button
                className={`${styles.questionPalette} ${
                  (currentQuestion === index && styles.currentQuestion) ||
                  (answer.showAnswer &&
                    ((checkCorrect(answer.options) &&
                      styles.correctOptionBtn) ||
                      (!checkCorrect(answer.options) &&
                        styles.wrongOptionBtn))) ||
                  (type === "test" &&
                    answer.length > 0 &&
                    styles.choosenQuestionBtn)
                }`}
                onClick={() => {
                  onClickQuestion(index);
                }}
                disabled={currentQuestion == null}
              >
                {index + 1}
              </button>
            </Grid>
          ))}

          {currentQuestion != null &&
            !isSubmitted &&
            ((type == 0 && (
              <Button
                variant="outlined"
                onClick={onClickRestart}
                sx={{ position: "absolute", bottom: "15px", right: "15px" }}
                startIcon={<ReplayIcon />}
              >
                Restart
              </Button>
            )) || (
              <Button
                variant="contained"
                onClick={onClickSubmit}
                sx={{ position: "absolute", bottom: "15px", right: "15px" }}
              >
                Submit
              </Button>
            ))}
        </Grid>
      </Box>
    </Box>
  );
}
