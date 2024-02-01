import { useState, forwardRef } from "react"
import { useNavigate } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { IoClose } from "react-icons/io5"
import { FaUpload } from "react-icons/fa6"
import { IoCreate } from "react-icons/io5"
import { styled } from "@mui/system"
import { Box, Typography, useTheme, Button, IconButton, useMediaQuery, Grow, Dialog } from "@mui/material"
import FlexBetweenBox from "components/FlexBetweenBox"
import UploadApparelWidget from "views/widgets/UploadApparelWidget"
import { setCreatingStyle } from "state"

const Transition = forwardRef(function Transition(props, ref) {
  return <Grow ref={ref} {...props} />
})

const UploadDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialog-paper": {
    borderRadius: "2rem"
  },
}))

const MobileActionsDialog = ({ handleActionsDialogClose }) => {
  const isSmallMobileScreens = useMediaQuery("(max-width:800px) and (max-height:800px)")
  const dispatch = useDispatch()
  const { palette } = useTheme()
  const { _id } = useSelector((state) => state.user)
  const navigate = useNavigate()

  const goToCreateStyle = () => {
    navigate(`/wardrobe/${_id}`)
    dispatch(setCreatingStyle({ creatingStyle: true }))
    handleActionsDialogClose()
  }

  const goToUpload = () => {
    handleUploadOpen()
    handleActionsDialogClose()
  }

  /* Upload Popup Dialog State */
  const [uploadOpen, setUploadOpen] = useState(false)
  const handleUploadOpen = () => {
    setUploadOpen(true)
  }
  const handleUploadClose = () => {
    setUploadOpen(false)
  }

  const mobileSortButtonStyles = {
    fontSize: isSmallMobileScreens ? "0.75rem" : "1rem",
    fontWeight: 400,
    textTransform: "none",
    padding: isSmallMobileScreens ? "0.8rem" : "1rem",
    color: palette.neutral.dark
  }

  return (
    <Box margin={isSmallMobileScreens ? "0.5rem 0.5rem 1.5rem 0.5rem" : "0.75rem 0.5rem 1rem 0.75rem"}>
      <FlexBetweenBox>
        <Typography
          fontWeight={500}
          color={palette.neutral.dark}
          variant={isSmallMobileScreens ? "h5" : "h5"}
        >
          What would you like to do?
        </Typography>
        <IconButton onClick={handleActionsDialogClose}>
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

        <Button
          fullWidth
          style={mobileSortButtonStyles}
          variant="text"
          startIcon={<IoCreate color={palette.neutral.dark} size={isSmallMobileScreens ? "2.5rem" : "2rem"} />}
          onClick={goToCreateStyle}
          sx={{
            color: palette.neutral.darker,
          }}
        >
          Create Style
        </Button>

        <Button
          fullWidth
          style={mobileSortButtonStyles}
          variant="text"
          startIcon={<FaUpload color={palette.neutral.dark} size={isSmallMobileScreens ? "2.5rem" : "2rem"} />}
          onClick={goToUpload}
        >
          Add Apparel
        </Button>
      </Box>

      <UploadDialog
        open={uploadOpen}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleUploadClose}
        aria-describedby="alert-dialog-slide-description"
        disableScrollLock
      >
        <UploadApparelWidget handleUploadClose={handleUploadClose} />
      </UploadDialog>
    </Box>
  )
}

export default MobileActionsDialog