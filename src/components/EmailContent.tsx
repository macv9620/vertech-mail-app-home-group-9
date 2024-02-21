import * as React from "react";
import Box from "@mui/joy/Box";
import Chip from "@mui/joy/Chip";
import Sheet from "@mui/joy/Sheet";
import Typography from "@mui/joy/Typography";
import Button from "@mui/joy/Button";
import Snackbar from "@mui/joy/Snackbar";
import Divider from "@mui/joy/Divider";
import Avatar from "@mui/joy/Avatar";
import Tooltip from "@mui/joy/Tooltip";

import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import ForwardToInboxRoundedIcon from "@mui/icons-material/ForwardToInboxRounded";
import ReplyRoundedIcon from "@mui/icons-material/ReplyRounded";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";

type Props = {
  selectedMessage: IMessageInfo | null;
};

export default function EmailContent({ selectedMessage }: Props): JSX.Element {
  const [open, setOpen] = React.useState<boolean[]>([false, false, false]);

  const handleSnackbarOpen = (index: number) => {
    const updatedOpen = [...open];
    updatedOpen[index] = true;
    setOpen(updatedOpen);
  };

  const handleSnackbarClose = (index: number) => {
    const updatedOpen = [...open];
    updatedOpen[index] = false;
    setOpen(updatedOpen);
  };

  return (
    <>
      <Sheet
        variant="outlined"
        sx={{
          minHeight: 500,
          borderRadius: "sm",
          p: 2,
          mb: 3,
        }}
      >
        {selectedMessage && (
          <Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                flexWrap: "wrap",
                gap: 2,
              }}
            >
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Avatar
                  src={
                    "https://placehold.co/155x232/842520/white?text=" +
                    selectedMessage.from_user_name[0].toUpperCase()
                  }
                />
                <Box sx={{ ml: 2 }}>
                  <Typography
                    level="title-sm"
                    textColor="text.primary"
                    mb={0.5}
                  >
                    {selectedMessage?.from_user_name}
                  </Typography>
                  <Typography level="body-xs" textColor="text.tertiary">
                    {selectedMessage?.created_at}
                  </Typography>
                </Box>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  height: "32px",
                  flexDirection: "row",
                  gap: 1.5,
                }}
              >
                <Button
                  disabled
                  size="sm"
                  variant="plain"
                  color="neutral"
                  startDecorator={<ReplyRoundedIcon />}
                  onClick={() => handleSnackbarOpen(0)}
                >
                  Reply
                </Button>
                <Snackbar
                  color="success"
                  open={open[0]}
                  onClose={() => handleSnackbarClose(0)}
                  anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                  startDecorator={<CheckCircleRoundedIcon />}
                  endDecorator={
                    <Button
                      onClick={() => handleSnackbarClose(0)}
                      size="sm"
                      variant="soft"
                      color="neutral"
                    >
                      Dismiss
                    </Button>
                  }
                >
                  Your message has been sent.
                </Snackbar>
                <Button
                  disabled
                  size="sm"
                  variant="plain"
                  color="neutral"
                  startDecorator={<ForwardToInboxRoundedIcon />}
                  onClick={() => handleSnackbarOpen(1)}
                >
                  Forward
                </Button>
                <Snackbar
                  color="success"
                  open={open[1]}
                  onClose={() => handleSnackbarClose(1)}
                  anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                  startDecorator={<CheckCircleRoundedIcon />}
                  endDecorator={
                    <Button
                      onClick={() => handleSnackbarClose(1)}
                      size="sm"
                      variant="soft"
                      color="neutral"
                    >
                      Dismiss
                    </Button>
                  }
                >
                  Your message has been forwarded.
                </Snackbar>
                <Button
                  disabled
                  size="sm"
                  variant="plain"
                  color="danger"
                  startDecorator={<DeleteRoundedIcon />}
                  onClick={() => handleSnackbarOpen(2)}
                >
                  Delete
                </Button>
                <Snackbar
                  color="danger"
                  open={open[2]}
                  onClose={() => handleSnackbarClose(2)}
                  anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                  startDecorator={<CheckCircleRoundedIcon />}
                  endDecorator={
                    <Button
                      onClick={() => handleSnackbarClose(2)}
                      size="sm"
                      variant="soft"
                      color="neutral"
                    >
                      Dismiss
                    </Button>
                  }
                >
                  Your message has been deleted.
                </Snackbar>
              </Box>
            </Box>
            <Divider sx={{ mt: 2 }} />
            <Box
              sx={{
                py: 2,
                display: "flex",
                flexDirection: "column",
                alignItems: "start",
              }}
            >
              <Typography
                level="title-lg"
                textColor="text.primary"
                endDecorator={
                  <Chip
                    component="span"
                    size="sm"
                    variant="outlined"
                    color="warning"
                  >
                    Personal
                  </Chip>
                }
              >
                {selectedMessage?.subject}
              </Typography>
              <Box
                sx={{
                  mt: 1,
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                  flexWrap: "wrap",
                }}
              >
                <div>
                  <Typography
                    component="span"
                    level="body-sm"
                    sx={{ mr: 1, display: "inline-block" }}
                  >
                    From
                  </Typography>
                  <Tooltip size="sm" title="Copy email" variant="outlined">
                    <Chip
                      size="sm"
                      variant="soft"
                      color="primary"
                      onClick={() => {}}
                    >
                      {selectedMessage?.from_user}
                    </Chip>
                  </Tooltip>
                </div>
                <div>
                  <Typography
                    component="span"
                    level="body-sm"
                    sx={{ mr: 1, display: "inline-block" }}
                  >
                    to
                  </Typography>
                  <Tooltip size="sm" title="Copy email" variant="outlined">
                    <Chip
                      size="sm"
                      variant="soft"
                      color="primary"
                      onClick={() => {}}
                    >
                      {selectedMessage?.to_user}
                    </Chip>
                  </Tooltip>
                </div>
              </Box>
            </Box>
          </Box>
        )}
        {selectedMessage && <Divider />}
        {!selectedMessage && (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignContent: "center",
              alignItems: "center",
              height: "80vh",
            }}
          >
            <Chip color="success" variant="outlined">
              Please select a message
            </Chip>
          </Box>
        )}

        <Typography level="body-sm" mt={2} mb={2}>
          {selectedMessage?.body.split("\n").map((line, index) => (
            <React.Fragment key={index}>
              {line}
              <br />
            </React.Fragment>
          ))}
        </Typography>
      </Sheet>
    </>
  );
}
