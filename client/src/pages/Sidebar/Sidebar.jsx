import SidebarOptions from "./SidebarOptions"
import {
  BookmarkBorder,
  Done,
  Home,
  ListAlt,
  MailOutline,
  More,
  MoreHoriz,
  Notifications,
  PermIdentity,
  Search,
} from "@mui/icons-material"
import CustomeLink from "./CustomeLink"
import Divider from "@mui/material/Divider"
import Button from "@mui/material/Button"
import { Avatar } from "@mui/material"
import IconButton from "@mui/material/IconButton"
import ListItemIcon from "@mui/material/ListItemIcon"
import Menu from "@mui/material/Menu"
import MenuItem from "@mui/material/MenuItem"
import { useState } from "react"
import useLoggedInUser from "../../hooks/useLoggedInUser"
import "./Sidebar.css"

const Sidebar = ({ handleLogout, user }) => {
  const [anchorEl, setAnchorEl] = useState(null)
  const openMenu = Boolean(anchorEl)
  const [loggedInUser] = useLoggedInUser()

  const userProfilePic = loggedInUser[0]?.profileImage
    ? loggedInUser[0]?.profileImage
    : "https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png"

  const result = user[0]?.email.split("@")[0]

  const handleClick = (e) => setAnchorEl(e.currentTarget)

  const handleClose = () => setAnchorEl(null)

  return (
    <div className="sidebar">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        height="1em"
        viewBox="0 0 512 512"
        className="sidebar_twitterIcon"
      >
        <path d="M389.2 48h70.6L305.6 224.2 487 464H345L233.7 318.6 106.5 464H35.8L200.7 275.5 26.8 48H172.4L272.9 180.9 389.2 48zM364.4 421.8h39.1L151.1 88h-42L364.4 421.8z" />
      </svg>
      <CustomeLink to="/home/feed">
        <SidebarOptions
          active
          Icon={Home}
          text="Home"
        />
      </CustomeLink>
      <CustomeLink to="/home/explore">
        <SidebarOptions
          Icon={Search}
          text="Explore"
        />
      </CustomeLink>
      <CustomeLink to="/home/notifications">
        <SidebarOptions
          Icon={Notifications}
          text="Notifications"
        />
      </CustomeLink>
      <CustomeLink to="/home/messages">
        <SidebarOptions
          Icon={MailOutline}
          text="Messages"
        />
      </CustomeLink>
      <CustomeLink to="/home/bookmarks">
        <SidebarOptions
          Icon={BookmarkBorder}
          text="Bookmarks"
        />
      </CustomeLink>
      <CustomeLink to="/home/lists">
        <SidebarOptions
          Icon={ListAlt}
          text="Lists"
        />
      </CustomeLink>
      <CustomeLink to="/home/profile">
        <SidebarOptions
          Icon={PermIdentity}
          text="Profile"
        />
      </CustomeLink>
      <CustomeLink to="/home/more">
        <SidebarOptions
          Icon={More}
          text="More"
        />
      </CustomeLink>

      <Button
        variant="outlined"
        className="sidebar_tweet"
      >
        Tweet
      </Button>
      <div className="Profile_info">
        <Avatar src={userProfilePic} />
        <div className="user_info">
          <h4>
            {loggedInUser[0]?.name
              ? loggedInUser[0]?.name
              : user && user[0]?.displayName}
          </h4>
          <h5>@{result}</h5>
        </div>
        <IconButton
          size="small"
          sx={{ ml: 2 }}
          aria-controls={openMenu ? "basic-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={openMenu ? "true" : undefined}
          onClick={handleClick}
        >
          <MoreHoriz />
        </IconButton>
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={openMenu}
          onClick={handleClose}
          onClose={handleClose}
        >
          <MenuItem className="Profile_info1">
            <Avatar src={userProfilePic} />
            <div className="user_info subUser_info">
              <div>
                <h4>
                  {loggedInUser[0]?.name
                    ? loggedInUser[0]?.name
                    : user && user[0]?.displayName}
                </h4>
                <h5>@{result}</h5>
              </div>
              <ListItemIcon
                className="done__icon"
                color="blue"
              >
                <Done className="done_icon" />
              </ListItemIcon>
            </div>
          </MenuItem>
          <Divider />
          <MenuItem onClick={handleClose}>Add an existing account</MenuItem>
          <MenuItem onClick={handleLogout}>Logout @{result}</MenuItem>
        </Menu>
      </div>
    </div>
  )
}

export default Sidebar
