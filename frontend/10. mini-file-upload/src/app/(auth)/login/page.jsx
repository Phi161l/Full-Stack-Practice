import { login } from "../../actions/auth";

export default function logipage() {
  return(
    <form action={login}>
      <h2> Login </h2>

      <input type="email" name="email" placeholder="Email" />  <br /> <br /> <br /> <br />
      <button> Login </button>
    </form>
  )
}
