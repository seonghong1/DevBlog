import Hero from "@/components/home-page/hero";
import FeaturedPosts from "@/components/home-page/featured-posts";
import { getFeaturedPost } from "@/lib/posts-util";
import Head from "next/head";

export default function HomePage(props) {
  return (
    <>
      <Head>
        <title>SEONG HONG_Dev_Blog</title>
      </Head>
      <Hero />
      <FeaturedPosts posts={props.posts} />
    </>
  );
}
export function getStaticProps() {
  const featuredPosts = getFeaturedPost();
  return {
    props: {
      posts: featuredPosts,
    },
    revalidate: 120,
  };
}
