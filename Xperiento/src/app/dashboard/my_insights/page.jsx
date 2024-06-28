import PostCard from "@/components/ui/dashboard/PostCard/PostCard";
import { Link } from "react-router-dom";
import "./styles.scss";
import LikeDislikeFooter from "@/components/ui/dashboard/PostCard/LikeDislikeFooter";
import { getInsights } from "@/utils/api";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import ErrorPage from "@/ErrorPage";

const MyInsightsPage = () => {
  const [insightsData, setInsightsArray] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const dashboardApis = async () => {
      const response = await getInsights();
      const res = response.data;
      if (response.status === 200) {
        setInsightsArray(res);
      } else {
        setError(res.data);
        toast.error(response?.data.data);
      }
    };
    dashboardApis();
  }, []);

  if (error) {
    return <ErrorPage message={error} />;
  }
  if (insightsData == null) {
    return <h1>Loading</h1>;
  }

  return (
    <div className="MyInsights">
      <div className="header">
        <div className="title">
          <h3>
            {" "}
            <span>SMART INSIGHTS TO</span>
            <br />
            Transform Your Business
          </h3>
        </div>
        <div className="flex">
          <img
            src={"/assets/dashboard/restaurant.png"}
            height={60}
            width={60}
            alt="restaurant"
          />
          <img
            src={"/assets/dashboard/cafe.png"}
            height={60}
            width={60}
            alt="cafe"
          />
        </div>
      </div>
      <div className="latestInsights">
        <div className="list">
          {insightsData?.data?.map((insight, i) => {
            return (
              <PostCard
                footer={<LikeDislikeFooter data={insight} />}
                key={i}
                data={insight}
              />
            );
          })}
          <div className="centered">
            <button
              style={{
                margin: 0,
              }}
              className="start"
            >
              <Link
                style={{ textDecoration: "none", color: "inherit" }}
                to="/dashboard/my_insights"
              >
                Load More
              </Link>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyInsightsPage;
