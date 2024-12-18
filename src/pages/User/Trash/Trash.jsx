import React, { useEffect, useState } from "react";
import { trashItemsData } from "./constants";
import Card from "./Card";
import { useDispatch, useSelector } from "react-redux";
import { handelCatch, throwError } from "../../../store/globalSlice";
import { api } from "../../../services/api";
import { Spinner } from "react-bootstrap";

const Trash = () => {
  const [isLoad, setIsLoad] = useState(false);
  const [trashList, setTrashList] = useState([]);
  const dispatch = useDispatch();
  const reduxData = useSelector((state) => state.global);
  const { selectedOrganizationId } = reduxData;
  useEffect(() => {
    fetchTrash();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchTrash = async () => {
    setIsLoad(false);
    try {
      const res = await api.get(
        `interactions/get-archived-interactions/${selectedOrganizationId}`
      );
      console.log("res", res);
      if (res.status === 200) {
        setTrashList(res.data.response);
      } else {
        dispatch(throwError(res.data.message));
      }
    } catch (error) {
      console.log("error", error);
      dispatch(handelCatch(error));
    }
    setIsLoad(true);
  };
  return (
    <div className="d-flex flex-wrap">
      {isLoad ? (
        trashList.length > 0 ? (
          trashList.map((item, idx) => {
            return <Card key={item.id} item={item} fetchData={fetchTrash} />;
          })
        ) : (
          <div className="text-18-600" style={{ color: "black" }}>
            Data not found.
          </div>
        )
      ) : (
        <Spinner size="lg" />
      )}
    </div>
  );
};

export default Trash;
