import Header from "./components/Header/Header";
import "./globals.css";
import Footer from "./components/Footer/Footer";

import Head from "next/head";
import { Providers } from "./providers";
export const metadata = {
  title: "Plus Exchange",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <body>
        <Providers>
          <div className="container">
            <Header />
            {children}
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  );
}
