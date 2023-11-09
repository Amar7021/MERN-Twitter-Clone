import { Link, useNavigate } from "react-router-dom"
import twitterImage from "../../assets/images/New-Twitter-Logo.png"
import "./NoMatch.css"

const NoMatch = () => {
  const navigate = useNavigate()

  return (
    <div className="noMatch">
      <div className="noMatch-wrapper">
        <Link to="/">
          <img
            className="twitter-logo"
            title="Twitter Logo"
            src={twitterImage}
            alt=""
          />
        </Link>
      </div>
      <div className="error-page">
        <p className="error-msg">
          Hmm...this page doesn’t exist. Go back to home.
        </p>
        <button
          className="home-btn"
          onClick={() => navigate("/")}
        >
          Twitter Home
        </button>
      </div>
    </div>
  )
}

export default NoMatch
