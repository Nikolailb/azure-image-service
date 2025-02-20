import { useEffect, useState } from "react";
import "./App.css";
import Sidebar from "./components/Sidebar";
import Main from "./components/Main";

const defaultImage = "https://placehold.co/600x400";

function App() {
  const [image, setImage] = useState(defaultImage);
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");
  const [images, setImages] = useState([]);

  const getImages = () => {
    fetch("http://localhost:5500/images")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch images");
        }
        return response.json();
      })
      .then((data) => {
        setImages(data);
        if (data.length > 0 && image === defaultImage) {
          getImage(data[0]);
        }
      })
      .catch((error) => {
        setMessage("Error fetching images", error);
      });
  };

  const getImage = (img) => {
    console.log(img);
    fetch("http://localhost:5500/images/" + img)
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

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (!selectedFile) return;

    const allowedTypes = ["image/png", "image/jpeg"];

    if (!allowedTypes.includes(selectedFile.type)) {
      alert("Invalid file type. Only PNG and JPEG are allowed.");
      setFile(null);
      return;
    }

    setFile(selectedFile);
  };

  const handleUpload = () => {
    if (!file) {
      setMessage("Please select a file first.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    fetch("http://localhost:5500/images", {
      method: "POST",
      body: formData,
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Upload failed");
        }
        return response.json();
      })
      .then((data) => {
        setMessage(`Success: ${data.message}`);
        getImages();
      })
      .catch((error) => {
        setMessage("Error uploading file", error);
      });
  };

  useEffect(() => {
    getImages();
  }, []);

  return (
    <>
      <div className="container">
        <Sidebar
          message={message}
          handleFileChange={handleFileChange}
          handleUpload={handleUpload}
          images={images}
          getImage={getImage}
        />
        <Main image={image} />
      </div>
    </>
  );
}

export default App;
