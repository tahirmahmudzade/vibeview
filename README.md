# VibeView 🎵

VibeView is a Progressive Web Application (PWA) built with Next.js that allows Spotify users to visualize and explore their music statistics. With VibeView, you can gain insights into your listening habits, discover your top tracks and artists, and track your recently played songs—all presented with a sleek and modern design.

---

## Features ✨

### 🎧 Spotify Stats

- View your **top tracks** and **top artists**.
- Explore **recently played tracks** with album covers and playback times.
- Analyze your listening habits over different time periods (e.g., last 4 weeks).

### 📱 Progressive Web App (PWA)

- Fully installable on mobile and desktop devices.
- Native app-like experience with **standalone display mode**.

### 🌟 Modern UI

- Dark, Spotify-inspired theme with gradient backgrounds.
- Responsive design for both desktop and mobile devices.
- Intuitive navigation with sidebar menus and pagination.

### 🛠️ Built With:

- **Next.js** for server-side rendering and optimized performance.
- **Spotify Web API** for fetching user data.
- **Auth.js** for Spotify authentication.
- **PWA support** to make the app installable.

---

## Installation 🛠️

### Prerequisites

- Node.js installed (v16 or later recommended).
- A Spotify Developer account with API credentials.

### Setup

1. Clone the repository:

```bash
   git clone https://github.com/your-username/vibeview.git
   cd vibeview
```

2. Install dependencies:

```bash
    pnpm install
```

3. Create an .env.local file with the following variables:

```bash
    AUTH_SECRET=""
    AUTH_SPOTIFY_ID=""
    AUTH_SPOTIFY_SECRET=""
    AUTH_TRUST_HOST=true
    NEXTAUTH_SECRET=""
```

4. Run the development server:

```bash
    pnpm run dev
```

5. Open the app in your browser at http://localhost:3232. (configure port in package.json)

```json
"scripts": {
    "dev": "next dev --turbopack -p 3232",
}
```

## Usage 📖

1. Log in with your Spotify account via the **Explore Stats** button in index page.
2. Explore:
   • Top Tracks: View your favorite songs over various time periods.
   • Top Artists: Discover your most-listened-to artists.
   • Recently Played: Check out the tracks you’ve recently listened to.
3. Install the app on your device:

   1. **Android**
      • Open the VibeView website in Google Chrome.
      • When the app detects installability, an Install Available alert will appear at the top of the screen.
      • Click the Install button in the alert
   2. **IOS**
      • Open the VibeView website in Safari.
      • Tap the Share button (a box with an arrow pointing up).
      • Scroll down and select Add to Home Screen.
      • Rename the app if desired, then tap Add in the top-right corner. The app will now appear on your home screen.

## Progressive Web App 🌐

### Key PWA Features

1. Manifest Configuration:
   • theme_color: #000000
   • background_color: #000000
   • Fully branded with icons (192x192, 512x512).
2. Standalone Mode:
   • VibeView runs like a native app without browser UI.

## Tech Stack 🖥️

• Dev: Next.js
• Authentication: Auth.js (Spotify OAuth)
• Spotify API: Spotify Web API
• PWA Support: Service Workers and Web App Manifest

## Roadmap 🚀

• Add more detailed user analytics (e.g., genres, playlists).
• Implement social sharing features for stats.
• Add light mode support.

## Contributing 🤝

Contributions are welcome! Follow these steps to contribute:

1. Fork the repository.
2. Create a feature branch:

```bash
   git checkout -b feature-name
```

3. Commit your changes:

```bash
   git commit -m "Add your message here"
```

4. Push to the branch:

```bash
   git push origin feature-name
```

5. Open a Pull Request.

## License 📝

This project is licensed under the MIT License. See the LICENSE file for details.

## Contact 📧

If you have any questions or feedback, feel free to reach out:

• Email: tahirmahmudzade25@gmail.com

Enjoy exploring your Spotify stats with VibeView! 🎶
