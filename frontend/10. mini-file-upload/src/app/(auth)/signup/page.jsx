import { signUp } from "../../actions/auth";

export default function SignupPage() {
  return (
    <form action={signUp}>
      <h2> SignUp </h2>
      <input type="text" name="username" placeholder="Username" />
      <br /> <br />
      <input type="email" name="email" placeholder="Email" />  

      <br /> <br />

      <button> Sign Up </button>
    </form>
  );
}
