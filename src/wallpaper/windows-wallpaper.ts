/**
 * Windows Wallpaper Integration Utilities
 * 
 * This module provides utilities to download wallpapers and generate
 * PowerShell scripts for setting Windows desktop wallpaper.
 * 
 * Note: Browser extensions cannot directly modify Windows system settings.
 * This provides a helper script approach for users to set wallpapers.
 */

/**
 * Downloads the current wallpaper image
 */
export async function downloadWallpaper(imageUrl: string, filename?: string): Promise<void> {
  try {
    // Extract the actual image URL from the CSS url() format
    const urlMatch = imageUrl.match(/url\(['"]?([^'"]+)['"]?\)/);
    const actualUrl = urlMatch ? urlMatch[1] : imageUrl;

    // Fetch the image
    const response = await fetch(actualUrl);
    if (!response.ok) {
      throw new Error('Failed to fetch wallpaper');
    }

    const blob = await response.blob();
    
    // Create download link
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename || `minim-wallpaper-${Date.now()}.jpg`;
    
    // Trigger download
    document.body.appendChild(link);
    link.click();
    
    // Cleanup
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  } catch (error) {
    console.error('Error downloading wallpaper:', error);
    throw error;
  }
}

/**
 * Generates a PowerShell script to set Windows wallpaper
 */
export function generateWindowsWallpaperScript(imagePath: string): string {
  return `# Minim - Set Windows Wallpaper Script
# This script sets the downloaded image as your Windows desktop wallpaper
# Usage: Right-click this file and select "Run with PowerShell"

Add-Type -TypeDefinition @"
using System;
using System.Runtime.InteropServices;
using Microsoft.Win32;

namespace Wallpaper
{
    public class Setter
    {
        public const int SetDesktopWallpaper = 20;
        public const int UpdateIniFile = 0x01;
        public const int SendWinIniChange = 0x02;
        
        [DllImport("user32.dll", SetLastError = true, CharSet = CharSet.Auto)]
        private static extern int SystemParametersInfo(int uAction, int uParam, string lpvParam, int fuWinIni);
        
        public static void SetWallpaper(string path)
        {
            SystemParametersInfo(SetDesktopWallpaper, 0, path, UpdateIniFile | SendWinIniChange);
        }
    }
}
"@

$imagePath = "${imagePath}"

if (Test-Path $imagePath) {
    [Wallpaper.Setter]::SetWallpaper($imagePath)
    Write-Host "Wallpaper set successfully!" -ForegroundColor Green
    Write-Host "Path: $imagePath" -ForegroundColor Cyan
} else {
    Write-Host "Error: Image file not found at $imagePath" -ForegroundColor Red
    Write-Host "Please make sure the image is downloaded to this location" -ForegroundColor Yellow
}

# Keep the window open
Read-Host -Prompt "Press Enter to exit"
`;
}

/**
 * Downloads wallpaper and creates a PowerShell script to set it
 */
export async function downloadAndPrepareForWindows(
  imageUrl: string,
  filename?: string,
  category?: string
): Promise<void> {
  try {
    const baseFilename = filename || `minim-wallpaper-${category || 'photography'}-${Date.now()}`;
    const imageFilename = `${baseFilename}.jpg`;
    
    // Download the image
    await downloadWallpaper(imageUrl, imageFilename);
    
    // Generate and download the PowerShell script
    const downloadsPath = '%USERPROFILE%\\Downloads';
    const fullImagePath = `${downloadsPath}\\${imageFilename}`;
    const script = generateWindowsWallpaperScript(fullImagePath);
    
    const scriptBlob = new Blob([script], { type: 'text/plain' });
    const scriptUrl = window.URL.createObjectURL(scriptBlob);
    const scriptLink = document.createElement('a');
    scriptLink.href = scriptUrl;
    scriptLink.download = `${baseFilename}-set-wallpaper.ps1`;
    
    // Trigger script download
    document.body.appendChild(scriptLink);
    scriptLink.click();
    
    // Cleanup
    document.body.removeChild(scriptLink);
    window.URL.revokeObjectURL(scriptUrl);
    
    // Show instructions
    showInstructions();
  } catch (error) {
    console.error('Error preparing Windows wallpaper:', error);
    throw error;
  }
}

/**
 * Shows instructions for setting Windows wallpaper
 */
function showInstructions(): void {
  const instructions = `
Windows Wallpaper Setup Instructions:

1. Two files have been downloaded to your Downloads folder:
   - A wallpaper image (JPG)
   - A PowerShell script (PS1)

2. To set the wallpaper:
   - Right-click the .ps1 file
   - Select "Run with PowerShell"
   - If prompted, allow the script to run

Alternatively, you can manually:
   - Right-click the image file
   - Select "Set as desktop background"
  `;
  
  console.log(instructions);
  
  // Could also show this in a modal/toast if UI framework supports it
  if (confirm('Wallpaper downloaded! Would you like to see setup instructions?')) {
    alert(instructions);
  }
}

/**
 * Get the appropriate filename based on wallpaper metadata
 */
export function getWallpaperFilename(meta?: any, category?: string): string {
  if (meta?.username && meta?.altDescription) {
    const cleanDescription = meta.altDescription
      .replace(/[^a-z0-9]/gi, '-')
      .toLowerCase()
      .substring(0, 50);
    return `minim-${meta.username}-${cleanDescription}`;
  }
  
  if (category) {
    return `minim-${category}-${Date.now()}`;
  }
  
  return `minim-wallpaper-${Date.now()}`;
}
