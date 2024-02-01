import { useState, forwardRef } from "react";
import { useDispatch, useSelector } from "react-redux"
import { useQuery, useMutation } from "@tanstack/react-query"
import { IoClose } from "react-icons/io5"
import { FaArrowRight } from "react-icons/fa"
import { CiCircleRemove } from "react-icons/ci"
import Countdown from "react-countdown";
import { Box, Button, useMediaQuery, IconButton, Typography, useTheme, styled, Dialog, Slide, Snackbar } from "@mui/material"
import {
  setLogout,
  setCreatingStyle,
  setDailyAllowedUploads,
  setDailyAllowedSaves,
  setDailyAllowedEdits,
  setDailyAllowedDeletes,
  setNextRefreshDate,
  setDailyAllowedResets
} from "state"
import RemoveFromStyleWidget from "./RemoveFromStyleWidget";
import RandomizeStyleButton from "components/RandomizeStyleButton"
import MultipleSelect from "components/MultipleSelect";
import FlexBetweenBox from "components/FlexBetweenBox"
import FlexEvenlyBox from "components/FlexEvenlyBox";
import MobileApparelSelectDialog from "components/MobileApparelSelectDialog"
import MobileApparelSortingSideBar from "./MobileApparelSortingSideBar"

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="left" ref={ref} {...props} />;
});

const ApparelSelectDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialog-paper": {
    borderRadius: "2rem"
  },
}));

const MobileCreateStyleWidget = ({ userId }) => {
  const isSmallMobileScreens = useMediaQuery("(max-width:800px) and (max-height:800px)")
  const token = useSelector((state) => state.token)
  const { palette } = useTheme()
  const dispatch = useDispatch()

  /* Guest User State */
  const [stylesCount, setStylesCount] = useState(0)
  const guestUser = useSelector((state) => state.user.guestUser)
  const dailyAllowedSaves = useSelector((state) => state.dailyAllowedSaves)
  const nextRefreshDate = useSelector((state) => state.nextRefreshDate)

  const refreshGuestActions = () => {
    dispatch(setDailyAllowedResets({ dailyAllowedResets: 2 }))
    dispatch(setDailyAllowedUploads({ dailyAllowedUploads: 3 }))
    dispatch(setDailyAllowedSaves({ dailyAllowedSaves: 10 }))
    dispatch(setDailyAllowedEdits({ dailyAllowedEdits: 10 }))
    dispatch(setDailyAllowedDeletes({ dailyAllowedDeletes: 10 }))
    dispatch(setNextRefreshDate({ nextRefreshDate: null }))
  }

  // Countdown renderer callback with condition
  const renderer = ({ hours, minutes, seconds, completed }) => {
    if (completed) {
      refreshGuestActions()
    } else {
      return (
        <span>
          {hours}:{minutes}:{seconds}
        </span>
      );
    }
  }

  // Current section-based apparel IDs from global state
  const stylingHeadwear = useSelector((state) => state.stylingHeadwear)
  const stylingShortTops = useSelector((state) => state.stylingShortTops)
  const stylingLongTops = useSelector((state) => state.stylingLongTops)
  const stylingOuterwear = useSelector((state) => state.stylingOuterwear)
  const stylingOnePiece = useSelector((state) => state.stylingOnePiece)
  const stylingPants = useSelector((state) => state.stylingPants)
  const stylingShorts = useSelector((state) => state.stylingShorts)
  const stylingFootwear = useSelector((state) => state.stylingFootwear)

  const emptyStyle = !stylingShortTops &&
    !stylingLongTops &&
    !stylingOuterwear &&
    !stylingOnePiece &&
    !stylingPants &&
    !stylingShorts &&
    !stylingFootwear &&
    !stylingHeadwear

  // Fetch Apparel Data to display in Create Style Widget
  const getApparels = () => {
    return fetch(`http://localhost:3001/apparels/${userId}`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
  }
  const { data } = useQuery(["apparelsData"], getApparels)

  if (data?.message === 'jwt expired') {
    console.log('logout from edit style widget')
    alert('App session has expired. Please login again.')
    dispatch(setLogout())
  }

  // Match apparel IDs to apparels data to find its picturePath to display in style widget
  const selectedHeadwear = data?.find((apparel) => apparel._id === stylingHeadwear)
  const selectedShortTops = data?.find((apparel) => apparel._id === stylingShortTops)
  const selectedLongTops = data?.find((apparel) => apparel._id === stylingLongTops)
  const selectedOuterwear = data?.find((apparel) => apparel._id === stylingOuterwear)
  const selectedOnePiece = data?.find((apparel) => apparel._id === stylingOnePiece)
  const selectedPants = data?.find((apparel) => apparel._id === stylingPants)
  const selectedShorts = data?.find((apparel) => apparel._id === stylingShorts)
  const selectedFootwear = data?.find((apparel) => apparel._id === stylingFootwear)
  // Display either-or section based on availability
  const tops = selectedShortTops ? selectedShortTops : selectedLongTops
  const fullLengths = selectedOnePiece
  const bottoms = selectedPants ? selectedPants : selectedShorts

  /* Set suitableFor function passed down to MultipleSelect Child Component */
  // "suitableFor" state consumed by createStyle mutation
  const [suitableFor, setSuitableFor] = useState([])
  const updateSuitableFor = (selectedSuitableFor) => {
    setSuitableFor(selectedSuitableFor)
  }

  // Create style Mutation
  const handleCreateStyle = () => {
    if (stylesCount >= 20) {
      handleGuestSnackbarOpen()
      return
    }
    createStyleMutation.mutate()
  }

  const createStyleMutation = useMutation({
    mutationFn: async () => {
      return await fetch(`http://localhost:3001/styles/`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: userId,
          headwear: stylingHeadwear,
          shorttops: stylingShortTops,
          longtops: stylingLongTops,
          outerwear: stylingOuterwear,
          onepiece: stylingOnePiece,
          pants: stylingPants,
          shorts: stylingShorts,
          footwear: stylingFootwear,
          occasions: suitableFor
        }),
      })
    },
    onError: (error, _styleName, context) => {
      console.log("Error fetching:" + context.id + error)
    },
    onSettled: () => {
      handleSnackbarOpen()
      dispatch(setDailyAllowedSaves({ dailyAllowedSaves: dailyAllowedSaves - 1 }))
      if (dailyAllowedSaves === 1 && !nextRefreshDate) {
        dispatch(setNextRefreshDate({ nextRefreshDate: Date.now() + 86400000 }))
      }
    }
  })

  const getStylesCount = () => {
    return fetch(`http://localhost:3001/styles/${userId}/count`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then(totalStylesCount => {
        setStylesCount(totalStylesCount)
      })
  }

  const { data: stylesCountData } = useQuery(["stylesCountData"], getStylesCount, {
    keepPreviousData: true,
    staleTime: 3000
  });

  /* Apparel Select SlideLeft Dialog State */
  const [apparelsDialogOpen, setApparelsDialogOpen] = useState(false);
  const handleApparelsDialogClose = () => {
    setApparelsDialogOpen(false);
  };
  // Update Dialog open state passed down to MobileApparelSortingSideBar component
  const updateApparelsDialogOpen = (apparelsDialogOpenProp) => {
    setApparelsDialogOpen(apparelsDialogOpenProp)
  }

  /* Snackbar State */
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const handleSnackbarOpen = () => {
    setOpenSnackbar(true);
  };
  const handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSnackbar(false);
  };
  const saveAction = (
    <>
      <IconButton size="small" aria-label="close" color="inherit" onClick={handleSnackbarClose}>
        <IoClose />
      </IconButton>
    </>
  )

  const [openGuestSnackbar, setOpenGuestSnackbar] = useState(false);
  const handleGuestSnackbarOpen = () => {
    setOpenGuestSnackbar(true);
  };
  const handleGuestSnackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenGuestSnackbar(false);
  };
  const guestAction = (
    <>
      <IconButton size="small" aria-label="close" color="inherit" onClick={handleGuestSnackbarClose}>
        <IoClose />
      </IconButton>
    </>
  )

  return (
    <Box>
      <FlexBetweenBox>
        <Typography color={palette.neutral.dark} fontWeight={400} fontSize={"1.5rem"}>Creating Style</Typography>
        <IconButton onClick={() => dispatch(setCreatingStyle({ creatingStyle: false }))}>
          <CiCircleRemove color={palette.neutral.medium} size={isSmallMobileScreens ? "2rem" : "2.5rem"} />
        </IconButton>
      </FlexBetweenBox>

      <FlexEvenlyBox>
        <RandomizeStyleButton data={data} />
        <MultipleSelect updateSuitableFor={updateSuitableFor} />
        <Button
          disabled={emptyStyle || openSnackbar || (dailyAllowedSaves < 1 && guestUser)}
          onClick={handleCreateStyle}
          variant="outlined"
          size="medium"
          sx={isSmallMobileScreens ? {
            padding: "0.5rem 2.5rem",
            borderRadius: "6rem",
            fontWeight: 600,
            color: palette.neutral.dark,
            borderColor: palette.neutral.dark,
            "&:hover": {
              color: palette.primary.main,
            }
          } : {
            padding: "1rem 2.5rem",
            borderRadius: "6rem",
            fontWeight: 600,
            color: palette.neutral.dark,
            borderColor: palette.neutral.dark,
            "&:hover": {
              color: palette.primary.main,
            }
          }}
        >
          Save
        </Button>
      </FlexEvenlyBox>

      {guestUser && (
        <Box
          display={"flex"}
          flexDirection={"row"}
          justifyContent={"center"}
          alignItems={"center"}
          borderRadius={"6rem"}
          margin={"0.5rem"}
          gap={2}
        >
          <Typography>Saves Remaining: {dailyAllowedSaves}</Typography>
          {dailyAllowedSaves < 1 && (
            <Box>
              <Typography>
                Refreshes in: <Countdown date={nextRefreshDate} renderer={renderer} />
              </Typography>
            </Box>
          )}
        </Box>
      )}

      <RemoveFromStyleWidget emptyStyle={emptyStyle} />

      {/* ----- Widget Container ----- */}
      <Box
        width="100%"
        padding={isSmallMobileScreens ? "0 2%" : "0 2%"}
        display="flex"
        flexDirection={"row"}
        gap="0.5rem"
        justifyContent="center"
      >
        {/* ----- Style Widget ----- */}
        <Box flexBasis={isSmallMobileScreens ? "88%" : "80%"}>

          {/* ----- Start Here Box ----- */}
          {emptyStyle && (
            <Box
              display={"flex"}
              flexDirection={"row"}
              justifyContent={"center"}
              margin={isSmallMobileScreens ? "3rem" : "2rem"}
            >
              <Button
                variant="outlined"
                size="large"
                disabled
                endIcon={<FaArrowRight size={isSmallMobileScreens ? "1.5rem" : "1rem"} margin={"1rem"} />}
                sx={isSmallMobileScreens ? {
                  margin: 0,
                  padding: "4rem 1.5rem",
                  borderRadius: "2rem",
                } : {
                  margin: "0 0.5rem",
                  padding: "5rem 3rem",
                  borderRadius: "2rem",
                }}
              >
                <Typography >
                  Select an apparel
                </Typography>
              </Button>
            </Box>
          )}

          {/* Headwear Section */}
          <Box
            zIndex={4}
            position={"relative"}
            top={(stylingLongTops || stylingOuterwear) ? "4%" : "2%"}
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
              src={`https://slay-style-app.s3.us-west-1.amazonaws.com/${stylingHeadwear ? selectedHeadwear?.picturePath : "placeholder.png"}`}
            />
          </Box>

          {/* Tops Section */}
          <Box
            display={"flex"}
            flexDirection={"row"}
            alignItems={"center"}
          >
            {(stylingShortTops || stylingLongTops) && (
              <Box
                zIndex={3}
                position={"relative"}
                left={stylingOuterwear ? "15%" : (!stylingShortTops && !stylingOuterwear) ? "24%" : "30%"}
              >
                <img
                  width={
                    (!stylingShortTops && !stylingOuterwear) ? "50%" :
                      (!stylingLongTops && !stylingOuterwear) ? "40%" :
                        (stylingLongTops && stylingOuterwear) ? "100%" :
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
            {stylingOnePiece && (
              <Box
                zIndex={3}
                position={"relative"}
                left={stylingOuterwear ? "25%" : null}
                display={"flex"}
                flexDirection={"row"}
                justifyContent={"center"}
              >
                <img
                  width={stylingOuterwear ? "180%" : "100%"}
                  height="auto"
                  alt="apparel"
                  style={{ aspectRatio: "1", borderRadius: "0.5rem" }}
                  src={`https://slay-style-app.s3.us-west-1.amazonaws.com/${fullLengths?.picturePath}`}
                />
              </Box>
            )}

            {/* Outerwear Section */}
            {stylingOuterwear && (
              <Box
                zIndex={2}
                position={"relative"}
                right={stylingOnePiece ? null : "10%"}
                left={stylingOnePiece ? "10%" : (!stylingShortTops && !stylingLongTops) ? "25%" : null}
              >
                <img
                  width={stylingOnePiece ? "100%" : (!stylingShortTops && !stylingLongTops) ? "50%" : "100%"}
                  height="auto"
                  alt="apparel"
                  style={{ aspectRatio: "1", borderRadius: "0.5rem" }}
                  src={`https://slay-style-app.s3.us-west-1.amazonaws.com/${selectedOuterwear?.picturePath}`}
                />
              </Box>
            )}
          </Box>

          {/* Bottom Section */}
          {(stylingPants || stylingShorts) && (
            <Box
              zIndex={1}
              position={"relative"}
              bottom={(stylingShorts && stylingLongTops) ? "10%" : (stylingShorts && stylingLongTops) ? "6%" : "9%"}
              top={(!stylingShortTops && !stylingLongTops && !stylingOuterwear) ? "28%" : null}
              display={"flex"}
              flexDirection={"row"}
              justifyContent={"center"}
            >
              <img
                width={stylingPants ? "50%" : "26%"}
                height="auto"
                alt="apparel"
                style={{ aspectRatio: "1", borderRadius: "0.5rem" }}
                src={`https://slay-style-app.s3.us-west-1.amazonaws.com/${bottoms?.picturePath}`}
              />
            </Box>
          )}

          {/* Footwear Section */}
          {stylingFootwear && (
            <Box
              zIndex={5}
              position={"relative"}
              bottom={stylingOnePiece ? "10%" : "14%"}
              left={stylingOnePiece ? "40%" : "12%"}
              top={
                (stylingShorts && (stylingShortTops || stylingLongTops || stylingOuterwear)) ? "-12%" :
                  (!stylingShortTops && !stylingLongTops && !stylingOuterwear && !stylingOnePiece) ? "15%" :
                    (!stylingPants && !stylingShorts && !stylingOnePiece) ? "10%" :
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
                src={`https://slay-style-app.s3.us-west-1.amazonaws.com/${selectedFootwear?.picturePath}`}
              />
            </Box>
          )}
        </Box>

        {/* Mobile Apparel Sorting Buttons while Creating Style */}
        <MobileApparelSortingSideBar updateApparelsDialogOpen={updateApparelsDialogOpen} />
      </Box>

      {/* ----- Snackbar on Saving Style ----- */}
      <div>
        <Snackbar
          sx={{ height: "auto" }}
          anchorOrigin={{
            vertical: "top",
            horizontal: "center"
          }}
          open={openSnackbar}
          autoHideDuration={2000}
          onClose={handleSnackbarClose}
          message="Style saved."
          action={saveAction}
        />
      </div>

      {/* ----- Snackbar on Guest Action Limits Reached ----- */}
      <div>
        <Snackbar
          sx={{ height: "auto" }}
          anchorOrigin={{
            vertical: "top",
            horizontal: "center"
          }}
          open={openGuestSnackbar}
          autoHideDuration={8000}
          onClose={handleGuestSnackbarClose}
          message="Each user may store up to 20 styles during closed beta. Please stay tuned for updates and storage expansions in V2 release. Thanks!"
          action={guestAction}
        />
      </div>

      {/* ----- Mobile Slide in Apparel Select ----- */}
      <ApparelSelectDialog
        open={apparelsDialogOpen}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleApparelsDialogClose}
        aria-describedby="alert-dialog-slide-description"
        disableScrollLock
      >
        <MobileApparelSelectDialog handleApparelDialogClose={handleApparelsDialogClose} />
      </ApparelSelectDialog>
    </Box >
  )
}

export default MobileCreateStyleWidget