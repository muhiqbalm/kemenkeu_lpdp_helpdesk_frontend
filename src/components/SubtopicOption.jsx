import React, { useState, useEffect } from "react";
import { HiPlus } from "react-icons/hi";
import axios from "axios";

export default function SubtopicOption(props) {
  const [subtopics, setSubtopics] = useState([]);
  const [selectedData, setSelectedData] = useState("");

  function getData() {
    axios
      .get("https://zany-teal-snail-sari.cyclic.app/subtopic")
      .then((response) => {
        setSubtopics(response.data);
      });
  }

  function handleClick(item) {
    setSelectedData(item);

    if (item === selectedData) {
      setSelectedData("");
    }
  }

  useEffect(() => {
    getData();
  }, [subtopics]);

  useEffect(() => {
    props.subtopicValue(selectedData);
  });

  useEffect(() => {
    setSelectedData(props.selectedData);
  }, []);

  useEffect(() => {
    if (props.topicChanged === true) {
      setSelectedData("");
    }
  }, [props.id]);

  // function handleClick(item) {
  //   setSelectedData(item);
  //   if (item === selectedData) {
  //     setSelectedData("");
  //   }
  // }

  // useEffect(() => {
  //   getData();
  //   props.subtopicValue(selectedData);
  // }, [selectedData]);

  // useEffect(() => {
  //   if (props.isUpdate === false) {
  //     setSelectedData("");
  //   }
  //   if (props.id === "") {
  //     setSelectedData("");
  //     props.subtopicValue("");
  //   }
  // }, [props.id]);

  // useEffect(() => {
  //   if (props.isUpdate === true) {
  //     setSelectedData(props.selectedData);
  //     props.subtopicValue(selectedData);
  //   }
  // }, [props.selectedData]);

  return (
    <div>
      <div
        className={` ${
          props.id === "" ? "hidden" : ""
        } w-full p-10 pr-5 bg-[#E8E8E8] border-b border-abu-muda flex flex-col relative`}
      >
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
          <button
            className={` ${
              props.addFunction
                ? "text-abu-gelap bg-white border-abu hover:bg-gray-300 mt-3 px-8 pt-2.5 pb-3 border rounded-3xl shadow-md shadow-gray-200 hover:scale-105"
                : "invisible"
            }`}
            onClick={() => props.addSubtopic(true)}
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
    </div>
  );
}
