import { buttonVariants } from "./ui/button";
import { Avatar, AvatarImage } from "./ui/avatar";
import { useToast } from "./ui/use-toast";
import { useMutation } from "@tanstack/react-query";
import { createComment } from "@/api/comment";
import { useState } from "react";
import { CommentModel } from "@/model/comment";
import { PostModel } from "@/model/post";

interface Props {
    setComments: React.Dispatch<React.SetStateAction<CommentModel[]>>;
    post: PostModel;
}

export default function CommentInput({setComments, post}: Props) {
  const [commentInput, setCommentInput] = useState<string>("");
  const { toast } = useToast();
  const { mutate: serverCreateComment, isPending: commentIsPending } =
    useMutation({
      mutationFn: createComment,
      onSuccess: (newComment) => {
        console.log(newComment);

        setComments((prevComments) => [...prevComments, newComment]);
        toast({ title: "Commented sucessfully" });
        setCommentInput("");
      },
      onError: () => {
        toast({ title: "Failed to create comment", variant: "destructive" });
      },
    });

  const handleSubmitComment = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!commentInput)
      return toast({
        title: "Comment cannot be empty!",
        variant: "destructive",
      });
    serverCreateComment({
      postId: post.id!,
      message: commentInput,
    });
  };

  return (
    <div className="flex justify-center items-center gap-x-2 pt-3">
      <Avatar>
        <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
      </Avatar>
      <form
        className="flex justify-between items-center w-full"
        onSubmit={handleSubmitComment}
      >
        <input
          className="outline-none w-full border-t-2 border-l-2 border-b-2 rounded-l-sm pl-3 py-[6px]"
          type="text"
          placeholder="What are you thinking bout this post?"
          value={commentInput}
          onChange={(e) => setCommentInput(e.target.value)}
        />
        <button
          type="submit"
          disabled={commentIsPending}
          className={buttonVariants({
            variant: "default",
            className: "rounded-l-none",
          })}
        >
          Comment
        </button>
      </form>
    </div>
  );
}
