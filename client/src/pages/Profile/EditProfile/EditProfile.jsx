import { useState } from "react"
import { Box, IconButton, Modal, TextField } from "@mui/material"
import CloseIcon from "@mui/icons-material/Close"
import ChevronRightIcon from "@mui/icons-material/ChevronRight"
import API from "../../../services/helper"
import "./EditProfile.css"

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  height: 600,
  bgcolor: "background.paper",
  boxShadow: 24,
  borderRadius: 8,
}

function EditChild({ setDob }) {
  const [open, setOpen] = useState(false)

  const handleOpen = () => {
    setOpen(true)
  }
  const handleClose = () => {
    setOpen(false)
  }

  return (
    <>
      <div
        className="birthdate-section"
        onClick={handleOpen}
      >
        <span>Edit</span>
      </div>
      <Modal
        hideBackdrop
        open={open}
        onClose={handleClose}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
      >
        <Box sx={{ ...style, width: 300, height: 325 }}>
          <div className="text">
            <h2>Edit date of birth?</h2>
            <p>
              This can only be changed a few times. Make sure you enter the age
              of the person using the account.
            </p>
            <input
              type="date"
              onChange={(e) => setDob(e.target.value)}
            />
            <button
              className="e-button"
              onClick={() => {
                setOpen(false)
              }}
            >
              Save
            </button>
          </div>
        </Box>
      </Modal>
    </>
  )
}

export default function EditProfile({ user, loggedInUser }) {
  const [open, setOpen] = useState(false)
  const [name, setName] = useState(false)
  const [bio, setBio] = useState(false)
  const [location, setLocation] = useState(false)
  const [website, setWebsite] = useState(false)
  const [dob, setDob] = useState(false)

  // handle save
  const handleSave = async () => {
    const editedInfo = {
      name,
      bio,
      location,
      website,
      dob,
    }
    if (editedInfo) {
      await API.patch(`/userupdates/${user?.email}`, editedInfo)
      setOpen(false)
    }
  }

  return (
    <div>
      <button
        onClick={() => {
          setOpen(true)
        }}
        className="Edit-profile-btn"
      >
        Edit profile
      </button>

      <Modal
        open={open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={style}
          className="modal"
        >
          <div className="header">
            <IconButton
              onClick={() => {
                setOpen(false)
              }}
            >
              <CloseIcon />
            </IconButton>
            <h2 className="header-title">Edit Profile</h2>
            <button
              className="save-btn"
              onClick={handleSave}
            >
              Save
            </button>
          </div>
          <form className="fill-content">
            <TextField
              className="text-field"
              fullWidth
              label="Name"
              id="fullWidth"
              variant="filled"
              inputProps={{
                maxLength: 16,
                minLength: 3,
              }}
              onChange={(e) => setName(e.target.value)}
              defaultValue={loggedInUser[0]?.name ? loggedInUser[0].name : ""}
            />
            <TextField
              className="text-field"
              fullWidth
              label="Bio"
              id="fullWidth"
              variant="filled"
              inputProps={{
                maxLength: 100,
                minLength: 3,
              }}
              onChange={(e) => setBio(e.target.value)}
              defaultValue={loggedInUser[0]?.bio ? loggedInUser[0].bio : ""}
            />
            <TextField
              className="text-field"
              fullWidth
              label="Location"
              id="fullWidth"
              variant="filled"
              inputProps={{
                minLength: 2,
              }}
              onChange={(e) => setLocation(e.target.value)}
              defaultValue={
                loggedInUser[0]?.location ? loggedInUser[0].location : ""
              }
            />
            <TextField
              className="text-field"
              fullWidth
              label="Website"
              id="fullWidth"
              variant="filled"
              inputProps={{
                minLength: 10,
              }}
              onChange={(e) => setWebsite(e.target.value)}
              defaultValue={
                loggedInUser[0]?.website ? loggedInUser[0].website : ""
              }
            />
          </form>
          <div className="birthdate-section">
            <p>Birth Date</p>
            <p>.</p>
            <EditChild
              dob={dob}
              setDob={setDob}
            />
          </div>
          <div className="last-section">
            {loggedInUser[0]?.dob ? (
              <h2>{loggedInUser[0].dob}</h2>
            ) : (
              <h2>{dob ? dob : "Add your date of birth"}</h2>
            )}
            <div className="last-btn">
              <h2>Switch to professional </h2>
              <ChevronRightIcon />
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  )
}
