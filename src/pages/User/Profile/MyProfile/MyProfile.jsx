import React, { useEffect, useState } from "react";
import styles from "./MyProfile.module.scss";
import EditDetailsModal from "./EditDetailsModal";
import DeleteAccountModal from "./DeleteAccountModal";
import { encrypt } from "../../../../utils/helpers";
import { setAuthData, setProfileData } from "../../../../store/globalSlice";
import { useDispatch, useSelector } from "react-redux";
import { api } from "../../../../services/api";

const MyProfile = ({ isResetPassword, setIsResetPassword }) => {
  const [isEditModalShow, setIsEditModalShow] = useState(false);
  const [isDeleteModalShow, setIsDeleteModalShow] = useState(false);
  const dispatch = useDispatch();
  const reduxData = useSelector((state) => state.global);
  const { profileData } = reduxData;
  const [userData, setUserData] = useState({});

  useEffect(() => {
    if (profileData) {
      setUserData(profileData);
    }
  }, [profileData]);

  const getProfile = async () => {
    const res = await api.get("user/profile");
    if (res.status && res.status === 200) {
      dispatch(setProfileData(res.data.response));
    }
  };
  return (
    <>
      <div className={styles.profileContainer}>
        <div className={styles.profileItem}>
          <div
            className="text-18-500"
            style={{
              color: "rgba(28, 29, 29, 1)",
            }}
          >
            Plan
          </div>
          <div className="text-14-400" style={{ color: "#8C8E90" }}>
            You are on a Free Plan. Upgrade now to enjoy more. Upgrade
          </div>
        </div>
        <div className={styles.profileItem}>
          <div className="d-flex align-items-center justify-content-between">
            <div
              className="text-18-600"
              style={{
                color: "rgba(28, 29, 29, 1)",
              }}
            >
              Personal Details
            </div>
            <div
              className="text-12-500 d-flex gap-2 align-items-center pointer"
              style={{ color: "#1B2559" }}
              onClick={() => setIsEditModalShow(true)}
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 14 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M2.22241 13.9894C1.48632 13.9894 0.9319 13.8054 0.55914 13.4373C0.18638 13.074 0 12.5267 0 11.7953V3.64177C0 2.91041 0.18638 2.36306 0.55914 1.99974C0.9319 1.6317 1.48632 1.44768 2.22241 1.44768H9.83096L8.69145 2.58719H2.24364C1.88975 2.58719 1.61608 2.68156 1.42262 2.8703C1.23388 3.05904 1.13951 3.33743 1.13951 3.70547V11.7387C1.13951 12.1067 1.23388 12.3851 1.42262 12.5739C1.61608 12.7579 1.88975 12.8499 2.24364 12.8499H10.5175C10.7581 12.8499 10.9658 12.7579 11.1403 12.5739C11.3149 12.3851 11.4022 12.1067 11.4022 11.7387V5.36874L12.5417 4.22922V11.7953C12.5417 12.5267 12.3648 13.074 12.0109 13.4373C11.6617 13.8054 11.1686 13.9894 10.5317 13.9894H2.22241ZM4.7987 9.40304C4.73264 9.43135 4.6713 9.41719 4.61468 9.36057C4.56277 9.29923 4.55098 9.23789 4.57929 9.17655L5.21628 7.84594L11.8198 1.24242L12.7894 2.19792L6.17885 8.80143L4.7987 9.40304ZM13.3132 1.68124L12.3436 0.704515L12.8602 0.194919C12.9782 0.0816753 13.1127 0.020335 13.2637 0.0108981C13.4194 0.0014611 13.5515 0.0510052 13.66 0.15953L13.8228 0.329396C13.9455 0.447358 14.0045 0.584194 13.9997 0.739904C13.9997 0.890895 13.9408 1.03009 13.8228 1.15749L13.3132 1.68124Z"
                  fill="#1B2559"
                />
              </svg>
              Edit
            </div>
          </div>
          <div className="mt-10">
            <div className="text-12-400" style={{ color: "#8C8E90" }}>
              User Name
            </div>
            <div className="text-16-600" style={{ color: "#1B2559" }}>
              {userData.user_name || ""}
            </div>
          </div>
          <div className="mt-10">
            <div className="text-12-400" style={{ color: "#8C8E90" }}>
              Registered Mail
            </div>
            <div className="text-16-600" style={{ color: "#1B2559" }}>
              {userData.email || ""}
            </div>
          </div>
        </div>
        <div className={styles.profileItem}>
          <div
            className="text-18-600"
            style={{
              color: "rgba(28, 29, 29, 1)",
            }}
          >
            Security Details
          </div>
          <div
            className="text-16-500 mt-12 pointer"
            style={{ color: "#1B2559" }}
            onClick={() => setIsResetPassword(true)}
          >
            Update Password
          </div>
          <div
            className="text-16-500 mt-12 pointer"
            style={{ color: "#1B2559" }}
            onClick={() => {
              let data = encrypt({ time: new Date().toLocaleString() });
              localStorage.authData = data;
              dispatch(setAuthData(data));
            }}
          >
            Logout from Account
          </div>
          <div
            className="text-16-500 mt-12 text-danger pointer"
            onClick={() => setIsDeleteModalShow(true)}
          >
            Delete Account
          </div>
        </div>
      </div>
      {isEditModalShow && (
        <EditDetailsModal
          show={isEditModalShow}
          handleClose={() => setIsEditModalShow(false)}
          userData={userData}
          getProfile={getProfile}
        />
      )}

      {isDeleteModalShow && (
        <DeleteAccountModal
          show={isDeleteModalShow}
          handleClose={() => setIsDeleteModalShow(false)}
        />
      )}
    </>
  );
};

export default MyProfile;
