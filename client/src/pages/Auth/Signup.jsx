import { useEffect, useState } from "react"
import twitterImage from "../../assets/images/New-Twitter-Logo.png"
import auth from "../../firebase.init"
import {
  useSignInWithGoogle,
  useCreateUserWithEmailAndPassword,
} from "react-firebase-hooks/auth"
import { Close } from "@mui/icons-material"
import GoogleButton from "react-google-button"
import Input from "./Input"
import { useNavigate } from "react-router-dom"
import API from "../../services/helper"
import "./Login.css"

const initialData = { username: "", name: "", email: "", password: "" }

const Signup = () => {
  const [formData, setFormData] = useState(initialData)
  const [isPassword, setIsPassword] = useState(false)
  const navigate = useNavigate()

  const [
    createUserWithEmailAndPassword,
    SignupUser,
    SignupLoading,
    SignupError,
  ] = useCreateUserWithEmailAndPassword(auth)

  const [signInWithGoogle, googleUser, googleLoading, googleError] =
    useSignInWithGoogle(auth)

  useEffect(() => {
    if (SignupUser || googleUser) {
      navigate("/")
    }
  }, [googleUser, SignupUser, navigate])

  // handle Change
  const handleChange = (e) => {
    const { value, name } = e.target
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }))
  }

  // handle signup
  const handleSubmit = (e) => {
    e.preventDefault()
    createUserWithEmailAndPassword(formData.email, formData.password)

    const user = {
      username: formData.username,
      name: formData.name,
      email: formData.email,
    }

    API.post(`/register`, user)
  }

  // handle google sign in
  const handleGoogleSignIn = () => {
    signInWithGoogle()
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
          <h1 className="heading">Join X today</h1>
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
            <div className="auth-btn">
              <button
                type="submit"
                className="btn"
              >
                Sign up
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Signup
