import { useNavigate } from "react-router-dom"
import ArrowBackIcon from "@mui/icons-material/ArrowBack"
import CenterFocusWeakIcon from "@mui/icons-material/CenterFocusWeak"
import MyLocationIcon from "@mui/icons-material/MyLocation"
import AddLinkIcon from "@mui/icons-material/AddLink"
import LockResetIcon from "@mui/icons-material/LockReset"
import useLoggedInUser from "../../../hooks/useLoggedInUser"
import { useEffect, useState } from "react"
import API from "../../../services/helper"
import axios from "axios"
import Post from "../Post/Post"
import EditProfile from "../EditProfile/EditProfile"
import { CircularProgress } from "@mui/material"
import AnnouncementIcon from "@mui/icons-material/Announcement"
import "./MainPage.css"

const MainPage = ({ user }) => {
  const [posts, setPosts] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  const [loggedInUser] = useLoggedInUser()
  const username = user?.email?.split("@")[0]
  const navigate = useNavigate()

  useEffect(() => {
    const fetch = async () => {
      try {
        setIsLoading(true)
        const response = await API.get(`/userposts?email=${user?.email}`)
        setIsLoading(false)
        setPosts(response.data)
      } catch (error) {
        console.log("Error fetching posts: ", error)
        setIsLoading(false)
        setError("Network error occurred while fetching posts.")
      }
    }
    fetch()
  }, [user?.email])

  // handle refresh
  const handleRefresh = async () => {
    setIsLoading(true)
    setError(null)

    try {
      setIsLoading(true)
      const response = await API.get(`/userposts?email=${user?.email}`)
      setIsLoading(false)
      setPosts(response.data)
    } catch (error) {
      console.log("Error fetching posts: ", error)
      setIsLoading(false)
      setError("Network error occurred while fetching posts.")
    }
  }

  // handle upload cover image
  const handleUploadCoverImage = async (e) => {
    setIsLoading(true)
    const image = e.target.files[0]
    const formData = new FormData()
    formData.set("image", image)
    try {
      const response = await axios.post(
        `https://api.imgbb.com/1/upload?key=${process.env.REACT_APP_IMG_UPLD_API_KEY}`,
        formData
      )
      const url = response.data.data.display_url

      if (url) {
        const userCoverImage = {
          email: user?.email,
          coverImage: url,
        }
        setIsLoading(false)
        await API.patch(`/userupdates/${user?.email}`, userCoverImage)
      }
    } catch (error) {
      console.log("Error uploading cover image: ", error.message)
      setIsLoading(false)
    }
  }

  // handle upload profile image
  const handleUploadProfileImage = async (e) => {
    setIsLoading(true)
    const image = e.target.files[0]
    const formData = new FormData()
    formData.set("image", image)
    try {
      const response = await axios.post(
        `https://api.imgbb.com/1/upload?key=${process.env.REACT_APP_IMG_UPLD_API_KEY}`,
        formData
      )
      const url = response.data.data.display_url

      if (url) {
        const userProfileImage = {
          email: user?.email,
          profileImage: url,
        }
        setIsLoading(false)
        await API.patch(`/userupdates/${user?.email}`, userProfileImage)
      }
    } catch (error) {
      console.log("Error uploading cover image: ", error.message)
      setIsLoading(false)
    }
  }

  return (
    <div>
      <ArrowBackIcon
        className="arrow-icon"
        onClick={() => navigate("/")}
      />
      <h4 className="heading-4">@{username}</h4>
      <div className="mainProfile">
        <div className="profile-bio">
          {
            <div>
              <div className="coverImageContainer">
                <img
                  src={
                    loggedInUser[0]?.coverImage
                      ? loggedInUser[0]?.coverImage
                      : "https://www.proactivechannel.com/Files/BrandImages/Default.jpg"
                  }
                  alt=""
                  className="coverImage"
                />
                <div className="hoverCoverImage">
                  <label
                    htmlFor="image"
                    className="imageIcon"
                  >
                    {isLoading ? (
                      <LockResetIcon className="photoIcon photoIconDisabled" />
                    ) : (
                      <CenterFocusWeakIcon className="photoIcon" />
                    )}
                  </label>
                  <div className="imageIcon_tweetButton">
                    <input
                      type="file"
                      id="image"
                      className="imageInput"
                      onChange={handleUploadCoverImage}
                    />
                  </div>
                </div>
              </div>
              <div className="avatar-image">
                <div className="avatarContainer">
                  <img
                    src={
                      loggedInUser[0]?.profileImage
                        ? loggedInUser[0]?.profileImage
                        : "https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png"
                    }
                    alt=""
                    className="avatar"
                  />

                  <div className="hoverAvatarImage">
                    <div className="imageIcon_tweetButton">
                      <label
                        htmlFor="profileImage"
                        className="imageIcon"
                      >
                        {isLoading ? (
                          <LockResetIcon className="photoIcon photoIconDisabled" />
                        ) : (
                          <CenterFocusWeakIcon className="photoIcon" />
                        )}
                      </label>
                      <div className="imageIcon_tweetButton">
                        <input
                          type="file"
                          id="profileImage"
                          className="imageInput"
                          onChange={handleUploadProfileImage}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="userInfo">
                  <div>
                    <h3 className="heading-3">
                      {loggedInUser[0]?.name
                        ? loggedInUser[0]?.name
                        : user && user?.displayName}
                    </h3>
                    <p className="usernameSection">@{username}</p>
                  </div>
                  <EditProfile
                    user={user}
                    loggedInUser={loggedInUser}
                  />
                </div>
                <div className="infoContainer">
                  {loggedInUser[0]?.bio ? loggedInUser[0]?.bio : ""}
                  <div className="locationAndLink">
                    {loggedInUser[0]?.location ? (
                      <p className="subInfo">
                        <MyLocationIcon />
                        {loggedInUser[0]?.location}
                      </p>
                    ) : (
                      ""
                    )}
                    {loggedInUser[0]?.website ? (
                      <p className="subInfo link">
                        <AddLinkIcon />
                        {loggedInUser[0]?.website}
                      </p>
                    ) : (
                      ""
                    )}
                  </div>
                </div>
                <h4 className="tweetsText">Tweets</h4>
                <hr />
              </div>
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
                    You have not tweeted anything that can be displayed here!
                    <br />
                    Who's stopping you from expressing?
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
          }
        </div>
      </div>
    </div>
  )
}

export default MainPage
