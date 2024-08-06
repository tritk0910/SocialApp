import { useEffect, useState } from "react";
import NavBar from "./components/NavBar";
import PostInput from "./components/PostInput";
import PostList from "./components/PostList";
import { PostModel } from "./model/post";
import { getAllPosts } from "./api/post";
import { useMutation } from "@tanstack/react-query";

function App() {
  const [listOfPosts, setListOfPosts] = useState<PostModel[]>([]);
  const { mutate: serverGetAllPosts, isPending } = useMutation({
    mutationFn: getAllPosts,
    onSuccess: (data) => {
      setListOfPosts(data.reverse());
    },
  });

  useEffect(() => {
    serverGetAllPosts();
  }, [serverGetAllPosts]);

  return (
    <main className="min-h-screen">
      <NavBar />
      <div className="flex flex-col items-center w-full pt-5 px-10">
        <div className="max-w-[700px] w-full">
        <PostInput setListOfPosts={setListOfPosts} />
        <PostList isPending={isPending} listOfPosts={listOfPosts} setListOfPosts={setListOfPosts} />
        </div>
      </div>
    </main>
  );
}

export default App;
