import React, { useState, useEffect } from "react";
import axios from "axios";
import SubjectOption from "../components/SubjectOption";
import ScholarshipOption from "../components/ScholarshipOption";
import TopicOption from "../components/TopicOption";
import SubtopicOption from "../components/SubtopicOption";
import SearchResult from "../components/SearchResult";
import SearchBar from "../components/SearchBar";
import Navbar from "../components/Navbar";

export default function Dashboard() {
  const [subject, setSubject] = useState("");
  const [scholarship, setScholarship] = useState("");
  const [topic, setTopic] = useState("");
  const [subtopic, setSubtopic] = useState("");
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  function getResults() {
    axios.get("http://localhost:5000/question").then((response) => {
      setResults(response.data);
    });
    console.log(results);
  }

  useEffect(() => {
    getResults();
  }, []);

  return (
    <>
      <div className="flex flex-col">
        <Navbar dashboard={true} />
        <SearchBar question={setQuery} />
        <div className="flex h-[69vh]">
          <div className="w-[25%] flex flex-col bg-white border-r border-abu-muda overflow-y-scroll overflow-x-hidden">
            <SubjectOption
              subjectValue={setSubject}
              isHidden={true}
              isUpdate={false}
            />
            <ScholarshipOption
              id={subject}
              scholarshipValue={setScholarship}
              isHidden={true}
              isUpdate={false}
            />
            <TopicOption
              id={scholarship}
              topicValue={setTopic}
              isHidden={true}
              isUpdate={false}
            />
            <SubtopicOption
              id={topic}
              subtopicValue={setSubtopic}
              isHidden={true}
              isUpdate={false}
            />
          </div>
          <div className="flex flex-col w-full space-y-3 overflow-y-scroll pb-10">
            <p className="font-bold pt-10 px-20 pb-0 text-lg mb-0">
              Hasil Pencarian
            </p>
            {results
              .filter((result) => result.subjek_id.includes(subject))
              .filter((result) => result.beasiswa_id.includes(scholarship))
              .filter((result) => result.topik_id.includes(topic))
              .filter(
                (result) =>
                  result &&
                  result.subtopik_id &&
                  result.subtopik_id.includes(subtopic)
              )
              .filter((result) =>
                result.pertanyaan.toLowerCase().includes(query.toLowerCase())
              )
              .map((result) => (
                <SearchResult
                  pertanyaan={result.pertanyaan}
                  jawaban={result.jawaban}
                />
              ))}
          </div>
        </div>
      </div>
    </>
  );
}
