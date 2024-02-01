import "../../styles/gradient-button.min.css"
import { useState, forwardRef, lazy, Suspense, CSSProperties } from "react"
import { useSelector, useDispatch } from "react-redux"
import GridLoader from "react-spinners/GridLoader"
import { styled } from "@mui/system"
import { Box, Typography, useTheme, useMediaQuery, Button, Dialog, Grow, IconButton } from "@mui/material"
import { DarkMode, LightMode } from "@mui/icons-material"
import { setMode } from "state"
import FlexBetweenBox from "components/FlexBetweenBox"
import DesktopFooter from "views/widgets/DesktopFooter"
const Form = lazy(() => import("./Form"))

const Transition = forwardRef(function Transition(props, ref) {
  return <Grow ref={ref} {...props} />
})

const LoginPage = () => {
  const theme = useTheme()
  const isSmallMobileScreens = useMediaQuery("(max-width:800px) and (max-height:800px)")
  const isNonMobileScreens = useMediaQuery("(min-width:1000px) and (max-height:2160px)")
  const isHDScreens = useMediaQuery("(min-width:1280px) and (max-height:900px)")
  const isFullHDScreens = useMediaQuery("(min-width:1800px) and (max-height:2160px)")
  const { palette } = useTheme()
  const dispatch = useDispatch()
  const mode = useSelector((state) => state.mode)

  const FormDialog = styled(Dialog)(({ theme }) => ({
    "& .MuiDialog-paper": {
      borderRadius: isNonMobileScreens ? "3rem" : "2rem",
      padding: isNonMobileScreens ? "6rem" : "3rem"
    },
  }))

  /* Upload Popup Dialog State */
  const [formOpen, setFormOpen] = useState(false)
  const handleFormOpen = () => {
    setFormOpen(true)
  }
  const handleFormClose = () => {
    setFormOpen(false)
  }

  const formoverride: CSSProperties = {
    display: "block",
    margin: "0 auto",
  };

  return (
    <Box>
      <Box
        width="100%"
        backgroundColor={theme.palette.background.alt}
        p="0.5rem 6%"
        textAlign="center"
        display={"flex"}
        flexDirection={"row"}
        justifyContent={isNonMobileScreens ? "space-between" : "center"}
        alignItems={"center"}
        sx={{ boxShadow: "6px 6px 12px rgba(0,0,0, 0.05)" }}
      >
        {isNonMobileScreens && (
          <Typography
            fontSize={"0.75rem"}
            fontWeight={600}
            color={theme.palette.neutral.dark}>
            Developer with 💛 by JasonMai.dev
          </Typography>
        )}
        <FlexBetweenBox gap="1.75rem">
          {/* ----- Logo ----- */}
          <img
            style={{ objectFit: "cover", width: "7rem" }}
            alt="user"
            src={`https://slay-style-app.s3.us-west-1.amazonaws.com/slay-logo-${mode}.png`}
          />

          {/* ----- App Slogan ----- */}
          <Typography fontSize={"0.75rem"} fontWeight={700} color={theme.palette.neutral.dark}>Glow Up Fashion Made Simple</Typography>
        </FlexBetweenBox>
        {isNonMobileScreens && (
          <Box display={"flex"} flexDirection={"row"} gap={4}>
            <IconButton onClick={() => dispatch(setMode())}>
              {theme.palette.mode === "dark" ? (
                <DarkMode
                  sx={{
                    color: theme.palette.neutral.dark,
                    borderRadius: "6rem",
                    "&:hover": {
                      color: theme.palette.primary.main,
                      backgroundColor: theme.palette.background.alt,
                    }
                  }}
                />
              ) : (
                <LightMode
                  sx={{
                    color: theme.palette.neutral.dark,
                    borderRadius: "6rem",
                    "&:hover": {
                      color: theme.palette.primary.main,
                      backgroundColor: theme.palette.background.alt,
                    }
                  }}
                />
              )}
            </IconButton>
            <Button
              onClick={handleFormOpen}
              size="medium"
              variant="outlined"
              sx={
                isNonMobileScreens ?
                  {
                    padding: "0.5rem 1.5rem",
                    textTransform: "none",
                    borderRadius: "6rem",
                    fontWeight: 600,
                    color: palette.neutral.dark,
                    borderColor: palette.neutral.dark,
                    "&:hover": {
                      color: palette.primary.main,
                    }
                  }
                  :
                  {
                    padding: "0.5rem 1.5rem",
                    textTransform: "none",
                    borderRadius: "6rem",
                    fontWeight: 600,
                    color: palette.neutral.dark,
                    borderColor: palette.neutral.dark,
                    "&:hover": {
                      color: palette.primary.main,
                    }
                  }
              }
            >
              Sign In
            </Button>
          </Box>
        )}
      </Box>

      <Box
        width="100%"
        padding={isNonMobileScreens ? "12rem 16%" : "1rem 12%"}
        display={isNonMobileScreens ? "flex" : "block"}
        gap="0.5rem"
        justifyContent="center"
      >
        <Box
          display={"flex"}
          gap="0.5rem"
          justifyContent="center"
        >
        </Box>
        {/* ----- Mid Page Column ----- */}
        <Box
          flexBasis={isNonMobileScreens ? "64%" : undefined}
          mt={isNonMobileScreens ? undefined : "2rem"}
          display={"flex"}
          flexDirection={"column"}
          justifyContent={"center"}
        >
          <Typography
            variant={isSmallMobileScreens ? "h3" : isHDScreens ? "h2" : isNonMobileScreens ? "h1" : "h3"}
            textAlign={"center"}
          >
            You don't know how GOOD you look...
          </Typography>
          <Typography
            variant={isSmallMobileScreens ? "h3" : isHDScreens ? "h2" : isNonMobileScreens ? "h1" : "h2"}
            fontWeight={800}
            textAlign={"center"}
          >
            until you Slay with Style.
          </Typography>
          <Button
            onClick={handleFormOpen}
            className={mode === "light" ? "gradient-button" : "gradient-button-dark"}
            size="large"
            sx={
              (isNonMobileScreens && mode === "light") ?
                {
                  color: palette.neutral.dark,
                  margin: "2rem 36%",
                  padding: "1.5rem 6%",
                  borderRadius: "6rem",
                  fontSize: "1rem",
                  fontWeight: 700,
                  textTransform: "none",
                  boxShadow: "12px 16px 38px rgba(0,0,0, 0.1),-19px -19px 40px #ffffff",
                  ":hover": {
                    backgroundColor: palette.background.default
                  }
                }
                :
                (!isNonMobileScreens && mode === "light") ?
                  {
                    color: palette.neutral.dark,
                    margin: "2rem 16%",
                    padding: "1.5rem 6%",
                    borderRadius: "6rem",
                    fontSize: "1rem",
                    fontWeight: 700,
                    textTransform: "none",
                    boxShadow: "12px 16px 38px rgba(0,0,0, 0.1),-19px -19px 40px #ffffff",
                    ":hover": {
                      backgroundColor: palette.background.default
                    }
                  }
                  :
                  (!isNonMobileScreens && mode === "dark") ?
                    {
                      color: palette.primary.main,
                      margin: "2rem 16%",
                      padding: "1.5rem 2rem",
                      borderRadius: "6rem",
                      fontSize: "1rem",
                      fontWeight: 700,
                      textTransform: "none",
                      boxShadow: "15px 15px 40px rgba(0,0,0, 0.35), -15px -15px 40px #212125",
                      ":hover": {
                        backgroundColor: palette.background.default
                      }
                    }
                    :
                    {
                      color: palette.primary.main,
                      margin: "2rem 36%",
                      padding: "1.5rem 2rem",
                      borderRadius: "6rem",
                      fontSize: "1rem",
                      fontWeight: 700,
                      textTransform: "none",
                      boxShadow: "15px 15px 40px rgba(0,0,0, 0.35), -12px -12px 40px #212125",
                      ":hover": {
                        backgroundColor: palette.background.default
                      }
                    }
            }
          >
            Get Started
          </Button>
        </Box>
      </Box>

      {/* ----- Desktop Footer ----- */}
      {/* {isNonMobileScreens && <DesktopFooter />} */}
      <DesktopFooter isLogin />

      {/* ----- Popup Apparel Upload Form Dialog ----- */}
      <FormDialog
        open={formOpen}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleFormClose}
        aria-describedby="alert-dialog-slide-description"
        disableScrollLock
      >
        <Suspense fallback={
          <GridLoader
            color="#eee"
            loading={true}
            cssOverride={formoverride}
            size={50}
            margin={20}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        }>
          <Form />
        </Suspense>
      </FormDialog>

    </Box>
  )
}

export default LoginPage