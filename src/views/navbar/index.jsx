import { useState, lazy, Suspense, CSSProperties } from "react"
import { useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { IoClose } from "react-icons/io5"
import { FaUserAlt } from "react-icons/fa"
import { TbLogout } from "react-icons/tb"
import { CgMenuGridO } from "react-icons/cg"
import {
  Box,
  IconButton,
  Typography,
  MenuItem,
  useTheme,
  useMediaQuery,
  Button,
  Tooltip,
  ListItemIcon,
  ListItemText,
  Menu,
  Divider
} from "@mui/material"
import { DarkMode, LightMode } from "@mui/icons-material"
import { setMode, setLogout } from "state"
import FlexBetweenBox from "components/FlexBetweenBox"
import UserImage from "components/UserImage"
import PropagateLoader from "react-spinners/PropagateLoader"
const StylesSortingButtons = lazy(() => import("components/StylesSortingButtons"))
const WardrobeSortingButtons = lazy(() => import("components/WardrobeSortingButtons"))

const override: CSSProperties = {
  display: "block",
  margin: "0 auto",
};

const Navbar = ({
  isWardrobe,
  isStyles,
  goToPrevious,
  goToNext,
  pageCount,
  pageNumber,
  updatePageNumber
}) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { _id, picturePath } = useSelector((state) => state.user)
  const isNonMobileScreens = useMediaQuery("(min-width:1000px) and (max-height:2160px)")
  const theme = useTheme()
  const mode = useSelector((state) => state.mode)
  const neutralLight = theme.palette.neutral.light
  const dark = theme.palette.neutral.dark
  const background = theme.palette.background.default
  const primaryLight = theme.palette.primary.light
  const alt = theme.palette.background.alt

  const [isMobileMenuToggled, setIsMobileMenuToggled] = useState(false)

  const getWardrobe = () => {
    navigate(`/wardrobe/${_id}`)
  }

  const getStyles = () => {
    navigate(`/styles/${_id}`)
  }

  /* Options Drowndown Menu */
  const [menuAnchor, setMenuAnchor] = useState(null)
  const open = Boolean(menuAnchor)
  const handleMenuClick = (event) => {
    setMenuAnchor(event.currentTarget)
  }
  const handleMenuClose = () => {
    setMenuAnchor(null)
  }

  return (
    <FlexBetweenBox
      padding="1rem 6%"
      backgroundColor={alt}
      width="100%"
      position="sticky"
      top="0"
      zIndex={theme.zIndex.drawer + 1}
      sx={{ boxShadow: "6px 6px 12px rgba(0,0,0, 0.05)" }}
    >
      <FlexBetweenBox gap="6%">
        {/* ----- Logo ----- */}
        <Button
          onClick={() => navigate("/")}
          padding={0}
          margin={0}
          sx={{ padding: 0, margin: 0, ":hover": { backgroundColor: theme.palette.background.alt, opacity: 0.6 } }}
        >
          <img
            style={{ objectFit: "cover", width: "6rem" }}
            alt="user"
            src={`https://slay-style-app.s3.us-west-1.amazonaws.com/slay-logo-${mode}.png`}
          />
        </Button>

        {/* ----- App Slogan ----- */}
        <Typography fontSize={"0.75rem"} fontWeight={700} color={theme.palette.neutral.dark}>Glow Up Fashion Made Simple</Typography>
      </FlexBetweenBox>

      {/* ----- STYLES PAGE : Desktop Occasion Sorting Buttons ----- */}
      {(isStyles && isNonMobileScreens) && (
        <Suspense fallback={
          <PropagateLoader
            color={theme.palette.neutral.light}
            loading={true}
            cssOverride={override}
            size={15}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        }>
          <StylesSortingButtons
            pageCount={pageCount}
            pageNumber={pageNumber}
            goToPrevious={goToPrevious}
            goToNext={goToNext}
            updatePageNumber={updatePageNumber}
          />
        </Suspense>
      )}

      {/* ----- WARDROBE PAGE : Desktop Section Sorting Buttons ----- */}
      {(isWardrobe && isNonMobileScreens) ?
        <Suspense fallback={
          <PropagateLoader
            color={theme.palette.neutral.light}
            loading={true}
            cssOverride={override}
            size={15}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        }>
          <WardrobeSortingButtons />
        </Suspense> :
        null
      }

      {/* ----- Desktop NavBar Buttons ----- */}
      {isNonMobileScreens ? (
        <FlexBetweenBox gap="2rem">
          <Button
            onClick={getWardrobe}
            sx={isWardrobe ? {
              color: theme.palette.primary.main,
              borderRadius: "6rem",
              textTransform: "none",
              fontWeight: 700,
              "&:hover": {
                color: theme.palette.primary.main,
                backgroundColor: theme.palette.background.alt,
              }
            } : {
              color: theme.palette.neutral.dark,
              borderRadius: "6rem",
              textTransform: "none",
              fontWeight: 700,
              "&:hover": {
                color: theme.palette.primary.main,
                backgroundColor: theme.palette.background.alt,
              }
            }}
          >
            Wardrobe
          </Button>
          <Button
            onClick={getStyles}
            sx={isStyles ? {
              color: theme.palette.primary.main,
              borderRadius: "6rem",
              textTransform: "none",
              fontWeight: 700,
              "&:hover": {
                color: theme.palette.primary.main,
                backgroundColor: theme.palette.background.alt,
              }
            } : {
              color: theme.palette.neutral.dark,
              borderRadius: "6rem",
              textTransform: "none",
              fontWeight: 700,
              "&:hover": {
                color: theme.palette.primary.main,
                backgroundColor: theme.palette.background.alt,
              }
            }
            }
          >
            Styles
          </Button>

          <IconButton onClick={() => dispatch(setMode())}>
            {theme.palette.mode === "dark" ? (
              <DarkMode
                sx={{
                  color: theme.palette.neutral.dark,
                  borderRadius: "6rem",
                  "&:hover": {
                    color: theme.palette.primary.main,
                    backgroundColor: theme.palette.background.alt,
                  }
                }}
              />
            ) : (
              <LightMode
                sx={{
                  color: theme.palette.neutral.dark,
                  borderRadius: "6rem",
                  "&:hover": {
                    color: theme.palette.primary.main,
                    backgroundColor: theme.palette.background.alt,
                  }
                }}
              />
            )}
          </IconButton>

          <Tooltip title="Account">
            <IconButton
              id="basic-IconButton"
              onClick={handleMenuClick}
              sx={{ padding: "4px", margin: 0 }}
            >
              <UserImage userId={_id} image={picturePath} />
            </IconButton>
          </Tooltip>
        </FlexBetweenBox>
      ) : (
        // sets mobile menu icon
        <IconButton onClick={() => setIsMobileMenuToggled(!isMobileMenuToggled)}>
          <CgMenuGridO color={theme.palette.neutral.dark} />
        </IconButton>
      )}

      <Menu
        id="basic-menu"
        anchorEl={menuAnchor}
        open={open}
        onClose={handleMenuClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem onClick={() => navigate(`/`)}>
          <ListItemIcon><FaUserAlt fontSize="small" color={theme.palette.neutral.dark} /></ListItemIcon>
          <ListItemText sx={{ color: theme.palette.neutral.dark }}>Profile</ListItemText>
        </MenuItem>
        <MenuItem onClick={() => dispatch(setLogout())}>
          <ListItemIcon><TbLogout fontSize="large" color={theme.palette.neutral.dark} /></ListItemIcon>
          <ListItemText sx={{ color: theme.palette.neutral.dark }}>Logout</ListItemText>
        </MenuItem>
      </Menu>

      {/* ----- Mobile Nav ----- */}
      {!isNonMobileScreens && isMobileMenuToggled && (
        <Box
          position="fixed"
          right="0"
          bottom="0"
          height="100%"
          zIndex="10"
          maxWidth="500px"
          minWidth="300px"
          backgroundColor={background}
        >
          {/* ----- Close icon ----- */}
          <Box display="flex" justifyContent="flex-end" p="1rem">
            <IconButton
              onClick={() => setIsMobileMenuToggled(!isMobileMenuToggled)}
            >
              <IoClose />
            </IconButton>
          </Box>

          {/* ----- Menu items ----- */}
          <FlexBetweenBox
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            gap="2rem"
          >
            {/* ----- Dark / Light Icons ----- */}
            <IconButton
              onClick={() => dispatch(setMode())}
              sx={{ fontSize: "25px" }}
            >
              {theme.palette.mode === "dark" ? (
                <DarkMode sx={{ fontSize: "25px" }} />
              ) : (
                <LightMode sx={{ color: dark, fontSize: "25px" }} />
              )}
            </IconButton>

            <Button
              onClick={getWardrobe}
              sx={isWardrobe ? {
                color: theme.palette.primary.main,
                borderRadius: "6rem",
                textTransform: "none",
                fontWeight: 700,
                "&:hover": {
                  color: theme.palette.primary.main,
                  backgroundColor: theme.palette.background.default,
                }
              } : {
                color: theme.palette.neutral.dark,
                borderRadius: "6rem",
                textTransform: "none",
                fontWeight: 700,
                "&:hover": {
                  color: theme.palette.primary.main,
                  backgroundColor: theme.palette.background.default,
                }
              }}
            >
              Wardrobe
            </Button>
            <Button
              onClick={getStyles}
              sx={isStyles ? {
                color: theme.palette.primary.main,
                borderRadius: "6rem",
                textTransform: "none",
                fontWeight: 700,
                "&:hover": {
                  color: theme.palette.primary.main,
                  backgroundColor: theme.palette.background.default,
                }
              } : {
                color: theme.palette.neutral.dark,
                borderRadius: "6rem",
                textTransform: "none",
                fontWeight: 700,
                "&:hover": {
                  color: theme.palette.primary.main,
                  backgroundColor: theme.palette.background.default,
                }
              }
              }
            >
              Styles
            </Button>

            <Divider />

            <Button
              onClick={() => navigate(`/`)}
              startIcon={<FaUserAlt />}
              sx={{
                color: theme.palette.neutral.dark,
                borderRadius: "6rem",
                textTransform: "none",
                fontWeight: 700,
                "&:hover": {
                  color: theme.palette.primary.main,
                  backgroundColor: theme.palette.background.default,
                }
              }}
            >
              Profile
            </Button>
            <Button
              onClick={() => dispatch(setLogout())}
              startIcon={<TbLogout />}
              sx={{
                color: theme.palette.neutral.dark,
                borderRadius: "6rem",
                textTransform: "none",
                fontWeight: 700,
                "&:hover": {
                  color: theme.palette.primary.main,
                  backgroundColor: theme.palette.background.default,
                }
              }}
            >
              Logout
            </Button>

          </FlexBetweenBox>
        </Box>
      )}
    </FlexBetweenBox>
  )
}

export default Navbar