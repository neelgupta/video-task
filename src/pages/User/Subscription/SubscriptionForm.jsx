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

const subPlanList = [
  {
    label: "20 mins of video or audio processing per month",
    value: "20 mins of video or audio processing per month",
  },
  {
    label: "Invite your team -  up to 3 users",
    value: "Invite your team -  up to 3 users",
  },
  { label: "All core features", value: "All core features" },
  {
    label: "Conditional Logic",
    value: "Conditional Logic",
  },
  {
    label: "Collect payments with Stripe",
    value: "Collect payments with Stripe",
  },
  {
    label: "Zapier integration",
    value: "Zapier integration",
  },
  { label: "Appointment scheduling", value: "Appointment scheduling" },
  {
    label: "Voice-text transcription & captions",
    value: "Voice-text transcription & captions",
  },
];

function SubscriptionForm({ onHide, getSubscriptionList, isEdit, editData }) {
  const initialValues = {
    plan_name: editData?.plan_name || "",
    description: editData?.description || "",
    price: editData?.price || "",
    discount: editData?.discount || "",
    isActive: editData?.isActive || false,
    ...(isEdit
      ? {
          currency: [
            { value: "USD", label: "USD" },
            { value: "INR", label: "INR" },
          ].find((o) => o.value === editData?.currency || ""),
          plan_type: [
            { value: "yearly", label: "yearly" },
            { value: "monthly", label: "monthly" },
          ].find((o) => o.value === editData?.plan_type || ""),
          sub_plan: subPlanList.filter((o) =>
            (editData?.sub_plan || []).includes(o.value)
          ),
        }
      : {
          currency: "",
          plan_type: "",
          sub_plan: editData?.sub_plan || [],
        }),
  };

  const validationSchema = Yup.object({
    plan_name: Yup.string().required("Subscription Name is required"),
    description: Yup.string().required("description is required"),
    price: Yup.string().required("price is required"),
    currency: Yup.object().required("Currency is required"),
    plan_type: Yup.object().required("Plan type is required"),
    discount: Yup.string().required("discount is required"),
    sub_plan: Yup.array()
      .of(
        Yup.object().shape({
          label: Yup.string(),
          value: Yup.string(),
        })
      )
      .required("Sub-plan is required")
      .min(1, "At least one sub-plan is required"),
  });

  const handleSubmit = async (formValue) => {
    const body = {
      ...formValue,
      plan_uuid: generateUniqueString(),
      plan_type: formValue.plan_type.value,
      currency: formValue.currency.value,
      sub_plan: formValue.sub_plan.map((ele) => ele.value),
      mins: isEdit ? editData.mins : "30",
      role: isEdit ? editData.role : "admin",
      isDeleted: isEdit ? editData.isDeleted : false,
    };
    const res = await api[isEdit ? "put" : "post"](
      isEdit
        ? `user/subscription-plan/${editData._id}`
        : "user/subscription-plan",
      body
    );
    Swal.fire(res.data.message);
    onHide();
    getSubscriptionList();
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
                <div className="mb-18">
                  <TextInput
                    name="plan_name"
                    id="plan_name"
                    label=""
                    value={values.plan_name}
                    onChange={handleChange}
                    error={touched.plan_name && errors.plan_name}
                    placeholder="Enter Subscription Name"
                  />
                </div>
                <div className="mb-18">
                  <TextArea
                    label=""
                    name="description"
                    id="description"
                    rows="2"
                    placeholder="Enter Description..."
                    value={values.description}
                    onChange={handleChange}
                    error={touched.description && errors.description}
                  />
                </div>
                <div className="container-flued row">
                  <div className="col-lg-6 col-sm-6 col-12 mb-18 ">
                    <TextInput
                      label=""
                      name="price"
                      id="price"
                      numeric
                      placeholder="Enter Price"
                      value={values.price}
                      onChange={handleChange}
                      error={touched.price && errors.price}
                    />
                  </div>
                  <div className="col-lg-6 col-sm-6 col-12 mb-18 ">
                    <DropdownOption
                      name="currency"
                      id="currency"
                      placeholder="Select Currency"
                      options={[
                        { value: "USD", label: "USD" },
                        { value: "INR", label: "INR" },
                      ]}
                      value={values.currency}
                      onChange={handleChange}
                      error={touched.currency && errors.currency}
                    />
                  </div>
                  <div className="col-lg-6 col-sm-6 col-12 mb-18 ">
                    <DropdownOption
                      placeholder="Select Plan Type"
                      name="plan_type"
                      id="plan_type"
                      options={[
                        { value: "yearly", label: "yearly" },
                        { value: "monthly", label: "monthly" },
                      ]}
                      value={values.plan_type}
                      onChange={handleChange}
                      error={touched.plan_type && errors.plan_type}
                    />
                  </div>
                  <div className="col-lg-6 col-sm-6 col-12 mb-18 ">
                    <TextInput
                      name="discount"
                      id="discount"
                      label=""
                      placeholder="Enter Discount"
                      value={values.discount}
                      onChange={handleChange}
                      error={touched.discount && errors.discount}
                    />
                  </div>
                </div>
                <div className="mb-25">
                  <MultipleDropdown
                    name="sub_plan"
                    id="sub_plan"
                    placeholder="Select Categories"
                    options={subPlanList}
                    value={values.sub_plan}
                    onChange={handleChange}
                    error={touched.sub_plan && errors.sub_plan}
                  />
                </div>
                <div className="mb-18 fa-center gap-2 ">
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
                </div>
                <div className="d-flex justify-content-end gap-3 mt-32">
                  <Button
                    btnText={isEdit ? "Update" : "Add"}
                    className="w-120 h-53 text-18-500"
                    onClick={handleSubmit}
                    btnStyle="linear-gradient"
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
