import { BrowserRouter, Route, Routes } from "react-router-dom"
import Home from "./pages/Home"
import Auth from "./pages/Auth/Auth"
import Signup from "./pages/Auth/Signup"
import Login from "./pages/Auth/Login"
import ProtectedRoutes from "./pages/ProtectedRoutes"
import PageLoading from "./pages/PageLoading"
import Feed from "./pages/Feed/Feed"
import Explore from "./pages/Explore/Explore"
import Notifications from "./pages/Notifications/Notifications"
import Messages from "./pages/Messages/Messages"
import Bookmarks from "./pages/Bookmarks/Bookmarks"
import Lists from "./pages/Lists/Lists"
import Profile from "./pages/Profile/Profile"
import More from "./pages/More/More"
import NoMatch from "./pages/NoMatch/NoMatch"
import "./App.css"

function App() {
  return (
    <div className="app">
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoutes>
                <Home />
              </ProtectedRoutes>
            }
          >
            <Route
              index
              element={<Feed />}
            />
          </Route>
          <Route
            path="/home"
            element={
              <ProtectedRoutes>
                <Home />
              </ProtectedRoutes>
            }
          >
            <Route
              path="feed"
              element={<Feed />}
            />
            <Route
              path="explore"
              element={<Explore />}
            />
            <Route
              path="notifications"
              element={<Notifications />}
            />
            <Route
              path="messages"
              element={<Messages />}
            />
            <Route
              path="bookmarks"
              element={<Bookmarks />}
            />
            <Route
              path="lists"
              element={<Lists />}
            />
            <Route
              path="profile"
              element={<Profile />}
            />
            <Route
              path="more"
              element={<More />}
            />
          </Route>
          <Route
            path="/auth"
            element={<Auth />}
          />
          <Route
            path="/auth/signup"
            element={<Signup />}
          />
          <Route
            path="/auth/login"
            element={<Login />}
          />
          <Route
            path="/page-loading"
            element={<PageLoading />}
          />
          <Route
            path="*"
            element={<NoMatch />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
