import { useDispatch, useSelector } from "react-redux"
import { PiArrowRightBold } from "react-icons/pi"
import "../../styles/scrollbar.min.css"
import "react-perfect-scrollbar/dist/css/styles.css"
import PerfectScrollbar from "react-perfect-scrollbar"
import { useQuery } from "@tanstack/react-query"
import { Typography, useMediaQuery, useTheme, Box, Button } from "@mui/material"
import { setLogout } from "state"
import ThumbnailsContainer from "components/ThumbnailsContainer"
import ApparelWidget from "./ApparelWidget"

const ApparelsWidget = ({ handleUploadOpen }) => {
  const isNonMobileScreens = useMediaQuery("(min-width:1000px) and (max-height:2160px)")
  const isHDScreens = useMediaQuery("(min-width:1280px) and (max-height:900px)")
  const { palette } = useTheme()
  const dispatch = useDispatch()
  const sortBySection = useSelector((state) => state.sortBySection)
  const token = useSelector((state) => state.token)
  const { _id } = useSelector((state) => state.user)

  const getSectionedApparels = () => {
    return fetch(`http://localhost:3001/apparels/${_id}/${sortBySection}`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
  }

  const { data: sectionedData } = useQuery(["sectionedApparelsData", sortBySection], getSectionedApparels, {
    keepPreviousData: true,
    staleTime: 3000
  })

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

  if (sectionedData?.message === 'jwt expired') {
    alert('App session has expired. Please login again.')
    dispatch(setLogout())
  }

  console.log(sectionedData?.length)

  return (
    <>
      <div className={isHDScreens ? "laptop-apparels-scrollbar" : isNonMobileScreens ? "apparels-scrollbar" : ""}>
        <Typography
          variant={isNonMobileScreens ? "h4" : "h5"}
          fontWeight={400}
          color={palette.neutral.dark}
          p={isNonMobileScreens ? "0.5rem 0 1rem 0" : "0 1rem 0.5rem 1rem"}
        >
          {title}
        </Typography>
        {!sectionedData?.length && (
          <>
            <Box
              display={"flex"}
              flexDirection={"row"}
              justifyContent={"center"}
              margin={isNonMobileScreens ? "3rem" : "2rem"}
            >
              <Button
                disabled
                variant="outlined"
                size="large"
                endIcon={
                  isNonMobileScreens ?
                    <PiArrowRightBold size={isNonMobileScreens ? "1.75rem" : "1.5rem"} margin={"1rem"} />
                    :
                    null
                }
                sx={{
                  textTransform: "none",
                  margin: "0 0.5rem",
                  padding: "8rem 4rem",
                  borderRadius: "2rem",
                  fontWeight: 500,
                  color: palette.neutral.medium,
                  borderColor: palette.neutral.medium,
                  "&:hover": {
                    color: palette.primary.main,
                  }
                }}
              >
                {
                  isNonMobileScreens ?
                    "Please add apparel(s)."
                    :
                    "Please add demo apparels from Home page."
                }
              </Button>
            </Box>
          </>
        )}
        {sectionedData ?
          <>
            <PerfectScrollbar component="div">
              <ThumbnailsContainer
                display="flex"
                flexDirection={"row"}
                alignItems={"flex-start"}
                flexWrap={"no-wrap"}
                gap={1}
                minHeight={"2rem"}
                className={isHDScreens ? "laptop-apparels-content" : isNonMobileScreens ? "apparels-content" : ""}
                height={(isNonMobileScreens && sectionedData?.length) ? "76vh" : undefined}
              >
                {sectionedData.map(({ _id, userId, name, section, description, picturePath, }) => (
                  <ApparelWidget
                    key={_id}
                    apparelId={_id}
                    apparelUserId={userId}
                    name={name}
                    section={section}
                    description={description}
                    picturePath={picturePath}
                    userId={userId}
                  />
                ))}
              </ThumbnailsContainer >
            </PerfectScrollbar>
          </>
          :
          null
        }
      </div>
    </>
  )
}

export default ApparelsWidget