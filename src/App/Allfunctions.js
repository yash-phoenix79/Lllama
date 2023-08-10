import Assets from "./Assets";
import React, { useState } from "react";

const random = (imgData, Assets) => {
  const firstDir = Object.keys(Assets);
  var randomDict = {};
  for (var i = 0; i <= firstDir.length - 1; i++) {
    const secondDir = Object.keys(Assets[firstDir[i]]);
    const addAt = Math.floor(Math.random() * secondDir.length);
    for (var j = 0; j <= secondDir.length - 1; j++) {
      if (j == addAt) {
        randomDict[firstDir[i]] = Assets[firstDir[i]][secondDir[j]];
        break;
      }
    }
  }
};

const downloadImg = () => {
  const alpacaArtEl = document.querySelector(".alpacaArt");
  import("save-html-as-image").then((method) => {
    method.saveAsPng(alpacaArtEl, { filename: "my art.png", printDate: false });
  });
};

const customizeImg = (states) => (event) => {
  const location = event.target.value;
  const customise = event.target.className;

  console.log("CustomizeImg Called");
  console.log("Location:", location);
  console.log("Customise:", customise);

  const setStateFunction = states[customise][1];
  getImage(location, setStateFunction);
};

const getImage = (location, setImageData) => {
  const sliced = location.split("/");

  console.log("GetImage Called");
  console.log("Location:", location);
  console.log(setImageData);

  import(`../Assets/${sliced[2]}/${sliced[3]}`).then((img) => {
    setImageData(img.default);
  });
};

const ImageMaker = ({ imgData }) => {
  return (
    <>
      <div className="alpacaArt">
        {Object.keys(imgData).map((image) => {
          return (
            <img
              src={imgData[image][0]}
              key={image}
              alt={image}
              style={{ position: "absolute" }}
            />
          );
        })}
      </div>
    </>
  );
};

const changeRightBottom = (set, id) => (event) => {
  set(event.target[id]);
  const activeEl = document.getElementsByClassName("active")[0];
  activeEl && activeEl.classList.remove("active");
  document.getElementById(event.target.id).classList.add("active");
};

const Btnmaker = (props) => {
  return (
    <>
      {Object.keys(props.location).map((key) => (
        <>
          {}
          <button
            onClick={props.func}
            id={key}
            value={props.location[key]}
            className={props.giveClass && props.location[key].split("/")[2]}
          >
            {key.toUpperCase()}
          </button>
        </>
      ))}
    </>
  );
};

export {
  Btnmaker,
  changeRightBottom,
  ImageMaker,
  customizeImg,
  downloadImg,
  random,
  getImage,
};
