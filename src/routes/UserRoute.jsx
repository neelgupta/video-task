import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import Layout from "../pages/Layout";
import Price from "../pages/User/Price";
import Subscription from "../pages/Admin/Subscription";
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
import { useDispatch, useSelector } from "react-redux";
import {
  handleProfileStore,
  setLibraryModelConfig,
  setProfileData,
  setQueModelConfig,
  setReplyModalData,
  setSelectedOrganization,
  setWebcamModelConfig,
} from "../store/globalSlice";
import MyFolder from "../pages/User/MyCollection/MyFolder";
import ViewInteraction from "../pages/User/ViewInteraction";
import Template from "../pages/User/Template";
import WebcamRecorder from "../pages/FlowCanvas/Modals/WebcamRecorder/WebcamRecorder";
import Reply from "../pages/User/Reply";
import LibraryUpload from "../pages/FlowCanvas/Modals/LibraryUpload/LibraryUpload";

const UserRoute = () => {
  const [isResetPassword, setIsResetPassword] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    queModelConfig,
    replyModalData,
    webcamModelConfig,
    libraryModelConfig,
  } = useSelector((state) => state.global);

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
      path: "/user/contacts/visit/:id",
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
      path: "/user/asset-allocation/:id",
      component: <AssetAllocation />,
      pageTitle: "Asset Allocation",
      onBack: () => navigate("/user/collection"),
    },
    {
      path: "/user/my-organization/:type",
      component: <MyOrganization />,
      pageTitle: "Explore Your Organization",
    },
  ];

  const handelResetModel = () => {
    dispatch(
      setWebcamModelConfig({
        isShow: false,
        blobFile: null,
        blobUrl: "",
      })
    );
    dispatch(
      setQueModelConfig({
        modalType: "",
        nodeData: null,
        isEdit: false,
        isShow: false,
      })
    );
    dispatch(
      setReplyModalData({
        isShow: false,
        interactionId: "",
        contactId: "",
        answerId: "",
        type: "",
      })
    );
    dispatch(
      setLibraryModelConfig({
        isShow: false,
        uploadType: "video",
        videoUrl: null,
      })
    );
  };
  return (
    <>
      {webcamModelConfig.isShow && (
        <WebcamRecorder
          show={webcamModelConfig.isShow}
          recorderConfig={{
            audio: true,
            ...(queModelConfig.modalType
              ? queModelConfig.modalType === "Webcam"
                ? { video: true }
                : { screen: true }
              : { video: true }),
          }}
          modalType={queModelConfig.modalType}
          handleClose={handelResetModel}
        />
      )}

      {libraryModelConfig.isShow && (
        <LibraryUpload
          show={libraryModelConfig.isShow}
          handleClose={handelResetModel}
        />
      )}

      <Routes>
        {routeList?.map((elm, index) => {
          return (
            <Route
              key={index}
              path={elm.path}
              element={
                <Layout pageTitle={elm.pageTitle} onBack={elm.onBack}>
                  {replyModalData.isShow && (
                    <Reply
                      show={replyModalData.isShow}
                      handleClose={handelResetModel}
                    />
                  )}

                  {elm.component}
                </Layout>
              }
            />
          );
        })}
        <Route path="/user/flow/:id" element={<FlowCanvas />} />
        <Route path="/view-flow/:token/:type?" element={<ViewInteraction />} />
        <Route path="/explore-Template" element={<Template />} />

        <Route path="*" element={<Navigate to="/user/dashboard" />} />
      </Routes>
    </>
  );
};

export default UserRoute;
