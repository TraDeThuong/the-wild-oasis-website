import NextAuth from "next-auth"
import Google from "next-auth/providers/google"
import { createGuest, getGuest } from "./data-service"

const authConfig = {
    providers : [
        Google ({
            clientId: process.env.AUTH_GOOGLE_ID,
            clientSecret: process.env.AUTH_GOOGLE_SECRET
        })
    ],
    callbacks: {
        authorized ({auth, request}) {
            return !!auth?.user || !request.nextUrl.pathname.startsWith("/account");
        }, 
        async signIn ({user, account, profile}) {
            try {
                if (!user.email) return false;
                const existingGuest = await getGuest(user.email)
                if (!existingGuest) await createGuest ({
                    email: user.email,
                    fullName: user.name
                })
                return true
            } catch (err){
                console.error("signIn callback error:", err);
                return false
            }
        },
        async session ({session, user}) {
            const guest = await getGuest (session.user.email)
            session.user.guestID = guest.id
            return session
        }
    },
    pages: {
        signIn: "/login"
    }
}

export const {
    auth, 
    signIn,
    signOut,
    handlers: {GET, POST},
} = NextAuth(authConfig)