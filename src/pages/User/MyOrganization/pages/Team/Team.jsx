import React, { useState } from "react";
import { Accordion, Button } from "react-bootstrap";
import { icons } from "../../../../../utils/constants";
import { creteImgFilter } from "../../../../../utils/helpers";
import "./Team.scss";
import { Table } from "../../../../../components";
import AddEditTeam from "./AddEditTeam";
function Team() {
  const [isAdd, setIsAdd] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

  const header = [
    {
      title: "Username",
      className: "wp-30 ps-20",
      isSort: true,
    },
    {
      title: "Phone Number",
      className: "wp-20",
      isSort: true,
    },

    {
      title: "E-mail ",
      className: "wp-20",
      isSort: true,
    },
    {
      title: "Role",
      className: "wp-15",
      isSort: true,
    },
    {
      title: "Action",
      className: "wp-15 justify-content-center",
    },
  ];

  const data = [
    {
      name: "user-1",
      profile: icons.avatar1,
      number: "123-456-7890",
      email: "email@qnaflow.com",
      role: "Owner",
    },
    {
      name: "user-2",
      profile: icons.avatar2,
      number: "123-456-7890",
      email: "email@qnaflow.com",
      role: "Owner",
    },
  ];

  const rowData = [];
  data?.forEach((elem, index) => {
    let obj = [
      {
        value: (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div
              className="w-40 h-40"
              style={{ borderRadius: "50%", overflow: "hidden" }}
            >
              <img src={elem.profile} alt="" className="fit-image" />
            </div>
            <div className="ms-10">{elem.name}</div>
          </div>
        ),
        className: "wp-30 ps-20",
      },
      {
        value: elem.number,
        className: "wp-20 color-757f",
      },
      {
        value: <div>{elem.email}</div>,
        className: "wp-20 color-757f",
      },
      {
        value: elem.role,
        className: "wp-15 color-757f",
      },

      {
        value: (
          <div className="f-center gap-2">
            <div className="pointer d-flex h-20 w-20">
              <img src={icons.deleteSVG} alt="bookmark" className="fit-image" />
            </div>
            <div
              className="pointer d-flex h-20 w-20"
              onClick={() => {
                setIsEdit(true);
                setIsAdd(true);
              }}
            >
              <img src={icons.edit} alt="eyeView" className="fit-image" />
            </div>
          </div>
        ),
        className: "wp-15 justify-content-center",
      },
    ];
    rowData.push({ data: obj });
  });
  return (
    <div className="Team">
      {isAdd && (
        <AddEditTeam
          isEdit={isEdit}
          show={isAdd}
          onHide={() => {
            setIsAdd(false);
            setIsEdit(false);
          }}
        />
      )}

      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div className="text-24-600" style={{ color: "#1B2559" }}>
          Your Team
        </div>
        <Button
          style={{
            display: "flex",
            alignItems: "center",
            background: "linear-gradient(180deg, #7B5BFF 0%, #B3A1FF 100%)",
            border: "none",
          }}
          onClick={() => setIsAdd(true)}
        >
          <div>
            <img
              src={icons.addUser}
              alt=""
              style={{ filter: creteImgFilter("#FFFFFF") }}
              className="fit-image"
            />
          </div>
          <div className="text-14-500 ms-10">Add Member</div>
        </Button>
      </div>
      <div
        className="wp-100 mt-20"
        style={{ border: "1px solid #D9D9D9", borderRadius: "5px" }}
      >
        <Table header={header} row={rowData} />
      </div>
    </div>
  );
}

export default Team;
