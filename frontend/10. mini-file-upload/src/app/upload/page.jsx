"use client";

import { useState } from "react";
import UploadForm from "./UploadForm";
import UploadedImages from "./uploadImages";

export default function uploadPage() {
  const [refresh, setRefresh] = useState(0);

  return (
    <>
      <h1>Upload Image</h1>
      <UploadForm onUpload={() => setRefresh((r) => r + 1)} />

      <h2> Upoaded Images </h2>
      <UploadedImages refresh={refresh} />
    </>
  );
}
