# Specification

## Summary
**Goal:** Add Internet Identity authentication to the existing legal document maker app.

**Planned changes:**
- Add a login button to the Header component for unauthenticated users that launches the Internet Identity flow
- Display the user's profile name and a logout option in the Header when authenticated
- Logging out returns the app to the unauthenticated state
- Update the LoginPrompt component (shown on document selection and history pages) to trigger Internet Identity login
- Show a ProfileSetupModal after first login to collect the user's full name

**User-visible outcome:** Users can log in via Internet Identity (passkeys, Google, Apple, or Microsoft) directly from the header, see their profile when authenticated, and log out to return to the unauthenticated state.
