# Volume 2 – Frontend Development

## 1. Next.js App Router Architecture
We adopt a structured, highly scalable directory structure following standard patterns:
```text
app/
  (public)/
    page.tsx (Homepage)
    personalities/
      page.tsx (Personality Directory)
      [slug]/page.tsx (Profile Details)
    businesses/
      page.tsx
      [slug]/page.tsx
    tourism/
      page.tsx
      [slug]/page.tsx
    history/
      page.tsx
    media/
      page.tsx
  admin/
    dashboard/page.tsx
    cms/page.tsx
components/
  ui/ (shadcn components)
  common/ (Navbar, Footer, SearchModal, CommandPalette)
  home/ (Hero, Stats, Showcase)
  features/ (PersonalityCard, BusinessCard, Timeline, MediaGallery)
hooks/
  useAnime.ts
  useSearch.ts
lib/
  db/ (Mongoose connection)
  utils.ts
```

## 2. Every Page & Routing
*   **Homepage (`/`)**: Staggered cards showcasing featured entries, quick navigation hub, animated hero section, interactive stats counter.
*   **Personalities Directory (`/personalities`)**: Filters for region, field (Science, Arts, Sports), and search input. Server-side rendering (ISR) updated on demand.
*   **Businesses Directory (`/businesses`)**: Map integration, category filters, and contact forms.
*   **Tourism Guides (`/tourism`)**: Dynamic travel itineraries and interactive map checkpoints.
*   **Historical Timeline (`/history`)**: Visual chronological roadmap of Pakistan's historical events.

## 3. Global State & Context Management
*   **Search Context**: Manages search modal visibility and global fuzzy search indices.
*   **Theme Context**: Supports standard system preferred styles (defaulting to a customized dark emerald theme).

## 4. Components & Interactive Features
*   **Search Modal**: Command palette (`lucide-react` icons, keyboard triggers).
*   **Timeline Scroll Tracker**: Highlights active historic era as the user scrolls.
*   **Interactive Galleries**: Lightbox gallery built using Tailwind + React states, optimized via Next.js `next/image`.
*   **Anime.js Helper Hook (`useAnime.ts`)**:
    ```typescript
    import { useEffect, useRef } from 'react';
    import anime from 'animejs';

    export const useAnime = (config: anime.AnimeParams) => {
      const elementRef = useRef<HTMLDivElement>(null);
      useEffect(() => {
        if (elementRef.current) {
          anime({
            targets: elementRef.current,
            ...config,
          });
        }
      }, [config]);
      return elementRef;
    };
    ```
