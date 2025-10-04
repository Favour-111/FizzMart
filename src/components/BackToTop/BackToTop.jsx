import React from "react";
import "./BackToTop.css";
import { MdKeyboardDoubleArrowUp } from "react-icons/md";

const BackToTop = () => {
  return (
    <div className="back_to_Top">
      <button
        className="button"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      >
        <MdKeyboardDoubleArrowUp color="white" size={20} />
      </button>
    </div>
  );
};

export default BackToTop;
