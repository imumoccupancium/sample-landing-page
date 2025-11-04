// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    // Check authentication state
    checkAuthState();
    
    // Mobile menu toggle
    const mobileMenu = document.getElementById('mobile-menu');
    const navMenu = document.querySelector('.nav-menu');
    
    mobileMenu.addEventListener('click', function() {
        mobileMenu.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offsetTop = target.offsetTop - 70; // Account for fixed navbar
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Contact Form Handling
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            const formData = new FormData(contactForm);
            const data = {
                name: formData.get('name'),
                email: formData.get('email'),
                message: formData.get('message')
            };

            try {
                const response = await fetch('/api/contact', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(data)
                });

                const result = await response.json();
                
                if (result.success) {
                    showNotification('Thank you! Your message has been sent successfully.', 'success');
                    contactForm.reset();
                } else {
                    showNotification('Sorry, there was an error sending your message. Please try again.', 'error');
                }
            } catch (error) {
                console.error('Error:', error);
                showNotification('Sorry, there was an error sending your message. Please try again.', 'error');
            }
        });
    }

    // Navbar background on scroll
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.boxShadow = 'none';
        }
    });

    // Intersection Observer for animations
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

    // Observe elements for animation
    document.querySelectorAll('.feature-card, .about-text, .about-stats').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // Logout functionality
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', function() {
            logout();
        });
    }
});

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
        showNotification('Successfully signed out!', 'success');
        
        setTimeout(() => {
            window.location.href = '/login.html';
        }, 1500);
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