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

import Select from "@mui/joy/Select";

import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import ForwardToInboxRoundedIcon from "@mui/icons-material/ForwardToInboxRounded";
import ReplyRoundedIcon from "@mui/icons-material/ReplyRounded";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";

import Option from "@mui/joy/Option";
import { updateCategoryMessage } from "../services/categories/updateCategoryMessage";
import { inactiveMessage } from "../services/messages/inactiveMessage";

// Define the type for component props
type Props = {
  selectedMessage: IMessageInfo | null;
  setSelectedMessage: React.Dispatch<React.SetStateAction<IMessageInfo | null>>;
  categoriesInfo: IUserCategoryInfo[] | null;
  selectedItem: string;
  updateGetMessages: boolean;
  setUpdateGetMessages: React.Dispatch<React.SetStateAction<boolean>>;
  showLoading: boolean;
  setShowLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setOpenSnackbar: React.Dispatch<React.SetStateAction<ISnackbarOpen>>;
};

export default function EmailContent({
  selectedMessage,
  categoriesInfo,
  selectedItem,
  updateGetMessages,
  setUpdateGetMessages,
  showLoading,
  setShowLoading,
  setOpenSnackbar,
  setSelectedMessage
}: Props): JSX.Element {
  // State for controlling Snackbar open/close
  const [open, setOpen] = React.useState<boolean[]>([false, false, false]);
  // State for storing selected option in Select component
  const [selectedOption, setSelectedOption] = React.useState<number>(0);

  React.useEffect(() => {
    // Update selected option when selected message changes or loading state changes
    if(selectedMessage){
      setSelectedOption(selectedMessage.category_id);
    }
  }, [selectedMessage, showLoading]);

  // Handle change in Select component
  const handleSelectChange = (
      _: React.SyntheticEvent | null,
    newValue: number | null
  ) => {
    // Set loading state to true
    setShowLoading(true)
    const data: IUpdateMessageCategory = {
      message_id: selectedMessage?.message_id,
      category_id: newValue,
    };

    // Call service to update category message
    updateCategoryMessage(data)
      .then(() => {
        // Toggle update state to fetch new messages
        setUpdateGetMessages(!updateGetMessages);
        // Set loading state to false
        setShowLoading(false)
      })
      .catch(() => setShowLoading(false))
  };

  // Handle opening Snackbar
  const handleSnackbarOpen = (index: number) => {
    const updatedOpen = [...open];
    updatedOpen[index] = true;
    setOpen(updatedOpen);
  };

  // Handle closing Snackbar
  const handleSnackbarClose = (index: number) => {
    const updatedOpen = [...open];
    updatedOpen[index] = false;
    setOpen(updatedOpen);
  };

  // Handle deleting message
  const handleDeleteMessage = () => {
    // Set loading state to true
    setShowLoading(true)
    if(selectedMessage){
      // Call service to mark message as inactive
      inactiveMessage(selectedMessage?.message_id)
      .then(() => {
        // Clear selected message
        setSelectedMessage(null)
        // Toggle update state to fetch new messages
        setUpdateGetMessages(!updateGetMessages)
        // Open success Snackbar
        setOpenSnackbar({
          open: true,
          message: "Message successfully deleted",
          success: true,
        })
      })
      .catch(() => {
        // Open error Snackbar
        setOpenSnackbar({
          open: true,
          message: "Unhandled error",
          success: false,
        })
        // Set loading state to false
        setShowLoading(false)
      })
    }
  }


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
                    (selectedItem === "inbox"
                      ? selectedMessage?.from_user_name[0].toUpperCase()
                      : selectedItem === "sent"
                      ? selectedMessage?.to_user_name[0].toUpperCase()
                      : selectedMessage?.from_user_name[0].toUpperCase())
                  }
                />
                <Box sx={{ ml: 2 }}>
                  <Typography
                    level="title-sm"
                    textColor="text.primary"
                    mb={0.5}
                  >
                        {                      (selectedItem === "inbox"
                        ? selectedMessage?.from_user_name
                        : selectedItem === "sent"
                        ? selectedMessage?.to_user_name
                        : selectedMessage?.from_user_name)}
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
                {selectedItem !== "sent" && 
                                <Button
                                size="sm"
                                variant="plain"
                                color="danger"
                                startDecorator={<DeleteRoundedIcon />}
                                onClick={() => handleDeleteMessage()}
                              >
                                Delete
                              </Button>
                }
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
              <Box
                sx={{
                  display: "flex",
                  gap: "10px",
                  width: "100%",
                  alignItems: "center",
                }}
              >
                <Typography level="title-lg" textColor="text.primary">
                  {selectedMessage?.subject}
                </Typography>
                {/* <Chip variant="outlined" size="sm">{selectedMessage.category_id === 0?"No category":selectedMessage.category_name}</Chip> */}
                {selectedItem !== "sent" && (
                  <Chip color="success" size="sm">
                    <Select
                      size={"" as "sm"}
                      color="success"
                      onChange={handleSelectChange}
                      value={selectedOption}
                      sx={{ fontSize: "13px" }}
                    >
                      {categoriesInfo?.map((category) => (
                        <Option
                          key={category.category_id}
                          value={category.category_id}
                          sx={{ fontSize: "12px" }}
                        >
                          {category.category_id === 0
                            ? "No category"
                            : category.category_name}
                        </Option>
                      ))}
                    </Select>
                  </Chip>
                )}
              </Box>

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
