import React, { useState, useEffect } from "react";
import axios from "axios";
import ScholarshipOption from "./ScholarshipOption";

export default function CategoryOption() {
  const [subjects, setSubjects] = useState([]);
  const [selectedSubjects, setSelectedSubjects] = useState([]);

  function getData() {
    axios.get("http://localhost:5000/subject").then((response) => {
      setSubjects(response.data);
    });
    console.log(subjects);
  }

  function handleClick(item) {
    setSelectedSubjects(item);
    checkIfClicked(item);
  }

  function checkIfClicked(id) {
    if (id === selectedSubjects) {
      setSelectedSubjects("");
    }
  }

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <div className="w-[400px] p-10 bg-white border border-abu-muda flex flex-col">
        <p className="font-bold text-hitam text-lg">Subjek Pengguna Layanan</p>
        <p>{selectedSubjects}</p>
        <div className="space-y-3 font-semibold">
          {subjects.map((subject) => (
            <button
              className={` ${
                subject._id === selectedSubjects
                  ? "bg-merah text-white border-merah hover:bg-coklat hover:border-coklat"
                  : "text-abu-gelap bg-white border-abu hover:bg-abu hover:text-white"
              } w-max px-7 py-2 border-2 mr-2 rounded-3xl hover:scale-105`}
              onClick={() => handleClick(subject._id)}
            >
              {subject.subjek}
            </button>
          ))}
        </div>
      </div>
      {/* {isClicked ? (
        <>
          {" "}
          <ScholarshipOption item={selectedSubjects} />{" "}
        </>
      ) : (
        <> </>
      )} */}
    </>
  );
}
