"use client";

import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { login, signUp } from "@/utils/api";
import { toast } from "react-toastify";
import { UserContext } from "@/store/User_Context";

const AccountForm = () => {
  const { signInHandler } = useContext(UserContext);
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      phoneNumber: "2589637410",
      password: "App1234",
    },
  });

  const [isCreatingAccount, setIsCreatingAccount] = useState(false);
  const [businessType, setBusinessType] = useState(null);

  useEffect(() => {
    reset();
    if (loading) {
      setLoading(false);
    }
  }, [isCreatingAccount]);

  const toggleForm = () => {
    setIsCreatingAccount((pre) => !pre);
  };

  const onSubmit = async (data) => {
    if (!businessType && isCreatingAccount)
      return toast.warn("Please choose business type!!!");
    const { email, password, businessName, phoneNumber, firstName, lastName } =
      data;
    if (!password || !phoneNumber) return;
    setLoading(true);

    let res;
    if (!isCreatingAccount) {
      res = await login({ id: phoneNumber, password });
    } else if (isCreatingAccount) {
      res = await signUp({
        firstName,
        lastName,
        email,
        password,
        phoneNumber,
        industrySegment: businessName,
        orgnazation: businessType,
      });
      sessionStorage.setItem("isNew", true);
    }
    const parseData = res.data || { success: false, data: "testing" };
    if (parseData.success) {
      toast.success(
        isCreatingAccount
          ? "Account Created Successfully"
          : "Logged In. Redirecting to the Dashboard... "
      );
      window.location = "/dashboard";
      signInHandler(parseData.data, parseData.token);
    } else {
      toast.error(parseData.data);
    }
    setLoading(false);
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <h3>
          {isCreatingAccount == false
            ? "New Insights almost every day!"
            : "Complete Your Profile for the right insights."}
        </h3>
        {isCreatingAccount && (
          <div className="signUp">
            <div data-state={isCreatingAccount} className="flex-column">
              <label htmlFor="firstName">First Name</label>
              <input
                {...register("firstName", {
                  required: "First Name is required",
                  maxLength: {
                    value: 15,
                    message: "First Name cannot exceed 15 characters",
                  },
                  pattern: {
                    value: /^[A-Z][a-zA-Z]*$/,
                    message:
                      "First Name must start with an uppercase letter and can only contain letters (uppercase and lowercase)",
                  },
                })}
                id="firstName"
                type="text"
              />

              {errors.firstName && (
                <span
                  style={{ fontSize: ".7rem", fontWeight: "700", color: "red" }}
                >
                  {errors.firstName.message || "Validation Error"}
                </span>
              )}
            </div>
            <div data-state={isCreatingAccount} className="flex-column">
              <label htmlFor="lastName">Last Name</label>
              <input
                {...register("lastName", {
                  required: "Last Name is required",
                  maxLength: {
                    value: 15,
                    message: "Last Name cannot exceed 15 characters",
                  },
                  pattern: {
                    value: /^[A-Z][a-zA-Z]*$/,
                    message:
                      "Last Name must start with an uppercase letter and can only contain letters (uppercase and lowercase)",
                  },
                })}
                id="lastName"
                type="text"
              />
              {errors.lastName && (
                <span
                  style={{ fontSize: ".7rem", fontWeight: "700", color: "red" }}
                >
                  {errors.lastName.message || "Validation Error"}
                </span>
              )}
            </div>
            <div data-state={isCreatingAccount} className="flex-column">
              <label htmlFor="email">Email Address</label>
              <input
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                    message: "Please enter a valid email address",
                  },
                })}
                id="email"
                type="email"
              />
              {errors.email && (
                <span
                  style={{ fontSize: ".7rem", fontWeight: "700", color: "red" }}
                >
                  {errors.email.message || "Validation Error"}
                </span>
              )}
            </div>

            <div data-state={isCreatingAccount} className="flex-column">
              <label htmlFor="businessName">Business Name</label>
              <input
                {...register("businessName", {
                  required: "Business Name is required",
                  maxLength: {
                    value: 30,
                    message: "Length cannot exceed 30 characters",
                  },
                })}
                id="businessName"
                type="text"
              />
              {errors.businessName && (
                <span
                  style={{ fontSize: ".7rem", fontWeight: "700", color: "red" }}
                >
                  {errors.businessName.message || "Validation Error"}
                </span>
              )}
            </div>
          </div>
        )}
        <div className="flex-column">
          <label htmlFor="phoneNumber">Your Mobile Number</label>
          <input
            {...register("phoneNumber", {
              required: "Phone Number is required",
              pattern: {
                value: /^\d{10}$/,
                message:
                  "Phone number must be exactly 10 digits and contain only numbers",
              },
              minLength: {
                value: 10,
                message: "Phone number must be exactly 10 digits long",
              },
              maxLength: {
                value: 10,
                message: "Phone number must be exactly 10 digits long",
              },
            })}
            id="phoneNumber"
            type="number"
          />
          {errors.phoneNumber && (
            <span
              style={{ fontSize: ".7rem", fontWeight: "700", color: "red" }}
            >
              {errors.phoneNumber.message}
            </span>
          )}
        </div>
        <div className="flex-column">
          <label htmlFor="password">Password</label>
          <input
            {...register("password", {
              value: true,
              required: "Password is required",
              pattern: {
                value: /^[A-Z][^\s]{5,}$/,
                message: "First Character must be a uppercase letter",
              },
              minLength: {
                value: 6,
                message: "Required minimum 6 digit number ",
              },
              maxLength: {
                value: 30,
                message: "Length cannot exceed 30 characters",
              },
            })}
            id="password"
            type="password"
          />
          {errors.password && (
            <span
              style={{ fontSize: ".7rem", fontWeight: "700", color: "red" }}
            >
              {errors.password.message || "Validation Error"}
            </span>
          )}
        </div>
        {!isCreatingAccount && (
          <div className="forgot">
            <p>forgot password? </p>
          </div>
        )}

        {isCreatingAccount && (
          <div data-state={isCreatingAccount} className="radio-btn">
            <div className="box">
              <svg
                onClick={() => {
                  setBusinessType("Restaurant");
                }}
                width="70"
                height="70"
                viewBox="0 0 89 89"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M23.8439 21.7568L64.964 62.877C65.7443 63.6572 66.1826 64.7155 66.1826 65.819C66.1826 66.9224 65.7443 67.9807 64.964 68.761C64.1836 69.5409 63.1254 69.9791 62.022 69.9791C60.9186 69.9791 59.8604 69.5409 59.08 68.761L49.0352 58.5432C48.3778 57.8757 48.0091 56.9766 48.0084 56.0398V55.4226C48.0085 54.9496 47.9146 54.4812 47.7322 54.0448C47.5498 53.6083 47.2825 53.2124 46.9459 52.8801L45.649 51.6826C45.2087 51.2763 44.6733 50.9874 44.0921 50.8423C43.5109 50.6972 42.9025 50.7006 42.323 50.8522C41.4091 51.0907 40.4487 51.0861 39.5372 50.8388C38.6256 50.5916 37.7946 50.1102 37.1265 49.4426L27.5917 39.9067C21.9354 34.2504 19.8539 25.7089 23.8439 21.7568Z"
                  stroke={
                    businessType == "Restaurant"
                      ? "var(--star-color)"
                      : "#DCDCDC"
                  }
                  strokeWidth="3"
                  strokeLinejoin="round"
                />
                <path
                  d="M62.0715 20L53.4497 28.6218C52.7862 29.2851 52.26 30.0726 51.9009 30.9393C51.5418 31.8061 51.357 32.7351 51.357 33.6732V35.3317C51.3571 35.5664 51.3109 35.7987 51.221 36.0155C51.1312 36.2323 50.9996 36.4293 50.8336 36.5951L49.5713 37.8574"
                  stroke={
                    businessType == "Restaurant"
                      ? "var(--star-color)"
                      : "#DCDCDC"
                  }
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M53.1426 41.4289L54.4049 40.1666C54.5707 40.0006 54.7677 39.869 54.9845 39.7792C55.2013 39.6893 55.4336 39.6431 55.6683 39.6432H57.3268C58.265 39.6432 59.1939 39.4584 60.0607 39.0993C60.9274 38.7402 61.7149 38.214 62.3782 37.5505L71 28.9287"
                  stroke={
                    businessType == "Restaurant"
                      ? "var(--star-color)"
                      : "#DCDCDC"
                  }
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M66.5352 24.4644L57.6064 33.3931"
                  stroke={
                    businessType == "Restaurant"
                      ? "var(--star-color)"
                      : "#DCDCDC"
                  }
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M39.7494 57.501L28.6197 68.6931C27.7825 69.5301 26.6472 70.0002 25.4634 70.0002C24.2796 70.0002 23.1443 69.5301 22.3071 68.6931C21.4702 67.8559 21 66.7206 21 65.5368C21 64.353 21.4702 63.2177 22.3071 62.3805L31.7135 53.0366"
                  stroke={
                    businessType == "Restaurant"
                      ? "var(--star-color)"
                      : "#DCDCDC"
                  }
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              {businessType == "Restaurant" && (
                <i
                  id="check1"
                  style={{ color: "var(--star-color)" }}
                  className="pi pi-check-circle"
                ></i>
              )}
            </div>
            <div data-name="Restaurant" className="box">
              <svg
                onClick={() => {
                  setBusinessType("Shopping");
                }}
                width="70"
                height="70"
                viewBox="0 0 89 89"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M32.7676 32.962V31.6695C32.7676 25.2478 37.7154 20 43.8779 20C50.0404 20 54.9882 25.2478 54.9882 31.6695V32.9657H62.5728C63.0315 32.9662 63.4738 33.1369 63.8138 33.4448C64.1539 33.7527 64.3675 34.1758 64.4134 34.6322L67.7465 67.9631C67.7723 68.2205 67.744 68.4804 67.6633 68.7261C67.5826 68.9718 67.4513 69.1979 67.2779 69.3898C67.1045 69.5817 66.8929 69.7351 66.6565 69.8402C66.4202 69.9453 66.1645 69.9997 65.9059 70H21.8499C21.5913 69.9997 21.3355 69.9453 21.0992 69.8402C20.8629 69.7351 20.6512 69.5817 20.4778 69.3898C20.3044 69.1979 20.1732 68.9718 20.0925 68.7261C20.0118 68.4804 19.9834 68.2205 20.0093 67.9631L23.3424 34.6322C23.3882 34.1758 23.6019 33.7527 23.942 33.4448C24.282 33.1369 24.7242 32.9662 25.183 32.9657H32.7676V32.962ZM36.471 32.962H51.2847V31.6695C51.2847 27.2476 47.9443 23.7034 43.8779 23.7034C39.8115 23.7034 36.471 27.2476 36.471 31.6695V32.9657V32.962ZM32.7676 36.6654H26.8606L23.8979 66.2929H63.8579L60.8914 36.6654H54.9882V42.2206C54.9882 42.7117 54.7931 43.1827 54.4458 43.5299C54.0986 43.8772 53.6276 44.0723 53.1365 44.0723C52.6454 44.0723 52.1744 43.8772 51.8271 43.5299C51.4798 43.1827 51.2847 42.7117 51.2847 42.2206V36.6654H36.471V42.2206C36.471 42.7117 36.2759 43.1827 35.9287 43.5299C35.5814 43.8772 35.1104 44.0723 34.6193 44.0723C34.1282 44.0723 33.6572 43.8772 33.31 43.5299C32.9627 43.1827 32.7676 42.7117 32.7676 42.2206V36.6654Z"
                  fill={
                    businessType == "Shopping" ? "var(--star-color)" : "#DCDCDC"
                  }
                />
              </svg>
              {businessType == "Shopping" && (
                <i
                  id="check2"
                  style={{ color: "var(--star-color)" }}
                  className="pi pi-check-circle"
                ></i>
              )}
            </div>
          </div>
        )}

        {loading ? (
          <button className="start " type="button" disabled={true}>
            {" "}
            <i
              style={{ fontSize: "1.5rem" }}
              className="pi pi-spin pi-spinner"
            ></i>
          </button>
        ) : (
          <button className="start" type="submit">
            {isCreatingAccount ? "Create Account" : "Log In"}
          </button>
        )}
        <button onClick={toggleForm} type="button" className="link">
          {!isCreatingAccount ? "Create Account" : "Login?"}
        </button>
      </form>
    </>
  );
};

export default AccountForm;
