import AllPosts from "@/components/posts/all-posts";
import { getFeaturedPost } from "@/lib/posts-util";
import Head from "next/head";

export default function AllPostsPage(props) {
  return (
    <>
      <Head>
        <title>모든 포스트</title>
      </Head>
      <AllPosts posts={props.posts} />
    </>
  );
}
export function getServerSideProps() {
  const featuredPosts = getFeaturedPost();
  return {
    props: {
      posts: featuredPosts,
    },
  };
}
