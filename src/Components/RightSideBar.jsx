import React, { useRef } from "react";

function RightSideBar(props) {
  const hiddenFileInput = React.useRef(null);

  const handleClick = (event) => {
    hiddenFileInput.current.click();
  };

  const handleChange = (event) => {
    const fileUploaded = event.target.files[0];
    console.log(fileUploaded);
    props.upload(fileUploaded);
  };

  return (
    <>
      <div
        className="bg-greyHighlight h-screen w-[22%] 
      border-stroke border-solid border-[1px]"
      >
        {/* TOP designs and upload btn */}
        <div
          className="w-full relative h-[50px] border-stroke border-solid border-b-[1px]
        flex justify-between px-8 items-center text-white"
        >
          <h1>Design</h1>
          <button
            onClick={handleClick}
            className="bg-white text-black px-6 py-1 rounded-md my-6 "
          >
            Upload
          </button>
          <input
            type="file"
            ref={hiddenFileInput}
            onChange={handleChange}
            style={{ display: "none" }}
          />
        </div>
        {/* TEXT PROPERTIES */}
        <div
          className="w-full h-[250px] border-stroke border-solid border-b-[1px]
        flex-col justify-between px-8 py-4 items-center text-white"
        >
          <h1 className="pb-2">Text</h1>
          <input
            type="text"
            className="bg-transparent w-[100%] py-1 px-1
             border-stroke border-solid border-[1px]"
          />
          <select
            id="fonts"
            className="bg-transparent w-[100%] py-1 px-1 mt-8 dark:bg-greyHighlight dark:border-solid
               dark:border-stroke dark:border-[1px] dark:text-white"
          >
            <option value="US">Poppins</option>
            <option value="CA">Arial</option>
            <option value="FR">France</option>
            <option value="DE">Germany</option>
          </select>
          <div className="flex justify-between items-center">
            <select
              id="fonts"
              className="bg-transparent w-[45%] py-1 px-1 mt-8 dark:bg-greyHighlight dark:border-solid
               dark:border-stroke dark:border-[1px] dark:text-white"
            >
              <option value="CA">Light</option>
              <option value="CA">Regular</option>
              <option value="FR">Medium</option>
              <option value="DE">Bold</option>
            </select>
            <select
              id="font-size"
              className="bg-transparent w-[45%] py-1 px-1 mt-8 dark:bg-greyHighlight dark:border-solid
               dark:border-stroke dark:border-[1px] dark:text-white"
            >
              <option value="CA">10px</option>
              <option value="CA">20px</option>
              <option value="FR">30px</option>
              <option value="DE">40px</option>
              <option value="DE">50px</option>
              <option value="DE">60px</option>
              <option value="DE">70px</option>
            </select>
          </div>
        </div>
     
        <div className="flex flex-col gap-4 justify-center items-center mt-40">

          <div><button type="button" className="btn bg-white text-black">Export as PDF</button></div>
          <div><button type="button" className="btn bg-white text-black">Export as PNG</button></div>
          <div><button type="button" className="btn bg-white text-black">Mutiple Exports</button></div>

        </div>
      </div>
    </>
  );
}

export default RightSideBar;
