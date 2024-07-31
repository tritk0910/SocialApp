import { useMutation } from "@tanstack/react-query";
import { buttonVariants } from "./ui/button";
import { createPost } from "@/api/post";
import { useState } from "react";
import { useToast } from "./ui/use-toast";
import { PostModel } from "@/model/post";

interface Props {
  setListOfPosts: React.Dispatch<React.SetStateAction<PostModel[]>>;
}

export default function PostInput({ setListOfPosts }: Props) {
  const [input, setInput] = useState<string>("");
  const { toast } = useToast();

  const { mutate: createNewPost } = useMutation({
    mutationFn: createPost,
    onSuccess: (newPost) => {
      setListOfPosts((prevPosts) => [newPost, ...prevPosts]);
      setInput("");
      toast({
        title: "You have successfully created a post!",
      });
    },
  });

  const handleCreatePost = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!input)
      return toast({ title: "Post cannot be empty!", variant: "destructive" });

    createNewPost({
      body: input,
    });
  };

  return (
    <div>
      <form
        className="flex justify-between items-center w-full mb-5"
        onSubmit={(e) => handleCreatePost(e)}
      >
        <input
          className="outline-none w-full border-t-2 border-l-2 border-b-2 rounded-l-sm pl-3 py-1"
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="What's on your mind?"
        />
        <button
          type="submit"
          className={buttonVariants({
            variant: "default",
            className: "rounded-l-none",
          })}
        >
          Post
        </button>
      </form>
    </div>
  );
}
