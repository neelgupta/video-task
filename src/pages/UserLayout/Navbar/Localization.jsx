import { useEffect, useRef, useState } from "react";
import { icons } from "../../../utils/constants";
import { titleCaseString } from "../../../utils/helpers";
import { useTranslation } from "react-i18next";

const Localization = ({ isResponsive, onChange = () => {} }) => {
  const { i18n } = useTranslation();
  const [show, setShow] = useState(false);
  const themePickerRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        themePickerRef.current &&
        !themePickerRef.current.contains(event.target)
      ) {
        setShow(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [themePickerRef]);
  const value = "en";
  const list = [
    {
      name: "English",
      flag: icons.english,
      language: "en",
    },
    {
      name: "Italiano",
      flag: icons.italiano,
      language: "it",
    },
    {
      name: "Svenska",
      flag: icons.svenska,
      language: "sv",
    },
    {
      name: "Español",
      flag: icons.espanol,
      language: "es",
    },
  ];
  const data = list?.find((o) => o?.language === value);

  return (
    <div className="position-relative" ref={themePickerRef}>
      <div
        className="d-flex align-items-center gap-2 pointer"
        onClick={() => {
          setShow(!show);
        }}
      >
        <span className={`${isResponsive ? "h-24 w-24" : "h-37 w-37"}`}>
          <img src={data?.flag} alt="flag" className="fit-image" />
        </span>
        <span className="text-14-500 color-757f">
          {isResponsive ? titleCaseString(data?.language) : data?.name}
        </span>
        <span className="h-24 w-24">
          <img src={icons.downDark} alt="more" className="fit-image" />
        </span>
      </div>
      {show && (
        <ul className="localization-list shadow">
          {list?.map((elm, index) => {
            return (
              <li
                key={index}
                className="px-12 py-8 pointer"
                onClick={() => {
                  i18n.changeLanguage(elm?.language);
                  onChange();
                }}
              >
                <span className="h-18 w-18 d-flex">
                  <img src={elm?.flag} alt="flag" className="fit-image" />
                </span>
                <span className="text-13-500 color-757f">{elm?.name}</span>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default Localization;
