import { login } from "../../actions/auth";
import Link from "next/link";

export default function loginpage() {
  return (
    <div>
      <form action={login}>
        <h2> Login </h2>
        <input type="email" name="email" placeholder="Email" /> <br /> <br />{" "}
        <br /> <br />
        <button> Login </button>
      </form>

      <p>
        dont u have an account?
        <Link href="/signup"> SignUp </Link>{" "}
      </p>
    </div>
  );
}
