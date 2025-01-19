import { OAuth2Client } from "google-auth-library";

const oauth2Client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

export { oauth2Client };
