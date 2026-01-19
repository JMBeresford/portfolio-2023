import dynamic from "next/dynamic";
import { Suspense, useEffect, useRef, useState } from "react";
import { Header } from "@/config";
import { Layout } from "@/components/dom/Layout";
import "@/styles/globals.scss";
import { Leva } from "leva";
import { Loading } from "@/components/dom/Loading";
import { useRouter } from "next/router";
import { Montserrat } from "next/font/google";
import { SpeedInsights } from "@vercel/speed-insights/next";
import * as ga from "@/utils/ga";

const Scene = dynamic(() => import("@/components/canvas/Scene"), { ssr: false });

const montserrat = Montserrat({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-montserrat-variable",
  subsets: ["latin", "latin-ext"],
  preload: true,
  display: "swap",
});

export default function App({ Component, pageProps = { title: "index" } }) {
  const ref = useRef();
  const router = useRouter();
  const [showLeva, setShowLeva] = useState<boolean>(false);

  useEffect(() => {
    if (window?.location.hash.includes("debug")) {
      setShowLeva(true);
    }
  }, []);

  useEffect(() => {
    if (process.env.NODE_ENV !== "production") return;

    router.events.on("routeChangeComplete", ga.pageview);

    return () => {
      router.events.off("routeChangeComplete", ga.pageview);
    };
  }, [router]);

  return (
    <>
      <style jsx global>{
        /* css */ `
          html {
            font-family: ${montserrat.style.fontFamily};
          }
        `
      }</style>
      <ga.Scripts />
      <Header title={pageProps.title} />
      <Loading />
      <Suspense fallback={null}>
        <Scene eventSource={ref} />
      </Suspense>
      <Layout ref={ref}>
        <Component {...pageProps} />
      </Layout>
      <Leva hidden={!showLeva} collapsed={true} />
      <SpeedInsights />
    </>
  );
}
