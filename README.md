# My Photo Gallery

A minimal, responsive photo gallery website similar to Google Photos, built with vanilla HTML, CSS, and JavaScript.

## Features

- **Responsive Design**: Adapts to all screen sizes from mobile to desktop
- **Masonry Layout**: Photos arrange in a Pinterest-style grid
- **Lazy Loading**: Images load as you scroll for better performance
- **Hover Effects**: Subtle zoom and shadow effects
- **Modal View**: Click any photo to view it in full size
- **Keyboard Navigation**: Full keyboard accessibility support
- **Static Hosting**: Ready for GitHub Pages deployment

## Setup

1. **Add Your Photos**: Place your image files in the `images/` folder
2. **Update Image List**: Edit the `localImagePaths` array in `script.js` to include your image filenames:
   ```javascript
   const localImagePaths = [
     'images/photo1.jpg',
     'images/photo2.jpg',
     'images/photo3.jpg',
     // Add more images...
   ];
   ```
3. **Deploy**: Upload to GitHub Pages or any static hosting service

## File Structure

```
/
├── index.html          # Main HTML file
├── style.css           # Gallery styles
├── script.js           # Gallery functionality
├── images/            # Your photo files go here
└── README.md          # This file
```

## Customization

### Adding Photos
1. Copy your image files to the `images/` folder
2. Update the `localImagePaths` array in `script.js` with your filenames
3. Supported formats: JPG, PNG, WebP, GIF

### Styling
- Modify CSS variables in `style.css` for colors and spacing
- Adjust grid column sizes by changing `minmax()` values
- Customize hover effects and transitions

### Layout
- Grid breakpoints can be adjusted in the media queries
- Change the masonry effect by modifying the `nth-child` selectors
- Adjust spacing with the CSS custom properties

## Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- IE11+ (with reduced functionality)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Performance

- Lazy loading reduces initial page load time
- Optimized CSS Grid layout for smooth scrolling
- Minimal JavaScript footprint
- Responsive images with proper sizing

## Deployment to GitHub Pages

1. Create a new repository on GitHub
2. Upload all files to the repository
3. Go to Settings > Pages
4. Select "Deploy from a branch" and choose "main"
5. Your gallery will be available at `https://yourusername.github.io/repository-name`

## License

This project is open source and available under the MIT License.