import PostCard from "@/components/ui/dashboard/PostCard/PostCard";
import { getSingleInsights, createComment } from "@/utils/api";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./styles.scss";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { formatDate } from "@/utils/timeFormatter";
import FeedbackFooter from "@/components/ui/dashboard/PostCard/ReviewStarsFooter";

function Comment({ data }) {
  const {
    author: { firstName, lastName },
    text = "Error",
    createdAt = "Error",
  } = data;

  // const username = author || { firstName: "Error", lastName: "Error" };
  // const { firstName, lastName } = username;
  return (
    <>
      <p className="time">{formatDate(createdAt)}</p>
      <p className="name">By {firstName + " " + lastName}</p>
      <p className="text">{text}</p>
    </>
  );
}

const MyTodo_Insight_View = () => {
  const { insightId } = useParams();
  const [insightData, setInsightData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [comments, setComments] = useState([]);
  const { register, setValue, handleSubmit } = useForm();

  useEffect(() => {
    const fetchActions = async () => {
      try {
        const req = await getSingleInsights(insightId);
        if (req.status === 200) {
          setInsightData(req.data.data);
          setComments(req.data.data.comments);
        } else {
          setError("Error while fetching this insight");
        }
      } catch (error) {
        setError("Error while fetching this insight");
      } finally {
        setLoading(false);
      }
    };
    fetchActions();
  }, [insightId]);

  const onSubmit = async (data) => {
    const { comment } = data;
    if (comment.length == 0) {
      return;
    }
    try {
      const req = await createComment({ id: insightData._id, text: comment });
      if (req.status === 201) {
        setComments(req.data.data.comments);
        setValue("comment", "");
        toast.success("Comment Added");
      } else {
        setError("Error creating comment");
      }
    } catch (error) {
      setError("Error creating comment");
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="InsightPage">
      {insightData && (
        <PostCard
          style={{
            borderRadius: "0px",
            width: "100%",
            margin: "0px",
            maxWidth: "unset",
          }}
          data={insightData}
          footer={
            <FeedbackFooter
              isCommentIconHidden={true}
              disableActions={true}
              data={insightData}
            />
          }
        />
      )}
      <div className="formAndComments">
        <h2>Comments</h2>
        <ul className="comments">
          {comments.length == 0 ? (
            <p>No comments yet</p>
          ) : (
            comments.map((comment, index) => (
              <li className="comment" key={index}>
                <Comment data={comment} />
              </li>
            ))
          )}
        </ul>
        <form className="createCommentForm" onSubmit={handleSubmit(onSubmit)}>
          <input
            type="text"
            {...register("comment", {
              required: {
                value: true,
                message: "Field Required",
              },
            })}
            placeholder="Add a comment..."
          />
          <button type="submit">
            <i className="pi pi-send"></i>
          </button>
        </form>
      </div>
    </div>
  );
};

export default MyTodo_Insight_View;
