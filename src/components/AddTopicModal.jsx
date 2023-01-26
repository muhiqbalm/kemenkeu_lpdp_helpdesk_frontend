import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import Cookies from "js-cookie";
import SubjectOption from "./SubjectOption";
import ScholarshipOption from "./ScholarshipOption";

export default function AddTopicModal(props) {
  const token = atob(Cookies.get("token"));
  const [subject, setSubject] = useState("");
  const [scholarship, setScholarship] = useState("");
  const [topic, setTopic] = useState("");

  // Check if category changed or not
  const [isSubjectChanged, setIsSubjectChanged] = useState(false);

  function postData() {
    if (topic === "") {
      toast.error("Data topik tidak boleh kosong!");
    } else if (scholarship === "") {
      toast.error(
        "Beasiswa harus dipilih terlebih dahulu sebelum melakukan submit!"
      );
    } else {
      try {
        axios
          .post(
            `http://localhost:5000/topic`,
            { beasiswa_id: scholarship, topik: topic },
            {
              headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Headers": "x-access-token",
                "x-auth-token": token,
              },
            }
          )
          .then((res) => {
            if (res.status < 400) {
              toast.success("Subjek berhasil ditambahkan!");
              console.log(res);
              props.addTopic(false);
            }
          })
          .catch((err) => {
            console.log(err.response);
            toast.error(err.response.data.message);
            props.addTopic(false);
          });
      } catch (error) {
        console.log(error);
      }
    }
  }

  return (
    <div className="absolute inset-0 flex justify-center z-10">
      <div className="fixed bg-hitam/50 backdrop-blur-sm">
        <button
          className="w-screen h-screen"
          onClick={() => props.addTopic(false)}
        ></button>
      </div>
      <div className="w-[30vw] h-max bg-white rounded-2xl absolute top-8 shadow-lg flex flex-col items-center py-5">
        <div className="border-b border-abu-muda w-full flex flex-col items-center justify-center pb-5">
          <p className="font-bold text-2xl text-hitam">Tambah Kategori</p>
          <p className="text-abu mt-1">
            Pilih seluruh kategori terlebih dahulu
          </p>
        </div>
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
          subjectChanged={isSubjectChanged}
          addFunction={false}
        />
        <div className="flex flex-col justify-start w-full my-10 px-10">
          <p className="text-hitam mb-2 font-bold text-lg">Topik Pertanyaan</p>
          <input
            onChange={(e) => setTopic(e.target.value)}
            className="border w-full border-abu text-md py-2 px-4 rounded-md"
            placeholder="Ketik topik pertanyaan yang ingin ditambahkan"
          ></input>
        </div>

        <div className="w-full flex justify-between space-x-8 px-10">
          <button
            className="w-full bg-biru py-2 border border-biru  text-white font-bold text-md rounded-md hover:bg-biru-muda"
            onClick={() => postData()}
          >
            SUBMIT
          </button>
          <button
            className="w-full bg-white border border-abu py-2 text-abu font-bold text-md rounded-md hover:bg-gray-200"
            onClick={() => props.addTopic(false)}
          >
            BATAL
          </button>
        </div>
      </div>
    </div>
  );
}
