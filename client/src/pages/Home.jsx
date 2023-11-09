import Widgets from "./Widgets/Widgets"
import Sidebar from "./Sidebar/Sidebar"
import { useAuthState } from "react-firebase-hooks/auth"
import auth from "../firebase.init"
import { signOut } from "firebase/auth"
import { Outlet } from "react-router-dom"

const Home = () => {
  const user = useAuthState(auth)

  // handle Logout
  const handleLogout = () => signOut(auth)

  return (
    <div
      style={{
        display: "flex",
        height: "100vh",
        width: "1300px",
        marginLeft: "auto",
        marginRight: "auto",
        backgroundColor: "#fff",
        color: "rgb(0, 0, 0)",
      }}
    >
      <Sidebar
        handleLogout={handleLogout}
        user={user}
      />
      <Outlet />
      <Widgets />
    </div>
  )
}

export default Home
