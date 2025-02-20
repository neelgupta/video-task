import { Formik } from "formik";
import {
  Button,
  Modal,
  Switch,
  TextArea,
  TextInput,
} from "../../../components";
import DropdownOption from "../../../components/inputs/DropdownOption/DropdownOption";
import MultipleDropdown from "../../../components/inputs/MultipleDropdown";
import * as Yup from "yup";
import { api } from "../../../services/api";
import { generateUniqueString } from "../../../utils/helpers";
import Swal from "sweetalert2";
import { useDispatch } from "react-redux";
import {
  handelCatch,
  showSuccess,
  throwError,
} from "../../../store/globalSlice";
import { useState } from "react";

const planTypeList = [
  { value: "free", label: "Free" },
  { value: "premium", label: "Premium" },
];

function SubscriptionForm({ onHide, getSubscriptionList, isEdit, editData }) {
  const dispatch = useDispatch();
  const [isLoad, setIsLoad] = useState(false);
  const initialValues = {
    title: editData?.title || "",
    description: editData?.description || "",
    sub_title: editData?.sub_title || "",
    members: editData?.members || "",
    price: editData?.price || 0,
    storage: editData?.storage || "",
    page: editData?.page || "",
    plan_type: editData?.plan_type || "free",
    button_text: editData?.button_text || "",
  };

  const validationSchema = Yup.object({
    title: Yup.string().required("Title is required"),
    description: Yup.string().required("description is required"),
    price: Yup.string().required("price is required"),
    sub_title: Yup.string().required("Sub title is required"),
    members: Yup.string().required("Members is required"),
    button_text: Yup.string().required("Button text is required"),
    plan_type: Yup.string().required("Plan type is required"),
    storage: Yup.string().required("storage is required"),
    page: Yup.string().required("page is required"),
  });

  const handleSubmit = async (formValue) => {
    setIsLoad(true);
    try {
      const req = {
        ...formValue,
        ...(isEdit
          ? { plan_id: editData._id, plan_type: editData.plan_type }
          : {}),
      };
      const res = await api[isEdit ? "put" : "post"](
        isEdit
          ? "admin/update-subscription-plan"
          : "admin/add-subscription-plan",
        req
      );
      if ([200, 201].includes(res.status)) {
        dispatch(showSuccess(res.data.message));
        onHide();
        getSubscriptionList();
      } else {
        dispatch(throwError(res.data.message));
      }
    } catch (error) {
      console.log("error", error);
      dispatch(throwError(error.response.data.message));
    }
    setIsLoad(false);
  };
  return (
    <Modal
      title={`${isEdit ? "Update" : "Add"} Subscription`}
      width="800px"
      onHide={onHide}
    >
      <div className="">
        <Formik
          enableReinitialize
          initialValues={initialValues}
          onSubmit={handleSubmit}
          validationSchema={validationSchema}
        >
          {(props) => {
            const {
              values,
              handleChange,
              handleSubmit,
              errors,
              touched,
              setFieldValue,
            } = props;

            return (
              <form
                onSubmit={handleSubmit}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleSubmit();
                  }
                }}
              >
                <div className="container-flued row">
                  <div className="col-lg-6 col-sm-6 col-12 mb-18 flow-ai-input">
                    <div
                      className="text-14-500 ms-5"
                      style={{ color: "#808080" }}
                    >
                      Title:
                    </div>
                    <input
                      label=""
                      name="title"
                      id="title"
                      type="text"
                      placeholder="Enter title"
                      value={values.title}
                      onChange={handleChange}
                    />
                    {touched.title && errors.title && (
                      <div className="input-error">{errors.title}</div>
                    )}
                  </div>
                  <div className="col-lg-6 col-sm-6 col-12 mb-18 flow-ai-input">
                    <div
                      className="text-14-500 ms-5"
                      style={{ color: "#808080" }}
                    >
                      Sub title:
                    </div>
                    <input
                      label=""
                      name="sub_title"
                      id="sub_title"
                      type="text"
                      placeholder="Enter sub title"
                      value={values.sub_title}
                      onChange={handleChange}
                    />
                    {touched.sub_title && errors.sub_title && (
                      <div className="input-error">{errors.sub_title}</div>
                    )}
                  </div>
                  <div className="col-lg-6 col-sm-6 col-12 mb-18 flow-ai-input">
                    <div
                      className="text-14-500 ms-5"
                      style={{ color: "#808080" }}
                    >
                      Price:
                    </div>
                    <input
                      label=""
                      name="price"
                      id="price"
                      type="number"
                      placeholder="Enter Price"
                      value={values.price}
                      onChange={handleChange}
                    />
                    {touched.price && errors.price && (
                      <div className="input-error">{errors.price}</div>
                    )}
                  </div>
                  <div className="col-lg-6 col-sm-6 col-12 mb-18 flow-ai-input">
                    <div
                      className="text-14-500 ms-5"
                      style={{ color: "#808080" }}
                    >
                      Page:
                    </div>
                    <input
                      label=""
                      name="page"
                      id="page"
                      type="number"
                      placeholder="Enter page"
                      value={values.page}
                      onChange={handleChange}
                    />
                    {touched.page && errors.page && (
                      <div className="input-error">{errors.page}</div>
                    )}
                  </div>
                  <div className="col-lg-6 col-sm-6 col-12 mb-18 flow-ai-input">
                    <div
                      className="text-14-500 ms-5"
                      style={{ color: "#808080" }}
                    >
                      Storage {"(GB)"} :
                    </div>
                    <input
                      label=""
                      name="storage"
                      id="storage"
                      placeholder="Enter storage"
                      type="number"
                      value={values.storage}
                      onChange={handleChange}
                    />
                    {touched.storage && errors.storage && (
                      <div className="input-error">{errors.storage}</div>
                    )}
                  </div>
                  <div className="col-lg-6 col-sm-6 col-12 mb-18 ">
                    <div
                      className="text-14-500 ms-5"
                      style={{ color: "#808080" }}
                    >
                      Plan type :
                    </div>
                    <DropdownOption
                      name="plan_type"
                      id="plan_type"
                      placeholder="Select plan_type"
                      options={planTypeList}
                      isDisabled={isEdit}
                      value={planTypeList.find(
                        (ele) => ele.value === values?.plan_type
                      )}
                      onChange={(select) => {
                        setFieldValue("plan_type", select.value);
                      }}
                      error={touched.plan_type && errors.plan_type}
                    />
                  </div>
                  <div className="col-lg-6 col-sm-6 col-12 mb-18 flow-ai-input">
                    <div
                      className="text-14-500 ms-5"
                      style={{ color: "#808080" }}
                    >
                      Members:
                    </div>
                    <input
                      name="members"
                      id="members"
                      type="number"
                      label=""
                      placeholder="Enter members"
                      value={values.members}
                      onChange={handleChange}
                    />
                    {touched.members && errors.members && (
                      <div className="input-error">{errors.members}</div>
                    )}
                  </div>
                  <div className="col-lg-6 col-sm-6 col-12 mb-18 flow-ai-input">
                    <div
                      className="text-14-500 ms-5"
                      style={{ color: "#808080" }}
                    >
                      Button text:
                    </div>
                    <input
                      name="button_text"
                      id="button_text"
                      type="text"
                      label=""
                      placeholder="Enter button_text"
                      value={values.button_text}
                      onChange={handleChange}
                    />
                    {touched.button_text && errors.button_text && (
                      <div className="input-error">{errors.button_text}</div>
                    )}
                  </div>
                </div>
                <div className="mb-18 flow-ai-input">
                  <div
                    className="text-14-500 ms-5"
                    style={{ color: "#808080" }}
                  >
                    Description :
                  </div>
                  <textarea
                    label=""
                    name="description"
                    id="description"
                    rows="4"
                    placeholder="Enter Description..."
                    value={values.description}
                    onChange={handleChange}
                  />
                  {touched.description && errors.description && (
                    <div className="input-error">{errors.description}</div>
                  )}
                </div>
                {/* <div className="mb-18 fa-center gap-2 ">
                  <span>
                    <Switch
                      isChecked={values.isActive}
                      onChange={() => {
                        setFieldValue("isActive", !values.isActive);
                      }}
                    />
                  </span>
                  <span style={{ color: "rgba(117, 127, 149, 1)" }}>
                    Active Subscription
                  </span>
                </div> */}
                <div className="d-flex justify-content-end gap-3 mt-32">
                  <Button
                    loading={isLoad}
                    btnText={isEdit ? "Update" : "Add"}
                    className="w-120 h-53 text-18-500"
                    onClick={handleSubmit}
                    btnStyle="linear-gradient"
                    loaderTyp={"PD"}
                  />
                </div>
              </form>
            );
          }}
        </Formik>
      </div>
    </Modal>
  );
}

export default SubscriptionForm;
