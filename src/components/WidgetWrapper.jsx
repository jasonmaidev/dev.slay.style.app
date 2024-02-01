import { Box } from "@mui/material"
import { styled } from "@mui/system"

const WidgetWrapper = styled(Box)(({ theme }) => ({
  padding: "0.5rem 0.5rem 1rem 0.5rem",
  backgroundColor: theme.palette.background.alt,
  borderRadius: "1rem",
}))

export default WidgetWrapper