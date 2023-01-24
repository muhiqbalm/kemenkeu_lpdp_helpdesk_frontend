import {React, useState, useEffect, useRef} from "react";
import { Link } from "react-router-dom";
import { ToastContainer, toast} from "react-toastify";
import axios from "axios";
import Navbar from "../components/Navbar";

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
                  <table className="w-full table-auto text-left">
                    <thead className="bg-gray border border-grey">
                      <tr className="text-white font-bold">
                        <th className="w-1/12 px-2">No.</th>
                        <th className="w-1/2 py-3 px-2 text-center">Pertanyaan</th>
                        <th className="w-1/2 text-center">Jawaban</th>
                        <th className="w-1/12 ">Action</th>
                      </tr>
                    </thead>
                    {question.map((dat, index) => {
                            return (
                              <tbody key={index}>
                                <tr className="border border-grey">
                                <td className="py-2 px-2 text-left">
                                        {index+1}
                                    </td>
                                    <td className="py-2 px-2 text-left">
                                        {dat.pertanyaan}
                                    </td>
                                    <td className="text-left">
                                        {dat.jawaban}
                                    </td>
                                    <td className=" text-left">
                                    {" "}
                                    <Link
                                      to={`EditPertanyaan/${dat._id}`}
                                      className="font-bold text-slate-50 mr-2 bg-gray py-1 px-3 decoration-transparent hover:bg-grey hover:text-white"
                                      onClick={() => setUpdate(dat)}
                                    >
                                      Edit
                                    </Link>
                                    <Link
                                        onClick={()=>(dat._id, dat.pertanyaan)}
                                        className="font-bold text-slate-50 bg-red-600 py-1 px-2 decoration-transparent hover:bg-red-800 hover:text-red-400"
                                    >
                                      Delete
                
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