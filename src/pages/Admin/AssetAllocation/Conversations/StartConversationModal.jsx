import React from "react";
import { Modal } from "react-bootstrap";
import "./StartConversationModal.scss";

const StartConversationModal = ({ show, handleClose }) => {
  return (
    <Modal
      size="lg"
      show={show}
      onHide={handleClose}
      centered
      className="startConversationModal"
    >
      <Modal.Header closeButton>
        <Modal.Title>
          <div className="text-24-700 text-center" style={{ color: "#1B2559" }}>
            How would you like to convey to Kapil?
          </div>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className={`d-flex itemsContainer gap-5 justify-content-center`}>
          <div className="items">
            <div className="w-40 h-40">
              <svg
                width="66"
                height="53"
                viewBox="0 0 66 53"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M0 3.3125C0 1.48306 1.48306 0 3.3125 0H49.6875C51.5169 0 53 1.48306 53 3.3125V43.0625C53 48.5508 48.5508 53 43.0625 53H9.9375C4.44917 53 0 48.5508 0 43.0625V3.3125ZM6.625 6.625V43.0625C6.625 44.8919 8.10806 46.375 9.9375 46.375H43.0625C44.8919 46.375 46.375 44.8919 46.375 43.0625V6.625H6.625Z"
                  fill="#292929"
                />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M57.7164 11.1993C61.9241 10.1631 66 13.2981 66 17.5707V35.4293C66 39.7019 61.9241 42.8369 57.7164 41.8007L48.5249 39.537C47.041 39.1715 46 37.8581 46 36.3513V16.6487C46 15.1419 47.041 13.8285 48.5249 13.463L57.7164 11.1993ZM52.6667 19.2126V33.7874L59.3333 35.4293L59.3333 17.5707L52.6667 19.2126Z"
                  fill="#292929"
                />
              </svg>
            </div>
            <div className="text-15-500">Video</div>
          </div>
          <div className="items">
            <div className="w-40 h-40">
              <svg
                width="53"
                height="67"
                viewBox="0 0 53 67"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M13 13.2308C13 5.92362 19.0442 0 26.5 0C33.9558 0 40 5.92362 40 13.2308V29.7692C40 37.0764 33.9558 43 26.5 43C19.0442 43 13 37.0764 13 29.7692V13.2308ZM26.5 6.61538C22.7721 6.61538 19.75 9.57719 19.75 13.2308V29.7692C19.75 33.4228 22.7721 36.3846 26.5 36.3846C30.2279 36.3846 33.25 33.4228 33.25 29.7692V13.2308C33.25 9.57719 30.2279 6.61538 26.5 6.61538Z"
                  fill="#292929"
                />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M3.3125 26C5.14194 26 6.625 27.4924 6.625 29.3333C6.625 40.379 15.5233 49.3333 26.5 49.3333C37.4767 49.3333 46.375 40.379 46.375 29.3333C46.375 27.4924 47.8581 26 49.6875 26C51.5169 26 53 27.4924 53 29.3333C53 44.0609 41.1355 56 26.5 56C11.8645 56 0 44.0609 0 29.3333C0 27.4924 1.48306 26 3.3125 26Z"
                  fill="#292929"
                />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M26.5 50C28.433 50 30 51.5222 30 53.4V63.6C30 65.4778 28.433 67 26.5 67C24.567 67 23 65.4778 23 63.6V53.4C23 51.5222 24.567 50 26.5 50Z"
                  fill="#292929"
                />
              </svg>
            </div>
            <div className="text-15-500">Audio</div>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default StartConversationModal;
