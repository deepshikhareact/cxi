import { BrowserRouter, Route, Routes } from "react-router-dom";
import { UserContext } from "./store/User_Context";
import { useContext } from "react";
import LoginPage from "./app/login/page";
import DashboardPage from "./app/dashboard/page";
import Header from "./components/Header/header";
import MyInsightsPage from "./app/dashboard/my_insights/page";
import ActionsPage from "./app/dashboard/my_actions_list/page";
import ImplementationPage from "./app/dashboard/implemented/page";
import MyAction_Insight_View from "./app/dashboard/my_actions_list/Insight/Page";
import MyTodo_Insight_View from "./app/dashboard/implemented/Insight/Page";
import NotFound from "./NotFound";
import InsightForm from "./app/dashboard/create/page";
import ForgotPassword from "./app/verify/ForgotPassword";
import NewPassword from "./app/verify/newPassword";
const App = () => {
  const { auth } = useContext(UserContext);

  return (
    <BrowserRouter>
      <Header auth={auth} />
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/forgot_password" element={<ForgotPassword />} />
        <Route path="/forgot_password/:token" element={<NewPassword />} />
        {auth && (
          <>
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/dashboard/my_insights" element={<MyInsightsPage />} />
            <Route
              path="/dashboard/my_actions_list"
              element={<ActionsPage />}
            />
            <Route
              path="/dashboard/my_actions_list/:insightId"
              element={<MyAction_Insight_View />}
            />
            <Route
              path="/dashboard/implemented"
              element={<ImplementationPage />}
            />
            <Route
              path="/dashboard/implemented/:insightId"
              element={<MyTodo_Insight_View />}
            />
            {/* <Route path="/dashboard/create" element={<InsightForm />} /> */}
          </>
        )}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
