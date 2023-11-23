export interface IUser {
  email: string,
  username: string,
  userId: string,
  accessToken: string
}

export type UserContextType = {
  user: IUser,
  isSignedIn: boolean
  signIn: ({email: string, password: string}) => void;
  signOut: () => void
}