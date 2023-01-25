import { React, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";
import List from "../components/ListQuestion";

const ListQuestion = () => {
  // const [question, setQuestion] = useState([]);
  // let [isEditOpen, setIsEditOpen] = useState(false);
  // function closeEditModal() {
  //   setIsEditOpen(!isEditOpen);
  // }

  // function openEditModal() {
  //   setIsEditOpen(!isEditOpen);
  //   console.log(isEditOpen);
  // }

  // //START OF MODAL

  // //END OF MODAL

  // useEffect(() => {
  //   getQuestion();
  //   deleteQuestion();
  // }, []);

  // const getQuestion = async () => {
  //   const response = await axios.get("http://localhost:5000/question");
  //   setQuestion(response.data);
  // };

  // const setUpdate = async (dat) => {
  //   // let { pertanyaan, jawaban } = dat;
  //   // localStorage.setItem("Pertanyaan", pertanyaan);
  //   // localStorage.setItem("Jawaban", jawaban);
  //   setIsEditOpen(true);
  // };

  // const deleteQuestion = async (_id) => {
  //   try {
  //     await axios.delete(`http://localhost:5000/question/${_id}`);
  //     getQuestion();
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
  const [questions, setQuestions] = useState([]);

  const getQuestion = async () => {
    const response = await axios.get("http://localhost:5000/question");
    setQuestions(response.data);
  };

  useEffect(() => {
    getQuestion();
  }, []);

  useEffect(() => {
    getQuestion();
  }, [questions]);

  return (
    <>
      <Navbar listPertanyaan={true} />
      <div className="flex flex-col w-full px-20 py-10 bg-biru-tua">
        <div className="grid grid-cols-3">
          <p className="text-center bg-biru-muda shadow-md text-white font-bold py-[10px]">
            Pertanyaan
          </p>
          <p className="text-center bg-biru-muda shadow-md text-white font-bold py-[10px]">Jawaban</p>
          <p className="text-center bg-biru-muda shadow-md text-white font-bold py-[10px]">Action</p>
        </div>
        {questions.map((question) => (
          <List
            pertanyaan={question.pertanyaan}
            jawaban={question.jawaban}
            id={question._id}
            subjek_id={question.subjek_id}
            beasiswa_id={question.beasiswa_id}
            topik_id={question.topik_id}
            subtopik_id={question.subtopik_id}
            // item={question}
          />
          // <div className="grid grid-cols-3">
          //   <p className="bg-merah text-hitam hover:bg-coklat">
          //     {question.pertanyaan}
          //   </p>
          //   <p className="bg-merah text-hitam hover:bg-coklat">
          //     {question.jawaban}
          //   </p>
          //   <div className="flex justify-center items-center gap-x-3">
          //     <button
          //       onClick={() => setIsEditOpen(true)}
          //       className="inline-flex bg-[#11F26B] items-center px-3 py-1 text-black rounded-md"
          //     >
          //       <FaEdit />
          //       Edit
          //     </button>
          //     <button className="inline-flex bg-red-700 items-center px-3 py-1 text-white rounded-md hover:bg-red-500">
          //       <FaTrash className="mr-[7px]" />
          //       Hapus
          //     </button>
          //   </div>
          //   {isEditOpen ? <UpdateQuestion id={question._id} /> : ""}
          // </div>
        ))}
      </div>

      {/* <div>
        <Navbar />{" "}
      </div>
      <div className="absolute"></div>
      <div className="p-4 h-screen bg-white">
        <div className="px-10">
          <div className="">
            <div className="flex justify-between gap-6">
              <div className="pb-10">
                <table className="w-full table-auto text-left">
                  <thead className="bg-gray border border-grey">
                    <tr className="text-white font-bold">
                      <th className="w-1/12 px-2">No.</th>
                      <th className="w-1/2 py-3 px-2 text-center">
                        Pertanyaan
                      </th>
                      <th className="w-1/2 text-center">Jawaban</th>
                      <th className="w-1/12 ">Action</th>
                    </tr>
                  </thead>
                  {question.map((dat, index) => {
                    return (
                      <tbody key={index}>
                        <tr className="border border-grey">
                          <td className="py-2 px-2 text-left">{index + 1}</td>
                          <td className="py-2 px-2 text-left">
                            {dat.pertanyaan}
                          </td>
                          <td className="text-left">{dat.jawaban}</td>
                          <td className=" text-left">
                            {" "}
                            <Link
                              // to={`/question/${dat._id}`}
                              className="font-bold text-slate-50 mr-2 bg-gray py-1 px-3 decoration-transparent hover:bg-grey hover:text-white"
                              onClick={() => setUpdate()}
                            >
                              Edit
                            </Link>
                            <Link
                              onClick={() => (dat._id, dat.pertanyaan)}
                              className="font-bold text-slate-50 bg-red-600 py-1 px-2 decoration-transparent hover:bg-red-800 hover:text-red-400"
                            >
                              Delete
                            </Link>
                          </td>
                        </tr>
                        {isEditOpen ? (
                          <>
                            {" "}
                            <ListQuestion
                              isEditOpen={isEditOpen}
                              // closeModal={closeEditModal}
                              id={dat._id}
                            />
                          </>
                        ) : (
                          <></>
                        )}
                      </tbody>
                    );
                  })}
                </table>
              </div>
            </div>
          </div>
        </div>
      </div> */}
    </>
  );
};

export default ListQuestion;
