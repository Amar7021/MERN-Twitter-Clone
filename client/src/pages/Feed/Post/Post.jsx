import React from "react"
import { Avatar } from "@mui/material"
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser"
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline"
import RepeatIcon from "@mui/icons-material/Repeat"
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder"
import PublishIcon from "@mui/icons-material/Publish"
import "./Post.css"

function Post({ p }) {
  const { _id, name, username, photo, post, profilePhoto } = p

  return (
    <div
      className="post"
      key={_id}
    >
      <div className="post_avatar">
        <Avatar src={profilePhoto} />
      </div>
      <div className="post_body">
        <div className="post_header">
          <div className="post_headerText">
            <h3>
              {name}{" "}
              <span className="post_headerSpecial">
                <VerifiedUserIcon className="post_badge" /> @{username}
              </span>
            </h3>
          </div>
          <div className="post_headerDescription">
            <p>{post}</p>
          </div>
        </div>
        <img
          src={photo}
          alt=""
          width="500"
        />
        <div className="post_footer">
          <ChatBubbleOutlineIcon
            className="post_footer_icon"
            fontSize="small"
          />
          <RepeatIcon
            className="post_footer_icon"
            fontSize="small"
          />
          <FavoriteBorderIcon
            className="post_footer_icon"
            fontSize="small"
          />
          <PublishIcon
            className="post_footer_icon"
            fontSize="small"
          />
        </div>
      </div>
    </div>
  )
}

export default Post
