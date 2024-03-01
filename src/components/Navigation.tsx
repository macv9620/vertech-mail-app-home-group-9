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
  // Props for managing navigation and category functionalities
  selectedItem: string;
  setSelectedItem: React.Dispatch<React.SetStateAction<string>>;
  clearSearch?: ClearSearchFunction;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
  setUpdateGetMessages: React.Dispatch<React.SetStateAction<boolean>>;
  updateGetMessages: boolean;
  categoriesInfo: IUserCategoryInfo[] | null;
  userLogged: IAuthenticatedUser;
  setShowLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setSelectedMessage: React.Dispatch<React.SetStateAction<IMessageInfo | null>>;
  setMessagesInfo: React.Dispatch<React.SetStateAction<IMessageInfo[] | null>>;
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
  setMessagesInfo,
}: Propos) {
  const [newCategoryName, setNewCategoryName] = React.useState<string>("");

  // Function to convert the first letter of each word to uppercase
  function toTitleCase(str: string): string {
    return str.replace(/\w\S*/g, function (txt) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
  }

  // Function to handle category submission
  const handleCategorySubmit = (event: React.FormEvent<HTMLFormElement>) => {
    setShowLoading(true);
    event.preventDefault();

    const colors: string[] = [
      "#9575cd",
      "#651fff",
      "#455a64",
      "#ff3d00",
      "#be674c",
      "#1de9b6",
      "#9c27b0",
      "#00897b",
      "#ff9e80",
      "#ef6c00",
      "#00e5ff",
      "#ffeb3b",
      "#867d32",
      "#2d0b7d",
      "#b30000",
      "#ffcc80",
      "#4db6ac",
      "#aa00ff",
      "#e65100",
      "#827717",
      "#00bcd4",
      "#8c9eff",
      "#ffd180",
      "#d50000",
      "#ff7043",
      "#aeea00",
      "#b388ff",
      "#64ffda",
      "#c2185b",
      "#4fc3f7",
      "#f57f17",
      "#00bfa5",
      "#3f51b5",
      "#ffab40",
      "#f44336",
      "#00e676",
      "#ffc107",
      "#69f0ae",
      "#8bc34a",
      "#304ffe",
      "#ff6e40",
      "#00bcd4",
      "#b2ff59",
      "#4db6ac",
      "#9e9d24",
      "#f57c00",
      "#00c853",
      "#00b8d4",
      "#c51162",
      "#607d8b",
      "#1de9b6",
      "#9e9e9e",
      "#03a9f4",
      "#ffb300",
      "#00bfa5",
      "#1de9b6",
      "#2962ff",
      "#b2ff59",
      "#ffab00",
      "#ff7043",
      "#03a9f4",
      "#9c27b0",
      "#1de9b6",
      "#69f0ae",
      "#ff6d00",
      "#4db6ac",
      "#536dfe",
      "#c2185b",
      "#ff8a80",
      "#ff9100",
      "#f57c00",
      "#f57f17",
      "#b388ff",
      "#9c27b0",
      "#ffd180",
      "#ef6c00",
      "#00b8d4",
      "#fdd835",
      "#69f0ae",
      "#ffc107",
      "#01579b",
      "#673ab7",
      "#69f0ae",
      "#827717",
      "#ff3d00",
      "#2962ff",
      "#f50057",
      "#ff7043",
      "#03a9f4",
      "#ff5722",
      "#4db6ac",
      "#b388ff",
      "#f57c00",
      "#00e5ff",
      // Array of predefined colors for categories
      // Add your custom color codes here
    ];

    // Create an object with the input value
    const categoryObject = {
      category_name: toTitleCase(newCategoryName),
      color: colors[Math.floor(Math.random() * 11)], // Randomly select a color from the array
      email: userLogged.email, // Assign the user's email to the category
    };

    console.log(categoryObject)

    // Now you can do something with the categoryObject
    postUserCategory(categoryObject)
      .then(() => {
        setShowLoading(false);
        setUpdateGetMessages(!updateGetMessages);
      })
      .catch(() => {
        setShowLoading(false);
      });

    setNewCategoryName("");
  };

  // Function to filter messages by inbox
  const filterByInbox = () => {
    setMessagesInfo([]);
    setSelectedItem("inbox");
    setSearchTerm("");
    setUpdateGetMessages(!updateGetMessages);
    setSelectedMessage(null);
  };

  // Function to filter messages by sent
  const filterBySent = () => {
    setMessagesInfo([]);
    setSelectedItem("sent");
    setSearchTerm("");
    setUpdateGetMessages(!updateGetMessages);
    setSelectedMessage(null);
    // clearSearch()
  };

  // Function to handle category click
  const handleCategoryClick = (categoryId: number) => {
    setSelectedItem(categoryId.toString());
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
          Inbox Categories
        </ListSubheader>
        <List
          aria-labelledby="nav-list-tags"
          size="sm"
          sx={{
            "--ListItemDecorator-size": "32px",
          }}
        >
          {categoriesInfo?.map((category) =>
            category.category_id === 0 ? null : (
              <ListItem key={category.category_id}>
                <ListItemButton onClick={() => handleCategoryClick(category.category_id)} selected={selectedItem === category.category_id.toString()}>
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
            )
          )}
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
