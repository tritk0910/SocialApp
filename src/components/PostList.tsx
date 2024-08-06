import { LoaderCircle } from "lucide-react";
import Post from "./Post";
import { PostModel } from "@/model/post";

interface Props {
  isPending: boolean;
  listOfPosts: PostModel[];
  setListOfPosts: React.Dispatch<React.SetStateAction<PostModel[]>>;
}

export default function PostList({
  isPending,
  listOfPosts,
  setListOfPosts,
}: Props) {
  return (
    <>
      {isPending ? (
        <div className="flex flex-col justify-center items-center h-full">
          <LoaderCircle className="animate-spin" />
          <span>Loading</span>
        </div>
      ) : (
        <>
          {listOfPosts.map((post, index: number) => (
            <Post post={post} key={index} setListOfPosts={setListOfPosts} />
          ))}
        </>
      )}
    </>
  );
}
