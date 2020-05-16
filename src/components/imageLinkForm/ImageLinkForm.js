import React from 'react';
import './imageLinkForm.css'

const ImageLinkForm = ({ onInputChange, onButtonSubmit }) => {
  return (
    <div className="center">
      <div className="form center mt3 br3 shadow-5 w-50">
        <input type="text" className="f4 pa2 w-70 center" placeholder="paste an image url" onChange={onInputChange} />
        <button className="w-30 dim f4 link ph3 pv2 dib white bg-gray"
        onClick={onButtonSubmit}>Detect</button>
      </div>
    </div>
  );
}

export default ImageLinkForm;