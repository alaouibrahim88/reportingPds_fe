import { cookies } from "next/headers";
import { NextResponse } from "next/server";

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

export async function POST() {

  await new Promise((resolve) => setTimeout(resolve, 500));
  const user = MOCK_USERS[1];

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

  return NextResponse.json({
    success: true,
    access_token: mockToken,
    refresh_token: mockRefreshToken,
    user: { username: user.username, name: user.name, role: user.role },
  });
}
