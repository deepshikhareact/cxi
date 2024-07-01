import { useState } from "react"

// eslint-disable-next-line react/prop-types
const PasswordInput = ({ register }) => {
  const [showPassword, setShowPassword] = useState(false)

  return (
    <div className="input-area">

      <i onClick={() => setShowPassword(pre => !pre)} className={showPassword ? "pi pi-eye" : "pi pi-eye-slash"}></i>
      <input
        {...register("password", {
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
        type={showPassword ? "text" : "password"}
      />

    </div>
  )
}

export default PasswordInput