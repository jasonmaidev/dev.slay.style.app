import { useState } from "react"
import InputLabel from "@mui/material/InputLabel"
import MenuItem from "@mui/material/MenuItem"
import FormControl from "@mui/material/FormControl"
import Select from "@mui/material/Select"
import { MdClear } from "react-icons/md"
import { setSortByOccasion } from "state"
import { useSelector, useDispatch } from "react-redux"

const ITEM_HEIGHT = 48
const ITEM_PADDING_TOP = 8

export default function SingleSelect({ updatePageNumber }) {
  const dispatch = useDispatch()
  const sortByOccasion = useSelector((state) => state.sortByOccasion)
  const [selectOpen, setSelectOpen] = useState(false)

  const handleSelectClose = () => {
    setSelectOpen(false)
  }

  const handleSelectOpen = () => {
    setSelectOpen(true)
  }

  const handleSelectChange = (event) => {
    updatePageNumber(0)
    dispatch(setSortByOccasion({ sortByOccasion: event.target.value }))
  }

  return (
    <div>
      <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
        <InputLabel id="simple-select-autowidth-label">Suitable For</InputLabel>
        <Select
          labelId="simple-select-autowidth-label"
          id="simple-select-autowidth"
          value={sortByOccasion}
          onChange={handleSelectChange}
          label="Suitable For"
          open={selectOpen}
          onMouseEnter={handleSelectOpen}
          onClose={handleSelectClose}
          onOpen={handleSelectOpen}
          MenuProps={{
            PaperProps: {
              onMouseLeave: handleSelectClose,
              style: {
                maxHeight: ITEM_HEIGHT * 11 + ITEM_PADDING_TOP,
                width: 120,
              },
            },
            variant: "menu",
            getContentAnchorEl: null,
          }}
        >
          <MenuItem value="">
            <MdClear /> Clear
          </MenuItem>
          <MenuItem value={"favorite"}>favorite</MenuItem>
          <MenuItem value={"casual"}>casual</MenuItem>
          <MenuItem value={"formal"}>formal</MenuItem>
          <MenuItem value={"spring"}>spring</MenuItem>
          <MenuItem value={"summer"}>summer</MenuItem>
          <MenuItem value={"fall"}>fall</MenuItem>
          <MenuItem value={"winter"}>winter</MenuItem>
          <MenuItem value={"cozy"}>cozy</MenuItem>
          <MenuItem value={"athletic"}>athletic</MenuItem>
          <MenuItem value={"party"}>party</MenuItem>
          <MenuItem value={"festival"}>festival</MenuItem>
          <MenuItem value={"wedding"}>wedding</MenuItem>
        </Select>
      </FormControl>
    </div>
  )
}
