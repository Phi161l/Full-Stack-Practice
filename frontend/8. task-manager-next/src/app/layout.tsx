import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Task Manager",
  description: "A simple Next.js app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
