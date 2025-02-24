// // app/api/auth/verify-email/route.ts
// import { prisma } from "@/lib/database/db";
// import { NextResponse } from "next/server";

// export async function GET(request: Request) {
//   const { searchParams } = new URL(request.url);
//   const token = searchParams.get("token");

//   if (!token) {
//     return NextResponse.json({ error: "Invalid token" }, { status: 400 });
//   }

//   try {
//     // Find user with this verification token
//     const user = await prisma.user.findFirst({
//       where: { verificationToken: token },
//     });

//     if (!user) {
//       return NextResponse.json(
//         { error: "Invalid or expired token" },
//         { status: 400 }
//       );
//     }

//     // Update user as verified
//     await prisma.user.update({
//       where: { id: user.id },
//       data: {
//         emailVerified: new Date(),
//         verificationToken: null,
//       },
//     });

//     return NextResponse.redirect(new URL("/login", request.url));
//   } catch (error) {
//     console.error("Email verification error:", error);
//     return NextResponse.json({ error: "Verification failed" }, { status: 500 });
//   }
// }
