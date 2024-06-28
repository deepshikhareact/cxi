"use client";
import { useContext, useEffect, useState } from "react";
import "./styles.scss";
import { UserContext } from "@/store/UserContext";

const DashboardPage = () => {
  const { auth } = useContext(UserContext);
  const [user, setUser] = useState(null);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    if (auth) {
      setUser(auth);
      setLoading(false);
    } else {
      setLoading(false);
      setTimeout(() => {
        // redirect('/');
      }, 2000);
    }
  }, [auth]);

  if (isLoading) {
    return (
      <div className="dashboard">
        <h1>Loading...</h1>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="dashboard">
        <h1>Error: User not authenticated!</h1>
      </div>
    );
  }

  const {
    firstName = "",
    lastName = "",
    email = "",
    phoneNumber = "",
    password = "",
    status = "",
    category = "",
    role = "",
    businessType = "",
    businessName = "",
  } = user || {};

  return (
    <div className="dashboard">
      <h1>Dashboard Page</h1>
      <h3>
        <span>{`${firstName} ${lastName}`}</span>, Welcome to the dashboard!
      </h3>
      <div className="user-details">
        <div className="row">
          <label>First Name:</label>
          <span>{firstName}</span>
        </div>
        <div className="row">
          <label>Last Name:</label>
          <span>{lastName}</span>
        </div>
        <div className="row">
          <label>Email:</label>
          <span>{email}</span>
        </div>
        <div className="row">
          <label>Phone Number:</label>
          <span>{phoneNumber}</span>
        </div>
        <div className="row">
          <label>Password:</label>
          <span>{password}</span>
        </div>
        <div className="row">
          <label>Status:</label>
          <span>{status}</span>
        </div>
        <div className="row">
          <label>Category:</label>
          <span>{category}</span>
        </div>
        <div className="row">
          <label>Role:</label>
          <span>{role}</span>
        </div>
        <div className="row">
          <label>Business Type:</label>
          <span>{businessType}</span>
        </div>
        <div className="row">
          <label>Business Name:</label>
          <span>{businessName}</span>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
