import React, { useState, useEffect } from "react";
import axios from "axios";

export default function ScholarshipOption(props) {
  const [scholarships, setScholarships] = useState([]);
  const [selectedData, setSelectedData] = useState("");

  function getData() {
    axios.get("http://localhost:5000/scholarship").then((response) => {
      setScholarships(response.data);
    });
    console.log(scholarships);
  }

  function handleClick(item) {
    setSelectedData(item);
    if (item === selectedData) {
      setSelectedData("");
    }
  }

  // componentDidUpdate(prevProps) {
  //   // Typical usage (don't forget to compare props):
  //   if (this.props.userID !== prevProps.userID) {
  //     this.fetchData(this.props.userID);
  //   }
  // }

  useEffect(() => {
    getData();
    props.scholarshipValue(selectedData);

    if (props.id === "") {
      setSelectedData("");
      props.scholarshipValue("");
    }
  }, [selectedData, props.id]);

  useEffect(() => {
    setSelectedData("");
  }, [props.id]);

  return (
    <>
      <div
        className={` ${
          props.id === "" ? "hidden" : ""
        } w-[400px] p-10 bg-[#E8E8E8] border border-abu-muda flex flex-col `}
      >
        <p className="font-bold text-hitam text-lg">
          Scope Beasiswa Pertanyaan
        </p>
        <div className="font-semibold">
          {scholarships
            .filter((scholarship) => scholarship.subjek_id.includes(props.id))
            .map((scholarship) => (
              <button
                className={` ${
                  scholarship._id === selectedData
                    ? "bg-merah text-white border-merah hover:bg-coklat hover:border-coklat"
                    : "text-abu-gelap bg-white border-abu hover:bg-abu hover:text-white"
                } w-max mt-3 mr-2.5 px-5 py-2 border rounded-3xl shadow-md hover:scale-105`}
                onClick={() => handleClick(scholarship._id)}
              >
                {scholarship.beasiswa}
              </button>
            ))}
        </div>
      </div>
      {/* {selectedData !== "" ? (
        <>
          {" "}
          <TopicOption id={selectedData} />
        </>
      ) : (
        <></>
      )} */}
    </>
  );
}
