import { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "./store/User_Context";

export default function ErrorPage({ message }) {
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
      <h2>Error Occured </h2>
      <p>Error Details:</p>
      <p style={{ color: "#ff0000" }}>{message}</p>
      <div
        style={{
          display: "flex",
          gap: "1rem",
          flexWrap: "wrap",
          justifyContent: "center",
        }}
        className="buttons"
      >
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
