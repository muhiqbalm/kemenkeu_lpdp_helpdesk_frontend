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

  // const [formData, setFormData] = useState({
  //   pertanyaan: "",
  //   jawaban: "",
  //   subjek_id: "",
  //   beasiswa_id: "",
  //   topik_id: "",
  //   subtopik_id: "",
  //   creator_id: "",
  // });
  const token = atob(Cookies.get("token"));

  useEffect(() => {
    console.log(token);
  }, []);

  const onSubmit = async () => {
    if (
      subject === "" ||
      scholarship === "" ||
      topic === "" ||
      question === "" ||
      answer === ""
    ) {
      toast.error("Mohon isi seluruh data sebelum melakukan submit!");
    } else if (subtopic === "") {
      axios
        .post(
          "http://localhost:5000/question",
          {
            pertanyaan: question,
            jawaban: answer,
            subjek_id: subject,
            beasiswa_id: scholarship,
            topik_id: topic,
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
            console.log(res);
          }
        })
        .catch((err) => {
          console.log(err.response);
          toast.error(err.response.data.message);
        });
    }
  };
  // const onSubmit = async () => {
  //   const data = {
  //     username,
  //     password,
  //   };
  //   if (username === "" || password === "") {
  //     toast.error("Username dan password akun wajib diisi!");
  //     console.log("Username dan password akun wajib diisi!");
  //   } else {
  //     axios
  //       .post("http://localhost:5000/agent/login", data)
  //       .then((res) => {
  //         if (res.status === 200) {
  //           toast.success("Login sukses!");
  //           const { token } = res.data;
  //           const tokenBase64 = btoa(token);
  //           Cookies.set("token", tokenBase64, { expires: 1 });
  //           navigate("/dashboard");
  //         }
  //       })
  //       .catch((err) => {
  //         console.log(err.response);
  //         toast.error(err.response.data.errors);
  //       });
  //   }
  // };

  return (
    <div className="flex flex-col">
      <Navbar />
      <div className="bg-merah px-20 py-14 flex justify-center h-[95vh]">
        <SubmitForm questionValue={setQuestion} answerValue={setAnswer} />
        <div className="flex flex-col">
          <div className="w-max h-[85%] bg-white border-l border-abu rounded-r-2xl overflow-x-hidden overflow-y-scroll">
            <SubjectOption subjectValue={setSubject} />
            <ScholarshipOption id={subject} scholarshipValue={setScholarship} />
            <TopicOption id={scholarship} topicValue={setTopic} />
            <SubtopicOption id={topic} subtopicValue={setSubtopic} />
          </div>
          <div className="bg-white border-t border-l border-abu h-[15%] flex items-center justify-center rounded-br-2xl">
            <button
              className="h-max bg-merah py-2 px-14 text-white font-bold text-lg rounded-full"
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
