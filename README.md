# TravelTrucks

A camper rental web application built with Next.js and TypeScript.

## Features

- **Home page** — hero banner with a call-to-action button
- **Catalog page** — browse campers with filters and infinite scroll (Load More)
- **Camper details page** — full info, Swiper image gallery with thumbs, user reviews, and a booking form
- Filtering by location, body type, engine, and transmission
- Booking form with backend submission and success notification
- Fallback image on load error
- Loader during async requests

## Tech Stack

- [Next.js 15](https://nextjs.org/) (App Router)
- [TypeScript](https://www.typescriptlang.org/)
- [TanStack Query](https://tanstack.com/query) — `useInfiniteQuery` for paginated catalog
- [Swiper](https://swiperjs.com/) — thumbs gallery on the details page
- CSS Modules

## Getting Started

### Prerequisites

- Node.js 18+
- npm

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build

```bash
npm run build
npm start
```

## Pages

| Route | Description |
|-------|-------------|
| `/` | Home page with hero banner |
| `/catalog` | Camper catalog with filters and Load More |
| `/catalog/[camperId]` | Camper details (opens in a new tab) |

## Author

Iryna Vysochan
