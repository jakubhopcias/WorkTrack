import { Geist } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { UserProvider } from "./UserContext";
import Header from "@/components/Header/Header";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const themeBoot = `try{var t=localStorage.getItem("theme");if(t!=="light"&&t!=="dark"){t=matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light"}document.documentElement.setAttribute("data-theme",t)}catch(e){}`;

export const metadata = {
  title: "WorkTrack",
  description: "Stworzone przez Jakuba Hopciaś",
};

export default function RootLayout({ children }) {
  return (
    <html lang="pl" className={geistSans.variable} suppressHydrationWarning>
      <body className="antialiased">
        <Script id="theme-boot" strategy="beforeInteractive">
          {themeBoot}
        </Script>
        <UserProvider>
          <Header />
          <main>{children}</main>
        </UserProvider>
      </body>
    </html>
  );
}
