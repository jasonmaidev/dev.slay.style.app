import { useMediaQuery, Box } from "@mui/material"
import SetApparelButton from "components/SetApparelButton"

const MobileApparelWidget = ({
  apparelId,
  apparelUserId,
  name,
  description,
  picturePath,
  section,
  colors,
  category,
  occasions,
  brand,
  own,
  handleApparelDialogClose
}) => {
  const isNonMobileScreens = useMediaQuery("(min-width:1000px) and (max-height:2160px)")

  return (
    <Box width={isNonMobileScreens ? "24%" : "48%"}>
      <SetApparelButton
        picturePath={picturePath}
        apparelId={apparelId}
        handleApparelDialogClose={handleApparelDialogClose}
      />
    </Box>
  )
}

export default MobileApparelWidget












