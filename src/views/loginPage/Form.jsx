import { useState, Fragment } from "react"
import { Box, Button, TextField, useMediaQuery, Typography, useTheme } from "@mui/material"
import EditOutlinedIcon from "@mui/icons-material/EditOutlined"
import { ImAttachment } from "react-icons/im"
import { Formik } from "formik"
import * as yup from "yup"
import { useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { setLogin } from "state"
import Dropzone from "react-dropzone"
import FlexBetweenBox from "components/FlexBetweenBox"

const registerSchema = yup.object().shape({
  firstName: yup.string(),
  lastName: yup.string(),
  email: yup.string().email("invalid email").required("required"),
  password: yup.string().required("required"),
  picture: yup.string().required("required"),
})

const loginSchema = yup.object().shape({
  email: yup.string().email("invalid email").required("required"),
  password: yup.string().required("required"),
})

/* Form fields */
const initialValuesRegister = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  picture: "",
}

const initialValuesLogin = {
  email: "",
  password: "",
}

const Form = () => {
  const isSmallMobileScreens = useMediaQuery("(max-width:800px) and (max-height:800px)")
  const isNonMobileScreens = useMediaQuery("(min-width:1000px) and (max-height:2160px)")
  const isHDScreens = useMediaQuery("(min-width:1280px) and (max-height:900px)")
  const isFullHDScreens = useMediaQuery("(min-width:1800px) and (max-height:2160px)")
  const [picture, setPicture] = useState(null)
  const [pageType, setPageType] = useState("login")
  const { palette } = useTheme()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const isNonMobile = useMediaQuery("(min-width:600px)")
  const isLogin = pageType === "login"
  const isRegister = pageType === "register"
  const isAuth = Boolean(useSelector((state) => state.token))

  const register = async (values, onSubmitProps) => {
    const formData = new FormData()
    for (let value in values) {
      formData.append(value, values[value])
    }
    if (picture) {
      formData.append("picture", picture) // sent to backend
      formData.append("picturePath", picture.name) // sent to backend
    }

    const savedUserResponse = await fetch(
      "http://localhost:3001/auth/register",
      {
        method: "POST",
        body: formData,
      }
    )
    const savedUser = await savedUserResponse.json()
    onSubmitProps.resetForm()

    if (savedUser) {
      setPageType("login")
    }
  }

  const [loginError, setLoginError] = useState(false)

  const login = async (values, onSubmitProps) => {
    const loggedInResponse = await fetch("http://localhost:3001/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    })
    const loggedIn = await loggedInResponse.json()
    onSubmitProps.resetForm()
    if (loggedIn) {
      //sends payload of user properties and jwt to the state
      dispatch(
        setLogin({
          user: loggedIn.user,
          token: loggedIn.token,
        })
      )
      if (isAuth) {
        navigate("/")
      } else {
        setLoginError(true)
      }
    }
  }

  const handleFormSubmit = async (values, onSubmitProps) => {
    if (isLogin) await login(values, onSubmitProps)
    if (isRegister) await register(values, onSubmitProps)
  }

  return (
    <Formik
      onSubmit={handleFormSubmit}
      initialValues={isLogin ? initialValuesLogin : initialValuesRegister}
      validationSchema={isLogin ? loginSchema : registerSchema}
    >
      {({
        values,
        errors,
        touched,
        handleBlur,
        handleChange,
        handleSubmit,
        setFieldValue,
        resetForm,
      }) => (
        <form onSubmit={handleSubmit}>
          {(!isRegister && loginError) && <Typography textAlign={"center"}>Invalid credentials!</Typography>}
          <Box
            display="grid"
            gap="30px"
            gridTemplateColumns="repeat(4, minmax(0, 1fr))"
            sx={{
              "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
            }}
          >
            {isRegister && (
              <Fragment>
                <TextField
                  label="First Name"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.firstName}
                  name="firstName"
                  error={
                    Boolean(touched.firstName) && Boolean(errors.firstName)
                  }
                  helperText={touched.firstName && errors.firstName}
                  sx={{ gridColumn: "span 2" }}
                />
                <TextField
                  label="Last Name"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.lastName}
                  name="lastName"
                  error={Boolean(touched.lastName) && Boolean(errors.lastName)}
                  helperText={touched.lastName && errors.lastName}
                  sx={{ gridColumn: "span 2" }}
                />

                <Box
                  gridColumn="span 4"
                  p={isNonMobileScreens ? "0 3rem" : "0 1rem"}
                >
                  <Dropzone
                    acceptedFiles=".jpg,.jpeg,.png"
                    multiple={false}
                    onDrop={(acceptedFiles) =>
                      setFieldValue("picture", acceptedFiles[0])
                    }
                  >
                    {({ getRootProps, getInputProps }) => (
                      <Box
                        {...getRootProps()}
                        border={`2px solid ${palette.primary.main}`}
                        borderRadius={isNonMobileScreens ? "1.5rem" : "1rem"}
                        p={isNonMobileScreens ? "1rem" : "0.5rem"}
                        sx={{ "&:hover": { cursor: "pointer" } }}
                      >
                        <input {...getInputProps()} />
                        {!values.picture ? (
                          <Box gap={0.5} p={isNonMobileScreens ? "1.5rem" : "1rem 2rem"} display={"flex"} alignItems={"center"} justifyContent={"center"}>
                            <ImAttachment color={palette.neutral.main} size="1.25rem" />
                            <Typography
                              fontWeight={600}
                              fontSize={"0.75rem"}
                              color={palette.neutral.main}
                            >
                              Drop Profile Picture Here
                            </Typography>
                          </Box>
                        ) : (
                          <FlexBetweenBox>
                            <Typography>{values.picture.name}</Typography>
                            <EditOutlinedIcon />
                          </FlexBetweenBox>
                        )}
                      </Box>
                    )}
                  </Dropzone>
                </Box>
              </Fragment>
            )}

            <TextField
              label="Email"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.email}
              name="email"
              error={Boolean(touched.email) && Boolean(errors.email)}
              helperText={touched.email && errors.email}
              sx={{ gridColumn: "span 4" }}
            />
            <TextField
              label="Password"
              type="password"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.password}
              name="password"
              error={Boolean(touched.password) && Boolean(errors.password)}
              helperText={touched.password && errors.password}
              sx={{ gridColumn: "span 4" }}
            />
          </Box>

          {/* Form Save Buttons */}
          <Box>
            <Button
              fullWidth
              type="submit"
              sx={{
                margin: "2rem 0 1rem 0",
                padding: "1.5rem 4rem",
                borderRadius: "6rem",
                fontWeight: 600,
                color: palette.background.alt,
                backgroundColor: palette.neutral.medium,
                "&:hover": {
                  color: palette.background.alt,
                  backgroundColor: palette.primary.main
                }
              }}
            >
              {isLogin ? "LOGIN" : "REGISTER"}
            </Button>
            <Typography
              onClick={() => {
                setPageType(isLogin ? "register" : "login")
                resetForm()
              }}
              sx={{
                fontSize: isNonMobileScreens ? "0.8rem" : "0.7rem",
                color: palette.neutral.main,
                fontWeight: 600,
                "&:hover": {
                  cursor: "pointer",
                  color: palette.primary.main,
                },
              }}
            >
              {isLogin
                ? "Don't have an account? Sign Up here."
                : "Already have an account? Login here."}
            </Typography>
          </Box>
        </form>
      )}
    </Formik>
  )
}

export default Form