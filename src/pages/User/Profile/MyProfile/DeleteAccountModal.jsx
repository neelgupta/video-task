import React, { useState } from "react";
import { Button, Modal, Spinner } from "react-bootstrap";
import styles from "./DeleteAccountModal.module.scss";
import { icons } from "../../../../utils/constants";
import { api } from "../../../../services/api";
import { useDispatch } from "react-redux";
import { encrypt } from "../../../../utils/helpers";
import { setAuthData, throwError } from "../../../../store/globalSlice";

const DeleteAccountModal = ({ show, handleClose, onDelete }) => {
  const dispatch = useDispatch();
  const [password, setPassword] = useState("");
  const [isPasswordShow, setIsPasswordShow] = useState(false);
  const [isDelete, setIsDelete] = useState(false);

  const deleteAccount = async () => {
    setIsDelete(true);
    try {
      const res = await api.post("user/delete-account", { password });
      console.log("res", res);
      if (res.status === 200) {
        let data = encrypt({ time: new Date().toLocaleString() });
        localStorage.authData = data;
        dispatch(setAuthData(data));
      }
    } catch (error) {
      console.log("error", error);
      dispatch(throwError(error.response.data.message));
    }
    setIsDelete(false);
  };
  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <div className="text-20-600" style={{ color: "#1B2559" }}>
          Delete Account
        </div>
      </Modal.Header>
      <Modal.Body>
        <div className={styles.modalContentContainer}>
          <div className={styles.iconContainer}>
            <svg
              width="71"
              height="70"
              viewBox="0 0 71 70"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M70.2334 34.9014C70.2334 30.3313 69.3333 25.8059 67.5844 21.5837C65.8355 17.3615 63.2721 13.5251 60.0405 10.2935C56.8089 7.06195 52.9725 4.49854 48.7503 2.74964C44.5281 1.00073 40.0027 0.100586 35.4326 0.100586C30.8625 0.100586 26.3372 1.00073 22.1149 2.74964C17.8927 4.49854 14.0563 7.06195 10.8248 10.2935C7.5932 13.5251 5.02979 17.3615 3.28089 21.5837C1.53198 25.8059 0.631836 30.3313 0.631836 34.9014C0.631836 44.1311 4.29834 52.9828 10.8248 59.5093C17.3512 66.0357 26.2029 69.7022 35.4326 69.7022C44.6624 69.7022 53.5141 66.0357 60.0405 59.5093C66.5669 52.9828 70.2334 44.1311 70.2334 34.9014ZM6.43197 34.9014C6.43197 27.2099 9.48739 19.8335 14.9261 14.3948C20.3647 8.95614 27.7412 5.90072 35.4326 5.90072C43.1241 5.90072 50.5005 8.95614 55.9392 14.3948C61.3779 19.8335 64.4333 27.2099 64.4333 34.9014C64.4333 42.5928 61.3779 49.9693 55.9392 55.4079C50.5005 60.8466 43.1241 63.902 35.4326 63.902C27.7412 63.902 20.3647 60.8466 14.9261 55.4079C9.48739 49.9693 6.43197 42.5928 6.43197 34.9014ZM29.6325 27.6512C29.6325 28.2225 29.52 28.7881 29.3014 29.3159C29.0828 29.8437 28.7623 30.3233 28.3584 30.7272C27.9544 31.1311 27.4749 31.4516 26.9471 31.6702C26.4193 31.8888 25.8537 32.0013 25.2824 32.0013C24.7111 32.0013 24.1455 31.8888 23.6177 31.6702C23.0899 31.4516 22.6104 31.1311 22.2064 30.7272C21.8025 30.3233 21.482 29.8437 21.2634 29.3159C21.0448 28.7881 20.9323 28.2225 20.9323 27.6512C20.9323 26.4975 21.3906 25.391 22.2064 24.5752C23.0222 23.7594 24.1287 23.3011 25.2824 23.3011C26.4361 23.3011 27.5426 23.7594 28.3584 24.5752C29.1742 25.391 29.6325 26.4975 29.6325 27.6512ZM49.933 27.6512C49.933 28.8049 49.4746 29.9114 48.6588 30.7272C47.843 31.543 46.7366 32.0013 45.5829 32.0013C44.4291 32.0013 43.3227 31.543 42.5069 30.7272C41.6911 29.9114 41.2328 28.8049 41.2328 27.6512C41.2328 26.4975 41.6911 25.391 42.5069 24.5752C43.3227 23.7594 44.4291 23.3011 45.5829 23.3011C46.7366 23.3011 47.843 23.7594 48.6588 24.5752C49.4746 25.391 49.933 26.4975 49.933 27.6512ZM24.598 51.2693C29.9631 44.9124 40.8964 44.9124 46.2673 51.2693C46.5069 51.5777 46.8064 51.8344 47.1477 52.0242C47.489 52.2139 47.8651 52.3328 48.2535 52.3737C48.6419 52.4145 49.0345 52.3765 49.4078 52.262C49.7811 52.1474 50.1275 51.9586 50.426 51.7069C50.7246 51.4552 50.9693 51.1458 51.1454 50.7973C51.3215 50.4487 51.4254 50.0682 51.4508 49.6785C51.4763 49.2888 51.4228 48.898 51.2935 48.5295C51.1642 48.161 50.9619 47.8224 50.6986 47.5341C43.0134 38.4279 27.8461 38.4279 20.1667 47.5341C19.9034 47.8224 19.701 48.161 19.5717 48.5295C19.4425 48.898 19.389 49.2888 19.4144 49.6785C19.4399 50.0682 19.5438 50.4487 19.7199 50.7973C19.8959 51.1458 20.1406 51.4552 20.4392 51.7069C20.7378 51.9586 21.0841 52.1474 21.4575 52.262C21.8308 52.3765 22.2234 52.4145 22.6118 52.3737C23.0001 52.3328 23.3762 52.2139 23.7175 52.0242C24.0589 51.8344 24.3583 51.5777 24.598 51.2693Z"
                fill="#F21E1E"
                fillOpacity="0.93"
              />
            </svg>
          </div>
          <div className={styles.textContainer}>
            <div className={styles.modalTitle}>
              We are sad about you leaving us
            </div>
            <div className="text-15-600">
              We would request you to consider your decision
            </div>
            <div className="text-15-400">
              To delete your account please type the password below
            </div>
          </div>
          <div
            style={{ width: "100%", position: "relative" }}
            className="mt-20"
          >
            <input
              type={isPasswordShow ? "text" : "password"}
              className="rounded-3"
              placeholder="Enter Your Account Password"
              style={{
                width: "100%",
                padding: "0.5rem",
                fontSize: "12px",
                outline: "1px solid gray",
                border: "1px solid #d3d3d3",
              }}
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
            <div
              className="w-20 h-20 pointer"
              style={{ position: "absolute", top: "5px", right: "15px" }}
              onClick={() => setIsPasswordShow((pre) => !pre)}
            >
              <img
                src={icons[isPasswordShow ? "eyeClose" : "eye"]}
                alt="password eye"
                className="fit-image"
              />
            </div>
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer
        style={{ justifyContent: "space-evenly" }}
        className="px-50 mb-20"
      >
        <div>
          <Button
            style={{ width: "150px" }}
            variant="secondary"
            onClick={handleClose}
            className="text-14-500"
          >
            Cancel
          </Button>
        </div>
        <div>
          <Button
            onClick={() => {
              deleteAccount();
            }}
            className="text-14-500 f-center"
            style={{
              background: `#7B5AFF`,
              border: "none",
              color: "white",
              width: "150px",
            }}
            disabled={isDelete}
          >
            Delete Now
            {isDelete && <Spinner size="sm" className="ms-10" />}
          </Button>
        </div>
      </Modal.Footer>
    </Modal>
  );
};

export default DeleteAccountModal;
