import React, { useState, useEffect } from "react";
import { FaPlus } from "react-icons/fa";
import axios from "axios";

export default function SubjectOption(props) {
  const [subjects, setSubjects] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState("");

  function getData() {
    axios.get("http://localhost:5000/subject").then((response) => {
      setSubjects(response.data);
    });
    console.log(subjects);
  }

  function handleClick(item) {
    setSelectedSubject(item);

    if (item === selectedSubject) {
      setSelectedSubject("");
    }
  }

  useEffect(() => {
    getData();
    props.subjectValue(selectedSubject);
  }, [selectedSubject]);

  useEffect(() => {
    if (props.isUpdate === true) {
      setSelectedSubject(props.selectedData);
      props.subjectValue(selectedSubject);
    }
  }, [props.selectedData]);

  useEffect(() => {
    if (props.isBlank === true) {
      setSelectedSubject("");
    }
  }, [props.isBlank]);

  return (
    <>
      <div className="w-[400px] p-10 bg-white border border-abu-muda flex flex-col relative">
        <button
          className={` ${
            props.isHidden ? "invisible" : ""
          } rounded-lg bg-white w-8 h-8 text-xl text-abu flex items-center justify-center right-8 top-10 absolute hover:text-abu-gelap`}
        >
          <FaPlus />
        </button>
        <p className="font-bold text-hitam text-lg">Subjek Pengguna Layanan</p>
        {/* <p>previous data {previousSubjects}</p>
        <p>selected data {selectedSubjects}</p> */}
        <div className="space-y-3 font-semibold">
          {subjects.map((subject) => (
            <button
              className={` ${
                subject._id === selectedSubject
                  ? "bg-kuning text-biru-tua border-kuning hover:bg-kuning-tua hover:border-kuning-tua"
                  : "text-abu-gelap bg-white border-abu hover:bg-gray-300"
              } w-max px-7 py-2 border mr-2.5 rounded-3xl shadow-md shadow-gray-200 hover:scale-105`}
              onClick={() => handleClick(subject._id)}
            >
              {subject.subjek}
            </button>
          ))}
        </div>
      </div>
      {/* {selectedSubjects !== "" ? (
        <>
          {" "}
          <ScholarshipOption id={selectedSubjects} />
        </>
      ) : (
        <></>
      )} */}
    </>
  );
}
