import NextAuth, { NextAuthConfig } from "next-auth";
import Spotify from "next-auth/providers/spotify";

const scopes = [
  "user-modify-playback-state",
  "playlist-read-private",
  "user-follow-read",
  "user-library-read",
  "user-top-read",
  "user-read-email",
  "user-read-private",
  "user-read-recently-played",
  "user-read-currently-playing",
  "user-read-playback-state",
];

export const authConfig: NextAuthConfig = {
  providers: [
    Spotify({
      authorization: `https://accounts.spotify.com/authorize?scope=${scopes.join(
        ","
      )}`,
    }),
  ],

  callbacks: {
    async jwt({ token, account }) {
      if (account) {
        token.accessToken = account.access_token;
        // token.refreshToken = account.refresh_token;
        token.expiresAt = Date.now() + (account.expires_in || 3600) * 1000;
      }
      return token;
    },

    async session({ session, token }) {
      if (token?.accessToken) {
        session.accessToken = token.accessToken;
        session.expires = new Date(token.expiresAt).toISOString() as Date &
          string;
      }
      return session;
    },
  },
};

export const { handlers, signIn, signOut, auth } = NextAuth(authConfig);
