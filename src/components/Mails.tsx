import * as React from "react";
import Box from "@mui/joy/Box";
import Typography from "@mui/joy/Typography";
import Avatar from "@mui/joy/Avatar";
import List from "@mui/joy/List";
import ListDivider from "@mui/joy/ListDivider";
import ListItem from "@mui/joy/ListItem";
import ListItemButton, { listItemButtonClasses } from "@mui/joy/ListItemButton";
import ListItemDecorator from "@mui/joy/ListItemDecorator";

type Props = {
  // Props for managing message information and selection
  messagesInfo: IMessageInfo[] | null;
  setSelectedMessage: React.Dispatch<React.SetStateAction<IMessageInfo | null>>;
  selectedItem: string;
  userAuthEmail: string;
};

export default function EmailList({
  messagesInfo,
  setSelectedMessage,
  selectedItem,
  userAuthEmail
}: Props): JSX.Element {
  const [selectedIndex, setSelectedIndex] = React.useState<number | null>(null);

  // Filtering messages based on the selected item and user authentication email
  let filteredMessages = null;
  if (messagesInfo) {
    filteredMessages = [...messagesInfo];

    if (selectedItem !== "inbox" && selectedItem !== "sent") {
      filteredMessages = filteredMessages.filter(message =>
        // Filter messages not sent by the authenticated user and match the selected category
        (message.from_user !== userAuthEmail) && (String(message.category_id) === selectedItem)
      );
    }
  }

  return (
    <Box sx={{ overflowY: "scroll", height: "75vh"}}>
      <List
        sx={{
          [`& .${listItemButtonClasses.root}.${listItemButtonClasses.selected}`]:
            {
              borderLeft: "2px solid",
              borderLeftColor: "var(--joy-palette-primary-outlinedBorder)",
            }
        }}
      >
        {filteredMessages?.map((item, index) => (
          <React.Fragment key={index}>
            <ListItem>
              <ListItemButton
                {...(index === selectedIndex && {
                  selected: true,
                  color: "neutral",
                })}
                sx={{ p: 2 }}
                onClick={() => {
                  setSelectedMessage(item);
                  setSelectedIndex(index);
                }}
              >
                <ListItemDecorator sx={{ alignSelf: "flex-start" }}>
                  <Avatar
                    alt=""
                    src={
                      "https://placehold.co/155x232/842520/white?text=" +
                      (selectedItem === "inbox"
                        ? item?.from_user_name[0].toUpperCase()
                        : selectedItem === "sent"
                        ? item?.to_user_name[0].toUpperCase()
                        : item?.from_user_name[0].toUpperCase())
                    }
                  />
                </ListItemDecorator>
                <Box sx={{ pl: 2, width: "100%" }}>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      mb: 0.5,
                    }}
                  >
                    <Box
                      sx={{ display: "flex", alignItems: "center", gap: 0.5 }}
                    >
                      <Typography level="body-xs">
                        {                      (selectedItem === "inbox"
                        ? item?.from_user_name
                        : selectedItem === "sent"
                        ? item?.to_user_name
                        : item?.from_user_name)}
                      </Typography>
                      <Box
                        sx={{
                          width: "8px",
                          height: "8px",
                          borderRadius: "99px",
                          bgcolor: item.category_id === 0 ? "" : selectedItem === "sent"? "": item.color,
                        }}
                      />
                    </Box>
                    <Typography level="body-xs" textColor="text.tertiary">
                      {item.created_at}
                    </Typography>
                  </Box>
                  <div>
                    <Typography sx={{ mb: 0.5 }}>{item.subject}</Typography>
                    <Typography level="body-sm">
                      {item.body.slice(0, 60) + "..."}
                    </Typography>
                  </div>
                </Box>
              </ListItemButton>
            </ListItem>
            <ListDivider sx={{ m: 0 }} />
          </React.Fragment>
        ))}
      </List>
    </Box>
  );
}
