import { Suspense, useContext, useEffect, useState } from "react";
import AccountForm from "./form";
import "@/App.scss";
import { UserContext } from "@/store/User_Context";
import { toast } from "react-toastify";
const HomePage = () => {
  const [isStarted, setIsStarted] = useState(false);
  const { auth } = useContext(UserContext);
  const [user, setUser] = useState(undefined);

  useEffect(() => {
    if (!user && auth) {
      toast.success("Already LoggedIn");
      setTimeout(() => {
        window.location = "/dashboard";
      }, 1500);
      setUser(auth);
    }
  }, []);
  return (
    <div className="landingPage">
      <h1>Xperiento</h1>

      <button
        type="button"
        onClick={() => setIsStarted(false)}
        data-state={isStarted}
        className="back"
      >
        {" "}
        <i className="pi pi-arrow-left"></i>{" "}
      </button>
      {!isStarted && !user ? (
        <h3>
          Smart insights to improve your sales, marketing, customer retention &
          customer satisfaction.
        </h3>
      ) : (
        <>
          {!user && (
            <Suspense fallback={() => <p>Loading....</p>}>
              <AccountForm />
            </Suspense>
          )}
        </>
      )}
      {!isStarted && (
        <button onClick={() => setIsStarted(true)} className="start">
          {auth ? "Go to Dashboard" : "Get Started"}{" "}
        </button>
      )}
    </div>
  );
};

export default HomePage;
