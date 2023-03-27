import React, { useState, useEffect } from "react";
import { HiPlus } from "react-icons/hi";
import axios from "axios";

export default function SubjectOption(props) {
  const [subjects, setSubjects] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState("");

  function getData() {
    axios
      .get("https://ss-kemenkeuprime-backend.vercel.app/subject/")
      .then((response) => {
        setSubjects(response.data);
      });
    console.log(subjects);
  }

  function handleClick(item) {
    setSelectedSubject(item);
    props.isChanged(true);

    if (item === selectedSubject) {
      setSelectedSubject("");
    }
  }

  useEffect(() => {
    getData();
  }, [subjects]);

  useEffect(() => {
    props.subjectValue(selectedSubject);
  });

  useEffect(() => {
    setSelectedSubject(props.selectedData);
  }, []);

  useEffect(() => {
    if (props.subjectChanged === true) {
      setSelectedSubject("");
    }
  }, [props.id]);

  // useEffect(() => {
  //   getData();
  // }, [subjects]);

  // useEffect(() => {
  //   getData();
  //   props.subjectValue(selectedSubject);
  // }, [selectedSubject]);

  // useEffect(() => {
  //   if (props.isUpdate === true) {
  //     setSelectedSubject(props.selectedData);
  //     props.subjectValue(selectedSubject);
  //   }
  // }, [props.selectedData]);

  useEffect(() => {
    if (props.isBlank === true) {
      setSelectedSubject("");
    }
  }, [props.isBlank]);

  return (
    <>
      <div className="w-full p-10 pr-5 bg-white border-b border-abu-muda flex flex-col relative">
        <p className="font-bold text-hitam text-lg">Subjek Pengguna Layanan</p>
        <div className="font-semibold">
          {subjects.map((subject) => (
            <button
              className={` ${
                subject._id === selectedSubject
                  ? "bg-kuning text-biru-tua border-kuning hover:bg-kuning-tua hover:border-kuning-tua"
                  : "text-abu-gelap bg-white border-abu hover:bg-gray-300"
              } w-max px-7 py-2 border mr-2.5 mt-3 rounded-3xl shadow-md shadow-gray-200 hover:scale-105`}
              onClick={() => handleClick(subject._id)}
            >
              {subject.subjek}
            </button>
          ))}
          <button
            className={` ${
              props.addFunction
                ? "text-abu-gelap bg-white border-abu hover:bg-gray-300 mt-3 px-8 pt-2.5 pb-3 border rounded-3xl shadow-md shadow-gray-200 hover:scale-105"
                : "invisible"
            }`}
            onClick={() => props.addSubject(true)}
          >
            <HiPlus />
          </button>
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
