import PostCard from "@/components/ui/dashboard/PostCard/PostCard";
import TodoPostFooter from "@/components/ui/dashboard/PostCard/TodoFooter";
import { getActionsList } from "@/utils/api";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import ErrorPage from "@/ErrorPage";

const ActionsPage = () => {
  const [actions, setActions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    const fetchActions = async () => {
      const req = await getActionsList();
      if (req.status == 200) {
        setActions(req.data);
        setLoading(false);
      } else {
        setError(req?.data.data);
        toast.error(req?.data.data);
      }
    };
    fetchActions();
  }, []);

  if (error) {
    return <ErrorPage message={error} />;
  }

  return (
    <div className="MyInsights">
      <div className="header">
        <div className="title">
          <h3>
            {" "}
            <span>MY LIST</span>
            <br />
            Ideas to Implement
          </h3>
        </div>
      </div>
      <div className="latestInsights">
        <div className="list">
          {loading ? (
            <p>Loading...</p>
          ) : actions.data.length > 0 ? (
            actions.data.map((insight, index) => (
              <div
                onClick={() => {
                  window.location.href = `${window.location.pathname}/${String(
                    insight._id
                  )}`;
                }}
                style={{ textDecoration: "none" }}
                key={index}
                to={insight._id}
              >
                <PostCard
                  key={index}
                  data={insight}
                  footer={<TodoPostFooter data={insight} />}
                />
              </div>
            ))
          ) : (
            <p>You haven&#39;t saved anything yet</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ActionsPage;
