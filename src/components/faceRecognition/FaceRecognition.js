import React from 'react';
import './faceRecognition.css'

const FaceRecognition = ({ imageUrl, boxes }) => {
  return (
    <div className="center mb3" style={{height: '350px'}}>
      <div className="absolute">
        <img id="inputImage" src={imageUrl} alt="img" width="auto" height="350px"/>
        {boxes.map((box,key) => (
          <div className="bounding-box" style={{left: box.leftCol, top: box.topRow, right: box.rightCol, bottom: box.bottomRow}}></div>
        ))}
      </div> 
    </div>
  );
}

export default FaceRecognition;