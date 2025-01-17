import React, { useEffect, useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import "./CheckoutForm.scss";
import { icons } from "../../../../../../utils/constants";
import { creteImgFilter } from "../../../../../../utils/helpers";
import dayjs from "dayjs";
import { useDispatch, useSelector } from "react-redux";
import {
  handelCatch,
  handleProfileStore,
  showSuccess,
  throwError,
} from "../../../../../../store/globalSlice";
import { api } from "../../../../../../services/api";
import { Spinner } from "react-bootstrap";
import SuccessModal from "../../../../Profile/ResetPassword/SuccessModal";

const CheckoutForm = ({
  addressArray,
  paymentCardList,
  planData,
  onHide,
  setIsSuccess,
}) => {
  const stripe = useStripe();
  const elements = useElements();
  const { selectedOrganizationId } = useSelector((state) => state.global);
  const dispatch = useDispatch();
  const [selectAddress, setSelectAddress] = useState("");
  const [selectPaymentCard, setSelectPaymentCard] = useState("");
  const [isPaymentLoad, setIsPaymentLoad] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState(null);
  useEffect(() => {
    if (
      !planData?.stripe_plan_id ||
      addressArray.length < 0 ||
      paymentCardList.length < 0
    ) {
      onHide();
      return;
    }
    setSelectAddress(addressArray?.[0]?._id);
    setSelectPaymentCard(paymentCardList?.[0]);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [planData, addressArray, paymentCardList]);

  const handleSubmit = async (client) => {
    if (!stripe || !elements) return;

    // Example client secret from your backend
    const clientSecret = client?.clientSecret;

    const { error, paymentIntent } = await stripe.confirmCardPayment(
      clientSecret,
      {
        payment_method: selectPaymentCard?.stripe_payment_method_id,
      }
    );

    if (error) {
      console.log("error ======>", error);
      dispatch(throwError(error.message));
      setIsPaymentLoad(false);
    } else if (paymentIntent.status === "succeeded") {
      dispatch(showSuccess("Subscription plan purchased successfully."));
      const timer = setTimeout(() => {
        setIsPaymentLoad(false);
        setIsSuccess(true);
        onHide();
      }, 1000);
    }
  };

  useEffect(() => {}, []);

  const handlePayment = async () => {
    setIsPaymentLoad(true);
    try {
      const req = {
        subscription_plan_id: planData._id, //677d12d115988d338e47e3d4
        organization_id: selectedOrganizationId,
        plan_type: planData.plan_type, //[free, premium]
        shipping_address_id: selectPaymentCard.shipping_address_id,
        billing_address_id: selectAddress,
        payment_method_id: selectPaymentCard._id,
      };
      const res = await api.post("user/purchase-plan", req);
      if (res.status === 201) {
        setPaymentMethod(res.data.response);
        handleSubmit(res.data.response);
      } else {
        dispatch(throwError(res.data.message));
        setIsPaymentLoad(false);
      }
    } catch (error) {
      console.log("error", error);
      dispatch(handelCatch(error));
      setIsPaymentLoad(false);
    }
  };

  return (
    <div className="card-element-container">
      <div className="address-details">
        <div className="header">
          <div className="w-35 ">
            <img src={icons.address} alt="" className="fit-image" />
          </div>
          <p>Billing address</p>
        </div>
        <div className="select-billing-address">
          {addressArray.map((ele, index) => {
            return (
              <div
                key={index}
                className={`billing-card ${
                  selectAddress === ele._id ? "active" : ""
                }`}
                onClick={() => {
                  setSelectAddress(ele._id);
                }}
              >
                <div className="details-icon w-25 h-25">
                  <img src={icons.address} alt="" className="fit-image" />
                </div>
                <div className="details">
                  <p className="email">{ele.email}</p>
                  <p className="country">{ele.country}</p>
                  <p className="pinCode">{ele.pinCode}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div className="mastercard-details">
        <div className="header">
          <div className="w-30 me-10 ">
            <img src={icons.mastercard} alt="" className="fit-image" />
          </div>
          <p>Card details</p>
        </div>
        <div className="select-mastercard-list">
          {paymentCardList.map((ele, index) => {
            return (
              <div
                className={`wp-45 mastercard ${
                  selectPaymentCard._id === ele._id ? "active" : ""
                }`}
                key={index}
                onClick={() => setSelectPaymentCard(ele)}
              >
                <div className="is-select-circle"></div>
                <div className="">
                  <img src={icons.master} alt="" className="fit-image w-40" />
                </div>
                <div>
                  <div className="text-16-500 " style={{ color: "#2C2C2C" }}>
                    Master Card
                  </div>
                  <div
                    className="text-12-500 mt-5 "
                    style={{ color: "#2C2C2C" }}
                  >
                    **** **** **** {ele.card_number.slice(-4)}
                  </div>
                  <div
                    className="text-10-500 mt-5"
                    style={{ color: "#696969" }}
                  >
                    Expiry on {dayjs(ele.expiry_date).format("MM/YYYY")}
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
                      {ele.email}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div className="payment-btn-group">
        <button
          className="payment-btn"
          disabled={isPaymentLoad}
          onClick={handlePayment}
        >
          Pay now
          {isPaymentLoad && <Spinner size="sm" color="white" />}
        </button>
        <button onClick={onHide} className="cancel-btn">
          Cancel
        </button>
      </div>
    </div>
  );
};

export default CheckoutForm;
