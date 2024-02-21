/// <reference types="vite/client" />

interface IMessageInfo {
    from_user_name: string,
    from_user: string,
    to_user: string,
    avatar: string,
    created_at: string,
    subject: string,
    body: string,
    color: string
}

interface IPostUserData {
  name: string,
  email: string,
  password: string
}

interface ISnackbarOpen{
  success: boolean,
  message: string,
  open: boolean
}