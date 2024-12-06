import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import Layout from "../pages/Layout";
import Price from "../pages/User/Price";
import Subscription from "../pages/User/Subscription";
import Dashboard from "../pages/User/Dashboard";
import AssetAllocation from "../pages/User/AssetAllocation";
import Interaction from "../pages/User/Interactions";
import Trash from "../pages/User/Trash";
import MyCollection from "../pages/User/MyCollection";
import Profile from "../pages/User/Profile";
import { useEffect, useState } from "react";
import Contacts from "../pages/User/Contacts";
import VisitContacts from "../pages/User/Contacts/VisitContacts";
import FlowCanvas from "../pages/FlowCanvas";
import MyOrganization from "../pages/User/MyOrganization";
import { api } from "../services/api";
import { useDispatch } from "react-redux";
import {
  handleProfileStore,
  setProfileData,
  setSelectedOrganization,
} from "../store/globalSlice";
import MyFolder from "../pages/User/MyCollection/MyFolder";

const UserRoute = () => {
  const [isResetPassword, setIsResetPassword] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Fetch profile
  const getProfile = async () => {
    dispatch(handleProfileStore());
  };

  useEffect(() => {
    getProfile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const routeList = [
    {
      path: "/user/price",
      component: <Price />,
    },
    {
      path: "/user/subscription",
      component: <Subscription />,
    },
    {
      path: "/user/interactions",
      component: <Interaction />,
      pageTitle: "Interactions",
    },
    {
      path: "/user/contacts",
      component: <Contacts />,
      pageTitle: "Contacts",
    },
    {
      path: "/user/collection",
      component: <MyCollection />,
      pageTitle: "My Collection",
    },
    {
      path: "/user/collection/:id",
      component: <MyFolder />,
      pageTitle: "My Folder",
      onBack: () => navigate("/user/collection"),
    },
    {
      path: "/user/trash",
      component: <Trash />,
      pageTitle: "Trash",
    },
    {
      path: "/user/dashboard",
      component: <Dashboard />,
      pageTitle: "Dashboard",
    },
    {
      path: "/user/contacts/visit",
      component: <VisitContacts />,
      pageTitle: "Back to Contacts",
      onBack: () => navigate("/user/contacts"),
    },
    {
      path: "/user/profile",
      component: (
        <Profile
          isResetPassword={isResetPassword}
          setIsResetPassword={setIsResetPassword}
        />
      ),
      pageTitle: isResetPassword ? "Reset Password" : "My Account",
      onBack: () => setIsResetPassword(false),
    },
    {
      path: "/user/asset-allocation",
      component: <AssetAllocation />,
      pageTitle: "Asset Allocation",
    },
    {
      path: "/user/my-organization/:type",
      component: <MyOrganization />,
      pageTitle: "Explore Your Organization",
      onSetProfile: () => getProfile(),
    },
  ];
  return (
    <Routes>
      {routeList?.map((elm, index) => {
        return (
          <Route
            key={index}
            path={elm.path}
            element={
              <Layout pageTitle={elm.pageTitle} onBack={elm.onBack}>
                {elm.component}
              </Layout>
            }
          />
        );
      })}
      <Route path="/user/flow/:id" element={<FlowCanvas />} />
      <Route path="*" element={<Navigate to="/user/dashboard" />} />
    </Routes>
  );
};

export default UserRoute;
