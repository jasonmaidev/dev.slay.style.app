import {
  IconButton,
  Typography,
  useTheme,
  useMediaQuery,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Grow,
  Dialog,
  Tooltip,
  Box
} from "@mui/material"
import { ZoomIn, Delete, Edit, MoreVert, MoreHoriz } from "@mui/icons-material"
import { useState, forwardRef, lazy, Suspense, CSSProperties } from "react"
import { styled } from "@mui/system"
import BounceLoader from "react-spinners/BounceLoader"
import PuffLoader from "react-spinners/PuffLoader"
const ViewApparelWidget = lazy(() => import("./ViewApparelWidget"))
const EditApparelWidget = lazy(() => import("./EditApparelWidget"))
const DeleteApparelWidget = lazy(() => import("./DeleteApparelWidget"))
const SetApparelButton = lazy(() => import("components/SetApparelButton"))

const Transition = forwardRef(function Transition(props, ref) {
  return <Grow ref={ref} {...props} />
})

const ApparelOptionsDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialog-paper": {
    borderRadius: "2rem"
  },
}))

const ApparelWidget = ({
  apparelId,
  apparelUserId,
  name,
  description,
  picturePath,
  section,
  colors,
  category,
  occasions,
  brand,
  own
}) => {
  const isNonMobileScreens = useMediaQuery("(min-width:1000px) and (max-height:2160px)")
  const isHDScreens = useMediaQuery("(min-width:1280px) and (max-height:900px)")
  const { palette } = useTheme()

  /* Options Drowndown Menu */
  const [menuAnchor, setMenuAnchor] = useState(null)
  const menuOpen = Boolean(menuAnchor)
  const handleMenuClick = (event) => {
    setMenuAnchor(event.currentTarget)
  }
  const handleMenuClose = () => {
    setMenuAnchor(null)
  }

  /* View , Edit, Delete Dialog State */
  const [viewing, setViewing] = useState(false)
  const handleViewOpen = () => {
    setViewing(true)
    handleMenuClose()
  }
  const handleViewClose = () => {
    setViewing(false)
  }

  const [editing, setEditing] = useState(false)
  const handleEditOpen = () => {
    setEditing(true)
    handleMenuClose()
  }
  const handleEditClose = () => {
    setEditing(false)
  }

  const [deleting, setDeleting] = useState(false)
  const handleDeleteOpen = () => {
    setDeleting(true)
    handleMenuClose()
  }
  const handleDeleteClose = () => {
    setDeleting(false)
  }

  // Remove file extension from apparel name
  const displayName = name.replace(/\..*$/, "")

  const apparelimageoverride: CSSProperties = {
    display: "block",
    margin: "0 auto",
  }

  return (
    <Box width={isHDScreens ? "22%" : isNonMobileScreens ? "24%" : "48%"}>

      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        flexWrap="no-wrap"
        padding="0 0.5rem"
      >
        <Typography color={palette.neutral.medium} noWrap>
          {displayName}
        </Typography>

        {/* ----- Options ----- */}
        <Tooltip title="More">
          <IconButton
            id="basic-IconButton"
            aria-controls={menuOpen ? "positioned-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={menuOpen ? "true" : undefined}
            onClick={handleMenuClick}
          >
            {isNonMobileScreens ? <MoreHoriz style={{ color: palette.neutral.medium }} /> :
              <MoreVert style={{ color: palette.neutral.medium }} />}
          </IconButton>
        </Tooltip>

        {/* ----- Options Dropdown ----- */}
        <Menu
          id="positioned-menu"
          aria-labelledby="positioned-button"
          anchorEl={menuAnchor}
          open={menuOpen}
          onClose={handleMenuClose}
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
        >
          <MenuItem onClick={handleViewOpen}>
            <ListItemIcon><ZoomIn fontSize="small" /></ListItemIcon>
            <ListItemText>View</ListItemText>
          </MenuItem>

          <MenuItem onClick={handleEditOpen}>
            <ListItemIcon><Edit fontSize="small" /></ListItemIcon>
            <ListItemText>Edit</ListItemText>
          </MenuItem>

          <MenuItem onClick={handleDeleteOpen}>
            <ListItemIcon><Delete fontSize="small" /></ListItemIcon>
            <ListItemText>Delete</ListItemText>
          </MenuItem>
        </Menu>
      </Box>

      {/* Apparel picture thumbnail button */}
      <Suspense fallback={
        <BounceLoader
          color={palette.neutral.light}
          loading={true}
          cssOverride={apparelimageoverride}
          // size={60}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      }>
        <SetApparelButton picturePath={picturePath} apparelId={apparelId} />
      </Suspense>

      {/* ----- View Popup ----- */}
      <ApparelOptionsDialog
        open={viewing}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleViewClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <Suspense fallback={
          <PuffLoader
            color={palette.neutral.light}
            loading={true}
            cssOverride={apparelimageoverride}
            size={200}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        }>
          <ViewApparelWidget
            apparelId={apparelId}
            name={name}
            section={section}
            picturePath={picturePath}
            handleViewClose={handleViewClose}
          />
        </Suspense>
      </ApparelOptionsDialog>

      {/* ----- Edit Popup ----- */}
      <ApparelOptionsDialog
        open={editing}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleEditClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <Suspense fallback={
          <BounceLoader
            color={palette.neutral.light}
            loading={true}
            cssOverride={apparelimageoverride}
            size={200}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        }>
          <EditApparelWidget
            apparelId={apparelId}
            name={name}
            section={section}
            picturePath={picturePath}
            handleEditClose={handleEditClose}
          />
        </Suspense>
      </ApparelOptionsDialog>

      {/* ----- Delete Popup ----- */}
      <ApparelOptionsDialog
        open={deleting}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleDeleteClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <Suspense fallback={
          <PuffLoader
            color={palette.neutral.light}
            loading={true}
            cssOverride={apparelimageoverride}
            size={200}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        }>
          <DeleteApparelWidget
            apparelId={apparelId}
            name={name}
            section={section}
            picturePath={picturePath}
            handleDeleteClose={handleDeleteClose}
          />
        </Suspense>
      </ApparelOptionsDialog>
    </Box>
  )
}

export default ApparelWidget












