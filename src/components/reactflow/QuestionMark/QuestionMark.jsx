import React from "react";
import { Panel } from "@xyflow/react";
import { Button } from "react-bootstrap";
import styles from "./QuestionMark.module.scss";
import QuestionIcon from "../../../assets/images/icons/QuestionIcon";

const QuestionMark = React.forwardRef(({ className, ...props }) => {
  return (
    <Panel position="bottom-left" {...props} className="p-20 pb-35">
      <div className={styles.queBtnContainer}>
        <Button
          style={{
            background: "transparent",
            border: "none",
          }}
          onClick={() => {}}
        >
          <QuestionIcon />
        </Button>
      </div>
    </Panel>
  );
});

QuestionMark.displayName = "QuestionMark";

export default QuestionMark;
