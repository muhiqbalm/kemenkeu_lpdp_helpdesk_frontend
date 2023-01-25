import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaPlus } from "react-icons/fa";

export default function ScholarshipOption(props) {
  const [scholarships, setScholarships] = useState([]);
  const [selectedData, setSelectedData] = useState("");

  function getData() {
    axios.get("http://localhost:5000/scholarship").then((response) => {
      setScholarships(response.data);
    });
    console.log(scholarships);
  }

  function handleClick(item) {
    setSelectedData(item);
    if (item === selectedData) {
      setSelectedData("");
    }
  }

  useEffect(() => {
    getData();
    props.scholarshipValue(selectedData);
  }, [selectedData]);

  useEffect(() => {
    if (props.isUpdate === false) {
      setSelectedData("");
    }
    if (props.id === "") {
      setSelectedData("");
      props.scholarshipValue("");
    }
  }, [props.id]);

  useEffect(() => {
    if (props.isUpdate === true) {
      setSelectedData(props.selectedData);
      props.scholarshipValue(selectedData);
    }
  }, [props.selectedData]);

  return (
    <>
      <div
        className={` ${
          props.id === "" ? "hidden" : ""
        } w-[400px] p-10 bg-[#E8E8E8] border border-abu-muda flex flex-col relative`}
      >
        <button
          className={` ${
            props.isHidden ? "invisible" : ""
          } rounded-lg bg-[#E8E8E8] w-8 h-8 text-xl text-abu flex items-center justify-center right-8 top-10 absolute hover:text-abu-gelap`}
        >
          <FaPlus />
        </button>
        <p className="font-bold text-hitam text-lg">
          Scope Beasiswa Pertanyaan
        </p>
        <div className="font-semibold">
          {scholarships
            .filter((scholarship) => scholarship.subjek_id.includes(props.id))
            .map((scholarship) => (
              <button
                className={` ${
                  scholarship._id === selectedData
                    ? "bg-kuning text-biru-tua border-kuning hover:bg-kuning-tua hover:border-kuning-tua"
                    : "text-abu-gelap bg-white border-abu hover:bg-gray-300"
                } w-max mt-3 mr-2.5 px-5 py-2 border rounded-3xl shadow-md shadow-gray-200 hover:scale-105`}
                onClick={() => handleClick(scholarship._id)}
              >
                {scholarship.beasiswa}
              </button>
            ))}
        </div>
      </div>
      {/* {selectedData !== "" ? (
        <>
          {" "}
          <TopicOption id={selectedData} />
        </>
      ) : (
        <></>
      )} */}
    </>
  );
}
