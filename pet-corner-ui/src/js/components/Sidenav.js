import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import { navData } from "../lib/Navdata.js";
import React from "react";

export default function Sidenav({ open, setOpen, content, setContent }) {
  const toggleOpen = () => {
    setOpen(!open);
  };

  var dim = window.screen.width;

  return (
    <div className={open ? "sidenav" : "sidenavClosed"}>
      {dim >= 600 && (
        <button className="menuBtn" onClick={toggleOpen}>
          {open ? (
            <KeyboardDoubleArrowLeftIcon />
          ) : (
            <KeyboardDoubleArrowRightIcon />
          )}
        </button>
      )}

      {navData.map((item) => {
        return (
          <div
            key={item.id}
            className={content === item.text ? "sideitem-active" : "sideitem"}
            onClick={() => setContent(item.text)}
          >
            {item.icon}
            <span className={open ? "linkText" : "linkTextClosed"}>
              {item.text}
            </span>
          </div>
        );
      })}
    </div>
  );
}
