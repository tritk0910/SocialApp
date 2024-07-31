import { useState } from "react";
import { Avatar, AvatarImage } from "./ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Ellipsis, ThumbsUp, Share2 } from "lucide-react";
import { Button, buttonVariants } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { deleteComment, editComment } from "@/api/comment";
import { CommentModel } from "@/model/comment";
import { useToast } from "./ui/use-toast";

interface Props {
  id: number;
  postId: number;
  content: string;
  setComments: React.Dispatch<React.SetStateAction<CommentModel[]>>;
}
export default function Comment({ id, postId, content, setComments }: Props) {
  const [like, isLike] = useState<boolean>(false);
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [editedContent, setEditedContent] = useState<string>("");

  const { toast } = useToast();

  const handleUpdate = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!editedContent)
      return toast({
        title: "You cannot leave that empty!",
        variant: "destructive",
      });
    editComment({
      id: id,
      postId: postId,
      message: editedContent,
    });
    setComments((prevComments) =>
      prevComments.map((comment) =>
        comment.id === id ? { ...comment, message: editedContent } : comment
      )
    );
    setIsEdit(false);
  };

  const handleCancelUpdate = () => {
    setIsEdit(false);
  };

  const handleEditComment = () => {
    setIsEdit(true);
    setEditedContent(content);
  };

  const handleDeleteComment = () => {
    deleteComment(id);
    setComments((prevComments) =>
      prevComments.filter((comment) => comment.id !== id)
    );
  };

  return (
    <div className="pb-4">
      <div className="card-header flex justify-between items-center pb-3">
        <div className="flex justify-center items-center gap-x-2">
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
          </Avatar>
          <span>User</span>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              size="icon"
              variant="link"
              className="text-black !ring-transparent"
            >
              <Ellipsis />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem
              className="!text-blue-500"
              onClick={handleEditComment}
            >
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem
              className="!text-red-500"
              onClick={handleDeleteComment}
            >
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="card-body flex-[2]">
        {isEdit ? (
          <form
            className="flex flex-col gap-2"
            onSubmit={(e) => handleUpdate(e)}
          >
            <Textarea
              className="h-20 max-h-96"
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
          <span>{content}</span>
        )}
      </div>
      <div className="card-footer flex gap-x-5">
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
    </div>
  );
}
