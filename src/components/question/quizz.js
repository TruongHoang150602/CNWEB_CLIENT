import Button from "@mui/material/Button";
import Question from "./question";
import Options from "./options";
import SVGIcon from "../SVGIcon";
import { Box } from "@mui/material";
import EnterAnswer from "./enter-answer";
import styles from "styles/Education.module.css";

export default function Quizz(props) {
  const {
    currentQuestion,
    userAnswer,
    isSubmitted,
    onClickNextBtn,
    onClickPreBtn,
    type,
  } = props;
  const question = userAnswer[currentQuestion].question;
  const question_type = question.question_type;
  return (
    <Box
      sx={{
        background: "#FFFFFF",
        height: "485px",
        padding: "30px",
        borderRadius: "15px",
        position: "relative",
      }}
    >
      <Question question={question.question} />
      {(question_type == "input" && (
        <EnterAnswer
          options={userAnswer[currentQuestion].options}
          answer={userAnswer[currentQuestion]}
          explanation={question.explanation}
          showAnswer={userAnswer[currentQuestion].showAnswer}
        />
      )) || (
        <Options
          options={userAnswer[currentQuestion].options}
          answer={userAnswer[currentQuestion]}
          explanation={question.explanation}
          showAnswer={userAnswer[currentQuestion].showAnswer}
          question_type={question_type}
          type={type}
        />
      )}

      <Box sx={{ position: "absolute", bottom: "30px", left: "60px" }}>
        <button
          className={styles.moveQuestionBtn}
          onClick={onClickPreBtn}
          disabled={currentQuestion == 0}
        >
          <SVGIcon
            src="/assets/icons/question/previousIcon.svg"
            sx={{ width: 6, height: 10, marginRight: "6px" }}
          />
          Previous
        </button>
        <button
          className={`${styles.moveQuestionBtn} ${styles.nextQuestionBtn}`}
          onClick={onClickNextBtn}
          disabled={currentQuestion == userAnswer.length - 1}
        >
          Next
          <SVGIcon
            src="/assets/icons/question/next.svg"
            sx={{ width: 6, height: 10, marginLeft: "6px" }}
          />
        </button>
      </Box>
    </Box>
  );
}
