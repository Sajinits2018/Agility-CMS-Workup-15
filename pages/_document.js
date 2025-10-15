// pages/_document.js
import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        {/* Workup template CSS (served from /public) */}
        <link
          rel="stylesheet"
          href="/assets/workup-starter/assets/css/style-starter.css"
        />
        {/* (Optional) If your template needs Bootstrap/JS, load them with <Script> in _app.js */}
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
