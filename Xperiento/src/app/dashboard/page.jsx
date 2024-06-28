import "./styles.scss";
import { getDashboard, getDashboardCounts } from "@/utils/api";
import { Suspense, lazy, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import InsightsCard from "@/components/ui/dashboard/InsightsCard";
import PostCard from "@/components/ui/dashboard/PostCard/PostCard";
import LikeDislikeFooter from "@/components/ui/dashboard/PostCard/LikeDislikeFooter";
import MyTodoAndLikeCount from "@/components/ui/dashboard/UserLikeAndTodo/page";
import { toast } from "react-toastify";
import ErrorPage from "@/ErrorPage";

const ServiceBoard = lazy(() =>
  import("@/components/CreateAccount/ServiceBoard")
);

const DashboardPage = () => {
  const [insightsArray, setInsightsArray] = useState(null);
  const [myCounts, setMyCounts] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState({
    insight: null,
    todo: null,
  });

  const [isNew, updateIsNewStatus] = useState(false);

  useEffect(() => {
    if (sessionStorage) {
      const track = sessionStorage.getItem("isNew");
      const isTrue = track ? true : false;
      updateIsNewStatus(isTrue);
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    const dashboardApis = async () => {
      const response = await getDashboard();
      const userResponse = await getDashboardCounts();
      const res = response.data;
      const userRes = userResponse.data;
      let errorMessage = "";
      let getError = {};
      if (response.status === 200) {
        setInsightsArray(res);
      } else {
        errorMessage += "Insights, ";
        getError.insight = true;
      }
      if (userResponse.status === 200) {
        setMyCounts(userRes);
      } else {
        getError.todo = true;
        errorMessage += "Unable to get liked and todo counts";
      }
      if (response.status !== 200 || userResponse.status !== 200) {
        setError(getError);
        toast.error(response?.data.data + ": " + errorMessage);
      }
    };
    dashboardApis();
  }, []);

  if (isLoading) {
    return <div className="loader">Loading....</div>;
  }

  if (isNew == true) {
    return <ServiceBoard updateIsNewStatus={updateIsNewStatus} />;
  }

  if (error.insight === true || error.todo === true) {
    return <ErrorPage message="Network Error!!!" />;
  }
  if (insightsArray === null || myCounts === null) {
    return <h1>Loading...</h1>;
  }
// <<<<<<< Updated upstream
// =======

// >>>>>>> Stashed changes
  const allInsightsCount = [
    "Marketing",
    "Behaviour",
    "Price",
    "Complaint",
    "Sales",
 ];
// <<<<<<< Updated upstream

// =======
// >>>>>>> Stashed changes
  return (
    <div className="Dashboard">
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
      <div className="Insights">
        {allInsightsCount.map((label, i) => {
// <<<<<<< Updated upstream
          return (
            <InsightsCard
              key={i}
              insightNumber={insightsArray?.counts[label] || 0}
              label={label}
            />
          );
// =======
          return <InsightsCard key={i} insightNumber={insightsArray?.counts[label] || 0} label={label} />
// >>>>>>> Stashed changes
        })}
        {/* USE THIS WHEN TO SHOW ONLY AVAILABLE INSIGHTS CATEGORY */}
        {/* {Object.keys(insightsArray.counts).map((key, index) => (
          <InsightsCard
            key={index}
            insightNumber={insightsArray.counts[key]}
            label={key}
          />
        ))} */}
      </div>
      <MyTodoAndLikeCount data={myCounts} />
      <div className="latestInsights">
        <p className="latestInsights_title">LATEST INSIGHTS</p>
        <div className="list">
          {insightsArray?.data?.map((insight, i) => {
            return (
              <div key={i}>
                <PostCard
                  data={insight}
                  footer={<LikeDislikeFooter data={insight} />}
                />
              </div>
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

export default DashboardPage;
