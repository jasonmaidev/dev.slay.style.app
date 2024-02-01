import { Box, Button, useMediaQuery, IconButton, Tooltip, useTheme } from "@mui/material"
import {
  GiBilledCap,
  GiPoloShirt,
  GiShirt,
  GiMonclerJacket,
  GiLargeDress,
  GiShorts,
  GiConverseShoe,
  GiArmoredPants
} from "react-icons/gi"
import { AiOutlineDelete } from "react-icons/ai"
import { IoClose } from "react-icons/io5"
import { MdOutlineChevronRight } from "react-icons/md"
import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import {
  setStylingHeadwear,
  setStylingShortTops,
  setStylingLongTops,
  setStylingOuterwear,
  setStylingOnePiece,
  setStylingPants,
  setStylingShorts,
  setStylingFootwear
} from "state"

const RemoveFromStyleWidget = ({ emptyStyle }) => {
  const isSmallMobileScreens = useMediaQuery("(max-width:800px) and (max-height:800px)")
  const isNonMobileScreens = useMediaQuery("(min-width:1000px) and (max-height:2160px)")
  const isFullHDScreens = useMediaQuery("(min-width:1800px) and (max-height:2160px)")
  const dispatch = useDispatch()
  const { palette } = useTheme()

  // Detect an apparel section that is applied to subject to removal
  const stylingHeadwear = useSelector((state) => state.stylingHeadwear)
  const stylingShortTops = useSelector((state) => state.stylingShortTops)
  const stylingLongTops = useSelector((state) => state.stylingLongTops)
  const stylingOuterwear = useSelector((state) => state.stylingOuterwear)
  const stylingOnePiece = useSelector((state) => state.stylingOnePiece)
  const stylingPants = useSelector((state) => state.stylingPants)
  const stylingShorts = useSelector((state) => state.stylingShorts)
  const stylingFootwear = useSelector((state) => state.stylingFootwear)

  // Clear Section(s)
  const clearShortTops = () => { dispatch(setStylingShortTops({ stylingShortTops: null })) }
  const clearLongTops = () => { dispatch(setStylingLongTops({ stylingLongTops: null })) }
  const clearOuterwear = () => { dispatch(setStylingOuterwear({ stylingOuterwear: null })) }
  const clearOnePiece = () => { dispatch(setStylingOnePiece({ stylingOnePiece: null })) }
  const clearPants = () => { dispatch(setStylingPants({ stylingPants: null })) }
  const clearShorts = () => { dispatch(setStylingShorts({ stylingShorts: null })) }
  const clearFootwear = () => { dispatch(setStylingFootwear({ stylingFootwear: null })) }
  const clearHeadwear = () => { dispatch(setStylingHeadwear({ stylingHeadwear: null })) }
  const clearAllSections = () => {
    clearShortTops()
    clearLongTops()
    clearOuterwear()
    clearOnePiece()
    clearPants()
    clearShorts()
    clearFootwear()
    clearHeadwear()
    setIsRemovingApparl(false)
  }

  // State to control size of "remove section" container
  const [isRemovingApparel, setIsRemovingApparl] = useState(false)
  const handleRemoveOpen = () => {
    setTimeout(() => {
      setIsRemovingApparl(true)
    }, 0)
  }
  const handleRemoveClose = () => {
    setTimeout(() => {
      setIsRemovingApparl(false)
    }, 200)
  }

  return (
    <>
      {!emptyStyle && (
        <Box
          width={
            (!isRemovingApparel && isFullHDScreens) ? "26%" :
              (!isRemovingApparel && isNonMobileScreens) ? "30%" :
                (!isRemovingApparel && !isNonMobileScreens) ? "26%" :
                  undefined
          }
          onMouseEnter={isNonMobileScreens ? handleRemoveOpen : undefined}
          onMouseLeave={isNonMobileScreens ? handleRemoveClose : undefined}
          border={`solid 1px ${palette.neutral.medium}`}
          borderRadius={10}
          mt={isSmallMobileScreens ? 0.5 : 1.5}
          ml={!isNonMobileScreens ? 2 : undefined}
          mr={!isNonMobileScreens ? 2 : undefined}
          p={isSmallMobileScreens ? "0 1rem" : "0.5% 1rem"}
        >
          <Box
            display={"flex"}
            justifyContent={"space-between"}
            alignItems={"center"}
            flexWrap={"nowrap"}
            gap={0}
          >
            <Box>
              {/* ----- Default Display Button ----- */}
              {(!emptyStyle && !isRemovingApparel) && (
                <IconButton disabled>
                  <AiOutlineDelete color={palette.neutral.medium} size={isFullHDScreens ? "1.75rem" : "1.4rem"} opacity={1} />
                </IconButton>
              )}

              {/* ----- Hovered Display Buttons ----- */}
              {(isRemovingApparel && !emptyStyle) && (
                <>
                  {stylingShortTops && (
                    <Tooltip title="Remove" placement="top">
                      <IconButton sx={{ padding: "6px" }} onClick={clearShortTops}>
                        <GiPoloShirt
                          color={palette.neutral.medium}
                          size={isFullHDScreens ? "1.75rem" : "1.4rem"}
                          opacity={1} />
                      </IconButton>
                    </Tooltip>
                  )}
                  {stylingLongTops && (
                    <Tooltip title="Remove" placement="top">
                      <IconButton sx={{ padding: "6px" }} onClick={clearLongTops}>
                        <GiShirt
                          color={palette.neutral.medium}
                          size={isFullHDScreens ? "1.75rem" : "1.4rem"}
                          opacity={1} />
                      </IconButton>
                    </Tooltip>
                  )}
                  {stylingOuterwear && (
                    <Tooltip title="Remove" placement="top">
                      <IconButton sx={{ padding: "6px" }} onClick={clearOuterwear}>
                        <GiMonclerJacket
                          color={palette.neutral.medium}
                          size={isFullHDScreens ? "1.75rem" : "1.4rem"}
                          opacity={1} />
                      </IconButton>
                    </Tooltip>
                  )}
                  {stylingOnePiece && (
                    <Tooltip title="Remove" placement="top">
                      <IconButton sx={{ padding: "6px" }} onClick={clearOnePiece}>
                        <GiLargeDress
                          color={palette.neutral.medium}
                          size={isFullHDScreens ? "1.75rem" : "1.4rem"}
                          opacity={1} />
                      </IconButton>
                    </Tooltip>
                  )}
                  {stylingPants && (
                    <Tooltip title="Remove" placement="top">
                      <IconButton sx={{ padding: "6px" }} onClick={clearPants}>
                        <GiArmoredPants
                          color={palette.neutral.medium}
                          size={isFullHDScreens ? "1.75rem" : "1.4rem"}
                          opacity={1} />
                      </IconButton>
                    </Tooltip>
                  )}
                  {stylingShorts && (
                    <Tooltip title="Remove" placement="top">
                      <IconButton sx={{ padding: "6px" }} onClick={clearShorts}>
                        <GiShorts
                          color={palette.neutral.medium}
                          size={isFullHDScreens ? "1.75rem" : "1.4rem"}
                          opacity={1} />
                      </IconButton>
                    </Tooltip>
                  )}
                  {stylingFootwear && (
                    <Tooltip title="Remove" placement="top">
                      <IconButton sx={{ padding: "6px" }} onClick={clearFootwear}>
                        <GiConverseShoe
                          color={palette.neutral.medium}
                          size={isFullHDScreens ? "1.75rem" : "1.4rem"}
                          opacity={1} />
                      </IconButton>
                    </Tooltip>
                  )}
                  {stylingHeadwear && (
                    <Tooltip title="Remove" placement="top">
                      <IconButton sx={{ padding: "6px" }} onClick={clearHeadwear}>
                        <GiBilledCap
                          color={palette.neutral.medium}
                          size={isFullHDScreens ? "1.75rem" : "1.4rem"}
                          opacity={1} />
                      </IconButton>
                    </Tooltip>
                  )}
                  <Tooltip title="Remove All" placement="top">
                    <Button
                      size={!isNonMobileScreens ? "small" : "medium"}
                      onClick={clearAllSections}
                      sx={{
                        color: palette.background.alt,
                        backgroundColor: palette.neutral.medium,
                        borderRadius: "6rem",
                        fontWeight: 800,
                        "&:hover": {
                          color: palette.background.alt,
                          backgroundColor: palette.neutral.main,
                        },
                      }}
                    >
                      All
                    </Button>
                  </Tooltip>
                </>
              )}
            </Box>
            {isRemovingApparel && (
              <IconButton onClick={handleRemoveClose}>
                <IoClose color={palette.neutral.medium} />
              </IconButton>
            )}

            {/* ----- Default Display Button ----- */}
            {!isRemovingApparel && (
              <IconButton onClick={handleRemoveOpen}>
                <MdOutlineChevronRight
                  size={isFullHDScreens ? "1.5rem" : "1.4rem"}
                  color={palette.neutral.medium}
                />
              </IconButton>
            )}
          </Box>
        </Box>
      )}
    </>
  )
}

export default RemoveFromStyleWidget
