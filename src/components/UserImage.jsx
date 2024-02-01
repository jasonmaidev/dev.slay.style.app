import { Box } from "@mui/material"

const UserImage = ({ image, size = "45px" }) => {
  return (
    <Box width={size} height={size} padding={0} margin={0}>
      <img
        style={{ objectFit: "cover", borderRadius: "50%" }}
        width={size}
        height={size}
        alt="user"
        src={`https://slay-style-app.s3.us-west-1.amazonaws.com/${image}`}
      />
    </Box>
  )
}

export default UserImage