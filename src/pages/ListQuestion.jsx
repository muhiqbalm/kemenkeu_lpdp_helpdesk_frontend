import { React, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";
import List from "../components/ListQuestion";
import ReactPaginate from "https://cdn.skypack.dev/react-paginate@7.1.3";
// import "https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css";
import "../components/Pagination.css";

const ListQuestion = () => {
  const [questions, setQuestions] = useState([]);

  const [currentItems, setCurrentItems] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  const itemsPerPage = 6;

  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;

    setCurrentItems(questions.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(questions.length / itemsPerPage));
  }, [itemOffset, itemsPerPage, questions]);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % questions.length;
    setItemOffset(newOffset);
    console.log(currentItems);
  };

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
      <div className="flex flex-col w-full p-10 bg-biru-tua h-full">
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

        {currentItems.map((question) => (
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
          // <CekPagination pertanyaan={question.pertanyaan} />
          // <p className="mb-10 text-white">{question.pertanyaan}</p>
        ))}
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
          previousLinkClassName="page-num-btn"
          nextLinkClassName="page-num-btn"
          activeLinkClassName="activePage"
          // className="text-blue"
        />
      </div>
    </>
  );
};

export default ListQuestion;
