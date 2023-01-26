import { React, useState, useEffect } from "react";
import SubjectOption from "../components/SubjectOption";
import ScholarshipOption from "../components/ScholarshipOption";
import TopicOption from "../components/TopicOption";
import SubtopicOption from "../components/SubtopicOption";
import Navbar from "../components/Navbar";

export default function AddCategory() {
  const [subject, setSubject] = useState("");
  const [scholarship, setScholarship] = useState("");
  const [topic, setTopic] = useState("");
  const [subtopic, setSubtopic] = useState("");
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  return (
    <>
      <Navbar />
      <div className="w-full h-[94vh] bg-biru p-20">
        <div className="w-full h-full bg-white grid grid-cols-4 rounded-xl overflow-clip">
          <div className="w-full h-full border-r border-abu">
            <SubjectOption
              subjectValue={setSubject}
              isHidden={true}
              isUpdate={false}
            />
            <input></input>
          </div>
          <div className="h-full border-r border-abu">
            <ScholarshipOption
              id={subject}
              scholarshipValue={setScholarship}
              isHidden={true}
              isUpdate={false}
            />
            <input></input>
          </div>
          <div className="h-full border-r border-abu">
            <TopicOption
              id={scholarship}
              topicValue={setTopic}
              isHidden={true}
              isUpdate={false}
            />
            <input></input>
          </div>
          <div className="h-full border-r border-abu">
            <SubtopicOption
              id={topic}
              subtopicValue={setSubtopic}
              isHidden={true}
              isUpdate={false}
            />
            <input></input>
          </div>
          {/* <p className="w-full bg-white h-full">A</p>
          <p className="w-full bg-white h-full">A</p>
          <p className="w-full bg-white h-full">A</p>
          <p className="w-full bg-white h-full">A</p> */}
        </div>
      </div>
    </>
  );
}
