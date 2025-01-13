import "./Subscription.scss";
import { Button, SearchInput, Switch, Table } from "../../../components";
import { useDispatch, useSelector } from "react-redux";
import { icons } from "../../../utils/constants";
import { useEffect, useState } from "react";
import SubscriptionForm from "./SubscriptionForm";
import { api } from "../../../services/api";
import Swal from "sweetalert2";
import {
  handelCatch,
  showSuccess,
  throwError,
} from "../../../store/globalSlice";
function Subscription() {
  const reduxData = useSelector((state) => state.global);
  const { themeColor } = reduxData;
  const dispatch = useDispatch();
  const [isAdd, setIsAdd] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [editData, setEditData] = useState({});
  const [subscriptionList, setSubscriptionList] = useState([]);
  const [rowData, setRowData] = useState([]);
  const [isLoad, setIsLoad] = useState(false);
  const header = [
    {
      title: "No.",
      className: "wp-5 justify-content-center",
    },
    {
      title: "Title",
      className: "wp-10",
    },
    {
      title: "Description",
      className: "wp-25",
    },
    {
      title: "Price",
      className: "wp-10",
    },

    {
      title: "Plan Type",
      className: "wp-10",
    },
    {
      title: "Page",
      className: "wp-10 justify-content-center",
    },
    {
      title: "members",
      className: "wp-10 justify-content-center",
      isSort: false,
    },
    {
      title: "storage",
      className: "wp-10 justify-content-center",
    },
    {
      title: "Action",
      className: "wp-10 justify-content-center",
    },
  ];
  const getSubscriptionList = async () => {
    setIsLoad(true);
    try {
      const res = await api.get("admin/get-subscription-plans");
      if (res.status === 200) {
        setSubscriptionList(res.data.response);
      } else {
        dispatch(throwError(res.data.message));
      }
    } catch (error) {
      console.log("error", error);
      dispatch(handelCatch(error));
    }
    setIsLoad(false);
  };

  const handleDelete = (itemId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Do you really want to delete this item? This process cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, cancel!",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteItem(itemId);
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire("Cancelled", "Your item is safe :)", "error");
      }
    });
  };

  const deleteItem = async (itemId) => {
    try {
      const res = await api.delete(
        `admin/delete-subscription-plan/${itemId}`,
        {}
      );
      if (res.status === 200) {
        dispatch(showSuccess(res.data.message));
        getSubscriptionList();
      } else {
        dispatch(throwError(res.data.message));
      }
    } catch (error) {
      console.log("error", error);
      dispatch(handelCatch(error));
    }
  };

  useEffect(() => {
    const data = [];
    subscriptionList?.forEach((elem, index) => {
      console.log("elem", elem);
      let obj = [
        {
          value: index + 1,
          className: "wp-5 justify-content-center color-757f",
        },
        {
          value: elem.title,
          className: "wp-10 color-757f",
        },
        {
          value: elem.description,
          className: "wp-25 color-757f",
        },
        {
          value: (
            <div>
              <span>{elem.price}</span> <span>{elem.currency}</span>
            </div>
          ),
          className: "wp-10 color-757f",
        },
        {
          value: elem.plan_type,
          className: "wp-10 color-757f",
        },
        {
          value: elem.page,
          className: "wp-10 color-757f justify-content-center",
        },
        {
          value: elem.members,
          className: "wp-10 color-757f justify-content-center",
        },
        {
          value: `${elem.storage} GB`,
          className: "wp-10 color-757f justify-content-center",
        },
        {
          value: (
            <div className="f-center gap-2">
              <div
                className="pointer d-flex h-20 w-20"
                onClick={() => {
                  handleDelete(elem._id);
                }}
              >
                <img
                  src={icons.deleteSVG}
                  alt="bookmark"
                  className="fit-image"
                />
              </div>
              <div
                className="pointer d-flex h-20 w-20"
                onClick={() => {
                  setEditData(elem);
                  setIsEdit(true);
                  setIsAdd(true);
                }}
              >
                <img src={icons.edit} alt="eyeView" className="fit-image" />
              </div>
            </div>
          ),
          className: "wp-10 justify-content-center",
        },
      ];
      data.push({ data: obj });
    });
    setRowData(data);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [subscriptionList]);

  useEffect(() => {
    getSubscriptionList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div id="Subscription-container" className="b-9533 br-8 bg-ffff">
      {isAdd && (
        <SubscriptionForm
          onHide={() => {
            setIsAdd(false);
            setEditData({});
            setIsEdit(false);
          }}
          themeColor={themeColor}
          getSubscriptionList={getSubscriptionList}
          isEdit={isEdit}
          editData={editData}
        />
      )}
      <div className="fb-center px-22 py-14">
        <div className="text-18-500 color-1923">Subscription</div>
        <div className="fa-center gap-3">
          <div>
            <Button
              btnText="Add Subscription"
              className="text-14-500"
              onClick={() => setIsAdd(true)}
              btnStyle="linear-gradient"
            />
          </div>
        </div>
      </div>
      <Table header={header} row={rowData} hidePagination loader={isLoad} />
    </div>
  );
}

export default Subscription;
