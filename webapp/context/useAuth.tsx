"use client"

import React, { useState, useEffect, createContext, useContext } from 'react'
import { IUser, UserContextType } from '../types/auth'
import { Amplify, Auth } from 'aws-amplify'
import config from '@/lib/aws-config'

// Configure Amplify
Amplify.configure({
  Auth: {
    mandatorySignIn: true,
    region: config.cognito.REGION,
    userPoolId: config.cognito.USER_POOL_ID,
    identityPoolId: config.cognito.IDENTITY_POOL_ID,
    userPoolWebClientId: config.cognito.APP_CLIENT_ID, 
  }, 
  Storage: {
    region: config.s3.REGION,
    bucket: config.s3.BUCKET,
    identityPoolId: config.cognito.IDENTITY_POOL_ID
  },
  API: {
    endpoints: [
      {
        name: "product",
        endpoint: config.apiGateway.URL,
        region: config.apiGateway.REGION
      }
    ]
  },
  ssr: true
})

// React hook for Auth
const AuthContext = createContext<UserContextType>({} as UserContextType)
                           
export const ProvideAuth = ({ children } : { children: React.ReactNode}) => {
  const auth: UserContextType = useProvideAuth()
  return (
    <AuthContext.Provider value={auth}>
      {children}
    </AuthContext.Provider>
  )
}
export const useAuth = () => useContext(AuthContext)

const emptyUser: IUser = {  email: '', username: '', userId: '', accessToken: '' }
const useProvideAuth = () => {
  const [user, setUser] = useState<IUser>(emptyUser)
  const [isSignedIn, setIsSignedIn] = useState(true)

  useEffect(() => {
    if (user.username === '') {
      Auth.currentSession().then((session: any) => {
        // const { idToken, accessToken } = session
        const idToken = session.getIdToken()
        const accessToken = session.getAccessToken()
        const jwtToken = accessToken.getJwtToken()

        const user = { email: idToken.payload.email,
                      username: idToken.payload.name,
                      userId: idToken.payload.sub,
                      accessToken: jwtToken
                    }

        setIsSignedIn(true)
        setUser(user)
      }).catch((err: string) => {
        setIsSignedIn(false)
        if (err !== "No current user") {
          alert(err)
        }
      })
    } 
  },[user])

  const signIn = ({ email, password} : {email: string, password: string}) => Auth.signIn(email, password)
              .then((cognitoUser: any) => {
                const { attributes, signInUserSession: { accessToken }} = cognitoUser
              
                const user = {
                  email: attributes.email,
                  username: attributes.name,
                  userId: attributes.sub,
                  accessToken: accessToken.jwtToken,
                };
          
                setIsSignedIn(true);
                setUser(user);
          
                return user;
              })
  
  const signOut = () => Auth.signOut()
                            .then(() => {
                              setIsSignedIn(false)
                              setUser(emptyUser)
                            })
  
  return {
    user,
    isSignedIn,
    signIn,
    signOut
  }
}