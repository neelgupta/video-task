import React, { useState } from "react";
import "./PlanBilling.scss";
import { icons } from "../../../../../utils/constants";
import { creteImgFilter } from "../../../../../utils/helpers";
import { Button } from "react-bootstrap";
import PlanCard from "./PlanCard";
import BillingCard from "./BillingCard";
import PaymentForm from "./PaymentForm";
import AddressForm from "./AddressForm";
function PlanBilling() {
  const [isAddAddress, setIsAddAddress] = useState(false);
  const [isAddPayment, setIsAddPayment] = useState(false);
  const [apartmentType, setApartmentType] = useState("");
  const cardList = [
    {
      type: "free",
      title: "Free Plan",
      subTitle: "for individuals and small businesses",
      price: "Free",
      planDes: [
        "50 Page Unlock",
        "10 GB Storage",
        "6 Team Members",
        "Unlimited basic feature",
      ],
      bestDealBtn: {
        is: false,
        text: "Best Deal",
      },
      moreBtn: {
        is: false,
        text: "Learn More",
      },
      upgradeBtn: {
        is: true,
        isSelect: true,
        text: "Current Plan",
      },
    },
    {
      type: "basic",
      title: "Basic Plan",
      subTitle: "for individuals and small businesses",
      price: "10",
      planDes: [
        "50 Page Unlock",
        "10 GB Storage",
        "6 Team Members",
        "Unlimited basic feature",
      ],
      bestDealBtn: {
        is: true,
        text: "Best Deal",
      },
      moreBtn: {
        is: true,
        text: "Learn More",
      },
      upgradeBtn: {
        is: false,
        isSelect: false,
        text: "Current Plan",
      },
    },
    {
      type: "pro",
      title: "Pro Plan",
      subTitle: "for growing businesses.",
      price: "20",
      planDes: [
        "100 Page Unlock",
        "23 GB Storage",
        "7 Team Members",
        "Unlimited basic feature",
      ],
      bestDealBtn: {
        is: false,
        text: "Best Deal",
      },
      moreBtn: {
        is: true,
        text: "Learn More",
      },
      upgradeBtn: {
        is: true,
        isSelect: false,
        text: "Upgrade Plan",
      },
    },
    {
      type: "enterprise",
      title: "Enterprise Plan",
      subTitle: " for large organizations.",
      price: "Custom",
      planDes: [
        "Custom Page Unlock",
        "Custom GB Storage",
        "Custom Team Members",
        "Unlimited basic feature",
      ],
      bestDealBtn: {
        is: false,
        text: "Best Deal",
      },
      moreBtn: {
        is: true,
        text: "Contact Us",
      },
      upgradeBtn: {
        is: true,
        isSelect: false,
        text: "Contact Us",
      },
    },
  ];
  return (
    <>
      <PaymentForm
        show={isAddPayment}
        onHide={() => {
          setIsAddPayment(false);
        }}
      />
      <AddressForm
        ApartmentType={apartmentType}
        show={isAddAddress}
        onHide={() => {
          setIsAddAddress(false);
        }}
      />
      <div className="PlanBilling">
        <div className="Plans">
          <div className="text-24-700" style={{ color: "#1B2559" }}>
            Plans
          </div>
          <div className="plans-card-box mt-20">
            {cardList.map((ele, index) => {
              return <PlanCard ele={ele} key={index} />;
            })}
          </div>
        </div>
        <div className="Billing">
          <div className="text-24-700" style={{ color: "#1B2559" }}>
            Billing
          </div>
          <div className="Billing-card-box mt-20">
            {["Billing Address", "Shipping  Address"].map((ele, index) => {
              return (
                <BillingCard
                  key={index}
                  ele={ele}
                  type="billing"
                  onAddEdit={() => {
                    setIsAddAddress(true);
                    setApartmentType(ele);
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
                  ele={ele}
                  type="Payment"
                  onAddEdit={() => {
                    setIsAddPayment(true);
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
