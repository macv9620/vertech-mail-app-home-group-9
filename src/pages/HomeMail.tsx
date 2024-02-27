import * as React from "react";
import { CssVarsProvider } from "@mui/joy/styles";
import { FocusTrap } from "@mui/base/FocusTrap";
import CssBaseline from "@mui/joy/CssBaseline";
import Box from "@mui/joy/Box";
import Typography from "@mui/joy/Typography";
import Button from "@mui/joy/Button";
import Stack from "@mui/joy/Stack";

import CreateRoundedIcon from "@mui/icons-material/CreateRounded";
import EmailRoundedIcon from "@mui/icons-material/EmailRounded";
import PeopleAltRoundedIcon from "@mui/icons-material/PeopleAltRounded";
import FolderRoundedIcon from "@mui/icons-material/FolderRounded";
import RestorePageTwoToneIcon from "@mui/icons-material/RestorePageTwoTone";
// import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";

import Layout from "../components/Layout";
import Navigation from "../components/Navigation";
import Mails from "../components/Mails";
import EmailContent from "../components/EmailContent";
import WriteEmail from "../components/WriteEmail";
import Header from "../components/Header";
import Snackbar from "@mui/joy/Snackbar";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContextProvider";
import { getUserMessages } from "../services/getUserMessages";

const HomeMail = () => {
  const navigate = useNavigate();
  const [drawerOpen, setDrawerOpen] = React.useState<boolean>(false);
  const [open, setOpen] = React.useState<boolean>(false);
  const [messagesInfo, setMessagesInfo] = React.useState<IMessageInfo[] | null>(null);
  const [selectedMessage, setSelectedMessage] = React.useState<IMessageInfo | null>(null);
  const { setUserLogged } = useAuthContext();
  const [updateGetMessages, setUpdateGetMessages] = React.useState<boolean>(false);
  const [selectedItem, setSelectedItem] = React.useState<string>('inbox');
  const [userAuthEmail, setUserEmailstring] = React.useState<string>('null');

  const [openSnackbar, setOpenSnackbar] = React.useState<ISnackbarOpen>({
    success: true,
    message: "",
    open: false,
  });

  const closeSnackBar = () => {
    setOpenSnackbar({ ...openSnackbar, open: false });
  };

  React.useEffect(() => {
    let userAuthEmail = "";

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
      navigate("/");
    }

    getUserMessages(userAuthEmail).then((res) => {
      console.log(res);
      const messages:IMessageInfo[] = res.data?.sort(
        (messageA: IMessageInfo, messageB: IMessageInfo) =>
          messageB.message_id - messageA.message_id
      );
      // Filter messages based on selected item
      if (selectedItem === 'inbox') {
        setMessagesInfo(messages?.filter(message => message.to_user === userAuthEmail));
      } else if (selectedItem === 'sent') {
        setMessagesInfo(messages?.filter(message => message.from_user === userAuthEmail));
      } else {
        setMessagesInfo(messages);
      }
    });
  }, [updateGetMessages, selectedItem]);


  return (
    <>
      <CssVarsProvider disableTransitionOnChange>
        <CssBaseline />
        {drawerOpen && (
          <Layout.SideDrawer onClose={() => setDrawerOpen(false)}>
            <Navigation selectedItem={selectedItem} setSelectedItem={setSelectedItem} />
          </Layout.SideDrawer>
        )}
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
            ...(drawerOpen && {
              height: "100vh",
              overflow: "hidden",
            }),
          }}
        >
          <Layout.Header>
            <Header userAuthEmail={userAuthEmail} setUpdateGetMessages={setUpdateGetMessages} updateGetMessages={updateGetMessages} selectedItem={selectedItem} setSelectedItem={setSelectedItem} messagesInfo={messagesInfo} setMessagesInfo={setMessagesInfo}/>
          </Layout.Header>
          <Layout.SideNav>
            <Navigation selectedItem={selectedItem} setSelectedItem={setSelectedItem} />
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
                  My inbox
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
                />
              </FocusTrap>
            </Box>
            <Mails
              messagesInfo={messagesInfo}
              setSelectedMessage={setSelectedMessage}
            />
          </Layout.SidePane>
          <Layout.Main>
            <EmailContent selectedMessage={selectedMessage} />
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
