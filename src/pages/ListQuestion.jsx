import {React, useState, useEffect, useRef} from "react";
import { Link } from "react-router-dom";
import { ToastContainer, toast} from "react-toastify";
import { BiEdit } from 'react-icons/bi';
import { RiDeleteBin6Line } from 'react-icons/ri';
import axios from "axios";
import Navbar from "../components/Navbar";
import "../components/StyleList.css";

const ListQuestion = () => {
      const [question, setQuestion] = useState([]); 

      //START OF MODAL

      //END OF MODAL

      useEffect(() => {
        getQuestion();
        deleteQuestion();
      }, []); 

    
      const getQuestion = async () => {
        const response = await axios.get("http://localhost:5000/question");
        setQuestion(response.data);
      }; 

      const setUpdate = async(dat) => {
        let { pertanyaan,
          jawaban,
          } = dat ;
        localStorage.setItem('Pertanyaan', pertanyaan);
        localStorage.setItem('Jawaban', jawaban);

      };

      const deleteQuestion = async (_id) => {
        try {
          await axios.delete(`http://localhost:5000/question/${_id}`);
          getQuestion();
        } catch (error) {
          console.log(error);
        }
      };
      
      
    //---------------------------------------------------------------------HTML-------------------------------------------------------------------------------------
    return(
        <>
        <div><Navbar /> </div>
        <div 
            className="absolute">
        </div>
        <div className="p-4 h-screen bg-white">
        <div className="px-10">
          <div className="">
            <div className="flex justify-between gap-6">
              
 

                <div className="pb-10">
                  <table className="w-full table-auto text-left shadow-lg bg-white border-separate-gray table-auto">
                      <tr className="text-white font-bold">
                        <th class="border px-15 py-1 bg-red-700 text-center">Pertanyaan</th>
                        <th class="border px-8 py-1 bg-red-700 text-center">Jawaban</th>
                        <th class="border px-8 py-1 bg-red-700 tet-center">Aksi</th>
                      </tr>
                    {question.map((dat, index) => {
                            return (
                              <tbody key={index}
                              >
                                <tr className="border border-gray cursor-pointer duration-300 hover:bg-lightgray nth-child(even){bg-merah}">
                                    <td className="py-2 px-2 text-left">
                                        {dat.pertanyaan}
                                    </td>
                                    <td className="text-left">
                                        {dat.jawaban}
                                    </td>
                                    <td className=" flex text-center items-center content-center justify-center">
                                      
                                    {" "}
                                    <Link
                                      to={`EditPertanyaan/${dat._id}`}
                                      className="flex items-center justify-center content-center font-bold text-slate-50 mr-2 bg-gray py-1 px-5 decoration-transparent hover:bg-grey hover:text-white rounded"
                                      
                                      onClick={() => setUpdate(dat)}
                                    >
                                      <BiEdit color="white" size="20" />
                                      Edit
                                    </Link>
                                    <Link
                                        onClick={()=>(dat._id, dat.pertanyaan)}
                                        className="flex items-center justify-center content center font-bold text-slate-50 bg-red-700 py-1 px-3 decoration-transparent hover:bg-red-800 hover:text-red-400 rounded"
                                    >
                                      <RiDeleteBin6Line color="white" size="20" />
                                      Hapus
                
                                    </Link>
                                    </td>
                                </tr>
                              </tbody>
                              );
                          }
                        )}
                  </table>
                  
                </div>
              </div>
            </div>
          </div>
        </div>
        </>
    )
}

export default ListQuestion;