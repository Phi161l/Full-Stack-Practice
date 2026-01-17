import { signUp } from "../../actions/auth";
import Link from "next/link";

export default function SignupPage() {
  return (
    <div>
      {" "}
      <form action={signUp}>
        <h2> SignUp </h2>

        <input type="text" name="username" placeholder="Username" />
        <br /> <br />
        <input type="email" name="email" placeholder="Email" />
        <br /> <br />
        
        <button> Sign Up </button>
      </form>
      <p>
        do you have an account? 
        <Link href="/login"> Login </Link>{" "}
      </p>
    </div>
  );
}
