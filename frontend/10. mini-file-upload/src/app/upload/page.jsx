export default function UploadPage() {
  return (
    <div>
      <h1>Upload Image</h1>

      <form
        action="/api/upload"
        method="POST"
        encType="multipart/form-data"
      >
        <input type="file" name="file" />
        <br /><br />
        <button type="submit">Upload</button>
      </form>
    </div>
  );
}
