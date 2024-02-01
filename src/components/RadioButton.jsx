import { Box, useMediaQuery } from "@mui/material"

export const RadioButton = (props) => {
  const isNonMobileScreens = useMediaQuery("(min-width:1000px) and (max-height:2160px)")

  const { changed, id, isSelected, label, value, icon } = props
  return (
    <Box
      display={"flex"}
      flexDirection={"column"}
      alignItems={"center"}
      className={isNonMobileScreens ? "RadioButton" : "MobileRadioButton"}
    >
      <input
        id={id}
        onChange={changed}
        value={value}
        type="radio"
        checked={isSelected}
      />
      {label}
      <label htmlFor={id}>
        {icon}
      </label>
    </Box>
  )
}