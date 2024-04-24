
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import Main from "@/components/Main";


const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "VaxPro",
  description: "Vaccination platform for promotion and sensitization",
};

export default function RootLayout({ children }) {
  
  
  
  return (
    <html lang="en">
      <body className={`${inter.className} w-screen max-h-screen`}>
       {/* <Main></Main> */}
        <Sidebar />
       <Main children={children} />
        <footer></footer>
        </body>
    </html>
  );
}
