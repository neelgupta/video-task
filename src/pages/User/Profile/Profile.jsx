/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import styles from "./Profile.module.scss";
import MyProfile from "./MyProfile";
import AuthorisedApps from "./AuthorisedApps";
import Api from "./API";
import ResetPassword from "./ResetPassword";

const Profile = ({ isResetPassword, setIsResetPassword }) => {
  const [selectedTab, setSelectedTab] = useState(1);

  useEffect(() => {
    setIsResetPassword(false);
  }, [selectedTab]);

  return (
    <div className={styles.ProfileContainer}>
      <div className={styles.ProfileMenuTab}>
        <div
          onClick={() => {
            setSelectedTab(1);
          }}
          className={`${selectedTab === 1 ? styles.active : ""} text-14-500`}
        >
          My Profile
        </div>
        <div
          onClick={() => {
            setSelectedTab(2);
          }}
          className={`${selectedTab === 2 ? styles.active : ""} text-14-500`}
        >
          Authorized Apps
        </div>
        <div
          onClick={() => {
            setSelectedTab(3);
          }}
          className={`${selectedTab === 3 ? styles.active : ""} text-14-500`}
        >
          API
        </div>
      </div>
      <div className="mt-20 ">
        {selectedTab === 1 &&
          (isResetPassword ? (
            <ResetPassword />
          ) : (
            <MyProfile
              isResetPassword={isResetPassword}
              setIsResetPassword={setIsResetPassword}
            />
          ))}
        {selectedTab === 2 && <AuthorisedApps />}
        {selectedTab === 3 && <Api />}
      </div>
    </div>
  );
};

export default Profile;
