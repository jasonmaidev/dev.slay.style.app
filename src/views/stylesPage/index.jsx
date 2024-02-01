import "../../styles/gradient-button.min.css"
import { useState, lazy, Suspense, CSSProperties, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import PropagateLoader from "react-spinners/PropagateLoader"
import { useDispatch, useSelector } from "react-redux"
import { useQuery } from "@tanstack/react-query"
import { Box, useMediaQuery, useTheme, Button } from "@mui/material"
import { setCreatingStyle, setLogout } from "state"
import Navbar from "views/navbar"
import StylesWidget from "views/widgets/StylesWidget"
const StylesSortingButtons = lazy(() => import("components/StylesSortingButtons"))
const MobileFooterNavigation = lazy(() => import("../widgets/MobileFooterNavigation"))
const DesktopFooter = lazy(() => import("../widgets/DesktopFooter"))

const StylesPage = () => {
  const { userId } = useParams()
  const isSmallMobileScreens = useMediaQuery("(max-width:800px) and (max-height:800px)")
  const isNonMobileScreens = useMediaQuery("(min-width:1000px) and (max-height:2160px)")
  const isHDScreens = useMediaQuery("(min-width:1280px) and (max-height:900px)")
  const isFullHDScreens = useMediaQuery("(min-width:1800px) and (max-height:2160px)")
  const token = useSelector((state) => state.token)
  const { palette } = useTheme()
  const mode = useSelector((state) => state.mode)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const sortByOccasion = useSelector((state) => state.sortByOccasion)

  /* Pagination functions passed down to "Navbar" Component + Styles Component */
  const [pageCount, setPageCount] = useState(0)
  const [pageNumber, setPageNumber] = useState(0)
  const updatePageNumber = (newPageNumber) => {
    setPageNumber(newPageNumber)
  }
  const goToPrevious = () => {
    setPageNumber(Math.max(0, pageNumber - 1))
  }
  const goToNext = () => {
    setPageNumber(Math.min(pageCount - 1, pageNumber + 1))
  }

  const goToCreateStyle = () => {
    navigate(`/wardrobe/${userId}`)
    dispatch(setCreatingStyle({ creatingStyle: true }))
  }

  // Dynamic query - default: { sortByOccasion: "" } => fetches all user styles
  const getStyles = () => {
    return fetch(`http://localhost:3001/styles/${userId}/${sortByOccasion}?page=${pageNumber}`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
  }

  const { data } = useQuery(['stylesData', sortByOccasion, pageNumber], getStyles, {
    keepPreviousData: true,
    // staleTime: 5000
  })

  if (data?.message === 'jwt expired') {
    alert('App session has expired. Please login again.')
    dispatch(setLogout())
  }

  const mobileoverride: CSSProperties = {
    display: "block",
    margin: "0 auto",
  };

  // Query to update page indicators in the UI
  const getStylesPageCount = () => {
    return fetch(`http://localhost:3001/styles/${userId}/pagecount/${sortByOccasion}`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then(totalPages => {
        setPageCount(totalPages)
      })
  }

  useEffect(() => {
    getStylesPageCount()
  }, [data])

  return (
    <Box className="App">
      <Navbar
        isStyles
        pageCount={pageCount}
        pageNumber={pageNumber}
        goToPrevious={goToPrevious}
        goToNext={goToNext}
        updatePageNumber={updatePageNumber}
      />

      {/* ----- Page Body ----- */}
      <Box
        width="100%"
        padding={isNonMobileScreens ? "1rem 0" : "0 1%"}
        display={isNonMobileScreens ? "flex" : "block"}
        gap="1rem"
        flexDirection={"column"}
        justifyContent={"center"}
      >
        {/* ----- Apparels Display ----- */}
        <Box
          flexBasis={isNonMobileScreens ? "100%" : undefined}
          mt={isNonMobileScreens ? undefined : "1rem"}
        >
          <StylesWidget
            userId={userId}
            goToPrevious={goToPrevious} //scroll function
            goToNext={goToNext} //sccroll function
            pageCount={pageCount}
            pageNumber={pageNumber}
            setPageNumber={setPageNumber}
            data={data}
          />
        </Box>
        {isNonMobileScreens &&
          <Button
            onClick={goToCreateStyle}
            className={mode === "light" ? "gradient-button" : "gradient-button-dark"}
            size="medium"
            sx={
              (isNonMobileScreens && mode === "light") ?
                {
                  color: palette.neutral.dark,
                  margin: "0 42%",
                  padding: "1.5rem 2%",
                  borderRadius: "6rem",
                  fontSize: "1rem",
                  fontWeight: 700,
                  textTransform: "none",
                  boxShadow: "19px 19px 28px rgb(0,0,0, 0.1),-19px -19px 40px #ffffff",
                  ":hover": {
                    backgroundColor: palette.background.default
                  }
                }
                :
                {
                  color: palette.primary.main,
                  margin: "0 42%",
                  padding: "1.5rem 2rem",
                  borderRadius: "6rem",
                  fontSize: "1rem",
                  fontWeight: 700,
                  textTransform: "none",
                  boxShadow: "15px 15px 30px #121214, -15px -15px 30px #212125",
                  ":hover": {
                    backgroundColor: palette.background.default
                  }
                }
            }
          >
            Create New
          </Button>
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

        {/* ----- Mobile Page Buttons ----- */}
        {!isNonMobileScreens &&
          <Suspense fallback={
            <PropagateLoader
              color={palette.neutral.light}
              loading={true}
              cssOverride={mobileoverride}
              aria-label="Loading Spinner"
              data-testid="loader"
            />
          }>
            <StylesSortingButtons
              pageCount={pageCount}
              pageNumber={pageNumber}
              goToPrevious={goToPrevious}
              goToNext={goToNext}
              updatePageNumber={updatePageNumber} />
          </Suspense>
        }
      </Box>
      {!isNonMobileScreens &&
        <Suspense fallback={
          <PropagateLoader
            color={palette.neutral.light}
            loading={true}
            cssOverride={mobileoverride}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        }>
          <MobileFooterNavigation isStyles />
        </Suspense>
      }
    </Box>
  )
}

export default StylesPage