import React from "react";
import { Modal } from "react-bootstrap";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "../CheckoutForm";
import "./PurchasePlan.scss";
const stripePromise = loadStripe(
  "pk_test_51Mo53GSF7jse029jEgWM9ZxB9dCsBccGMzSykWfF2QDVI3mg2mhSMO3eBiYoXUiNFycNxLh0rAODKPQbX46WvpVq00g9xdcNPf"
);
function PurchasePlan({
  onHide,
  show,
  planData,
  addressArray,
  paymentCardList,
  setIsSuccess,
}) {
  return (
    <Modal
      onHide={onHide}
      show={show}
      centered
      className="PurchasePlan-card"
      style={{ borderRadius: "10px" }}
    >
      <Modal.Body>
        <Elements stripe={stripePromise}>
          <CheckoutForm
            addressArray={addressArray}
            paymentCardList={paymentCardList}
            planData={planData}
            onHide={onHide}
            setIsSuccess={setIsSuccess}
          />
        </Elements>
      </Modal.Body>
    </Modal>
  );
}

export default PurchasePlan;
