import "../../styles/gradient-button.min.css"
import { lazy, Suspense, CSSProperties } from "react"
import { useParams } from "react-router-dom"
import { useSelector } from "react-redux"
import GridLoader from "react-spinners/GridLoader"
import PropagateLoader from "react-spinners/PropagateLoader"
import { Box, Button, Stack, useMediaQuery, useTheme, Typography } from "@mui/material"
import Navbar from "views/navbar"
import RoadmapWidget from "views/widgets/RoadmapWidget"
const MobileFooterNavigation = lazy(() => import("../widgets/MobileFooterNavigation"))
const DesktopFooter = lazy(() => import("../widgets/DesktopFooter"))


const RoadmapPage = () => {
  const isSmallMobileScreens = useMediaQuery("(max-width:800px) and (max-height:800px)")
  const isNonMobileScreens = useMediaQuery("(min-width:1000px) and (max-height:2160px)")
  const isHDScreens = useMediaQuery("(min-width:1280px) and (max-height:900px)")
  const isFullHDScreens = useMediaQuery("(min-width:1800px) and (max-height:2160px)")
  const { palette } = useTheme()
  const dailyAllowedResets = useSelector((state) => state.dailyAllowedResets)
  const guestUser = useSelector((state) => state.user.guestUser)

  const mobilefooteroverride: CSSProperties = {
    display: "block",
    margin: "0 auto",
  }

  return (
    <Box className="App">
      <Navbar />
      <Box pt={4} display={"flex"} flexDirection={"row"} justifyContent={"center"}>
        <Typography
          variant={isNonMobileScreens ? "h4" : "h5"}
          fontWeight={400}
          color={palette.neutral.dark}
          p={isNonMobileScreens ? "0.5rem 0 1rem 0" : "0 1rem 0.5rem 1rem"}
        >
          Development Roadmap
        </Typography>
      </Box>
      {/* ----- Page Body ----- */}
      <Box
        width={isNonMobileScreens ? "64%" : "90%"}
        padding={isNonMobileScreens ? undefined : "1rem 5%"}
        margin={isNonMobileScreens ? "1rem 18%" : "0 5%"}
        display={isNonMobileScreens ? "flex" : "block"}
        gap="0.5rem"
        justifyContent="center"
      >

        {/* ----- Desktop Left Column: Buttons  ----- */}
        {isNonMobileScreens && (
          <Box flexBasis={isNonMobileScreens ? "32%" : undefined}>
            <Stack
              spacing={isSmallMobileScreens ? 0.5 : 2}
              display={"flex"}
              justifyContent={"center"}
              direction={isNonMobileScreens ? "column" : "row"}
              margin={isHDScreens ? "2rem 3rem" : isNonMobileScreens ? "2rem 6rem" : "1rem 0.5rem"}
            >
              <Button
                variant="outlined"
                size="large"
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
                Releases
              </Button>
              <Button
                variant="outlined"
                size="large"
                disabled={!guestUser || dailyAllowedResets < 1}
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
                Change Logs
              </Button>
            </Stack>

          </Box>
        )}
        {/* ----- Roadmap Content ----- */}
        <Box
          display={isNonMobileScreens ? "flex" : "block"}
          flexDirection={"row"} // Hides on mobile when creating style
          mt={isNonMobileScreens ? undefined : "1rem"}
          flexBasis={(isNonMobileScreens ? "56%" : undefined)}>
          <Suspense fallback={
            <GridLoader
              color={palette.neutral.lighter}
              loading={true}
              size={50}
              margin={20}
              aria-label="Loading Spinner"
              data-testid="loader"
            />
          }>
            <RoadmapWidget />
          </Suspense>
        </Box>
      </Box>

      {/* ----- Mobile Footer Nav ----- */}

      {!isNonMobileScreens &&
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
          <MobileFooterNavigation isRoadmap />
        </Suspense>
      }

      {/* ----- Desktop Footer Nav ----- */}
      {isNonMobileScreens &&
        <Suspense fallback={
          <PropagateLoader
            color={palette.neutral.light}
            loading={true}
            size={20}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        }>
          <DesktopFooter isHome />
        </Suspense>
      }
    </Box>
  )
}

export default RoadmapPage