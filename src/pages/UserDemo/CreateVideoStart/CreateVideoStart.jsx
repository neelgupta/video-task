import { useNavigate } from "react-router-dom";
import { icons } from "../../../utils/constants";
import "./createVideoStart.scss";
import Modal from "react-bootstrap/Modal";
import { creteImgFilter } from "../../../utils/helpers";
import { useEffect, useState } from "react";
import { AiFillQuestionCircle } from "react-icons/ai";
import { Tooltip } from "react-tooltip";
import { Button, Switch } from "../../../components";
import Localization from "../../Layout/Navbar/Localization";

const CreateVideoStart = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("Untitled");
  const onHide = () => {
    navigate(-1);
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        onHide();
      }
    };
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Modal
      centered
      show
      onHide={onHide}
      fullscreen
      className="create-video-start"
    >
      <div className="p-34 modal-b" style={{ width: "100vw" }}>
        <div className="d-flex justify-content-end">
          <div>
            <img
              src={icons.close}
              alt="close"
              className="fit-image h-18 w-18 pointer d-block"
              onClick={onHide}
              style={{
                filter: creteImgFilter("#8000ff"),
              }}
            />
            <span className="color-sColor text-12-400">ESC</span>
          </div>
        </div>
        <form className="form-content ">
          <p className="text-22-500 color-19232b0a">
            Ok, let&lsquo;s get started <span role="img">🤟</span>
          </p>
          <div className="form-fields-card">
            <input
              className="box-text-input"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Give title"
            />
          </div>
          <div className="form-fields-card">
            <p
              className="mb-0 fa-center gap-2 text-15-500 py-13 "
              data-tooltip-id={`tooltip-lang`}
              data-tooltip-content={
                "Add a contact form to your videoask in order to identify your responders & reply back."
              }
            >
              <span>Collect contact details</span>
              <AiFillQuestionCircle size={20} />
            </p>
            <Tooltip className="tooltip" id={`tooltip-lang`} />
            <div>
              <Switch isChecked={true} onChange={() => {}} />
            </div>
          </div>
          <div className="form-fields-card">
            <p
              className="mb-0 fa-center gap-2 text-15-500 py-13 "
              data-tooltip-id={`tooltip-lang`}
              data-tooltip-content={"Choose the language of this videoask."}
            >
              <span>Language</span>
              <AiFillQuestionCircle size={20} />
            </p>
            <Tooltip className="tooltip" id={`tooltip-lang`} />
            <Localization isResponsive={true} />
          </div>

          <Button
            btnText={"Create videoask"}
            btnStyle={"PD"}
            className="wp-100 mx-auto text-16-500 py-15 mt-30"
            onClick={() => {
              navigate("/media-type");
              localStorage.setItem("language", "En");
              localStorage.setItem("title", title);
            }}
          />
        </form>
      </div>
    </Modal>
  );
};

export default CreateVideoStart;
