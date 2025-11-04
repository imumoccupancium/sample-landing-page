// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    // Check authentication state
    checkAuthState();
    
    // Search functionality
    const searchInput = document.querySelector('.search-input');
    const searchBtn = document.querySelector('.search-btn');
    
    if (searchInput && searchBtn) {
        searchBtn.addEventListener('click', function() {
            performSearch(searchInput.value.trim());
        });
        
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                performSearch(this.value.trim());
            }
        });
    }

    // Category navigation functionality
    document.querySelectorAll('.category-link').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remove active class from all links
            document.querySelectorAll('.category-link').forEach(l => l.classList.remove('active'));
            
            // Add active class to clicked link
            this.classList.add('active');
            
            // Filter games by category (placeholder for now)
            const category = this.textContent.toLowerCase();
            filterGamesByCategory(category);
        });
    });

    // Game card interactions
    document.querySelectorAll('.game-card').forEach(card => {
        const moreBtn = card.querySelector('.more-btn');
        
        if (moreBtn) {
            moreBtn.addEventListener('click', function(e) {
                e.stopPropagation();
                const gameTitle = card.querySelector('.game-header').textContent;
                showGameDetails(gameTitle);
            });
        }
        
        // Add click event to entire card for future functionality
        card.addEventListener('click', function() {
            const gameTitle = this.querySelector('.game-header').textContent;
            // Placeholder for game page navigation
            console.log('Clicked on game:', gameTitle);
        });
    });

    // Exclusive games interactions
    document.querySelectorAll('.exclusive-game').forEach(game => {
        game.addEventListener('click', function() {
            const gameTitle = this.querySelector('h4').textContent;
            showGameDetails(gameTitle);
        });
    });

    // Add hover effects to game cards
    document.querySelectorAll('.game-card, .exclusive-game').forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Logout functionality
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', function() {
            logout();
        });
    }

    // Initialize page animations
    initializeAnimations();
});

// Game-specific functions
function performSearch(query) {
    if (!query) {
        console.log('Empty search query');
        return;
    }
    
    console.log('Searching for:', query);
    
    // Placeholder for actual search functionality
    // This would normally filter the games grid
    setTimeout(() => {
        console.log(`Found games matching "${query}"`);
    }, 1000);
}

function filterGamesByCategory(category) {
    console.log('Filtering by category:', category);
    
    // Placeholder for category filtering
    // This would normally filter the games grid based on category
    const gameCards = document.querySelectorAll('.game-card');
    gameCards.forEach((card, index) => {
        // Add a slight delay for visual effect
        setTimeout(() => {
            card.style.animation = 'fadeIn 0.6s ease-out';
        }, index * 100);
    });
}

function showGameDetails(gameTitle) {
    console.log('Showing details for:', gameTitle);
    
    // Placeholder for game details modal/page
    // This would normally open a detailed view of the game
}

function initializeAnimations() {
    // Intersection Observer for game cards
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe game cards for animation
    document.querySelectorAll('.game-card, .exclusive-game').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// Authentication Functions
function checkAuthState() {
    const user = localStorage.getItem('user');
    const userInfo = document.getElementById('userInfo');
    const authButtons = document.getElementById('authButtons');
    
    if (user) {
        const userData = JSON.parse(user);
        displayUserInfo(userData);
        
        if (userInfo) userInfo.style.display = 'flex';
        if (authButtons) authButtons.style.display = 'none';
    } else {
        if (userInfo) userInfo.style.display = 'none';
        if (authButtons) authButtons.style.display = 'block';
    }
}

function displayUserInfo(user) {
    const userName = document.getElementById('userName');
    const userAvatar = document.getElementById('userAvatar');
    
    if (userName) {
        userName.textContent = user.name || 'User';
    }
    
    if (userAvatar && user.photoURL) {
        // Remove any initials avatar if it exists
        const initialsAvatar = document.querySelector('.initials-avatar');
        if (initialsAvatar) {
            initialsAvatar.remove();
        }
        
        userAvatar.src = user.photoURL;
        userAvatar.style.display = 'block';
        userAvatar.onerror = function() {
            // If image fails to load, show initials instead
            this.style.display = 'none';
            createInitialsAvatar(user.name || 'User', this.parentNode);
        };
    } else if (userAvatar) {
        // No photo URL, create initials avatar
        userAvatar.style.display = 'none';
        createInitialsAvatar(user.name || 'User', userAvatar.parentNode);
    }
}

function createInitialsAvatar(name, parentNode) {
    const initials = name.split(' ').map(n => n[0]).join('').toUpperCase().substring(0, 2);
    
    // Check if initials avatar already exists
    let initialsAvatar = document.querySelector('.initials-avatar');
    if (!initialsAvatar) {
        initialsAvatar = document.createElement('div');
        initialsAvatar.className = 'initials-avatar';
        initialsAvatar.style.cssText = `
            width: 32px;
            height: 32px;
            border-radius: 50%;
            background: #667eea;
            color: white;
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: 600;
            font-size: 0.8rem;
        `;
        parentNode.insertBefore(initialsAvatar, parentNode.firstChild);
    }
    initialsAvatar.textContent = initials;
}

function logout() {
    // Use Firebase signOut if available, otherwise fallback to localStorage clear
    if (window.firebaseSignOut) {
        window.firebaseSignOut();
    } else {
        // Fallback for when Firebase isn't loaded
        localStorage.removeItem('user');
        console.log('Successfully signed out!');
        
        setTimeout(() => {
            window.location.href = '/login.html';
        }, 500);
    }
}

// Notification function
function showNotification(message, type = 'info') {
    // Remove existing notification
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }

    // Create new notification
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-message">${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;

    // Style the notification
    const bgColor = type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#3b82f6';
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${bgColor};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 10px;
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
        z-index: 10000;
        max-width: 400px;
        animation: slideIn 0.3s ease;
    `;

    // Add animation keyframes
    if (!document.querySelector('#notification-styles')) {
        const style = document.createElement('style');
        style.id = 'notification-styles';
        style.textContent = `
            @keyframes slideIn {
                from {
                    transform: translateX(100%);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }
            .notification-content {
                display: flex;
                justify-content: space-between;
                align-items: center;
                gap: 1rem;
            }
            .notification-close {
                background: none;
                border: none;
                color: white;
                font-size: 1.5rem;
                cursor: pointer;
                padding: 0;
                line-height: 1;
            }
            .notification-close:hover {
                opacity: 0.8;
            }
        `;
        document.head.appendChild(style);
    }

    document.body.appendChild(notification);

    // Close button functionality
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        notification.remove();
    });

    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.remove();
        }
    }, 5000);
}