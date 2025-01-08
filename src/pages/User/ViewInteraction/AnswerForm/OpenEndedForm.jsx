import React, { useEffect, useState } from "react";
import "./AnswerForm.scss";
import { icons } from "../../../../utils/constants";
import { creteImgFilter } from "../../../../utils/helpers";
import { TextArea, VideoUpload } from "../../../../components";
import AudioUpload from "../../../../components/layouts/AudioUpload";
import { useDispatch } from "react-redux";
import { throwError } from "../../../../store/globalSlice";
import { Spinner } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { t } from "i18next";
const optionArray = [
  {
    icon: icons.video,
    text: "Video",
    value: "video",
    isPro: false,
  },
  {
    icon: icons.audioIcon,
    text: "Audio",
    value: "audio",
    isPro: false,
  },
  {
    icon: icons.textLine,
    text: "Text",
    value: "text",
    isPro: false,
  },
];
function OpenEndedForm({ onNext, node, videoTime, isPost, flowStyle }) {
  const { i } = useTranslation();
  const { answer_type, answer_format } = node;
  const dispatch = useDispatch();
  const [tabArray, setTabArray] = useState(optionArray);
  const [isDelay, setIsDelay] = useState(null);

  const [answerForm, setAnswerForm] = useState({
    ans: null,
    ansType: "",
  });

  useEffect(() => {
    if (videoTime.duration && videoTime.currentTime) {
      const delay = parseInt(answer_format.delay);
      const currentTime = parseInt((videoTime?.currentTime || 0).toFixed(0));
      const duration = parseInt(videoTime?.duration) || 0;
      if (
        delay - currentTime === 0 ||
        currentTime === duration ||
        currentTime > delay
      ) {
        setIsDelay(false);
      } else {
        setIsDelay(true);
      }
    }
  }, [videoTime, answer_format]);

  useEffect(() => {
    (() => {
      if (!answer_type && !answer_format) return;
      setTabArray(
        optionArray.filter((x) =>
          (answer_format?.options || []).includes(x.text)
        )
      );
    })();
  }, [answer_type, answer_format]);

  const handleVideoLength = (file) => {
    if (file) {
      const tempVideo = document.createElement(answerForm.ansType);
      const videoUrl = (file && URL.createObjectURL(file)) || "";
      if (videoUrl) {
        tempVideo.src = videoUrl;
        tempVideo.onloadedmetadata = () => {
          if (tempVideo.duration < parseInt(answer_format.time_limit)) {
            setAnswerForm({ ...answerForm, ans: file });
            return;
          }
          dispatch(
            throwError(
              `The video length is less than ${answer_format.time_limit} seconds.`
            )
          );
        };
      }
      return;
    }
    setAnswerForm({ ...answerForm, ans: null });
  };

  return (
    <div className="OpenEndedForm-container">
      {isDelay && answer_format.delay !== 0 && (
        <div
          className="wp-100 hp-100"
          style={{
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <div
            className="text-26-500"
            style={{ fontFamily: `${flowStyle.font}` }}
          >
            {t("interact_in")}{" "}
            <span style={{ color: "#7b5aff" }}>
              {parseInt(answer_format.delay) -
                parseInt((videoTime?.currentTime || 0).toFixed(0))}
            </span>
            {t("second")}...
          </div>
        </div>
      )}
      {!answerForm.ansType && !isDelay && isDelay !== null && (
        <div
          className="wp-100 hp-100"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
          }}
        >
          <div
            className="text-20-500 mb-50"
            style={{
              textAlign: "center",
              fontFamily: `${flowStyle.font}`,
              color: flowStyle?.secondary_color || "#7D8185",
            }}
          >
            {t("openEndedForm.How_do_you_want_to_generate_video")} ?
          </div>
          <div className="footer_card_box">
            {tabArray.map((ele, index) => {
              return (
                <div
                  onClick={() =>
                    setAnswerForm({ ...answerForm, ansType: ele.value })
                  }
                  className="footer_card pointer"
                  key={index}
                  style={{
                    background: flowStyle.primary_color,
                    color: "white",
                    borderRadius: `${flowStyle?.border_radius || 0}px`,
                  }}
                >
                  {ele.isPro && <div className="proTeg">pro</div>}
                  <div className="h-70 wp-100 f-center">
                    <img
                      src={ele.icon}
                      alt=""
                      className="fit-image wp-40"
                      style={{
                        filter: creteImgFilter("#FFFFFF"),
                      }}
                    />
                  </div>
                  <div
                    className="text-16-500"
                    style={{ fontFamily: `${flowStyle.font}` }}
                  >
                    {t(`openEndedForm.${ele.text}`)}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
      {answerForm.ansType && (
        <div className="wp-100 hp-100">
          <div className="form-container">
            {answerForm.ansType === "text" && (
              <div className="wp-100">
                <div
                  className="text-20-500"
                  style={{
                    color: flowStyle?.secondary_color || "#7D8185",
                    fontFamily: `${flowStyle.font}`,
                  }}
                >
                  {t("openEndedForm.Description")}
                </div>
                <div style={{ borderRadius: "10px" }}>
                  <TextArea
                    rows={10}
                    value={answerForm.description}
                    placeholder={t("openEndedForm.descriptionPlaceholder")}
                    style={{ borderRadius: "10px" }}
                    onChange={(e) => {
                      setAnswerForm({
                        ...answerForm,
                        ans: e.target.value,
                      });
                    }}
                  />
                </div>
              </div>
            )}

            {answerForm.ansType === "video" && (
              <div className="wp-100">
                <div
                  className="text-20-500 mb-20 mt-20"
                  style={{
                    color: flowStyle?.secondary_color || "#7D8185",
                    fontFamily: `${flowStyle.font}`,
                  }}
                >
                  {t("openEndedForm.Upload_video")}
                </div>

                <VideoUpload
                  setFileValue={(file) => {
                    handleVideoLength(file);
                  }}
                  videoFile={answerForm.ans}
                  flowStyle={flowStyle}
                />
              </div>
            )}

            {answerForm.ansType === "audio" && (
              <div className="wp-100">
                <div
                  className="text-20-500 mb-20 "
                  style={{
                    color: flowStyle?.secondary_color || "#7D8185",
                    fontFamily: `${flowStyle.font}`,
                  }}
                >
                  {t("openEndedForm.Upload_audio")}
                </div>
                <AudioUpload
                  flowStyle={flowStyle}
                  audio={answerForm.ans}
                  setAudio={(file) => {
                    handleVideoLength(file);
                  }}
                />
              </div>
            )}
            <div id="ans-btn-group">
              <button
                className="next-btn"
                onClick={() => {
                  if (!answerForm.ans) {
                    dispatch(throwError("Please enter an answer."));
                    return;
                  }
                  if (!isPost) {
                    onNext({ ...answerForm });
                  }
                }}
                style={{ background: flowStyle.secondary_color }}
              >
                {isPost ? (
                  <Spinner size="lg" color="#888888" />
                ) : (
                  <img
                    src={icons.top_right_arrow}
                    alt=""
                    style={{
                      transform: "rotate(45deg)",
                      filter: creteImgFilter("#000"),
                    }}
                    className="fit-image w-30"
                  />
                )}
              </button>
              <button
                className="cancel-btn"
                onClick={() => setAnswerForm({ ans: null, ansType: "" })}
              >
                <img
                  src={icons.closeSvg}
                  alt=""
                  style={{ filter: creteImgFilter("#ffffff") }}
                  className="fit-image w-12 pb-5"
                />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default OpenEndedForm;
