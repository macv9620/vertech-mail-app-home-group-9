import * as React from 'react';
import { CssVarsProvider } from '@mui/joy/styles';
import { FocusTrap } from '@mui/base/FocusTrap';
import CssBaseline from '@mui/joy/CssBaseline';
import Box from '@mui/joy/Box';
import Typography from '@mui/joy/Typography';
import Button from '@mui/joy/Button';
import Stack from '@mui/joy/Stack';

import CreateRoundedIcon from '@mui/icons-material/CreateRounded';
import EmailRoundedIcon from '@mui/icons-material/EmailRounded';
import PeopleAltRoundedIcon from '@mui/icons-material/PeopleAltRounded';
import FolderRoundedIcon from '@mui/icons-material/FolderRounded';
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";

import Layout from './components/Layout';
import Navigation from './components/Navigation';
import Mails from './components/Mails';
import EmailContent from './components/EmailContent';
import WriteEmail from './components/WriteEmail';
import Header from './components/Header';
import Snackbar from "@mui/joy/Snackbar";

const App = (): JSX.Element => {
  const [drawerOpen, setDrawerOpen] = React.useState<boolean>(false);
  const [open, setOpen] = React.useState<boolean>(false);
  const [messagesInfo, setMessagesInfo] = React.useState<IMessageInfo[] | null>(null)
  const [selectedMessage, setSelectedMessage] = React.useState<IMessageInfo | null>(null)
  const [openSnackBar, setOpenSnackBar] = React.useState<boolean[]>([false, false, false]);

  const handleSnackbarClose = (index: number) => {
    const updatedOpen = [...openSnackBar];
    updatedOpen[index] = false;
    setOpenSnackBar(updatedOpen);
  };

  const dataFromAPI: IMessageInfo[] = [
    {
      from_user_name: 'Alex Jonnold',
      from_user: 'a@mail.com',
      to_user: 'b@mail.com',
      avatar: 'https://i.pravatar.cc/40?img=3',
      created_at: '21 Oct 2022 00:14',
      subject: 'Details for our Yosemite Park hike',
      body: "He stepped away from the mic. This was the best take he had done so far, but something seemed missing. Then it struck him all at once. Visuals ran in front of his eyes and music rang in his ears. His eager fingers went to work in an attempt to capture his thoughts hoping the results would produce something that was at least half their glory.",
      color: 'warning.400',
    },
    {
      from_user_name: 'Pete Sand',
      from_user: 'a@mail.com',
      to_user: 'b@mail.com',
      avatar: 'https://i.pravatar.cc/40?img=4',
      created_at: '06 Jul 2022 13:45',
      subject: 'Tickets for our upcoming trip',
      body: "The light blinded him. It was dark and he thought he was the only one in the area, but the light shining in his eyes proved him wrong. It came from about 100 feet away and was shining so directly into his eyes he couldn't make out anything about the person holding the light. There was only one thing to do in this situation. He reached into his pocket and pulled out a flashlight of his own that was much stronger than the one currently blinding him. He turned it on and pointed it into the stranger's eyes.",
      color: 'success.400',
    },
    {
      from_user_name: 'Kate Gates',
      from_user: 'a@mail.com',
      to_user: 'b@mail.com',
      avatar: 'https://i.pravatar.cc/40?img=5',
      created_at: '16 May 2022 14:52',
      subject: 'Brunch this Saturday?',
      body: "She closed her eyes and then opened them again. What she was seeing just didn't make sense. She shook her head seeing if that would help. It didn't. Although it seemed beyond reality, there was no denying she was witnessing a large formation of alien spaceships filling the sky.",
      color: 'primary.500',
    },
    {
      from_user_name: 'John Snow',
      from_user: 'a@mail.com',
      to_user: 'b@mail.com',
      avatar: 'https://i.pravatar.cc/40?img=7',
      created_at: '10 May 2022 23:11',
      subject: 'Exciting News!',
      body: "There was nothing to indicate Nancy was going to change the world. She looked like an average girl going to an average high school. It was the fact that everything about her seemed average that would end up becoming her superpower.",
      color: 'danger.500',
    },
    // {
    //   from_user_name: 'Michael Scott',
    //   from_user: 'a@mail.com',
    //   to_user: 'b@mail.com',
    //   avatar: 'https://i.pravatar.cc/40?img=8',
    //   created_at: '13 Apr 2022 20:19',
    //   subject: 'Upcoming Product Launch',
    //   body: "It had been a simple realization that had changed Debra's life perspective. It was really so simple that she was embarrassed that she had lived the previous five years with the way she measured her worth. Now that she saw what she had been doing, she could see how sad it was. That made her all the more relieved she had made the change. The number of hearts her Instagram posts received wasn't any longer the indication of her own self-worth.",
    //   color: 'danger.500',
    // },
    // {
    //   from_user_name: 'Kate Gates',
    //   from_user: 'a@mail.com',
    //   to_user: 'b@mail.com',
    //   avatar: 'https://i.pravatar.cc/40?img=5',
    //   created_at: '16 May 2022 08:22',
    //   subject: 'Brunch this Saturday?',
    //   body: "What were they eating? It didn't taste like anything she had ever eaten before and although she was famished, she didn't dare ask. She knew the answer would be one she didn't want to hear.",
    //   color: 'primary.500',
    // }
  ];

  React.useEffect(()=>{
      setMessagesInfo(dataFromAPI)
  },[])

  return (
    <CssVarsProvider disableTransitionOnChange>
      <CssBaseline />
      {drawerOpen && (
        <Layout.SideDrawer onClose={() => setDrawerOpen(false)}>
          <Navigation />
        </Layout.SideDrawer>
      )}
      <Stack
        id="tab-bar"
        direction="row"
        justifyContent="space-around"
        spacing={1}
        sx={{
          display: { xs: 'flex', sm: 'none' },
          zIndex: '999',
          bottom: 0,
          position: 'fixed',
          width: '100dvw',
          py: 2,
          backgroundColor: 'background.body',
          borderTop: '1px solid',
          borderColor: 'divider',
        }}
      >
        <Button
          variant="plain"
          color="neutral"
          aria-pressed="true"
          component="a"
          size="sm"
          startDecorator={<EmailRoundedIcon />}
          sx={{ flexDirection: 'column', '--Button-gap': 0 }}
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
          sx={{ flexDirection: 'column', '--Button-gap': 0 }}
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
          sx={{ flexDirection: 'column', '--Button-gap': 0 }}
        >
          Files
        </Button>
      </Stack>
      <Layout.Root
        sx={{
          ...(drawerOpen && {
            height: '100vh',
            overflow: 'hidden',
          }),
        }}
      >
        <Layout.Header>
          <Header />
        </Layout.Header>
        <Layout.SideNav>
          <Navigation />
        </Layout.SideNav>
        <Layout.SidePane>
          <Box
            sx={{
              p: 2,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <Box sx={{ alignItems: 'center', gap: 1 }}>
              <Typography level="title-lg" textColor="text.secondary" component="h1">
                My inbox
              </Typography>
              <Typography level="title-sm" textColor="text.tertiary">
                {messagesInfo?.length} emails
              </Typography>
            </Box>
            <Button
              size="sm"
              startDecorator={<CreateRoundedIcon />}
              onClick={() => setOpen(true)}
              sx={{ ml: 'auto' }}
            >
              Create email
            </Button>
            <FocusTrap open={open} disableAutoFocus disableEnforceFocus>
              <WriteEmail open={open} onClose={() => setOpen(false) } setOpen={setOpen} openSnackBar={openSnackBar} setOpenSnackBar={setOpenSnackBar} />
            </FocusTrap>
          </Box>
          <Snackbar
                  color="success"
                  open={openSnackBar[1]}
                  onClose={() => handleSnackbarClose(1)}
                  anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                  startDecorator={<CheckCircleRoundedIcon />}
                  sx={{zIndex: 10}}
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
                  Your message has been sent.
                </Snackbar>
          <Mails messagesInfo={messagesInfo} setSelectedMessage={setSelectedMessage} />
        </Layout.SidePane>
        <Layout.Main>
          <EmailContent selectedMessage={selectedMessage} />
        </Layout.Main>
      </Layout.Root>
    </CssVarsProvider>
  );
}

export {App}