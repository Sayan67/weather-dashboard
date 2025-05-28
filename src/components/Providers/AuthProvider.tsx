"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { type User, type Session, createClient } from "@supabase/supabase-js";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../utils/supabaseClient";

type AuthContextType = {
  user: User | null;
  session: Session | null;
  isLoading: boolean;
  signInWithEmailPassword: (
    email: string,
    password: string
  ) => Promise<{ error: Error | null }>;
  registerWithEmailPassword: (
    email: string,
    password: string,
    name: string
  ) => Promise<{ error: Error | null }>;
  signOut: () => Promise<void>;
  authPageState: AuthPageState;
  setAuthPageState: (state: AuthPageState) => void;
};

type AuthPageState = "login" | "signup";

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [authPageState, setAuthPageState] = useState<AuthPageState>("login");

  const router = useNavigate();

  useEffect(() => {
    const getSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      setSession(session);
      setUser(session?.user ?? null);
      setIsLoading(false);
    };

    getSession();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setUser(session?.user ?? null);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [router, supabase]);

  const signInWithEmailPassword = async (email: string, password: string) => {
    try {
      const { error, data } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        toast.error(error.message);
        return { error: error as Error };
      }

      toast.success("Logged in successfully");
      router("/");
      return { error: null };
    } catch (error) {
      console.error("Error logging in:", error);
      return { error: error as Error };
    }
  };

  const registerWithEmailPassword = async (
    email: string,
    password: string,
    name: string
  ) => {
    try {
      // Sign up the user
      const { error, data } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            name: name,
          },
        },
      });

      if (error) {
        toast.error(error.message);
        return { error: error as Error };
      }

      // If successful registration and user ID is available, create a profile
      if (data.user?.id) {
        // const res = await fetch("https://avatarapi.com/v2/api.aspx", {
        //   method: "POST",
        //   headers: {
        //     "Content-Type": "application/json",
        //     "Access-Control-Allow-Origin": "*",
        //     "Access-Control-Allow-Methods": "POST, GET, OPTIONS",
        //   },
        //   body: JSON.stringify({
        //     username: "Sayan67",
        //     password: "12345678",
        //     email: email,
        //   }),
        // });
        let avatar_url = "https://i.pravatar.cc/150?u=" + data.user.id;
        // if (res.ok) {
        //   const avatarData = await res.json();
        //   avatar_url = avatarData.Image;
        // }
        const { error: profileError } = await supabase.from("users").insert({
          id: data.user.id,
          name: name,
          email: email,
          avatar_url: avatar_url,
        });
        console.log("Signup response:", data);

        if (profileError) {
          console.error("Error creating user profile:", profileError);
        }
      }

      toast.success("Account created successfully");
      router("/");
      return { error: null };
    } catch (error) {
      console.error("Error registering:", error);
      return { error: error as Error };
    }
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    router("/auth");
  };

  if (isLoading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          background: "rgba(0,0,0,0.1)",
        }}
      >
        <div>Loading authentication...</div>
      </div>
    );
  }

  return (
    <AuthContext.Provider
      value={{
        authPageState,
        setAuthPageState,
        user,
        session,
        isLoading,
        signInWithEmailPassword,
        registerWithEmailPassword,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
