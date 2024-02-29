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

type Props = {
  selectedMessage: IMessageInfo | null;
  categoriesInfo: IUserCategoryInfo[] | null;
  selectedItem: string;
  updateGetMessages: boolean;
  setUpdateGetMessages: React.Dispatch<React.SetStateAction<boolean>>;
  setSelectedMessage: React.Dispatch<React.SetStateAction<IMessageInfo | null>>;
  showLoading: boolean;
};

export default function EmailContent({
  selectedMessage,
  categoriesInfo,
  selectedItem,
  updateGetMessages,
  setUpdateGetMessages,
}: Props): JSX.Element {
  const [open, setOpen] = React.useState<boolean[]>([false, false, false]);
  const [selectedOption, setSelectedOption] = React.useState<number>(0);

  React.useEffect(() => {
    if (selectedMessage && selectedMessage.category_id) {
      setSelectedOption(selectedMessage.category_id);
    } else {
      setSelectedOption(0); // Reset to the initial value
    }
  }, [selectedMessage]);

  const handleSelectChange = (
    event: React.SyntheticEvent | null,
    newValue: number | null
  ) => {
    setSelectedOption(newValue ?? 0);
    const data: IUpdateMessageCategory = {
      message_id: selectedMessage?.message_id,
      category_id: newValue,
    };

    console.log("data", data);

    updateCategoryMessage(data)
      .then((res) => {
        console.log(res);
        setUpdateGetMessages(!updateGetMessages);
      })
      .catch((e) => console.log(e));

    setSelectedOption(0);
    console.log(event);
  };

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
                    (selectedItem === "inbox"
                      ? selectedMessage?.from_user_name[0].toUpperCase()
                      : selectedMessage?.to_user_name[0].toUpperCase())
                  }
                />
                <Box sx={{ ml: 2 }}>
                  <Typography
                    level="title-sm"
                    textColor="text.primary"
                    mb={0.5}
                  >
                    {selectedItem === "inbox"
                      ? selectedMessage?.from_user_name
                      : selectedMessage?.to_user_name}
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
                {selectedItem === "inbox" && (
                  <Chip color="success" size="sm">
                    <Select
                      onChange={handleSelectChange}
                      value={selectedOption}
                      sx={{ fontSize: "10px" }}
                    >
                      {categoriesInfo?.map((category) => (
                        <Option
                          key={category.category_id}
                          value={category.category_id}
                          sx={{ fontSize: "12px" }}
                        >
                          {category.category_id === 0
                            ? ""
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
