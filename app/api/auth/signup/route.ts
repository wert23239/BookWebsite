import { prisma } from "@/lib/database/db";
import { hash } from "bcrypt";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    // Ensure request body is properly parsed
    const bodyText = await req.text();
    console.log("Raw Request Body:", bodyText);
    // // app/api/auth/signup/route.ts - modified part
    // // Generate verification token
    // const verificationToken = crypto.randomBytes(32).toString("hex");

    // // Create user with verification token
    // const newUser = await prisma.user.create({
    //   data: {
    //     email,
    //     password: hashedPassword,
    //     name,
    //     verificationToken,
    //   },
    // });

    // // TODO: Send verification email with link to /api/auth/verify-email?token=verificationToken
    // // You'll need an email service for this (SendGrid, Amazon SES, etc.)

    // // For now, simulate an email:
    // console.log(
    //   `Verification link: ${process.env.NEXTAUTH_URL}/api/auth/verify-email?token=${verificationToken}`
    // );

    if (!bodyText) {
      console.error("Sign-up failed: Empty request body");
      return NextResponse.json(
        { error: "Invalid request body" },
        { status: 400 }
      );
    }

    const { email, password, name } = JSON.parse(bodyText);
    console.log("Parsed Request Data:", { email, name });

    if (!email || !password || !name) {
      console.error("Sign-up failed: Missing fields");
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      console.error("Sign-up failed: User already exists");
      return NextResponse.json(
        { error: "User already exists" },
        { status: 400 }
      );
    }

    // Hash password
    const hashedPassword = await hash(password, 10);
    console.log("Password hashed successfully");

    // Create user
    const newUser = await prisma.user.create({
      data: { email, password: hashedPassword, name },
    });

    console.log("User created successfully:", newUser);
    return NextResponse.json(
      { message: "User created", user: newUser },
      { status: 201 }
    );
  } catch (error) {
    console.error("Sign-up failed:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
