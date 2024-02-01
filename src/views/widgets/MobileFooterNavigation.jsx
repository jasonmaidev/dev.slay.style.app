import { useState, forwardRef, lazy, Suspense, CSSProperties } from "react"
import { useNavigate } from "react-router-dom"
import { useSelector } from "react-redux"
import { PiCoatHangerBold } from "react-icons/pi"
import { GiClothes } from "react-icons/gi"
import { IoIosHome } from "react-icons/io"
import { TfiMapAlt } from "react-icons/tfi"
import { TbArrowBackUp } from "react-icons/tb"
import { IoAddCircleOutline, IoOptions } from "react-icons/io5"
import GridLoader from "react-spinners/GridLoader"
import { makeStyles } from "@mui/styles"
import { styled, BottomNavigation, BottomNavigationAction, Paper, Box, Slide, Dialog, useTheme } from "@mui/material"
const MobileActionsDialog = lazy(() => import("../../components/MobileActionsDialog"))
const MobileSectionDialog = lazy(() => import("../../components/MobileSectionDialog"))
const MobileOccasionDialog = lazy(() => import("../../components/MobileOccasionDialog"))

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />
})

const FilterDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialog-paper": {
    borderRadius: "2rem"
  },
}))

const ActionsDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialog-paper": {
    borderRadius: "2rem"
  },
}))

const MobileFooterNavigation = ({ isHome, isWardrobe, isStyles, isRoadmap }) => {
  const { _id } = useSelector((state) => state.user)
  const navigate = useNavigate()
  const { palette } = useTheme()

  const getWardrobe = () => {
    navigate(`/wardrobe/${_id}`)
  }

  const getStyles = () => {
    navigate(`/styles/${_id}`)
  }

  const getRoadmap = () => {
    navigate(`/roadmap`)
  }

  // Override default Dialog styles
  const slideDialogStyles = makeStyles({
    dialog: {
      width: "90%",
      position: "absolute",
      bottom: "2%"
    }
  })
  const classes = slideDialogStyles()

  /* Filter SlideUp Dialog State */
  const [filterDialogOpen, setFilterDialogOpen] = useState(false)
  const handleFilterDialogOpen = () => {
    setFilterDialogOpen(true)
  }
  const handleFilterDialogClose = () => {
    setFilterDialogOpen(false)
  }

  /* Actions SlideUp Dialog State */
  const [actionsDialogOpen, setActionsDialogOpen] = useState(false)
  const handleActionsDialogOpen = () => {
    setActionsDialogOpen(true)
  }
  const handleActionsDialogClose = () => {
    setActionsDialogOpen(false)
  }

  const dialogoverride: CSSProperties = {
    display: "block",
    margin: "0 auto",
  }

  return (
    <Box sx={{ pb: 7 }} >
      <Paper sx={{ position: "fixed", bottom: 0, left: 0, right: 0 }} elevation={3}>
        <BottomNavigation showLabels>
          <BottomNavigationAction
            label="Home"
            value="home"
            icon={<IoIosHome size="1.5rem" />}
            onClick={() => navigate("/")}
          />

          <BottomNavigationAction
            label="Wardrobe"
            value="wardrobe"
            icon={<GiClothes size="1.5rem" />}
            onClick={getWardrobe}
          />

          <BottomNavigationAction
            icon={<IoAddCircleOutline size="2rem" />}
            onClick={handleActionsDialogOpen}
          />

          <BottomNavigationAction
            label="Styles"
            value="styles"
            icon={<PiCoatHangerBold size="1.5rem" />}
            onClick={getStyles}
          />

          {isHome ? (
            <BottomNavigationAction
              label="Map"
              value="roadmap"
              icon={<TfiMapAlt size="1.5rem" />}
              onClick={getRoadmap}
            />
          ) : isRoadmap ? (
            <BottomNavigationAction
              label="Back"
              value="back"
              icon={<TbArrowBackUp size="1.5rem" />}
              onClick={() => navigate('/')}
            />
          ) : (
            <BottomNavigationAction
              label="Filter"
              icon={<IoOptions size="1.5rem" />}
              disabled={isHome}
              sx={isHome ? { opacity: 0.3 } : { opacity: 1 }}
              onClick={handleFilterDialogOpen} // Opens Section Sort or Occasion Sort Dialog
            />
          )}


        </BottomNavigation>
      </Paper>

      <FilterDialog
        open={filterDialogOpen}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleFilterDialogClose}
        aria-describedby="alert-dialog-slide-description"
        disableScrollLock
        classes={{ paper: classes.dialog }}
      >
        {isWardrobe ?
          <Suspense fallback={
            <GridLoader
              color={palette.neutral.light}
              loading={true}
              cssOverride={dialogoverride}
              size={200}
              margin={20}
              aria-label="Loading Spinner"
              data-testid="loader"
            />
          }>
            <MobileSectionDialog handleFilterDialogClose={handleFilterDialogClose} />
          </Suspense>
          :
          isStyles ?
            <Suspense fallback={
              <GridLoader
                color={palette.neutral.light}
                loading={true}
                cssOverride={dialogoverride}
                size={200}
                margin={20}
                aria-label="Loading Spinner"
                data-testid="loader"
              />
            }>
              <MobileOccasionDialog handleFilterDialogClose={handleFilterDialogClose} />
            </Suspense>
            :
            null
        }
      </FilterDialog>

      <ActionsDialog
        open={actionsDialogOpen}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleActionsDialogClose}
        aria-describedby="alert-dialog-slide-description"
        disableScrollLock
        classes={{ paper: classes.dialog }}
      >
        <Suspense fallback={
          <GridLoader
            color={palette.neutral.light}
            loading={true}
            cssOverride={dialogoverride}
            size={200}
            margin={20}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        }>
          <MobileActionsDialog handleActionsDialogClose={handleActionsDialogClose} />
        </Suspense>
      </ActionsDialog>

    </Box>
  )
}

export default MobileFooterNavigation