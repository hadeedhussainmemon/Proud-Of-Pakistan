# Volume 3 – Backend Development

## 1. Authentication & Role-Based Authorization
We use **NextAuth.js (Auth.js)** for complete session handling.
*   **Providers**:
    *   Google OAuth
    *   GitHub OAuth
    *   Credentials Provider (Email & Password with bcrypt hashing)
*   **Roles**:
    *   `Admin`: Full system access, config edits, and CMS controls.
    *   `Editor`: Edit and moderate articles, listings, and comments.
    *   `Contributor`: Submit new personalities and business requests.
    *   `User`: Standard account for bookmarking and commenting.
*   **Next.js Middleware Authorization**:
    ```typescript
    import { withAuth } from "next-auth/next";

    export default withAuth({
      callbacks: {
        authorized: ({ req, token }) => {
          if (req.nextUrl.pathname.startsWith("/admin") && token?.role !== "Admin") {
            return false;
          }
          return !!token;
        },
      },
    });
    ```

## 2. API Routes & Server Actions
*   **API Routes (`/app/api/`)**:
    *   `/api/search` – Full-text fuzzy search endpoint connecting to MongoDB Atlas Search.
    *   `/api/analytics` – Lightweight event logging for dashboard metric processing.
*   **Server Actions**:
    *   Used for forms: submit profile comments, report business updates, or upload user-submitted photos.

## 3. Storage Integration (Cloudinary)
*   All images (heritage sites, personality avatars) and video reels are stored in **Cloudinary**.
*   Direct upload signature generator built in backend to keep API keys secure.

## 4. Search, Caching & Security
*   **Caching**: Next.js Route Caching is utilized. ISR tags are revalidated via Webhook actions on Mongoose DB mutations.
*   **Rate Limiting**: Upstash Redis or simple sliding window rate limiting headers via middleware to prevent scraping.
*   **Headers**: Secure headers (CSP, HSTS, X-Frame-Options) integrated inside Next.js configuration.
