import React from "react";
import PropTypes from "prop-types";
import Head from "next/head";
import Script from "next/script";

// mui
import { CacheProvider } from "@emotion/react";
import { ThemeProvider, CssBaseline } from "@mui/material";
import createEmotionCache from "../src/utility/createEmotionCache";
import lightTheme from "../src/theme/lightTheme";

// styles
import "../styles/globals.css";
import "../styles/modal.css";
import "@docsearch/css";

// layout
import HomeLayout from "../src/layouts/HomeLayout";

import Favicon from "../public/favicon/favicon.ico";
import Logo192 from "../public/favicon/android-chrome-192x192.png";
import manifest from "../public/favicon/manifest.json";

import siteMetadata from "@/data/siteMetadata";

const clientSideEmotionCache = createEmotionCache();

const MyApp = (props) => {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;

  // Use the layout defined at the page level, if available
  const getLayout =
    Component.getLayout || ((page) => <HomeLayout>{page}</HomeLayout>);

  return getLayout(
    <CacheProvider value={emotionCache}>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
        <meta charSet="utf-8" />
        <link rel="icon" href={`${Favicon.src}`} />
        <meta name="theme-color" content="#000000" />
        <link rel="apple-touch-icon" href={`${Logo192.src}`} />
        <link rel="manifest" href={`${manifest}`} />

        {/* humans.txt */}
        <link
          type="text/plain"
          rel="author"
          href="https://codinasion.vercel.app/api/humans"
        />

        {/* google search console */}
        <meta
          name="google-site-verification"
          content="wr3N4Xm0kNCjUxLjZ4d4WoNlf496m66dWJ16N2z3Ekw"
        />

        {/* algolia doc search */}
        <link
          rel="preconnect"
          href={`https://${process.env.NEXT_PUBLIC_ALGOLIA_APP_ID}-dsn.algolia.net`}
          // eslint-disable-next-line react/no-unknown-property
          crossOrigin="true"
        />

        {/* twitter card meta tags */}
        <meta
          key="twitter-title"
          name="twitter:title"
          content={`${siteMetadata.title}`}
        />
        <meta
          key="twitter-description"
          name="twitter:description"
          content={`${siteMetadata.description}`}
        />
        <meta key="twitter-site" name="twitter:site" content="@codinasion" />
        <meta
          key="twitter-card"
          name="twitter:card"
          content="summary_large_image"
        />
        <meta
          key="twitter-image-src"
          name="twitter:image:src"
          content={
            typeof window !== "undefined"
              ? `https://codinasion-og.vercel.app/api?url=${window.location.href}`
              : "https://codinasion-og.vercel.app/api?url=default-og"
          }
        />
        {/* og card meta tags */}
        <meta
          key="og-title"
          property="og:title"
          content={`${siteMetadata.title}`}
        />
        <meta
          key="og-description"
          property="og:description"
          content={`${siteMetadata.description}`}
        />
        <meta
          key="og-url"
          property="og:url"
          content={`${siteMetadata.siteUrl}`}
        />
        <meta key="og-site-name" property="og:site_name" content="Codinasion" />
        <meta key="og-type" property="og:type" content="website" />
        <meta
          key="og-image"
          property="og:image"
          content={
            typeof window !== "undefined"
              ? `https://codinasion-og.vercel.app/api?url=${window.location.href}`
              : "https://codinasion-og.vercel.app/api?url=default-og"
          }
        />
        <meta
          key="og-image-alt"
          property="og:image:alt"
          content={`${siteMetadata.title}`}
        />

        {/* title */}
        <title key="title">{`${siteMetadata.title}`}</title>
        <meta
          key="description"
          name="description"
          content={`${siteMetadata.description}`}
        />
      </Head>
      {/* google analytics */}
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=G-X1PJY1SDDM"
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-X1PJY1SDDM');
        `}
      </Script>
      <ThemeProvider theme={lightTheme}>
        <CssBaseline />
        {/* <HomeLayout> */}
        <Component {...pageProps} />
        {/* </HomeLayout> */}
      </ThemeProvider>
    </CacheProvider>
  );
};

export default MyApp;

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  emotionCache: PropTypes.object,
  pageProps: PropTypes.object.isRequired,
};
