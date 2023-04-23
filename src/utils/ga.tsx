import Script from "next/script";

// https://developers.google.com/analytics/devguides/collection/gtagjs/pages
export const pageview = url => {
  (window as any).gtag("config", "G-MMZ9C8TNGF", {
    page_path: url,
  });
};

// https://developers.google.com/analytics/devguides/collection/gtagjs/events
export const event = ({ action, category, label, value }) => {
  (window as any).gtag("event", action, {
    event_category: category,
    event_label: label,
    value: value,
  });
};

export const Scripts = () => {
  if (process.env.NODE_ENV !== "production") return null;

  return (
    <>
      <Script
        async
        strategy="afterInteractive"
        src="https://www.googletagmanager.com/gtag/js?id=G-MMZ9C8TNGF"
      />
      <Script strategy="afterInteractive" id="gtag">
        {`
            window.dataLayer = window.dataLayer || [];
            function gtag() {dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-MMZ9C8TNGF', {page_path: window.location.pathname});
          `}
      </Script>
    </>
  );
};
