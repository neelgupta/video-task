import React, { useEffect, useState } from "react";
import "./Referrals.scss";
import { Button, Spinner } from "react-bootstrap";
import { icons } from "../../../../../utils/constants";
import { creteImgFilter } from "../../../../../utils/helpers";
import FailedModel from "../../../../../components/layouts/FailedModel";
import SuccessModal from "../../../Profile/ResetPassword/SuccessModal";
import { useSelector } from "react-redux";
import { api } from "../../../../../services/api";

const RewardsCard = [
  {
    title: "Total Minutes Earned",
    count: "0",
    profit: "+0",
  },
  {
    title: "Referrals Sent",
    count: "0",
    profit: "+0",
  },
  {
    title: "Referrals Accepted",
    count: "0",
    profit: "+0",
  },
  {
    title: "Referrals Pending",
    count: "0",
    profit: "+0",
  },
];
const iconList = [
  {
    name: "facebook",
    iconName: icons.facebook,
  },
  {
    name: "whatsapp",
    iconName: icons.whatsapp,
  },
  {
    name: "telegram",
    iconName: icons.telegram,
  },
  {
    name: "twitter",
    iconName: icons.twitter,
  },
  {
    name: "instagram",
    iconName: icons.instagram,
  },
  {
    name: "socialLink",
    iconName: icons.socialLink,
  },
];

function Referrals() {
  const reduxData = useSelector((state) => state.global);
  const { isResponsive, themeColor, selectedOrganizationId } = reduxData;
  const [isSent, setIsSent] = useState(false);
  const [isReject, setIsReject] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [email, setEmail] = useState("");
  const [referralsList, setReferralsList] = useState([]);
  const [isFetch, setIsFetch] = useState(false);
  const emailSentHandler = async () => {
    try {
      setIsSent(true);
      if (!validateEmail(email) || !email || email === "") {
        setIsReject("Enter valid email!");
        setIsSent(false);
        return;
      }
      const sentReq = {
        organization_id: selectedOrganizationId,
        referral_email: email,
      };
      const res = await api.post("user/add-referrals", sentReq);
      console.log("res", res);
      if (res.status === 201) {
        setIsSuccess(true);
        setEmail("");
        fetchEmailSent();
      } else {
        setIsReject(res.data.response.message);
      }
    } catch (error) {
      console.log("error", error);
      setIsReject(error.response.data.message);
    }
    setIsSent(false);
  };

  const fetchEmailSent = async () => {
    setIsFetch(true);
    try {
      setReferralsList([]);
      const res = await api.get(`user/get-referrals/${selectedOrganizationId}`);
      console.log("res", res);
      if (res.status === 200) {
        if (res?.data?.response?.length > 0)
          setReferralsList(res.data.response);
      }
    } catch (error) {
      console.log("error", error);
    }
    setIsFetch(false);
  };
  useEffect(() => {
    if (selectedOrganizationId) {
      fetchEmailSent();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedOrganizationId]);

  const validateEmail = (email) => {
    // Regex for validating email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };
  return (
    <div
      className="Referrals"
      style={isResponsive ? { flexDirection: "column" } : {}}
    >
      {isSuccess && (
        <SuccessModal
          show={isSuccess}
          handleClose={() => setIsSuccess(false)}
          title="Mail Sent Successful!"
          message={`Invitation mail sent to ${email}`}
        />
      )}
      {isReject !== "" && (
        <FailedModel
          show={isReject !== ""}
          handleClose={() => setIsReject("")}
          message={isReject}
        />
      )}
      <div className={isResponsive ? "wp-100" : "wp-70"}>
        <div style={{ width: isResponsive ? "100%" : "95%" }}>
          <div className="Referrals-box">
            <div className="text-16-600" style={{ color: "#000000" }}>
              Rewards
            </div>
            <div
              className="wp-100  mb-20"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                flexWrap: "wrap",
              }}
            >
              {RewardsCard.map((ele, index) => {
                return (
                  <div className="w-200 mt-30" key={index}>
                    <div className="text-18-500" style={{ color: "#777777" }}>
                      {ele.title}
                    </div>
                    <div className="text-48-500" style={{ color: "#121212" }}>
                      {ele.count}
                    </div>
                    <div className="text-16-400" style={{ color: "#22C55E" }}>
                      {ele.profit}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="Referrals-box mt-46">
            <div className="text-16-600" style={{ color: "#000000" }}>
              Invite friends through mail
            </div>
            <div
              className="mt-30 mb-30"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-start",
              }}
            >
              <input
                className="Invite_text"
                type="text"
                placeholder="Enter Email Address"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />

              <Button
                onClick={() => emailSentHandler()}
                className="text-14-600 p-12 ms-30 ps-20 pe-20"
                style={{
                  background:
                    "linear-gradient(180deg, #7B5BFF 0%, #B3A1FF 100%)",
                  border: "none",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
                disabled={isSent}
              >
                Invite
                {isSent && (
                  <Spinner animation="border" size="sm" className="ms-10" />
                )}
              </Button>
            </div>
          </div>
          <div className="Referrals-box mt-46">
            <div className="text-16-600" style={{ color: "#000000" }}>
              Invite friends through social media
            </div>

            <div
              className="wp-100 mt-20 mb-20 p-20"
              style={{
                display: "flex",
                alignItems: "center",
                flexWrap: "wrap",
                gap: "50px",
              }}
            >
              {iconList.map((ele, index) => {
                return (
                  <div className="w-30 h-30 pointer" key={index}>
                    <img
                      src={ele.iconName}
                      alt=""
                      className="fit-image social-icon"
                      style={{
                        filter: creteImgFilter("#1B2559"),
                      }}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
      <div
        className="p-20 invited auri-scroll"
        style={{
          ...{
            border: "1px solid #D9D9D9",
            borderRadius: "10px",
          },
          ...(isResponsive
            ? { marginTop: "20px", width: "100%" }
            : {
                maxHeight: "700px",
                overflow: "auto",
              }),
        }}
      >
        <div
          className="text-16-600 pb-10"
          style={{ borderBottom: "1px solid #D8D8D8" }}
        >
          Friends you invited
        </div>

        {referralsList.length > 0 ? (
          referralsList.map((referral, index) => {
            return (
              <div
                key={index}
                className="p-10"
                style={{
                  borderBottom: "1px solid #D8D8D8",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <div className="ms-10">
                  <div className="text-16-600 my-10">
                    {referral.referral_email}
                  </div>
                </div>
                <span
                  className="text-10-500 p-3 ps-10 pe-10 "
                  style={{
                    background:
                      referral.referral_status === "pending"
                        ? "#702DFF"
                        : "#33A36D",
                    color: "white",
                    borderRadius: "50px",
                    userSelect: "none",
                  }}
                >
                  {referral.referral_status}
                </span>
              </div>
            );
          })
        ) : isFetch ? (
          <div
            style={{
              width: "100%",
              height: "500px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Spinner animation="border" size="xl" />
          </div>
        ) : (
          <div className="f-center wp-100 hp-100 py-30">
            <p className="text-16-600" style={{ color: "black" }}>
              Invited data not found...!
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Referrals;
