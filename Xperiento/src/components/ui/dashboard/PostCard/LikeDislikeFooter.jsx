"use client";
import { UserContext } from "@/store/User_Context";
import { useContext, useState } from "react";
import { bookmarksHandler, dislikeHandler, likeHandler } from "@/utils/api";
import { toast } from "react-toastify";
const LikeDislikeFooter = ({ data, disableActions = false }) => {
  const { auth } = useContext(UserContext);
  const isLiked = data.likes.includes(auth?._id);
  const isDisliked = data.dislikes.includes(auth?._id);
  const isMarked = data.bookmarks.includes(auth?._id);

  const [liked, setLiked] = useState(isLiked);
  const [disliked, setDisliked] = useState(isDisliked);
  const [bookmarked, setBookmarked] = useState(isMarked);

  const handleLike = async () => {
    if (isDisliked) {
      return;
    }
    const response = await likeHandler(data._id);
    if (response.data.success) {
      setDisliked(false);
      setLiked(!liked);
      toast.success("Liked Successfully!!");
    } else {
      toast.error(response.data.data || "Failed to perform like action");
    }
  };

  const handleDislike = async () => {
    if (isLiked) {
      return;
    }

    const response = await dislikeHandler(data._id);
    if (response.data.success) {
      setDisliked(!disliked);
      toast.success("Disliked Successfully!!");
      setLiked(false);
    } else {
      toast.error(response.data.data || "Failed to perform dislike action");
    }
  };

  const handleBookmark = async () => {
    if (disableActions || bookmarked) {
      return toast.info("Action not available!");
    }
    const response = await bookmarksHandler(data._id);
    if (response.data.success) {
      setBookmarked(!bookmarked);
      toast.success("Bookmarked Successfully!!");
    } else {
      toast.error(response.data.data || "Failed to perform bookmark action");
    }
  };

  return (
    <div className="Like_Dislike_footer">
      <div
        style={{ "--hoverColor": "var(--star-color)" }}
        className={`icon-container ${liked ? "active" : ""}`}
        onClick={handleLike}
      >
        {liked ? (
          <i className="pi pi-thumbs-up-fill"></i>
        ) : (
          <i className="pi pi-thumbs-up"></i>
        )}
      </div>
      <div
        style={{ "--hoverColor": "red" }}
        className={`icon-container ${disliked ? "active" : ""}`}
        onClick={handleDislike}
      >
        {disliked ? (
          <i className="pi pi-thumbs-down-fill"></i>
        ) : (
          <i className="pi pi-thumbs-down"></i>
        )}
      </div>
      <div
        style={{ "--hoverColor": "var(--star-color)" }}
        className={`icon-container ${bookmarked ? "active" : ""}`}
        onClick={handleBookmark}
      >
        {bookmarked ? (
          <i className="pi pi-bookmark-fill"></i>
        ) : (
          <i className="pi pi-bookmark"></i>
        )}
      </div>
    </div>
  );
};

export default LikeDislikeFooter;
