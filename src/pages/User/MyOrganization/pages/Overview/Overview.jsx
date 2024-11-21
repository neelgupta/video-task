import React from "react";
import Select from "react-select";
import "./Overview.scss";
function Overview() {
  const emailOptions = [
    { value: "text@gmail.com", label: "text@gmail.com" },
    { value: "admin@gmail.com", label: "admin@gmail.com" },
    { value: "user@gmail.com", label: "user@gmail.com" },
  ];
  const languageOptions = [
    { value: "english", label: "English" },
    { value: "dutch", label: "Dutch" },
    { value: "spanish", label: "Spanish" },
  ];
  const fontOptions = [
    { value: "12", label: "12 px" },
    { value: "14", label: "14 px" },
    { value: "16", label: "16 px" },
  ];
  return (
    <div className="Overview">
      <div className="overview-box">
        <div className="text-16-600" style={{ color: "#000000" }}>
          Set Organization Name
        </div>
        <div className="text-14-400 mt-10" style={{ color: "#8C8E90" }}>
          You haven`t named your organization yet.{" "}
          <span className="text-14-600 mt-10 link" style={{ color: "#B19EFF" }}>
            Set Now
          </span>
        </div>
      </div>
      <div className="overview-box mt-20">
        <div className="text-16-600" style={{ color: "#000000" }}>
          Reply-to Email
        </div>
        <div className="text-14-400 mt-10" style={{ color: "#8C8E90" }}>
          By default, when you or members of your team reply on QnAFlow, the
          reply-to email address will use the individual team member’s account
          email.
        </div>
        <div
          className="mt-20"
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div className="text-16-600" style={{ color: "#000000" }}>
            Select default email for replies
          </div>
          <div className="w-300">
            <Select
              className="p-10"
              options={emailOptions}
              placeholder={"Select Email"}
            />
          </div>
        </div>
      </div>
      <div className="overview-box mt-20">
        <div className="text-16-600" style={{ color: "#000000" }}>
          Default settings for all new QnAFlow
        </div>
        <div className="text-14-400 mt-10" style={{ color: "#8C8E90" }}>
          Set the default settings for all QnAFlow created in this organization.
        </div>
        <div className="mt-20 mb-30">
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div className="text-16-600" style={{ color: "#000000" }}>
              Branding
            </div>
            <div className="w-300">
              <Select
                className="p-10"
                options={emailOptions}
                placeholder={"Select Email"}
              />
            </div>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div className="text-16-600" style={{ color: "#000000" }}>
              Language
            </div>
            <div className="w-300">
              <Select
                className="p-10"
                options={languageOptions}
                placeholder={"Select Language"}
              />
            </div>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div
              className="text-16-600 mt-15 mb-15"
              style={{ color: "#000000" }}
            >
              Colors
            </div>
            <div className="w-300"></div>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div className="text-16-600" style={{ color: "#000000" }}>
              Font
            </div>
            <div className="w-300">
              <Select
                className="p-10"
                options={fontOptions}
                placeholder={"Font"}
              />
            </div>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div
              className="text-16-600 mt-15 mb-15"
              style={{ color: "#000000" }}
            >
              Button Border Radius
            </div>
            <div
              className="w-300"
              style={{
                display: "flex",
                justifyContent: "end",
                padding: "0px 10px",
              }}
            >
              <input
                style={{
                  fontSize: "14px",
                  fontWeight: "500",
                  width: "100%",
                  padding: "8px 10px",
                  borderRadius: "4px",
                  border: "1px solid #cccccc",
                  outline: "none",
                }}
                placeholder="Border Radius"
                type="number"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="overview-box mt-20">
        <div className="text-16-600" style={{ color: "#000000" }}>
          Brands
        </div>
        <div className="text-14-400 mt-10" style={{ color: "#8C8E90" }}>
          Set brand identity.{" "}
          <span className="text-14-600 mt-10 link" style={{ color: "#B19EFF" }}>
            Set Now
          </span>
        </div>
      </div>
    </div>
  );
}

export default Overview;
