import { useAuthState } from "react-firebase-hooks/auth"
import auth from "../firebase.init"
import { useEffect, useState } from "react"
import API from "../services/helper"

const useLoggedInUser = () => {
  const [user] = useAuthState(auth)
  const email = user?.email
  const [loggedInUser, setLoggedInUser] = useState({})

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await API.get(`/loggedinuser?email=${email}`)
        setLoggedInUser(response.data)
      } catch (error) {
        console.log("Error fetching user:", error)
      }
    }
    fetchUser()
  }, [email, loggedInUser])

  return [loggedInUser, setLoggedInUser]
}

export default useLoggedInUser
