import "../../styles/scrollbar.min.css"
import "react-perfect-scrollbar/dist/css/styles.css"
import PerfectScrollbar from "react-perfect-scrollbar"
import { Typography, useMediaQuery, useTheme, Box } from "@mui/material"
import { FiCheckCircle, FiCircle } from "react-icons/fi"

const RoadmapWidget = () => {
  const isNonMobileScreens = useMediaQuery("(min-width:1000px) and (max-height:2160px)")
  const isHDScreens = useMediaQuery("(min-width:1280px) and (max-height:900px)")
  const { palette } = useTheme()

  return (
    <>
      <div className={isHDScreens ? "laptop-apparels-scrollbar" : isNonMobileScreens ? "apparels-scrollbar" : undefined}>
        <PerfectScrollbar component="div">
          <Box
            display="flex"
            flexDirection={"column"}
            alignItems={"flex-start"}
            flexWrap={"no-wrap"}
            className={isHDScreens ? "laptop-apparels-content" : isNonMobileScreens ? "apparels-content" : undefined}
            height={isNonMobileScreens ? "72vh" : undefined}
          >
            {/* Version 1 */}
            <Box gap={2} display={"flex"} flexDirection={"row"} justifyContent={"flex-start"} alignItems={"center"}>
              <Typography variant={"h4"} fontWeight={500} color={palette.neutral.dark}>
                V1 - Alpha MVP
              </Typography>
              <Typography
                padding={"0.25rem 1rem"}
                border={`solid 1px ${palette.neutral.medium}`}
                borderRadius={"6rem"}
                variant={"h6"}
                fontWeight={500}
                color={palette.neutral.medium}>
                Completed
              </Typography>
            </Box>
            <Box>
              <Typography
                p={"1.5rem 0 0.25rem 0"}
                fontWeight={600}
                display={"flex"}
                flexDirection={"row"}
                justifyContent={"flex-start"}
              >
                Features
              </Typography>
              <Box p={"0.5rem 1.5rem 0 1.5rem"}>
                <Typography pb={1}><FiCheckCircle /> Primary user and guest user app registration.</Typography>
                <Typography pb={1}><FiCheckCircle /> Encrypted user authentication.</Typography>
                <Typography pb={1}><FiCheckCircle /> Time-based automatic session closure.</Typography>
                <Typography pb={1}><FiCheckCircle /> Drag and drop apparel upload.</Typography>
                <Typography pb={1}><FiCheckCircle /> Server image optimization.</Typography>
                <Typography pb={1}><FiCheckCircle /> AWS integration.</Typography>
                <Typography pb={1}><FiCheckCircle /> Section-based apparel sorting.</Typography>
                <Typography pb={1}><FiCheckCircle /> Edit apparel names.</Typography>
                <Typography pb={1}><FiCheckCircle /> Delete apparels sync with cloud storage.</Typography>
                <Typography pb={1}><FiCheckCircle /> Create style builder.</Typography>
                <Typography pb={1}><FiCheckCircle /> Edit style builder.</Typography>
                <Typography pb={1}><FiCheckCircle /> Add to favorite styles.</Typography>
                <Typography pb={1}><FiCheckCircle /> Delete style.</Typography>
                <Typography pb={1}><FiCheckCircle /> One-click apparel application or removal on style.</Typography>
                <Typography pb={1}><FiCheckCircle /> *Randomize : Create uniquely random styles on-click.*</Typography>
                <Typography pb={1}><FiCheckCircle /> Section-based apparel clearing widget when creating or editing styles.</Typography>
                <Typography pb={1}><FiCheckCircle /> Automatic apparel sorting mode when creating or editing styles.</Typography>
                <Typography pb={1}><FiCheckCircle /> Paginated horizontal-scrolling styles display.</Typography>
                <Typography pb={1}><FiCheckCircle /> Suitable occasions and event-based style sorting.</Typography>
                <Typography pb={1}><FiCheckCircle /> Mobile responsive scaling.</Typography>
                <Typography pb={1}><FiCheckCircle /> Mobile navigation system.</Typography>
                <Typography pb={1}><FiCheckCircle /> Mobile interaction components.</Typography>
                <Typography pb={1}><FiCheckCircle /> Rate limitation and caching.</Typography>
              </Box>
            </Box>
            <Box pb={2}>
              <Typography
                p={"1.5rem 0 0.25rem 0"}
                fontWeight={600}
                display={"flex"}
                flexDirection={"row"}
                justifyContent={"flex-start"}
              >
                Demo Features / Limitations
              </Typography>
              <Box p={"0.5rem 1.5rem 0 1.5rem"}>
                <Typography pb={1}><FiCheckCircle /> Reset Wardrobe: Restores default set of apparels for styling.</Typography>
                <Typography pb={1}><FiCheckCircle /> Daily Reset limit: 2</Typography>
                <Typography pb={1}><FiCheckCircle /> Daily Apparel Upload limit: 3</Typography>
                <Typography pb={1}><FiCheckCircle /> Daily Style Save limit: 10</Typography>
                <Typography pb={1}><FiCheckCircle /> Daily Apparel / Style Edit limit: 10</Typography>
                <Typography pb={1}><FiCheckCircle /> Daily Apparel / Style Delete limit: 10</Typography>
                <Typography pb={1}><FiCheckCircle /> Automatic limit refresh timer.</Typography>
              </Box>
            </Box>
            {/* Version 2 */}
            <Box
              display="flex"
              flexDirection={"column"}
              alignItems={"flex-start"}
              flexWrap={"no-wrap"}
              className={isHDScreens ? "laptop-apparels-content" : isNonMobileScreens ? "apparels-content" : ""}
              height={"72vh"}
            >
              <Box gap={2} display={"flex"} flexDirection={"row"} justifyContent={"flex-start"} alignItems={"center"}>
                <Typography variant={"h4"} fontWeight={500} color={palette.neutral.dark}>
                  V2
                </Typography>
                <Typography
                  padding={"0.25rem 1rem"}
                  border={`solid 1px ${palette.neutral.medium}`}
                  borderRadius={"6rem"}
                  variant={"h6"}
                  fontWeight={500}
                  color={palette.neutral.medium}>
                  In Progress
                </Typography>
              </Box>
              <Box>
                <Typography
                  p={"1.5rem 0 0.25rem 0"}
                  fontWeight={600}
                  display={"flex"}
                  flexDirection={"row"}
                  justifyContent={"flex-start"}
                >
                  Features
                </Typography>
                <Box p={"0.5rem 1.5rem 0 1.5rem"}>
                  <Typography pb={1}><FiCircle /> Female apparel category expansion.</Typography>
                  <Typography pb={1}><FiCircle /> Female style builder expansion.</Typography>
                  <Typography pb={1}><FiCircle /> Apparel sorting expansion.</Typography>
                  <Typography pb={1}><FiCircle /> Edit apparel category tags and upload.</Typography>
                  <Typography pb={1}><FiCircle /> Calendar event-based style planner.</Typography>
                  <Typography pb={1}><FiCircle /> Ai assisted apparel / style picker.</Typography>
                  <Typography pb={1}><FiCircle /> Automated image background removal integration.</Typography>
                  <Typography pb={1}><FiCircle /> Image edge detection post processing.</Typography>
                  <Typography pb={1}><FiCircle /> User profile expansion.</Typography>
                  <Typography pb={1}><FiCircle /> Full public access and account credits system.</Typography>
                </Box>
              </Box>
            </Box >
          </Box >
        </PerfectScrollbar>
      </div >
    </>
  )
}

export default RoadmapWidget