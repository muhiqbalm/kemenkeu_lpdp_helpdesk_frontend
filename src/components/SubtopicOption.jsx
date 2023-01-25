import React, { useState, useEffect } from "react";
import { FaPlus } from "react-icons/fa";
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
  }, [selectedData]);

  useEffect(() => {
    if (props.isUpdate === false) {
      setSelectedData("");
    }
    if (props.id === "") {
      setSelectedData("");
      props.subtopicValue("");
    }
  }, [props.id]);

  useEffect(() => {
    if (props.isUpdate === true) {
      setSelectedData(props.selectedData);
      props.subtopicValue(selectedData);
    }
  }, [props.selectedData]);

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
        } w-[400px] p-10 bg-[#E8E8E8] border border-abu-muda flex flex-col relative`}
      >
        <button
          className={` ${
            props.isHidden ? "invisible" : ""
          } rounded-lg bg-[#E8E8E8] w-8 h-8 text-xl text-abu flex items-center justify-center right-8 top-10 absolute hover:text-abu-gelap`}
        >
          <FaPlus />
        </button>
        <p className="font-bold text-hitam text-lg">Subtopik Pertanyaan</p>
        <div className="font-semibold">
          {subtopics
            .filter((subtopic) => subtopic.topik_id.includes(props.id))
            .map((subtopic) => (
              <button
                className={` ${
                  subtopic._id === selectedData
                    ? "bg-kuning text-biru-tua border-kuning hover:bg-kuning-tua hover:border-kuning-tua"
                    : "text-abu-gelap bg-white border-abu hover:bg-gray-300"
                } w-max mt-3 mr-2.5 px-5 py-2 border shadow-md shadow-gray-200 rounded-3xl hover:scale-105`}
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
