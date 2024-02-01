import { useDispatch, useSelector } from "react-redux"
import { LuUndo2 } from "react-icons/lu"
import { IoOptions } from "react-icons/io5"
import { PiArrowSquareLeftThin, PiArrowSquareRightThin } from "react-icons/pi"
import { Box, IconButton, useMediaQuery, Tooltip, useTheme } from "@mui/material"
import { setSortByOccasion } from "state"
import SingleSelect from "components/SingleSelect"

const StylesSortingButtons = ({
  goToPrevious,
  goToNext,
  pageCount,
  pageNumber,
  updatePageNumber
}) => {
  const isSmallMobileScreens = useMediaQuery("(max-width:800px) and (max-height:800px)")
  const isNonMobileScreens = useMediaQuery("(min-width:1000px) and (max-height:2160px)")
  const isFullHDScreens = useMediaQuery("(min-width:1800px) and (max-height:2160px)")
  const { palette } = useTheme()
  const dispatch = useDispatch()
  const sortByOccasion = useSelector((state) => state.sortByOccasion)

  return (
    <Box
      display="flex"
      flexDirection={"row"}
      alignItems={"center"}
      justifyContent={"center"}
      flexWrap={"no-wrap"}
      className="radio-buttons"
      marginBottom={0}
      gap={1}
    >
      {isNonMobileScreens && (
        <>
          <IoOptions color={palette.neutral.medium} size={isFullHDScreens ? "1.75rem" : "1rem"} opacity={1} />
          <SingleSelect margin={2} updatePageNumber={updatePageNumber} />
        </>
      )}

      <IconButton onClick={goToPrevious} disabled={pageNumber === 0 || !pageCount}>
        <PiArrowSquareLeftThin
          color={(pageNumber === 0 || !pageCount) ? palette.neutral.light : palette.neutral.main}
          size={isFullHDScreens ? "2.5rem" : isSmallMobileScreens ? "3rem" : "3.5rem"}
        />
      </IconButton>

      <IconButton onClick={goToNext} disabled={pageNumber === pageCount - 1 || !pageCount}>
        <PiArrowSquareRightThin
          color={(pageNumber === pageCount - 1 || !pageCount) ? palette.neutral.light : palette.neutral.main}
          size={isFullHDScreens ? "2.5rem" : isSmallMobileScreens ? "3rem" : "3.5rem"}
        />
      </IconButton>

      {(sortByOccasion && isNonMobileScreens) && (
        <Tooltip title="Reset" placement="top">
          <IconButton onClick={() => dispatch(setSortByOccasion({ sortByOccasion: "" }))}>
            <LuUndo2
              size={isFullHDScreens ? "2rem" : "1rem"}
              color={palette.neutral.medium}
            />
          </IconButton>
        </Tooltip>
      )}
    </Box>
  )
}

export default StylesSortingButtons