import { useState } from "react";
import axios from "axios"; 
import {toast} from "react-toastify";


export default function DeleteModal(props) {
    const deleteData = async () => {
        await axios.delete(`http://localhost:5000//${props.id}`, {
          headers: { "x-auth-token": props.token },
        });
        props.closeModal();
        toast.success("Pertanyaan dan jawaban berhasil dihapus!");
        setTimeout(() => window.location.reload(), 2000);
      };
    const [showModal, setShowModal] = useState(false);
    return (
        <>
            {/*<div className="flex items-center justify-center h-60">
                <button
                    className="px-6 py-3 text-purple-100 bg-purple-600 rounded-md"
                    type="button"
                    onClick={() => setShowModal(true)}
                >
                    Open Modal
                </button>
            </div>*/}
            
            {showModal ? (
                <>
                    <div className="fixed inset-0 z-10 overflow-y-auto">
                        <div
                            className="fixed inset-0 w-full h-full bg-black opacity-40"
                            onClick={() => setShowModal(false)}
                        ></div>
                        <div className="flex items-center min-h-screen px-4 py-8">
                            <div className="relative w-full max-w-lg p-4 mx-auto bg-white rounded-md shadow-lg">
                                <div className="mt-3 sm:flex">
                                    <div className="flex items-center justify-center flex-none w-12 h-12 mx-auto bg-red-100 rounded-full">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg" 
                                            className="w-6 h-6 text-red-600"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            strokeWidth={1.5} 
                                            stroke="currentColor" 
                                        >

                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                                        />
                                        </svg>
                                    </div>
                                    <div className="mt-2 text-center sm:ml-4 sm:text-left">
                                        <h4 className="text-lg  text-black font-montserrat font-bold">
                                            Hapus Pertanyaan & Jawaban?
                                        </h4>
                                        <p className="mt-2 text-[15px] leading-relaxed text-black font-montserrat">
                                        Apakah Anda yakin ingin menghapus pertanyaan dan jawaban ini? Pertanyaan dan jawaban yang sudah dihapus tidak dapat dimunculkan lagi
                                        </p>
                                        <div className="items-center gap-2 mt-3 sm:flex">
                                            <button
                                                className="w-full mt-2 p-2.5 flex-1 border text-black rounded-md outline-none ring-offset-2 ring-indigo-600 focus:ring-2 font-montserrat"
                                                onClick={props.closeModal}
                                            >
                                                Urungkan
                                            </button>
                                            <button
                                                className="w-full mt-2 p-2.5 flex-1 text-white bg-red-600 rounded-md outline-none border ring-offset-2 ring-red-600 focus:ring-2 font-montserrat"
                                                onClick={deleteData}
                                                
                                            >
                                                Hapus
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            ) : null}
        </>
    );
}
