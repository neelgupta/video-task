import React, { useEffect, useState } from "react";
import "./PlanBilling.scss";
import { Spinner } from "react-bootstrap";
import PlanCard from "./PlanCard";
import BillingCard from "./BillingCard";
import PaymentForm from "./PaymentForm";
import AddressForm from "./AddressForm";
import { api } from "../../../../../services/api";
import { useSelector } from "react-redux";
function PlanBilling() {
  const { selectedOrganizationId } = useSelector((state) => state.global);
  const [isAddAddress, setIsAddAddress] = useState(false);
  const [isAddPayment, setIsAddPayment] = useState(false);
  const [type, setType] = useState("");
  const [planCardList, setPlanCardList] = useState([]);
  const [addressList, setAddressList] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const [editData, setEditData] = useState({});

  useEffect(() => {
    fetchPlanCard();
    fetchAddressCard();
  }, []);

  const fetchPlanCard = async () => {
    try {
      const res = await api.get("user/get-plans");
      console.log("fetchPlanCard", res);
      if (res.status === 200) {
        setPlanCardList(res.data.response);
      }
    } catch (error) {
      console.log("error", error);
    }
  };
  const fetchAddressCard = async () => {
    try {
      const res = await api.get("user/get-address-list");
      console.log("fetchAddressCard", res);
      if (res.status === 200) {
        setAddressList(res.data.response);
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <>
      <PaymentForm
        show={isAddPayment}
        selectedOrganizationId={selectedOrganizationId}
        isEdit={isEdit}
        onHide={() => {
          setIsAddPayment(false);
          setIsEdit(false);
        }}
        editData={editData}
      />
      <AddressForm
        selectedOrganizationId={selectedOrganizationId}
        type={type}
        show={isAddAddress}
        isEdit={isEdit}
        onHide={(isCreate) => {
          setIsAddAddress(false);
          setIsEdit(false);
          if (isCreate) {
            fetchAddressCard();
          }
        }}
        editData={editData}
      />
      <div className="PlanBilling">
        <div className="Plans">
          <div
            className="text-24-700"
            style={{ color: "#1B2559", display: "flex", alignItems: "center" }}
          >
            Plans
          </div>
          <div className="plans-card-box mt-20">
            {planCardList.length > 0 &&
              planCardList.map((ele, index) => {
                return <PlanCard ele={ele} key={index} />;
              })}
            {planCardList.length === 0 && (
              <Spinner animation="border" size="xs" className="ms-20" />
            )}
          </div>
        </div>
        <div className="Billing">
          <div className="text-24-700" style={{ color: "#1B2559" }}>
            Billing
          </div>
          <div className="Billing-card-box mt-20">
            {["Billing", "Shipping"].map((ele, index) => {
              return (
                <BillingCard
                  key={index}
                  addressType={ele}
                  type="billing"
                  onAddEdit={(isEdit, isEditData) => {
                    setIsAddAddress(true);
                    setType(ele);
                    setIsEdit(isEdit);
                    setEditData(isEditData || {});
                  }}
                  addressList={addressList}
                  onFetch={() => {
                    fetchAddressCard();
                  }}
                />
              );
            })}
          </div>
        </div>
        <div className="Billing">
          <div className="text-24-700" style={{ color: "#1B2559" }}>
            Payment
          </div>
          <div className="Billing-card-box mt-20">
            {["Payment Method"].map((ele, index) => {
              return (
                <BillingCard
                  key={index}
                  addressType={ele}
                  type="Payment"
                  onAddEdit={(isEdit, isEditData) => {
                    setIsAddPayment(true);
                    setIsEdit(isEdit);
                    setEditData(isEditData || {});
                  }}
                  onFetch={() => {
                    fetchAddressCard();
                  }}
                />
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}

export default PlanBilling;
