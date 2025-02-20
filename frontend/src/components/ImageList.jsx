/* eslint-disable react/prop-types */
function ImageList({ images, getImage }) {
  return (
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
  );
}

export default ImageList;
