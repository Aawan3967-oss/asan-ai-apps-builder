import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export default NextAuth({
  providers: [
    GoogleProvider({
      // اگر ورسل میں کی موجود نہیں ہوگی تو یہ خالی سٹرنگ استعمال کرے گا
      clientId: process.env.GOOGLE_CLIENT_ID || "", 
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET, // یہ کی لازمی ہونی چاہیے
  debug: true, // اس سے لاگز میں زیادہ تفصیل نظر آئے گی
});
