import * as React from "react";
import { CssVarsProvider, useColorScheme } from "@mui/joy/styles";
import GlobalStyles from "@mui/joy/GlobalStyles";
import CssBaseline from "@mui/joy/CssBaseline";
import Box from "@mui/joy/Box";
import Button from "@mui/joy/Button";
import FormControl from "@mui/joy/FormControl";
import FormLabel, { formLabelClasses } from "@mui/joy/FormLabel";
import IconButton, { IconButtonProps } from "@mui/joy/IconButton";
import Input from "@mui/joy/Input";
import Typography from "@mui/joy/Typography";
import Stack from "@mui/joy/Stack";
import DarkModeRoundedIcon from "@mui/icons-material/DarkModeRounded";
import LightModeRoundedIcon from "@mui/icons-material/LightModeRounded";
import { Link, useNavigate } from "react-router-dom";
import { postLogin } from "../services/login/postLogin";
import Snackbar from "@mui/joy/Snackbar";

// Interface for form elements
interface FormElements extends HTMLFormControlsCollection {
  email: HTMLInputElement;
  password: HTMLInputElement;
}
interface SignInFormElement extends HTMLFormElement {
  readonly elements: FormElements;
}

// Component for toggling color scheme
function ColorSchemeToggle(props: IconButtonProps) {
  const { onClick, ...other } = props;
  const { mode, setMode } = useColorScheme();
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => {
    setMounted(true);
  }, []);
  if (!mounted) {
    return <IconButton size="sm" variant="outlined" color="neutral" disabled />;
  }
  return (
    <IconButton
      id="toggle-mode"
      size="sm"
      variant="outlined"
      color="neutral"
      aria-label="toggle light/dark mode"
      {...other}
      onClick={(event) => {
        if (mode === "light") {
          setMode("dark");
        } else {
          setMode("light");
        }
        onClick?.(event);
      }}
    >
      {mode === "light" ? <DarkModeRoundedIcon /> : <LightModeRoundedIcon />}
    </IconButton>
  );
}

export default function Login() {
  const navigation = useNavigate();

  const [openSnackbar, setOpenSnackbar] = React.useState<ISnackbarOpen>({
    success: true,
    message: "",
    open: false,
  });

  // Function to handle opening Snackbar with success or error message
  const handleSnackbarOpen = (message: string, success: boolean) => {
    setOpenSnackbar({
      open: true,
      message,
      success,
    });
  };

  // Function to close Snackbar
  const closeSnackBar = () => {
    setOpenSnackbar({ ...openSnackbar, open: false });
  };

  // Function to handle form submission
  const hadleSubmit = (event: React.FormEvent<SignInFormElement>) => {
    event.preventDefault();

    const formElements = event.currentTarget.elements;

    // Extracting email and password from form
    const data = {
      email: formElements.email.value + '@vertech.com.co',
      password: formElements.password.value,
    };

    // Posting login data
    postLogin(data)
      .then((res) => {
        handleSnackbarOpen(res.data.message, true);
        sessionStorage.setItem('authenticatedUser', JSON.stringify(res.data.data))
        navigation("/home");
      })
      .catch((e) => {
        if (e.response?.status === 401) {
          handleSnackbarOpen(
            e.response.data.message
              ? e.response.data.message
              : "Uncontrolled error",
            false
          );
        } else if (e.code == "ERR_NETWORK") {
          handleSnackbarOpen("Can not connect to server", false);
        } else {
          handleSnackbarOpen("Uncontrolled error", false);
        }
      });
  };

  return (
    <>
      <CssVarsProvider defaultMode="dark" disableTransitionOnChange>
        <CssBaseline />
        <GlobalStyles
          styles={{
            ":root": {
              "--Collapsed-breakpoint": "769px", // form will stretch when viewport is below `769px`
              "--Cover-width": "50vw", // must be `vw` only
              "--Form-maxWidth": "800px",
              "--Transition-duration": "0.4s", // set to `none` to disable transition
            },
          }}
        />
        <Box
          sx={(theme) => ({
            width:
              "clamp(100vw - var(--Cover-width), (var(--Collapsed-breakpoint) - 100vw) * 999, 100vw)",
            transition: "width var(--Transition-duration)",
            transitionDelay: "calc(var(--Transition-duration) + 0.1s)",
            position: "relative",
            zIndex: 1,
            display: "flex",
            justifyContent: "flex-end",
            backdropFilter: "blur(12px)",
            backgroundColor: "rgba(255 255 255 / 0.2)",
            [theme.getColorSchemeSelector("dark")]: {
              backgroundColor: "rgba(19 19 24 / 0.4)",
            },
          })}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              minHeight: "100dvh",
              width:
                "clamp(var(--Form-maxWidth), (var(--Collapsed-breakpoint) - 100vw) * 999, 100%)",
              maxWidth: "100%",
              px: 2,
            }}
          >
            <Box
              component="header"
              sx={{
                py: 3,
                display: "flex",
                alignItems: "left",
                justifyContent: "space-between",
              }}
            >
              {/* Toggle dark/light mode */}
              <Box sx={{ gap: 2, display: "flex", alignItems: "center" }}></Box>
              <ColorSchemeToggle />
            </Box>
            <Box
              component="main"
              sx={{
                my: "auto",
                py: 2,
                pb: 5,
                display: "flex",
                flexDirection: "column",
                gap: 2,
                width: 400,
                maxWidth: "100%",
                mx: "auto",
                borderRadius: "sm",
                "& form": {
                  display: "flex",
                  flexDirection: "column",
                  gap: 2,
                },
                [`& .${formLabelClasses.asterisk}`]: {
                  visibility: "hidden",
                },
              }}
            >
              <Stack gap={4} sx={{ mb: 2 }}>
                <Stack gap={1}>
                  <Typography component="h1" level="h3">
                    Login
                  </Typography>
                </Stack>
              </Stack>

              <Stack gap={1}>
                <Typography level="body-sm">
                  New user? <Link to={"/signup"}>Sign up!</Link>
                </Typography>
              </Stack>

              <Stack gap={4} sx={{ mt: 2 }}>
                <form
                  onSubmit={hadleSubmit}
                >
                  {/* Login form */}
                  <FormControl required>
                    <FormLabel required>Email</FormLabel>
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <Input
                        name="email"
                        required
                        sx={{ width: "70%" }}
                        placeholder="e.g. smith78"
                      />
                      <Typography>@vertech.com.co</Typography>
                    </Box>
                  </FormControl>
                  <FormControl required>
                    <FormLabel required>Password</FormLabel>
                    <Input type="password" name="password" />
                  </FormControl>
                  <Stack gap={4} sx={{ mt: 2 }}>
                    <Button type="submit" fullWidth>
                      Login
                    </Button>
                  </Stack>
                </form>
              </Stack>
            </Box>
            <Box component="footer" sx={{ py: 3 }}>
              <Typography level="body-xs" textAlign="center">
                © Ver Tech+ Mail {new Date().getFullYear()}
              </Typography>
              <Typography level="body-xs" textAlign="center">
              Prod - v.1.2.0 
              </Typography>
            </Box>
          </Box>
        </Box>
        <Box
          sx={(theme) => ({
            height: "100%",
            position: "fixed",
            right: 0,
            top: 0,
            bottom: 0,
            left: "clamp(0px, (100vw - var(--Collapsed-breakpoint)) * 999, 100vw - var(--Cover-width))",
            transition:
              "background-image var(--Transition-duration), left var(--Transition-duration) !important",
            transitionDelay: "calc(var(--Transition-duration) + 0.1s)",
            backgroundColor: "background.level1",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            backgroundImage:
              "url(https://images.unsplash.com/photo-1527181152855-fc03fc7949c8?auto=format&w=1000&dpr=2)",
            [theme.getColorSchemeSelector("dark")]: {
              backgroundImage:
                "url(https://images.unsplash.com/photo-1572072393749-3ca9c8ea0831?auto=format&w=1000&dpr=2)",
            },
          })}
        />
      </CssVarsProvider>
      <Snackbar
        color={openSnackbar.success ? "success" : "danger"}
        open={openSnackbar.open}
        onClose={() => closeSnackBar()}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        // startDecorator={<CheckCircleRoundedIcon />}
        endDecorator={
          <Button
            onClick={() => closeSnackBar()}
            size="sm"
            variant="soft"
            color="neutral"
          >
            Dismiss
          </Button>
        }
      >
        {openSnackbar.message}
      </Snackbar>
    </>
  );
}
