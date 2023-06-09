import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import "./photos.css"; // Import the CSS file

function Photos() {
  const params = useParams();
  const [photosList, setPhotosList] = useState([]);
  const [counter, setCounter] = useState(0);

  const fetchPhotos = async () => {
    try {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/photos?albumId=${params.albumId}&_limit=10&_start=${counter}`
      );
      const data = await response.json();
      setPhotosList((prev) => [...prev, ...data]);
    } catch (error) {
      console.log("Error fetching albums:", error);
    }
  };

  useEffect(() => {
    if (params.id) {
      fetchPhotos();
    }
  }, [counter]);

  const loadMore = () => {
    setCounter((prev) => prev + 10);
    console.log("load more");
  };

  return (
    <>
      <h1>Photos</h1>
      <div className="photos-container">
        {photosList.length > 0 ? (
          <div className="photo-grid">
            {photosList.map((photo) => (
              <div key={photo.id}>
                <img
                  src={photo.thumbnailUrl}
                  alt={photo.title}
                  key={photo.id}
                />
              </div>
            ))}
          </div>
        ) : (
          <p>No photos found for the album.</p>
        )}
      </div>
      <button onClick={loadMore}>Load more</button>
    </>
  );
}

export default Photos;
