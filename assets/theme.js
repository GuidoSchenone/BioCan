<script>
        // Cart functionality
        let cart = [];
        let currentBundle = 1;
        let quantity = 1;

        const bundlePrices = {
            1: { price: 42990, original: 55000, savings: 12010 },
            2: { price: 75980, original: 95980, savings: 20000 },
            3: { price: 107970, original: 143970, savings: 36000 }
        };
        function toggleFaq(btn) {
        const content = btn.nextElementSibling;
        const icon = btn.querySelector('.faq-icon');
        const isOpen = content.classList.contains('open');

        content.classList.toggle('open', !isOpen);
        icon.classList.toggle('open', !isOpen);
        }
        function faqToggle(btn) {
        const answer = btn.nextElementSibling;
        const chevron = btn.querySelector('.faq-chevron');
        const isOpen = answer.classList.contains('open');

        answer.classList.toggle('open', !isOpen);
        chevron.classList.toggle('open', !isOpen);
        }

        // Image-gallery logic
        function changeMainImage(imageSrc, clickedElement) {
            // 1. Update the main image src
            const mainImg = document.getElementById('main-product-image');
            mainImg.src = imageSrc;

            // 2. Reset all thumbnails
            document.querySelectorAll('.thumbnail').forEach(thumb => {
                thumb.classList.remove('active', 'border-purple-500');
                thumb.classList.add('border-gray-200', 'hover:border-purple-300');
            });

            // 3. Highlight the clicked thumbnail
            clickedElement.classList.remove('border-gray-200', 'hover:border-purple-300');
            clickedElement.classList.add('active', 'border-purple-500');

            // 4. Smooth fade-in effect
            mainImg.style.opacity = 0.6;
            setTimeout(() => mainImg.style.opacity = 1, 120);
        }

        function selectBundle(bundleNum) {
            currentBundle = bundleNum;
            
            // Update visual selection
            document.querySelectorAll('.bundle-card').forEach((card, index) => {
                if (index + 1 === bundleNum) {
                    card.classList.add('active');
                    card.querySelector('.bundle-radio').checked = true;
                } else {
                    card.classList.remove('active');
                }
            });
            
            updateCartTotal();
        }

        function updateQuantity(change) {
            quantity = Math.max(1, quantity + change);
            document.getElementById('quantity').textContent = quantity;
            updateCartTotal();
        }

        function addToCart() {
            const bundleInfo = bundlePrices[currentBundle];
            const item = {
                id: Date.now(),
                name: `NUTRIVET - ${currentBundle} Tarro${currentBundle > 1 ? 's' : ''}`,
                price: bundleInfo.price,
                quantity: quantity,
                image: 'fa-pills'
            };
            
            cart.push(item);
            updateCartUI();
            showAddToCartFeedback();
            
            // Show sticky CTA after first add to cart
            if (cart.length === 1) {
                document.getElementById('sticky-cta').classList.add('visible');
            }
        }

        function updateCartUI() {
            const cartCount = document.getElementById('cart-count');
            const cartItems = document.getElementById('cart-items');
            const cartTotal = document.getElementById('cart-total');
            
            cartCount.textContent = cart.reduce((sum, item) => sum + item.quantity, 0);
            
            if (cart.length === 0) {
                cartItems.innerHTML = '<p class="text-gray-500 text-center">Tu carrito está vacío</p>';
                cartTotal.textContent = '$0';
            } else {
                cartItems.innerHTML = cart.map(item => `
                    <div class="flex items-center space-x-4 mb-4 p-4 border rounded-lg">
                        <div class="w-16 h-16 bg-purple-100 rounded-lg flex items-center justify-center">
                            <i class="fas ${item.image} text-purple-600 text-xl"></i>
                        </div>
                        <div class="flex-1">
                            <h4 class="font-semibold">${item.name}</h4>
                            <p class="text-gray-600">$${item.price.toLocaleString()} x ${item.quantity}</p>
                        </div>
                        <div class="text-right">
                            <p class="font-bold">$${(item.price * item.quantity).toLocaleString()}</p>
                            <button onclick="removeFromCart(${item.id})" class="text-red-500 hover:text-red-700">
                                <i class="fas fa-trash"></i>
                            </button>
                        </div>
                    </div>
                `).join('');
                
                const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
                cartTotal.textContent = `$${total.toLocaleString()}`;
            }
        }

        function removeFromCart(id) {
            cart = cart.filter(item => item.id !== id);
            updateCartUI();
        }

        function updateCartTotal() {
            // This would update any displayed totals on the main page
            const bundleInfo = bundlePrices[currentBundle];
            const total = bundleInfo.price * quantity;
            // Could update a displayed total if needed
        }

        function toggleCart() {
            const cartSidebar = document.getElementById('cart-sidebar');
            cartSidebar.classList.toggle('open');
        }

        function showAddToCartFeedback() {
            // Create a temporary notification
            const notification = document.createElement('div');
            notification.className = 'fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50';
            notification.innerHTML = '<i class="fas fa-check-circle mr-2"></i>¡Producto agregado al carrito!';
            document.body.appendChild(notification);
            
            setTimeout(() => {
                notification.remove();
            }, 3000);
        }

        function toggleAccordion(id) {
            const content = document.getElementById(`content-${id}`);
            const icon = document.getElementById(`icon-${id}`);
            
            content.classList.toggle('active');
            icon.classList.toggle('rotate-180');
        }

        function scrollToTop() {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }

        // Show sticky CTA on scroll
        window.addEventListener('scroll', () => {
            const stickyCTA = document.getElementById('sticky-cta');
            if (window.scrollY > 500 && cart.length === 0) {
                stickyCTA.classList.add('visible');
            } else if (cart.length > 0) {
                stickyCTA.classList.add('visible');
            }
        });

        // Keyboard navigation for images
        document.addEventListener('keydown', (e) => {
            const thumbnails = document.querySelectorAll('.thumbnail');
            const currentIndex = Array.from(thumbnails).findIndex(thumb => 
                thumb.classList.contains('active')
            );
            
            if (e.key === 'ArrowRight' && currentIndex < thumbnails.length - 1) {
                thumbnails[currentIndex + 1].click();
            } else if (e.key === 'ArrowLeft' && currentIndex > 0) {
                thumbnails[currentIndex - 1].click();
            }
        });

        // Initialize
        document.addEventListener('DOMContentLoaded', () => {
            selectBundle(1);
        });
    </script>
