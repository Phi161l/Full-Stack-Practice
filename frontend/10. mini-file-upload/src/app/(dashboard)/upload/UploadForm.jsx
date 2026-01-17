"use client";

import { useState, useEffect } from "react";

export default function UploadForm() {
  const [preview, setPreview] = useState(null);
  const [files, setFiles] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [deleting, setDeleting] = useState(null);

  async function fetchFiles() {
    const res = await fetch("/api/list-uploads");
    const data = await res.json();

    setFiles(data.files);
  }

  useEffect(() => {
    fetchFiles();
  }, []);

  function handleFileChange(e) {
    const file = e.target.files[0];
    if (!file) return;

    const imageUrl = URL.createObjectURL(file);
    setPreview(imageUrl);
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (uploading) return;

    setUploading(true);

    const formData = new FormData(e.target);

    const res = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();

    alert(`File uploaded: ${data.url}`);

    fetchFiles();

    if (preview) URL.revokeObjectURL(preview);
    setPreview(null);

    e.target.reset();

    setUploading(false);
  }

  async function deleteUpload(file) {
    setDeleting(file.id)

    await fetch("/api/delete-upload", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(file),
    });

    setDeleting(null)

    fetchFiles();
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

        <button type="submit" disabled={uploading}>
          {uploading ? "uploading" : "upload "}
        </button>
      </form>
      <br /> <br /> <br />
      <div>
        {files.length === 0 && <p> No uploads yet </p>}

        <div style={{ display: "flex", gap: "16px" }}>
          {files.map((file) => (
            <div key={file.id} style={{ marginRight: 8 }}>
              <img src={file.url} width={150} /> <br />
              <button onClick={() => deleteUpload(file)} disabled={deleting === file.id}>
                {deleting == file.id ? "Deleting...": "Delete"}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
