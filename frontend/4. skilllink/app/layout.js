import "./globals.css";
import Navbar from "./components/Navbar";

export const metadata = {
  title: "SkillLink",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <div style={{ padding: "20px" }}>
          {children}
        </div>
      </body>
    </html>
  );
}
