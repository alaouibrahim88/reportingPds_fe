"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

interface LoginCredentials {
  username: string;
  password: string;
}

interface AuthResponse {
  access_token: string;
  token_type: string;
  expires_in: number;
  refresh_token?: string;
}

// Mock user data for testing
const MOCK_USERS = [
  {
    username: "admin",
    password: "admin123",
    name: "Admin User",
    role: "admin",
  },
  {
    username: "Polydesign",
    password: "Polydesign123*123",
    name: "Regular User",
    role: "user",
  },
];

export async function login({ username, password }: LoginCredentials) {
  try {
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 500));

    // Mock authentication logic
    const user = MOCK_USERS.find(
      (u) => u.username === username && u.password === password
    );

    if (!user) {
      throw new Error("Invalid username or password");
    }

    // Create a mock token with user info
    const mockToken = btoa(
      JSON.stringify({
        sub: user.username,
        name: user.name,
        role: user.role,
        exp: Math.floor(Date.now() / 1000) + 3600, // 1 hour from now
      })
    );

    const mockRefreshToken = btoa(
      JSON.stringify({
        sub: user.username,
        exp: Math.floor(Date.now() / 1000) + 30 * 24 * 60 * 60, // 30 days
      })
    );

    // Mock response data
    const data: AuthResponse = {
      access_token: mockToken,
      token_type: "Bearer",
      expires_in: 3600, // 1 hour
      refresh_token: mockRefreshToken,
    };

    // Set the auth token in cookies
    const cookieStore = cookies();
    cookieStore.set("access_token", data.access_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: data.expires_in,
      path: "/",
    });

    if (data.refresh_token) {
      cookieStore.set("refresh_token", data.refresh_token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        // Typically refresh tokens last longer than access tokens
        maxAge: 30 * 24 * 60 * 60, // 30 days
        path: "/",
      });
    }

    // Also store user info in a non-httpOnly cookie for client access
    cookieStore.set(
      "user_info",
      JSON.stringify({
        username: user.username,
        name: user.name,
        role: user.role,
      }),
      {
        httpOnly: false,
        secure: process.env.NODE_ENV === "production",
        maxAge: data.expires_in,
        path: "/",
      }
    );

    return {
      success: true,
      user: { username: user.username, name: user.name, role: user.role },
    };
  } catch (error) {
    console.error("Login error:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Authentication failed",
    };
  }
}

export async function logout() {
  const cookieStore = cookies();
  cookieStore.delete("access_token");
  cookieStore.delete("refresh_token");
  cookieStore.delete("user_info");
  cookieStore.delete("auth");

  redirect("/login");
}

export async function getSession() {
  const cookieStore = cookies();
  const token = cookieStore.get("access_token");

  if (!token) {
    return null;
  }

  try {
    // Decode the mock token to get user info
    const tokenData = JSON.parse(atob(token.value));

    // Check if token is expired
    if (tokenData.exp < Math.floor(Date.now() / 1000)) {
      return null;
    }

    return {
      isLoggedIn: true,
      user: {
        username: tokenData.sub,
        name: tokenData.name,
        role: tokenData.role,
      },
    };
  } catch (error) {
    console.error("Error parsing token:", error);
    return null;
  }
}
