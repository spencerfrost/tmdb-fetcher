# TMDB Fetcher Codebase Guide

## Overview

This repository is a React + TypeScript application for browsing popular movies and TV shows from The Movie Database (TMDB). It features a list-based discovery view and detailed pages for movies, TV series, individual episodes, and people. It uses Tailwind CSS for styling and a set of reusable UI components.

## Routing and Main Entry Points

* `src/index.tsx`
* App entry point; renders `<App/>` inside `React.StrictMode`.

* `src/App.tsx`
* Defines routing using `react-router-dom`.
* Maps routes:
* `/` → `TMDBApp.tsx`
* `/:mediaType/:id` → `DetailPage.tsx`
* `/tv/:seriesId/season/:seasonNumber/episode/:episodeNumber` → `EpisodeDetailView.tsx`.

## Key Modules and Components

### `src/components/TMDBApp.tsx`

* The core discovery interface.
* Manages state for `mediaType`, year filtering, and list rendering.

* Orchestrates the grid display using `MediaCard.tsx`.

### `src/components/DetailPage.tsx`

* A wrapper/controller component for individual media.
* Extracts `mediaType` and `id` from URL parameters.
* Dynamically renders either `MovieDetailView.tsx` or `TvDetailView.tsx`.

* Implements a standardized layout container with a functional "Back" button.

### `src/components/MovieDetailView.tsx` & `src/components/TvDetailView.tsx`

* Render deep-dive information for specific media.
* `TvDetailView.tsx` supports season selection and episode list navigation.

* Both utilize `CastAndCrew.tsx` to display credit information.

### `src/components/EpisodeDetailView.tsx`

* Fetches and displays detailed info for a specific TV episode.

* Uses a consistent dark-theme wrapper and provides "Back" button navigation.

### `src/utils/api.ts`

* Centralized API utilities for TMDB.

* Includes specialized functions:
* `fetchMediaDetails`: Gets movie/TV metadata + credits.

* `fetchSeasonDetails`: Fetches episode lists for a specific season.

* `fetchEpisodeDetails`: Fetches metadata for specific episodes.

* `fetchDiscoverMedia`: Standard discovery fetcher.

### `src/utils/types.ts`

* Comprehensive data models including `MediaDetail`, `MediaSummary`, `TvSeason`, `TvEpisode`, and `EpisodeDetail`.

## Styling and Layout

* **Global Theme**: Dark-themed aesthetic (`bg-gray-900`, `text-white`) applied consistently across all detail and discovery pages.

* **Layout Consistency**: Use the `DetailContainer` (implemented as a pattern in detail views) to ensure standard padding, `max-w-4xl` constraints, and persistent "Back" button placement.

## Development Concepts

### Fetch Flow

* Discovery data is fetched via `discover` endpoints and mapped to `MediaSummary`.

* Detail views use `useParams` to trigger `useEffect` hooks, allowing components to fetch data based on the URL context.

### Navigation

* Uses `useNavigate` from `react-router-dom` to handle history-based "Back" button functionality.

## Notes

* Ensure `REACT_APP_API_KEY` and associated environment variables are configured in your local environment.

* New detail views should be wrapped in the standard `DetailContainer` layout to maintain visual consistency across the app.
