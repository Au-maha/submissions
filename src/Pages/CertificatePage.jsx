import React, { useState, useRef, useCallback, useEffect } from "react";
import LeftSideBar from "../Components/LeftSideBar";
import RightSideBar from "../Components/RightSideBar";
import Draggable from "react-draggable";
import axios from "axios";

function CertificatePage() {
  const [file, setFile] = useState();
  const [selectedText, setSelectedText] = useState();
  const [nameChangeSelected, setNameChangeSelected] = useState(false);
  const [nameChange, setNameChange] = useState();
  const [textLayers, setTextLayers] = useState([]);

  const [textName, setTextName] = useState("XXXXXX");
  const [textColor, setTextColor] = useState("#000000");
  const [fontWeight, setFontWeight] = useState("400");
  const [fontSize, setFontSize] = useState("24");
  const [fontFamily, setFontFamily] = useState("Poppins");

  const printCertificateRef = useRef();
  async function getAlreadyCreatedCertificate() {
    const projectName = sessionStorage.getItem("projectName");
    if (projectName) {
      await axios
        .post("http://localhost:3000/get_project_by_id", {
          projectName: projectName,
        })
        .then((res) => {
          console.log(res.data[0].img);
          setTextLayers(res.data[0].layers)
          setFile(res.data[0].img)
        })
        .catch((err) => console.log(err));
    }
  }

  useEffect(() => {
    getAlreadyCreatedCertificate();
  }, []);

  function addLayer() {
    let layer = {
      id: Math.random(),
      name: "Text",
      val: "XXXXXX",
      fontFamily: "Poppins",
      fontWeight: "400",
      fontSize: "24",
      color: "#000000",
      opacity: "100",
    };
    setTextLayers([...textLayers, layer]);
  }
  function delLayer(id) {
    const newDelLayer = textLayers.filter((val) => val.id != id);
    setTextLayers(newDelLayer);
  }

  function handleLayerClick(id, val, color, fontWeight, fontSize, fontFamily) {
    console.log("single layer click");
    setSelectedText(id);
    setTextName(val);
    setTextColor(color);
    setFontWeight(fontWeight);
    setFontSize(fontSize);
    setFontFamily(fontFamily);
  }

  function handleEditPenClick(id, name) {
    setNameChange(name);
    setSelectedText(id);
    console.log("Edit click change", name);
    setNameChangeSelected(!nameChangeSelected);
  }

  function setChangeToNameFromInput() {
    const updatedTextNameLayers = textLayers.map((val) => {
      if (val.id == selectedText) {
        return {
          id: val.id,
          name: nameChange,
          val: val.val,
          fontFamily: val.fontFamily,
          fontWeight: val.fontWeight,
          color: val.color,
          opacity: val.opacity,
        };
      } else {
        return val;
      }
    });
    setNameChange("");
    setTextLayers(updatedTextNameLayers);
    setNameChangeSelected(!nameChangeSelected);
  }


  const uploadAssetImage = useCallback((img) => {
    setFile(img);
  }, []);

  function uploadImage(img) {
    setFile(URL.createObjectURL(img));
  }

  function changeAttributeValues(textRes) {
    setTextName(textRes);
    const updatedTextNameLayers = textLayers.map((val) => {
      if (val.id == selectedText) {
        return {
          id: val.id,
          name: val.name,
          val: textRes,
          fontFamily: val.fontFamily,
          fontWeight: val.fontWeight,
          fontSize: val.fontSize,
          color: val.color,
          opacity: val.opacity,
        };
      } else {
        return val;
      }
    });
    setTextLayers(updatedTextNameLayers);
  }

  function changeAttributeFontWeight(fontWeightRes) {
    setFontWeight(fontWeightRes);
    const updatedTextNameLayers = textLayers.map((val) => {
      if (val.id == selectedText) {
        return {
          id: val.id,
          name: val.name,
          val: val.val,
          fontFamily: val.fontFamily,
          fontWeight: fontWeightRes,
          fontSize: val.fontSize,
          color: val.color,
          opacity: val.opacity,
        };
      } else {
        return val;
      }
    });
    setTextLayers(updatedTextNameLayers);
  }

  function changeAttributeFontSize(fontSizeRes) {
    setFontSize(fontSizeRes);
    const updatedTextNameLayers = textLayers.map((val) => {
      if (val.id == selectedText) {
        return {
          id: val.id,
          name: val.name,
          val: val.val,
          fontFamily: val.fontFamily,
          fontWeight: val.fontWeight,
          fontSize: fontSizeRes,
          color: val.color,
          opacity: val.opacity,
        };
      } else {
        return val;
      }
    });
    setTextLayers(updatedTextNameLayers);
  }


  function changeAttributeFontFamily(fontFamilyRes) {
    setFontFamily(fontFamilyRes);
    const updatedTextNameLayers = textLayers.map((val) => {
      if (val.id == selectedText) {
        return {
          id: val.id,
          name: val.name,
          val: val.val,
          fontFamily: fontFamilyRes,
          fontWeight: val.fontWeight,
          fontSize: val.fontSize,
          color: val.color,
          opacity: val.opacity,
        };
      } else {
        return val;
      }
    });
    setTextLayers(updatedTextNameLayers);
  }

  // FILL --> COLOR

  function changeAttributeColor(colorRes) {
    setTextColor(colorRes);
    const updatedTextNameLayers = textLayers.map((val) => {
      if (val.id == selectedText) {
        return {
          id: val.id,
          name: val.name,
          val: val.val,
          fontFamily: val.fontFamily,
          fontWeight: val.fontWeight,
          fontSize: val.fontSize,
          color: colorRes,
          opacity: val.opacity,
        };
      } else {
        return val;
      }
    });
    setTextLayers(updatedTextNameLayers);
  }

  let newTextLayer = textLayers;

  // change attribute value for multiple exports
  function changeAttributeValuesForMulExports(textValue, key) {
    // setTextName(textValue);
    let modify = newTextLayer.map((val) => {
      if (val.name === key) {
        return {
          id: val.id,
          name: val.name,
          val: textValue,
          fontFamily: val.fontFamily,
          fontWeight: val.fontWeight,
          fontSize: val.fontSize,
          color: val.color,
          opacity: val.opacity,
        };
      } else {
        return val;
      }
    });
    console.log(modify);
    newTextLayer = modify;
    setTextLayers(modify);
    // console.log(updatedTextNameLayers);
  }

  return (
    <div className="h-screen w-screen flex overflow-hidden">
      {/* left side bar*/}
      <LeftSideBar
        // disablePointer={disablePointer}
        textLayers={textLayers}
        selectedText={selectedText}
        setSelectedText={setSelectedText}
        handleLayerClick={handleLayerClick}
        handleEditPenClick={handleEditPenClick}
        delLayer={delLayer}
        nameChangeSelected={nameChangeSelected}
        setNameChange={setNameChange}
        nameChange={nameChange}
        setChangeToNameFromInput={setChangeToNameFromInput}
        addLayer={addLayer}
        setTextName={setTextName}
        setTextColor={setTextColor}
        setFontWeight={setFontWeight}
        setFontSize={setFontSize}
        setFontFamily={setFontFamily}
        uploadAssetImage={uploadAssetImage}
      />
      {/* center -certficate */}
      <div className="bg-bgGrey h-screen w-[58%] relative flex items-center justify-center">
        <div
          className="bg-transparent flex items-center justify-center w-full"
          ref={printCertificateRef}
        >
          {textLayers.map((val) => (
            <Draggable key={val.id}
            disabled="true">
              <div
                style={{
                  border: selectedText == val.id ? "2px solid #7aff95" : "",
                  padding: "4px",
                  cursor: "pointer",
                  position: "absolute",
                }}
                onClick={() =>
                  handleLayerClick(
                    val.id,
                    val.val,
                    val.color,
                    val.fontWeight,
                    val.fontSize,
                    val.fontFamily
                  )
                }
              >
                <h1
                  style={{
                    color: val.color,
                    fontWeight: val.fontWeight,
                    fontSize: val.fontSize + "px",
                    fontFamily: val.fontFamily,
                  }}
                >
                  {val.val}
                </h1>
              </div>
            </Draggable>
          ))}
          <img
            src={file}
            className=" w-[95%]"
            onClick={() => handleLayerClick()}
          />
        </div>
      </div>
      {/* right side tools */}
      <RightSideBar
        alreadyUploadedImg={file}
        upload={uploadImage}
        textLayers={textLayers}
        changeAttributeValues={changeAttributeValues}
        textName={textName}
        changeAttributeColor={changeAttributeColor}
        textColor={textColor}
        selectedText={selectedText}
        changeAttributeFontWeight={changeAttributeFontWeight}
        fontWeight={fontWeight}
        changeAttributeFontSize={changeAttributeFontSize}
        fontSize={fontSize}
        changeAttributeFontFamily={changeAttributeFontFamily}
        fontFamily={fontFamily}
        printCertificateRef={printCertificateRef}
        changeAttributeValuesForMulExports={changeAttributeValuesForMulExports}
      />
    </div>
  );
}

export default CertificatePage;


