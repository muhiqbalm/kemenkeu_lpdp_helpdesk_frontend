import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import Cookies from "js-cookie";
import SubjectOption from "../components/SubjectOption";
import ScholarshipOption from "../components/ScholarshipOption";
import TopicOption from "../components/TopicOption";
import SubtopicOption from "../components/SubtopicOption";
import SubmitForm from "../components/SubmitForm";
import Navbar from "../components/Navbar";

export default function CreateQuestion() {
  const [subject, setSubject] = useState("");
  const [scholarship, setScholarship] = useState("");
  const [topic, setTopic] = useState("");
  const [subtopic, setSubtopic] = useState("");
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [blank, setBlank] = useState(false);

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
          "http://localhost:5000/question",
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
    <div className="flex flex-col">
      <Navbar tambahPertanyaan={true} />
      <div className="bg-biru-tua px-20 py-14 flex justify-center h-[95vh]">
        <SubmitForm
          questionValue={setQuestion}
          answerValue={setAnswer}
          isBlank={blank}
        />
        <div className="flex flex-col">
          <div className="w-max h-[85%] bg-white border-l border-abu rounded-r-2xl overflow-x-hidden overflow-y-scroll">
            <SubjectOption
              subjectValue={setSubject}
              isBlank={blank}
              hidden={false}
            />
            <ScholarshipOption
              id={subject}
              scholarshipValue={setScholarship}
              hidden={false}
            />
            <TopicOption
              id={scholarship}
              topicValue={setTopic}
              hidden={false}
            />
            <SubtopicOption
              id={topic}
              subtopicValue={setSubtopic}
              hidden={false}
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
