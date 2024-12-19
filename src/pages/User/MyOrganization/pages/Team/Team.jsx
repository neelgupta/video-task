import React, { useEffect, useState } from "react";
import { Accordion, Button, Spinner } from "react-bootstrap";
import { icons } from "../../../../../utils/constants";
import { creteImgFilter } from "../../../../../utils/helpers";
import "./Team.scss";
import { Table } from "../../../../../components";
import AddEditTeam from "./AddEditTeam";
import { api } from "../../../../../services/api";
import { useDispatch, useSelector } from "react-redux";
import { showSuccess, throwError } from "../../../../../store/globalSlice";
import DeleteModal from "../../../../../components/layouts/DeleteModal";

const header = [
  {
    title: "Username",
    className: "wp-30 ps-20",
    isSort: false,
  },
  {
    title: "Phone Number",
    className: "wp-20",
    isSort: false,
  },

  {
    title: "E-mail ",
    className: "wp-20",
    isSort: false,
  },
  {
    title: "Role",
    className: "wp-15",
    isSort: false,
  },
  {
    title: "Action",
    className: "wp-15 justify-content-center",
  },
];

const getColorFromLetter = (letter) => {
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const index = letters.indexOf(letter.toUpperCase());

  // Ensure the index is valid
  if (index === -1) {
    return "rgb(0, 0, 0)"; // Default to black for invalid letters
  }

  // Generate colors based on the index
  const hue = (index / letters.length) * 360; // Spread hues across the color wheel
  return `hsl(${hue}, 70%, 50%)`; // Use HSL to get vibrant colors
};

function Team() {
  const dispatch = useDispatch();
  const reduxData = useSelector((state) => state.global);
  const { selectedOrganizationId } = reduxData;
  const [isAdd, setIsAdd] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [isDelete, setIsDelete] = useState(false);

  const [memberList, setMemberList] = useState([]);
  const [selectedPage, setSelectedPage] = useState(0);
  const [editMemberData, setEditMemberData] = useState("");
  const [isLoad, setIsLoad] = useState(false);
  const [deletedId, setDeletedId] = useState("");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [paginationOption, setPaginationOption] = useState({
    currentPage: 0,
    count: 0,
    pageSize: 5,
  });

  useEffect(() => {
    if (selectedOrganizationId) {
      fetchMemberList(selectedOrganizationId);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedOrganizationId, selectedPage]);

  const fetchMemberList = async (id) => {
    setIsLoad(true);
    try {
      const res = await api.get(
        `user/get-member-list/${id}?limit=${
          paginationOption?.pageSize
        }&offset=${selectedPage * paginationOption?.pageSize}`
      );
      if (res.status === 200) {
        setTableData(res.data.response.members || []);
        setPaginationOption({
          ...paginationOption,
          count: res.data.response.count,
        });
      }
    } catch (error) {
      console.log("error", error);
    }
    setIsLoad(false);
  };

  const onPaginationChange = (index) => {
    setSelectedPage(index);
    setPaginationOption({
      ...paginationOption,
      currentPage: index,
    });
  };

  const deleteMember = async (id) => {
    setIsDelete(true);
    try {
      const res = await api.delete(`user/delete-member/${id}`);
      if ([201, 200].includes(res.status)) {
        dispatch(showSuccess(res.data.message));
        fetchMemberList(selectedOrganizationId);
      } else {
        dispatch(throwError(res.data.message));
      }
    } catch (error) {
      console.log("error", error);
      dispatch(throwError(error.response.data.message));
    }
    setDeletedId("");
    setShowDeleteModal(false);
    setIsDelete(false);
  };

  const setTableData = (data) => {
    setMemberList([]);
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
                className="w-40 h-40 f-center text-20-600"
                style={{
                  borderRadius: "50%",
                  overflow: "hidden",
                  background: getColorFromLetter(elem.member_name.charAt(0)),
                  color: "white",
                }}
              >
                {elem.member_name.charAt(0)}
              </div>
              <div className="ms-10">{elem.member_name}</div>
            </div>
          ),
          className: "wp-30 ps-20",
        },
        {
          value: elem.member_phone || "-",
          className: "wp-20 color-757f",
        },
        {
          value: <div>{elem.member_email}</div>,
          className: "wp-20 color-757f",
        },
        {
          value: elem.member_role,
          className: "wp-15 color-757f",
        },

        {
          value: (
            <div className="f-center gap-2">
              <div
                className={" h-20 w-20 f-center " + "pointer"}
                onClick={() => {
                  if (!elem.is_parent) {
                    setDeletedId(elem._id);
                    setShowDeleteModal(true);
                  }
                }}
              >
                <img
                  src={icons.deleteSVG}
                  alt="bookmark"
                  className="fit-image"
                  style={
                    !elem.is_parent ? {} : { filter: creteImgFilter("#D3D3D3") }
                  }
                />
              </div>
              <div
                className="pointer d-flex h-20 w-20"
                onClick={() => {
                  setIsEdit(true);
                  setIsAdd(true);
                  setEditMemberData(elem);
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
    setMemberList(rowData);
  };

  return (
    <div className="Team">
      <DeleteModal
        show={showDeleteModal}
        handleClose={() => setShowDeleteModal(false)}
        onDelete={() => {
          deleteMember(deletedId);
        }}
        isDelete={isDelete}
        title="Are you sure you want to proceed?"
        text="Once deleted, they cannot be recovered."
      />
      {isAdd && (
        <AddEditTeam
          isEdit={isEdit}
          show={isAdd}
          selectedOrganizationId={selectedOrganizationId}
          fetchList={() => {
            fetchMemberList(selectedOrganizationId);
          }}
          editMemberData={editMemberData}
          onHide={() => {
            setIsAdd(false);
            setIsEdit(false);
            setEditMemberData("");
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
        <Table
          header={header}
          row={memberList}
          paginationOption={paginationOption}
          loader={isLoad}
          onPaginationChange={onPaginationChange}
        />
      </div>
    </div>
  );
}

export default Team;
