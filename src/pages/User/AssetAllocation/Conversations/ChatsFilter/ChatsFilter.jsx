import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import "./ChatsFilter.scss";
import { Switch } from "../../../../../components";
function ChatsFilter({ show, onHide }) {
  const [form, setForm] = useState({
    showWithoutTags: false,
    showWithContact: false,
    showUnread: false,
    showWithReplay: false,
    showWithoutReplay: false,
  });
  return (
    <Modal show={show} centered backdrop="static" className="ChatsFilter-modal">
      <div className="modal-container">
        <div className="modal-body">
          <h2
            className="text-22-600 h-30 "
            style={{
              display: "flex",
              alignItems: "center",
            }}
          >
            Filter conversations
          </h2>
          <div className="filter-form flow">
            <div className="filter-title">Tags</div>
            <div className="filter-option">
              <div className="input-label">
                Only show conversations without tags
              </div>
              <div className="filter-input">
                <Switch
                  isChecked={form.showWithoutTags}
                  onChange={() => {
                    setForm({
                      ...form,
                      showWithoutTags: !form.showWithoutTags,
                    });
                  }}
                />
              </div>
            </div>
            <div className="filter-option">
              <div className="input-label">Show conversations tagged as</div>
              <div className="filter-input"></div>
            </div>
            <div className="filter-title">Score</div>
            <div className="filter-option">
              <div className="input-label">Show conversations with a score</div>
              <div className="filter-input"></div>
            </div>
            <div className="filter-title">Dates</div>
            <div className="filter-option">
              <div className="input-label">Conversations started</div>
              <div className="filter-input"></div>
            </div>
            <div className="filter-title">Contacts and anonymous</div>
            <div className="filter-option">
              <div className="input-label">
                Only show conversations with contact information
              </div>
              <div className="filter-input">
                <Switch
                  isChecked={form.showWithContact}
                  onChange={() => {
                    setForm({
                      ...form,
                      showWithContact: !form.showWithContact,
                    });
                  }}
                />
              </div>
            </div>
            <div className="filter-title">Response status</div>
            <div className="filter-option">
              <div className="input-label">Only show unread conversations</div>
              <div className="filter-input">
                <Switch
                  isChecked={form.showUnread}
                  onChange={() => {
                    setForm({
                      ...form,
                      showUnread: !form.showUnread,
                    });
                  }}
                />
              </div>
            </div>
            <div className="filter-title">Reply status</div>
            <div className="filter-option">
              <div className="input-label">
                Only show conversations with a reply
              </div>
              <div className="filter-input">
                <Switch
                  isChecked={form.showWithReplay}
                  onChange={() => {
                    setForm({
                      ...form,
                      showWithReplay: !form.showWithReplay,
                    });
                  }}
                />
              </div>
            </div>
            <div className="filter-option">
              <div className="input-label">
                Only show conversations without a reply
              </div>
              <div className="filter-input">
                <Switch
                  isChecked={form.showWithoutReplay}
                  onChange={() => {
                    setForm({
                      ...form,
                      showWithoutReplay: !form.showWithoutReplay,
                    });
                  }}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="modal-footer">
          <div className="clear-btn">Clear all</div>
          <div className="d-flex" style={{ alignItems: "center", gap: "20px" }}>
            <button className="cancel-btn modal-footer-btn" onClick={onHide}>
              Cancel
            </button>
            <button className="apply-btn modal-footer-btn">Apply</button>
          </div>
        </div>
      </div>
    </Modal>
  );
}

export default ChatsFilter;
