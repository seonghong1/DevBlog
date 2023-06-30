import PostContent from "@/components/posts/post-detail/post-content";
import { getPostData } from "@/lib/posts-util";
import Head from "next/head";

export default function PostPage(props) {
  console.log(props);
  return (
    <>
      <Head>
        <title>{props.post.title}</title>
      </Head>
      <PostContent post={props.post} />
    </>
  );
}

export function getServerSideProps(context) {
  const { params } = context;
  const postData = getPostData(params.slug);
  return {
    props: {
      post: postData,
    },
  };
}
