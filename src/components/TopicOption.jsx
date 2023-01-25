import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaPlus } from "react-icons/fa";

export default function TopicOption(props) {
  const [topics, setTopics] = useState([]);
  const [selectedData, setSelectedData] = useState("");

  function getData() {
    axios.get("http://localhost:5000/topic").then((response) => {
      setTopics(response.data);
    });
    console.log(topics);
  }

  function handleClick(item) {
    setSelectedData(item);

    if (item === selectedData) {
      setSelectedData("");
    }
  }

  useEffect(() => {
    getData();
    props.topicValue(selectedData);
  }, [selectedData]);

  useEffect(() => {
    if (props.isUpdate === false) {
      setSelectedData("");
    }
    if (props.id === "") {
      setSelectedData("");
      props.topicValue("");
    }
  }, [props.id]);

  useEffect(() => {
    if (props.isUpdate === true) {
      setSelectedData(props.selectedData);
      props.topicValue(selectedData);
    }
  }, [props.selectedData]);

  return (
    <>
      <div
        className={` ${props.id === "" ? "hidden" : ""} 
        w-[400px] p-10 bg-white border border-abu-muda flex flex-col relative`}
      >
        <button
          className={` ${
            props.isHidden ? "invisible" : ""
          } rounded-lg bg-white w-8 h-8 text-xl text-abu flex items-center justify-center right-8 top-10 absolute hover:text-abu-gelap`}
        >
          <FaPlus />
        </button>
        <p className="font-bold text-hitam text-lg">Topik Pertanyaan</p>
        <div className="space-y-3 font-semibold">
          {topics
            .filter((topic) => topic.beasiswa_id.includes(props.id))
            .map((topic) => (
              <button
                className={` ${
                  topic._id === selectedData
                    ? "bg-kuning text-biru-tua border-kuning hover:bg-kuning-tua hover:border-kuning-tua"
                    : "text-abu-gelap bg-white border-abu hover:bg-gray-300"
                } w-max px-5 py-2 border shadow-md shadow-gray-200 mr-2.5 rounded-3xl hover:scale-105`}
                onClick={() => handleClick(topic._id)}
              >
                {topic.topik}
              </button>
            ))}
        </div>
      </div>
    </>
  );
}
