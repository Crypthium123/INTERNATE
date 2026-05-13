# Security Policy

## Supported Versions

Only the latest deployed version (V3) receives security updates.  
The repository's `main` branch is always synchronized with the production deployment.

| Version | Supported |
|---------|-----------|
| V3 (latest) | ✅ |
| V2 | ❌ (maintained for reference only) |
| V1 | ❌ |

## Reporting a Vulnerability

If you discover a security vulnerability in Internate, please report it privately:

- **Email:** internatesupport@gmail.com
- **Contact form:** https://internate.web.app/contact.html

We will acknowledge receipt within 48 hours and aim to resolve critical issues within 7 days.

## What to include

- A clear description of the vulnerability
- Steps to reproduce (if applicable)
- Any relevant screenshots or logs

## Scope

The following are in scope:
- Firebase Authentication bypass
- Firestore unauthorized data access
- XSS or injection vulnerabilities
- Session hijacking

The following are out of scope:
- API keys exposed in client-side code (Firebase API keys are designed to be public by design — security relies on Firestore rules and App Check)
- Phishing attacks requiring user interaction
- Rate-limiting issues

## Security measures in place

- **Firestore Security Rules** restrict read/write access per collection
- **Firebase Authentication** handles user identity (email/password + Google)
- **Input sanitization** via `escapeHtml()` on all user-generated content
- **No tracking scripts**, analytics, or third-party cookies
- **Service Worker** with cache-first strategy for offline resilience
- **Content Security Policy** respected via Firebase Hosting defaults
