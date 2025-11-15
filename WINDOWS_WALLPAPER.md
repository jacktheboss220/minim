# Windows Wallpaper Integration Guide

## Overview

Minim now includes a feature to download wallpapers and set them as your Windows desktop background. This guide explains how to use this feature.

## Features

- **Download Button**: A new download button (📥) appears in the bottom-right corner when using Photography wallpapers
- **Automatic Script Generation**: Downloads include a PowerShell script for easy wallpaper setting
- **Category Support**: All Unsplash wallpaper categories are supported:
  - Curated by Minim Staff
  - Art
  - Monochrome
  - Wallpapers
  - Nature
  - Textures & Patterns
  - Experimental
  - Floral Beauty
  - Film
  - Lush Life
  - Architecture
  - Aurora

## How to Use

### Step 1: Select Your Wallpaper Category

1. Click the **Settings** button (⚙️) in the bottom-right corner
2. Under the "Background" tab, select your preferred wallpaper category
3. Click the **Refresh** button (✨) if you want a new wallpaper from that category
4. Close the settings panel

### Step 2: Download the Wallpaper

1. When you see a wallpaper you like, click the **Download** button (📥) in the bottom-right corner
2. Two files will be downloaded to your Downloads folder:
   - `minim-[username]-[description].jpg` - The wallpaper image
   - `minim-[username]-[description]-set-wallpaper.ps1` - PowerShell script to set the wallpaper

### Step 3: Set as Windows Wallpaper

#### Option A: Using the PowerShell Script (Recommended)

1. Open your Downloads folder
2. Right-click the `.ps1` file (the PowerShell script)
3. Select **"Run with PowerShell"**
4. If prompted by Windows Security, click **"Open"** or **"Run anyway"**
5. The script will automatically set the wallpaper and confirm success

#### Option B: Manual Method

1. Open your Downloads folder
2. Find the downloaded `.jpg` image file
3. Right-click the image
4. Select **"Set as desktop background"**

## Troubleshooting

### PowerShell Script Won't Run

If you receive an error about script execution being disabled:

1. Open PowerShell as Administrator
2. Run: `Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser`
3. Type `Y` and press Enter
4. Try running the script again

### Download Button Not Visible

The download button only appears when:
- Wallpaper Type is set to "Photography"
- A wallpaper has been loaded successfully

If you're using Colors, Gradients, or Local File wallpaper types, the download button will be hidden.

### Image Not Found Error

Make sure both files (the image and the script) are in your Downloads folder. The script looks for the image in the same location it was downloaded to.

## Technical Details

### Browser Extension Limitations

Browser extensions cannot directly modify Windows system settings due to security restrictions. This is why we use a two-step process:
1. Download the wallpaper image
2. Provide a PowerShell script to set it as the desktop background

### PowerShell Script

The generated PowerShell script uses the Windows API `SystemParametersInfo` function to set the desktop wallpaper. This is the same method Windows uses internally.

The script:
- Verifies the image file exists
- Sets the wallpaper using the Windows API
- Displays a success or error message
- Is safe to run and only modifies your desktop wallpaper setting

## Privacy & Attribution

All wallpapers are sourced from Unsplash and are subject to their license terms. When you download a wallpaper:
- The photographer's information is preserved in the filename
- You can find attribution details by hovering over "Photo by [Name]" in the bottom-left corner
- Please respect the Unsplash License: https://unsplash.com/license

## Support

For issues or questions:
- Check the main README.md file
- Visit the GitHub repository: https://github.com/jacktheboss220/minim
- Report bugs in the Issues section
