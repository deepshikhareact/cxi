import { useContext, useState } from "react";
import { save_Unsave_Implement_Handler } from "@/utils/api";
import { UserContext } from "@/store/User_Context";
import { toast } from "react-toastify";

const TodoPostFooter = ({ data }) => {
  const { auth } = useContext(UserContext);
  console.log(data);
  const isImplementing = data.implements.find(
    (value) => value.author === auth._id
  );
  const [implement, setImplement] = useState(isImplementing);

  const implementClickHandler = async (e) => {
    e.stopPropagation();
    if (!implement) {
      const req = await save_Unsave_Implement_Handler(data._id);
      if (req.status === 200) {
        setImplement((pre) => !pre);
        toast.success("Saved to the implement Successfully!!");
      } else {
        toast.error(req.data.data || "Error Occured");
      }
    } else {
      toast.info("Can't undo action!");
    }
  };
  return (
    <div className="Like_Dislike_footer">
      <div
        onClick={(e) => implementClickHandler(e)}
        style={{ "--hoverColor": "var(--star-color)" }}
        className="icon-container"
      >
        {implement ? (
          <i style={{ color: "var(--star-color)" }} className="pi pi-check"></i>
        ) : (
          <i className="pi pi-check"></i>
        )}
      </div>
      <div
        style={{ "--hoverColor": "var(--star-color)" }}
        className="icon-container"
      >
        <i className="pi pi-comment"></i>
      </div>
    </div>
  );
};

export default TodoPostFooter;
