import React, { useState, useEffect } from "react";
import logo from "../Images/logo.png";
import Liner from "../Images/Group_481923.png";
import sun from "../Images/radiant-glow.png";
import bonkbg from "./bonkbg.png";

function Main(props) {
  const [url, setUrl] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [underProcess, setUnderProcess] = useState(false);

  const APIKEY = "eJDHxSPeZ9PbnpMwwREBXnRT";

  useEffect(() => {
    if (selectedImage) {
      setImageUrl(URL.createObjectURL(selectedImage));
    }
  }, [selectedImage]);

  function handleClick() {
    setUnderProcess(true);
    const img = document.getElementById("filepicker").files[0];
    const formData = new FormData();
    formData.append("image_file", img);
    formData.append("size", "auto");
    fetch("https://api.remove.bg/v1.0/removebg", {
      method: "POST",
      headers: {
        "X-Api-Key": APIKEY,
      },
      body: formData,
    })
      .then(function (response) {
        return response.blob();
      })
      .then(function (finalResponse) {
        console.log(finalResponse); //finalResponse is a blob
        setUrl(URL.createObjectURL(finalResponse));
        setUnderProcess(false);
      })
      .catch((error) => {
        console.error("Error:", error);
        setUnderProcess(false);
      });
    console.log("clicked");
  }

  function handleDownload() {
    if (!url) return;

    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const img = new Image();
    img.onload = function () {
      canvas.width = img.width;
      canvas.height = img.height;

      // Create a new image object for the background image
      const bgImg = new Image();
      bgImg.src = bonkbg;
      bgImg.onload = function () {
        // Once the background image is loaded, draw it on the canvas
        ctx.drawImage(bgImg, 0, 0, canvas.width, canvas.height);

        // Draw image over the background
        ctx.drawImage(img, 0, 0);

        // Convert canvas to data URL
        const dataURL = canvas.toDataURL("image/png");

        // Create download link
        const link = document.createElement("a");
        link.href = dataURL;
        link.download = "bonkified.png";

        // Trigger download
        link.click();
      };
    };
    img.src = url;
  }

  return (
    <div className="container">
      {/*      <div className="container-head">
                <img src={Liner} alt="Divider" style={{ height: '10px', width: '1000px' }} /> 
                    <h1>⠀⠀Radiate your PFP⠀⠀</h1>                    
                <img src={Liner} alt="Divider" style={{ height: '10px', width: '1000px' }} /> 
    </div> */}
      <div className="row m-4 content">
        <div className="col-md-6 mt-4" style={{ marginRight: "0" }}>
          {selectedImage && (
            <div className="image-container">
              <img
                src={imageUrl}
                className="imageStyle mx-auto"
                alt="preview"
              />
            </div>
          )}
          {!selectedImage && <div className="image-space"></div>}
          <div className="m-4">
            <input
              className="form-control form-control"
              id="filepicker"
              type="file"
              onChange={(e) => setSelectedImage(e.target.files[0])}
              accept=".png, .jpg, .jpeg"
            />
            {selectedImage && (
              <button
                type="button"
                className="btn btn-primary mx-auto mt-4"
                style={{ display: "block" }}
                onClick={handleClick}
              >
                RADIATE{" "}
                <img
                  src={sun}
                  alt="sun"
                  style={{ height: "20px", width: "20px" }}
                />
              </button>
            )}
            {!selectedImage && (
              <button
                type="button"
                className="btn btn-primary mx-auto mt-4"
                style={{ display: "block" }}
                disabled
              >
                Upload Image
              </button>
            )}
          </div>
        </div>
        <div className="col-md-6 mt-4" style={{ marginLeft: "0" }}>
          {underProcess && (
            <div className="progress">
              <div
                className="progress-bar progress-bar-striped progress-bar-animated"
                role="progressbar"
                aria-valuenow="100"
                aria-valuemin="0"
                aria-valuemax="100"
                style={{ width: "100%" }}
              ></div>
            </div>
          )}
          {url && (
            <div
              className="image-container"
              style={{ backgroundImage: `url(${bonkbg})` }}
            >
              <img src={url} className="imageStyle mx-auto" alt="preview" />
            </div>
          )}
          {!url && <div className="image-space"></div>}
          {url && (
            <button
              type="button"
              className="btn btn-primary mx-auto mt-4"
              style={{ display: "block" }}
              onClick={handleDownload}
            >
              Download
            </button>
          )}
          {!url && (
            <button
              type="button"
              className="btn btn-primary mx-auto mt-4"
              style={{ display: "block" }}
              disabled
            >
              Download
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default Main;
