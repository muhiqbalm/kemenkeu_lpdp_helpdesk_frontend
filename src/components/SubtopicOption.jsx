import React, { useState, useEffect } from "react";
import axios from "axios";

export default function SubtopicOption(props) {
  const [subtopics, setSubtopics] = useState([]);
  const [selectedData, setSelectedData] = useState("");
  const [filteredData, setFilteredData] = useState([]);

  function getData() {
    axios.get("http://localhost:5000/subtopic").then((response) => {
      setSubtopics(response.data);
    });
    console.log(subtopics);
  }

  function handleClick(item) {
    setSelectedData(item);
    if (item === selectedData) {
      setSelectedData("");
    }
  }

  useEffect(() => {
    getData();
    props.subtopicValue(selectedData);

    if (props.id === "") {
      setSelectedData("");
      props.subtopicValue("");
    }

    console.log(filteredData);
  }, [selectedData, props.id]);

  useEffect(() => {
    setSelectedData("");
  }, [props.id]);

  return (
    <div
      className={` ${
        subtopics.filter((subtopic) => subtopic.topik_id.includes(props.id))
          .length === 0
          ? "hidden"
          : ""
      }`}
    >
      <div
        className={` ${
          props.id === "" ? "hidden" : ""
        } w-[400px] p-10 bg-[#E8E8E8] border border-abu-muda flex flex-col `}
      >
        <p className="font-bold text-hitam text-lg">Subtopik Pertanyaan</p>
        <div className="font-semibold">
          {subtopics
            .filter((subtopic) => subtopic.topik_id.includes(props.id))
            .map((subtopic) => (
              <button
                className={` ${
                  subtopic._id === selectedData
                    ? "bg-merah text-white border-merah hover:bg-coklat hover:border-coklat"
                    : "text-abu-gelap bg-white border-abu hover:bg-abu hover:text-white"
                } w-max mt-3 mr-2.5 px-5 py-2 border shadow-md rounded-3xl hover:scale-105`}
                onClick={() => handleClick(subtopic._id)}
              >
                {subtopic.subtopik}
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
    </div>
  );
}
