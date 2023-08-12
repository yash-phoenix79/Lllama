import React, { useState } from "react";
import Assets from "./Assets";

import {
  Btnmaker,
  changeRightBottom,
  ImageMaker,
  customizeImg,
  downloadImg,
  getImage,
} from "./Allfunctions";

//Default images

import backgroundImg from "../Assets/backgrounds/blue50.png";
import accessoriesImg from "../Assets/accessories/headphone.png";
import earsImg from "../Assets/ears/default.png";
import eyesImg from "../Assets/eyes/default.png";
import mouthImg from "../Assets/eyes/default.png";
import hairImg from "../Assets/hair/default.png";
import neckImg from "../Assets/neck/default.png";
import noseImg from "../Assets/nose/nose.png";
import legImg from "../Assets/leg/default.png";

function App() {
  const [selection, setSelection] = useState("backgrounds");

  const imgData = {
    backgrounds: useState(backgroundImg),
    neck: useState(neckImg),
    ears: useState(earsImg),
    hair: useState(hairImg),
    leg: useState(legImg),
    nose: useState(noseImg),
    accessories: useState(accessoriesImg),
    mouth: useState(mouthImg),
    eyes: useState(eyesImg),
  };

  var run = 0;
  const random = (states, Assets) => {
    const firstDir = Object.keys(Assets);
    var randomDict = {};
    for (var i = 0; i <= firstDir.length - 1; i++) {
      const secondDir = Object.keys(Assets?.[firstDir[i]]);
      const addAt = Math.floor(Math.random() * secondDir.length);
      const secondDirLen = secondDir.length;
      for (var j = 0; j <= secondDirLen - 1; j++) {
        console.log(secondDirLen, j, "len");

        console.log(Assets[firstDir[i]][secondDir[j]]);
        if (j == addAt) {
          randomDict[firstDir[i]] = Assets[firstDir[i]][secondDir[j]];
          break;
        }
      }
    }

    Object.keys(randomDict).map((item) => {
      getImage(randomDict[item], states[item][1]);
    });

    // setTimeout(() => {
    //   if (run < 3) {
    //     random(states, Assets);
    //     run++;
    //   }
    // }, 300);
  };
  return (
    <>
      <div className="wrap">
        <h1>Character Customisation</h1>
        <div className="alpaca">
          <div className="left">
            <div className="alpacaArt">
              <ImageMaker imgData={imgData} />
            </div>
            <div className="actions">
              <button onClick={() => downloadImg()}>Download</button>
              <button onClick={() => random(imgData, Assets)}>Random</button>
            </div>
          </div>
          <div className="right">
            <div className="right-top">
              <h3> Accessories the Alpaca</h3>
              <Btnmaker
                location={Assets}
                func={changeRightBottom(setSelection, "id")}
              />
            </div>
            <div className="right-bottom">
              <h3> Styles </h3>
              <Btnmaker
                location={Assets[selection]}
                giveClass={true}
                func={customizeImg(imgData)}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
