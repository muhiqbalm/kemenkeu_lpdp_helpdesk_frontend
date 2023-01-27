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

  const [isSubjectChanged, setIsSubjectChanged] = useState(false);
  const [isScholarshipChanged, setIsScholarshipChanged] = useState(false);
  const [isTopicChanged, setIsTopicChanged] = useState(false);

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
          <div className="w-[26%] flex flex-col bg-white border-r border-abu-muda overflow-y-auto">
            <SubjectOption
              subjectValue={setSubject}
              selectedData={""}
              isChanged={setIsSubjectChanged}
              addFunction={false}
            />
            <ScholarshipOption
              id={subject}
              scholarshipValue={setScholarship}
              selectedData={""}
              isChanged={setIsScholarshipChanged}
              subjectChanged={isSubjectChanged}
              addFunction={false}
            />
            <TopicOption
              id={scholarship}
              topicValue={setTopic}
              selectedData={""}
              isChanged={setIsTopicChanged}
              scholarshipChanged={isScholarshipChanged}
              addFunction={false}
            />
            <SubtopicOption
              id={topic}
              subtopicValue={setSubtopic}
              selectedData={""}
              topicChanged={isTopicChanged}
              addFunction={false}
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
              .filter((result) => result.subtopik_id.includes(subtopic))
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
