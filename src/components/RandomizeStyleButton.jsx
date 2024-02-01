import "../styles/randomize-button.min.css"
import { FaWandMagicSparkles } from "react-icons/fa6"
import { useDispatch, useSelector } from "react-redux"
import { Tooltip, useMediaQuery } from "@mui/material"
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

const RandomizeStyleButton = ({ data }) => {
  const isSmallMobileScreens = useMediaQuery("(max-width:800px) and (max-height:800px)")
  const isFullHDScreens = useMediaQuery("(min-width:1800px) and (max-height:2160px)")
  const dispatch = useDispatch()
  const mode = useSelector((state) => state.mode)

  const randomize = () => {
    // All apparels per section
    const headwear = data?.filter(apparel => apparel.section === "headwear")
    const shorttops = data?.filter(apparel => apparel.section === "shorttops")
    const longtops = data?.filter(apparel => apparel.section === "longtops")
    const outerwear = data?.filter(apparel => apparel.section === "outerwear")
    const pants = data?.filter(apparel => apparel.section === "pants")
    const shorts = data?.filter(apparel => apparel.section === "shorts")
    const footwear = data?.filter(apparel => apparel.section === "footwear")

    // Get the ID of a random apparel per section
    const randomHeadwear = headwear.length ? headwear[Math.floor(Math.random() * headwear.length)]._id : null
    const randomShortTops = shorttops.length ? shorttops[Math.floor(Math.random() * shorttops.length)]._id : null
    const randomLongTops = longtops.length ? longtops[Math.floor(Math.random() * longtops.length)]._id : null
    const randomOuterwear = outerwear.length ? outerwear[Math.floor(Math.random() * outerwear.length)]._id : null
    const randomPants = pants.length ? pants[Math.floor(Math.random() * pants.length)]._id : null
    const randomShorts = shorts.length ? shorts[Math.floor(Math.random() * shorts.length)]._id : null
    const randomFootwear = footwear.length ? footwear[Math.floor(Math.random() * footwear.length)]._id : null

    const setRandomHeadwear = () => {
      const headwearChance = Math.floor(Math.random() * 2)
      if (headwearChance === 1) {
        dispatch(setStylingHeadwear({ stylingHeadwear: randomHeadwear }))
      } else {
        dispatch(setStylingHeadwear({ stylingHeadwear: null }))
      }
    }

    const setRandomTops = () => {
      const topsChance = Math.floor(Math.random() * 2)
      if (topsChance === 1) {
        dispatch(setStylingLongTops({ stylingLongTops: null }))
        dispatch(setStylingShortTops({ stylingShortTops: randomShortTops }))
        dispatch(setStylingOnePiece({ StylingOnePiece: null }))
      } else {
        dispatch(setStylingShortTops({ stylingShortTops: null }))
        dispatch(setStylingLongTops({ stylingLongTops: randomLongTops }))
        dispatch(setStylingOnePiece({ StylingOnePiece: null }))
      }
    }

    const setRandomOuterWear = () => {
      const outerwearChance = Math.floor(Math.random() * 2)
      if (outerwearChance === 1) {
        dispatch(setStylingOuterwear({ stylingOuterwear: randomOuterwear }))
      } else {
        dispatch(setStylingOuterwear({ stylingOuterwear: null }))
      }
    }

    const setRandomBottoms = () => {
      const bottomsChance = Math.floor(Math.random() * 4)
      if (bottomsChance >= 1) {
        dispatch(setStylingPants({ stylingPants: randomPants }))
        dispatch(setStylingShorts({ stylingShorts: null }))
        dispatch(setStylingOnePiece({ StylingOnePiece: null }))
      } else {
        dispatch(setStylingShorts({ stylingShorts: randomShorts }))
        dispatch(setStylingPants({ stylingPants: null }))
        dispatch(setStylingOnePiece({ StylingOnePiece: null }))
      }
    }

    setRandomHeadwear()
    setRandomTops()
    setRandomOuterWear()
    setRandomBottoms()
    dispatch(setStylingFootwear({ stylingFootwear: randomFootwear }))
  }

  return (
    <Tooltip title="Randomize" placement="bottom">
      <button onClick={randomize} className={mode === "light" ? "randomize-button" : "randomize-button-dark"}>
        <FaWandMagicSparkles size={isFullHDScreens ? "1.5rem" : isSmallMobileScreens ? "1rem" : "1.25rem"} />
      </button>
    </Tooltip>
  )
}

export default RandomizeStyleButton