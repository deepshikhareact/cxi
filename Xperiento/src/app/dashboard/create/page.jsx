import { useContext, useState } from "react";
import "./page.css";
import { UserContext } from "@/store/User_Context";
import { createInsightsPost } from "@/utils/api";
import { toast } from "react-toastify";

const InsightForm = () => {
  const { auth } = useContext(UserContext);

  const [formData, setFormData] = useState({
    industrySegment: "",
    insightCategory: "",
    insightSubCategory: "",
    insightLevel: "",
    insightTitle: "",
    insightDescription: "",
    insightActionItem: "",
    actionItemExample: "",
  });

  const placeholders = {
    industrySegment: "Restaurant",
    insightCategory: "Sales",
    insightSubCategory: "Feedback Management",
    iconURL: "Promotion",
    insightDataURL: "/insights/id",
    insightLevel: "Intermediate",
    insightTitle: "Improving Customer Feedback",
    insightDescription:
      "Ways to enhance customer feedback collection and analysis.",
    insightActionItem: "Implement a feedback kiosk at the exit.",
    actionItemExample:
      "Place a tablet near the exit for customers to leave feedback easily.",
  };
  if (!auth) {
    return <h1>Protected Route Authentication Required</h1>;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Add author to formData
      formData.author = auth._id;
      const createInsightReq = await createInsightsPost(formData);
      if (createInsightReq.status === 201) {
        toast.success("Insight Created Successfully");
      } else {
        toast.error(createInsightReq.data.data || "An error occurred");
      }
    } catch (error) {
      toast.error("An error occurred. Check the console for more details.");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <form className="form-container" onSubmit={handleSubmit}>
      <h1>Create Insights </h1>
      <label>
        Business Name:
        <input
          type="text"
          name="industrySegment"
          value={formData.industrySegment}
          placeholder={placeholders.industrySegment}
          onChange={handleChange}
        />
      </label>
      <label>
        Insight Category:
        <input
          type="text"
          name="insightCategory"
          value={formData.insightCategory}
          placeholder={placeholders.insightCategory}
          onChange={handleChange}
        />
      </label>
      <label>
        Insight SubCategory:
        <input
          type="text"
          name="insightSubCategory"
          value={formData.insightSubCategory}
          placeholder={placeholders.insightSubCategory}
          onChange={handleChange}
        />
      </label>
      <label>
        Icon URL:
        <input
          type="text"
          name="iconURL"
          value={formData.iconURL}
          placeholder={placeholders.iconURL}
          onChange={handleChange}
        />
      </label>
      <label>
        Insight Data URL:
        <input
          type="text"
          name="insightDataURL"
          value={formData.insightDataURL}
          placeholder={placeholders.insightDataURL}
          onChange={handleChange}
        />
      </label>
      <label>
        Insight Level:
        <input
          type="text"
          name="insightLevel"
          value={formData.insightLevel}
          placeholder={placeholders.insightLevel}
          onChange={handleChange}
        />
      </label>
      <label>
        Insight Title:
        <input
          type="text"
          name="insightTitle"
          value={formData.insightTitle}
          placeholder={placeholders.insightTitle}
          onChange={handleChange}
        />
      </label>
      <label>
        Insight Description:
        <input
          type="text"
          name="insightDescription"
          value={formData.insightDescription}
          placeholder={placeholders.insightDescription}
          onChange={handleChange}
        />
      </label>
      <label>
        Insight Action Item:
        <input
          type="text"
          name="insightActionItem"
          value={formData.insightActionItem}
          placeholder={placeholders.insightActionItem}
          onChange={handleChange}
        />
      </label>
      <label>
        Action Item Example:
        <input
          type="text"
          name="actionItemExample"
          value={formData.actionItemExample}
          placeholder={placeholders.actionItemExample}
          onChange={handleChange}
        />
      </label>
      <button type="submit">Submit</button>
    </form>
  );
};

export default InsightForm;
