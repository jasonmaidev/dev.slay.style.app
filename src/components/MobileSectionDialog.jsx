import { IoClose } from "react-icons/io5"
import { useDispatch } from "react-redux"
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
import { Box, Typography, useTheme, Button, IconButton, useMediaQuery } from "@mui/material"
import { setSortBySection } from "state"
import FlexBetweenBox from "components/FlexBetweenBox"

const MobileSectionDialog = ({ handleFilterDialogClose }) => {
  const isSmallMobileScreens = useMediaQuery("(max-width:800px) and (max-height:800px)")
  const dispatch = useDispatch()
  const { palette } = useTheme()

  // Override default Button styles
  const mobileSortButtonStyles = {
    justifyContent: "flex-start",
    fontSize: isSmallMobileScreens ? "0.75rem" : "0.8rem",
    fontWeight: 400,
    textTransform: "none",
    padding: isSmallMobileScreens ? "0.8rem" : "0.75rem",
    color: palette.neutral.dark
  }

  const headwearDescription = "Hats, Beanies, & Headbands "
  const shorttopsDescription = "Short Sleeve Tops"
  const longtopsDescription = "Long Sleeve Tops"
  const outerwearDescription = "Outer Shirts & Jackets"
  const onepieceDescription = "Dresses, Rompers & Jumpsuits"
  const pantsDescription = "Pants, Trousers, & Long Skirts"
  const shortsDescription = "Shorts & Skirts"
  const footwearDescription = "Footwear"

  const sortByHeadwear = () => {
    dispatch(setSortBySection({ sortBySection: "headwear" }))
    handleFilterDialogClose()
  }
  const sortByShortTops = () => {
    dispatch(setSortBySection({ sortBySection: "shorttops" }))
    handleFilterDialogClose()
  }
  const sortByLongTops = () => {
    dispatch(setSortBySection({ sortBySection: "longtops" }))
    handleFilterDialogClose()
  }
  const sortOuterwear = () => {
    dispatch(setSortBySection({ sortBySection: "outerwear" }))
    handleFilterDialogClose()
  }
  const sortByOnePiece = () => {
    dispatch(setSortBySection({ sortBySection: "onepiece" }))
    handleFilterDialogClose()
  }
  const sortByPants = () => {
    dispatch(setSortBySection({ sortBySection: "pants" }))
    handleFilterDialogClose()
  }
  const sortByShorts = () => {
    dispatch(setSortBySection({ sortBySection: "shorts" }))
    handleFilterDialogClose()
  }
  const sortByFootwear = () => {
    dispatch(setSortBySection({ sortBySection: "footwear" }))
    handleFilterDialogClose()
  }

  return (
    <Box margin={isSmallMobileScreens ? "0.5rem 0.5rem 1rem 1rem" : "0.5rem 0.5rem 1rem 0.25rem"}>
      <FlexBetweenBox>
        <Typography
          fontWeight={500}
          color={palette.neutral.dark}
          variant={isSmallMobileScreens ? "h5" : "h4"}
        >
          Apparel Section
        </Typography>
        <IconButton onClick={handleFilterDialogClose}>
          <IoClose color={palette.neutral.dark} />
        </IconButton>
      </FlexBetweenBox>
      <Box
        pl={2}
        width={"100%"}
        display="flex"
        flexDirection={"column"}
        alignContent={"flex-start"}
        alignItems={"flex-start"}
      >
        <Button
          fullWidth
          style={mobileSortButtonStyles}
          variant="text"
          startIcon={<GiBilledCap size={isSmallMobileScreens ? "2rem" : "1.5rem"} />}
          onClick={sortByHeadwear}
        >
          {headwearDescription}
        </Button>

        <Button
          fullWidth
          style={mobileSortButtonStyles}
          variant="text"
          startIcon={<GiPoloShirt size={isSmallMobileScreens ? "2rem" : "1.5rem"} />}
          onClick={sortByShortTops}
        >
          {shorttopsDescription}
        </Button>

        <Button
          fullWidth
          style={mobileSortButtonStyles}
          variant="text"
          startIcon={<GiShirt size={isSmallMobileScreens ? "2rem" : "1.5rem"} />}
          onClick={sortByLongTops}
        >
          {longtopsDescription}
        </Button>

        <Button
          fullWidth
          style={mobileSortButtonStyles}
          variant="text"
          startIcon={<GiMonclerJacket size={isSmallMobileScreens ? "2rem" : "1.5rem"} />}
          onClick={sortOuterwear}
        >
          {outerwearDescription}
        </Button>

        <Button
          fullWidth
          style={mobileSortButtonStyles}
          variant="text"
          startIcon={<GiLargeDress size={isSmallMobileScreens ? "2rem" : "1.5rem"} />}
          onClick={sortByOnePiece}
        >
          {onepieceDescription}
        </Button>

        <Button
          fullWidth
          style={mobileSortButtonStyles}
          variant="text"
          startIcon={<GiArmoredPants size={isSmallMobileScreens ? "2rem" : "1.5rem"} />}
          onClick={sortByPants}
        >
          {pantsDescription}
        </Button>

        <Button
          fullWidth
          style={mobileSortButtonStyles}
          variant="text"
          startIcon={<GiUnderwearShorts size={isSmallMobileScreens ? "2rem" : "1.5rem"} />}
          onClick={sortByShorts}
        >
          {shortsDescription}
        </Button>

        <Button
          fullWidth
          style={mobileSortButtonStyles}
          variant="text"
          startIcon={<GiConverseShoe size={isSmallMobileScreens ? "2rem" : "1.5rem"} />}
          onClick={sortByFootwear}
        >
          {footwearDescription}
        </Button>

      </Box>
    </Box>
  )
}

export default MobileSectionDialog