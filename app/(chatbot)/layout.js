import "../globals.css";

export const metadata = {
  title: "VaxPro",
  description: "Vaccination platform for promotion and sensitization",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`font-monte`}>{children}</body>
    </html>
  );
}
