import Post from "./Post";
import { PostModel } from "@/model/post";

interface Props {
  listOfPosts: PostModel[];
  setListOfPosts: React.Dispatch<React.SetStateAction<PostModel[]>>;
}

export default function PostList({ listOfPosts, setListOfPosts }: Props) {
  return (
    <>
      {listOfPosts.map((post, index: number) => (
        <Post post={post} key={index} setListOfPosts={setListOfPosts} />
      ))}
    </>
  );
}
