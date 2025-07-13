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

interface LoginResponse  {
  access_token: string;
  expires_in: string;
  token_type: string;
  refresh_token: string;
  scope: string;
  error?: string
}

// In a real application, you would connect to a database or authentication service
// instead of using hardcoded credentials
export const login = async (username: string, password: string): Promise<LoginResponse> => {
  const url = process.env.NEXT_PUBLIC_API_URL || "http://192.168.50.18:4500";
  const response: Response = await fetch(`${url}/api/login/authentication`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded', // Correct content type for URLSearchParams
    },
    body: new URLSearchParams({
      grant_type: 'password',
      client_id: 'PolydesignAPIWebClient',
      client_secret: 'MIGsAAiEAn5JeMVQQWXRnznNZlR2vcLPRo1HwL9K',
      username,
      password,
    }).toString(),
  });

  // Parse the response body to JSON
  const data = await response.json();

  // Otherwise, return the successful login data
  return data as LoginResponse;
};


export async function logout() {
  const cookieStore = cookies();
  cookieStore.delete("access_token");
  cookieStore.delete("refresh_token");
  cookieStore.delete("user_info");
  cookieStore.delete("auth");

  redirect("/register");
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
