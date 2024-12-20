import React from "react";
import styles from "./TitleUndoRedo.module.scss";
import { Panel } from "@xyflow/react";
import { icons } from "../../../../utils/constants";
import { Button } from "react-bootstrap";
import UndoIcon from "../../../../assets/images/icons/UndoIcon";
import RedoIcon from "../../../../assets/images/icons/RedoIcon";
import { useNavigate, useParams } from "react-router-dom";

const TitleUndoRedo = React.forwardRef(({ className, ...props }) => {
  const navigate = useNavigate();
  const { id } = useParams();

  return (
    <Panel position="top-left" {...props} className="p-20 pt-35">
      <div className={styles.mainContentContainer}>
        <div className={styles.titleContentContainer}>
          <div
            className="w-30 h-30 f-center"
            onClick={() => {
              navigate(`/user/asset-allocation/${id}`);
            }}
          >
            <img src={icons.arrow_left} alt="edit icon" className="fit-image" />
          </div>
          <div className="text-16-500">Flōw AI</div>
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
