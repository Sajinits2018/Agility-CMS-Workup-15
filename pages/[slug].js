// pages/[slug].js
import Head from "next/head";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import RichText from "@/components/RichText";
import { getAgilityClient } from "@/lib/agility";

export async function getStaticPaths() {
  const client = getAgilityClient();
  const locale = process.env.AGILITY_LOCALE || "en-us";

  const pagesList = await client.getContentList({
    referenceName: "pages",
    locale,
    take: 200,
  });

  const items = pagesList?.items || [];
  const paths = items
    .filter((p) => p.fields?.slug && p.fields.slug !== "home")
    .map((p) => ({
      params: { slug: p.fields.slug },
    }));

  return { paths, fallback: "blocking" };
}

export async function getStaticProps({ params }) {
  const client = getAgilityClient();
  const locale = process.env.AGILITY_LOCALE || "en-us";
  const slug = params?.slug;

  // Get all pages and pick the one matching the slug
  const pagesList = await client.getContentList({
    referenceName: "pages",
    locale,
    take: 200,
  });

  const allPages = pagesList?.items || [];
  const page = allPages.find((p) => p.fields?.slug === slug) || null;

  if (!page) {
    return { notFound: true, revalidate: 30 };
  }

  const navPages = allPages.filter((p) => p.fields?.slug && p.fields.slug !== "home");

  return {
    props: { page, navPages },
    revalidate: 60,
  };
}

export default function AgilityPage({ page, navPages }) {
  if (!page) return <div>Page not found</div>;

  return (
    <>
      <Head>
        <title>{page.fields?.title || "Page"} | Agility</title>
        <meta name="description" content={page.fields?.excerpt || ""} />
      </Head>

      <Header pages={navPages} />

      <main className="container">
        <h1 className="h1">{page.fields?.title}</h1>
        <RichText html={page.fields?.body} />
      </main>

      <Footer />
    </>
  );
}
