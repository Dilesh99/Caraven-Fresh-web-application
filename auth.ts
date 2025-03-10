import NextAuth from "next-auth"
import Google from "next-auth/providers/google"
 
//Exporting Auth elements
export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [Google],
})