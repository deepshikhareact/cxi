import { UserContext } from "@/store/User_Context";
import { useContext } from "react";
import InsightsCard from "../InsightsCard";

const MyTodoAndLikeCount = ({ data }) => {
  const { auth } = useContext(UserContext);
  let todoCount = data?.todoLength || auth?.todo?.length || 0;
  let likeCount = data?.likedLength || auth?.liked?.length || 0;

  return (
    <div className="overLook">
      <InsightsCard isGlow={false} insightNumber={todoCount} label="To-Do" />
      <InsightsCard isGlow={false} insightNumber={likeCount} label="Liked" />
    </div>
  );
};

export default MyTodoAndLikeCount;
