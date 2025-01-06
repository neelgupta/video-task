import React from "react";
import { Panel, useReactFlow } from "@xyflow/react";
import { Button } from "react-bootstrap";
import styles from "./Resizer.module.scss";
import MinusIcon from "../../../../assets/images/icons/MinusIcon";
import PlusIcon from "../../../../assets/images/icons/PlusIcon";

const Resizer = React.forwardRef(({ className, ...props }) => {
  const { zoomIn, zoomOut } = useReactFlow();

  return (
    <Panel position="bottom-left" {...props} className="p-20 pb-40 ps-100">
      <div className={styles.resizeBtnContainer}>
        <Button
          style={{
            background: "transparent",
            border: "none",
          }}
          onClick={() => zoomOut({ duration: 300 })}
        >
          <MinusIcon />
        </Button>
        <div className={styles.divider} />

        <Button
          style={{
            background: "transparent",
            border: "none",
          }}
          onClick={(e) => {
            zoomIn({ duration: 300 });
          }}
        >
          <PlusIcon />
        </Button>
      </div>
    </Panel>
  );
});

Resizer.displayName = "Resizer";

export default Resizer;
