import * as React from "react";
import { useColorScheme } from "@mui/joy/styles";
import Box from "@mui/joy/Box";
import Typography from "@mui/joy/Typography";
import IconButton from "@mui/joy/IconButton";
import Stack from "@mui/joy/Stack";
import Avatar from "@mui/joy/Avatar";
import Input from "@mui/joy/Input";
import Button from "@mui/joy/Button";
import Tooltip from "@mui/joy/Tooltip";
import Dropdown from "@mui/joy/Dropdown";
import Menu from "@mui/joy/Menu";
import MenuButton from "@mui/joy/MenuButton";
import MenuItem from "@mui/joy/MenuItem";
import ListDivider from "@mui/joy/ListDivider";

import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import DarkModeRoundedIcon from "@mui/icons-material/DarkModeRounded";
import LightModeRoundedIcon from "@mui/icons-material/LightModeRounded";
import SettingsRoundedIcon from "@mui/icons-material/SettingsRounded";
import HelpRoundedIcon from "@mui/icons-material/HelpRounded";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";



import { useAuthContext } from "../context/AuthContextProvider";
import { useNavigate } from "react-router-dom";

function ColorSchemeToggle() {
  const { mode, setMode } = useColorScheme();
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => {
    setMounted(true);
  }, []);
  if (!mounted) {
    return <IconButton size="sm" variant="outlined" color="primary" />;
  }
  return (
    <Tooltip title="Change theme" variant="outlined">
      <IconButton
        id="toggle-mode"
        size="sm"
        variant="plain"
        color="neutral"
        sx={{ alignSelf: "center" }}
        onClick={() => {
          if (mode === "light") {
            setMode("dark");
          } else {
            setMode("light");
          }
        }}
      >
        {mode === "light" ? <DarkModeRoundedIcon /> : <LightModeRoundedIcon />}
      </IconButton>
    </Tooltip>
  );
}

type Propos = {
  updateGetMessages: boolean;
  setUpdateGetMessages: React.Dispatch<React.SetStateAction<boolean>>;
  selectedItem: string;
  setSelectedItem: React.Dispatch<React.SetStateAction<string>>;
  messagesInfo: IMessageInfo[] | null;
  setMessagesInfo: React.Dispatch<React.SetStateAction<IMessageInfo[] | null>>;
  userAuthEmail: string;
  searchTerm: string;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
};

type ClearSearchFunction = () => void;

const Header =  ({
  setUpdateGetMessages,
  updateGetMessages,
  searchTerm,
  selectedItem,
  messagesInfo,
  setMessagesInfo,
  userAuthEmail,
  setSearchTerm
}: Propos) => {


  const { userLogged, setUserLogged } = useAuthContext();
  const navigate = useNavigate();
  const [messagesInfoOrigin, setMessagesInfoOrigin] = React.useState<
    IMessageInfo[] | null
  >(null);

  React.useEffect(() => {
    setMessagesInfoOrigin(messagesInfo);
  }, [messagesInfo]);

  // React.useEffect(()=> {
  //   clearSearch()
  // }, [selectedItem])

  const logout = () => {
    sessionStorage.clear();
    setUserLogged({
      name: "",
      email: "",
    });
    navigate("/");
  };

  const handleSearch = () => {

    console.log("Mensajes iniciales")
    console.log(messagesInfo)

    if (messagesInfoOrigin && searchTerm !== "") {

      let filteredMessages = [...messagesInfoOrigin];
      if (selectedItem === "inbox") {
        console.log("Inbox")
        console.log(filteredMessages)
        filteredMessages = filteredMessages.filter(
          (message) =>
            (message.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
              message.from_user.toLowerCase().includes(searchTerm.toLowerCase()))
        );
      } else if (selectedItem === "sent") {
        console.log("Sent")
        console.log(filteredMessages)
        console.log(userAuthEmail)
        console.log(filteredMessages)

        filteredMessages = filteredMessages.filter(
          (message) =>
            (message.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
              message.to_user.toLowerCase().includes(searchTerm.toLowerCase()))
        );

        console.log(filteredMessages)
      }
      setMessagesInfo(filteredMessages);
    }
  };

  const clearSearch: ClearSearchFunction = () => {
    console.log("Borro filtro")
    setSearchTerm("");
    setUpdateGetMessages(!updateGetMessages);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexGrow: 1,
        justifyContent: "space-between",
      }}
    >
      <Stack
        direction="row"
        justifyContent="center"
        alignItems="center"
        spacing={1}
        sx={{ display: { xs: "none", sm: "flex" } }}
      >
        <Button
          variant="plain"
          color="neutral"
          aria-pressed="true"
          component="a"
          size="sm"
          sx={{ alignSelf: "center" }}
        >
          Email
        </Button>
        <Button
          disabled
          variant="plain"
          color="neutral"
          component="a"
          size="sm"
          sx={{ alignSelf: "center" }}
        >
          Team
        </Button>
        <Button
          disabled
          variant="plain"
          color="neutral"
          component="a"
          size="sm"
          sx={{ alignSelf: "center" }}
        >
          Files
        </Button>
      </Stack>

      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          gap: 1.5,
          alignItems: "center",
        }}
      >
        <Input
          size="sm"
          variant="outlined"
          placeholder="Filter by email or subject"
          startDecorator={
            <Button onClick={handleSearch} sx={{bgcolor: "white", width: "20px"}}>
              <SearchRoundedIcon sx={{cursor: "pointer"}} color="primary"/>
            </Button>
            }
          sx={{
            alignSelf: "center",
            display: {
              xs: "none",
              sm: "flex",
              width: 210
            },
          }}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          // onBlur={handleSearch} // Aplicar el filtro al perder el foco
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSearch(); // Aplicar el filtro al presionar Enter
            }
          }}
        />
        <Button
          size="sm"
          variant="outlined"
          color="neutral"
          sx={{ alignSelf: "center", cursor: "pointer" }}
          onClick={clearSearch}
        >
          Clear filter
        </Button>
        <IconButton
          size="sm"
          variant="outlined"
          color="neutral"
          sx={{
            display: { xs: "inline-flex", sm: "none" },
            alignSelf: "center",
            cursor: "pointer"
          }}
        >
          <SearchRoundedIcon />
        </IconButton>

        <ColorSchemeToggle />
        <Dropdown>
          <MenuButton
            variant="plain"
            size="sm"
            sx={{
              maxWidth: "32px",
              maxHeight: "32px",
              borderRadius: "9999999px",
            }}
          >
            <Avatar
              src={
                "https://placehold.co/155x232/f6f8fa/black?text=" +
                userLogged.name[0]
              }
              sx={{ maxWidth: "32px", maxHeight: "32px" }}
            />
          </MenuButton>
          <Menu
            placement="bottom-end"
            size="sm"
            sx={{
              zIndex: "99999",
              p: 1,
              gap: 1,
              "--ListItem-radius": "var(--joy-radius-sm)",
            }}
          >
            <MenuItem>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <Avatar
                  src={
                    "https://placehold.co/155x232/f6f8fa/black?text=" +
                    userLogged.name[0]
                  }
                  sx={{ borderRadius: "50%" }}
                />
                <Box sx={{ ml: 1.5 }}>
                  <Typography level="title-sm" textColor="text.primary">
                    {userLogged.name}
                  </Typography>
                  <Typography level="body-xs" textColor="text.tertiary">
                    {userLogged.email}
                  </Typography>
                </Box>
              </Box>
            </MenuItem>
            <ListDivider />
            <MenuItem disabled>
              <HelpRoundedIcon />
              Help
            </MenuItem>
            <MenuItem disabled>
              <SettingsRoundedIcon />
              Settings
            </MenuItem>
            <ListDivider />
            <MenuItem onClick={logout}>
              <LogoutRoundedIcon />
              Log out
            </MenuItem>
          </Menu>
        </Dropdown>
      </Box>
    </Box>
  );
}

export {Header}
