import { CircularProgress } from "@mui/material"

const PageLoading = () => {
  return (
    <div
      style={{
        display: "flex",
        height: "100vh",
        width: "100vw",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div>
        <span>
          <CircularProgress size={80} />
        </span>
      </div>
    </div>
  )
}

export default PageLoading
