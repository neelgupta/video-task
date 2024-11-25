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
  selectedOrganization: "",
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

export const {
  setAuthData,
  setErrorData,
  resetAllState,
  setThemeColor,
  setIsResponsive,
  setProfileData,
  setSelectedOrganization,
} = globalSlice.actions;

export default globalSlice.reducer;
