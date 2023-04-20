import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import Cookies from "js-cookie";

//Category Options
import SubjectOption from "../components/SubjectOption";
import ScholarshipOption from "../components/ScholarshipOption";
import TopicOption from "../components/TopicOption";
import SubtopicOption from "../components/SubtopicOption";

import SubmitForm from "../components/SubmitForm";
import Navbar from "../components/Navbar";

// Modal add category
import AddSubjectModal from "../components/AddSubjectModal";
import AddScholarshipModal from "../components/AddScholarshipModal";
import AddTopicModal from "../components/AddTopicModal";
import AddSubtopicModal from "../components/AddSubtopicModal";

export default function CreateQuestion() {
  const [subject, setSubject] = useState("");
  const [scholarship, setScholarship] = useState("");
  const [topic, setTopic] = useState("");
  const [subtopic, setSubtopic] = useState("");
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [blank, setBlank] = useState(false);

  // Modal add category
  const [addSubject, setAddSubject] = useState(false);
  const [addScholarship, setAddScholarship] = useState(false);
  const [addTopic, setAddTopic] = useState(false);
  const [addSubtopic, setAddSubtopic] = useState(false);

  // Check if category changed or not
  const [isSubjectChanged, setIsSubjectChanged] = useState(false);
  const [isScholarshipChanged, setIsScholarshipChanged] = useState(false);
  const [isTopicChanged, setIsTopicChanged] = useState(false);

  const token = atob(Cookies.get("token"));

  useEffect(() => {
    console.log(token);
  }, []);

  const onSubmit = async () => {
    setBlank(false);

    if (
      subject === "" ||
      scholarship === "" ||
      topic === "" ||
      question === "" ||
      answer === ""
    ) {
      toast.error("Mohon isi seluruh data sebelum melakukan submit!");
    } else {
      axios
        .post(
          "https://famous-bear-tiara.cyclic.app/question",
          {
            pertanyaan: question,
            jawaban: answer,
            subjek_id: subject,
            beasiswa_id: scholarship,
            topik_id: topic,
            subtopik_id: subtopic,
          },
          {
            headers: {
              "Content-Type": "application/json",
              "Access-Control-Allow-Headers": "x-access-token",
              "x-auth-token": token,
            },
          }
        )
        .then((res) => {
          if (res.status < 400) {
            toast.success("Data pertanyaan berhasil ditambahkan!");
            setBlank(true);
            console.log(res);
          }
        })
        .catch((err) => {
          console.log(err.response);
          toast.error(err.response.data.message);
        });
    }
  };

  return (
    <div className="flex flex-col w-full">
      {addSubject ? <AddSubjectModal addSubject={setAddSubject} /> : ""}
      {addScholarship ? (
        <AddScholarshipModal addScholarship={setAddScholarship} />
      ) : (
        ""
      )}
      {addTopic ? <AddTopicModal addTopic={setAddTopic} /> : ""}
      {addSubtopic ? <AddSubtopicModal addSubtopic={setAddSubtopic} /> : ""}
      <Navbar tambahPertanyaan={true} />
      <div className="bg-biru-tua px-20 py-14 flex justify-center h-[94vh]">
        <SubmitForm
          questionValue={setQuestion}
          answerValue={setAnswer}
          isBlank={blank}
        />
        <div className="flex flex-col">
          <div className="h-[85%] bg-white border-l border-abu rounded-r-2xl overflow-x-hidden overflow-y-scroll">
            <SubjectOption
              subjectValue={setSubject}
              selectedData={""}
              isChanged={setIsSubjectChanged}
              isBlank={blank}
              addSubject={setAddSubject}
              addFunction={true}
            />
            <ScholarshipOption
              id={subject}
              scholarshipValue={setScholarship}
              selectedData={""}
              isChanged={setIsScholarshipChanged}
              subjectChanged={isSubjectChanged}
              addScholarship={setAddScholarship}
              addFunction={true}
            />
            <TopicOption
              id={scholarship}
              topicValue={setTopic}
              selectedData={""}
              isChanged={setIsTopicChanged}
              scholarshipChanged={isScholarshipChanged}
              addTopic={setAddTopic}
              addFunction={true}
            />
            <SubtopicOption
              id={topic}
              subtopicValue={setSubtopic}
              selectedData={""}
              topicChanged={isTopicChanged}
              addFunction={true}
              addSubtopic={setAddSubtopic}
            />
          </div>
          <div className="bg-white border-t border-l border-abu h-[15%] flex items-center justify-center rounded-br-2xl">
            <button
              className="h-max bg-biru py-2 px-14 text-white font-bold text-lg rounded-full hover:bg-kuning"
              onClick={onSubmit}
            >
              SUBMIT
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
