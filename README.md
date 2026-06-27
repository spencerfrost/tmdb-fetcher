# TMDB Movie/TV Show Discovery App

A React app for discovering and browsing movies and TV shows using [The Movie Database (TMDB)](https://www.themoviedb.org/) API. Search or filter a poster grid, then drill into full detail pages for movies, TV shows, individual episodes, and cast/crew.

## Features

**Discover grid**
- Toggle between Movies and TV Shows
- Search by title, or filter by year and minimum rating
- Responsive poster grid with loading skeletons and empty/error states

**Movie details**
- Backdrop hero with poster, score, status, runtime, and release date
- Budget and revenue
- Top cast and director, with links to person pages

**TV show details**
- Same hero treatment, plus season and episode counts
- Per-season episode list with air dates, runtimes, and overviews
- Episode rating heatmap across all seasons, with clickable cells that jump straight to an episode
- Season picker for browsing episode lists in place

**Episode details**
- Full-width still image, overview, runtime, and air date
- Detailed crew list and guest stars
- Image gallery with a keyboard-navigable lightbox (arrow keys, escape, click-to-close)

**Person details**
- Biography, place of birth, and profile photo
- "Known for" credits, sorted newest first, linking back into movie/TV detail pages

**Cross-cutting**
- Each card and detail page links out to the title's TMDB page and to a self-hosted Seerr/Overseerr instance for requesting media
- Consistent dark UI with a shared rating-score component used across cards, hero sections, and the heatmap

## Technologies Used

- React
- TypeScript
- React Router
- Tailwind CSS
- shadcn/ui components
- lucide-react (icons)
- TMDB API

## Getting Started

### Prerequisites

- Node.js (v14 or later)
- npm

### Installation

1. Clone the repository:
   ```
   git clone https://github.com/your-username/tmdb-movie-tv-fetcher.git
   cd tmdb-movie-tv-fetcher
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Copy the example file and add your TMDB credentials:
   ```bash
   cp .env.example .env
   ```

4. Open `.env` and set your TMDB API key:
   ```text
   REACT_APP_API_KEY=your_tmdb_api_key_here
   REACT_APP_BASE_URL=https://api.themoviedb.org/3
   REACT_APP_POSTER_BASE_URL=https://image.tmdb.org/t/p/w500
   ```

5. Start the development server:
   ```
   npm start
   ```

6. Open [http://localhost:3000](http://localhost:3000) in your browser to view the app.

## Usage

- Use the toggle to switch between Movies and TV Shows on the discover page.
- Search by title, or check "Filter by Year" and/or adjust the minimum rating slider. Rating filtering is disabled while a search query is active.
- Click any poster to open its detail page in-app.
- On a TV show's page, pick a season from the sidebar to browse its episodes, or open the rating heatmap to see every season's episode scores at once and jump directly to one.
- Click a cast member, crew credit, or director to view their person page and filmography.
- Use the TMDB and Seerr icons on a card or detail page to open that title externally.

## Project Structure

Key pieces, for orientation:

- `DiscoverPage` / `DiscoverControls` — search, filters, and the poster grid
- `MediaCard` — poster card used in the discover grid
- `MovieDetails` / `TvDetailView` — top-level detail pages for each media type
- `EpisodeDetailView` — single episode page, including the image gallery
- `PersonDetailView` — cast/crew member page and filmography
- `CastAndCrew` — shared cast rail used on movie and TV detail pages
- `EpisodeHeatmap` — per-season episode rating grid on TV show pages
- `ImageGallery` / `Lightbox` — episode still thumbnails and full-screen viewer
- `DetailContainer` — shared page chrome (back navigation) wrapping all detail views
- `utils/api.ts` — TMDB API calls and response-to-app-type mapping
- `utils/types.ts` — shared types for media summaries, details, and TMDB response shapes

## Deployment

This project is set up with CircleCI for continuous integration and deployment. The `config.yml` file in the `.circleci` directory defines the build and deploy jobs.

To deploy:

1. Ensure your CircleCI project is connected to your GitHub repository.
2. Set up the necessary environment variables in CircleCI (e.g., `SERVER_USER`, `SERVER_IP`, `SERVER_DIR`).
3. Push changes to the `master` branch to trigger the build and deploy workflow.

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is open source and available under the [MIT License](LICENSE).

## Acknowledgments

- [The Movie Database (TMDB)](https://www.themoviedb.org/) for providing the API
- [shadcn/ui](https://ui.shadcn.com/) for the UI components
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS framework
- [lucide-react](https://lucide.dev/) for icons