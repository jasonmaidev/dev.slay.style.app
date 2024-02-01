import { IoClose } from "react-icons/io5"
import { Box, useMediaQuery, IconButton } from "@mui/material"

const ViewStyleWidget = ({
  userId,
  tops,
  styleHeadwear,
  styleShortTops,
  styleLongTops,
  styleOuterwear,
  styleOnePiece,
  stylePants,
  styleShorts,
  styleFootwear,
  fullLengths,
  bottoms,
  handleViewClose
}) => {
  const isSmallMobileScreens = useMediaQuery("(max-width:800px) and (max-height:800px)")

  return (
    <Box>
      {/* ----- Widget Container ----- */}
      <Box
        p={isSmallMobileScreens ? "1rem 1rem 0 0" : "1.5rem 1.5rem 0 0"}
        display={"flex"}
        flexDirection={"row"}
        justifyContent={"flex-end"}>
        <IconButton onClick={handleViewClose}><IoClose /></IconButton>
      </Box>
      <Box
        width="100%"
        // padding={isSmallMobileScreens ? "0 0.25rem 0.25rem 0.25rem" : "0 0.5rem 0.5rem 0.5rem"}
        display="flex"
        flexDirection={"row"}
        gap="0.5rem"
        justifyContent="center"
        overflow={"hidden"}
      >

        {/* ----- Style Widget ----- */}
        <Box flexBasis="100%">

          {/* Headwear Section */}
          <Box
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
              style={{ aspectRatio: '1', borderRadius: "0.5rem" }}
              src={`https://slay-style-app.s3.us-west-1.amazonaws.com/${styleHeadwear ? styleHeadwear?.picturePath : "placeholder.png"}`}
            />
          </Box>

          {/* Tops Section */}
          <Box
            display={"flex"}
            flexDirection={"row"}
            alignItems={"center"}
          >
            {(styleShortTops || styleLongTops) && (
              <Box
                zIndex={3}
                position={"relative"}
                left={styleOuterwear ? "10%" : (!styleShortTops && !styleOuterwear) ? "24%" : "30%"}
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
                  style={{ aspectRatio: '1', borderRadius: "0.5rem" }}
                  src={`https://slay-style-app.s3.us-west-1.amazonaws.com/${tops?.picturePath}`}
                />
              </Box>
            )}

            {/* Dress Section */}
            {styleOnePiece && (
              <Box
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
                  style={{ aspectRatio: '1', borderRadius: "0.5rem" }}
                  src={`https://slay-style-app.s3.us-west-1.amazonaws.com/${fullLengths?.picturePath}`}
                />
              </Box>
            )}

            {/* Outerwear Section */}
            {styleOuterwear && (
              <Box
                zIndex={2}
                position={"relative"}
                right={styleOnePiece ? null : "10%"}
                left={styleOnePiece ? "10%" : (!styleShortTops && !styleLongTops) ? "25%" : null}
              >
                <img
                  width={styleOnePiece ? "100%" : (!styleShortTops && !styleLongTops) ? "50%" : "100%"}
                  height="auto"
                  alt="apparel"
                  style={{ aspectRatio: '1', borderRadius: "0.5rem" }}
                  src={`https://slay-style-app.s3.us-west-1.amazonaws.com/${styleOuterwear?.picturePath}`}
                />
              </Box>
            )}
          </Box>

          {/* Bottom Section */}
          {(stylePants || styleShorts) && (
            <Box
              zIndex={1}
              position={"relative"}
              bottom={(styleShorts && styleLongTops) ? "10%" : (styleShorts && styleLongTops) ? "6%" : "9%"}
              top={(!styleShortTops && !styleLongTops && !styleOuterwear) ? "28%" : null}
              display={"flex"}
              flexDirection={"row"}
              justifyContent={"center"}
            >
              <img
                width={stylePants ? "50%" : "25%"}
                height="auto"
                alt="apparel"
                style={{ aspectRatio: '1', borderRadius: "0.5rem" }}
                src={`https://slay-style-app.s3.us-west-1.amazonaws.com/${bottoms?.picturePath}`}
              />
            </Box>
          )}

          {/* Footwear Section */}
          {styleFootwear && (
            <Box
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
                style={{ aspectRatio: '1', borderRadius: "0.5rem" }}
                src={`https://slay-style-app.s3.us-west-1.amazonaws.com/${styleFootwear?.picturePath}`}
              />
            </Box>
          )}
        </Box>
      </Box >
    </Box >
  )
}

export default ViewStyleWidget