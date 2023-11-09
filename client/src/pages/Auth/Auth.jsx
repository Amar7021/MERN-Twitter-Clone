import { useEffect } from "react"
import twitterImage from "../../assets/images/New-Twitter-Logo.png"
import GoogleButton from "react-google-button"
import { useSignInWithGoogle } from "react-firebase-hooks/auth"
import auth from "../../firebase.init"
import { useNavigate } from "react-router-dom"
import "./Auth.css"

const Auth = () => {
  const navigate = useNavigate()

  const [signInWithGoogle, googleUser, googleLoading, googleError] =
    useSignInWithGoogle(auth)

  useEffect(() => {
    if (googleUser) {
      navigate("/")
    }
  }, [googleUser, navigate])

  // handle google sign in
  const handleGoogleSignIn = () => {
    signInWithGoogle()
  }

  return (
    <div className="auth">
      <div className="image-container">
        <img
          src={twitterImage}
          alt=""
        />
      </div>
      <div className="auth-box">
        <div className="social-auth-container">
          <h1 className="top-heading">Happening now</h1>
          <h3 className="sub-heading ">Join today.</h3>
          <div className="social-auth-wrapper">
            <div className="social-btn">
              <GoogleButton
                type="light"
                className="google-btn"
                onClick={handleGoogleSignIn}
              />
            </div>
            <div className="or">
              <span>or</span>
            </div>
            <div className="signup-btn">
              <button
                type="submit"
                className="btn"
                onClick={() => navigate("/auth/signup")}
              >
                Create account
              </button>
              <h6 className="terms">
                By signing up, you agree to the <span>Terms of Service</span>{" "}
                and <span>Privacy Policy</span>, including{" "}
                <span>Cookie Use.</span>
              </h6>
            </div>
            <p className="account-confirm">Already have an account?</p>
            <button
              onClick={() => navigate("/auth/login")}
              className="modal-btn"
            >
              Sign in
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Auth
