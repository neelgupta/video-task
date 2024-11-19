import React from "react";
import styles from "./TitleUndoRedo.module.scss";
import { Panel } from "@xyflow/react";
import { icons } from "../../../utils/constants";
import { Button } from "react-bootstrap";
import UndoIcon from "../../../assets/images/icons/UndoIcon";
import RedoIcon from "../../../assets/images/icons/RedoIcon";

const TitleUndoRedo = React.forwardRef(({ className, ...props }) => {
  return (
    <Panel position="top-left" {...props} className="p-20 pt-35">
      <div className={styles.mainContentContainer}>
        <div className={styles.titleContentContainer}>
          <div>Title of FlōwAI</div>
          <div>
            <img src={icons.editIcon} alt="edit icon" />
          </div>
        </div>
        <div className={styles.undoContainer}>
          <Button className={styles.undoBtn} onClick={() => {}}>
            <UndoIcon className={styles.icon} />
          </Button>
        </div>
        <div className={styles.redoContainer}>
          <Button className={styles.redoBtn} onClick={() => {}}>
            <RedoIcon className={styles.icon} />
          </Button>
        </div>
      </div>
    </Panel>
  );
});

TitleUndoRedo.displayName = "TitleUndoRedo";

export default TitleUndoRedo;
