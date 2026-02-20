// ZILA Token Website - Main JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initNavigation();
    initParticles();
    initModal();
    initTokenomicsChart();
    initVolumeChart();
    initWhitepaperTabs();
    initScrollAnimations();
    initCounterAnimations();
    initTiltEffect();
});

// ========================================
// Navigation
// ========================================
function initNavigation() {
    const navbar = document.getElementById('navbar');
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Scroll effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Mobile toggle
    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        const icon = navToggle.querySelector('i');
        icon.classList.toggle('fa-bars');
        icon.classList.toggle('fa-times');
    });

    // Active link on scroll
    window.addEventListener('scroll', () => {
        let current = '';
        const sections = document.querySelectorAll('section[id]');
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            if (window.scrollY >= sectionTop) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });

    // Close mobile menu on link click
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            const icon = navToggle.querySelector('i');
            icon.classList.add('fa-bars');
            icon.classList.remove('fa-times');
        });
    });
}

// ========================================
// Particles Background
// ========================================
function initParticles() {
    const particlesContainer = document.getElementById('particles');
    const particleCount = 50;

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.animationDelay = `${Math.random() * 15}s`;
        particle.style.animationDuration = `${15 + Math.random() * 10}s`;
        
        // Random colors
        const colors = ['#8b5cf6', '#3b82f6', '#06b6d4', '#a855f7'];
        particle.style.background = colors[Math.floor(Math.random() * colors.length)];
        particle.style.boxShadow = `0 0 10px ${particle.style.background}`;
        
        particlesContainer.appendChild(particle);
    }
}

// ========================================
// Modal
// ========================================
function initModal() {
    const modal = document.getElementById('airdropModal');
    const openBtn = document.getElementById('openAirdropModal');
    const closeBtn = document.getElementById('closeModal');
    const form = document.getElementById('airdropForm');

    openBtn.addEventListener('click', () => {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    });

    closeBtn.addEventListener('click', () => {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    });

    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('active');
            document.body.style.overflow = '';
        }
    });

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const walletAddress = document.getElementById('walletAddress').value;
        const referralCode = document.getElementById('referralCode').value;
        
        // Simulate submission
        const submitBtn = form.querySelector('.btn-submit');
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Registering...';
        submitBtn.disabled = true;
        
        setTimeout(() => {
            submitBtn.innerHTML = '<i class="fas fa-check"></i> Registered Successfully!';
            submitBtn.style.background = 'linear-gradient(135deg, #22c55e, #16a34a)';
            
            setTimeout(() => {
                modal.classList.remove('active');
                document.body.style.overflow = '';
                form.reset();
                submitBtn.innerHTML = '<i class="fas fa-rocket"></i> Register for Airdrop';
                submitBtn.style.background = '';
                submitBtn.disabled = false;
            }, 2000);
        }, 1500);
    });
}

// ========================================
// Tokenomics Chart
// ========================================
function initTokenomicsChart() {
    const ctx = document.getElementById('tokenomicsChart');
    if (!ctx) return;

    const data = {
        labels: ['Staking', 'Ecosystem', 'Liquidity', 'Presale', 'Team', 'Marketing', 'Airdrop'],
        datasets: [{
            data: [40, 20, 10, 10, 10, 5, 5],
            backgroundColor: [
                '#3b82f6',
                '#f59e0b',
                '#ef4444',
                '#dc2626',
                '#1e3a8a',
                '#7c3aed',
                '#a855f7'
            ],
            borderColor: '#0a0a0f',
            borderWidth: 3,
            hoverOffset: 20
        }]
    };

    new Chart(ctx, {
        type: 'doughnut',
        data: data,
        options: {
            responsive: true,
            maintainAspectRatio: true,
            cutout: '65%',
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    backgroundColor: 'rgba(20, 20, 35, 0.9)',
                    titleColor: '#ffffff',
                    bodyColor: '#a1a1aa',
                    borderColor: '#8b5cf6',
                    borderWidth: 1,
                    padding: 16,
                    cornerRadius: 12,
                    displayColors: true,
                    callbacks: {
                        label: function(context) {
                            return `${context.label}: ${context.raw}%`;
                        }
                    }
                }
            },
            animation: {
                animateRotate: true,
                animateScale: true,
                duration: 2000,
                easing: 'easeOutQuart'
            }
        }
    });

    // Interactive token items
    const tokenItems = document.querySelectorAll('.token-item');
    tokenItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            tokenItems.forEach(i => i.style.opacity = '0.5');
            item.style.opacity = '1';
        });
        
        item.addEventListener('mouseleave', () => {
            tokenItems.forEach(i => i.style.opacity = '1');
        });
    });
}

// ========================================
// Volume Chart (Dashboard)
// ========================================
function initVolumeChart() {
    const ctx = document.getElementById('volumeChart');
    if (!ctx) return;

    const labels = ['Solana', 'Base', 'Polygon', 'Ethereum', 'Arbitrum', 'Optimism', 'BSC'];
    const data = {
        labels: labels,
        datasets: [{
            label: 'Transaction Volume',
            data: [850000, 620000, 480000, 390000, 320000, 280000, 210000],
            backgroundColor: [
                'rgba(139, 92, 246, 0.8)',
                'rgba(59, 130, 246, 0.8)',
                'rgba(168, 85, 247, 0.8)',
                'rgba(99, 102, 241, 0.8)',
                'rgba(6, 182, 212, 0.8)',
                'rgba(236, 72, 153, 0.8)',
                'rgba(245, 158, 11, 0.8)'
            ],
            borderColor: [
                '#8b5cf6',
                '#3b82f6',
                '#a855f7',
                '#6366f1',
                '#06b6d4',
                '#ec4899',
                '#f59e0b'
            ],
            borderWidth: 2,
            borderRadius: 8,
            borderSkipped: false,
        }]
    };

    new Chart(ctx, {
        type: 'bar',
        data: data,
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    backgroundColor: 'rgba(20, 20, 35, 0.9)',
                    titleColor: '#ffffff',
                    bodyColor: '#a1a1aa',
                    borderColor: '#8b5cf6',
                    borderWidth: 1,
                    padding: 16,
                    cornerRadius: 12,
                    callbacks: {
                        label: function(context) {
                            return `$${(context.raw / 1000).toFixed(0)}K`;
                        }
                    }
                }
            },
            scales: {
                x: {
                    grid: {
                        color: 'rgba(255, 255, 255, 0.05)',
                        drawBorder: false
                    },
                    ticks: {
                        color: '#a1a1aa',
                        font: {
                            family: 'Space Grotesk'
                        }
                    }
                },
                y: {
                    grid: {
                        color: 'rgba(255, 255, 255, 0.05)',
                        drawBorder: false
                    },
                    ticks: {
                        color: '#a1a1aa',
                        font: {
                            family: 'Space Grotesk'
                        },
                        callback: function(value) {
                            return '$' + (value / 1000) + 'K';
                        }
                    }
                }
            },
            animation: {
                duration: 2000,
                easing: 'easeOutQuart'
            }
        }
    });

    // Time filter buttons
    const filterBtns = document.querySelectorAll('.filter-btn');
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
        });
    });
}

// ========================================
// Whitepaper Tabs
// ========================================
function initWhitepaperTabs() {
    const navBtns = document.querySelectorAll('.wp-nav-btn');
    const panels = document.querySelectorAll('.wp-panel');

    navBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const section = btn.dataset.section;
            
            navBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            panels.forEach(panel => {
                panel.classList.remove('active');
                if (panel.id === `wp-${section}`) {
                    panel.classList.add('active');
                }
            });
        });
    });
}

// ========================================
// Scroll Animations
// ========================================
function initScrollAnimations() {
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Elements to animate
    const animateElements = document.querySelectorAll(
        '.eco-card, .team-card, .roadmap-item, .partner-card, .dashboard-card, .arch-node'
    );

    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.6s ease';
        observer.observe(el);
    });

    // Add CSS for animated state
    const style = document.createElement('style');
    style.textContent = `
        .animate-in {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    `;
    document.head.appendChild(style);
}

// ========================================
// Counter Animations
// ========================================
function initCounterAnimations() {
    const counters = document.querySelectorAll('[data-count]');
    
    const observerOptions = {
        threshold: 0.5
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const countTo = parseInt(target.dataset.count);
                animateCounter(target, countTo);
                observer.unobserve(target);
            }
        });
    }, observerOptions);

    counters.forEach(counter => observer.observe(counter));
}

function animateCounter(element, target) {
    const duration = 2000;
    const start = 0;
    const increment = target / (duration / 16);
    let current = start;

    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        
        // Format the number
        if (target >= 1000000) {
            element.textContent = '$' + (current / 1000000).toFixed(2) + 'M';
        } else if (target >= 1000) {
            element.textContent = current.toLocaleString();
        } else {
            element.textContent = '$' + (current / 1000).toFixed(0) + 'K';
        }
    }, 16);
}

// ========================================
// Tilt Effect
// ========================================
function initTiltEffect() {
    const tiltElements = document.querySelectorAll('[data-tilt]');
    
    tiltElements.forEach(el => {
        el.addEventListener('mousemove', (e) => {
            const rect = el.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;
            
            el.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
        });
        
        el.addEventListener('mouseleave', () => {
            el.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
        });
    });
}

// ========================================
// Smooth Scroll
// ========================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
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
