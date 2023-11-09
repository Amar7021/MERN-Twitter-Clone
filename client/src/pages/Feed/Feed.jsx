import TweetBox from "./TweetBox/TweetBox"
import { useEffect, useState } from "react"
import Post from "./Post/Post"
import API from "../../services/helper"
import { CircularProgress } from "@mui/material"
import AnnouncementIcon from "@mui/icons-material/Announcement"
import "./Feed.css"

const Feed = () => {
  const [posts, setPosts] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetch = async () => {
    try {
      const response = await API.get("/post")
      setIsLoading(false)
      setPosts(response.data)
    } catch (error) {
      console.log("Error fetching posts: ", error)
      setIsLoading(false)
      setError("Network error occurred while fetching posts.")
    }
  }

  useEffect(() => {
    fetch()
  }, [posts])

  // handle refresh
  const handleRefresh = () => {
    setIsLoading(true)
    setError(null)
    fetch()
  }

  return (
    <div className="feed">
      <div className="feed_header">
        <h2>Home</h2>
      </div>
      <TweetBox />
      {isLoading ? (
        <p className="loading">
          <CircularProgress />
        </p>
      ) : error ? (
        <div className="error">
          <p className="display-error">Error: {error}</p>
          <button
            onClick={handleRefresh}
            className="refresh-btn"
          >
            Refresh
          </button>
        </div>
      ) : posts.length === 0 ? (
        <div className="announcement-box">
          <AnnouncementIcon className="announcement-icon" />
          <p className="display-tweet-msg">
            Seems like no one has tweeted yet!
            <br />
            Be the first to express!
            <br />
            Tweet it!
          </p>
        </div>
      ) : (
        posts.map((p) => (
          <Post
            key={p._id}
            p={p}
          />
        ))
      )}
    </div>
  )
}

export default Feed
