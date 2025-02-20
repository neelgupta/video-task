import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
const organizationMenuList = [
  {
    title: "Overview",
    type: "overview",
    isAuth: false,
  },
  {
    title: "Plan & Billing",
    type: "plan-billing",
    isAuth: true,
  },
  {
    title: "Referrals",
    type: "referrals",
    isAuth: true,
  },
  {
    title: "Team",
    type: "team",
    isAuth: false,
  },
  {
    title: "Notifications",
    type: "notifications",
    isAuth: false,
  },
  {
    title: "Media Library",
    type: "media-library",
    isAuth: true,
  },
  {
    title: "Developer Apps",
    type: "developer-apps",
    isAuth: true,
  },
  {
    title: "Webhooks",
    type: "webhooks",
    isAuth: true,
  },
];
function OrganizationHeader({ type }) {
  const reduxData = useSelector((state) => state.global);
  const { selectedOrganizationId, myOrganization } = reduxData;
  const navigate = useNavigate();
  const [menuList, setMenuList] = useState([]);

  useEffect(() => {
    if (selectedOrganizationId && myOrganization) {
      if (selectedOrganizationId === myOrganization?._id) {
        setMenuList(organizationMenuList);
      } else {
        setMenuList(organizationMenuList.filter((ele) => !ele.isAuth));
      }
    }
  }, [selectedOrganizationId, myOrganization]);

  useEffect(() => {
    if (menuList.length > 0 && type) {
      const findMenu = menuList.find((menu) => menu.type === type);
      if (!findMenu) {
        navigate("/");
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [menuList, type]);

  return (
    <div className="OrganizationHeader flow">
      <div className="menu">
        {menuList.map((ele, index) => {
          return (
            <div
              onClick={() => navigate("/user/my-organization/" + ele.type)}
              className={`${type === ele.type && "active"}`}
              key={index}
            >
              {ele.title}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default OrganizationHeader;
