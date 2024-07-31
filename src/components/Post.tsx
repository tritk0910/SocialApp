import { Ellipsis, MessageCircle, Share2, ThumbsUp } from "lucide-react";
import { Button, buttonVariants } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { useState } from "react";
import { Avatar, AvatarImage } from "./ui/avatar";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion";
import CommentList from "./CommentList";
import { Textarea } from "./ui/textarea";
import { deletePost, updatePost } from "@/api/post";
import { PostModel } from "@/model/post";
import { createComment } from "@/api/comment";
import { useToast } from "./ui/use-toast";
import { CommentModel } from "@/model/comment";

interface Props {
  post: PostModel;
  setListOfPosts: React.Dispatch<React.SetStateAction<PostModel[]>>;
}

export default function Post({ post, setListOfPosts }: Props) {
  const [like, isLike] = useState<boolean>(false);
  const [editedContent, setEditedContent] = useState<string>("");
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [commentInput, setCommentInput] = useState<string>("");
  const [comments, setComments] = useState<CommentModel[]>(post.comments || []);

  const { toast } = useToast();

  const handleEditPost = () => {
    setIsEdit(true);
    setEditedContent(post?.body || "");
  };

  const handleUpdate = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    updatePost({
      id: post.id!,
      body: editedContent,
    });
    setListOfPosts((prevPosts) =>
      prevPosts.map((p) =>
        p.id === post.id ? { ...p, body: editedContent } : p
      )
    );
    toast({ title: "Post updated successfully" });
    setIsEdit(false);
  };

  const handleCancelUpdate = () => {
    setIsEdit(false);
  };

  const handleDeletePost = () => {
    deletePost(post.id!);
    setIsEdit(false);
    setListOfPosts((prevPosts) => prevPosts.filter((p) => p.id !== post.id));
  };

  const handleSubmitComment = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!commentInput)
      return toast({
        title: "Comment cannot be empty!",
        variant: "destructive",
      });
    const newComment = await createComment({
      postId: post.id!,
      message: commentInput,
    });
    setComments((prevComments) => [...prevComments, newComment]);
    setCommentInput("");
  };

  return (
    <div className="rounded-lg shadow-sm ring-1 ring-border flex flex-col w-full p-3 mb-5">
      <Accordion type="single" collapsible>
        <AccordionItem value="item-1">
          <div className="card-header flex justify-between items-center pb-3">
            <div className="flex justify-center items-center gap-x-2">
              <Avatar>
                <AvatarImage
                  src="https://github.com/shadcn.png"
                  alt="@shadcn"
                />
              </Avatar>
              <span>User</span>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger>
                <Ellipsis />
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem
                  className="!text-blue-500"
                  onClick={handleEditPost}
                >
                  Edit
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="!text-red-500"
                  onClick={handleDeletePost}
                >
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <div className="card-body flex-[2] px-3">
            {isEdit ? (
              <form
                className="flex flex-col gap-2"
                onSubmit={(e) => handleUpdate(e)}
              >
                <Textarea
                  className="h-56 max-h-96"
                  value={editedContent}
                  onChange={(e) => setEditedContent(e.target.value)}
                />
                <div className="text-right space-x-2">
                  <Button type="submit">Update</Button>
                  <Button
                    variant="destructive"
                    onClick={() => handleCancelUpdate()}
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            ) : (
              <span>{post?.body}</span>
            )}
          </div>
          <div className="card-footer flex gap-x-5 px-3">
            <button
              className={buttonVariants({
                variant: "link",
                className: "!p-0 flex gap-1",
              })}
              onClick={() => isLike(!like)}
            >
              <ThumbsUp size={20} fill={like ? "#34eb9b" : "#fff"} />
              <span className="text-[15px]">Like</span>
            </button>
            <AccordionTrigger
              className={buttonVariants({
                variant: "link",
                className: "!p-0 flex gap-1",
              })}
            >
              <MessageCircle size={20} />
              <span className="text-[15px]">Reply</span>
            </AccordionTrigger>
            <button
              className={buttonVariants({
                variant: "link",
                className: "!p-0 flex gap-1",
              })}
            >
              <Share2 size={20} />
              <span className="text-[15px]">Share</span>
            </button>
          </div>
          <AccordionContent>
            <div className="flex justify-center items-center gap-x-2 pt-3">
              <Avatar>
                <AvatarImage
                  src="https://github.com/shadcn.png"
                  alt="@shadcn"
                />
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
                  className={buttonVariants({
                    variant: "default",
                    className: "rounded-l-none",
                  })}
                >
                  Comment
                </button>
              </form>
            </div>
          </AccordionContent>
          {post?.comments && (
            <div className="comment-list pt-5 pl-10">
              <CommentList comments={comments} setComments={setComments} />
            </div>
          )}
        </AccordionItem>
      </Accordion>
    </div>
  );
}
