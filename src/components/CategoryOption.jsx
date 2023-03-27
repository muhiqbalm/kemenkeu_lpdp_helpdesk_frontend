import React, { useState, useEffect } from "react";
import axios from "axios";
import SearchResult from "./SearchResult";

export default function CategoryOption() {
  const [subjects, setSubjects] = useState([]);
  const [selectedSubjects, setSelectedSubjects] = useState("");

  const [scholarships, setScholarships] = useState([]);
  const [selectedScholarships, setSelectedScholarships] = useState("");
  const [scholarshipShow, setScholarshipShow] = useState(false);

  const [topics, setTopics] = useState([]);
  const [selectedTopics, setSelectedTopics] = useState("");
  const [topicShow, setTopicShow] = useState(false);

  const [subtopics, setSubtopics] = useState([]);
  const [selectedSubtopics, setSelectedSubtopics] = useState("");
  const [subtopicShow, setSubtopicShow] = useState(false);

  const [results, setResults] = useState([]);

  function getSubject() {
    axios
      .get("https://ss-kemenkeuprime-backend.vercel.app/subject/")
      .then((response) => {
        setSubjects(response.data);
      });
    console.log(subjects);
  }

  function getScholarship() {
    axios
      .get("https://ss-kemenkeuprime-backend.vercel.app/scholarship/")
      .then((response) => {
        setScholarships(response.data);
      });
    console.log(scholarships);
  }

  function getTopic() {
    axios
      .get("https://ss-kemenkeuprime-backend.vercel.app/topic/")
      .then((response) => {
        setTopics(response.data);
      });
    console.log(topics);
  }

  function getSubtopic() {
    axios
      .get("https://ss-kemenkeuprime-backend.vercel.app/subtopic/")
      .then((response) => {
        setSubtopics(response.data);
      });
    console.log(subtopics);
  }

  function getResult() {
    axios
      .get("https://ss-kemenkeuprime-backend.vercel.app/question/")
      .then((response) => {
        setResults(response.data);
      });
    console.log(results);
  }

  function handleClickSubject(item) {
    setSelectedSubjects(item);
    getScholarship();
    setScholarshipShow(true);
    if (item === selectedSubjects) {
      setSelectedSubjects("");
      setSelectedScholarships("");
      setScholarshipShow(false);
      setSelectedTopics("");
      setTopicShow(false);
      setSelectedSubtopics("");
      setSubtopicShow(false);
    }
  }

  function handleClickScholarship(item) {
    setSelectedScholarships(item);
    getTopic();
    setTopicShow(true);
    if (item === selectedScholarships) {
      setSelectedScholarships("");
      setTopicShow(false);
      setSelectedTopics("");
      setTopicShow(false);
      setSelectedSubtopics("");
      setSubtopicShow(false);
    }
  }

  function handleClickTopic(item) {
    setSelectedTopics(item);
    getSubtopic();
    setSubtopicShow(true);
    if (item === selectedTopics) {
      setSelectedTopics("");
      setSelectedSubtopics("");
      setSubtopicShow(false);
    }
  }

  function handleClickSubtopic(item) {
    setSelectedSubtopics(item);
    getSubtopic();
    if (item === selectedSubtopics) {
      setSelectedSubtopics("");
    }
  }

  useEffect(() => {
    getSubject();
    getResult();
  }, []);

  return (
    <>
      <div className="w-full h-[250px] bg-merah flex flex-col items-center justify-center">
        <p className="text-white font-bold text-3xl mb-5">
          Cari Jawaban Terkait LPDP!
        </p>
        <input
          className="w-[51.5%] h-[60px] bg-white border-2 border-abu-muda rounded-lg shadow-lg text-hitam p-5"
          placeholder="Ketikkan kata kunci pertanyaan"
        ></input>
      </div>
      <div className="flex">
        <div className="w-[550px] h-[73.25vh] bg-putih overflow-y-scroll">
          {/* Subject Option */}
          <div className="w-full p-10 bg-white border border-abu-muda flex flex-col">
            <p className="font-bold text-hitam text-lg">
              Subjek Pengguna Layanan
            </p>
            <div className="font-semibold">
              {subjects.map((subject) => (
                <button
                  className={` ${
                    subject._id === selectedSubjects
                      ? "bg-merah text-white border-merah hover:bg-coklat hover:border-coklat hover:shadow-md"
                      : "text-abu-gelap bg-white border-abu hover:bg-gray-300 hover:shadow-md"
                  } w-max mt-3 mr-2.5 px-7 py-2 border-2 rounded-3xl hover:scale-105`}
                  onClick={() => {
                    handleClickSubject(subject._id);
                  }}
                >
                  {subject.subjek}
                </button>
              ))}
            </div>
          </div>

          {/* Scholarship Option */}
          <div
            className={` ${
              scholarshipShow ? "" : "hidden"
            } w-full p-10 bg-[#E8E8E8] border border-t-0 border-abu-muda flex flex-col`}
          >
            <p className="font-bold text-hitam text-lg">
              Scope Beasiswa Pertanyaan
            </p>
            <div className="font-semibold">
              {scholarships
                .filter((scholarship) =>
                  scholarship.subjek_id.includes(selectedSubjects)
                )
                .map((scholarship) => (
                  <button
                    className={` ${
                      scholarship._id === selectedScholarships
                        ? "bg-merah text-white border-merah hover:bg-coklat hover:border-coklat hover:shadow-md"
                        : "text-abu-gelap bg-white border-abu hover:bg-gray-300 hover:shadow-md"
                    } w-max mt-3 mr-2.5 px-5 py-2 border-2 rounded-3xl hover:scale-105`}
                    onClick={() => handleClickScholarship(scholarship._id)}
                  >
                    {scholarship.beasiswa}
                  </button>
                ))}
            </div>
          </div>

          {/* Topic Option */}
          <div
            className={` ${
              topicShow ? "" : "hidden"
            } w-full p-10 bg-white border border-t-0 border-abu-muda flex flex-col`}
          >
            <p className="font-bold text-hitam text-lg">Topik Pertanyaan</p>
            <div className="font-semibold">
              {topics
                .filter((topic) =>
                  topic.beasiswa_id.includes(selectedScholarships)
                )
                .map((topic) => (
                  <button
                    className={` ${
                      topic._id === selectedTopics
                        ? "bg-merah text-white border-merah hover:bg-coklat hover:border-coklat hover:shadow-md"
                        : "text-abu-gelap bg-white border-abu hover:bg-gray-300 hover:shadow-md"
                    } w-max mt-3 mr-2.5 px-5 py-2 border-2 rounded-3xl hover:scale-105`}
                    onClick={() => handleClickTopic(topic._id)}
                  >
                    {topic.topik}
                  </button>
                ))}
            </div>
          </div>

          {/* Subtopic Option */}
          <div
            className={` ${
              subtopicShow ? "" : "hidden"
            } w-full p-10 bg-[#E8E8E8] border border-t-0 border-abu-muda flex flex-col`}
          >
            <p className="font-bold text-hitam text-lg">Subtopik Pertanyaan</p>
            <div className="font-semibold">
              {subtopics
                .filter((subtopic) =>
                  subtopic.topik_id.includes(selectedTopics)
                )
                .map((subtopic) => (
                  <button
                    className={` ${
                      subtopic._id === selectedSubtopics
                        ? "bg-merah text-white border-merah hover:bg-coklat hover:border-coklat hover:shadow-md"
                        : "text-abu-gelap bg-white border-abu hover:bg-gray-300 hover:shadow-md"
                    } w-max mt-3 mr-2.5 px-5 py-2 border-2 rounded-3xl hover:scale-105`}
                    onClick={() => handleClickSubtopic(subtopic._id)}
                  >
                    {subtopic.subtopik}
                  </button>
                ))}
            </div>
          </div>
        </div>

        {/* Search Result */}
        <div className="w-full border">
          <p className="font-bold p-10 pb-0 text-xl mb-7">Hasil Pencarian</p>
          {results
            .filter((result) => result.subjek_id.includes(selectedSubjects))
            .filter((result) =>
              result.beasiswa_id.includes(selectedScholarships)
            )
            .filter((result) => result.topik_id.includes(selectedTopics))
            .filter((result) => result.subtopik_id.includes(selectedSubtopics))
            .map((result) => (
              <SearchResult
                pertanyaan={result.pertanyaan}
                jawaban={result.jawaban}
              />
            ))}
        </div>
      </div>
    </>
  );
}
