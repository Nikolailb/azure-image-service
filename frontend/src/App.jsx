import { useState } from "react";
import "./App.css";
import Sidebar from "./components/Sidebar";
import Main from "./components/Main";
import { DefaultImage } from "./const";

function App() {
  const [image, setImage] = useState(DefaultImage);

  return (
    <>
      <div className="container">
        <Sidebar image={image} setImage={setImage} />
        <Main image={image} />
      </div>
    </>
  );
}

export default App;
