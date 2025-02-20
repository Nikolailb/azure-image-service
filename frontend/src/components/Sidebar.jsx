import { useEffect, useState } from "react";
import UploadImage from "./UploadImage";
import ImageList from "./ImageList";
import { ApiUrl, DefaultImage } from "../const";

/* eslint-disable react/prop-types */
function Sidebar({ image, setImage }) {
  const [message, setMessage] = useState("");
  const [images, setImages] = useState([]);

  const getImages = () => {
    fetch(ApiUrl + "/images")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch images");
        }
        return response.json();
      })
      .then((data) => {
        setImages(data);
        if (data.length > 0 && image === DefaultImage) {
          getImage(data[0]);
        }
      })
      .catch((error) => {
        setMessage("Error fetching images", error);
      });
  };

  const getImage = (img) => {
    console.log(img);
    fetch(ApiUrl + "/images/" + img)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch images");
        }
        return response.blob();
      })
      .then((blob) => {
        const imageUrl = URL.createObjectURL(blob);
        setImage(imageUrl);
      })
      .catch((error) => {
        setMessage("Error fetching image", error);
        console.error(error);
      });
  };

  useEffect(() => {
    getImages();
  }, []);

  return (
    <aside className="menu">
      {message ?? <div className="box">{message}</div>}
      <UploadImage setMessage={setMessage} getImages={getImages} />
      {images && <ImageList images={images} getImage={getImage} />}
    </aside>
  );
}

export default Sidebar;
