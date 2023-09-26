import React from "react";
import './FaceRecogintion.css';

const FaceRecognition = ({ imageUrl, boxs }) => {
    const makeBox = (boxs) => {
        const boxArray = boxs.map((box, i) => {
            return (
                <div key={i} 
                     className="bounding-box" 
                     style={{top: box.topRow, 
                             right: box.rightCol, 
                             bottom: box.bottomRow,
                             left: box.leftCol}}
                ></div>
            );
        });

        return boxArray;
    }

    return(
        <div className="center ma">
            <div className="absolute mt2">
                <img id="inputimage" alt="" src={imageUrl} width='500px' height='auto' />
                <div>{makeBox(boxs)}</div>{/* 関数呼び出し */}
            </div>
        </div>
    );
}

export default FaceRecognition;