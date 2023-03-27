import React, { useState, useEffect } from "react";
import axios from "axios";
import SubjectOption from "../components/SubjectOption";
import ScholarshipOption from "../components/ScholarshipOption";
import TopicOption from "../components/TopicOption";
import SubtopicOption from "../components/SubtopicOption";
import SearchResult from "../components/SearchResult";
import SearchBar from "../components/SearchBar";
import Navbar from "../components/Navbar";
import ReactPaginate from "react-paginate";
import "../components/Pagination.css";

export default function Dashboard() {
  const [subject, setSubject] = useState("");
  const [scholarship, setScholarship] = useState("");
  const [topic, setTopic] = useState("");
  const [subtopic, setSubtopic] = useState("");
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [filteredResults, setFilteredResults] = useState([]);

  const [isSubjectChanged, setIsSubjectChanged] = useState(false);
  const [isScholarshipChanged, setIsScholarshipChanged] = useState(false);
  const [isTopicChanged, setIsTopicChanged] = useState(false);

  const [currentItems, setCurrentItems] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  const itemsPerPage = 5;

  useEffect(() => {
    setFilteredResults(
      results.filter(
        (result) =>
          result.subjek_id.includes(subject) &&
          result.beasiswa_id.includes(scholarship) &&
          result.topik_id.includes(topic) &&
          result.subtopik_id.includes(subtopic) &&
          result.pertanyaan.toLowerCase().includes(query.toLowerCase())
      )
    );
  }, [results, subject, scholarship, topic, subtopic, query]);

  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;
    setCurrentItems(filteredResults.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(filteredResults.length / itemsPerPage));
  }, [itemOffset, itemsPerPage, currentItems]);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % results.length;
    setItemOffset(newOffset);
    console.log(currentItems);
  };

  function getResults() {
    axios
      .get("https://ss-kemenkeuprime-backend.vercel.app/question/")
      .then((response) => {
        setResults(response.data);
      });
    console.log(results);
  }

  useEffect(() => {
    getResults();
  }, []);

  return (
    <>
      <div className="flex flex-col">
        <Navbar dashboard={true} />
        <SearchBar question={setQuery} />
        <div className="flex h-[69vh]">
          <div className="w-[26%] flex flex-col bg-white overflow-y-auto">
            <SubjectOption
              subjectValue={setSubject}
              selectedData={""}
              isChanged={setIsSubjectChanged}
              addFunction={false}
            />
            <ScholarshipOption
              id={subject}
              scholarshipValue={setScholarship}
              selectedData={""}
              isChanged={setIsScholarshipChanged}
              subjectChanged={isSubjectChanged}
              addFunction={false}
            />
            <TopicOption
              id={scholarship}
              topicValue={setTopic}
              selectedData={""}
              isChanged={setIsTopicChanged}
              scholarshipChanged={isScholarshipChanged}
              addFunction={false}
            />
            <SubtopicOption
              id={topic}
              subtopicValue={setSubtopic}
              selectedData={""}
              topicChanged={isTopicChanged}
              addFunction={false}
            />
          </div>
          <div className="flex flex-col w-full space-y-3 overflow-y-scroll pb-10 border-l border-abu-muda">
            <div className="w-full flex justify-between">
              <p className="font-bold pt-10 px-20 pb-0 text-lg mb-0">
                Hasil Pencarian
              </p>
              <p className="pt-10 px-20 pb-0 text-lg text-abu mb-0">
                {filteredResults.length} hasil ditemukan
              </p>
            </div>

            {currentItems.map((result) => (
              <SearchResult
                pertanyaan={result.pertanyaan}
                jawaban={result.jawaban}
              />
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
              previousLinkClassName="prev-num-btn"
              nextLinkClassName="next-num-btn"
              activeLinkClassName="activePage"
              breakClassName="breakLabel"
            />
          </div>
        </div>
      </div>
    </>
  );
}
