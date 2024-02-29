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
  messagesInfo: IMessageInfo[] | null;
  setSelectedMessage: React.Dispatch<React.SetStateAction<IMessageInfo | null>>;
  selectedItem: string;
};
export default function EmailList({
  messagesInfo,
  setSelectedMessage,
  selectedItem,
}: Props): JSX.Element {
  const [selectedIndex, setSelectedIndex] = React.useState<number | null>(null);

  return (
    <Box sx={{ overflow: "auto" }}>
      <List
        sx={{
          [`& .${listItemButtonClasses.root}.${listItemButtonClasses.selected}`]:
            {
              borderLeft: "2px solid",
              borderLeftColor: "var(--joy-palette-primary-outlinedBorder)",
            },
        }}
      >
        {messagesInfo?.map((item, index) => (
          <React.Fragment key={index}>
            <ListItem>
              <ListItemButton
                {...(index === selectedIndex && {
                  selected: true,
                  color: "neutral",
                })}
                sx={{ p: 2 }}
                onClick={() => {
                  console.log(item)
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
                        : item?.to_user_name[0].toUpperCase())
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
                        {selectedItem == "inbox"
                          ? item.from_user_name
                          : item.to_user_name}
                      </Typography>
                      <Box
                        sx={{
                          width: "8px",
                          height: "8px",
                          borderRadius: "99px",
                          bgcolor: item.category_id === 0 ? "" : item.color,
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
