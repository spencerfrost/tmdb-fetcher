# TMDB Movie/TV Show Fetcher

This React application allows users to fetch and display popular movies and TV shows from The Movie Database (TMDB) API. Users can toggle between movies and TV shows, filter by year, and view details for each item.

## Features

- Fetch popular movies and TV shows from TMDB
- Toggle between movies and TV shows
- Filter results by year
- Display movie/show posters, titles, release dates, and ratings
- Responsive design for various screen sizes

## Technologies Used

- React
- TypeScript
- Tailwind CSS
- shadcn/ui components
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

3. Create a `.env` file in the root directory and add your TMDB API key:
   ```
   REACT_APP_API_KEY=your_tmdb_api_key_here
   REACT_APP_BASE_URL=https://api.themoviedb.org/3
   REACT_APP_POSTER_BASE_URL=https://image.tmdb.org/t/p/w500
   ```

4. Start the development server:
   ```
   npm start
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser to view the app.

## Usage

- Use the toggle button to switch between Movies and TV Shows.
- Enter a year in the input field to filter results by year.
- Check the "Fetch by Year" checkbox to apply the year filter.
- Click on a movie or TV show card to view more details on TMDB website.

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