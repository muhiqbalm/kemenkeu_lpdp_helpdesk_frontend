import React, { useState, useEffect } from "react";
import bg from "../assets/ornament.svg";

export default function SearchBar(props) {
  const [query, setQuery] = useState("");

  useEffect(() => {
    props.question(query);
  }, [query]);

  return (
    <>
      <div className="w-full h-[25vh] bg-merah flex flex-col items-center justify-center relative">
        <img src={bg} alt="bg" className="absolute left-0 top-0" />

        <p className="text-white font-bold text-3xl mb-5">
          Cari Jawaban Terkait LPDP!
        </p>
        <input
          className="w-[50%] h-[60px] bg-white border-2 border-abu-muda rounded-lg shadow-lg text-hitam p-5"
          placeholder="Ketikkan kata kunci pertanyaan"
          onChange={(e) => setQuery(e.target.value)}
        ></input>
        <img
          src={bg}
          alt="bg"
          className="rotate-180 absolute right-0 bottom-0"
        />
      </div>
    </>
  );
}
