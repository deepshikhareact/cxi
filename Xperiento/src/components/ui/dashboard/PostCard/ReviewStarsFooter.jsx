import { useContext, useState } from "react";
import { UserContext } from "@/store/User_Context";
import { giveStarsHandler } from "@/utils/api";
import { toast } from "react-toastify";
const FeedbackFooter = ({ data, isCommentIconHidden = false }) => {
  const { auth } = useContext(UserContext);
  const isAlreadyReviewed = data.implements.find(
    (value) => value.author === auth._id
  );

  const [activeStars, updateActiveStars] = useState(
    isAlreadyReviewed?.stars || 0
  );

  const starsLength = 5;

  const starsUpdateHandler = async (e, index) => {
    e.stopPropagation();

    try {
      const res = await giveStarsHandler({ id: data._id, stars: index });

      if (res.status === 200) {
        updateActiveStars(index);
        toast.success("Thank you for star rating!", { position: "top-center" });
      } else {
        throw new Error("Failed to rate. Please try again.", {
          position: "top-center",
        });
      }
    } catch (error) {
      console.error(error);
      toast.error("An error occurred. Please try again later.", {
        position: "top-center",
      });
    }
  };

  return (
    <div style={{ gap: ".15rem" }} className="FeedbackStar">
      <div className="starsCollection">
        {Array.from({ length: starsLength }, (_id, index) => {
          return (
            <div
              onClick={(e) => starsUpdateHandler(e, index + 1)}
              key={index}
              className="icon-container"
            >
              <i
                className={
                  index + 1 <= activeStars
                    ? "pi pi-star-fill active"
                    : "pi pi-star"
                }
              ></i>
            </div>
          );
        })}
      </div>

      {!isCommentIconHidden && (
        <div
          style={{ "--hoverColor": "var(--star-color)" }}
          className="icon-container"
        >
          <i className="pi pi-comment"></i>
        </div>
      )}
    </div>
  );
};

export default FeedbackFooter;
