import { createSlice } from "@reduxjs/toolkit";
import { encrypt, storeLocalStorageData } from "../utils/helpers";
import { api } from "../services/api";

const initialState = {
  authData: null,
  errorData: null,
  isResponsive: false,
  themeColor: {
    pColor: "#8000ff",
    sColor: "#e6ccff",
    darkColor: "#7C5BFF",
    lightColor: "#B3A1FF",
  },
  breadCrumbTitle: "",
  profileData: null,
  interactionsStyle: {},
  selectedOrganizationId: "",
  myOrganization: {},
  organizationData: {},
  showCreateFlowModal: false,
  queModelConfig: {
    nodeData: null,
    isEdit: true,
    modalType: "",
    isShow: false,
  },
  webcamModelConfig: {
    isShow: false,
    blobFile: null,
    blobUrl: "",
  },
  libraryModelConfig: {
    isShow: false,
    uploadType: "video",
    videoUrl: null,
    libraryData: {},
  },
  queModalData: {},
  newQueModalData: {},
  replyModalData: {
    isShow: false,
    interactionId: "",
    contactId: "",
    answerId: "",
    type: "",
  },
};

const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    setAuthData(state, action) {
      state.authData = action.payload;
    },
    setErrorData(state, action) {
      state.errorData = action.payload;
    },
    setThemeColor(state, action) {
      state.themeColor = action.payload;
    },
    setIsResponsive(state, action) {
      state.isResponsive = action.payload;
    },
    setBreadCrumbTitle(state, action) {
      state.breadCrumbTitle = action.payload;
    },
    setProfileData(state, action) {
      state.profileData = action.payload;
    },
    resetAllState(state) {
      state.authData = null;
      state.errorData = null;
      state.isResponsive = false;
    },
    setSelectedOrganization(state, action) {
      state.selectedOrganizationId = action.payload;
    },
    setQueModelConfig(state, action) {
      state.queModelConfig = { ...state.queModelConfig, ...action.payload };
    },
    setOrganizationData(state, action) {
      state.organizationData = { ...action.payload };
    },
    setInteractionsStyle(state, action) {
      state.interactionsStyle = {
        ...action.payload,
      };
    },

    setWebcamModelConfig(state, action) {
      state.webcamModelConfig = {
        ...state.webcamModelConfig,
        ...action.payload,
      };
    },
    setReplyModalData(state, action) {
      state.replyModalData = { ...state.replyModalData, ...action.payload };
    },

    setQueModalData(state, action) {
      state.queModalData = { ...action.payload };
    },
    setShowCreateFlowModal(state, action) {
      state.showCreateFlowModal = action.payload;
    },
    setNewQueModalData(state, action) {
      state.newQueModalData = action.payload;
    },

    setMyOrganization(state, action) {
      state.myOrganization = action.payload;
    },
    setLibraryModelConfig(state, action) {
      state.libraryModelConfig = {
        ...state.libraryModelConfig,
        ...action.payload,
      };
    },
  },
});

export const handleLogin = (payload) => async (dispatch) => {
  try {
    const res = await api.post("/login", payload, {});
    if (res?.status === 200) {
      storeLocalStorageData({ ...res?.data, token: "token" });
      dispatch(setAuthData(encrypt({ ...res?.data, token: "token" })));
    }
    return res;
  } catch (error) {
    return dispatch(handelCatch(error));
  }
};

export const handelResponse = (res) => async () => {
  let returnValue = null;
  const status = res?.status;
  switch (status) {
    case 200:
      returnValue = res;
      break;
    case 201:
      returnValue = res;
      break;
    case 204:
      returnValue = {
        status: status,
        data: [],
      };
      break;
    case 400:
      throwError({ message: "Something went wrong!" });
      returnValue = {
        status: status,
        message: "Something went wrong!",
      };
      break;
    default:
      throwError({ message: "Something went wrong!" });
      returnValue = {
        status: status,
        message: "Something went wrong!",
      };
      break;
  }
  return returnValue;
};

export const handelCatch = (error) => async (dispatch) => {
  let status = error?.response?.status;
  let messsage = error?.response?.data?.message || "Something went wrong!";
  let returnCatch = {
    status: status,
    messsage: messsage,
  };
  if (status === 401) {
    dispatch(throwError("Session is expired"));
    dispatch(setAuthData(null));
    localStorage.removeItem("authData");
  } else {
    dispatch(
      setErrorData({
        show: true,
        message: messsage,
        type: "danger",
      })
    );
  }
  return returnCatch;
};

export const showSuccess = (message) => async (dispatch) => {
  dispatch(
    setErrorData({
      show: true,
      message: message,
      type: "success",
    })
  );
};

export const throwError = (message) => async (dispatch) => {
  let newMessage = message;
  newMessage = message || "Something went wrong!";
  dispatch(
    setErrorData({
      show: true,
      message: newMessage,
      type: "danger",
    })
  );
};

export const handleAdminLogin = (payload) => async (dispatch) => {
  try {
    const res = await api.post("/admin/login", payload, {});
    dispatch(showSuccess(res?.data?.message));
    return res;
  } catch (error) {
    return dispatch(handelCatch(error));
  }
};

export const handleUserLogin = (payload) => async (dispatch) => {
  try {
    const res = await api.post("/providers/sign-in", payload, {});
    dispatch(showSuccess(res?.data?.message));
    return res;
  } catch (error) {
    return dispatch(handelCatch(error));
  }
};

export const handleUSerSignup = (payload) => async (dispatch) => {
  try {
    const res = await api.post("/providers/sign-up", payload, {});
    dispatch(showSuccess(res?.data?.message));
    return res;
  } catch (error) {
    return dispatch(handelCatch(error));
  }
};

export const handleProfileStore = () => async (dispatch) => {
  try {
    const res = await api.get("user/profile");
    if (res.status && res.status === 200) {
      dispatch(setProfileData(res.data.response));
      const profile = res.data.response.profile;
      const organizations = res.data.response.organizations;
      const myOrg = organizations.find((org) => org.added_by === profile._id);
      dispatch(setSelectedOrganization(myOrg?._id));
      dispatch(setMyOrganization({ ...myOrg, userDetails: {} }));
    }
    return;
  } catch (error) {
    console.log("error", error);
    return dispatch(handelCatch(error));
  }
};

export const handleFetchFlowData = (payload) => async (dispatch) => {
  const { id, setEdges, setNodes, navigate, setInteractions } = payload;
  try {
    const res = await api.get(`interactions/get-nodes/${id}`);
    if (res.status === 200) {
      const {
        data: {
          response: { edges, nodes, ...int },
        },
      } = res;
      dispatch(
        setInteractionsStyle({
          border_radius: int?.border_radius || 10,
          background_color: int?.background_color || "",
          primary_color: int?.primary_color || "",
          secondary_color: int?.secondary_color || "",
          language: int?.language || "",
          font: int?.font || "",
        })
      );
      if (nodes && edges && nodes.length > 1 && edges.length > 0) {
        setNodes(
          nodes.map((node, index) => ({
            ...node,
            id: node._id,
            index: index + 1,
            intId: id,
            data: node,
          }))
        );
        setEdges(
          edges.map((edge, index) => ({
            ...edge,
            id: edge._id,
            type: "button",
            index: index + 1,
            intId: id,
            data: edge,
          }))
        );
      } else {
        dispatch(throwError("Nodes & edges are empty"));
      }
    } else {
      dispatch(throwError(res.data.message));
    }
  } catch (error) {
    console.log("error", error);
    dispatch(throwError(error?.data?.response?.message || "Flow not found"));
    navigate("/user/dashboard");
  }
};

export const handleFetchTemplate = (payload) => async (dispatch) => {
  const { id, setEdges, setNodes, setIsFetch } = payload;
  setIsFetch(true);
  try {
    const res = await api.get(`template/get-template/${id}`);
    if (res.status === 200) {
      const {
        data: {
          response: { edges, nodes, ...int },
        },
      } = res;
      dispatch(
        setInteractionsStyle({
          border_radius: int?.border_radius || 10,
          background_color: int?.background_color || "",
          primary_color: int?.primary_color || "",
          secondary_color: int?.secondary_color || "",
          language: int?.language || "",
          font: int?.font || "",
        })
      );
      if (nodes && edges && nodes.length > 1 && edges.length > 0) {
        setNodes(
          nodes.map((node, index) => ({
            ...node,
            id: node._id,
            index: index + 1,
            intId: id,
            data: node,
          }))
        );
        setEdges(
          edges.map((edge, index) => ({
            ...edge,
            id: edge._id,
            type: "button",
            index: index + 1,
            intId: id,
            data: edge,
          }))
        );
      } else {
        dispatch(throwError("Nodes & edges are empty"));
      }
    } else {
      dispatch(throwError(res.data.message));
    }
  } catch (error) {
    console.log("error", error);
    dispatch(throwError(error?.data?.response?.message || "Flow not found"));
  }
  setIsFetch(false);
};

export const handelCreateQuestion = (payload) => async (dispatch) => {
  try {
    const { req, id, setEdges, setNodes, navigate } = payload;
    const res = await api.post("interactions/create-node", req, {
      "Content-Type": "multipart/form-data",
    });
    if (res.status === 201) {
      dispatch(showSuccess(res.data.message));
      dispatch(handleFetchFlowData({ id, setEdges, setNodes, navigate }));
    } else {
      dispatch(throwError(res.data.message));
    }
  } catch (error) {
    console.log("error", error);
    dispatch(
      throwError(
        throwError(error?.response?.data?.message || "Flow not created!")
      )
    );
  }
};

export const handelNodePosition = (payload) => async (dispatch) => {
  try {
    const { req } = payload;
    const res = await api.put("interactions/update-cordinates", req);
    if (res.status === 200) {
      // Dispatch success action
      dispatch(showSuccess(res.data.message));
      return true; // Return true for success
    } else {
      // Dispatch error action
      dispatch(throwError(res.data.message));
      return false; // Return false for failure
    }
  } catch (error) {
    console.log("error", error);
    dispatch(
      throwError(
        throwError(error?.response?.data?.message || "Flow not created!")
      )
    );
    return false;
  }
};

export const {
  setAuthData,
  setErrorData,
  resetAllState,
  setThemeColor,
  setIsResponsive,
  setProfileData,
  setSelectedOrganization,
  setQueModelData,
  setQueModelConfig,
  setShowCreateFlowModal,
  setNewQueModalData,
  setWebcamModelConfig,
  setOrganizationData,
  setInteractionsStyle,
  setMyOrganization,
  setReplyModalData,
  setLibraryModelConfig,
} = globalSlice.actions;

export default globalSlice.reducer;
