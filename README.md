# Uziq - Vinyl Scrobbler

## Introduction

Uziq is a web application built with Svelte 5, Svelkit, TypeScript, TailwindCSS, and TanStack Query. The primary function of this application is to scrobble vinyl records from your Discogs account to Last.fm, utilizing a double authentication process for secure data exchange.

## Configuration

To use the application, you need to configure the `.env` file with the following environment variables:

### Last.fm Configuration

* `LASTFM_API_KEY`: Your Last.fm API key
* `LASTFM_APPNAME`: The application name, set to `uziq`
* `LASTFM_API_BASE_URL`: The base URL for Last.fm API requests, set to `https://ws.audioscrobbler.com/2.0`
* `LASTFM_SHARED_SECRET`: Your Last.fm shared secret
* `LASTFM_AUTH_URL`: The authentication URL for Last.fm, set to `https://www.last.fm/api/auth`
* `LASTFM_CALLBACK_URL`: The callback URL for Last.fm authentication, set to `http://localhost:5173/auth/callback/lastfm`

### Discogs Configuration

* `DISCOGS_API_TOKEN`: Your Discogs API token
* `DISCOGS_API_BASE_URL`: The base URL for Discogs API requests, set to `https://api.discogs.com`
* `DISCOGS_CLIENT_KEY`: Your Discogs client key
* `DISCOGS_SECRET_KEY`: Your Discogs secret key
* `DISCOGS_CALLBACK_URL`: The callback URL for Discogs authentication, set to `http://localhost:5173/auth/callback/discogs`

### Public Base URI

* `PUBLIC_BASE_URI`: The base URI for the application, set to `http://localhost:5173`

## Example `.env` File

```makefile
LASTFM_API_KEY=your_lastfm_api_key
LASTFM_APPNAME=uziq
LASTFM_API_BASE_URL=https://ws.audioscrobbler.com/2.0
LASTFM_SHARED_SECRET=your_lastfm_shared_secret
LASTFM_AUTH_URL=https://www.last.fm/api/auth
LASTFM_CALLBACK_URL=http://localhost:5173/auth/callback/lastfm

DISCOGS_API_TOKEN=your_discogs_api_token
DISCOGS_API_BASE_URL=https://api.discogs.com
DISCOGS_CLIENT_KEY=your_discogs_client_key
DISCOGS_SECRET_KEY=your_discogs_secret_key
DISCOGS_CALLBACK_URL=http://localhost:5173/auth/callback/discogs

PUBLIC_BASE_URI=http://localhost:5173
```

Replace the placeholder values with your actual API keys and secrets.

## Getting Started

1. Clone the repository and navigate to the project directory.
2. Create a new file named `.env` and add the required environment variables.
3. Install the dependencies using `npm install`.
4. Start the application using `npm run dev`.

## Authentication Process

The application uses a double authentication process to securely scrobble your vinyl records from Discogs to Last.fm. The process involves authenticating with both Discogs and Last.fm using their respective APIs.

## Troubleshooting

If you encounter any issues during the authentication process or while using the application, refer to the [Troubleshooting Guide](#troubleshooting-guide) for assistance.

## Contributing

Contributions to the Uziq application are welcome. If you'd like to contribute, please fork the repository and submit a pull request with your changes.

## License

The Uziq application is licensed under [MIT License](https://opensource.org/licenses/MIT).