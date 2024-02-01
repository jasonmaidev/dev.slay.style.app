import { IconButton, Typography, useMediaQuery, useTheme } from "@mui/material"
import { Box } from "@mui/material"
import { RxDotFilled } from "react-icons/rx"
import { useSelector } from "react-redux"
import FlexEvenlyBox from "components/FlexEvenlyBox"
import StyleWidget from "./StyleWidget"

const StylesWidget = ({ goToPrevious, goToNext, data, pageCount, pageNumber, setPageNumber }) => {
  const isSmallMobileScreens = useMediaQuery("(max-width:800px) and (max-height:800px)")
  const isNonMobileScreens = useMediaQuery("(min-width:1000px) and (max-height:2160px)")
  const isHDScreens = useMediaQuery("(min-width:1280px) and (max-height:900px)")
  const sortByOccasion = useSelector((state) => state.sortByOccasion)
  const { palette } = useTheme()

  const pages = new Array(pageCount).fill(null)?.map((v, i) => i)

  const handleScroll = (event) => {
    if (pageCount && event.deltaY > 0) {
      goToNext()
    } else if (pageCount && event.deltaY < 0) {
      goToPrevious()
    }
  }

  const capFirstLetter = (str) => {
    return `${str.charAt(0).toUpperCase()}${str.slice(1)}`
  }
  const stylesTitle = capFirstLetter(sortByOccasion)

  return (
    <>
      <Box
        display={"flex"}
        flexDirection={"row"}
        justifyContent={isNonMobileScreens ? "center" : "flex-start"}
        m={isNonMobileScreens ? "1rem" : "1.5rem 1rem 0 1rem"}
      >
        {pageCount ? (
          <Typography
            variant={isNonMobileScreens ? "h4" : "h5"}
            color={palette.neutral.dark}
            fontWeight={400}
            pb={"1rem"}
          >
            {sortByOccasion ? stylesTitle : "All"} Styles
          </Typography>
        ) : (
          <Typography
            variant={isNonMobileScreens ? "h4" : "h5"}
            color={palette.neutral.dark}
            fontWeight={400}
            pb={"1rem"}
          >
            No styles to display yet.
          </Typography>
        )}
      </Box>

      {data ?
        <Box
          onWheel={isNonMobileScreens ? handleScroll : undefined}
          display="flex"
          flexDirection={"row"}
          flexWrap={"wrap"}
          alignItems={"flex-start"}
          alignContent={"flex-start"}
          justifyContent={"center"}
          minHeight={"2rem"}
          className="styles-content"
          height={!pageCount ? "24vh" : isSmallMobileScreens ? "52vh" : isHDScreens ? "60vh" : isNonMobileScreens ? "56vh" : "62vh"}
          mt={isNonMobileScreens ? 2 : 0}
        >
          {data.map(({
            _id,
            userId,
            name,
            headwear,
            shorttops,
            longtops,
            outerwear,
            onepiece,
            pants,
            shorts,
            footwear,
            occasions,
            isFavorite
          }) => (
            <StyleWidget
              key={_id}
              styleId={_id}
              userId={userId}
              name={name}
              headwear={headwear}
              shorttops={shorttops}
              longtops={longtops}
              outerwear={outerwear}
              onepiece={onepiece}
              pants={pants}
              shorts={shorts}
              footwear={footwear}
              occasions={occasions}
              isFavorite={isFavorite}
              pageNumber={pageNumber}
            />
          ))}
        </Box>
        : null
      }

      {/* ----- Page Indicator Dots ----- */}
      <FlexEvenlyBox>
        {pages ?
          <Box pb={isSmallMobileScreens ? 0 : 2}>
            {pages.map((pageIndex) => (
              <IconButton
                key={pageIndex}
                onClick={() => setPageNumber(pageIndex)}
                sx={{ padding: 0, margin: 0, opacity: pageNumber === pageIndex ? 0.8 : 0.3 }}
              >
                <RxDotFilled size={"1rem"} />
              </IconButton>
            ))}
          </Box>
          : null
        }
      </FlexEvenlyBox>

    </>
  )
}

export default StylesWidget
