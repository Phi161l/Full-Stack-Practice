"use client";

import { useState} from "react";

export default function UploadForm({onUpload}) {
  const [preview, setPreview] = useState(null);

  function handleFileChange(e) {
    const file = e.target.files[0];
    if (!file) return;

    const imageUrl = URL.createObjectURL(file);
    setPreview(imageUrl);
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const formData = new FormData(e.target);

    const res = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();

    alert(`File uploaded: ${data.filename}`);

    if (onUpload) onUpload(); // notify parent to refresh


    if (preview) URL.revokeObjectURL(preview);
    setPreview(null);

    e.target.reset();
  }

  return (
    <div>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <input
          type="file"
          name="file"
          accept="image/*"
          onChange={handleFileChange}
        />
        <br />
        <br />

        {preview && <img src={preview} alt="preview" width={200} />}

        <br />
        <br />

        <button type="submit">Upload</button>
      </form>

    </div>
  );
}
