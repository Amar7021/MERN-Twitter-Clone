import { useState } from "react"
import { Avatar, Button } from "@mui/material"
import AddPhotoAlternateOutlinedIcon from "@mui/icons-material/AddPhotoAlternateOutlined"
import axios from "axios"
import useLoggedInUser from "../../../hooks/useLoggedInUser"
import { useAuthState } from "react-firebase-hooks/auth"
import auth from "../../../firebase.init"
import API from "../../../services/helper"
import "./TweetBox.css"

const TweetBox = () => {
  const [post, setPost] = useState("")
  const [imageURL, setImageURL] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [name, setName] = useState("")
  const [username, setUsername] = useState("")
  const [loggedInUser] = useLoggedInUser()
  const [user] = useAuthState(auth)
  const email = user?.email

  const userProfilePic = loggedInUser[0]?.profileImage
    ? loggedInUser[0]?.profileImage
    : "https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png"

  // handle image upload
  const handleUploadImage = async (e) => {
    try {
      setIsLoading(true)
      const image = e.target.files[0]
      const formData = new FormData()
      formData.set("image", image)

      const response = await axios.post(
        "https://api.imgbb.com/1/upload?key=3c7bb2e14049b95ba492537204da8a6b",
        formData
      )
      setImageURL(response.data.data.display_url)
      setIsLoading(false)
    } catch (error) {
      console.log("Error uploading image: ", error)
      setIsLoading(false)
    }
  }

  // handle tweet
  const handleTweet = async (e) => {
    e.preventDefault()
    try {
      if (user.providerData[0].providerId === "password") {
        const response = await API.get(`/loggedinuser?email=${email}`)
        setName(response.data[0]?.name)
        setUsername(response.data[0]?.username)
      } else {
        setName(user?.displayName)
        setUsername(email?.split("@")[0])
      }

      if (name) {
        const userPost = {
          profilePhoto: userProfilePic,
          post: post,
          photo: imageURL,
          username: username,
          name: name,
          email: email,
        }
        setPost("")
        setImageURL("")

        await API.post(`/post`, userPost)
      }
    } catch (error) {
      console.log("Error posting tweet: ", error)
    }
  }

  return (
    <div className="tweetBox">
      <form onSubmit={handleTweet}>
        <div className="tweetBox_input">
          <Avatar src={userProfilePic} />
          <textarea
            type="text"
            placeholder="What's happening?"
            onChange={(e) => setPost(e.target.value)}
            value={post}
            required
            className="tweet-area"
            maxLength={700}
            minLength={2}
          />
        </div>
        <div className="imageIcon_tweetButton">
          <label
            htmlFor="image"
            className="imageIcon"
          >
            {isLoading ? (
              <p>Uploading Image</p>
            ) : (
              <p>
                {imageURL ? (
                  "Image Uploaded"
                ) : (
                  <AddPhotoAlternateOutlinedIcon />
                )}
              </p>
            )}
          </label>
          <input
            type="file"
            id="image"
            className="imageInput"
            onChange={handleUploadImage}
          />
          <Button
            className="tweetBox_tweetButton"
            type="submit"
          >
            Tweet
          </Button>
        </div>
      </form>
    </div>
  )
}

export default TweetBox
