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
      // Load images from predefined list - using actual files from your project
      this.images = this.getImageList();
      this.renderImages();
    } catch (error) {
      console.error('Error loading images:', error);
      this.showNoPhotos();
    }
  }

  getImageList() {
    // Using actual image files from your project for testing
    return [
      'images/0362e3571b4c44a2856ba991833164c4.jpg',
      'images/13b68495e0804e2792cbbb1a3d7d6ee2.jpg',
      'images/2027f34e71454cf18ae424b838c59665.jpg',
      'images/28e5a36eb3894a0b98264ce6f8316035.jpg',
      'images/2ee89ad876dc44b185668b6347a62863.jpg',
      'images/345c219b31524992a877b66e47b1c3e8.jpg',
      'images/55936e4637cb4ab58b030710487cbb40.jpg',
      'images/6a1f26f95fc34f6f970e35a859d4fde9.jpg',
      'images/75cdb64661a24743ad39da9d9731c3f5.jpg',
      'images/7f4f56c4f717459b893af9f71a673cd7.jpg',
      'images/85df09d26ef742548caab16ca6a1d6d8.jpg',
      'images/8cc3727cbe354ba2b3cc344144cbe315.jpg',
      'images/IMG-20231019-WA0003.jpg',
      'images/IMG-20231021-WA0000.jpg',
      'images/IMG-20231028-WA0032.jpg',
      'images/IMG-20231028-WA0034.jpg',
      'images/IMG-20231028-WA0035.jpg',
      'images/IMG-20231028-WA0036.jpg',
      'images/IMG-20231028-WA0037.jpg',
      'images/IMG-20231028-WA0038.jpg'
    ];
  }

  renderImages() {
    if (this.images.length === 0) {
      this.showNoPhotos();
      return;
    }

    this.loadingElement.style.display = 'none';
    
    // Create gallery items for all images
    this.images.forEach((imageSrc, index) => {
      const galleryItem = this.createGalleryItem(imageSrc, index);
      this.galleryContainer.appendChild(galleryItem);
    });
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
    img.className = 'gallery-image loading';
    img.loading = 'lazy';
    
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
        rootMargin: '100px 0px',
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
    
    // Create a new image to preload
    const newImg = new Image();
    
    newImg.onload = () => {
      img.src = src;
      img.classList.remove('loading');
      img.classList.add('loaded');
      this.loadedImages++;
      
      // Trigger animation
      requestAnimationFrame(() => {
        const item = img.closest('.gallery-item');
        if (item) {
          item.classList.add('animate-in');
        }
      });
    };
    
    newImg.onerror = () => {
      console.error(`Failed to load image: ${src}`);
      img.classList.remove('loading');
      img.classList.add('error');
      img.alt = 'Failed to load image';
      
      // Show placeholder or hide the item
      const item = img.closest('.gallery-item');
      if (item) {
        item.style.opacity = '0.5';
        item.style.pointerEvents = 'none';
      }
    };
    
    // Start loading the image
    newImg.src = src;
    img.removeAttribute('data-src');
  }

  setupImageClickHandlers() {
    this.galleryContainer.addEventListener('click', (e) => {
      const galleryItem = e.target.closest('.gallery-item');
      if (galleryItem) {
        const img = galleryItem.querySelector('img');
        if (img && img.src && !img.classList.contains('loading') && !img.classList.contains('error')) {
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
    // Simple fade-in animation for gallery items
    const items = this.galleryContainer.querySelectorAll('.gallery-item');
    items.forEach((item, index) => {
      item.style.animationDelay = `${index * 0.05}s`;
    });
  }

  openImageModal(src, alt) {
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

// Optimized navbar scroll effect
let lastScrollTop = 0;
let ticking = false;
const navbar = document.querySelector('.navbar');

function updateNavbar() {
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  
  if (scrollTop > lastScrollTop && scrollTop > 100) {
    navbar.style.transform = 'translateY(-100%)';
  } else {
    navbar.style.transform = 'translateY(0)';
  }
  
  lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
  ticking = false;
}

window.addEventListener('scroll', () => {
  if (!ticking) {
    requestAnimationFrame(updateNavbar);
    ticking = true;
  }
}, { passive: true });
