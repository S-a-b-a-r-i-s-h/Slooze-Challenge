// app/api/login/route.ts
import { NextResponse } from "next/server";

const dummyUsers = [
  { email: "manager@test.com", password: "123456", role: "manager" },
  { email: "store@test.com", password: "123456", role: "store-keeper" },
];

export async function POST(request: Request) {
  const body = await request.json();
  const { email, password } = body;

  const user = dummyUsers.find(
    (u) => u.email === email && u.password === password
  );

  if (!user) {
    return NextResponse.json({ message: "Invalid credentials" }, { status: 401 });
  }

  return NextResponse.json({
    token: "mock-token-123456",
    user: {
      email: user.email,
      role: user.role,
    },
  });
}
