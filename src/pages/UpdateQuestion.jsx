import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import Cookies from "js-cookie";
import { useParams } from "react-router-dom";
import SubjectOption from "../components/SubjectOption";
import ScholarshipOption from "../components/ScholarshipOption";
import TopicOption from "../components/TopicOption";
import SubtopicOption from "../components/SubtopicOption";
import UpdateForm from "../components/UpdateForm";
import { useNavigate } from "react-router-dom";
import { FaWindows } from "react-icons/fa";

export default function UpdateQuestion(props) {
  const [subject, setSubject] = useState("");
  const [scholarship, setScholarship] = useState("");
  const [topic, setTopic] = useState("");
  const [subtopic, setSubtopic] = useState("");
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [data, setData] = useState([]);

  const token = atob(Cookies.get("token"));

  useEffect(() => {
    setSubject(props.item.subjek_id);
  }, []);

  function getData() {
    axios.get(`http://localhost:5000/question/${props.id}`).then((response) => {
      setData(response.data.response);
    });
    console.log(data);
  }

  const onSubmit = async () => {
    if (
      subject === "" ||
      scholarship === "" ||
      topic === "" ||
      question === "" ||
      answer === "" ||
      subtopic === ""
    ) {
      toast.error("Mohon isi seluruh data sebelum melakukan update!");
    } else {
      axios
        .put(
          `http://localhost:5000/question/${props.item._id}`,
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
    <div className="absolute top-0 left-0 right-0">
      <div className="bg-gray-800/50 px-20 py-14 flex justify-center h-screen w-full backdrop-blur-lg">
        <UpdateForm
          selectedQuestion={props.item.pertanyaan}
          selectedAnswer={props.item.jawaban}
          questionValue={setQuestion}
          answerValue={setAnswer}
        />
        <div className="flex flex-col">
          <div className="h-[85%] bg-white border-l border-abu rounded-r-2xl overflow-x-hidden overflow-y-scroll">
            <SubjectOption
              subjectValue={setSubject}
              hidden={false}
              isUpdate={true}
              selectedData={props.item.subjek_id}
            />
            <ScholarshipOption
              id={subject}
              scholarshipValue={setScholarship}
              hidden={false}
              isUpdate={true}
              selectedData={props.item.beasiswa_id}
            />
            <TopicOption
              id={scholarship}
              topicValue={setTopic}
              hidden={false}
              isUpdate={true}
              selectedData={props.item.topik_id}
            />
            <SubtopicOption
              id={topic}
              subtopicValue={setSubtopic}
              hidden={false}
              isUpdate={true}
              selectedData={props.item.subtopik_id}
            />
          </div>
          <div className="bg-white border-t border-l border-abu h-[15%] flex items-center justify-center rounded-br-2xl space-x-8">
            <button
              className="bg-biru py-1.5 px-10 text-white font-bold text-lg rounded-full hover:bg-biru-tua"
              onClick={onSubmit}
            >
              UPDATE
            </button>
            <button
              className="bg-white border border-abu py-1.5 px-10 text-abu font-bold text-lg rounded-full hover:bg-gray-200"
              onClick={() => props.isEditOpen(false)}
            >
              CANCEL
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
