import { Link } from "react-router-dom";
import { icons } from "../../../utils/constants";
import { creteImgFilter } from "../../../utils/helpers";
import "./organizations.scss";
const Organizations = () => {
  return (
    <div className="user-organization-block hp-100">
      <div className="d-flex hp-100">
        <div className="wp-md-30">
          <div className="org-card">
            <h2 className="text-22-500 mb-5">Hello Neel</h2>
            <p className="text-18-400 mb-20">
              Welcome to your interactions feed. Here, you&apos;ll be able to
              follow all interactions across all of your videoasks.
            </p>
            <p className="text-15-400 color-894f">
              Waiting for your 1st interactions...
            </p>
            <Link to="/" className="text-14-500 color-pColor">
              <img
                src={icons.rArrow}
                alt="close"
                height={14}
                width={18}
                style={{
                  filter: creteImgFilter("#8000ff"),
                  //   transform: "rotate(180deg)",
                }}
              />{" "}
              Learn how to share your videoasks
            </Link>
          </div>
        </div>
        <div className="wp-70 bg-ffff f-center flex-column d-md-flex d-none">
          <img src={icons.noResponse} alt="no content" />
          <p className="my-20 text-15-500 color-8080">
            You don’t have any interactions yet
          </p>
        </div>
      </div>
    </div>
  );
};

export default Organizations;
