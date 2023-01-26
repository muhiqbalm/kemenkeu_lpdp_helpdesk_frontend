import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { HiPlus } from "react-icons/hi";

export default function ScholarshipOption(props) {
  const [scholarships, setScholarships] = useState([]);
  const isMounted = useRef(false);
  const [selectedData, setSelectedData] = useState("");

  function getData() {
    axios.get("http://localhost:5000/scholarship").then((response) => {
      setScholarships(response.data);
    });
    // console.log(scholarships);
  }

  function handleClick(item) {
    setSelectedData(item);
    props.isChanged(true);
    if (item === selectedData) {
      setSelectedData("");
    }
  }

  useEffect(() => {
    getData();
  }, [scholarships]);

  useEffect(() => {
    props.scholarshipValue(selectedData);
  });

  useEffect(() => {
    setSelectedData(props.selectedData);
  }, []);

  useEffect(() => {
    if (props.subjectChanged === true) {
      setSelectedData("");
    }
  }, [props.id]);

  // useEffect(() => {
  //   if (isMounted.current) {
  //     setSelectedData("");
  //   } else {
  //     isMounted.current = true;
  //   }
  // }, [props.id]);

  // useEffect(() => {
  //   getData();
  //   props.scholarshipValue(selectedData);
  // }, [selectedData]);

  // useEffect(() => {
  //   // if (props.isUpdate === false) {
  //   //   setSelectedData("");
  //   // }
  //   // if (props.id === "") {
  //   //   setSelectedData("");
  //   //   props.scholarshipValue("");
  //   // }
  //   setSelectedData("");
  // }, [props.id]);

  // useEffect(() => {
  //   if (props.isUpdate === true) {
  //     setSelectedData(props.selectedData);
  //     props.scholarshipValue(selectedData);
  //   }
  // }, []);

  return (
    <>
      <div
        className={` ${
          props.id === "" ? "hidden" : ""
        } w-full p-10 pr-5 bg-[#E8E8E8] border-b border-abu-muda flex flex-col relative`}
      >
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
                } w-max mr-2.5 mt-3 px-5 py-2 border rounded-3xl shadow-md shadow-gray-200 hover:scale-105`}
                onClick={() => handleClick(scholarship._id)}
              >
                {scholarship.beasiswa}
              </button>
            ))}
          <button
            className={` ${
              props.addFunction
                ? "text-abu-gelap bg-white border-abu hover:bg-gray-300 mt-3 px-8 pt-2.5 pb-3 border rounded-3xl shadow-md shadow-gray-200 hover:scale-105"
                : "invisible"
            }`}
            onClick={() => props.addScholarship(true)}
          >
            <HiPlus />
          </button>
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
