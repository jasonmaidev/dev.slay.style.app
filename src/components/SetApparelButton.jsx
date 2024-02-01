import { useSelector, useDispatch } from "react-redux"
import { Button, useMediaQuery } from "@mui/material"
import {
  setSortBySection,
  setStylingHeadwear,
  setStylingShortTops,
  setStylingLongTops,
  setStylingOuterwear,
  setStylingOnePiece,
  setStylingPants,
  setStylingShorts,
  setStylingFootwear,
} from "state"

const SetApparelButton = ({ picturePath, apparelId, handleApparelDialogClose }) => {
  const isNonMobileScreens = useMediaQuery("(min-width:1000px) and (max-height:2160px)")
  const isHDScreens = useMediaQuery("(min-width:1280px) and (max-height:900px)")
  const dispatch = useDispatch()

  const creatingStyle = useSelector((state) => state.creatingStyle)
  const sortBySection = useSelector((state) => state.sortBySection)
  const sectionSortingMode = useSelector((state) => state.sectionSortingMode)
  const editingStyle = useSelector((state) => state.editingStyle)
  const stylingHeadwear = useSelector((state) => state.stylingHeadwear)
  const stylingShortTops = useSelector((state) => state.stylingShortTops)
  const stylingLongTops = useSelector((state) => state.stylingLongTops)
  const stylingOnePiece = useSelector((state) => state.stylingOnePiece)
  const stylingOuterwear = useSelector((state) => state.stylingOuterwear)
  const stylingPants = useSelector((state) => state.stylingPants)
  const stylingShorts = useSelector((state) => state.stylingShorts)
  const stylingFootwear = useSelector((state) => state.stylingFootwear)

  const handleApplyToStyle = () => {
    switch (sortBySection) {
      case "headwear":
        if (stylingHeadwear === apparelId) {
          dispatch(setStylingHeadwear({ stylingHeadwear: null }))
        } else {
          dispatch(setStylingHeadwear({ stylingHeadwear: apparelId }))
        }
        if (!isNonMobileScreens) handleApparelDialogClose() // for MobileApparelSelectDialog
        break;
      case "shorttops":
        if (stylingShortTops === apparelId) {
          dispatch(setStylingShortTops({ stylingShortTops: null }))
        } else {
          dispatch(setStylingShortTops({ stylingShortTops: apparelId }))
          if (stylingLongTops) dispatch(setStylingLongTops({ stylingLongTops: null }))
          if (stylingOnePiece) dispatch(setStylingOnePiece({ stylingOnePiece: null }))
          if (sectionSortingMode === "auto" && isNonMobileScreens) dispatch(setSortBySection({ sortBySection: "outerwear" }))
        }
        if (!isNonMobileScreens) handleApparelDialogClose() // for MobileApparelSelectDialog
        break;
      case "longtops":
        if (stylingLongTops === apparelId) {
          dispatch(setStylingLongTops({ stylingLongTops: null }))
        } else {
          dispatch(setStylingLongTops({ stylingLongTops: apparelId }))
          if (stylingShortTops) dispatch(setStylingShortTops({ stylingShortTops: null }))
          if (stylingOnePiece) dispatch(setStylingOnePiece({ stylingOnePiece: null }))
          if (sectionSortingMode === "auto" && isNonMobileScreens) dispatch(setSortBySection({ sortBySection: "outerwear" }))
        }
        if (!isNonMobileScreens) handleApparelDialogClose() // for MobileApparelSelectDialog
        break;
      case "outerwear":
        if (stylingOuterwear === apparelId) {
          dispatch(setStylingOuterwear({ stylingOuterwear: null }))
        } else {
          dispatch(setStylingOuterwear({ stylingOuterwear: apparelId }))
          if (sectionSortingMode === "auto" && isNonMobileScreens) dispatch(setSortBySection({ sortBySection: "pants" }))
        }
        if (!isNonMobileScreens) handleApparelDialogClose() // for MobileApparelSelectDialog
        break;
      case "onepiece":
        if (stylingOnePiece === apparelId) {
          dispatch(setStylingOnePiece({ stylingOnePiece: null }))
        } else {
          dispatch(setStylingOnePiece({ stylingOnePiece: apparelId }))
          if (stylingShortTops) dispatch(setStylingShortTops({ stylingShortTops: null }))
          if (stylingLongTops) dispatch(setStylingLongTops({ stylingLongTops: null }))
          //if (stylingOuterwear) dispatch(setStylingOuterwear({ stylingOuterwear: null }))
          if (stylingPants) dispatch(setStylingPants({ stylingPants: null }))
          if (stylingShorts) dispatch(setStylingShorts({ stylingShorts: null }))
          if (sectionSortingMode === "auto" && isNonMobileScreens) dispatch(setSortBySection({ sortBySection: "footwear" }))
        }
        if (!isNonMobileScreens) handleApparelDialogClose() // for MobileApparelSelectDialog
        break;
      case "pants":
        if (stylingPants === apparelId) {
          dispatch(setStylingPants({ stylingPants: null }))
        } else {
          dispatch(setStylingPants({ stylingPants: apparelId }))
          if (stylingShorts) dispatch(setStylingShorts({ stylingShorts: null }))
          if (stylingOnePiece) dispatch(setStylingOnePiece({ stylingOnePiece: null }))
          if (sectionSortingMode === "auto" && isNonMobileScreens) dispatch(setSortBySection({ sortBySection: "footwear" }))
        }
        if (!isNonMobileScreens) handleApparelDialogClose() // for MobileApparelSelectDialog
        break;
      case "shorts":
        if (stylingShorts === apparelId) {
          dispatch(setStylingShorts({ stylingShorts: null }))
        } else {
          dispatch(setStylingShorts({ stylingShorts: apparelId }))
          if (stylingPants) dispatch(setStylingPants({ stylingPants: null }))
          if (stylingOnePiece) dispatch(setStylingOnePiece({ stylingOnePiece: null }))
          if (sectionSortingMode === "auto" && isNonMobileScreens) dispatch(setSortBySection({ sortBySection: "footwear" }))
        }
        if (!isNonMobileScreens) handleApparelDialogClose() // for MobileApparelSelectDialog
        break;
      case "footwear":
        if (stylingFootwear === apparelId) {
          dispatch(setStylingFootwear({ stylingFootwear: null }))
        } else {
          dispatch(setStylingFootwear({ stylingFootwear: apparelId }))
          if (sectionSortingMode === "auto" && isNonMobileScreens) dispatch(setSortBySection({ sortBySection: "headwear" }))
        }
        if (!isNonMobileScreens) handleApparelDialogClose() // for MobileApparelSelectDialog
        break;
      default:
    }
  }

  return (
    <Button
      onClick={handleApplyToStyle}
      disabled={!creatingStyle && !editingStyle}
    >
      {picturePath && (
        <img
          width={isHDScreens ? "96%" : isNonMobileScreens ? "80%" : "88%"}
          height="auto"
          alt="apparel"
          style={{ borderRadius: "0.75rem", aspectRatio: "1" }}
          src={`https://slay-style-app.s3.us-west-1.amazonaws.com/${picturePath}`}
        />
      )}
    </Button>
  )
}

export default SetApparelButton