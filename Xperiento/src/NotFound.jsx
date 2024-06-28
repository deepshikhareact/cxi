import { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "./store/User_Context";

export default function NotFound() {
  const { auth } = useContext(UserContext);
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
        alignItems: "center",
        textAlign: "center",
        justifyContent: "center",
        height: "calc(100vh - var(--header-h))",
        backgroundColor: "var(--main-Bg)",
        color: "var(--primary-color)",
      }}
    >
      <h2>Page Not Found</h2>
      <p>Could not find the requested resource</p>
      <div
        style={{
          display: "flex",
          gap: "1rem",
          flexWrap: "wrap",
          justifyContent: "center",
        }}
        className="buttons"
      >
        <Link
          style={{
            fontWeight: "600",
            border: "none",
            textAlign: "center",
          }}
          className="link button"
          to="/"
        >
          Return Home
        </Link>
        {auth && (
          <Link
            style={{
              fontWeight: "600",
              border: "none",
              textAlign: "center",
            }}
            className="link button"
            to="/dashboard"
          >
            Return Dashboard
          </Link>
        )}
      </div>
    </div>
  );
}
