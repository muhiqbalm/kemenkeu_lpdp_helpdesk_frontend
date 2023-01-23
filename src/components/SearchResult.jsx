import React, { useState, useEffect } from "react";
import { FaChevronDown } from "react-icons/fa";

export default function SearchResult(props) {
  const [isClicked, setIsClicked] = useState(false);

  function HandleClick() {
    setIsClicked(!isClicked);
  }

  return (
    <div className="w-full bg-putih px-20 pb-3 text-md">
      <button
        className={` ${
          isClicked
            ? "border-merah text-merah hover:text-coklat"
            : "border-abu text-hitam hover:text-merah"
        } border w-full bg-white rounded-lg flex justify-between item items-center shadow-md`}
        onClick={() => HandleClick()}
      >
        <p className="mr-5 text-justify p-6 pr-10 font-[600]">
          {props.pertanyaan}
        </p>
        <FaChevronDown
          className={` ${
            isClicked ? "rotate-180" : ""
          } text-merah w-[25px] h-auto mt-1 mr-6 hover:text-coklat hover:scale-110`}
        />
      </button>
      <div
        className={` ${
          isClicked ? "" : "hidden"
        } w-full bg-gray-200 border border-abu rounded-lg mt-2 p-6 z-0 shadow-md text-hitam`}
      >
        <p className="font-bold mb-2">Jawaban</p>
        {props.jawaban}
      </div>
    </div>
  );
}
