import {tamil} from "./components/basic/Fonts";
import "./globals.css";
import Header from "./components/basic/Header";
import Footer from "./components/basic/Footer";



export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${tamil.className}`}
      >
        <Header/>
        {children}
        <Footer/>
      </body>
    </html>
  );
}
