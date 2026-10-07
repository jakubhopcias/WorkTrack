"use client"

import { createContext, useContext, useEffect, useState } from "react"
import { supabase } from "@/lib/supabase"

const UserContext = createContext({ user: null, ready: false })

export function UserProvider({ children }) {
  const [user, setUser] = useState(null)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user || null)
      setReady(true)
    })

    return () => listener.subscription.unsubscribe()
  }, [])

  return <UserContext.Provider value={{ user, ready }}>{children}</UserContext.Provider>
}

export const useUser = () => useContext(UserContext).user
export const useAuthReady = () => useContext(UserContext).ready
