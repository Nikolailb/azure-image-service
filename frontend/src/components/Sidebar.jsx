/* eslint-disable react/prop-types */
function Sidebar({
  message,
  handleFileChange,
  handleUpload,
  images,
  getImage,
}) {
  return (
    <aside className="menu">
      {message ?? <div className="box">{message}</div>}
      <div className="box">
        <input
          type="file"
          accept="image/png, image/jpeg"
          onChange={handleFileChange}
        />
        <button onClick={handleUpload}>Upload</button>
      </div>
      {images && (
        <div className="box">
          <h4>Images</h4>
          <ul className="image-list">
            {images.map((image) => (
              <li key={image}>
                <a href="#" onClick={() => getImage(image)}>
                  {image}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </aside>
  );
}

export default Sidebar;
