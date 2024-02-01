import { Box, useMediaQuery, IconButton, Tooltip, Menu, MenuItem, ListItemIcon, ListItemText, Grow, Dialog, useTheme } from "@mui/material"
import { Delete, Edit, MoreVert, MoreHoriz } from "@mui/icons-material"
import { AiFillStar } from "react-icons/ai"
import { BsStars } from "react-icons/bs"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { styled } from "@mui/system"
import { useState, forwardRef, lazy, Suspense } from "react"
import {
  setCreatingStyle,
  setEditingStyle,
  setEditingStyleId,
  setStylingHeadwear,
  setStylingShortTops,
  setStylingLongTops,
  setStylingOuterwear,
  setStylingOnePiece,
  setStylingPants,
  setStylingShorts,
  setStylingFootwear,
  setStylingOccasions,
  setNextRefreshDate
} from "state"
const ViewStyleWidget = lazy(() => import("./ViewStyleWidget"))
const DeleteStyleWidget = lazy(() => import("./DeleteStyleWidget"))

const Transition = forwardRef(function Transition(props, ref) {
  return <Grow ref={ref} {...props} />
})

const DeleteStyleDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialog-paper": {
    borderRadius: "2rem"
  },
}))

const ViewStyleDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialog-paper": {
    borderRadius: "2rem"
  },
}))

const StyleWidget = ({
  pageNumber,
  styleId,
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
}) => {
  const isSmallMobileScreens = useMediaQuery("(max-width:800px) and (max-height:800px)")
  const isNonMobileScreens = useMediaQuery("(min-width:1000px) and (max-height:2160px)")
  const isFullHDScreens = useMediaQuery("(min-width:1800px) and (max-height:2160px)")
  const token = useSelector((state) => state.token)
  const { palette } = useTheme()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const sortByOccasion = useSelector((state) => state.sortByOccasion)

  const guestUser = useSelector((state) => state.user.guestUser)
  const dailyAllowedEdits = useSelector((state) => state.dailyAllowedEdits)
  const nextRefreshDate = useSelector((state) => state.nextRefreshDate)

  const handleEditStyle = () => {
    dispatch(setCreatingStyle({ creatingStyle: false }))
    dispatch(setEditingStyle({ editingStyle: true }))
    dispatch(setEditingStyleId({ editingStyleId: styleId }))
    dispatch(setStylingHeadwear({ stylingHeadwear: headwear }))
    dispatch(setStylingShortTops({ stylingShortTops: shorttops }))
    dispatch(setStylingLongTops({ stylingLongTops: longtops }))
    dispatch(setStylingOuterwear({ stylingOuterwear: outerwear }))
    dispatch(setStylingOnePiece({ stylingOnePiece: onepiece }))
    dispatch(setStylingPants({ stylingPants: pants }))
    dispatch(setStylingShorts({ stylingShorts: shorts }))
    dispatch(setStylingFootwear({ stylingFootwear: footwear }))
    dispatch(setStylingOccasions({ stylingOccasions: occasions }))
    navigate(`/wardrobe/${userId}`)
  }

  /* Fetch Apparel Data to display in Create Style Widget */
  const getApparels = () => {
    return fetch(`http://localhost:3001/apparels/${userId}`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
  }

  const { data } = useQuery(["apparelsData"], getApparels, {
    keepPreviousData: true,
    staleTime: 15000
  })

  // Displaying Apparels in their sections
  const styleHeadwear = data?.find((apparel) => apparel._id === headwear)
  const styleShortTops = data?.find((apparel) => apparel._id === shorttops)
  const styleLongTops = data?.find((apparel) => apparel._id === longtops)
  const styleOuterwear = data?.find((apparel) => apparel._id === outerwear)
  const styleOnePiece = data?.find((apparel) => apparel._id === onepiece)
  const stylePants = data?.find((apparel) => apparel._id === pants)
  const styleShorts = data?.find((apparel) => apparel._id === shorts)
  const styleFootwear = data?.find((apparel) => apparel._id === footwear)
  const tops = styleShortTops ? styleShortTops : styleLongTops
  const fullLengths = styleOnePiece
  const bottoms = stylePants ? stylePants : styleShorts

  const handleStyleFavorite = () => {
    editStyleMutation.mutate()
  }

  const queryClient = useQueryClient()

  const editStyleMutation = useMutation({
    mutationFn: async () => {
      return await fetch(`http://localhost:3001/styles/${styleId}/update`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ isFavorite: isFavorite === false ? true : false }),
      })
    },
    onError: (error, _styleName, context) => {
      console.log("Error fetching:" + context.id + error)
    },
    onSettled: () => {
      queryClient.invalidateQueries(["stylesData", sortByOccasion, pageNumber])
      handleMenuClose()
    }
  })

  /* Options Drowndown Menu */
  const [menuAnchor, setMenuAnchor] = useState(null)
  const open = Boolean(menuAnchor)
  const handleMenuClick = (event) => {
    setMenuAnchor(event.currentTarget)
  }
  const handleMenuClose = () => {
    setMenuAnchor(null)
  }
  /* Delete Style Dialog Trigger */
  const [deletingStyle, setDeletingStyle] = useState(false)
  const handleDeleteOpen = () => {
    setDeletingStyle(true)
    handleMenuClose()
  }
  const handleDeleteClose = () => {
    setDeletingStyle(false)
  }
  /* View Style Dialog Trigger */
  const [viewingStyle, setViewingStyle] = useState(false)
  const handleViewOpen = () => {
    setViewingStyle(true)
    handleMenuClose()
  }
  const handleViewClose = () => {
    setViewingStyle(false)
  }

  return (
    <>
      <Box
        width={isSmallMobileScreens ? "50%" : isNonMobileScreens ? "22%" : "50%"}
        padding={isSmallMobileScreens ? "0 4%" : isNonMobileScreens ? "0 1%" : "0%"}
        display={"flex"}
        flexDirection={"row"}
      >

        {/* ----- COLUMN: Style Widget ----- */}
        <Box>
          <Box
            display="flex"
            justifyContent={isFavorite ? "space-between" : "flex-end"}
            alignItems="center"
            flexDirection={"row"}
            flexWrap="no-wrap"
          >
            {isFavorite && <BsStars size={isFullHDScreens ? "1.5rem" : "1rem"} color={palette.primary.main} />}

            {/* ----- ... Options ----- */}
            <Tooltip title="More">
              <IconButton
                id="basic-IconButton"
                aria-controls={open ? "positioned-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
                onClick={handleMenuClick}
              >
                {isNonMobileScreens ? <MoreHoriz opacity="0.5" /> : <MoreVert />}
              </IconButton>
            </Tooltip>

            {/* ----- Options menu dropdown ----- */}
            <Menu
              id="positioned-menu"
              aria-labelledby="positioned-button"
              anchorEl={menuAnchor}
              open={open}
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
              <MenuItem onClick={handleStyleFavorite}>
                <ListItemIcon><AiFillStar fontSize="small" /></ListItemIcon>
                <ListItemText>{isFavorite ? "Remove favorite" : "Add to favorite"}</ListItemText>
              </MenuItem>

              <MenuItem onClick={handleEditStyle}>
                <ListItemIcon><Edit fontSize="small" /></ListItemIcon>
                <ListItemText>Edit</ListItemText>
              </MenuItem>

              <MenuItem onClick={handleDeleteOpen}>
                <ListItemIcon><Delete fontSize="small" /></ListItemIcon>
                <ListItemText>Delete</ListItemText>
              </MenuItem>
            </Menu>
          </Box>

          {/* Headwear Section */}
          <Box
            onClick={handleViewOpen}
            zIndex={4}
            position={"relative"}
            top={(styleLongTops || styleOuterwear) ? "4%" : "2%"}
            right={"2%"}
            display={"flex"}
            flexDirection={"row"}
            justifyContent={"center"}
          >
            <img
              width={"16%"}
              height="auto"
              alt="apparel"
              style={{ aspectRatio: "1", borderRadius: "0.5rem" }}
              src={`https://slay-style-app.s3.us-west-1.amazonaws.com/${styleHeadwear ? styleHeadwear?.picturePath : "placeholder.png"}`}
            />
          </Box>

          {/* Tops Section */}
          <Box
            onClick={handleViewOpen}
            display={"flex"}
            flexDirection={"row"}
            alignItems={"center"}
          >
            {(styleShortTops || styleLongTops) && (
              <Box
                zIndex={3}
                position={"relative"}
                left={styleOuterwear ? "15%" : (!styleShortTops && !styleOuterwear) ? "24%" : "30%"}
              >
                <img
                  width={
                    (!styleShortTops && !styleOuterwear) ? "50%" :
                      (!styleLongTops && !styleOuterwear) ? "40%" :
                        (styleLongTops && styleOuterwear) ? "100%" :
                          "80%"
                  }
                  height="auto"
                  alt="apparel"
                  style={{ aspectRatio: "1", borderRadius: "0.5rem" }}
                  src={`https://slay-style-app.s3.us-west-1.amazonaws.com/${tops?.picturePath}`}
                />
              </Box>
            )}

            {/* Dress Section */}
            {styleOnePiece && (
              <Box
                onClick={handleViewOpen}
                zIndex={3}
                position={"relative"}
                left={styleOuterwear ? "25%" : null}
                display={"flex"}
                flexDirection={"row"}
                justifyContent={"center"}
              >
                <img
                  width={styleOuterwear ? "180%" : "100%"}
                  height="auto"
                  alt="apparel"
                  style={{ aspectRatio: "1", borderRadius: "0.5rem" }}
                  src={`https://slay-style-app.s3.us-west-1.amazonaws.com/${fullLengths?.picturePath}`}
                />
              </Box>
            )}

            {/* Outerwear Section */}
            {styleOuterwear && (
              <Box
                onClick={handleViewOpen}
                zIndex={2}
                position={"relative"}
                right={styleOnePiece ? null : "10%"}
                left={styleOnePiece ? "10%" : (!styleShortTops && !styleLongTops) ? "25%" : null}
              >
                <img
                  width={styleOnePiece ? "100%" : (!styleShortTops && !styleLongTops) ? "50%" : "100%"}
                  height="auto"
                  alt="apparel"
                  style={{ aspectRatio: "1", borderRadius: "0.5rem" }}
                  src={`https://slay-style-app.s3.us-west-1.amazonaws.com/${styleOuterwear?.picturePath}`}
                />
              </Box>
            )}
          </Box>

          {/* Bottom Section */}
          {(stylePants || styleShorts) && (
            <Box
              onClick={handleViewOpen}
              zIndex={1}
              position={"relative"}
              bottom={(styleShorts && styleLongTops) ? "10%" : (styleShorts && styleLongTops) ? "6%" : "9%"}
              top={(!styleShortTops && !styleLongTops && !styleOuterwear) ? "28%" : null}
              display={"flex"}
              flexDirection={"row"}
              justifyContent={"center"}
            >
              <img
                width={stylePants ? "50%" : "26%"}
                height="auto"
                alt="apparel"
                style={{ aspectRatio: "1", borderRadius: "0.5rem" }}
                src={`https://slay-style-app.s3.us-west-1.amazonaws.com/${bottoms?.picturePath}`}
              />
            </Box>
          )}

          {/* Footwear Section */}
          {styleFootwear && (
            <Box
              onClick={handleViewOpen}
              zIndex={5}
              position={"relative"}
              bottom={styleOnePiece ? "10%" : "14%"}
              left={styleOnePiece ? "40%" : "12%"}
              top={
                (styleShorts && (styleShortTops || styleLongTops || styleOuterwear)) ? "-12%" :
                  (!styleShortTops && !styleLongTops && !styleOuterwear && !styleOnePiece) ? "15%" :
                    (!stylePants && !styleShorts && !styleOnePiece) ? "10%" :
                      null}
              display={"flex"}
              flexDirection={"row"}
              justifyContent={"center"}
            >
              <img
                width={"20%"}
                height="auto"
                alt="apparel"
                style={{ aspectRatio: "1", borderRadius: "0.5rem" }}
                src={`https://slay-style-app.s3.us-west-1.amazonaws.com/${styleFootwear?.picturePath}`}
              />
            </Box>
          )}
        </Box>
      </Box>
      {/* ----- Delete Style popup ----- */}
      <DeleteStyleDialog
        open={deletingStyle}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleDeleteClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <Suspense fallback="Loading...">
          <DeleteStyleWidget userId={userId} styleId={styleId} pageNumber={pageNumber} handleDeleteClose={handleDeleteClose} />
        </Suspense>
      </DeleteStyleDialog>

      {/* ----- View Style popup ----- */}
      <ViewStyleDialog
        open={viewingStyle}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleViewClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <Suspense fallback="Loading...">
          <ViewStyleWidget
            userId={userId}
            styleId={styleId}
            pageNumber={pageNumber}
            styleHeadwear={styleHeadwear}
            tops={tops}
            styleShortTops={styleShortTops}
            styleLongTops={styleLongTops}
            styleOuterwear={styleOuterwear}
            styleOnePiece={styleOnePiece}
            stylePants={stylePants}
            styleShorts={styleShorts}
            styleFootwear={styleFootwear}
            fullLengths={fullLengths}
            bottoms={bottoms}
            handleViewClose={handleViewClose}
          />
        </Suspense>
      </ViewStyleDialog>
    </>
  )
}

export default StyleWidget