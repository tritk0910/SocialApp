import { CommentModel } from "@/model/comment";
import Comment from "./Comment";

interface Props {
  comments: CommentModel[];
  setComments: React.Dispatch<React.SetStateAction<CommentModel[]>>;
}

export default function CommentList({ comments, setComments }: Props) {
  return (
    <>
      {comments?.map((comment, index) => (
        <Comment
          id={comment.id}
          postId={comment.postId}
          content={comment.message}
          key={index}
          setComments={setComments}
        />
      ))}
    </>
  );
}
