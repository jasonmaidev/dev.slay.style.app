import { useSelector } from "react-redux"
import { IoClose } from "react-icons/io5"
import { useQuery } from "@tanstack/react-query"
import { Box, Typography, IconButton, useMediaQuery } from "@mui/material"
import ThumbnailsContainer from "./ThumbnailsContainer"
import FlexBetweenBox from "components/FlexBetweenBox"
import MobileApparelWidget from "views/widgets/MobileApparelWidget"

const MobileApparelSelectDialog = ({ handleApparelDialogClose }) => {
  const isSmallMobileScreens = useMediaQuery("(max-width:800px) and (max-height:800px)")
  const isNonMobileScreens = useMediaQuery("(min-width:1000px) and (max-height:2160px)")
  const { _id } = useSelector((state) => state.user)
  const token = useSelector((state) => state.token)
  const sortBySection = useSelector((state) => state.sortBySection)

  const sectionTitle = (sortBySection) => {
    switch (sortBySection) {
      case "headwear":
        return "Hats, Beanies, & Headbands"
      case "shorttops":
        return "Short Sleeve Tops"
      case "longtops":
        return "Long Sleeve Tops"
      case "outerwear":
        return "Outer Shirts & Jackets"
      case "onepiece":
        return "Dresses, Rompers & Jumpsuits"
      case "pants":
        return "Pants, Trousers, & Long Skirts"
      case "shorts":
        return "Shorts & Skirts"
      case "footwear":
        return "Footwear"
      default:
        return "test"
    }
  }
  const title = sectionTitle(sortBySection)

  const getSectionedApparels = () => {
    return fetch(`http://localhost:3001/apparels/${_id}/${sortBySection}`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
  }

  const { data: sectionedData } = useQuery(["sectionedApparelsData", sortBySection], getSectionedApparels)

  return (
    <Box margin={"0.5rem 1rem 1rem 1rem"}>
      <FlexBetweenBox>
        <Typography
          variant={isSmallMobileScreens ? "h6" : isNonMobileScreens ? "h4" : "h5"}
          fontWeight={600}
        >
          {title}
        </Typography>
        <IconButton onClick={handleApparelDialogClose}>
          <IoClose />
        </IconButton>
      </FlexBetweenBox>
      {sectionedData ?
        <ThumbnailsContainer
          display="flex"
          flexDirection={"row"}
          alignItems={"flex-start"}
          flexWrap={"no-wrap"}
          gap={1}
          minHeight={"2rem"}
          className={isNonMobileScreens ? "apparels-content" : ""}
        >
          {sectionedData.map(({ _id, userId, name, section, description, picturePath, }) => (
            <MobileApparelWidget
              key={_id}
              apparelId={_id}
              apparelUserId={userId}
              name={name}
              section={section}
              description={description}
              picturePath={picturePath}
              userId={userId}
              handleApparelDialogClose={handleApparelDialogClose} // for mobile ApplyToStyleButton
            />
          ))}
        </ThumbnailsContainer >
        : null
      }
    </Box>
  )
}

export default MobileApparelSelectDialog