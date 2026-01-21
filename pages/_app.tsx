import { SessionProvider } from "next-auth/react";
import type { AppProps } from 'next/app';
import Head from 'next/head';

// نوٹ: globals.css کی لائن یہاں سے حذف کر دی گئی ہے تاکہ ڈیزائن انڈیکس فائل سے لوڈ ہو سکے۔

export default function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <SessionProvider session={session}>
      <Head>
        {/* ٹیل ونڈ سی ایس ایس کو براہِ راست لوڈ کرنا تاکہ ڈیزائن برقرار رہے */}
        <script src="https://cdn.tailwindcss.com"></script>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0"/>
      </Head>
      <Component {...pageProps} />
    </SessionProvider>
  );
}
