import { logOut } from "../actions/auth";
import UploadForm from "./UploadForm";

export default function uploadPage() {
  return (
    <>
      <h1>Upload Image</h1>
      <UploadForm />

      <br /><br /><br /><br /><br /><br /><br />
      <form action={logOut}>
        <button> logOut</button>
      </form>
    </>
  );
}
