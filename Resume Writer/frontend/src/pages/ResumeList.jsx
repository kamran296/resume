import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ResumeList = () => {
  const [user, setUser] = useState(null); // Initialize with null or empty array if no data
  const [error, setError] = useState(null); // To handle errors
  const [resumeList, setResumeList] = useState([]); // State to hold resumes
  const navigate = useNavigate();
  const getUser = async () => {
    try {
      const token = window.localStorage.getItem("token");

      if (!token) {
        console.log("No token found");
        return;
      }

      const response = await axios.get(
        "http://localhost:5000/api/v1/user/get-user",
        {
          headers: {
            token: `Bearer ${token}`, // Using Authorization header
          },
        }
      );

      if (response.status === 200) {
        const data = response.data;
        setUser(data);
        setResumeList(data.resumes); // Set resume IDs to state
        console.log(data, "data");
        console.log("User Data:", data);
      } else {
        console.log("Error getting user info, status:", response.status);
      }
    } catch (error) {
      setError(error.message);
      console.error("Error fetching user data:", error.message);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  const handleClick = async (resumeId) => {
    if (!resumeId) {
      // If resumeId is not provided, navigate to the base /resume/ path
      navigate("/resume");
    } else {
      // If resumeId is provided, navigate to /resume/:resumeId
      navigate(`/resume/${resumeId}`);
    }
  };

  return (
    <>
      <div className="h-full w-full">
        <h1 className="flex items-center justify-center mt-2 text-2xl">
          Resume List
        </h1>
        {error && <p>Error: {error}</p>}
        {user ? (
          resumeList.length > 0 ? (
            <ul className="h-full w-full flex flex-rows items-center justify-center mt-3">
              {resumeList.map((resumeId, index) => (
                <>
                  <li
                    key={resumeId}
                    className="h-[200px] w-[200px] bg-gray-400 m-4 rounded-lg flex flex-col items-center justify-center"
                  >
                    Resume {index + 1}
                    <button
                      className="h-12 w-16 mt-6 bg-black text-white rounded-lg flex items-center justify-center"
                      onClick={() => handleClick(resumeId)}
                    >
                      Edit
                    </button>
                  </li>

                  {/* new resume */}

                  <div
                    key={"new"}
                    className="h-[200px] w-[200px] bg-gray-400 m-4 rounded-lg flex flex-col items-center justify-center"
                  >
                    Add Resume
                    <button
                      className="h-12 w-16 bg-black rounded-lg text-white mt-6"
                      onClick={() => handleClick()}
                    >
                      Edit
                    </button>
                  </div>
                </>
              ))}
            </ul>
          ) : (
            <>
              <div className="h-[200px] w-[200px] bg-gray-400 m-4 flex flex-col items-center justify-center">
                Add Resume
                <button
                  className="h-12 w-16 bg-black text-white flex"
                  onClick={() => handleClick()}
                >
                  Edit
                </button>
              </div>
            </>
          )
        ) : (
          <>
            <p>Loading.....</p>
          </>
        )}
      </div>
    </>
  );
};

export default ResumeList;
