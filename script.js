class EventGallery {
  constructor() {
    this.galleryContainer = document.getElementById('gallery-container');
    this.loadingElement = document.getElementById('loading');
    this.noPhotosElement = document.getElementById('no-photos');
    this.images = [];
    this.imageObserver = null;
    this.loadedImages = 0;
    
    this.init();
  }

  async init() {
    await this.loadImages();
    this.setupLazyLoading();
    this.setupImageClickHandlers();
    this.setupScrollAnimations();
  }

  async loadImages() {
    try {
      // First try to load local images from the images folder
      const localImages = await this.loadLocalImages();
      
      if (localImages.length > 0) {
        this.images = localImages;
      } else {
        // Fall back to sample event images for demo
        this.images = this.getSampleEventImages();
      }
      
      this.renderGallery();
    } catch (error) {
      console.error('Error loading images:', error);
      this.showNoPhotos();
    }
  }

  async loadLocalImages() {
    // Common image file extensions
    const imageExtensions = ['jpg', 'jpeg', 'png', 'webp'];
    const localImages = [];

    // Try to load images from the images folder
    // This will automatically detect images in the /images/ folder
    for (let i = 1; i <= 20; i++) {
      for (const ext of imageExtensions) {
        try {
          const imagePath = `images/image${i}.${ext}`;
          const response = await fetch(imagePath, { method: 'HEAD' });
          if (response.ok) {
            localImages.push(imagePath);
            break; // Found image with this number, move to next
          }
        } catch (error) {
          // Image doesn't exist, continue
        }
      }
    }

    // Also try common naming patterns
    const commonNames = [
      'event1', 'event2', 'event3', 'event4', 'event5',
      'photo1', 'photo2', 'photo3', 'photo4', 'photo5',
      'img1', 'img2', 'img3', 'img4', 'img5'
    ];

    for (const name of commonNames) {
      for (const ext of imageExtensions) {
        try {
          const imagePath = `images/${name}.${ext}`;
          const response = await fetch(imagePath, { method: 'HEAD' });
          if (response.ok && !localImages.includes(imagePath)) {
            localImages.push(imagePath);
          }
        } catch (error) {
          // Image doesn't exist, continue
        }
      }
    }

    return localImages;
  }

  getSampleEventImages() {
    // Premium event-themed sample images from Pexels
    return [
      'https://images.pexels.com/photos/1190298/pexels-photo-1190298.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/2747449/pexels-photo-2747449.jpeg?auto=compress&cs=tinysrgb&w=600',
      'https://images.pexels.com/photos/1763075/pexels-photo-1763075.jpeg?auto=compress&cs=tinysrgb&w=700',
      'https://images.pexels.com/photos/2306281/pexels-photo-2306281.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1024993/pexels-photo-1024993.jpeg?auto=compress&cs=tinysrgb&w=600',
      'https://images.pexels.com/photos/2608517/pexels-photo-2608517.jpeg?auto=compress&cs=tinysrgb&w=700',
      'https://images.pexels.com/photos/1449773/pexels-photo-1449773.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg?auto=compress&cs=tinysrgb&w=700',
      'https://images.pexels.com/photos/1190297/pexels-photo-1190297.jpeg?auto=compress&cs=tinysrgb&w=600',
      'https://images.pexels.com/photos/3171837/pexels-photo-3171837.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/2306281/pexels-photo-2306281.jpeg?auto=compress&cs=tinysrgb&w=700',
      'https://images.pexels.com/photos/1444442/pexels-photo-1444442.jpeg?auto=compress&cs=tinysrgb&w=600'
    ];
  }

  renderGallery() {
    if (this.images.length === 0) {
      this.showNoPhotos();
      return;
    }

    this.loadingElement.style.display = 'none';
    
    this.images.forEach((imageSrc, index) => {
      const galleryItem = this.createGalleryItem(imageSrc, index);
      this.galleryContainer.appendChild(galleryItem);
    });

    // Trigger scroll animations after a short delay
    setTimeout(() => {
      this.triggerScrollAnimations();
    }, 100);
  }

  createGalleryItem(imageSrc, index) {
    const item = document.createElement('div');
    item.className = 'gallery-item';
    item.setAttribute('tabindex', '0');
    item.setAttribute('role', 'button');
    item.setAttribute('aria-label', `View event photo ${index + 1}`);

    const img = document.createElement('img');
    img.setAttribute('data-src', imageSrc);
    img.setAttribute('alt', `Event photo ${index + 1}`);
    img.className = 'loading';
    
    // Add a placeholder while loading
    img.style.minHeight = '280px';
    
    item.appendChild(img);
    return item;
  }

  setupLazyLoading() {
    if ('IntersectionObserver' in window) {
      this.imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target;
            this.loadImage(img);
            this.imageObserver.unobserve(img);
          }
        });
      }, {
        rootMargin: '150px 0px',
        threshold: 0.01
      });

      // Observe all images
      const images = this.galleryContainer.querySelectorAll('img[data-src]');
      images.forEach(img => this.imageObserver.observe(img));
    } else {
      // Fallback for older browsers
      const images = this.galleryContainer.querySelectorAll('img[data-src]');
      images.forEach(img => this.loadImage(img));
    }
  }

  loadImage(img) {
    const src = img.getAttribute('data-src');
    
    img.onload = () => {
      img.classList.remove('loading');
      img.classList.add('loaded');
      img.style.minHeight = 'auto';
      this.adjustGridItemHeight(img.closest('.gallery-item'), img);
      this.loadedImages++;
      
      // Add staggered animation delay
      const item = img.closest('.gallery-item');
      item.style.animationDelay = `${this.loadedImages * 0.1}s`;
    };
    
    img.onerror = () => {
      img.classList.remove('loading');
      img.style.minHeight = '280px';
      img.alt = 'Failed to load image';
      
      // Hide the item if it's a local image that failed to load
      if (src.startsWith('images/')) {
        const item = img.closest('.gallery-item');
        item.style.display = 'none';
      }
    };
    
    img.src = src;
    img.removeAttribute('data-src');
  }

  adjustGridItemHeight(item, img) {
    // Calculate the appropriate grid row span based on image aspect ratio
    const aspectRatio = img.naturalHeight / img.naturalWidth;
    let rowSpan;
    
    // More refined row span calculation for better layout
    if (aspectRatio < 0.7) {
      rowSpan = 25; // Wide images
    } else if (aspectRatio < 1.2) {
      rowSpan = 30; // Square-ish images
    } else if (aspectRatio < 1.8) {
      rowSpan = 35; // Portrait images
    } else {
      rowSpan = 40; // Very tall images
    }
    
    item.style.gridRowEnd = `span ${rowSpan}`;
  }

  setupImageClickHandlers() {
    this.galleryContainer.addEventListener('click', (e) => {
      const galleryItem = e.target.closest('.gallery-item');
      if (galleryItem) {
        const img = galleryItem.querySelector('img');
        if (img && img.src && !img.classList.contains('loading')) {
          this.openImageModal(img.src, img.alt);
        }
      }
    });

    // Handle keyboard navigation
    this.galleryContainer.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        const galleryItem = e.target.closest('.gallery-item');
        if (galleryItem) {
          galleryItem.click();
        }
      }
    });
  }

  setupScrollAnimations() {
    // Setup intersection observer for scroll animations
    if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      const animationObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.style.animationPlayState = 'running';
          }
        });
      }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      });

      // Observe gallery items for animation
      const items = this.galleryContainer.querySelectorAll('.gallery-item');
      items.forEach(item => {
        item.style.animationPlayState = 'paused';
        animationObserver.observe(item);
      });
    }
  }

  triggerScrollAnimations() {
    const items = this.galleryContainer.querySelectorAll('.gallery-item');
    items.forEach((item, index) => {
      item.style.animationDelay = `${index * 0.1}s`;
    });
  }

  openImageModal(src, alt) {
    // Enhanced modal implementation with premium styling
    const modal = document.createElement('div');
    modal.className = 'image-modal';
    modal.innerHTML = `
      <div class="modal-overlay">
        <div class="modal-content">
          <button class="modal-close" aria-label="Close modal">&times;</button>
          <img src="${src}" alt="${alt}" class="modal-image">
        </div>
      </div>
    `;

    document.body.appendChild(modal);
    document.body.style.overflow = 'hidden';
    
    // Trigger animation
    requestAnimationFrame(() => {
      modal.classList.add('show');
    });

    // Close modal handlers
    const closeModal = () => {
      modal.classList.remove('show');
      document.body.style.overflow = '';
      setTimeout(() => {
        if (document.body.contains(modal)) {
          document.body.removeChild(modal);
        }
      }, 300);
    };

    modal.querySelector('.modal-close').addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => {
      if (e.target === modal || e.target.className === 'modal-overlay') {
        closeModal();
      }
    });

    // Close on Escape key
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        closeModal();
        document.removeEventListener('keydown', handleEscape);
      }
    };
    document.addEventListener('keydown', handleEscape);

    // Prevent modal from closing when clicking on image
    modal.querySelector('.modal-image').addEventListener('click', (e) => {
      e.stopPropagation();
    });
  }

  showNoPhotos() {
    this.loadingElement.style.display = 'none';
    this.noPhotosElement.style.display = 'block';
  }
}

// Initialize the gallery when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  new EventGallery();
});

// Add smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// Add navbar scroll effect
let lastScrollTop = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  
  if (scrollTop > lastScrollTop && scrollTop > 100) {
    // Scrolling down
    navbar.style.transform = 'translateY(-100%)';
  } else {
    // Scrolling up
    navbar.style.transform = 'translateY(0)';
  }
  
  lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
}, false);