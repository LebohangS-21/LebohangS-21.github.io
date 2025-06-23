document.addEventListener('DOMContentLoaded', function() {
    // Set current year in footer
    document.getElementById('current-year').textContent = new Date().getFullYear();

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const navbarHeight = document.getElementById('navbar').offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navbarHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                if (document.querySelector('.mobile-menu-btn')) {
                    toggleMobileMenu();
                }
            }
        });
    });

    // Navbar scroll effect
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Mobile menu toggle (if needed)
    function setupMobileMenu() {
        const mobileMenuBtn = document.createElement('button');
        mobileMenuBtn.className = 'mobile-menu-btn';
        mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
        mobileMenuBtn.setAttribute('aria-label', 'Toggle navigation menu');
        
        const container = document.querySelector('#navbar .container');
        container.insertBefore(mobileMenuBtn, container.firstChild);
        
        mobileMenuBtn.addEventListener('click', toggleMobileMenu);
    }
    
    function toggleMobileMenu() {
        const nav = document.querySelector('#navbar nav');
        const btn = document.querySelector('.mobile-menu-btn');
        
        nav.classList.toggle('active');
        btn.classList.toggle('active');
        
        if (nav.classList.contains('active')) {
            btn.innerHTML = '<i class="fas fa-times"></i>';
        } else {
            btn.innerHTML = '<i class="fas fa-bars"></i>';
        }
    }
    
    // Check if mobile menu is needed
    function checkMobileMenu() {
        const nav = document.querySelector('#navbar nav ul');
        if (window.innerWidth <= 768) {
            if (!document.querySelector('.mobile-menu-btn')) {
                setupMobileMenu();
                nav.style.display = 'none';
            }
        } else {
            const mobileBtn = document.querySelector('.mobile-menu-btn');
            if (mobileBtn) {
                mobileBtn.remove();
                nav.style.display = 'flex';
            }
        }
    }
    
    window.addEventListener('resize', checkMobileMenu);
    checkMobileMenu();

    // PDF Viewer Modal
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.innerHTML = `
        <div class="modal-content">
            <span class="close-modal">&times;</span>
            <iframe class="pdf-viewer" frameborder="0"></iframe>
        </div>
    `;
    document.body.appendChild(modal);

    const closeModal = document.querySelector('.close-modal');
    closeModal.addEventListener('click', function() {
        modal.style.display = 'none';
    });

    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });

    document.querySelectorAll('.view-certificate-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const pdfSrc = this.getAttribute('data-pdf-src');
            if (pdfSrc) {
                const pdfViewer = document.querySelector('.pdf-viewer');
                pdfViewer.src = pdfSrc;
                modal.style.display = 'block';
            }
        });
    });

    // Project card hover effect enhancement
    document.querySelectorAll('.project-card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });

    // Active section highlighting in navigation
    const sections = document.querySelectorAll('section');
    const navItems = document.querySelectorAll('nav ul li a');
    
    window.addEventListener('scroll', function() {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            const navbarHeight = document.getElementById('navbar').offsetHeight;
            
            if (window.scrollY >= (sectionTop - navbarHeight - 50)) {
                current = section.getAttribute('id');
            }
        });
        
        navItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href') === `#${current}`) {
                item.classList.add('active');
            }
        });
    });
});