/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useState } from "react";

const QnaContext = createContext();

const QnaFlowContext = ({ children }) => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showUpdateTagModal, setShowUpdateTagModal] = useState(false);
  const [showTagList, setShowTagList] = useState(false);
  const [showDeleteTagsModal, setShowDeleteTagsModal] = useState(false);
  const [showNewTagAddModal, setShowNewTagAddModal] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  return (
    <QnaContext.Provider
      value={{
        showDeleteModal,
        setShowDeleteModal,
        showUpdateTagModal,
        setShowUpdateTagModal,
        showTagList,
        setShowTagList,
        showDeleteTagsModal,
        setShowDeleteTagsModal,
        showNewTagAddModal,
        setShowNewTagAddModal,
        showShareModal,
        setShowShareModal,
      }}
    >
      {children}
    </QnaContext.Provider>
  );
};

export default QnaFlowContext;

export const useQnaContext = () => {
  return useContext(QnaContext);
};
