import { useNavigate } from "react-router-dom"
import { TfiMapAlt } from "react-icons/tfi"
import { Link, Paper, Box, useTheme, Typography, Button, useMediaQuery } from "@mui/material"
import FlexBetweenBox from "components/FlexBetweenBox"

const DesktopFooter = ({ isLogin }) => {
  const navigate = useNavigate()
  const { palette } = useTheme()
  const isNonMobileScreens = useMediaQuery("(min-width:1000px) and (max-height:2160px)")


  const getRoadmap = () => {
    navigate(`/roadmap`)
  }

  return (
    <Box>
      <Paper sx={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        padding: "0.5rem 1rem",
        backgroundColor: palette.background.default,
        backgroundImage: "none",
        boxShadow: "none"
      }}
        elevation={3}
      >
        <FlexBetweenBox>
          <Box display={"flex"} flexDirection={"row"} gap={4} alignItems={"center"}>
            {isNonMobileScreens && (
              <>
                <Typography fontSize={"0.75rem"} fontWeight={500} color={palette.neutral.medium}>© 2023 Slay.Style</Typography>
                {isLogin ? null : (
                  <Button
                    onClick={getRoadmap}
                    startIcon={<TfiMapAlt />}
                    sx={{
                      color: palette.neutral.main,
                      borderRadius: "6rem",
                      textTransform: "none",
                      fontWeight: 700,
                      "&:hover": {
                        color: palette.primary.main,
                        backgroundColor: palette.background.default,
                      }
                    }}
                  >
                    Roadmap
                  </Button>
                )}
              </>
            )}
          </Box>
          <Typography
            fontSize={"0.75rem"}
            fontWeight={600}
            color={isLogin ? palette.neutral.dark : palette.neutral.main}
          >
            Developer with 💛 by
            <Link href="https://jasonmai.dev/" target="_blank" underline="none" pl={1}>
              JasonMai.dev
            </Link>
          </Typography>
        </FlexBetweenBox>
      </Paper>

    </Box>
  )
}

export default DesktopFooter