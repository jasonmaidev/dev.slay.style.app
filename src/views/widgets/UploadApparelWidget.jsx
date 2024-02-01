import "../../styles/radio-button.min.css"
import { useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { IoClose } from "react-icons/io5"
import { BiEditAlt } from "react-icons/bi"
import { PiWarning } from "react-icons/pi"
import { ImAttachment } from "react-icons/im"
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
import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query"
import Countdown from "react-countdown"
import Dropzone from "react-dropzone"
import { Box, Typography, InputBase, useTheme, Button, IconButton, useMediaQuery, Tooltip, Snackbar } from "@mui/material"
import {
  setSortBySection,
  setDailyAllowedUploads,
  setDailyAllowedSaves,
  setDailyAllowedEdits,
  setDailyAllowedDeletes,
  setNextRefreshDate,
  setDailyAllowedResets
} from "state"
import { RadioButton } from "components/RadioButton"
import FlexBetweenBox from "components/FlexBetweenBox"

const UploadApparelWidget = ({ handleUploadClose }) => {
  const isSmallMobileScreens = useMediaQuery("(max-width:800px) and (max-height:800px)")
  const isNonMobileScreens = useMediaQuery("(min-width:1000px) and (max-height:2160px)")
  const isHDScreens = useMediaQuery("(min-width:1280px) and (max-height:900px)")
  const isFullHDScreens = useMediaQuery("(min-width:1800px) and (max-height:2160px)")
  const { palette } = useTheme()
  const dispatch = useDispatch()
  const { _id } = useSelector((state) => state.user)
  const token = useSelector((state) => state.token)
  const sortBySection = useSelector((state) => state.sortBySection)
  const queryClient = useQueryClient()

  const getSectionedApparels = () => {
    return fetch(`http://localhost:3001/apparels/${_id}/${sortBySection}`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
  }
  const { data: sectionedApparelsCount } = useQuery(["sectionedApparelsCount", sortBySection], getSectionedApparels, {
    select: data => data.length
  })
  // Limit number of apparels per section
  const storageFull = sectionedApparelsCount >= 50

  /* Guest User State */
  const guestUser = useSelector((state) => state.user.guestUser)
  const dailyAllowedUploads = useSelector((state) => state.dailyAllowedUploads)
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
      )
    }
  }

  // Display Apparel Section Title on Mobile
  const sectionTitle = (sortBySection) => {
    switch (sortBySection) {
      case "headwear":
        return "Hats, Beanies, & Headbands"
      case "shorttops":
        return "Short Sleeve Tops"
      case "longtops":
        return "Long Sleeve Tops"
      case "outerwear":
        return "Outer Shirts & Jackets"
      case "dresses":
        return "Dresses"
      case "onepiece":
        return "Dresses, Rompers & Jumpsuits"
      case "pants":
        return "Pants, Trousers, & Long Skirts"
      case "shorts":
        return "Shorts & Skirts"
      case "footwear":
        return "Footwear"
      default:
        return "test"
    }
  }
  const title = sectionTitle(sortBySection)

  /* Upload form state */
  const [picture, setPicture] = useState(null)
  const [apparelName, setApparelName] = useState("")
  // Apparel Section to be attached to formData
  const handleSetSection = (e) => {
    dispatch(
      setSortBySection({
        sortBySection: e.target.value
      })
    )
  }

  const handleUpload = (formData) => {
    if (!picture) {
      alert("Please upload an image for the apparel.")
    } else {
      uploadMutation.mutate(formData)
    }
  }

  const uploadMutation = useMutation({
    mutationFn: async () => {
      const formData = new FormData()
      formData.append("userId", _id)
      if (apparelName) {
        formData.append("name", apparelName)
        formData.append("description", apparelName)
      } else {
        formData.append("name", picture.name)
      }
      formData.append("section", sortBySection)
      if (picture) {
        formData.append("picture", picture) // sent to backend multur as "picture"
        formData.append("picturePath", picture.name) // sent to backend
      }
      return await fetch(`http://localhost:3001/apparels`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      })
    },
    onError: (error, _apparelName, context) => {
      console.log("Error fetching:" + context.id + error)
    },
    onSettled: () => {
      queryClient.invalidateQueries(["sectionedApparelsData", sortBySection])
      handleOpen({ vertical: "top", horizontal: "center" })()
      setApparelName("")
      setPicture(null)
      dispatch(setDailyAllowedUploads({ dailyAllowedUploads: dailyAllowedUploads - 1 }))
      if (dailyAllowedUploads <= 1 && !nextRefreshDate) {
        dispatch(setNextRefreshDate({ nextRefreshDate: Date.now() + 86400000 }))
      }
    }
  })

  /* Snackbar State */
  const [snackbar, setSnackbar] = useState({
    open: false,
  })
  const { open } = snackbar
  const handleOpen = (newSnackbar) => () => {
    setSnackbar({ ...newSnackbar, open: true })
  }
  const handleClose = () => {
    setSnackbar({ ...snackbar, open: false })
  }
  const action = (
    <>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <IoClose />
      </IconButton>
    </>
  )

  return (
    <Box
      margin={!isNonMobileScreens ? "0.5rem 0.5rem 1.5rem 0.5rem" : isFullHDScreens ? 4 : 3}
      padding={!isNonMobileScreens ? 0.5 : isFullHDScreens ? 4 : 1}
    >
      {!isNonMobileScreens && (
        <FlexBetweenBox>
          <Typography
            variant={isSmallMobileScreens ? "h6" : isNonMobileScreens ? "h4" : "h5"}
          >
            {title}
          </Typography>
          <IconButton onClick={handleUploadClose}>
            <IoClose />
          </IconButton>
        </FlexBetweenBox>
      )}

      {/* ----- Section Buttons ----- */}
      <Box
        display="flex"
        flexDirection={"row"}
        justifyContent={"center"}
        alignItems={"center"}
        flexWrap={"wrap"}
        className="radio-buttons"
        gap={2}
        padding={
          isSmallMobileScreens ? "0.5rem" :
            isHDScreens ? "2rem 3rem" :
              !isNonMobileScreens ? "1rem 1.5rem" :
                isFullHDScreens ? "1rem" :
                  "1rem 3rem"
        }
      >
        <Tooltip title="Short Sleeve Tops" placement="top">
          <Box>
            <RadioButton
              changed={handleSetSection}
              id="1a"
              isSelected={sortBySection === "shorttops"}
              value="shorttops"
              icon={
                <GiPoloShirt
                  color={palette.neutral.dark}
                  size={isSmallMobileScreens ? "2rem" : isHDScreens ? "3rem" : isFullHDScreens ? "3.5rem" : "2rem"}
                />
              }
            />
          </Box>
        </Tooltip>
        <Tooltip title="Long Sleeve Tops" placement="top">
          <Box>
            <RadioButton
              changed={handleSetSection}
              id="2a"
              isSelected={sortBySection === "longtops"}
              value="longtops"
              icon={
                <GiShirt
                  color={palette.neutral.dark}
                  size={isSmallMobileScreens ? "2rem" : isHDScreens ? "3rem" : isFullHDScreens ? "3.5rem" : "2rem"}
                />
              }
            />
          </Box>
        </Tooltip>
        <Tooltip title="Outer Shirts & Jackets" placement="top">
          <Box >
            <RadioButton
              changed={handleSetSection}
              id="3a"
              isSelected={sortBySection === "outerwear"}
              value="outerwear"
              icon={
                <GiMonclerJacket
                  color={palette.neutral.dark}
                  size={isSmallMobileScreens ? "2rem" : isHDScreens ? "3rem" : isFullHDScreens ? "3.5rem" : "2rem"}
                />
              }
            />
          </Box>
        </Tooltip>
        <Tooltip title="Dresses, Rompers & Jumpsuits" placement="top">
          <Box >
            <RadioButton
              changed={handleSetSection}
              id="4a"
              isSelected={sortBySection === "onepiece"}
              value="onepiece"
              icon={
                <GiLargeDress
                  color={palette.neutral.dark}
                  size={isSmallMobileScreens ? "2rem" : isHDScreens ? "3rem" : isFullHDScreens ? "3.5rem" : "2rem"}
                />
              }
            />
          </Box>
        </Tooltip>
        <Tooltip title="Pants & Long Skirts" placement="bottom">
          <Box >
            <RadioButton
              changed={handleSetSection}
              id="5a"
              isSelected={sortBySection === "pants"}
              value="pants"
              icon={
                <GiArmoredPants
                  color={palette.neutral.dark}
                  size={isSmallMobileScreens ? "2rem" : isHDScreens ? "3rem" : isFullHDScreens ? "3.5rem" : "2rem"}
                />
              }
            />
          </Box>
        </Tooltip>
        <Tooltip title="Shorts & Skirts" placement="bottom">
          <Box >
            <RadioButton
              changed={handleSetSection}
              id="6a"
              isSelected={sortBySection === "shorts"}
              value="shorts"
              icon={
                <GiUnderwearShorts
                  color={palette.neutral.dark}
                  size={isSmallMobileScreens ? "2rem" : isHDScreens ? "3rem" : isFullHDScreens ? "3.5rem" : "2rem"}
                />
              }
            />
          </Box>
        </Tooltip>
        <Tooltip title="Footwear" placement="bottom">
          <Box >
            <RadioButton
              changed={handleSetSection}
              id="7a"
              isSelected={sortBySection === "footwear"}
              value="footwear"
              icon={
                <GiConverseShoe
                  color={palette.neutral.dark}
                  size={isSmallMobileScreens ? "2rem" : isHDScreens ? "3rem" : isFullHDScreens ? "3.5rem" : "2rem"}
                />
              }
            />
          </Box>
        </Tooltip>
        <Tooltip title="Headwear" placement="bottom">
          <Box >
            <RadioButton
              changed={handleSetSection}
              id="8a"
              isSelected={sortBySection === "headwear"}
              //label="Headwear"
              value="headwear"
              icon={
                <GiBilledCap
                  color={palette.neutral.dark}
                  size={isSmallMobileScreens ? "2rem" : isHDScreens ? "3rem" : isFullHDScreens ? "3.5rem" : "2rem"}
                />
              }
            />
          </Box>
        </Tooltip>
        {!isNonMobileScreens && <Typography textAlign={"center"}> *Use square images with a clear background.</Typography>}
      </Box>


      {storageFull && (
        <Box
          display={"flex"}
          flexDirection={"row"}
          justifyContent={"space-evenly"}
          alignItems={"center"}
          borderRadius={"6rem"}
          p={isNonMobileScreens ? "0 6rem" : "0 1rem 0.5rem 1rem"}
          gap={2}
        >
          <Typography>
            <PiWarning color="#f54260" size={isSmallMobileScreens ? "2rem" : "2rem"} />
          </Typography>
          <Typography
            fontSize={"0.75rem"}
            fontWeight={600} color="#f54260"
          >
            Users may only store up to 50 apparels per section / category.
          </Typography>
        </Box>
      )}

      <Box
        padding={isFullHDScreens ? 2 : 0}
        margin={isFullHDScreens ? 2 : 0}
      >
        <Dropzone
          acceptedFiles=".jpg,.jpeg,.png"
          multiple={false}
          onDrop={(acceptedFiles) => setPicture(acceptedFiles[0])}
        >
          {({ getRootProps, getInputProps }) => (
            <Tooltip
              placement="top"
              title={
                <h3 style={{
                  padding: 0,
                  margin: "0 0.25rem",
                  fontWeight: 500
                }}>
                  **Use square images with a clear background
                </h3>
              }
            >
              <FlexBetweenBox>
                <Box
                  {...getRootProps()}
                  border={`2px solid ${palette.primary.main}`}
                  padding={
                    isSmallMobileScreens ? "1rem 0.5rem" :
                      isHDScreens ? "2rem" :
                        isFullHDScreens ? "2rem" :
                          "1.5rem 1rem"
                  }
                  margin={
                    isSmallMobileScreens ? "0 0.25rem" :
                      !isNonMobileScreens ? "0 0.5rem" :
                        isFullHDScreens ? "0 1rem" :
                          "0 3rem"
                  }
                  width="100%"
                  height="200%"
                  borderRadius={isFullHDScreens ? "2rem" : "1.5rem"}
                  sx={{ "&:hover": { cursor: "pointer" } }}
                  textAlign="center"
                >

                  <input {...getInputProps()} />
                  {!picture ? (
                    <Box>
                      <Box gap={0.5} pb={0.5} display={"flex"} alignItems={"center"} justifyContent={"center"}>
                        <ImAttachment color={palette.neutral.dark} size="1.25rem" />
                        <Typography
                          sx={{
                            fontSize: "0.75rem",
                            fontWeight: 600,
                            color: palette.neutral.dark
                          }}
                        >
                          Drop new apparel image here
                        </Typography>
                      </Box>
                      <Typography
                        fontSize={"0.75rem"}
                        sx={{ color: palette.neutral.main }}
                      >
                        *Apparel should span vertically or horizontally reaching both edges.
                      </Typography>
                    </Box>
                  ) : (
                    <FlexBetweenBox>
                      <Typography>{picture.name}</Typography>
                      <BiEditAlt size={"1.5rem"} />
                    </FlexBetweenBox>
                  )}
                </Box>
              </FlexBetweenBox>
            </Tooltip>
          )}
        </Dropzone>

        {/* ----- Text Input Field ----- */}
        <FlexBetweenBox>
          <InputBase
            placeholder="Name : optional"
            onChange={(e) => setApparelName(e.target.value)}
            value={apparelName}
            required={true}
            sx={{
              width: "100%",
              color: palette.neutral.dark,
              border: `solid 1px ${palette.neutral.dark}`,
              borderRadius: "2rem",
              padding: "3% 2rem",
              margin: !isNonMobileScreens ? "0 0.5rem" : isFullHDScreens ? "1rem 2rem" : "1rem 4rem"
            }}
          />
        </FlexBetweenBox>

        <Box margin={2} display={"flex"} justifyContent={"center"}>
          <Button
            onClick={handleUpload}
            disabled={(dailyAllowedUploads < 1 && guestUser) || storageFull}
            sx={{
              padding: "1rem 4rem",
              borderRadius: "6rem",
              fontWeight: 600,
              color: palette.background.alt,
              borderColor: palette.neutral.dark,
              backgroundColor: palette.neutral.dark,
              "&:hover": {
                color: palette.neutral.lighter,
                backgroundColor: palette.primary.main
              }
            }}
          >
            Upload
          </Button>
        </Box>
      </Box>

      {/* ----- Snackbar on Upload ----- */}
      <div>
        <Snackbar
          open={open}
          anchorOrigin={{ vertical: "top", horizontal: "center", }}
          autoHideDuration={2000}
          onClose={handleClose}
          message="Upload Successful!"
          action={action}
        />
      </div>

      {guestUser && (
        <Box
          display={"flex"}
          flexDirection={"row"}
          justifyContent={"space-evenly"}
          alignItems={"center"}
          borderRadius={"6rem"}
        >
          <Typography color={palette.neutral.medium}>Uploads Remaining: {dailyAllowedUploads}</Typography>
          {dailyAllowedUploads < 1 && (
            <Box>
              <Typography color={palette.neutral.medium}>
                Refreshes in: <Countdown date={nextRefreshDate} renderer={renderer} />
              </Typography>
            </Box>
          )}
        </Box>
      )}

    </Box>
  )
}

export default UploadApparelWidget