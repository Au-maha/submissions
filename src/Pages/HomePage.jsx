import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAdd } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { LogoutFirebase } from "../firebase/authentications";
import { motion } from "framer-motion";

function HomePage() {
  const [projectData, setProjectData] = useState([]);
  const headTextRef = useRef();

  const logovariants = {
    hidden: {
      opacity: 0,
      scale: 0.5,
      x: -100,
    },
    visible: {
      opacity: 1,
      scale: 1.1,
      x: 0,
      transition: {
        duration: 2,
      },
    },
  };

  async function getProjectFromCloud() {
    const token = sessionStorage.getItem("Auth Token");

    await axios
      .post("http://localhost:3000/get_projects", {
        user: token,
      })
      .then((res) => setProjectData(res.data))
      .catch((err) => console.log(err));
  }

  function createProject() {
    sessionStorage.removeItem("projectName");
  }

  function openProject(projectName) {
    sessionStorage.setItem("projectName", projectName);
  }

  return (
    <section className="h-screen w-full bg-zinc-600 overflow-hidden flex flex-col items-center">
      {/* ADD PROJECT */}
      <nav className="h-[10%] w-full flex items-center justify-center p-2">
        <motion.div
          style={{
            fontFamily: "Knewave, cursive",
          }}
          className="text-black text-6xl tracking-widest font-semibold p-3"
          variants={logovariants}
          initial="hidden"
          animate="visible"
        >
          Printify
        </motion.div>
      </nav>
      <div className="w-5/6 flex flex-row justify-between mt-20">
        <div className="basis-1/4">

        </div>
        <div
          className="text-black text-2xl font-semibold flex" 
          style={{ fontFamily: "Tilt Prism, cursive" }}
        >
        
            <h1 className="mr-32">HOME</h1>
            <h1 className="ml-32">VERIFY</h1>
        </div>

        <div className="basis-1/4 flex justify-end">
          <button
            onClick={LogoutFirebase}
            style={{ fontFamily: "Tilt Prism, cursive" }}
            className="bg-highlight px-3 py-2 rounded-lg font-bold text-black"
          >
            Log Out
          </button>
        </div>
      </div>

      <div className="h-1/4 flex items-end justify-center">
        <h1
          ref={headTextRef}
          style={{ fontFamily: "Tilt Prism, cursive" }}
          className="text-black font-bold text-5xl"
          data-value="CREATE UNLIMITED CERTIFICATES IN SECONDS"
        >
          CREATE UNLIMITED CERTIFICATES IN SECONDS
        </h1>
      </div>
      <div className="w-[85%] border-2 border-white h-[65%] mt-10 rounded-t-3xl flex flex-wrap">
        {/* CREATE PROJECT DIV */}
        <div
          className="border-2 border-white border-solid h-52 w-64 m-4 rounded-lg
       flex items-center justify-center cursor-pointer"
        >
          <Link onClick={createProject} to="/certificate">
            <div
              className="border-2 border-white border-dotted h-48 w-60 rounded-lg
       flex flex-col items-center justify-center"
            >
              <FontAwesomeIcon icon={faAdd} width="25px" color="white" />
              <br />
              <h1 className="text-white">Create Project</h1>
            </div>
          </Link>
        </div>
        {projectData.map((val) => (
          <div key={val._id} className="mr-4">
            <p className="text-white text-xs">{val.date}</p>
            <Link
              to="/certificate"
              onClick={() => openProject(val.projectName)}
            >
              <div
                className="border-2 border-white border-solid h-52 w-64 p-2 rounded-lg
       flex items-center justify-center cursor-pointer"
              >
                <img src={val.img} className="rounded-lg w-56 h-44" />
              </div>
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}

export default HomePage;
