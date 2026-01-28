"use client"


export default function LogoutButton() {
     
  async function handlelogout() {
    await fetch("/api/logout", { method: "POST" });
  }

  return (
      <button onClick={handlelogout}> logout </button>
  )
}
