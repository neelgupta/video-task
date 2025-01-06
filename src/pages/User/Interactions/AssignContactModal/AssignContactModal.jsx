import React, { useEffect, useState } from "react";
import { Button, Modal, Spinner } from "react-bootstrap";
import "./AssignContactModal.scss";
import { useDispatch, useSelector } from "react-redux";
import {
  handelCatch,
  showSuccess,
  throwError,
} from "../../../../store/globalSlice";
import { api } from "../../../../services/api";
import Select from "react-select";

const AssignContactModal = ({
  show,
  handleClose,
  fetchContact,
  selectedOrganizationId,
  isAnonymous,
  selectedContact,
}) => {
  const dispatch = useDispatch();
  const reduxData = useSelector((state) => state.global);
  const { themeColor } = reduxData;
  const [isSubmit, setIsSubmit] = useState(false);
  const [contactsOption, setContactsOption] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [selectedEmail, setSelectedEmail] = useState("");

  useEffect(() => {
    (() => {
      if (searchText.length > 2) {
        fetchAllContact();
        return;
      }
      setContactsOption([]);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchText]);

  const fetchAllContact = async () => {
    try {
      const res = await api.get(
        `contact/filter-contact/${selectedOrganizationId}?search=${searchText}`
      );
      if (res.status === 200) {
        setContactsOption(
          res.data.response.map((ele) => {
            return {
              label: ele.contact_email,
              value: ele?.contact_name || "",
              id: ele?._id,
              ele,
            };
          })
        );
      } else {
        dispatch(throwError(res.data.message));
      }
    } catch (error) {
      console.log("error", error);
      dispatch(handelCatch(error));
    }
  };

  const handleSubmitForm = async () => {
    setIsSubmit(true);
    try {
      const req = {
        contact_id: selectedEmail.id,
        answer_id: selectedContact._id,
        organization_id: selectedOrganizationId,
      };
      const res = await api.post("contact/assign-anonymous", req);
      if (res.status === 200) {
        dispatch(showSuccess(res.data.message));
        fetchContact();
      } else {
        dispatch(throwError(res.data.message));
      }
    } catch (error) {
      console.log("error", error);
      dispatch(handelCatch(error));
    }
    setIsSubmit(true);
    handleClose();
  };

  return (
    <Modal
      show={show}
      onHide={handleClose}
      centered
      backdrop="static"
      className="AssignContactModalContainer"
    >
      <Modal.Header closeButton>
        <Modal.Title>
          <div className="text-24-700 text-center" style={{ color: "#1B2559" }}>
            Assign Contact
          </div>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="bodyContainer">
          <div className="form-items">
            <div className="text-16-500 mb-5">Select an Email</div>
            <div id="select-search-option">
              <Select
                classNamePrefix="do-block"
                options={contactsOption}
                value={selectedEmail}
                onChange={(option) => {
                  setSelectedEmail(option);
                }}
                onInputChange={(newValue) => setSearchText(newValue)}
                placeholder="Search or select..."
                styles={customStyles}
                isSearchable={true}
                components={{
                  Option: CustomOption, // Use the custom option renderer
                }}
              />
            </div>
          </div>

          <div
            className="wp-100 mt-40"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
              gap: "20px",
            }}
          >
            <Button onClick={handleClose} className="px-40" variant="secondary">
              Cancel
            </Button>
            <Button
              className="px-40"
              type="submit"
              disabled={!selectedEmail}
              style={{
                background: `linear-gradient(to right , ${themeColor.darkColor}, ${themeColor.lightColor} 100%)`,
                border: "none",
                color: "white",
                display: "flex",
                alignItems: "center",
              }}
              onClick={() => {
                handleSubmitForm();
              }}
            >
              Assign
              {isSubmit && (
                <Spinner size="sm" color="white" className="ms-10" />
              )}
            </Button>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default AssignContactModal;

const customStyles = {
  // Style for the dropdown container
  control: (provided, state) => ({
    ...provided,
    boxShadow: "none", // Removes default box shadow
    borderRadius: "10px", // Rounded corners
    border: state.isFocused ? "1px solid #8000ff" : "1px solid #cccccc", // Border color based on focus
    padding: "5px 10px", // Inner padding
    "&:hover": {
      borderColor: "#8000ff", // Border color on hover
    },
    width: "500px",
  }),
  // Style for the selected value in the control
  singleValue: (provided, state) => ({
    ...provided,
    color: state.isDisabled ? "gray" : "black", // Text color
    fontSize: "14px", // Font size
    fontWeight: 400, // Normal font weight
  }),
  option: (base, { isFocused, isSelected }) => ({
    ...base,
    backgroundColor: isSelected ? "#b3a1ff" : "white",
    color: "black",
    "&:hover": {
      backgroundColor: "#dcedc8",
    },
  }),
};

const CustomOption = (props) => {
  const {
    data: { ele },
    innerRef,
    innerProps,
    isSelected,
  } = props;

  return (
    <div
      ref={innerRef}
      {...innerProps}
      style={{
        background: isSelected ? "black" : "white",
        padding: "10px",
        cursor: "pointer",
        backgroundColor: props.isFocused ? "#e8f5e9" : "white",
        display: "flex",
        alignItems: "center",
      }}
    >
      <div
        style={{
          width: "50px",
          height: "50px",
          borderRadius: "50%",
          boxShadow: "5px 5px 10px rgba(0,0,0,0.3)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginRight: "15px",
          textTransform: "uppercase",
          fontSize: "16px",
          fontWeight: "700",
          color: isSelected ? "#8000ff" : "black",
        }}
      >
        {ele.contact_email.charAt(0)}
      </div>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <strong
          style={{ color: isSelected ? "#8000ff" : "black", fontSize: "16px" }}
        >
          {ele.contact_email}
        </strong>
        <div
          style={{
            color: isSelected ? "#7c5bff" : "rgb(100,100,100)",
            fontSize: "14px",
          }}
        >
          {ele?.contact_name || "-"}
        </div>
      </div>
    </div>
  );
};
