import NextAuth, { CredentialsSignin } from "next-auth"
import Credentials from "next-auth/providers/credentials"
import { db } from "./lib/db"

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      name: 'Credentials',
      credentials: {
        username: { label: "username", type: "text" },
        password: { label: "Password", type: "password" }
      },
      authorize: async (credentials) => {

        // get username and password from credentials that we got from the signin form
        const username = credentials.username as string | undefined
        const password = credentials.password as string | undefined

        // check if username and password are not empty
        if (!username || !password) {
          throw new CredentialsSignin('Please provide username and password!')
        }

        // check if user exists
        const user = await db.user.findUnique({
          where: {
            username
          },
          select: {
            username: true,
            password: true,
            pegawaiId: true,
            role: true,
            id: true,
          }
        })

        console.log(user?.pegawaiId)

        // if user does not exist throw error
        if (!user) {
          throw new CredentialsSignin('Invalid credentials!')
        }

        // check if password is valid
        if (!user.password) {
          throw new CredentialsSignin('Invalid credentials!')
        }

        // check if password is correct
        const passwordMatched = password === user.password

        // if password is not correct throw error
        if (!passwordMatched) {
          throw new CredentialsSignin('Invalid credentials!')
        }

        // if everything is correct return user
        const userData = {
          username: user.username,
          role: user.role,
          pegawaiId: user.pegawaiId,
          id: user.id,
        }

        return userData

      }
    })
  ],
  pages: {
    signIn: "/login",
},

callbacks: {
    async session({ session, token }) {
        if (token?.sub && token?.role) {
            session.user.id = token.sub
            session.user.pegawaiId = token.pegawaiId
            session.user.role = token.role
            return session
        }
        return session
    },

    async jwt({ token, user }) {
        if (user) {
            token.role = user.role
        }
        return token
    },

    signIn: async ({ user, account }) => {

        if (account?.provider === "credentials") {
            return true
        } else {
            return false
        }

    }
}
})