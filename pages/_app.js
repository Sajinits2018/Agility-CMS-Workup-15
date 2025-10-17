// pages/_app.js
import "@/styles/globals.css";
import Head from "next/head";
import Script from "next/script";

export default function App({ Component, pageProps }) {
  return (
    <>
      {/* Meta & fonts */}
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </Head>

      {/* Load Workup starter JS files */}
      <Script
        src="/assets/workup-starter/assets/js/jquery-3.3.1.min.js"
        strategy="beforeInteractive"
      />
      <Script
        src="/assets/workup-starter/assets/js/bootstrap.min.js"
        strategy="afterInteractive"
      />
      <Script
        src="/assets/workup-starter/assets/js/theme-change.js"
        strategy="afterInteractive"
      />

      {/* Render the active page */}
      <Component {...pageProps} />
    </>
  );
}
