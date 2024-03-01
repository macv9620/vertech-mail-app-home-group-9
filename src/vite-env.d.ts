/// <reference types="vite/client" />

interface IMessageInfo {
    message_id: number,
    from_user_name: string,
    from_user: string,
    to_user: string,
    to_user_name: string,
    avatar?: string,
    created_at: string,
    subject: string,
    body: string,
    color: string,
    category_id: number,
    category_name: string,
    color: string,
    isActive?: boolean
}

interface IPostUserData {
  email: string,
  password: string,
  name?: string
}

interface IAuthenticatedUser {
  email: string,
  name: string
}

interface ISnackbarOpen{
  success: boolean,
  message: string,
  open: boolean
}

interface IPostMessageData {
  subject: string,
  body: string,
  to_user: string,
  from_user: string
  category_id: number
}

interface IUserCategoryInfo {
  category_id: number,
  category_name: string,
  color: string
}

interface IUserPostCategory {
  email: string,
  category_name: string,
  color: string
}

interface IUpdateMessageCategory {
  message_id: number | undefined,
  category_id: number  | null
}