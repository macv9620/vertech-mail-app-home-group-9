import * as React from 'react';
import Box from '@mui/joy/Box';
import ModalClose from '@mui/joy/ModalClose';
import Button from '@mui/joy/Button';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Textarea from '@mui/joy/Textarea';
import Sheet from '@mui/joy/Sheet';
import { IconButton, Input, Stack, Typography } from '@mui/joy';
// import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";

import FormatColorTextRoundedIcon from '@mui/icons-material/FormatColorTextRounded';
import AttachFileRoundedIcon from '@mui/icons-material/AttachFileRounded';
import InsertPhotoRoundedIcon from '@mui/icons-material/InsertPhotoRounded';
import FormatListBulletedRoundedIcon from '@mui/icons-material/FormatListBulletedRounded';
// import Snackbar from "@mui/joy/Snackbar";

interface WriteEmailProps {
  open?: boolean;
  onClose?: () => void;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>,
  openSnackBar: boolean[],
  setOpenSnackBar: React.Dispatch<React.SetStateAction<boolean[]>>
}

interface ICreateMessageBody {
  subject: string,
  body: string,
  to_user: string,
  from_user: string,
  category_id: number
}

const WriteEmail = React.forwardRef<HTMLDivElement, WriteEmailProps>(
  function WriteEmail({ open, onClose, setOpen, setOpenSnackBar, openSnackBar }, ref) {

    const [toUser, setToUser] = React.useState<string>('')
    const [subject, setSubject] = React.useState<string>('')
    const [body, setBody] = React.useState<string>('')
    const [isFormReady, setIsFormReady] = React.useState<boolean>(false)


    const handleSnackbarOpen = (index: number) => {
      const updatedOpen = [...openSnackBar];
      updatedOpen[index] = true;
      setOpenSnackBar(updatedOpen);
    };
  
    // const handleSnackbarClose = (index: number) => {
    //   const updatedOpen = [...openSnackBar];
    //   updatedOpen[index] = false;
    //   setOpenSnackBar(updatedOpen);
    // };

    const updateToUserHandler: React.ChangeEventHandler<HTMLInputElement> = (e): void => {
      setToUser(e.currentTarget.value)
    }

    const updateSubject: React.ChangeEventHandler<HTMLInputElement> = (e): void => {
      setSubject(e.currentTarget.value)
    }

    const updateBody: React.ChangeEventHandler<HTMLTextAreaElement> = (e): void => {
      setBody(e.currentTarget.value)
    }

    const sendInfoToAPI: React.MouseEventHandler<HTMLAnchorElement> = ()=> {
      const data: ICreateMessageBody = {
        from_user: 'correofromquemado@gmail.com',
        to_user: toUser,
        subject,
        body,
        category_id: 1        
      }
      console.log(data)
      handleSnackbarOpen(1)
      setOpen(false)
      setBody('')
      setToUser('')
      setSubject('')
    }
    
    React.useEffect(() => {
      if (toUser.trim() !== '' && subject.trim() !== '' && body.trim() !== '') {
        setIsFormReady(true);
      } else {
        setIsFormReady(false);
      }
    }, [toUser, subject, body]);


    return (
      <Sheet
        ref={ref}
        sx={{
          alignItems: 'center',
          px: 1.5,
          py: 1.5,
          ml: 'auto',
          width: { xs: '100dvw', md: 600 },
          flexGrow: 1,
          border: '1px solid',
          borderRadius: '8px 8px 0 0',
          backgroundColor: 'background.level1',
          borderColor: 'neutral.outlinedBorder',
          boxShadow: 'lg',
          zIndex: 1000,
          position: 'fixed',
          bottom: 0,
          right: 24,
          transform: open ? 'translateY(0)' : 'translateY(100%)',
          transition: 'transform 0.3s ease',
        }}
      >
        <Box sx={{ mb: 2 }}>
          <Typography level="title-sm">New message</Typography>
          <ModalClose id="close-icon" onClick={onClose} />
        </Box>
        <Box
          sx={{ display: 'flex', flexDirection: 'column', gap: 2, flexShrink: 0 }}
        >
          <FormControl required>
            <FormLabel>To</FormLabel>
            <Input type='email' placeholder="email@email.com" aria-label="Message" onChange={updateToUserHandler} value={toUser} required/>
          </FormControl>
          <FormControl required>
            <FormLabel>Subject</FormLabel>
            <Input placeholder="Subject" aria-label="Message" onChange={updateSubject} value={subject} />
          </FormControl>
          <FormControl sx={{ display: 'flex', flexDirection: 'column', gap: 2 }} required>
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
                    borderTop: '1px solid',
                    borderColor: 'divider',
                  }}
                >
                  <div>
                    <IconButton disabled size="sm" variant="plain" color="neutral">
                      <FormatColorTextRoundedIcon />
                    </IconButton>
                    <IconButton disabled size="sm" variant="plain" color="neutral">
                      <AttachFileRoundedIcon />
                    </IconButton>
                    <IconButton disabled size="sm" variant="plain" color="neutral">
                      <InsertPhotoRoundedIcon />
                    </IconButton>
                    <IconButton disabled size="sm" variant="plain" color="neutral">
                      <FormatListBulletedRoundedIcon />
                    </IconButton>
                  </div>
                  <Button
                    color="primary"
                    sx={{ borderRadius: 'sm' }}
                    onClick={sendInfoToAPI}
                    disabled={!isFormReady}
                  >
                    Send
                  </Button>
                </Stack>
              }
              sx={{
                '& textarea:first-of-type': {
                  minHeight: 72,
                },
              }}
            />
          </FormControl>
        </Box>
        {/* <Snackbar
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
                </Snackbar> */}
      </Sheet>
    );
  },
);

export default WriteEmail;