import "./Subscription.scss";
import {
  Button,
  CheckBox,
  SearchInput,
  Switch,
  Table,
} from "../../../components";
import { useSelector } from "react-redux";
import { icons } from "../../../utils/constants";
function Subscription() {
  const reduxData = useSelector((state) => state.global);
  const { themeColor } = reduxData;
  const header = [
    {
      title: <CheckBox className="s-18" />,
      className: "wp-5 justify-content-center",
    },
    {
      title: "No.",
      className: "wp-10 justify-content-center",
      isSort: true,
    },
    {
      title: "Title",
      className: "wp-30",
      isSort: true,
    },
    {
      title: "Category",
      className: "wp-10",
      isSort: true,
    },
    {
      title: "Create By",
      className: "wp-10",
      isSort: true,
    },

    {
      title: "Date",
      className: "wp-10",
      isSort: true,
    },
    {
      title: "Status",
      className: "wp-15",
      isSort: true,
    },
    {
      title: "Action",
      className: "wp-10 justify-content-center",
    },
  ];
  const data = [
    {
      title: "Learn the most common english phrasal verbs",
      category: "sports",
      createBy: "Instructor",
      Status: true,
      date: "04-12-2022",
      approval: "In Review",
    },
    {
      title: "Learn the most common english phrasal verbs",
      category: "sports",
      createBy: "Instructor",
      Status: true,
      date: "04-12-2022",
      approval: "Approved",
    },
  ];
  const rowData = [];
  data?.forEach((elem, index) => {
    const { title, category, date, createBy, Status } = elem;
    let obj = [
      {
        value: <CheckBox className="s-18" />,
        className: "wp-5 justify-content-center",
      },
      {
        value: index + 1,
        className: "wp-10 justify-content-center",
      },
      {
        value: title,
        className: "wp-30",
      },
      {
        value: category,
        className: "wp-10 color-757f",
      },
      {
        value: createBy,
        className: "wp-10 color-757f",
      },
      {
        value: date,
        className: "wp-10 color-757f",
      },
      {
        value: (
          <div className="fa-center gap-2">
            <span>
              <Switch isChecked={Status} onChange={() => {}} />
            </span>
            <span style={{ color: "rgba(117, 127, 149, 1)" }}>
              {Status ? "Published" : "Not Publish"}
            </span>
          </div>
        ),
        className: "wp-15 color-757f",
      },
      {
        value: (
          <div className="fa-center gap-2">
            <div className="pointer d-flex h-24 w-24" onClick={() => {}}>
              <img
                src={icons.deleteIcon}
                alt="bookmark"
                className="fit-image"
              />
            </div>
            <div className="pointer d-flex h-24 w-24" onClick={() => {}}>
              <img src={icons.edit} alt="eyeView" className="fit-image" />
            </div>
          </div>
        ),
        className: "wp-10 justify-content-center",
      },
    ];
    rowData.push({ data: obj });
  });
  return (
    <div id="Subscription-container" className="b-9533 br-8 bg-ffff">
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
              onClick={() => {}}
              style={{
                backgroundColor: themeColor.pColor,
                color: "white",
                border: "none",
              }}
            />
          </div>
        </div>
      </div>
      <Table header={header} row={rowData} />
    </div>
  );
}

export default Subscription;
