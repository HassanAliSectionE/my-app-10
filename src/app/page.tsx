"use client";
import { useState, useEffect } from "react";

function FetchImage() {
  const [imageUrl, setImageUrl] = useState("");
  const [intervalid, setIntervalId] = useState<NodeJS.Timeout | number | null>(null);

  useEffect(() => {
    const fetchImage = () => {
      fetch("https://picsum.photos/200/300")
        .then((response) => setImageUrl(response.url))
        .catch((error) => console.error("Error fetching image:", error));
    };

    fetchImage();
    const id = setInterval(fetchImage, 1000);
    setIntervalId(id);

    return () => clearInterval(id); // Cleanup
  }, []);

  const stoptimer = () => {
    if (intervalid !== null) {
      clearInterval(intervalid);
      setIntervalId(null);
    }
  };

  return (
    <div>
      <h2>Random Image from Picsum</h2>
      {imageUrl ? <img src={imageUrl} alt="Random" /> : <p>Loading...</p>}
      <button onClick={stoptimer} disabled={intervalid === null}>
        Stop timer
      </button>
    </div>
  );
}

export default FetchImage;
