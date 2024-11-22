import React, { useEffect, useState } from "react";
import { icons } from "../../../../../utils/constants";
import { creteImgFilter } from "../../../../../utils/helpers";
import { useDispatch } from "react-redux";
import { api } from "../../../../../services/api";
import { showSuccess, throwError } from "../../../../../store/globalSlice";
import { Spinner } from "react-bootstrap";

function BillingCard({ addressType, type, onAddEdit, addressList, onFetch }) {
  const dispatch = useDispatch();
  const [billingData, setBillingData] = useState([]);
  const [shippingData, setShippingData] = useState([]);
  const [iseDelete, setIsDelete] = useState(false);
  const [deletedId, setDeletedId] = useState("");

  useEffect(() => {
    if (addressList?.length > 0) {
      console.log("addressList", addressList);
      setBillingData(
        addressList.filter((ele) => ele.address_type === "Billing")
      );
      setShippingData(
        addressList.filter((ele) => ele.address_type === "Shipping")
      );
    }
  }, [addressList]);
  const getList = () => {
    if (type === "billing" && addressType === "Billing") {
      return billingData;
    }
    if (type === "billing" && addressType === "Shipping") {
      return shippingData;
    }
    if (type === "Payment") {
      return billingData;
    }
  };

  const deleteAddress = async (ele) => {
    setIsDelete(true);

    try {
      const res = await api.delete(`user/delete-address/${ele?._id}`);
      if ([201, 200].includes(res.status)) {
        dispatch(showSuccess(res.data.message));
        onFetch();
      } else {
        dispatch(throwError(res.data.message));
      }
    } catch (error) {
      console.log("error", error);
      dispatch(throwError(error.response.data.message));
    }
    setIsDelete(false);
  };
  return (
    <div className="Billing_card">
      <div className="Billing_header">
        {addressType} {type === "billing" && "Address"}
      </div>
      <div className="Billing_body">
        {getList().map((ele, index) => {
          return (
            <div className="det_card" key={index}>
              <div className="edit_delete_btn">
                <img
                  src={icons.edit}
                  alt=""
                  className="fit-image w-18 h-18 pointer "
                  style={{ filter: creteImgFilter("#1B2559") }}
                  onClick={() => onAddEdit(true, ele)}
                />
                {iseDelete && deletedId === ele._id ? (
                  <div className="w-18 h-18 fa-center">
                    <Spinner
                      animation="border"
                      style={{ color: "red" }}
                      size="sm"
                    />
                  </div>
                ) : (
                  <img
                    src={icons.deleteSVG}
                    alt=""
                    className="fit-image w-18 h-18 pointer"
                    style={{ filter: creteImgFilter("#FF0000") }}
                    onClick={() => {
                      deleteAddress(ele);
                      setDeletedId(ele._id);
                    }}
                  />
                )}
              </div>
              {type === "billing" && (
                <>
                  <div className="text-16-500">{ele.apartment_number}</div>
                  <div className="text-14-400">{ele.street_name}</div>
                  <div className="text-14-400">{ele.state}</div>
                  <div className="text-14-400">{ele.pinCode}</div>
                  <div className="text-14-400">{ele.country}</div>
                  <div className="mt-10">
                    <img
                      src={icons.email}
                      alt=""
                      className="fit-image w-14 h-14"
                      style={{ filter: creteImgFilter("#696969") }}
                    />
                    <span
                      className="text-11-400 ms-5"
                      style={{ color: "#696969" }}
                    >
                      {ele.email}
                    </span>
                  </div>
                </>
              )}

              {type === "Payment" && (
                <div
                  style={{
                    display: "flex",
                    alignItems: "start",
                    gap: "15px",
                  }}
                >
                  <div className="">
                    <img src={icons.master} alt="" className="fit-image w-40" />
                  </div>
                  <div>
                    <div className="text-16-500 " style={{ color: "#2C2C2C" }}>
                      Master Card
                    </div>
                    <div
                      className="text-12-500 mt-5"
                      style={{ color: "#2C2C2C" }}
                    >
                      **** **** **** 4002
                    </div>
                    <div
                      className="text-10-500 mt-5"
                      style={{ color: "#696969" }}
                    >
                      Expiry on 20/2024
                    </div>
                    <div className="mt-10">
                      <img
                        src={icons.email}
                        alt=""
                        className="fit-image w-14 h-14"
                        style={{ filter: creteImgFilter("#696969") }}
                      />
                      <span
                        className="text-11-400 ms-5"
                        style={{ color: "#696969" }}
                      >
                        drchque@gmail.com
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}

        <div
          className="wp-100"
          style={{ display: "flex", justifyContent: "end" }}
        >
          <div
            onClick={() => onAddEdit(false)}
            className="pointer mt-8"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "5px",
            }}
          >
            <div
              className="w-18 h-18"
              style={{
                border: "1px solid #1B2559",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <img
                src={icons.addIcon}
                alt=""
                className="fit-image w-10 h-10"
                style={{ filter: creteImgFilter("#1B2559") }}
              />
            </div>
            <div className="text-12-500" style={{ color: "#696969" }}>
              Add More
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BillingCard;
