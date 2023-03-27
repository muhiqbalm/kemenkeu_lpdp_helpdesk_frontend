import React, { useState, useEffect } from "react";
import axios from "axios";
import { HiPlus } from "react-icons/hi";

export default function TopicOption(props) {
  const [topics, setTopics] = useState([]);
  const [selectedData, setSelectedData] = useState("");

  function getData() {
    axios
      .get("https://zany-teal-snail-sari.cyclic.app/topic")
      .then((response) => {
        setTopics(response.data);
      });
    console.log(topics);
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
  }, [topics]);

  useEffect(() => {
    props.topicValue(selectedData);
  });

  useEffect(() => {
    setSelectedData(props.selectedData);
  }, []);

  useEffect(() => {
    if (props.scholarshipChanged === true) {
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
  //   props.topicValue(selectedData);
  // }, [selectedData]);

  // // useEffect(() => {
  // //   if (props.isUpdate === false) {
  // //     setSelectedData("");
  // //     if (props.id === "") {
  // //       setSelectedData("");
  // //       props.topicValue("");
  // //     }
  // //   }
  // // }, [props.id]);

  // useEffect(() => {
  //   // if (props.isUpdate === false) {
  //   //   setSelectedData("");
  //   // }
  //   // if (props.id === "") {
  //   //   setSelectedData("");
  //   //   props.scholarshipValue("");
  //   // }

  //   setSelectedData("");
  //   props.topicValue("");
  // }, [props.id]);

  // useEffect(() => {
  //   if (props.isUpdate === true) {
  //     setSelectedData(props.selectedData);
  //     props.topicValue(selectedData);
  //   }
  // }, [props.selectedData]);

  return (
    <>
      <div
        className={` ${props.id === "" ? "hidden" : ""} 
        w-full p-10 pr-5 bg-white border-b border-abu-muda flex flex-col relative`}
      >
        <p className="font-bold text-hitam text-lg mb-3">Topik Pertanyaan</p>
        <div className="font-semibold">
          {topics
            .filter((topic) => topic.beasiswa_id.includes(props.id))
            .map((topic) => (
              <button
                className={` ${
                  topic._id === selectedData
                    ? "bg-kuning text-biru-tua border-kuning hover:bg-kuning-tua hover:border-kuning-tua"
                    : "text-abu-gelap bg-white border-abu hover:bg-gray-300"
                } w-max px-5 py-2 mt-3 border shadow-md shadow-gray-200 mr-2.5 rounded-3xl hover:scale-105`}
                onClick={() => handleClick(topic._id)}
              >
                {topic.topik}
              </button>
            ))}
          <button
            className={` ${
              props.addFunction
                ? "text-abu-gelap bg-white border-abu hover:bg-gray-300 mt-3 px-8 pt-2.5 pb-3 border rounded-3xl shadow-md shadow-gray-200 hover:scale-105"
                : "invisible"
            }`}
            onClick={() => props.addTopic(true)}
          >
            <HiPlus />
          </button>
        </div>
      </div>
    </>
  );
}
