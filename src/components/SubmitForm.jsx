import React, { useState, useEffect } from "react";

export default function SubmitForm(props) {
  const [pertanyaan, setPertanyaan] = useState("");
  const [jawaban, setJawaban] = useState("");

  useEffect(() => {
    props.questionValue(pertanyaan);
    props.answerValue(jawaban);
  }, [pertanyaan, jawaban]);

  return (
    <>
      <div className="bg-white rounded-l-2xl shadow-xl h-full flex flex-col justify-center px-20 py-10 text-hitam w-max">
        <p className="font-bold text-lg mb-4 text-merah">Pertanyaan</p>
        <textarea
          className="border border-abu h-[25vh] w-[62.5vw] rounded-lg shadow-md p-3 mb-10"
          onChange={(e) => setPertanyaan(e.target.value)}
        ></textarea>
        <p className="font-bold text-lg mb-4 text-merah">Jawaban</p>
        <textarea
          className="border border-abu h-[25vh] w-[62.5vw] rounded-lg shadow-md p-3"
          onChange={(e) => setJawaban(e.target.value)}
        ></textarea>
        <p className="text-md italic mt-10">
          *pastikan seluruh bagian form terisi sebelum melakukan submit
        </p>
      </div>
    </>
  );
}
