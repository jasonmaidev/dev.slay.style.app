import "../../styles/gradient-button.min.css"
import { useState, forwardRef, lazy, Suspense, CSSProperties } from "react"
import { useParams } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import GridLoader from "react-spinners/GridLoader"
import PropagateLoader from "react-spinners/PropagateLoader"
import { styled } from "@mui/system"
import { setCreatingStyle, setStylingOccasions } from "state"
import { makeStyles } from "@mui/styles"
import { Box, Button, Stack, useMediaQuery, Dialog, Grow, useTheme } from "@mui/material"
import Navbar from "views/navbar"
const ResetWardrobeWidget = lazy(() => import("views/widgets/ResetWardrobeWidget"))
const UploadApparelWidget = lazy(() => import("views/widgets/UploadApparelWidget"))
const ApparelsWidget = lazy(() => import("views/widgets/ApparelsWidget"))
const CreateStyleWidget = lazy(() => import("views/widgets/CreateStyleWidget"))
const EditStyleWidget = lazy(() => import("views/widgets/EditStyleWidget"))
const MobileCreateStyleWidget = lazy(() => import("views/widgets/MobileCreateStyleWidget"))
const MobileEditStyleWidget = lazy(() => import("views/widgets/MobileEditStyleWidget"))
const MobileFooterNavigation = lazy(() => import("../widgets/MobileFooterNavigation"))
const DesktopFooter = lazy(() => import("../widgets/DesktopFooter"))

const Transition = forwardRef(function Transition(props, ref) {
  return <Grow ref={ref} {...props} />
})

const UploadDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialog-paper": {
    borderRadius: "2rem"
  },
}))

const ResetWardrobeDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialog-paper": {
    borderRadius: "2rem"
  },
}))

const WardrobePage = () => {
  const isSmallMobileScreens = useMediaQuery("(max-width:800px) and (max-height:800px)")
  const isNonMobileScreens = useMediaQuery("(min-width:1000px) and (max-height:2160px)")
  const isHDScreens = useMediaQuery("(min-width:1280px) and (max-height:900px)")
  const { userId } = useParams()
  const { _id } = useSelector((state) => state.user)
  const mode = useSelector((state) => state.mode)
  const dispatch = useDispatch()
  const { palette } = useTheme()
  const creatingStyle = useSelector((state) => state.creatingStyle)
  const editingStyle = useSelector((state) => state.editingStyle)
  const dailyAllowedResets = useSelector((state) => state.dailyAllowedResets)
  const guestUser = useSelector((state) => state.user.guestUser)

  /* Upload Popup Dialog State */
  const [uploadOpen, setUploadOpen] = useState(false)
  const handleUploadOpen = () => {
    setUploadOpen(true)
  }
  const handleUploadClose = () => {
    setUploadOpen(false)
  }

  /* Reset Wardrobe Popup Dialog State */
  const [resetWardrobeOpen, setResetWardrobeOpen] = useState(false)
  const handleResetWardrobeOpen = () => {
    setResetWardrobeOpen(true)
  }
  const handleResetWardrobeClose = () => {
    setResetWardrobeOpen(false)
  }

  const handleCreateStyle = () => {
    dispatch(setStylingOccasions({ stylingOccasions: [] }))
    dispatch(setCreatingStyle({ creatingStyle: true }))
  }

  // Mobile dialog modal
  const useDialogStyles = makeStyles({
    dialog: {
      position: "absolute",
      bottom: "2%",
    }
  })
  const mobiledialogclasses = useDialogStyles()


  const stylewidgetoverride: CSSProperties = {
    display: "block",
    margin: "3rem auto",
  }
  const mobilefooteroverride: CSSProperties = {
    display: "block",
    margin: "0 auto",
  }

  return (
    <Box className="App">
      <Navbar isWardrobe />

      {/* ----- Page Body ----- */}
      <Box
        width="100%"
        padding={isNonMobileScreens ? "1rem 16%" : "0.5rem 2%"}
        display={isNonMobileScreens ? "flex" : "block"}
        gap="0.5rem"
        justifyContent="space-evenly"
      >
        {/* ----- Apparels Display ----- */}
        <Box
          display={(!isNonMobileScreens && (creatingStyle || editingStyle)) ? "none" : "block"} // Hides on mobile when creating style
          mt={isNonMobileScreens ? undefined : "1rem"}
          flexBasis={(
            (isNonMobileScreens && !creatingStyle) ? "72%" :
              (isNonMobileScreens && creatingStyle) ? "64%" :
                undefined)
          }>
          <Suspense fallback={
            <GridLoader
              color={palette.neutral.lighter}
              loading={true}
              cssOverride={stylewidgetoverride}
              size={50}
              margin={20}
              aria-label="Loading Spinner"
              data-testid="loader"
            />
          }>
            <ApparelsWidget handleUploadOpen={handleUploadOpen} />
          </Suspense>
        </Box>

        {/* ----- Desktop Right Column: Style Widget Page Section  ----- */}
        {isNonMobileScreens && (
          <Box flexBasis={isNonMobileScreens ? "40%" : undefined}>
            {(!creatingStyle && !editingStyle) ? (
              <Stack
                spacing={isSmallMobileScreens ? 0.5 : 2}
                display={"flex"}
                justifyContent={"center"}
                direction={isNonMobileScreens ? "column" : "row"}
                margin={isHDScreens ? "2rem 3rem" : isNonMobileScreens ? "2rem 6rem" : "1rem 0.5rem"}
              >
                <Button
                  onClick={handleCreateStyle}
                  className={mode === "light" ? "gradient-button" : "gradient-button-dark"}
                  size="large"
                  sx={
                    (isNonMobileScreens && mode === "light") ?
                      {
                        color: palette.neutral.dark,
                        margin: "0.5rem 0 1rem 0",
                        padding: "1.5rem 6%",
                        borderRadius: "6rem",
                        fontSize: "0.8rem",
                        fontWeight: 600,
                        textTransform: "none",
                        boxShadow: "14px 14px 28px rgba(0,0,0, 0.1),-12px -12px 30px #ffffff",
                        ":hover": {
                          backgroundColor: palette.background.default
                        }
                      }
                      :
                      {
                        color: palette.neutral.darker,
                        margin: "0.5rem 0 1rem 0",
                        padding: "1.5rem 6%",
                        borderRadius: "6rem",
                        fontSize: "0.8rem",
                        fontWeight: 600,
                        textTransform: "none",
                        boxShadow: "15px 15px 30px #121214, -12px -12px 30px #212125",
                        ":hover": {
                          backgroundColor: palette.background.default
                        }
                      }
                  }
                >
                  Create Style
                </Button>
                {guestUser === false &&
                  <Button
                    variant="outlined"
                    size="large"
                    onClick={handleUploadOpen}
                    sx={{
                      padding: "1rem 1.5rem",
                      textTransform: "none",
                      borderRadius: "6rem",
                      fontWeight: 600,
                      color: palette.neutral.dark,
                      borderColor: palette.neutral.dark,
                      "&:hover": {
                        color: palette.primary.main,
                      }
                    }}
                  >
                    Add Apparel
                  </Button>
                }
                <Button
                  variant="outlined"
                  size="large"
                  disabled={!guestUser || dailyAllowedResets < 1}
                  onClick={handleResetWardrobeOpen}
                  sx={{
                    padding: "1rem 1.5rem",
                    textTransform: "none",
                    borderRadius: "6rem",
                    fontWeight: 600,
                    color: palette.neutral.dark,
                    borderColor: palette.neutral.dark,
                    "&:hover": {
                      color: palette.primary.main,
                    }
                  }}
                >
                  Add Demo Apparels
                </Button>
              </Stack>)
              :
              editingStyle ?
                (<Box>
                  <Suspense fallback={
                    <GridLoader
                      color={palette.neutral.light}
                      loading={true}
                      cssOverride={stylewidgetoverride}
                      size={20}
                      margin={20}
                      aria-label="Loading Spinner"
                      data-testid="loader"
                    />
                  }>
                    <EditStyleWidget userId={userId} />
                  </Suspense>
                </Box>)
                :
                <Suspense fallback={
                  <GridLoader
                    color={palette.neutral.light}
                    loading={true}
                    cssOverride={stylewidgetoverride}
                    size={20}
                    margin={20}
                    aria-label="Loading Spinner"
                    data-testid="loader"
                  />
                }>
                  <CreateStyleWidget userId={userId} />
                </Suspense>
            }
            {isNonMobileScreens &&
              <Suspense fallback={
                <PropagateLoader
                  color={palette.neutral.light}
                  loading={true}
                  // cssOverride={footeroverride}
                  size={20}
                  aria-label="Loading Spinner"
                  data-testid="loader"
                />
              }>
                <DesktopFooter isHome />
              </Suspense>
            }
          </Box>
        )}

        {/* ----- Popup Apparel Upload Form Dialog ----- */}
        <UploadDialog
          open={uploadOpen}
          TransitionComponent={Transition}
          keepMounted
          onClose={handleUploadClose}
          aria-describedby="alert-dialog-grow-description"
          classes={
            (isNonMobileScreens) ? null : { paper: mobiledialogclasses.dialog }}
        >
          <Suspense fallback={
            <GridLoader
              color={palette.neutral.light}
              loading={true}
              cssOverride={stylewidgetoverride}
              size={50}
              margin={20}
              aria-label="Loading Spinner"
              data-testid="loader"
            />
          }>
            <UploadApparelWidget handleUploadClose={handleUploadClose} />
          </Suspense>
        </UploadDialog>

        {/* ----- Popup Reset Wardrobe Dialog ----- */}
        <ResetWardrobeDialog
          open={resetWardrobeOpen}
          TransitionComponent={Transition}
          keepMounted
          onClose={handleResetWardrobeClose}
          aria-describedby="alert-dialog-grow-description"
          classes={
            (isNonMobileScreens) ? null : { paper: mobiledialogclasses.dialog }}
        >
          <Suspense fallback={
            <GridLoader
              color={palette.neutral.light}
              loading={true}
              cssOverride={stylewidgetoverride}
              size={50}
              margin={20}
              aria-label="Loading Spinner"
              data-testid="loader"
            />
          }>
            <ResetWardrobeWidget handleResetWardrobeClose={handleResetWardrobeClose} _id={_id} />
          </Suspense>
        </ResetWardrobeDialog>
        {/* ----- Mobile Style Widget Page Section  ----- */}
        {!isNonMobileScreens && (
          <Box>
            {creatingStyle ?
              <Suspense fallback={
                <GridLoader
                  color={palette.neutral.light}
                  loading={true}
                  cssOverride={stylewidgetoverride}
                  size={200}
                  aria-label="Loading Spinner"
                  data-testid="loader"
                />
              }>
                <MobileCreateStyleWidget userId={userId} />
              </Suspense>
              :
              editingStyle ?
                <Suspense fallback={
                  <GridLoader
                    color={palette.neutral.light}
                    loading={true}
                    cssOverride={stylewidgetoverride}
                    size={200}
                    aria-label="Loading Spinner"
                    data-testid="loader"
                  />
                }>
                  <MobileEditStyleWidget userId={userId} />
                </Suspense>
                :
                null
            }
          </Box>
        )}
      </Box>
      {
        !isNonMobileScreens &&
        <Suspense fallback={
          <PropagateLoader
            color={palette.neutral.light}
            loading={true}
            cssOverride={mobilefooteroverride}
            size={15}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        }>
          <MobileFooterNavigation isWardrobe />
        </Suspense>
      }
    </Box >
  )
}

export default WardrobePage