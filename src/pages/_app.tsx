import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import { Header } from "@/config";
import { Layout } from "@/components/dom/Layout";
import "@/styles/globals.scss";
import { Leva } from "leva";
import { Loading } from "@/components/dom/Loading";

const Scene = dynamic(() => import("@/components/canvas/Scene"), { ssr: true });

export default function App({ Component, pageProps = { title: "index" } }) {
  const ref = useRef();
  const [showLeva, setShowLeva] = useState<boolean>(false);

  useEffect(() => {
    if (window?.location.hash.includes("debug")) {
      setShowLeva(true);
    }
  }, []);

  return (
    <>
      <Header title={pageProps.title} />
      <Loading />
      {Component?.canvas && (
        <Scene eventSource={ref} eventPrefix="client">
          {Component.canvas(pageProps)}
        </Scene>
      )}
      <Layout ref={ref}>
        <Component {...pageProps} />
      </Layout>
      <Leva hidden={!showLeva} collapsed={true} />
    </>
  );
}
