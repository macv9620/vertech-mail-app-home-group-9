import * as React from "react";
import Box from "@mui/joy/Box";
import ModalClose from "@mui/joy/ModalClose";
import Button from "@mui/joy/Button";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import Textarea from "@mui/joy/Textarea";
import Sheet from "@mui/joy/Sheet";
import { IconButton, Input, Stack, Typography } from "@mui/joy";
// import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";

import FormatColorTextRoundedIcon from "@mui/icons-material/FormatColorTextRounded";
import AttachFileRoundedIcon from "@mui/icons-material/AttachFileRounded";
import InsertPhotoRoundedIcon from "@mui/icons-material/InsertPhotoRounded";
import FormatListBulletedRoundedIcon from "@mui/icons-material/FormatListBulletedRounded";
import { useAuthContext } from "../context/AuthContextProvider";
import { postMessage } from "../services/postMessage";
// import Snackbar from "@mui/joy/Snackbar";

interface WriteEmailProps {
  open?: boolean;
  onClose?: () => void;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  openSnackbar: ISnackbarOpen;
  setOpenSnackbar: React.Dispatch<React.SetStateAction<ISnackbarOpen>>;
  setUpdateGetMessages: React.Dispatch<React.SetStateAction<boolean>>;
  updateGetMessages: boolean;
  setShowLoading: React.Dispatch<React.SetStateAction<boolean>>
}

const WriteEmail = React.forwardRef<HTMLDivElement, WriteEmailProps>(
  function WriteEmail(
    { open, onClose, setOpen, setOpenSnackbar, updateGetMessages, setUpdateGetMessages, setShowLoading },
    ref
  ) {
    const [toUser, setToUser] = React.useState<string>("");
    const [subject, setSubject] = React.useState<string>("");
    const [body, setBody] = React.useState<string>("");
    const [isFormReady, setIsFormReady] = React.useState<boolean>(false);

    const { userLogged } = useAuthContext();

    const handleSnackbarOpen = (message: string, success: boolean) => {
      setOpenSnackbar({
        open: true,
        message,
        success,
      });
    };

    const updateToUserHandler: React.ChangeEventHandler<HTMLInputElement> = (
      e
    ): void => {
      setToUser(e.currentTarget.value);
    };

    const updateSubject: React.ChangeEventHandler<HTMLInputElement> = (
      e
    ): void => {
      setSubject(e.currentTarget.value);
    };

    // const updateBody: React.ChangeEventHandler<HTMLTextAreaElement> = (
    //   e
    // ): void => {
    //   setBody(e.currentTarget.value);
    // };

    const updateBody: React.ChangeEventHandler<HTMLTextAreaElement> = (
      e: React.ChangeEvent<HTMLTextAreaElement>
    ): void => {
      // Check if Enter key is pressed
      if (e.nativeEvent instanceof KeyboardEvent && (e.nativeEvent as KeyboardEvent).key === 'Enter' || (e.nativeEvent as KeyboardEvent).keyCode === 13) {
        // Prevent the default behavior of Enter key press which is adding a new line
        e.preventDefault();
        // Insert a newline character into the text area
        const newText = e.currentTarget.value + '\n';
        setBody(newText);
      } else {
        // Update the body state with the current value of the textarea
        setBody(e.currentTarget.value);
      }
    };

    const hadleSubmit: React.MouseEventHandler<HTMLAnchorElement> = () => {
      setShowLoading(true)
      const data: IPostMessageData = {
        from_user: userLogged.email,
        to_user: toUser,
        subject,
        body,
        category_id: 0,
      };

      postMessage(data)
        .then((res) => {
          handleSnackbarOpen(res.data.message, true);
          console.log(res);
          setOpen(false);

          setBody("");
          setToUser("");
          setSubject("");
          setUpdateGetMessages(!updateGetMessages)
          setShowLoading(false)

        })
        .catch((e) => {
          console.log(e);
          if (e.response?.status === 400) {
            handleSnackbarOpen(
              e.response.data.message
                ? e.response.data.message
                : "Uncontrolled error",
              false
            );
          } else if (e.code == "ERR_NETWORK") {
            handleSnackbarOpen("Can not connect to server", false);
          }
         setShowLoading(false)

        });

      console.log(data);
      // handleSnackbarOpen(1)
    };

    React.useEffect(() => {
      if (toUser.trim() !== "" && subject.trim() !== "" && body.trim() !== "") {
        setIsFormReady(true);
      } else {
        setIsFormReady(false);
      }
    }, [toUser, subject, body]);

    return (
      <Sheet
        ref={ref}
        sx={{
          alignItems: "center",
          px: 1.5,
          py: 1.5,
          ml: "auto",
          width: { xs: "100dvw", md: 600 },
          flexGrow: 1,
          border: "1px solid",
          borderRadius: "8px 8px 0 0",
          backgroundColor: "background.level1",
          borderColor: "neutral.outlinedBorder",
          boxShadow: "lg",
          zIndex: 1000,
          position: "fixed",
          bottom: 0,
          right: 24,
          transform: open ? "translateY(0)" : "translateY(100%)",
          transition: "transform 0.3s ease",
        }}
      >
        <Box sx={{ mb: 2 }}>
          <Typography level="title-sm">New message</Typography>
          <ModalClose id="close-icon" onClick={onClose} />
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
            flexShrink: 0,
          }}
        >
          <FormControl required>
            <FormLabel>To</FormLabel>
            <Input
              type="email"
              placeholder="email@vertech.com.co"
              aria-label="Message"
              onChange={updateToUserHandler}
              value={toUser}
              required
            />
          </FormControl>
          <FormControl required>
            <FormLabel>Subject</FormLabel>
            <Input
              placeholder="Subject"
              aria-label="Message"
              onChange={updateSubject}
              value={subject}
            />
          </FormControl>
          <FormControl
            sx={{ display: "flex", flexDirection: "column", gap: 2 }}
            required
          >
            <FormLabel>Your message</FormLabel>
            <Textarea
              placeholder="Type your message here…"
              aria-label="Message"
              minRows={8}
              onChange={updateBody}
              value={body}
              endDecorator={
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                  flexGrow={1}
                  sx={{
                    py: 1,
                    pr: 1,
                    borderTop: "1px solid",
                    borderColor: "divider",
                  }}
                >
                  <div>
                    <IconButton
                      disabled
                      size="sm"
                      variant="plain"
                      color="neutral"
                    >
                      <FormatColorTextRoundedIcon />
                    </IconButton>
                    <IconButton
                      disabled
                      size="sm"
                      variant="plain"
                      color="neutral"
                    >
                      <AttachFileRoundedIcon />
                    </IconButton>
                    <IconButton
                      disabled
                      size="sm"
                      variant="plain"
                      color="neutral"
                    >
                      <InsertPhotoRoundedIcon />
                    </IconButton>
                    <IconButton
                      disabled
                      size="sm"
                      variant="plain"
                      color="neutral"
                    >
                      <FormatListBulletedRoundedIcon />
                    </IconButton>
                  </div>
                  <Button
                    color="primary"
                    sx={{ borderRadius: "sm" }}
                    onClick={hadleSubmit}
                    disabled={!isFormReady}
                  >
                    Send
                  </Button>
                </Stack>
              }
              sx={{
                "& textarea:first-of-type": {
                  minHeight: 72,
                },
              }}
            />
          </FormControl>
        </Box>
      </Sheet>
    );
  }
);

export default WriteEmail;
