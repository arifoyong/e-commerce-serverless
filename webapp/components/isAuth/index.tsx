"use client";
import React, { useEffect, useLayoutEffect } from "react";
import { useAuth } from '@/context/useAuth'
import { redirect } from "next/navigation";

export default function isAuth(Component: any) {
  return function IsAuth(props: any) {
    const { isSignedIn } = useAuth()
  
    
    useLayoutEffect(() => {
      if (!isSignedIn) {
        return redirect("/");
      }
    }, [isSignedIn]);

    if (!isSignedIn) {
      return null;
    }

    return <Component {...props} />;
  };
}