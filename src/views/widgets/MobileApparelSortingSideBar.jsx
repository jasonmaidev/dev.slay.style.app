import { Box, useMediaQuery, IconButton, useTheme } from "@mui/material"
import { useDispatch } from "react-redux"
import { setSortBySection } from "state"
import {
  GiBilledCap,
  GiPoloShirt,
  GiShirt,
  GiMonclerJacket,
  GiLargeDress,
  GiArmoredPants,
  GiUnderwearShorts,
  GiConverseShoe
} from "react-icons/gi"

const MobileApparelSortingSideBar = ({ updateApparelsDialogOpen }) => {
  const isSmallMobileScreens = useMediaQuery("(max-width:800px) and (max-height:800px)")
  const { palette } = useTheme()
  const dispatch = useDispatch()

  const handleViewHeadwearApparels = () => {
    dispatch(setSortBySection({ sortBySection: "headwear" }))
    updateApparelsDialogOpen(true)
  }
  const handleViewShortTopsApparels = () => {
    dispatch(setSortBySection({ sortBySection: "shorttops" }))
    updateApparelsDialogOpen(true)
  }
  const handleViewLongTopsApparels = () => {
    dispatch(setSortBySection({ sortBySection: "longtops" }))
    updateApparelsDialogOpen(true)
  }
  const handleViewOuterwearApparels = () => {
    dispatch(setSortBySection({ sortBySection: "outerwear" }))
    updateApparelsDialogOpen(true)
  }
  const handleViewOnePieceApparels = () => {
    dispatch(setSortBySection({ sortBySection: "onepiece" }))
    updateApparelsDialogOpen(true)
  }
  const handleViewPantsApparels = () => {
    dispatch(setSortBySection({ sortBySection: "pants" }))
    updateApparelsDialogOpen(true)
  }
  const handleViewShortsApparels = () => {
    dispatch(setSortBySection({ sortBySection: "shorts" }))
    updateApparelsDialogOpen(true)
  }
  const handleViewFootwearApparels = () => {
    dispatch(setSortBySection({ sortBySection: "footwear" }))
    updateApparelsDialogOpen(true)
  }

  return (
    <Box
      display={"flex"}
      flexDirection={"column"}
      flexBasis={isSmallMobileScreens ? "4%" : "8%"}
      justifyContent={"center"}
      m={isSmallMobileScreens ? "1rem 0.5rem 3rem 0.5rem" : "1rem 0"}
      p={isSmallMobileScreens ? "0.25rem" : "0.5rem 0.25rem"}
      gap={0}
      zIndex={10}
      borderRadius={10}
      border={`solid 1px ${palette.neutral.light}`}
    >
      <IconButton sx={{ padding: "4px 8px" }} onClick={handleViewHeadwearApparels}>
        <GiBilledCap size={isSmallMobileScreens ? "1.4rem" : "1.25rem"} />
      </IconButton>
      <IconButton sx={{ padding: "4px 8px" }} onClick={handleViewShortTopsApparels}>
        <GiPoloShirt size={isSmallMobileScreens ? "1.4rem" : "1.25rem"} />
      </IconButton>
      <IconButton sx={{ padding: "4px 8px" }} onClick={handleViewLongTopsApparels}>
        <GiShirt size={isSmallMobileScreens ? "1.4rem" : "1.25rem"} />
      </IconButton>
      <IconButton sx={{ padding: "4px 8px" }} onClick={handleViewOuterwearApparels}>
        <GiMonclerJacket size={isSmallMobileScreens ? "1.4rem" : "1.25rem"} />
      </IconButton>
      <IconButton sx={{ padding: "4px 8px" }} onClick={handleViewOnePieceApparels}>
        <GiLargeDress size={isSmallMobileScreens ? "1.4rem" : "1.25rem"} />
      </IconButton>
      <IconButton sx={{ padding: "4px 8px" }} onClick={handleViewPantsApparels}>
        <GiArmoredPants size={isSmallMobileScreens ? "1.4rem" : "1.25rem"} />
      </IconButton>
      <IconButton sx={{ padding: "4px 8px" }} onClick={handleViewShortsApparels}>
        <GiUnderwearShorts size={isSmallMobileScreens ? "1.4rem" : "1.25rem"} />
      </IconButton>
      <IconButton sx={{ padding: "4px 8px" }} onClick={handleViewFootwearApparels}>
        <GiConverseShoe size={isSmallMobileScreens ? "1.4rem" : "1.25rem"} />
      </IconButton>
    </Box>
  )
}

export default MobileApparelSortingSideBar
