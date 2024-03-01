import * as React from "react";
import { CssVarsProvider } from "@mui/joy/styles";
import { FocusTrap } from "@mui/base/FocusTrap";
import CssBaseline from "@mui/joy/CssBaseline";
import Box from "@mui/joy/Box";
import Typography from "@mui/joy/Typography";
import Button from "@mui/joy/Button";
import Stack from "@mui/joy/Stack";

// Importing icons for UI elements
import CreateRoundedIcon from "@mui/icons-material/CreateRounded";
import EmailRoundedIcon from "@mui/icons-material/EmailRounded";
import PeopleAltRoundedIcon from "@mui/icons-material/PeopleAltRounded";
import FolderRoundedIcon from "@mui/icons-material/FolderRounded";
import RestorePageTwoToneIcon from "@mui/icons-material/RestorePageTwoTone";

// Importing custom components and context
import Layout from "../components/Layout";
import Navigation from "../components/Navigation";
import Mails from "../components/Mails";
import EmailContent from "../components/EmailContent";
import WriteEmail from "../components/WriteEmail";
import { Header } from "../components/Header";
import Snackbar from "@mui/joy/Snackbar";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContextProvider";

// Importing services for fetching data
import { getUserMessages } from "../services/messages/getUserMessages";
import { getUserCategories } from "../services/categories/getCategories";

// Importing MUI components
import { LinearProgress } from "@mui/joy";

const HomeMail = () => {
  const navigate = useNavigate();
  const [open, setOpen] = React.useState<boolean>(false);

  // State for storing user messages and categories
  const [messagesInfo, setMessagesInfo] = React.useState<IMessageInfo[] | null>(
    null
  );
  const [categoriesInfo, setCategoriesInfo] = React.useState<
    IUserCategoryInfo[] | null
  >(null);

  // State for handling selected message and user authentication
  const [selectedMessage, setSelectedMessage] =
    React.useState<IMessageInfo | null>(null);
  const { userLogged, setUserLogged } = useAuthContext();

  // State for triggering message update and controlling UI loading
  const [updateGetMessages, setUpdateGetMessages] =
    React.useState<boolean>(false);
  const [selectedItem, setSelectedItem] = React.useState<string>("inbox");
  const [userAuthEmail, setUserEmailstring] = React.useState<string>("null");
  const [searchTerm, setSearchTerm] = React.useState<string>("");

  // Control loading animation
  const [showLoading, setShowLoading] = React.useState<boolean>(false);

  // State for Snackbar notifications
  const [openSnackbar, setOpenSnackbar] = React.useState<ISnackbarOpen>({
    success: true,
    message: "",
    open: false,
  });

  // Function to close Snackbar
  const closeSnackBar = () => {
    setOpenSnackbar({ ...openSnackbar, open: false });
  };

  React.useEffect(() => {
    let userAuthEmail = "";

    // Retrieve user authentication data from sessionStorage
    const authenticatedUser = sessionStorage.getItem("authenticatedUser");
    if (authenticatedUser) {
      try {
        const loggedUserObject: IAuthenticatedUser =
          JSON.parse(authenticatedUser);
        userAuthEmail = loggedUserObject.email;
        setUserEmailstring(userAuthEmail);
        setUserLogged(loggedUserObject);
      } catch (error) {
        console.error("Error parsing loggedUser from sessionStorage:", error);
      }
    } else {
      // Redirect to homepage if no user authenticated
      navigate("/");
    }

    // Fetch user messages
    const fetchMessages = () => {
      setShowLoading(true);
      getUserMessages(userAuthEmail)
        .then((res) => {
          const messages: IMessageInfo[] = res.data?.sort(
            (messageA: IMessageInfo, messageB: IMessageInfo) =>
              messageB.message_id - messageA.message_id
          );
          // Filter messages based on selected item
          const filteredActiveMessages = messages.filter(
            (message) =>
              !(message.to_user === userAuthEmail && !message.isActive)
          );
          if (selectedItem === "inbox") {
            setMessagesInfo(
              filteredActiveMessages?.filter(
                (message) => message.to_user === userAuthEmail
              )
            );
          } else if (selectedItem === "sent") {
            setMessagesInfo(
              filteredActiveMessages?.filter(
                (message) => message.from_user === userAuthEmail
              )
            );
          } else {
            setMessagesInfo(filteredActiveMessages);
          }
          setShowLoading(false);

          if (selectedMessage) {
            const updatedSelectedMessage = filteredActiveMessages?.filter(
              (messageInfo) =>
                messageInfo.message_id == selectedMessage.message_id
            )[0];
            if (updatedSelectedMessage) {
              setSelectedMessage({ ...updatedSelectedMessage });
            }
          }
        })
        .catch(() => {
          setShowLoading(false);
        });
    };

    // Fetch user categories
    const fetchUserCategories = () => {
      getUserCategories(userAuthEmail).then((res) => {
        const categories = res.data;
        categories.unshift({
          category_id: 0,
          category_name: "No category",
          color: "",
        });
        setCategoriesInfo(categories);
      });
    };

    fetchMessages();
    fetchUserCategories();
  }, [updateGetMessages, selectedItem]);

  return (
    <>
      {showLoading && (
        // Display loading animation
        <Box sx={{ width: "20px" }}>
          <LinearProgress
            sx={{ position: "fixed", zIndex: 10000, width: "100vw" }}
            color="success"
            determinate={false}
            size="sm"
            value={25}
            variant="solid"
          />
        </Box>
      )}

      <CssVarsProvider disableTransitionOnChange>
        <CssBaseline />
        <Stack
          id="tab-bar"
          direction="row"
          justifyContent="space-around"
          spacing={1}
          sx={{
            display: { xs: "flex", sm: "none" },
            zIndex: "999",
            bottom: 0,
            position: "fixed",
            width: "100dvw",
            py: 2,
            backgroundColor: "background.body",
            borderTop: "1px solid",
            borderColor: "divider",
          }}
        >
          {/* Navigation buttons */}
          <Button
            variant="plain"
            color="neutral"
            aria-pressed="true"
            component="a"
            size="sm"
            startDecorator={<EmailRoundedIcon />}
            sx={{ flexDirection: "column", "--Button-gap": 0 }}
          >
            Email
          </Button>
          <Button
            disabled
            variant="plain"
            color="neutral"
            component="a"
            size="sm"
            startDecorator={<PeopleAltRoundedIcon />}
            sx={{ flexDirection: "column", "--Button-gap": 0 }}
          >
            Team
          </Button>
          <Button
            disabled
            variant="plain"
            color="neutral"
            component="a"
            size="sm"
            startDecorator={<FolderRoundedIcon />}
            sx={{ flexDirection: "column", "--Button-gap": 0 }}
          >
            Files
          </Button>
        </Stack>
        <Layout.Root
          sx={{
            ...(true && {
              height: "100vh",
              overflow: "hidden",
            }),
          }}
        >
          <Layout.Header>
            <Header
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              userAuthEmail={userAuthEmail}
              setUpdateGetMessages={setUpdateGetMessages}
              updateGetMessages={updateGetMessages}
              selectedItem={selectedItem}
              setSelectedItem={setSelectedItem}
              messagesInfo={messagesInfo}
              setMessagesInfo={setMessagesInfo}
            />
          </Layout.Header>
          <Layout.SideNav>
            <Navigation
              selectedItem={selectedItem}
              setSelectedItem={setSelectedItem}
              setSearchTerm={setSearchTerm}
              setUpdateGetMessages={setUpdateGetMessages}
              updateGetMessages={updateGetMessages}
              categoriesInfo={categoriesInfo}
              userLogged={userLogged}
              setShowLoading={setShowLoading}
              setSelectedMessage={setSelectedMessage}
              setMessagesInfo={setMessagesInfo}
            />
          </Layout.SideNav>
          <Layout.SidePane>
            <Box
              sx={{
                p: 2,
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Box sx={{ alignItems: "center", gap: 1 }}>
                <Typography
                  level="title-lg"
                  textColor="text.secondary"
                  component="h1"
                >
                  My mails
                </Typography>
                <Typography level="title-sm" textColor="text.tertiary">
                  {messagesInfo?.length} emails
                </Typography>
              </Box>
              <Button
                onClick={() => setUpdateGetMessages(!updateGetMessages)}
                sx={{
                  marginLeft: "20px",
                  bgcolor: "white",
                  "&:hover": {
                    bgcolor: "#bdc3c4aa", // Set hover background color to white
                  },
                }}
              >
                <RestorePageTwoToneIcon sx={{ color: "success.600" }} />
              </Button>
              <Button
                size="sm"
                startDecorator={<CreateRoundedIcon />}
                onClick={() => setOpen(true)}
                sx={{ ml: "auto" }}
              >
                Create email
              </Button>
              <FocusTrap open={open} disableAutoFocus disableEnforceFocus>
                <WriteEmail
                  updateGetMessages={updateGetMessages}
                  setUpdateGetMessages={setUpdateGetMessages}
                  open={open}
                  onClose={() => setOpen(false)}
                  setOpen={setOpen}
                  openSnackbar={openSnackbar}
                  setOpenSnackbar={setOpenSnackbar}
                  setShowLoading={setShowLoading}
                />
              </FocusTrap>
            </Box>
            <Mails
              messagesInfo={messagesInfo}
              setSelectedMessage={setSelectedMessage}
              selectedItem={selectedItem}
              userAuthEmail={userAuthEmail}
            />
          </Layout.SidePane>
          <Layout.Main>
            <EmailContent
              selectedMessage={selectedMessage}
              setSelectedMessage={setSelectedMessage}
              categoriesInfo={categoriesInfo}
              selectedItem={selectedItem}
              setUpdateGetMessages={setUpdateGetMessages}
              updateGetMessages={updateGetMessages}
              showLoading={showLoading}
              setShowLoading={setShowLoading}
              setOpenSnackbar={setOpenSnackbar}
            />
          </Layout.Main>
        </Layout.Root>
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
};

export { HomeMail };
