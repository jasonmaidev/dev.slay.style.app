import { Box, IconButton, useMediaQuery, Tooltip, useTheme } from "@mui/material"
import { RadioButton } from "components/RadioButton"
import {
  GiBilledCap,
  GiPoloShirt,
  GiShirt,
  GiMonclerJacket,
  GiLargeDress,
  GiArmoredPants,
  GiUnderwearShorts,
  GiConverseShoe
} from "react-icons/gi"
import { IoOptions, IoFlash, IoFlashOutline } from "react-icons/io5"
import { setSortBySection, setSectionSortingMode } from "state"
import { useDispatch, useSelector } from "react-redux"

const WardrobeSortingButtons = () => {
  const isFullHDScreens = useMediaQuery("(min-width:1800px) and (max-height:2160px)")
  const dispatch = useDispatch()
  const { palette } = useTheme()
  const sortBySection = useSelector((state) => state.sortBySection)
  const creatingStyle = useSelector((state) => state.creatingStyle)
  const sectionSortingMode = useSelector((state) => state.sectionSortingMode)

  const handleSection = (e) => {
    dispatch(setSortBySection({ sortBySection: e.target.value }))
  }

  return (
    <Box
      display="flex"
      flexDirection={"row"}
      alignItems={"center"}
      flexWrap={"no-wrap"}
      className="radio-buttons"
      marginBottom={0}
    >
      <Box padding={"0 0.5rem"}>
        <IoOptions color={palette.neutral.medium} size={isFullHDScreens ? "1.75rem" : "1rem"} opacity={1} />
      </Box>
      <Tooltip title="Short Sleeve Tops" placement="top">
        <Box>
          <RadioButton
            changed={handleSection}
            id="1a"
            isSelected={sortBySection === "shorttops"}
            //label="Tops"
            value="shorttops"
            icon={<GiPoloShirt color={palette.neutral.medium} size={isFullHDScreens ? "1.75rem" : "1.5rem"} />}
          />
        </Box>
      </Tooltip>
      <Tooltip title="Long Sleeve Tops" placement="top">
        <Box>
          <RadioButton
            changed={handleSection}
            id="2a"
            isSelected={sortBySection === "longtops"}
            //label="Tops"
            value="longtops"
            icon={<GiShirt color={palette.neutral.medium} size={isFullHDScreens ? "1.75rem" : "1.5rem"} />}
          />
        </Box>
      </Tooltip>
      <Tooltip title="Outer Shirts & Jackets" placement="top">
        <Box>
          <RadioButton
            changed={handleSection}
            id="3a"
            isSelected={sortBySection === "outerwear"}
            //label="Outerwear"
            value="outerwear"
            icon={<GiMonclerJacket color={palette.neutral.medium} size={isFullHDScreens ? "1.75rem" : "1.5rem"} />}
          />
        </Box>
      </Tooltip>
      {/* <Tooltip title="Dresses, Rompers & Jumpsuits" placement="top">
        <Box>
          <RadioButton
            changed={handleSection}
            id="4a"
            isSelected={sortBySection === "onepiece"}
            // label="OnePiece"
            value="onepiece"
            icon={<GiLargeDress color={palette.neutral.medium} size={isFullHDScreens ? "1.75rem" : "1.5rem"} />}
          />
        </Box>
      </Tooltip> */}
      <Tooltip title="Pants & Long Skirts" placement="top">
        <Box>
          <RadioButton
            changed={handleSection}
            id="5a"
            isSelected={sortBySection === "pants"}
            //label="Pants"
            value="pants"
            icon={<GiArmoredPants color={palette.neutral.medium} size={isFullHDScreens ? "1.75rem" : "1.5rem"} />}
          />
        </Box>
      </Tooltip>
      <Tooltip title="Shorts & Skirts" placement="top">
        <Box>
          <RadioButton
            changed={handleSection}
            id="6a"
            isSelected={sortBySection === "shorts"}
            //label="Shorts"
            value="shorts"
            icon={<GiUnderwearShorts color={palette.neutral.medium} size={isFullHDScreens ? "1.75rem" : "1.5rem"} />}
          />
        </Box>
      </Tooltip>
      <Tooltip title="Footwear" placement="top">
        <Box>
          <RadioButton
            changed={handleSection}
            id="7a"
            isSelected={sortBySection === "footwear"}
            //label="Footwear"
            value="footwear"
            icon={<GiConverseShoe color={palette.neutral.medium} size={isFullHDScreens ? "1.75rem" : "1.5rem"} />}
          />
        </Box>
      </Tooltip>
      <Tooltip title="Headwear" placement="top">
        <Box>
          <RadioButton
            changed={handleSection}
            id="8a"
            isSelected={sortBySection === "headwear"}
            //label="Headwear"
            value="headwear"
            icon={<GiBilledCap color={palette.neutral.medium} size={isFullHDScreens ? "1.75rem" : "1.5rem"} />}
          />
        </Box>
      </Tooltip>
      {creatingStyle && (
        (sectionSortingMode === "auto") ?
          <Tooltip title="Auto-Sorting On/Off" placement="top">
            <IconButton
              onClick={() => dispatch(setSectionSortingMode())}
              sx={{
                color: palette.neutral.medium,
                "&:hover": {
                  color: palette.primary.light,
                  backgroundColor: palette.background.alt,
                },
              }}
            >
              <IoFlash
                size={isFullHDScreens ? "2rem" : "1rem"}
              />
            </IconButton>
          </Tooltip>
          :
          <Tooltip title="Auto-Sorting On/Off" placement="top">
            <IconButton
              onClick={() => dispatch(setSectionSortingMode())}
              sx={{
                color: palette.neutral.light,
                "&:hover": {
                  color: palette.primary.main,
                  backgroundColor: palette.background.alt,
                },
              }}
            >
              <IoFlashOutline
                size={isFullHDScreens ? "2rem" : "1rem"}
              />
            </IconButton>
          </Tooltip>
      )}
    </Box>
  )
}

export default WardrobeSortingButtons