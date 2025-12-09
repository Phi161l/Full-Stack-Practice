import styles from  "./home.module.css"

export default function Home() {
  return (
    <div className={styles.container}>
      <h1>Home Page</h1>
      <p><a href="/signup">Signup</a> | <a href="/login">Login</a></p>
    </div>
  );
}


