import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import PersonalForm from "../components/PersonalForm";
import EducationForm from "../components/EducationForm";
import ExtraForm from "../components/ExtraForm";
import SkillsForm from "../components/SkillsForm";
import WorkExpForm from "../components/WorkExpForm";
import ProjectsForm from "../components/ProjectsForm";
import { store } from "../Redux/store";
import { useDispatch } from "react-redux";
import { updatePersonalInfo } from "../Redux/personalInfoSlice";
import { setAllEducation } from "../Redux/educationSlice";
import { setAllExtra } from "../Redux/extraSlice";
import { setAllProjects } from "../Redux/projectsSlice";
import { setAllSkills } from "../Redux/skillsSlice";
import { setAllWork } from "../Redux/workSlice";
const Resume = () => {
  console.log("Store state:", store.getState());
  const { id } = useParams();
  const navigate = useNavigate();
  const [index, setIndex] = useState(0);
  const [pdfUrl, setPdfUrl] = useState("");
  const dispatch = useDispatch();

  const handleNext = (i) => {
    console.log("i", i);
    if (i < 5) setIndex(i + 1);
  };
  const handlePrev = (i) => {
    if (i === 0) setIndex(0);
    else setIndex(i - 1);
    console.log("prev index", index);
  };

  const getData = async () => {
    const token = window.localStorage.getItem("token");
    if (id) {
      const response = await axios.get(
        `http://localhost:5000/api/resume/get-resume/${id}`,
        {
          headers: {
            token: `Bearer ${token}`,
          },
        }
      );
      console.log("Resume data:", response.data);
      setData(response.data);

      const resumeData = response.data.resume;

      // Helper function to filter out _id
      const filterIdField = (data) => data.map(({ _id, ...rest }) => rest);

      // Filter out _id from each section
      const personalInfo = filterIdField([resumeData.personalInfo])[0]; // Personal info is usually an object, so take the first element of the array
      const education = filterIdField(resumeData.education);
      const work = filterIdField(resumeData.work);
      const projects = filterIdField(resumeData.projects);
      const extra = filterIdField(resumeData.extra);
      const skills = filterIdField(resumeData.skills);

      // Dispatch actions to update the Redux store
      dispatch(updatePersonalInfo(personalInfo));
      dispatch(setAllEducation(education));
      dispatch(setAllWork(work));
      dispatch(setAllProjects(projects));
      dispatch(setAllExtra(extra));
      dispatch(setAllSkills(skills));
    } else {
      console.log("new resume");
    }
  };

  useEffect(() => {
    getData();

    console.log("current index", index);
  }, []);
  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:5000/api/resume/generate", formData, {
        responseType: "blob", // Important to receive binary data
      })
      .then((response) => {
        // Create a URL for the binary PDF data
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "resume.pdf"); // Specify the file name
        document.body.appendChild(link);
        link.click(); // Trigger the download
        document.body.removeChild(link); // Clean up the DOM
      })
      .catch((error) => {
        console.error("There was an error generating the resume!", error);
      });
  };
  const [data, setData] = useState();

  const handleClick = async () => {
    try {
      const token = window.localStorage.getItem("token");
      console.log(token, "token");
      let response;
      if (id) {
        // Update the existing resume
        response = await axios.put(
          `http://localhost:5000/api/resume/${id}`,
          store.getState(),
          {
            headers: {
              token: `Bearer ${token}`,
            },
          }
        );
        console.log("Resume updated:", response.data);
      } else {
        // Add a new resume
        response = await axios.post(
          "http://localhost:5000/api/resume/add",
          store.getState(),
          {
            headers: {
              token: `Bearer ${token}`,
            },
          }
        );
        console.log("Resume added:", response.data);
        // Redirect to the new resume page with the _id
        navigate(`/resume/${response.data._id}`);
      }

      // Optionally, generate the PDF
      const res = await axios.post(
        "http://localhost:5000/api/resume/generate",
        store.getState(),
        {
          headers: {
            token: `Bearer ${token}`,
          },
        }
      );
      console.log("PDF generation response:", res.data);

      if (res.data.pdf) {
        const binaryData = atob(res.data.pdf);
        const byteNumbers = new Uint8Array(binaryData.length);
        for (let i = 0; i < binaryData.length; i++) {
          byteNumbers[i] = binaryData.charCodeAt(i);
        }
        const blob = new Blob([byteNumbers], { type: "application/pdf" });
        const url = URL.createObjectURL(blob);
        setPdfUrl(url);
      }
    } catch (error) {
      console.error("There was an error processing the resume!", error);
    }
  };
  return (
    <div className="main h-screen ">
      <div className="container h-full w-full flex flex-row items-center justify-between">
        <div className="left h-[600px] w-[600px] ml-12">
          <div className="flex h-full flex-col items-center justify-center border-2 border-black overflow-y-auto rounded-xl">
            {index === 0 && <PersonalForm />}
            {index === 1 && <EducationForm />}
            {index === 2 && <WorkExpForm />}
            {index === 3 && <ProjectsForm />}
            {index === 4 && <SkillsForm />}
            {index === 5 && <ExtraForm />}
          </div>
          <div className="flex items-center justify-between mt-2">
            <button
              className="border-2 border-black bg-blue-500 p-2"
              onClick={() => {
                handlePrev(index);
              }}
            >
              Prev
            </button>
            <button
              className="border-2 border-black bg-blue-500 p-2"
              onClick={() => {
                handleNext(index);
              }}
            >
              Next
            </button>
          </div>
        </div>

        <div className="right bg-blue-300 h-[600px] w-[600px] mr-12 flex flex-col items-center">
          <button
            className="bg-black h-10 w-24 text-white"
            onClick={handleClick}
          >
            Save resume
          </button>

          <div className="screen bg-white  mt-2">
            {pdfUrl && (
              <iframe
                src={`${pdfUrl}`}
                width="600px"
                height="600px"
                className="bg-yellow-400"
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Resume;
