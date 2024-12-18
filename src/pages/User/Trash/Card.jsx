/* eslint-disable react/display-name */
import React, { useState } from "react";
import "./Trash.scss";
import { Dropdown, Spinner } from "react-bootstrap";
import { icons } from "../../../utils/constants";
import { creteImgFilter } from "../../../utils/helpers";
import DeleteModal from "../../../components/layouts/DeleteModal";
import { api } from "../../../services/api";
import { useDispatch } from "react-redux";
import {
  handelCatch,
  showSuccess,
  throwError,
} from "../../../store/globalSlice";

const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
  <a
    href=""
    ref={ref}
    onClick={(e) => {
      e.preventDefault();
      onClick(e);
    }}
  >
    {children}
  </a>
));

const CustomMenu = ({ onDelete, onRestore }) => {
  return (
    <Dropdown>
      <Dropdown.Toggle as={CustomToggle}>
        <img
          src={icons.three_dots}
          alt=""
          className="fit-image"
          style={{ filter: creteImgFilter("#ffffff") }}
        />
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item
          onClick={() => {
            onRestore();
          }}
          className="text-14-500"
        >
          Restore
        </Dropdown.Item>

        <Dropdown.Divider
          style={{
            margin: "0.5rem 1rem",
          }}
        />
        <Dropdown.Item
          onClick={() => {
            onDelete();
          }}
          className="text-14-500 text-danger"
        >
          Delete
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};

const Card = ({ item, fetchData }) => {
  console.log("item", item);
  const dispatch = useDispatch();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isDelete, setIsDelete] = useState(false);
  const [isRestore, setIsRestore] = useState(false);
  const [restoreId, setRestoreId] = useState("");
  const handelDelete = async () => {
    setIsDelete(true);
    try {
      const res = await api.delete(
        `interactions/delete-forever-interaction/${item._id}`
      );
      if (res.status === 200) {
        dispatch(showSuccess(res.data.message));
        fetchData();
        setShowDeleteModal(false);
      } else {
        dispatch(throwError(res.data.message));
      }
    } catch (error) {
      console.log("error", error);
      dispatch(handelCatch(error));
    }
    setIsDelete(false);
  };

  const handelRestore = async () => {
    setIsRestore(true);
    try {
      const req = {
        interaction_id: item._id,
        is_deleted: false,
      };
      const res = await api.put("interactions/update-interactions", req);
      console.log("res", res);
      if (res.status === 200) {
        dispatch(showSuccess(res.data.message));
        fetchData();
      } else {
        dispatch(throwError(res.data.message));
      }
    } catch (error) {
      console.log("error", error);
      dispatch(handelCatch(error));
    }
    setRestoreId("");
    setIsRestore(false);
  };
  return (
    <>
      <div className="custom-card">
        {item.thumbnailUrl ? (
          <img
            src={item.thumbnailUrl}
            alt="Avatar"
            className="custom-card-image"
          />
        ) : (
          <div
            style={{
              width: "100%",
              height: "100%",
              background:
                "linear-gradient(rgba(0, 0, 0, 0.2),rgba(0, 0, 0, 0.8) 100%)",
            }}
          ></div>
        )}

        <div className="custom-card-title">{item.title}</div>
        <div className="custom-card-menu">
          {isRestore && restoreId === item._id ? (
            <Spinner className="m-10" size="sm" style={{ color: "white" }} />
          ) : (
            <CustomMenu
              onDelete={() => {
                setShowDeleteModal(true);
              }}
              onRestore={() => {
                handelRestore();
                setRestoreId(item._id);
              }}
            />
          )}
        </div>
      </div>
      <DeleteModal
        show={showDeleteModal}
        handleClose={() => setShowDeleteModal(false)}
        onDelete={() => {
          handelDelete();
        }}
        isDelete={isDelete}
        title="Are you sure you want to proceed?"
        text="Once deleted, they cannot be recovered."
      />
    </>
  );
};

export default Card;
