import React from "react";
import { Panel } from "@xyflow/react";
import { Button } from "react-bootstrap";
import styles from "./MenuBar.module.scss";
import ChatIcon from "../../../assets/images/icons/ChatIcon";
import ShareIcon from "../../../assets/images/icons/ShareIcon";
import DocsIcon from "../../../assets/images/icons/DocsIcon";
import ProfileWithArrowIcon from "../../../assets/images/icons/ProfileWithArrowIcon";
import PlayIcon from "../../../assets/images/icons/PlayIcon";
import { icons } from "../../../utils/constants";

const MenuBar = React.forwardRef(({ className, ...props }) => {
  return (
    <Panel position="top-right" {...props} className="p-20 pt-35">
      <div className={styles.menuBarContainer}>
        <div
          className={`d-flex align-items-center gap-2 pointer h-50 w-50 me-10`}
        >
          <img src={icons.avatar} alt="avatar" className="fit-image" />
          <svg
            width="10"
            height="6"
            viewBox="0 0 10 6"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M9.84456 0.96319L5.3886 5.82209C5.27346 5.9407 5.14297 6 4.99712 6C4.9242 6 4.85511 5.98364 4.78987 5.95092C4.72078 5.92229 4.66129 5.87935 4.6114 5.82209L0.15544 0.96319C0.0518141 0.848671 0 0.715746 0 0.564417C0 0.458078 0.0230284 0.361963 0.0690851 0.276074C0.115141 0.190184 0.178469 0.122699 0.259068 0.0736198C0.335828 0.0245399 0.424103 0 0.523892 0C0.665899 0 0.790635 0.0552149 0.8981 0.165644L5.308 4.96319H4.692L9.1019 0.165644C9.20553 0.0552149 9.33026 0 9.47611 0C9.5759 0 9.66609 0.0245399 9.74669 0.0736198C9.82345 0.122699 9.88486 0.190184 9.93092 0.276074C9.97697 0.361963 10 0.458078 10 0.564417C10 0.642127 9.98657 0.713702 9.9597 0.779141C9.93283 0.848671 9.89445 0.91002 9.84456 0.96319Z"
              fill="black"
            />
          </svg>
        </div>
        <div className={styles.divider + " me-10"} />

        <Button className={styles.menuBtn} onClick={() => {}}>
          <ProfileWithArrowIcon className="" />
        </Button>
        <Button className={styles.menuBtn} onClick={() => {}}>
          <DocsIcon className="" />
        </Button>
        <Button className={styles.menuBtn} onClick={() => {}}>
          <ShareIcon className="" />
        </Button>
        <Button className={styles.menuBtn} onClick={() => {}}>
          <ChatIcon className="" />
        </Button>
        <Button
          className={`${styles.previewBtn} ${styles.menuBtn}`}
          onClick={() => {}}
        >
          <PlayIcon className="hover-icons-effect" /> Preview
        </Button>
      </div>
    </Panel>
  );
});

MenuBar.displayName = "MenuBar";

export default MenuBar;
