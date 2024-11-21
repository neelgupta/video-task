import "./Subscription.scss";
import { Button, SearchInput, Switch, Table } from "../../../components";
import { useSelector } from "react-redux";
import { icons } from "../../../utils/constants";
import { useEffect, useState } from "react";
import SubscriptionForm from "./SubscriptionForm";
import { api } from "../../../services/api";
import Swal from "sweetalert2";
function Subscription() {
  const reduxData = useSelector((state) => state.global);
  const { themeColor } = reduxData;
  const [isAdd, setIsAdd] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [editData, setEditData] = useState({});
  const [subscriptionList, setSubscriptionList] = useState([]);
  const [rowData, setRowData] = useState([]);

  const header = [
    {
      title: "No.",
      className: "wp-5 justify-content-center",
      isSort: true,
    },
    {
      title: "Subscription",
      className: "wp-15",
      isSort: true,
    },
    {
      title: "Description",
      className: "wp-30",
      isSort: true,
    },
    {
      title: "Price",
      className: "wp-10",
      isSort: true,
    },

    {
      title: "Subscription Type",
      className: "wp-15",
      isSort: true,
    },
    {
      title: "Discount",
      className: "wp-10",
      isSort: true,
    },
    {
      title: "Is Active",
      className: "wp-8",
      isSort: false,
    },
    {
      title: "Action",
      className: "wp-7 justify-content-center",
    },
  ];
  const getSubscriptionList = async () => {
    const res = await api.get("user/subscription-plan");
    if (res.status === 200) {
      setSubscriptionList(res.data.response.subscriptions);
    }
  };
  const handleIsActive = async (id, value) => {
    const body = {
      isActive: value,
    };
    const res = await api.put(`user/subscription-plan/${id}`, body);
    if (res.status === 200) {
      Swal.fire("Active status changed successfully", "success");
      getSubscriptionList();
    }
  };
  const handleDelete = (itemId) => {
    console.log("itemId", itemId);
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
    const res = await api.delete(`user/subscription-plan/${itemId}`, {});
    console.log("res", res);
    if (res.status === 200) {
      getSubscriptionList();
      Swal.fire("Deleted!", "Your item has been deleted.", "success");
    } else {
      Swal.fire(res.data.message, "error");
    }
  };

  useEffect(() => {
    getSubscriptionList();
  }, []);
  useEffect(() => {
    const data = [];
    subscriptionList?.forEach((elem, index) => {
      let obj = [
        {
          value: index + 1,
          className: "wp-5 justify-content-center",
        },
        {
          value: elem.plan_name,
          className: "wp-15",
        },
        {
          value: elem.description,
          className: "wp-30 color-757f",
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
          className: "wp-15 color-757f",
        },
        {
          value: elem.discount,
          className: "wp-10 color-757f",
        },
        {
          value: (
            <div className="fa-center gap-2">
              <span>
                <Switch
                  isChecked={elem.isActive}
                  onChange={() => {
                    handleIsActive(elem._id, !elem.isActive);
                  }}
                />
              </span>
            </div>
          ),
          className: "wp-7 color-757f",
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
          className: "wp-8 justify-content-center",
        },
      ];
      data.push({ data: obj });
    });
    setRowData(data);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [subscriptionList]);
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
          <div className="w-250">
            <SearchInput placeholder="Search here..." />
          </div>
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
      <Table header={header} row={rowData} />
    </div>
  );
}

export default Subscription;
