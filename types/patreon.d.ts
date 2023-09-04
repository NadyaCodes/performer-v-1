declare module 'patreon' {
  interface PatreonOAuthClient {
    getTokens(
      code: string | string[],
      redirectUri: string
    ): Promise<{
      access_token: string;
      refresh_token: string;
      [key: string]: string
    }>;
  }

  const oauth: (
    clientId: string,
    clientSecret: string
  ) => PatreonOAuthClient;
  export { oauth };
}
