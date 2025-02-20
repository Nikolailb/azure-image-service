import { useState } from "react";
import "./App.css";
import Sidebar from "./components/Sidebar";
import Main from "./components/Main";

export const defaultImage = "https://placehold.co/600x400";

function App() {
  const [image, setImage] = useState(defaultImage);

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
