import { useForm } from "react-hook-form";
import "./styles.scss";
import { forgotPasswordEmailSend } from "@/utils/api";
import { toast } from "react-toastify";
import { useState } from "react";
const ForgotPassword = () => {
  const [isEmailSent, setIsEmailSent] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (data) => {
    const { email } = data;
    if (email == "" || isLoading) return toast.error("Email is required");
    try {
      setIsLoading(true);
      const response = await forgotPasswordEmailSend({ email });
      if (response.data.success === true) {
        toast.success(response.data.data);
        setIsEmailSent(true);
      } else {
        toast.error(response.data.data);
        setIsEmailSent(false);
      }
    } catch (error) {
      setIsEmailSent(false);
      toast.error(error.message);
    }
    setIsLoading(false);
  };
  if (isEmailSent === true) {
    return (
      <div className="NewPassword">
        <h1>Email sent successfully</h1>
        <p>Please check your email for further instructions</p>
        <p>
          Your token will <strong>expire in 10 minutes</strong>. Please complete
          the necessary actions within this time frame.
        </p>
      </div>
    );
  }

  return (
    <div className="NewPassword">
      <h2>Forgot Password</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex-column">
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
            type="text"
          />
          {errors.email && (
            <span
              style={{ fontSize: ".7rem", fontWeight: "700", color: "red" }}
            >
              {errors.email.message || "Validation Error"}
            </span>
          )}
        </div>
        <button type="submit">
          {isLoading ? (
            <i className="pi pi-spin pi-spinner"></i>
          ) : (
            "Send Reset Link"
          )}
        </button>
      </form>
    </div>
  );
};

export default ForgotPassword;
