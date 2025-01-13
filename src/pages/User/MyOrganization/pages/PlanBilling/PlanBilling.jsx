import React, { useEffect, useState } from "react";
import "./PlanBilling.scss";
import { Spinner } from "react-bootstrap";
import PlanCard from "./PlanCard";
import BillingCard from "./BillingCard";
import PaymentForm from "./PaymentForm";
import AddressForm from "./AddressForm";
import { api } from "../../../../../services/api";
import { useDispatch, useSelector } from "react-redux";
import { handelCatch, throwError } from "../../../../../store/globalSlice";
import PurchasePlan from "./PurchasePlan";

const planList = [
  {
    _id: "67401df9951042cd61c43041",
    plan_uuid: "SUB-BKJBXS",
    title: "Enterprise Plan",
    plan_type: "enterprise",
    sub_title: "For large organizations",
    price: "Custom",
    description: "Everything you get in this plan",
    currency: "$",
    is_best_deal: false,
    is_upgrade: false,
    is_custom: true,
    storage: "Custom",
    members: "Custom",
    page: "Custom",
    button_text: "Contact Us",
    is_active: true,
    is_deleted: false,
    createdAt: "2024-11-22T06:00:25.972Z",
    updatedAt: "2024-11-22T06:00:25.972Z",
    v: 0,
  },
];
function PlanBilling() {
  const { selectedOrganizationId, profileData } = useSelector(
    (state) => state.global
  );
  const [isAddAddress, setIsAddAddress] = useState(false);
  const [isAddPayment, setIsAddPayment] = useState(false);
  const [isPurchasePlan, setIsPurchasePlan] = useState(false);
  const [type, setType] = useState("");
  const [planCardList, setPlanCardList] = useState([]);
  const [addressList, setAddressList] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const [editData, setEditData] = useState({});
  const [paymentCardList, setPaymentCardList] = useState([]);
  const [selectedPlan, setSelectedPlan] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    if (selectedOrganizationId) {
      fetchPlanCard();
      fetchAddressCard();
      fetchPaymentCard();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedOrganizationId]);

  const fetchPlanCard = async () => {
    try {
      const res = await api.get("user/get-plans");
      if (res.status === 200) {
        setPlanCardList([...res.data.response]);
      } else {
        dispatch(throwError(res.data.message));
      }
    } catch (error) {
      console.log("error", error);
      dispatch(handelCatch(error));
    }
  };
  const fetchAddressCard = async () => {
    try {
      const res = await api.get(
        // `user/get-address-list/${selectedOrganizationId}`
        `user/get-address-list`
      );
      if (res.status === 200) {
        setAddressList(res.data.response);
      } else {
        dispatch(throwError(res.data.message));
      }
    } catch (error) {
      console.log("error", error);
      dispatch(handelCatch(error));
    }
  };

  const fetchPaymentCard = async () => {
    try {
      const res = await api.get(
        `user/get-payment-methods/${selectedOrganizationId}`
      );
      if (res.status === 200) {
        setPaymentCardList(res.data.response);
      } else {
        dispatch(throwError(res.data.message));
      }
    } catch (error) {
      console.log("error", error);
      dispatch(handelCatch(error));
    }
  };

  return (
    <>
      {isAddPayment && (
        <PaymentForm
          show={isAddPayment}
          selectedOrganizationId={selectedOrganizationId}
          isEdit={isEdit}
          onHide={() => {
            setIsAddPayment(false);
            setIsEdit(false);
          }}
          editData={editData}
          addressArray={addressList.filter(
            (ele) => ele.address_type === "Shipping"
          )}
          fetchPaymentCard={fetchPaymentCard}
        />
      )}

      {selectedPlan && isPurchasePlan && (
        <PurchasePlan
          show={isPurchasePlan}
          onHide={() => {
            setIsPurchasePlan(false);
            setSelectedPlan("");
          }}
          planData={selectedPlan}
          addressArray={addressList.filter(
            (ele) => ele.address_type === "Billing"
          )}
          paymentCardList={paymentCardList}
        />
      )}

      {isAddAddress && (
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
      )}

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
                const isActive =
                  profileData?.profile?.current_subscription_id
                    ?.subscription_plan_id === ele._id;
                return (
                  <PlanCard
                    ele={ele}
                    key={index}
                    onPurchase={(plan) => {
                      setSelectedPlan(plan);
                      setIsPurchasePlan(true);
                    }}
                    isActive={isActive}
                  />
                );
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
                  PaymentCard={paymentCardList}
                  onFetch={() => {
                    fetchPaymentCard();
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
