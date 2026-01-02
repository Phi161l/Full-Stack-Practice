"use client"
import { useEffect, useState  } from "react";

export default function UploadedImages({refresh}) {

  const [files, setFiles] = useState([]);

  useEffect(() => {
    async function fetchFiles() {
      const res = await fetch("/api/list-uploads");
      const data = await res.json();

      setFiles(data.files);
    }

    fetchFiles();
  }, [refresh])


  if (files.length === 0) {
    return <p>No uploads yet</p>;
  }

  return (
    <div>
      {files.map((file) => (
        <img
          key={file}
          src={`/uploads/${file}`}
          width={150}
          style={{ margin: 8 }}
        />
      ))}
    </div>
  );
}



