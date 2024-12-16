import NextAuth from "next-auth";
import Spotify from "next-auth/providers/spotify";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Spotify({
      authorization:
        "https://accounts.spotify.com/authorize?scope=user-read-email,playlist-read-private,playlist-modify-private,playlist-modify-public,user-library-read,user-top-read",
    }),
  ],
  callbacks: {
    authorized({ request, auth }) {
      console.log("authorized auth", request, auth);
      return false;
    },
    async jwt({ token, account }) {
      if (account) {
        token.accessToken = account.access_token;
        token.refreshToken = account.refresh_token;
        token.expiresAt = Date.now() + (account.expires_in || 6) * 1000;
      }

      return token;
    },

    async session({ session, token }) {
      // Pass access_token to session
      session.user.accessToken = token.accessToken as string;

      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      session.expires = new Date(token.expiresAt as number);
      return session;
    },
  },
});
