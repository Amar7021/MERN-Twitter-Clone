import { useEffect, useState } from "react"
import twitterImage from "../../assets/images/New-Twitter-Logo.png"
import auth from "../../firebase.init"
import {
  useCreateUserWithEmailAndPassword,
  useSignInWithEmailAndPassword,
  useSignInWithGoogle,
} from "react-firebase-hooks/auth"
import { Close } from "@mui/icons-material"
import GoogleButton from "react-google-button"
import Input from "./Input"
import API from "../../services/helper"
import { useNavigate } from "react-router-dom"
import "./Login.css"

const initialData = { username: "", name: "", email: "", password: "" }

const Login = () => {
  const [formData, setFormData] = useState(initialData)
  const [isSignup, setIsSignup] = useState(false)
  const [isPassword, setIsPassword] = useState(false)
  const navigate = useNavigate()

  const [
    createUserWithEmailAndPassword,
    SignupUser,
    SignupLoading,
    SignupError,
  ] = useCreateUserWithEmailAndPassword(auth)

  const [
    signInWithEmailAndPassword,
    loggedinUser,
    loggedinLoading,
    loggedinError,
  ] = useSignInWithEmailAndPassword(auth)

  const [signInWithGoogle, googleUser, googleLoading, googleError] =
    useSignInWithGoogle(auth)

  useEffect(() => {
    if (SignupUser || loggedinUser || googleUser) {
      navigate("/")
    }
  }, [SignupUser, loggedinUser, googleUser])

  // handle Change
  const handleChange = (e) => {
    const { value, name } = e.target
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }))
  }

  // handle Signup & login
  const handleSubmit = (e) => {
    e.preventDefault()
    if (isSignup) {
      createUserWithEmailAndPassword(formData.email, formData.password)
      const user = {
        username: formData.username,
        name: formData.name,
        email: formData.email,
      }

      API.post(`/register`, user)
    } else {
      signInWithEmailAndPassword(formData.email, formData.password)
    }
  }

  // handle google sign in
  const handleGoogleSignIn = () => {
    signInWithGoogle()
  }

  // handle switch mode
  const switchMode = () => {
    setIsSignup((prev) => !prev)
  }

  // const toggle password
  const togglePassword = () => {
    setIsPassword((prev) => !prev)
  }

  return (
    <div className="auth-container">
      <div className="auth-wrapper">
        <div className="image-container">
          <span
            className="close-icon"
            title="close"
          >
            <Close
              onClick={() => navigate("/auth")}
              className="close-btn"
            />
          </span>
          <img
            src={twitterImage}
            alt=""
            className="logo"
          />
        </div>
        <div className="form-container">
          {isSignup ? (
            <h1 className="heading">Join X today</h1>
          ) : (
            <h1 className="heading">Sign in to X</h1>
          )}
          <div className="socialLogin">
            <GoogleButton
              type="light"
              className="g-btn"
              onClick={handleGoogleSignIn}
            />
          </div>
          <div className="or">
            <span>or</span>
          </div>
          <form
            onSubmit={handleSubmit}
            className="auth-form"
          >
            {isSignup ? (
              <>
                <Input
                  type="text"
                  className="display-name"
                  placeholder="@username"
                  name="username"
                  value={formData.username}
                  handleChange={handleChange}
                />
                <Input
                  type="text"
                  className="display-name"
                  placeholder="Enter full name"
                  name="name"
                  value={formData.name}
                  handleChange={handleChange}
                />
                <Input
                  type="email"
                  placeholder="Email address"
                  name="email"
                  value={formData.email}
                  handleChange={handleChange}
                />
                <div className="password-input">
                  <Input
                    type={isPassword ? "text" : "password"}
                    placeholder="Password"
                    maxLength={20}
                    name="password"
                    value={formData.password}
                    handleChange={handleChange}
                  />
                  <span
                    className="toggle-password"
                    onClick={togglePassword}
                  >
                    {isPassword ? "Hide" : "Show"}
                  </span>
                </div>
              </>
            ) : (
              <>
                <Input
                  type="email"
                  placeholder="Email address"
                  name="email"
                  value={formData.email}
                  handleChange={handleChange}
                />
                <div className="password-input">
                  <Input
                    type={isPassword ? "text" : "password"}
                    placeholder="Password"
                    maxLength={20}
                    name="password"
                    value={formData.password}
                    handleChange={handleChange}
                  />
                  <span
                    className="toggle-password"
                    onClick={togglePassword}
                  >
                    {isPassword ? "Hide" : "Show"}
                  </span>
                </div>
              </>
            )}
            <div className="auth-btn">
              <button
                type="submit"
                className="btn"
              >
                {isSignup ? "Sign up" : "Login"}
              </button>
            </div>
          </form>
          {isSignup ? (
            <p className="auth-confirm">
              Already have an account?{" "}
              <span
                onClick={switchMode}
                className="confirm-btn"
              >
                {isSignup ? "Login" : "Sign up"}
              </span>
            </p>
          ) : (
            <p className="auth-confirm">
              Don't have an account?{" "}
              <span
                onClick={switchMode}
                className="confirm-btn"
              >
                {isSignup ? "Login" : "Sign up"}
              </span>
            </p>
          )}
        </div>
      </div>
    </div>
  )
}

export default Login
