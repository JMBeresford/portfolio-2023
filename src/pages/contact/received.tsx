import Link from "next/link";

export default function Page() {
  return (
    <div style={{ display: "grid", placeItems: "center", height: "50%" }}>
      <div style={{ textAlign: "center" }}>
        <div style={{ marginBottom: "2rem", textTransform: "uppercase" }}>
          <h1 style={{ fontWeight: "400" }}>Submission Received</h1>
          <h3 style={{ fontWeight: "400" }}>Thank you!</h3>
        </div>

        <Link href="/" className="noAnim" style={{ textDecoration: "underline" }}>
          return home
        </Link>
      </div>
    </div>
  );
}

export async function getStaticProps() {
  return { props: { title: "Contact Me - John Beresford - Creative Developer" } };
}
