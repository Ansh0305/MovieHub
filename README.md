# MovieHub

A React-based web application to search for movies and explore trending titles using The Movie Database (TMDB) API. Effortlessly discover movies you’ll enjoy with a simple and responsive interface.

## Table of Contents

- [Description](#description)
- [Demo](#demo)
- [Installation](#installation)
- [Usage](#usage)
- [Features](#features)
- [Technologies](#technologies)
- [Project Structure](#project-structure)
- [Contributing](#contributing)

## Description

MovieHub was built to provide a hassle-free movie discovery experience. The app uses the TMDB API to fetch popular and searched movies, showing movie posters, rankings, and handling loading and error states seamlessly. It also incorporates debounced search input and backend analytics integration (Appwrite).

## Demo

https://moviehuby.netlify.app/

## Installation

Clone the repository:

git clone https: https://github.com/Ansh0305/MovieHub.git

Use following commands: 

cd moviehub

npm install

echo "VITE_TMDB_API_KEY=your_tmdb_api_key_here" > .env

npm run dev


## Usage

- Search for any movie by title using the search bar.
- Browse today's trending movies in the "Most Watched Movies" section.
- All results update dynamically as you type.

## Features

- **Debounced search input** for efficient API usage
- **Trending movies** section, displayed and updated daily
- **Responsive UI** and error handling
- **Appwrite integration** for backend analytics

## Technologies

- React (Hooks: `useState`, `useEffect`, useDebounce)
- TMDB API
- Appwrite
- CSS
- [react-use](https://github.com/streamich/react-use)

## Project Structure

Your project uses a clean, modular structure:

MovieHub/
│

├── public/

│ ├── background.png

│ ├── ghost.svg

│ ├── hero.png

│ ├── logo.png

│ ├── no-movie.png

│ ├── search.svg

│ └── star.svg

│

├── src/

│ ├── components/

│ │ ├── Loader.jsx

│ │ ├── MovieCard.jsx

│ │ └── Search.jsx

│ ├── App.css

│ ├── App.jsx

│ ├── appwrite.js

│ ├── index.css

│ └── main.jsx

│
├── .env

├── .gitignore

├── eslint.config.js

├── index.html

├── package-lock.json

├── package.json

├── README.md

└── vite.config.js


## Contributing

Contributions are welcome! Please open issues or pull requests for bug fixes, new features, or suggestions.




