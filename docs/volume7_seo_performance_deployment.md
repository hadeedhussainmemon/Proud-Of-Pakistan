# Volume 7 – SEO, Performance & Deployment

## 1. Technical SEO Configuration
*   **Metadata API**: Every page utilizes Next.js dynamic metadata configuration via `generateMetadata()` to configure canonical links, descriptions, and dynamic title names.
*   **Structured Data (JSON-LD)**: Inject standard JSON-LD schemas representing Organizations, Articles, and People profiles to ensure beautiful Google Search snippets.
    ```html
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaMarkup) }}
    />
    ```
*   **Sitemap & Robots**: Static/dynamic sitemaps located at `/sitemap.xml` and `/robots.txt` generated using Next.js route configurations.

## 2. Lighthouse & Performance Optimizations
*   **Next.js Image (`next/image`)**: Cloudinary images dynamically resized using next-image-loader to serve modern WebP formats in exact layout dimensions.
*   **Font Optimization**: `next/font/google` integrates fonts directly without layout shifts or external domain lookups.
*   **Bundle Splitting**: Heavy components like complex maps or interactive timeline charts are wrapped using `next/dynamic` with `{ ssr: false }`.

## 3. Vercel Deployment & Pipeline
*   **Deployment platform**: Vercel.
*   **Caching Strategy**: Automatic stale-while-revalidate strategy caching dynamic layouts.
*   **Pre-flight Checklist**: Unit tests run during continuous integration. Cloudinary, MongoDB, and NextAuth credentials checked and verified in build logs.
