import React, { useEffect, useRef, useState } from "react";
import Select from "react-select";
import "./Overview.scss";
import { api } from "../../../../../services/api";
import { useDispatch, useSelector } from "react-redux";
import { showSuccess, throwError } from "../../../../../store/globalSlice";
import EditOrganizationName from "./EditOrganizationName";
import DropdownOption from "../../../../../components/inputs/DropdownOption/DropdownOption";
import { Tooltip } from "react-tooltip";
import { SketchPicker } from "react-color";
import {
  brandingOption,
  fontFamilyList,
  languageOptions,
} from "./overviewOption";

function Overview() {
  const dispatch = useDispatch();
  const reduxData = useSelector((state) => state.global);
  const { selectedOrganizationId } = reduxData;
  const [organization, setOrganization] = useState({});
  const [isChange, setIsChange] = useState("");
  const [replayEmailOption, setReplayEmailOption] = useState([]);
  const [isSetName, setIsSetName] = useState(false);
  const [form, setForm] = useState({
    replay_to_email: "",
    branding: "",
    language: "",
    Color: "",
    font: "",
    border_radius: "",
  });
  const [flowColor, setFlowColor] = useState({
    primaryColor: "",
    secondaryColor: "",
    backgroundColor: "",
  });
  const [showPicker, setShowPicker] = useState("");
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
      fetchOverview(false);
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
      console.log("organization?.members", organization?.members);
      const option = organization.members.map((ele) => {
        console.log("ele", ele);
        return {
          value: ele.userId?._id,
          label: ele.userId?.email,
        };
      });
      setReplayEmailOption(option);
    }
    console.log("organization", organization);
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
      setFlowColor({
        primaryColor: organization.primary_color,
        secondaryColor: organization.secondary_color,
        backgroundColor: organization.background_color,
      });
    }
  }, [organization, replayEmailOption]);

  return (
    <div className="Overview">
      {isSetName && (
        <EditOrganizationName
          show={isSetName}
          handleClose={() => {
            setIsSetName(false);
          }}
        />
      )}

      <div className="overview-box">
        <div className="text-16-600" style={{ color: "#000000" }}>
          Set Organization Name
        </div>
        <div className="text-14-400 mt-10" style={{ color: "#8C8E90" }}>
          You haven`t named your organization yet.{" "}
          <span
            className="text-14-600 mt-10 link"
            style={{ color: "#B19EFF" }}
            onClick={() => setIsSetName(true)}
          >
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
          <div className="w-300 p-10">
            <DropdownOption
              options={replayEmailOption}
              name="replay_to_email"
              value={form.replay_to_email}
              placeholder={"Select Email"}
              isDisabled={isChange === "default email for replies"}
              onChange={(select) => {
                if (select.label !== organization.replay_to_email) {
                  updateOverview(
                    { replay_to_email: select.label },
                    "Replay to email"
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
            <div className="w-300 p-10">
              <DropdownOption
                name="branding"
                value={form.branding}
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
            <div className="w-300 p-10">
              <DropdownOption
                className=""
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
            <div
              className="w-300 p-10"
              style={{ display: "flex", gap: "20px" }}
            >
              {[
                {
                  dbKey: "primary_color",
                  key: "primaryColor",
                  label: "primary color",
                },
                {
                  dbKey: "secondary_color",
                  key: "secondaryColor",
                  label: "secondary color",
                },
                {
                  dbKey: "background_color",
                  key: "backgroundColor",
                  label: "background color",
                },
              ].map((colorInput, index) => {
                return (
                  <div
                    key={index}
                    style={{ position: "relative" }}
                    className="color-input-container"
                  >
                    <button
                      onClick={() => setShowPicker(colorInput.key)}
                      style={{
                        backgroundColor: flowColor?.[colorInput.key] || "#fff",
                        border: `1px solid ${
                          showPicker === colorInput.key ? "black" : "white"
                        }`,
                      }}
                      className="color-input-container_btn"
                      data-tooltip-id={`${colorInput.key}Tooltip`}
                      data-tooltip-content={`Pick a ${colorInput.label}!`}
                    ></button>

                    {showPicker !== colorInput.key && (
                      <Tooltip
                        id={`${colorInput.key}Tooltip`}
                        place="bottom"
                        delayShow={300}
                        style={{ zIndex: "10" }}
                      />
                    )}

                    {showPicker === colorInput.key && (
                      <div className="color-input-container_picker">
                        <CustomSketchPicker
                          colorInput={colorInput}
                          flowColor={flowColor}
                          setFlowColor={setFlowColor}
                        />
                        <div className="picker-btn">
                          <button
                            className="picker-btn_cancel"
                            onClick={() => {
                              setShowPicker();
                              fetchOverview();
                            }}
                          >
                            cancel
                          </button>
                          <button
                            className="picker-btn_pick"
                            onClick={() => {
                              updateOverview(
                                {
                                  [colorInput.dbKey]: flowColor[colorInput.key],
                                },
                                colorInput.label
                              );
                              setShowPicker("");
                            }}
                          >
                            save
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
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
              Font
            </div>
            <div className="w-300 p-10">
              <DropdownOption
                className=""
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
                isFont
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
            <div className="w-300 flow-ai-input p-10">
              <input
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

const CustomSketchPicker = ({ flowColor, setFlowColor, colorInput }) => {
  const customStyles = {
    default: {
      picker: {
        width: "200px",
        boxShadow: "none",
        borderRadius: "10px",
      },
      saturation: {
        borderRadius: "10px",
      },
      controls: {
        display: "flex",
        gap: "10px",
        alignItems: "center",
      },
      color: {
        borderRadius: "10px",
        width: "20px",
        height: "20px",
      },
      fields: {
        padding: "0px 5px",
      },
      input: {
        border: "2px solid #ccc",
        borderRadius: "5px",
        height: "30px",
        padding: "0 5px",
        fontSize: "14px",
        display: "flex",
      },
      label: {
        fontSize: "12px",
        color: "#555",
      },
    },
  };

  return (
    <SketchPicker
      color={flowColor?.[colorInput.key] || "#000"}
      onChange={(e) =>
        setFlowColor({
          ...flowColor,
          [colorInput.key]: e.hex,
        })
      }
      styles={customStyles} // Pass custom styles
    />
  );
};
