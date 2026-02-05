import Header from "@/src/components/Header";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Header />
        <main style={{ padding: "20px" }}>
          {children}
        </main>
      </body>
    </html>
  );
}
