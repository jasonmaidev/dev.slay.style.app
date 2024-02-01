import { useState, useEffect } from "react"
import { useTheme } from "@mui/material/styles"
import OutlinedInput from "@mui/material/OutlinedInput"
import InputLabel from "@mui/material/InputLabel"
import MenuItem from "@mui/material/MenuItem"
import FormControl from "@mui/material/FormControl"
import Select from "@mui/material/Select"
import { useSelector } from "react-redux"
import { useMediaQuery } from "@mui/material"

const events = [
  "casual",
  "formal",
  "spring",
  "summer",
  "fall",
  "winter",
  "cozy",
  "athletic",
  "party",
  "festival",
  "wedding"
]

function getStyles(event, suitableFor, theme) {
  return {
    fontWeight:
      suitableFor.indexOf(event) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  }
}

export default function MultipleSelect({ updateSuitableFor }) {
  const isSmallMobileScreens = useMediaQuery("(max-width:800px) and (max-height:800px)")
  const isNonMobileScreens = useMediaQuery("(min-width:1000px) and (max-height:2160px)")

  const ITEM_HEIGHT = isNonMobileScreens ? 40 : 56
  const ITEM_PADDING_TOP = isNonMobileScreens ? 8 : 0
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * events.length + ITEM_PADDING_TOP,
        width: isNonMobileScreens ? 200 : 140,
      },
    },
  }

  const theme = useTheme()
  const stylingOccasions = useSelector((state) => state.stylingOccasions)
  const [suitableFor, setSuitableFor] = useState(stylingOccasions)

  const handleChange = async (event) => {
    const { target: { value }, } = event
    // On autofill we get a stringified value.
    setSuitableFor(typeof value === "string" ? value.split(",") : value)
  }

  useEffect(() => {
    updateSuitableFor(suitableFor)
  }, [suitableFor, updateSuitableFor])

  return (
    <div>
      <FormControl
        sx={isNonMobileScreens ? { m: 1, minWidth: 200, maxWidth: 300 } : { m: 1, minWidth: 140, maxWidth: 200 }}
      >
        <InputLabel id="multiple-event-label">Suitable For</InputLabel>
        <Select
          labelId="multiple-event-label"
          id="multiple-event"
          multiple
          value={suitableFor}
          onChange={handleChange}
          input={<OutlinedInput sx={isNonMobileScreens ? undefined : { pb: "0.75rem" }} label="Suitable For" />}
          MenuProps={MenuProps}
          size={isSmallMobileScreens ? "small" : "medium"}
        >
          {events?.map((event) => (
            <MenuItem
              key={event}
              value={event}
              style={getStyles(event, suitableFor, theme)}
            >
              {event}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  )
}
