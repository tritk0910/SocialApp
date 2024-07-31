import { useEffect, useState } from "react";
import NavBar from "./components/NavBar";
import PostInput from "./components/PostInput";
import PostList from "./components/PostList";
import { PostModel } from "./model/post";
import { getAllPosts } from "./api/post";
import { useMutation } from "@tanstack/react-query";

function App() {
  const [listOfPosts, setListOfPosts] = useState<PostModel[]>([]);
  const { mutate: getPosts } = useMutation({
    mutationFn: getAllPosts,
    onSuccess: (data) => {
      setListOfPosts(data.reverse());
    },
  });

  useEffect(() => {
    getPosts();
  }, [getPosts]);

  return (
    <main className="min-h-screen">
      <NavBar />
      <div className="h-[calc(100vh-65px)] px-[500px] pt-5">
        <PostInput setListOfPosts={setListOfPosts} />
        <PostList listOfPosts={listOfPosts} setListOfPosts={setListOfPosts} />
      </div>
    </main>
  );
}

export default App;
