import React, { useState, useEffect } from "react";
import axios from "axios";
import ScholarshipOption from "./ScholarshipOption";

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

    if (props.id === "") {
      setSelectedData("");
      props.topicValue("");
    }
  }, [selectedData, props.id]);

  useEffect(() => {
    setSelectedData("");
  }, [props.id]);

  return (
    <>
      <div
        className={` ${props.id === "" ? "hidden" : ""} 
        w-[400px] p-10 bg-white border border-abu-muda flex flex-col `}
      >
        <p className="font-bold text-hitam text-lg">Topik Pertanyaan</p>
        <div className="space-y-3 font-semibold">
          {topics
            .filter((topic) => topic.beasiswa_id.includes(props.id))
            .map((topic) => (
              <button
                className={` ${
                  topic._id === selectedData
                    ? "bg-merah text-white border-merah hover:bg-coklat hover:border-coklat"
                    : "text-abu-gelap bg-white border-abu hover:bg-abu hover:text-white"
                } w-max px-5 py-2 border shadow-md mr-2.5 rounded-3xl hover:scale-105`}
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
