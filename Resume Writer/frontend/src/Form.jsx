import React, { useState } from "react";
import axios from "axios";

const Form = () => {
  const [formData, setFormData] = useState({
    NAME: "",
    ADDRESS: "",
    PHONE: "",
    EMAIL: "",
    UNIVERSITY_NAME: "",
    GRADUATION_DATE: "",
    DEGREE: "",
    DEPARTMENT: "",
    CAREER_OBJECTIVE: "",
    Projects: [
      { ProjectTitle: "", Year: "", Role: "", Location: "", Description: "" },
    ],
    PROJECTS_DESCRIPTION: "",
    TECHNICAL_STRENGTHS: "",
    WORK_EXPERIENCE: "",
    WORK_EXPERIENCE_DATE: "",
    WORK_EXPERIENCE_TITLE: "",
    WORK_EXPERIENCE_DESCRIPTION: "",
    ACADEMIC_ACHIEVEMENTS: "",
    EXTRA_CURRICULAR: "",
    OBJECTIVE: "",
    SKILLS: "",
  });
  const [pdfUrl, setPdfUrl] = useState("");
  // const handleChange = (e) => {
  //   setFormData({
  //     ...formData,
  //     [e.target.name]: e.target.value,
  //   });
  // };

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   axios
  //     .post("http://localhost:5000/api/resume/generate", formData, {
  //       responseType: "blob", // Important to receive binary data
  //     })
  //     .then((response) => {
  //       // Create a URL for the binary PDF data
  //       const url = window.URL.createObjectURL(new Blob([response.data]));
  //       const link = document.createElement("a");
  //       link.href = url;
  //       link.setAttribute("download", "resume.pdf"); // Specify the file name
  //       document.body.appendChild(link);
  //       link.click(); // Trigger the download
  //       document.body.removeChild(link); // Clean up the DOM
  //     })
  //     .catch((error) => {
  //       console.error("There was an error generating the resume!", error);
  //     });
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/api/resume/generate",
        formData
      );

      const data = await response.data;
      console.log(response.data.pdf, 123);
      if (response.data.pdf) {
        // convert base64 into a blob
        const binaryData = atob(data.pdf);

        const byteNumbers = new Uint8Array(binaryData.length);
        for (let i = 0; i < binaryData.length; i++) {
          byteNumbers[i] = binaryData.charCodeAt(i);
        }
        const blob = new Blob([byteNumbers], { type: "application/pdf" });
        const url = URL.createObjectURL(blob);
        setPdfUrl(url);
      }
    } catch (error) {
      console.error("Error generating PDF:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith("Projects")) {
      const [index, field] = name.split("-").slice(1);
      console.log(index, field, 123);
      const updatedForm = [...formData.Projects];
      console.log(updatedForm, 321);
      updatedForm[index][field] = value;
      setFormData({ ...formData, Projects: updatedForm });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };
  return (
    <div className="container mt-32 flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col h-auto w-96 items-center border-2 border-gray-400 rounded-lg justify-center space-y-4 p-4"
      >
        <input
          type="text"
          name="NAME"
          value={formData.NAME}
          onChange={handleChange}
          placeholder="Name"
          required
          className="p-2 border border-black rounded-lg"
        />
        <input
          type="text"
          name="ADDRESS"
          value={formData.ADDRESS}
          onChange={handleChange}
          placeholder="Address"
          required
          className="p-2 border border-black rounded-lg"
        />
        <input
          type="text"
          name="PHONE"
          value={formData.PHONE}
          onChange={handleChange}
          placeholder="Phone"
          required
          className="p-2 border border-black rounded-lg"
        />
        <input
          type="email"
          name="EMAIL"
          value={formData.EMAIL}
          onChange={handleChange}
          placeholder="Email"
          required
          className="p-2 border border-black rounded-lg"
        />
        <input
          type="text"
          name="UNIVERSITY_NAME"
          value={formData.UNIVERSITY_NAME}
          onChange={handleChange}
          placeholder="University Name"
          required
          className="p-2 border border-black rounded-lg"
        />
        <input
          type="text"
          name="GRADUATION_DATE"
          value={formData.GRADUATION_DATE}
          onChange={handleChange}
          placeholder="Graduation Date"
          required
          className="p-2 border border-black rounded-lg"
        />
        <input
          type="text"
          name="DEGREE"
          value={formData.DEGREE}
          onChange={handleChange}
          placeholder="Degree"
          required
          className="p-2 border border-black rounded-lg"
        />
        <input
          type="text"
          name="DEPARTMENT"
          value={formData.DEPARTMENT}
          onChange={handleChange}
          placeholder="Department"
          required
          className="p-2 border border-black rounded-lg"
        />
        <input
          type="text"
          name="SKILLS"
          value={formData.SKILLS}
          onChange={handleChange}
          placeholder="Skills"
          required
          className="p-2 border border-black rounded-lg"
        />
        <textarea
          name="CAREER_OBJECTIVE"
          value={formData.CAREER_OBJECTIVE}
          onChange={handleChange}
          placeholder="Career Objective"
          required
          className="p-2 border border-black rounded-lg"
        />
        {/* Project Section */}

        {formData.Projects.map((project, index) => (
          <div key={index} className="mt-2">
            <input
              type="text"
              name={`Projects-${index}-ProjectTitle`}
              value={project.ProjectTitle}
              placeholder="Project Title"
              onChange={handleChange}
              className="p-2 border border-black rounded-lg"
            />
            <input
              type="text"
              name={`Projects-${index}-Year`}
              value={project.Year}
              placeholder="Project year"
              onChange={handleChange}
              className="p-2 border border-black rounded-lg"
            />
            <input
              type="text"
              name={`Projects-${index}-Role`}
              value={project.Role}
              placeholder="Project Role"
              onChange={handleChange}
              className="p-2 border border-black rounded-lg"
            />
            <input
              type="text"
              name={`Projects-${index}-Location`}
              value={project.Location}
              placeholder="Project Location"
              onChange={handleChange}
              className="p-2 border border-black rounded-lg"
            />
            <input
              type="text"
              name={`Projects-${index}-Description`}
              value={project.Description}
              placeholder="Project Description"
              onChange={handleChange}
              className="p-2 border border-black rounded-lg"
            />
          </div>
        ))}

        <textarea
          name="TECHNICAL_STRENGTHS"
          value={formData.TECHNICAL_STRENGTHS}
          onChange={handleChange}
          placeholder="Technical Strengths"
          required
          className="p-2 border border-black rounded-lg"
        />
        <input
          type="text"
          name="WORK_EXPERIENCE"
          value={formData.WORK_EXPERIENCE}
          onChange={handleChange}
          placeholder="Work Experience"
          required
          className="p-2 border border-black rounded-lg"
        />
        <input
          type="text"
          name="WORK_EXPERIENCE_DATE"
          value={formData.WORK_EXPERIENCE_DATE}
          onChange={handleChange}
          placeholder="Work Experience Date"
          required
          className="p-2 border border-black rounded-lg"
        />
        <input
          type="text"
          name="WORK_EXPERIENCE_TITLE"
          value={formData.WORK_EXPERIENCE_TITLE}
          onChange={handleChange}
          placeholder="Work Experience Title"
          required
          className="p-2 border border-black rounded-lg"
        />
        <textarea
          name="WORK_EXPERIENCE_DESCRIPTION"
          value={formData.WORK_EXPERIENCE_DESCRIPTION}
          onChange={handleChange}
          placeholder="Work Experience Description"
          required
          className="p-2 border border-black rounded-lg"
        />
        <textarea
          name="ACADEMIC_ACHIEVEMENTS"
          value={formData.ACADEMIC_ACHIEVEMENTS}
          onChange={handleChange}
          placeholder="Academic Achievements"
          required
          className="p-2 border border-black rounded-lg"
        />
        <textarea
          name="EXTRA_CURRICULAR"
          value={formData.EXTRA_CURRICULAR}
          onChange={handleChange}
          placeholder="Extra Curricular"
          required
          className="p-2 border border-black rounded-lg"
        />
        <textarea
          name="OBJECTIVE"
          value={formData.OBJECTIVE}
          onChange={handleChange}
          placeholder="OBJECTIVE"
          required
          className="p-2 border border-black rounded-lg"
        />
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">
          Generate Resume
        </button>
      </form>
      {pdfUrl && (
        <iframe
          src={`${pdfUrl}#toolbar=0`}
          width="50%"
          height="600px"
          className="bg-yellow-400"
        />
      )}
    </div>
  );
};

export default Form;
