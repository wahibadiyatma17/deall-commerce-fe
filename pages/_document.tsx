import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link rel="icon" type="image/png" sizes="32x32" href="/dealls.svg" />
        <link rel="icon" type="image/png" sizes="16x16" href="/dealls.svg" />
        <link rel="mask-icon" href="/referral/favicon/safari-pinned-tab.svg" color="#5bbad5" />
        <meta name="apple-mobile-web-app-title" content="Dealls" />
        <meta name="application-name" content="Dealls" />
        <meta name="msapplication-TileColor" content="#2b5797" />
        <meta name="theme-color" content="#f1f3f6" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
