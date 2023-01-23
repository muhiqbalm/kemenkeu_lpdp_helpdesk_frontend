import React, { useState, useEffect } from "react";
import axios from "axios";
import ScholarshipOption from "./ScholarshipOption";

export default function SubjectOption(props) {
  const [subjects, setSubjects] = useState([]);
  const [selectedSubjects, setSelectedSubjects] = useState("");

  function getData() {
    axios.get("http://localhost:5000/subject").then((response) => {
      setSubjects(response.data);
    });
    console.log(subjects);
  }

  function handleClick(item) {
    setSelectedSubjects(item);

    if (item === selectedSubjects) {
      setSelectedSubjects("");
    }
  }

  useEffect(() => {
    getData();
    props.subjectValue(selectedSubjects);
  }, [selectedSubjects]);

  return (
    <>
      <div className="w-[400px] p-10 bg-white border border-abu-muda flex flex-col">
        <p className="font-bold text-hitam text-lg">Subjek Pengguna Layanan</p>
        {/* <p>previous data {previousSubjects}</p>
        <p>selected data {selectedSubjects}</p> */}
        <div className="space-y-3 font-semibold">
          {subjects.map((subject) => (
            <button
              className={` ${
                subject._id === selectedSubjects
                  ? "bg-merah text-white border-merah hover:bg-coklat hover:border-coklat"
                  : "text-abu-gelap bg-white border-abu hover:bg-abu hover:text-white"
              } w-max px-7 py-2 border mr-2.5 rounded-3xl shadow-md hover:scale-105`}
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
