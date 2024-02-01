import { useDispatch } from "react-redux"
import { IoClose } from "react-icons/io5"
import { LuUndo2 } from "react-icons/lu"
import { Box, Typography, useTheme, Button, IconButton, useMediaQuery, } from "@mui/material"
import { setSortByOccasion } from "state"
import FlexBetweenBox from "components/FlexBetweenBox"

const MobileOccasionDialog = ({ handleFilterDialogClose }) => {
  const isSmallMobileScreens = useMediaQuery("(max-width:800px) and (max-height:800px)")
  const dispatch = useDispatch()
  const { palette } = useTheme()

  // Override default Button styles
  const mobileSortButtonStyles = {
    fontSize: isSmallMobileScreens ? "0.75rem" : "0.8rem",
    fontWeight: 400,
    textTransform: "none",
    padding: isSmallMobileScreens ? "0.6rem" : "0.75rem",
    color: palette.neutral.dark
  }

  const clearSorting = () => {
    dispatch(setSortByOccasion({ sortByOccasion: "" }))
    handleFilterDialogClose()
  }
  const sortByFavorites = () => {
    dispatch(setSortByOccasion({ sortByOccasion: "favorite" }))
    handleFilterDialogClose()
  }
  const sortByCasual = () => {
    dispatch(setSortByOccasion({ sortByOccasion: "casual" }))
    handleFilterDialogClose()
  }
  const sortByFormal = () => {
    dispatch(setSortByOccasion({ sortByOccasion: "formal" }))
    handleFilterDialogClose()
  }
  const sortBySpring = () => {
    dispatch(setSortByOccasion({ sortByOccasion: "spring" }))
    handleFilterDialogClose()
  }
  const sortBySummer = () => {
    dispatch(setSortByOccasion({ sortByOccasion: "summer" }))
    handleFilterDialogClose()
  }
  const sortByFall = () => {
    dispatch(setSortByOccasion({ sortByOccasion: "fall" }))
    handleFilterDialogClose()
  }
  const sortByWinter = () => {
    dispatch(setSortByOccasion({ sortByOccasion: "winter" }))
    handleFilterDialogClose()
  }
  const sortByCozy = () => {
    dispatch(setSortByOccasion({ sortByOccasion: "cozy" }))
    handleFilterDialogClose()
  }
  const sortByAthletic = () => {
    dispatch(setSortByOccasion({ sortByOccasion: "athletic" }))
    handleFilterDialogClose()
  }
  const sortByParty = () => {
    dispatch(setSortByOccasion({ sortByOccasion: "party" }))
    handleFilterDialogClose()
  }
  const sortByFestival = () => {
    dispatch(setSortByOccasion({ sortByOccasion: "festival" }))
    handleFilterDialogClose()
  }
  const sortByWedding = () => {
    dispatch(setSortByOccasion({ sortByOccasion: "wedding" }))
    handleFilterDialogClose()
  }

  return (
    <Box margin={isSmallMobileScreens ? "0.5rem 1rem" : "0.75rem 0.5rem 1rem 0.75rem"}>
      <FlexBetweenBox>
        <Typography
          fontWeight={500}
          color={palette.neutral.dark}
          variant={isSmallMobileScreens ? "h5" : "h4"}
        >
          Suitable For
        </Typography>
        <IconButton onClick={handleFilterDialogClose}>
          <IoClose color={palette.neutral.dark} />
        </IconButton>
      </FlexBetweenBox>
      <Box
        width={"100%"}
        display="flex"
        flexDirection={"column"}
        alignContent={"flex-start"}
        alignItems={"flex-start"}
      >
        <Button fullWidth style={mobileSortButtonStyles} variant="text" onClick={sortByFavorites}>
          favorite
        </Button>
        <Button fullWidth style={mobileSortButtonStyles} variant="text" onClick={sortByCasual}>
          casual
        </Button>
        <Button fullWidth style={mobileSortButtonStyles} variant="text" onClick={sortByFormal}>
          formal
        </Button>
        <Button fullWidth style={mobileSortButtonStyles} variant="text" onClick={sortBySpring}>
          spring
        </Button>
        <Button fullWidth style={mobileSortButtonStyles} variant="text" onClick={sortBySummer}>
          summer
        </Button>
        <Button fullWidth style={mobileSortButtonStyles} variant="text" onClick={sortByFall}>
          fall
        </Button>
        <Button fullWidth style={mobileSortButtonStyles} variant="text" onClick={sortByWinter}>
          winter
        </Button>
        <Button fullWidth style={mobileSortButtonStyles} variant="text" onClick={sortByCozy} >
          cozy
        </Button>
        <Button fullWidth style={mobileSortButtonStyles} variant="text" onClick={sortByAthletic}>
          athletic
        </Button>
        <Button fullWidth style={mobileSortButtonStyles} variant="text" onClick={sortByParty}>
          party
        </Button>
        <Button fullWidth style={mobileSortButtonStyles} variant="text" onClick={sortByFestival}>
          festival
        </Button>
        <Button fullWidth style={mobileSortButtonStyles} variant="text" onClick={sortByWedding}>
          wedding
        </Button>
        <Button fullWidth style={mobileSortButtonStyles} variant="text" onClick={clearSorting} startIcon={<LuUndo2 />} >
          reset
        </Button>
      </Box>
    </Box>
  )
}

export default MobileOccasionDialog