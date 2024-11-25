import React, { useEffect, useState } from "react";
import Select from "react-select";
import "./Overview.scss";
import { api } from "../../../../../services/api";
import { useDispatch, useSelector } from "react-redux";
import { showSuccess, throwError } from "../../../../../store/globalSlice";

const brandingOption = [
  { value: "QnaFlow", label: "QnaFlow" },
  { value: "no-branding", label: "No branding" },
];
const languageOptions = [
  { value: "english", label: "English" },
  { value: "dutch", label: "Dutch" },
  { value: "spanish", label: "Spanish" },
];
const fontFamilyList = [
  { value: "Arial, sans-serif", label: "Arial" },
  { value: '"Helvetica Neue", Helvetica, sans-serif', label: "Helvetica" },
  { value: "Georgia, serif", label: "Georgia" },
  { value: '"Times New Roman", Times, serif', label: "Times New Roman" },
  { value: "Courier, monospace", label: "Courier" },
  { value: '"Courier New", Courier, monospace', label: "Courier New" },
  { value: "Verdana, sans-serif", label: "Verdana" },
  { value: "Tahoma, sans-serif", label: "Tahoma" },
  { value: "Trebuchet MS, sans-serif", label: "Trebuchet MS" },
  { value: '"Lucida Sans", sans-serif', label: "Lucida Sans" },
];

function Overview() {
  const dispatch = useDispatch();
  const reduxData = useSelector((state) => state.global);
  const { selectedOrganizationId } = reduxData;
  const [organization, setOrganization] = useState({});
  const [isChange, setIsChange] = useState("");
  const [replayEmailOption, setReplayEmailOption] = useState([]);
  const [form, setForm] = useState({
    replay_to_email: "",
    branding: "",
    language: "",
    font: "",
    border_radius: "",
  });

  const updateOverview = async (valueObj, keyName) => {
    try {
      setIsChange(keyName);
      const req = {
        organization_id: selectedOrganizationId,
        ...valueObj,
      };
      const res = await api.put("user/update-organization", req);
      if (res.status === 200) {
        dispatch(showSuccess(`${keyName} ${res.data.message}`));
      } else {
        dispatch(throwError(`${keyName} ${res.data.message}`));
      }
      fetchOverview();
      return;
    } catch (error) {
      console.log("error", error);
      dispatch(throwError(error.response.data.message));
      setIsChange("");
      return;
    }
  };

  const fetchOverview = async () => {
    try {
      const res = await api.get(`user/organization/${selectedOrganizationId}`);
      if (res.status === 200) {
        setOrganization(res.data.response);
        setIsChange("");
      }
    } catch (error) {
      console.log("error", error);
      setIsChange("");
    }
  };

  useEffect(() => {
    if (selectedOrganizationId) fetchOverview();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedOrganizationId]);

  useEffect(() => {
    if (organization?.members?.length > 0) {
      const option = organization.members.map((ele) => {
        return {
          value: ele.userId._id,
          label: ele.userId.email,
        };
      });
      setReplayEmailOption(option);
    }
  }, [organization]);

  useEffect(() => {
    if (organization) {
      setForm({
        replay_to_email: replayEmailOption.find(
          (o) => o.label === organization.replay_to_email
        ),
        branding: brandingOption.find((o) => o.value === organization.branding),
        language: languageOptions.find(
          (o) => o.value === organization.language
        ),
        font: fontFamilyList.find((o) => o.value === organization.font),
        border_radius: parseInt(organization.border_radius),
      });
    }
  }, [organization, replayEmailOption]);

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
              options={replayEmailOption}
              name="replay_to_email"
              value={form.replay_to_email}
              placeholder={"Select Email"}
              isDisabled={isChange === "default email for replies"}
              onChange={(select) => {
                if (select.label !== organization.replay_to_email) {
                  updateOverview(
                    { replay_to_email: select.label },
                    "default email for replies"
                  );
                }
                return {};
              }}
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
                name="branding"
                value={form.branding}
                className="p-10"
                options={brandingOption}
                placeholder={"Select Email"}
                isDisabled={isChange === "Branding"}
                onChange={(select) => {
                  if (select.value !== organization.branding) {
                    updateOverview({ branding: select.value }, "Branding");
                  }
                  return {};
                }}
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
                isDisabled={isChange === "Language"}
                name="language"
                value={form.language}
                onChange={(select) => {
                  if (select.value !== organization.language) {
                    updateOverview({ language: select.value }, "Language");
                  }
                  return {};
                }}
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
                options={fontFamilyList}
                placeholder={"Font"}
                name="font"
                value={form.font}
                isDisabled={isChange === "Font"}
                onChange={(select) => {
                  if (select.value !== organization.font) {
                    updateOverview({ font: select.value }, "Font");
                  }
                  return {};
                }}
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
                disabled={isChange === "Border radius"}
                value={form.border_radius}
                name="border_radius"
                onBlur={(e) => {
                  if (parseInt(e.target.value) !== organization.border_radius) {
                    updateOverview(
                      { border_radius: parseInt(e.target.value) },
                      "Border radius"
                    );
                  }
                }}
                onChange={(e) => {
                  setForm({ ...form, border_radius: parseInt(e.target.value) });
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
