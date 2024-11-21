import React, { useState } from "react";
import "./Referrals.scss";
import { Button } from "react-bootstrap";
import { icons } from "../../../../../utils/constants";
import { creteImgFilter } from "../../../../../utils/helpers";
import FailedModel from "../../../../../components/layouts/FailedModel";
import SuccessModal from "../../../Profile/ResetPassword/SuccessModal";
function Referrals() {
  const [isSent, setIsSent] = useState(false);
  const [isReject, setIsReject] = useState(false);

  const RewardsCard = [
    {
      title: "Total Minutes Earned",
      count: "1002",
      profit: "+400",
    },
    {
      title: "Referrals Sent",
      count: "40",
      profit: "+1",
    },
    {
      title: "Referrals Accepted",
      count: "40",
      profit: "+2",
    },
    {
      title: "Referrals Pending",
      count: "40",
      profit: "+2",
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
  return (
    <div className="Referrals">
      {isSent && (
        <SuccessModal
          show={isSent}
          handleClose={() => setIsSent(false)}
          title="Mail Sent Successful!"
          message="Invitation mail sent to friend@gmail.com"
        />
      )}
      {isReject && (
        <FailedModel
          show={isReject}
          handleClose={() => setIsReject(false)}
          message={`There was an error while trying to send your message. Please check your internet connection and try again. 
If the issue persists, contact support.`}
        />
      )}
      <div className="wp-70">
        <div className="Referrals-box">
          <div className="text-16-600" style={{ color: "#000000" }}>
            Rewards
          </div>
          <div
            className="wp-100 mt-30 mb-20"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              flexWrap: "wrap",
            }}
          >
            {RewardsCard.map((ele, index) => {
              return (
                <div className="w-200" key={index}>
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
            />
            <Button
              onClick={() => setIsSent(true)}
              className="text-14-600 p-12 ms-30 ps-20 pe-20"
              style={{
                background: "linear-gradient(180deg, #7B5BFF 0%, #B3A1FF 100%)",
                border: "none",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              Invite
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
      <div
        className="wp-30 p-20"
        style={{ border: "1px solid #D9D9D9", borderRadius: "10px" }}
      >
        <div
          className="text-16-600 pb-10"
          style={{ borderBottom: "1px solid #D8D8D8" }}
        >
          Friends you invited
        </div>
        <div
          className="p-10"
          style={{
            borderBottom: "1px solid #D8D8D8",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div className="ms-50">
            <div className="text-16-600 ">Prashant Kumar singh</div>
            <div className="text-14-400" style={{ color: "#5F5F5F" }}>
              software Developer
            </div>
          </div>
          <span
            className="text-10-500 p-3 ps-10 pe-10 "
            style={{
              background: "#702DFF",
              color: "white",
              borderRadius: "50px",
            }}
          >
            Pending
          </span>
        </div>
        <div
          className="p-10"
          style={{
            borderBottom: "1px solid #D8D8D8",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div className="ms-50">
            <div className="text-16-600 ">Prashant Kumar singh</div>
            <div className="text-14-400" style={{ color: "#5F5F5F" }}>
              software Developer
            </div>
          </div>
          <span
            className="text-10-500 p-3 ps-10 pe-10 "
            style={{
              background: "#33A36D",
              color: "white",
              borderRadius: "50px",
            }}
          >
            Accepted
          </span>
        </div>
        <div
          className="p-10"
          style={{
            borderBottom: "1px solid #D8D8D8",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div className="ms-50">
            <div className="text-16-600 ">Prashant Kumar singh</div>
            <div className="text-14-400" style={{ color: "#5F5F5F" }}>
              software Developer
            </div>
          </div>
          <span
            className="text-10-500 p-3 ps-10 pe-10 "
            style={{
              background: "#33A36D",
              color: "white",
              borderRadius: "50px",
            }}
          >
            Accepted
          </span>
        </div>
      </div>
    </div>
  );
}

export default Referrals;
