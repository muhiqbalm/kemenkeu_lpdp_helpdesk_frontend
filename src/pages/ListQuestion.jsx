import { React, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";
import List from "../components/ListQuestion";
import ReactPaginate from "react-paginate";
import "../components/Pagination.css";

const ListQuestion = () => {
  const [questions, setQuestions] = useState([]);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  const [currentItems, setCurrentItems] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  const itemsPerPage = 6;

  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;

    setCurrentItems(
      questions
        .filter(
          (result) =>
            result.pertanyaan.toLowerCase().includes(query.toLowerCase()) ||
            result.jawaban.toLowerCase().includes(query.toLowerCase())
        )
        .slice(itemOffset, endOffset)
    );
    setPageCount(
      Math.ceil(
        questions.filter(
          (result) =>
            result.pertanyaan.toLowerCase().includes(query.toLowerCase()) ||
            result.jawaban.toLowerCase().includes(query.toLowerCase())
        ).length / itemsPerPage
      )
    );
  }, [itemOffset, itemsPerPage, questions]);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % questions.length;
    setItemOffset(newOffset);
    console.log(currentItems);
  };

  const getQuestion = async () => {
    const response = await axios.get(
      "https://ss-kemenkeuprime-backend.vercel.app/question/"
    );
    setQuestions(response.data);
  };

  useEffect(() => {
    getQuestion();
  }, [questions]);

  return (
    <>
      <Navbar listPertanyaan={true} />
      <div className="flex flex-col w-full p-10 bg-biru-tua h-[94vh] relative">
        <div className="w-full flex justify-center mb-8">
          <p className="px-5 py-2 bg-kuning font-semibold">Pencarian</p>
          <input
            className="w-full px-5 py-2"
            placeholder="Ketikkan kata kunci pertanyaan atau jawaban"
            onChange={(e) => setQuery(e.target.value)}
          ></input>
        </div>
        <div className="flex">
          <div className="w-[85vw] grid grid-cols-2">
            <p className="text-center bg-biru-muda shadow-md text-white font-bold py-[10px]">
              Pertanyaan
            </p>
            <p className="text-center bg-biru-muda shadow-md text-white font-bold py-[10px]">
              Jawaban
            </p>
          </div>
          <p className="w-[15vw] text-center bg-biru-muda shadow-md text-white font-bold py-[10px]">
            Action
          </p>
        </div>
        <div className="h-max max-h-[65vh] overflow-y-auto">
          {currentItems
            .filter(
              (result) =>
                result.pertanyaan.toLowerCase().includes(query.toLowerCase()) ||
                result.jawaban.toLowerCase().includes(query.toLowerCase())
            )
            .map((question) => (
              <List item={question} />
            ))}
        </div>
        <div className="absolute inset-x-0 bottom-0">
          <ReactPaginate
            breakLabel="..."
            nextLabel="Next"
            onPageChange={handlePageClick}
            pageRangeDisplayed={3}
            pageCount={pageCount}
            previousLabel="Prev"
            renderOnZeroPageCount={null}
            containerClassName="pagination"
            pageLinkClassName="page-num"
            previousLinkClassName="prev-num-btn"
            nextLinkClassName="next-num-btn"
            activeLinkClassName="activePage"
            breakClassName="breakLabel"
          />
        </div>
      </div>
    </>
  );
};

export default ListQuestion;
