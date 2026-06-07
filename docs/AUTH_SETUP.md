# Password reset — setup guide

The backend ships with email-based password reset, but it needs SMTP credentials that aren't (and
shouldn't be) committed to the repo. Without them the app still runs fine — the request endpoint
still responds normally, the email just fails to send (caught and logged, not crashing the request).

Set the variables below as environment variables, or fill in the fallback values directly in
`server/src/main/resources/application.properties` (gitignored).

## Environment variables

| Variable | Used for |
| --- | --- |
| `MAIL_USERNAME` / `MAIL_PASSWORD` | SMTP login for sending password-reset emails |
| `MAIL_FROM` | "From" address on those emails |
| `FRONTEND_BASE_URL` | Used to build the link inside password-reset emails (defaults to `http://localhost:5173`) |

## Mail (password-reset emails)

Any SMTP provider works (the defaults in `application.properties` assume Gmail). For Gmail:

1. Enable 2-Step Verification on the sending account.
2. Create an [app password](https://myaccount.google.com/apppasswords).
3. Set `MAIL_USERNAME` to the Gmail address and `MAIL_PASSWORD` to the generated app password.
4. Set `MAIL_FROM` to the address you want recipients to see.

## Verifying it's wired up

Request a password reset for a real account: check the backend logs / your inbox for the email,
follow the link to `/reset?token=...`, set a new password, and log in with it.
