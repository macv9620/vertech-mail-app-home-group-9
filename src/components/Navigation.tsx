import Box from "@mui/joy/Box";
import List from "@mui/joy/List";
import ListSubheader from "@mui/joy/ListSubheader";
import ListItem from "@mui/joy/ListItem";
import ListItemButton from "@mui/joy/ListItemButton";
import ListItemDecorator from "@mui/joy/ListItemDecorator";
import ListItemContent from "@mui/joy/ListItemContent";

import InboxRoundedIcon from "@mui/icons-material/InboxRounded";
import OutboxRoundedIcon from "@mui/icons-material/OutboxRounded";
import React from "react";
import { Button, Input, Stack } from "@mui/joy";
import { postUserCategory } from "../services/categories/createCategory";

type ClearSearchFunction = () => void;

type Propos = {
  selectedItem: string;
  setSelectedItem: React.Dispatch<React.SetStateAction<string>>;
  clearSearch?: ClearSearchFunction;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
  setUpdateGetMessages: React.Dispatch<React.SetStateAction<boolean>>;
  updateGetMessages: boolean;
  categoriesInfo: IUserCategoryInfo[] | null;
  userLogged: IAuthenticatedUser;
  setShowLoading: React.Dispatch<React.SetStateAction<boolean>>
  setSelectedMessage: React.Dispatch<React.SetStateAction<IMessageInfo | null>>,
  setMessagesInfo: React.Dispatch<React.SetStateAction<IMessageInfo[] | null>>

};

export default function Navigation({
  selectedItem,
  setSelectedItem,
  setSearchTerm,
  setUpdateGetMessages,
  updateGetMessages,
  categoriesInfo,
  userLogged,
  setShowLoading,
  setSelectedMessage,
  setMessagesInfo

}: Propos) {

  const [newCategoryName, setNewCategoryName] = React.useState<string>('');

  function toTitleCase(str: string): string {
    return str.replace(/\w\S*/g, function(txt) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
  }

  const handleCategorySubmit = (event: React.FormEvent<HTMLFormElement>) => {
    setShowLoading(true)
    event.preventDefault();

    const colors: string[] = [
      "#9575cd",
      "#651fff",
      "#455a64",
      "#ff3d00",
      "#c2185b",
      "#1de9b6",
      "#9c27b0",
      "#00897b",
      "#ff9e80",
      "#e65100",
      "#ef6c00",
      "#00e5ff",
      "#b2dfdb",
      "#cddc39",
      "#ffeb3b",

    ]
    
    // Create an object with the input value
    const categoryObject = {
      category_name: toTitleCase(newCategoryName),
      color: colors[Math.floor(Math.random() * 11)],
      email: userLogged.email
    };

    // Now you can do something with the categoryObject
    postUserCategory(categoryObject)
      .then(res => {
        console.log(res)
        setShowLoading(false)
        setUpdateGetMessages(!updateGetMessages)
      })
      .catch(e => {
        console.log(e)
        setShowLoading(false)
      })

    setNewCategoryName('')
  };



  const filterByInbox = () => {
    setMessagesInfo([])
    setSelectedItem("inbox");
    // console.log(clearSearch)
    setSearchTerm("");
    setUpdateGetMessages(!updateGetMessages);
    setSelectedMessage(null)

    // clearSearch()
  };

  const filterBySent = () => {
    setMessagesInfo([])
    setSelectedItem("sent");
    setSearchTerm("");
    setUpdateGetMessages(!updateGetMessages);
    setSelectedMessage(null)
    // clearSearch()
  };

  return (
    <List size="sm" sx={{ "--ListItem-radius": "8px", "--List-gap": "4px" }}>
      <ListItem nested>
        <ListSubheader sx={{ letterSpacing: "2px", fontWeight: "800" }}>
          Browse
        </ListSubheader>
        <List aria-labelledby="nav-list-browse">
          <ListItem>
            <ListItemButton
              selected={selectedItem === "inbox"}
              onClick={filterByInbox}
            >
              <ListItemDecorator>
                <InboxRoundedIcon fontSize="small" />
              </ListItemDecorator>
              <ListItemContent>Inbox</ListItemContent>
            </ListItemButton>
          </ListItem>
          <ListItem>
            <ListItemButton
              selected={selectedItem === "sent"}
              onClick={filterBySent}
            >
              <ListItemDecorator>
                <OutboxRoundedIcon fontSize="small" />
              </ListItemDecorator>
              <ListItemContent>Sent</ListItemContent>
            </ListItemButton>
          </ListItem>
        </List>
      </ListItem>
      <ListItem nested sx={{ mt: 2 }}>
        <ListSubheader sx={{ letterSpacing: "2px", fontWeight: "800" }}>
          Categories
        </ListSubheader>
        <List
          aria-labelledby="nav-list-tags"
          size="sm"
          sx={{
            "--ListItemDecorator-size": "32px",
          }}
        >
          {categoriesInfo?.map((category) => (
            category.category_id === 0? null :
            <ListItem key={category.category_id}>
              <ListItemButton>
                <ListItemDecorator>
                  <Box
                    sx={{
                      width: "10px",
                      height: "10px",
                      borderRadius: "99px",
                      bgcolor: category.color,
                    }}
                  />
                </ListItemDecorator>
                <ListItemContent>{category.category_name}</ListItemContent>
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <form onSubmit={handleCategorySubmit}>
          <Stack spacing={1}>
            <Input
              size="sm"
              placeholder="Type your category name"
              required
              value={newCategoryName}
              onChange={(e) => setNewCategoryName(e.target.value)} // Update the categoryName state
            />
            <Button size="sm" type="submit">
              Create category
            </Button>
          </Stack>
        </form>
      </ListItem>
    </List>
  );
}
