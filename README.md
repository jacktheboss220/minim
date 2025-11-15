# Minim - Minimalist New Tab Extension 

for Firefox and Chromium.

![Preview of Minim Extension](minim.png)

The screenshot here is on the Zen browser.

## Description
This is the full source code of the Minim extension for Chromium and Firefox browsers.

visit https://minim.tulv.in/ for a preview.

## Features
- **Minimalist New Tab**: Clean, distraction-free interface
- **Multiple Wallpaper Sources**: Choose from Photography, Colors, Gradients, or Local Files
- **Curated Collections**: Access to 12+ Unsplash wallpaper categories
- **Windows Wallpaper Integration**: Download wallpapers and set them as Windows desktop backgrounds with one click
- **Customizable Widgets**: Time, weather, links, and more
- **Auto-refresh**: Automatically change wallpapers at your preferred interval

### 🪟 Windows Wallpaper Feature
Minim now supports downloading wallpapers to use as your Windows desktop background! Click the download button (📥) when viewing a photography wallpaper to save it along with an auto-generated PowerShell script for easy setup. See [WINDOWS_WALLPAPER.md](WINDOWS_WALLPAPER.md) for detailed instructions.

## Build Instructions

### 1. Prerequisites
- Node.js **v18.x** (https://nodejs.org)
- yarn

### 2. Install Dependencies
```bash
yarn
```

### 3. Launch Dev server
```bash
yarn dev
```

### 4. Build extension zip and xpi
```bash
bash make_extension.sh
```
This will create a zip for chrome and minim_ff_v_<version>.xpi file.

### Links
* Chrome Web Store - https://chromewebstore.google.com/detail/minim-a-minimal-newtab/kpblgdhkligkbbnbpkigppblggflihgn?hl=en
* Firefox Addons - https://addons.mozilla.org/en-US/firefox/addon/minim-minimalist-new-tab/
