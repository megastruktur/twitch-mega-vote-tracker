# Mega Vote Tracker Twitch extension

## Description
A Twitch extension that adds a Video Overlay to a twitch stream with the order-by-votes list of games with their Steam cards.
The Game list sits in Pocketbase backend and is fetched by the extension.

The votes are done through various donation platforms so the extension itself won't handle the votes management, only the listing.

Backend Admin is a Pocketbase Frontend.

## Tech Spec
- Sveltekit (https://kit.svelte.dev)
- Pocketbase (https://pocketbase.io)
- Skeleton (https://www.skeleton.dev)
- CORS-container (https://github.com/imjacobclark/cors-container)

## Notes

### Steam Web API Cors
- Steam Web API won't allow you to access it from your client, so I've deployed a CORS proxy using Cors-container docker image (taken from github, `that's important` as the package on dockerhub is outdated and won't allow Access-Control-Allow-Origin setting)

### .env.local
PUBLIC_POCKETBASE_URL=
PUBLIC_CORS_PROXY_URL=

### Twitch deployment
- To build a Hosted ZIP for twitch the Sveltekit static adapter is used. However, the adapter still creates some inline scripts to handle the page logic. So I wrote a script `inlineToFile.cjs` that can strip the inline scripts out of the generated *.html files and put them right into their own *.js files. The script is run automatically on `npm run build`.
- To create a Twitch extension *.zip the command `npm run zip` is used.
- Do not forget to setup `Twitch Extension -> Capabilities -> Extension Configuration Service -> Allowlist for Image Domains | Allowlist for Media Domains | Allowlist for URL Fetching Domains`

### HTTPS
All the connections should be done via HTTPS protocol. Otherwise they are dropped by Twitch. So both Pocketbase and CORS-container mush be served over https.
