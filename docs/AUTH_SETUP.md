# Social login & password reset — setup guide

The backend ships with social login (Google, GitHub, Apple) and email-based password reset, but
both need credentials that aren't (and shouldn't be) committed to the repo. Without them the app
still runs fine — the social buttons simply redirect to a provider that rejects the request, and
password-reset emails fail to send (the request endpoint still responds normally).

Set the variables below as environment variables, or fill in the fallback values directly in
`server/src/main/resources/application.properties` (gitignored).

## Environment variables

| Variable | Used for |
| --- | --- |
| `GOOGLE_CLIENT_ID` / `GOOGLE_CLIENT_SECRET` | "Continue with Google" |
| `GITHUB_CLIENT_ID` / `GITHUB_CLIENT_SECRET` | "Continue with GitHub" |
| `APPLE_CLIENT_ID` / `APPLE_CLIENT_SECRET` | "Continue with Apple" |
| `OAUTH2_REDIRECT_URI` | Where the backend sends the browser after a social login (defaults to `http://localhost:5173/oauth/callback`) |
| `MAIL_USERNAME` / `MAIL_PASSWORD` | SMTP login for sending password-reset emails |
| `MAIL_FROM` | "From" address on those emails |
| `FRONTEND_BASE_URL` | Used to build the link inside password-reset emails (defaults to `http://localhost:5173`) |

## Google

1. Go to the [Google Cloud Console](https://console.cloud.google.com/) → **APIs & Services → Credentials**.
2. Configure the OAuth consent screen if you haven't already (External, add your email as a test user while in development).
3. Create an **OAuth client ID** of type **Web application**.
4. Add an authorized redirect URI: `http://localhost:8080/login/oauth2/code/google` (swap the host/port for your deployed backend URL in production).
5. Copy the generated client ID and secret into `GOOGLE_CLIENT_ID` / `GOOGLE_CLIENT_SECRET`.

## GitHub

1. Go to **GitHub → Settings → Developer settings → OAuth Apps → New OAuth App**.
2. Set the **Authorization callback URL** to `http://localhost:8080/login/oauth2/code/github`.
3. After creating the app, generate a client secret.
4. Copy the client ID and secret into `GITHUB_CLIENT_ID` / `GITHUB_CLIENT_SECRET`.

> Note: GitHub only returns an account's email if the user has made one public. If a user signs in
> with no public email, the backend redirects back to the frontend with an error explaining that —
> there's no extra API call to fetch private emails.

## Apple — more involved than the others

Apple "Sign in with Apple" requires:

1. An active **Apple Developer Program** membership (paid).
2. Registering an **App ID** with the "Sign in with Apple" capability, then a **Services ID** (this is what becomes `APPLE_CLIENT_ID`) with `http://localhost:8080/login/oauth2/code/apple` registered as a return URL.
3. Generating a **private key** for "Sign in with Apple" in the Apple Developer portal.
4. Using that private key to produce a **client secret**, which is *not* a static string — it's a
   short-lived ES256-signed JWT that you generate yourself and that **expires roughly every six
   months**, so it has to be regenerated periodically (there is no way around this; it's how Apple's
   flow works). Apple's [official guide](https://developer.apple.com/documentation/sign_in_with_apple/generate_and_validate_tokens)
   walks through generating it.
5. Put the freshly generated JWT in `APPLE_CLIENT_SECRET`.

The "Continue with Apple" button and backend wiring are in place and identical to Google/GitHub —
this provider just won't authenticate anything until you've done the above and keep the secret
refreshed.

## Mail (password-reset emails)

Any SMTP provider works (the defaults in `application.properties` assume Gmail). For Gmail:

1. Enable 2-Step Verification on the sending account.
2. Create an [app password](https://myaccount.google.com/apppasswords).
3. Set `MAIL_USERNAME` to the Gmail address and `MAIL_PASSWORD` to the generated app password.
4. Set `MAIL_FROM` to the address you want recipients to see.

## Verifying it's wired up

- Backend boots fine with all of the above left blank — Spring just won't register a working
  provider for empty client-id/secret pairs, and `JavaMailSender` will throw (caught and logged,
  not crashing the request) when it tries to actually send.
- Click a social button: you should land on the provider's consent screen. After approving, you're
  redirected back to `/oauth/callback`, signed in, and sent to the homepage.
- Request a password reset for a real account: check the backend logs / your inbox for the email,
  follow the link to `/reset?token=...`, set a new password, and log in with it.
