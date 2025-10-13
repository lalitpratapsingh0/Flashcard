
        // Product data
        const products = [
            {
                id: 1,
                name: "Organic Heirloom Tomatoes",
                price: 8.99,
                category: "vegetables",
                description: "Vine-ripened heirloom tomatoes bursting with flavor",
                image: "linear-gradient(135deg, #ff6b6b, #ee5a24)",
                badge: "Organic"
            },
            {
                id: 2,
                name: "Fresh Avocados",
                price: 12.99,
                category: "fruits",
                description: "Perfectly ripe Hass avocados from California",
                image: "linear-gradient(135deg, #2ecc71, #27ae60)",
                badge: "Fresh"
            },
            {
                id: 3,
                name: "Artisan Sourdough Bread",
                price: 6.50,
                category: "bakery",
                description: "Hand-crafted sourdough with a perfect crust",
                image: "linear-gradient(135deg, #f39c12, #e67e22)",
                badge: "Artisan"
            },
            {
                id: 4,
                name: "Grass-Fed Ribeye Steak",
                price: 28.99,
                category: "meat",
                description: "Premium grass-fed beef, dry-aged for tenderness",
                image: "linear-gradient(135deg, #e74c3c, #c0392b)",
                badge: "Premium"
            },
            {
                id: 5,
                name: "Farm Fresh Eggs",
                price: 5.99,
                category: "dairy",
                description: "Free-range eggs from happy chickens",
                image: "linear-gradient(135deg, #f1c40f, #f39c12)",
                badge: "Farm Fresh"
            },
            {
                id: 6,
                name: "Organic Baby Spinach",
                price: 4.99,
                category: "vegetables",
                description: "Tender baby spinach leaves, perfect for salads",
                image: "linear-gradient(135deg, #2ecc71, #16a085)",
                badge: "Organic"
            },
            {
                id: 7,
                name: "Wild Blueberries",
                price: 9.99,
                category: "fruits",
                description: "Sweet wild blueberries packed with antioxidants",
                image: "linear-gradient(135deg, #8e44ad, #9b59b6)",
                badge: "Wild"
            },
            {
                id: 8,
                name: "Aged Cheddar Cheese",
                price: 15.99,
                category: "dairy",
                description: "Sharp aged cheddar with complex flavors",
                image: "linear-gradient(135deg, #f39c12, #d35400)",
                badge: "Aged"
            },
            {
                id: 9,
                name: "Croissant Variety Pack",
                price: 11.99,
                category: "bakery",
                description: "Buttery croissants in almond, chocolate, and plain",
                image: "linear-gradient(135deg, #f1c40f, #e67e22)",
                badge: "Variety"
            }
        ];

        let cart = [];
        let currentCategory = 'all';

        // Initialize the page
        function init() {
            renderProducts();
            updateCartUI();
        }

        // Render products
        function renderProducts() {
            const productGrid = document.getElementById('productGrid');
            const filteredProducts = currentCategory === 'all' 
                ? products 
                : products.filter(product => product.category === currentCategory);

            productGrid.innerHTML = filteredProducts.map(product => `
                <div class="product-card" style="animation-delay: ${Math.random() * 0.5}s">
                    <div class="product-image" style="background: ${product.image}">
                        <div class="product-badge">${product.badge}</div>
                    </div>
                    <div class="product-info">
                        <div class="product-name">${product.name}</div>
                        <div class="product-description">${product.description}</div>
                        <div class="product-footer">
                            <div class="product-price">$${product.price}</div>
                            <button class="add-to-cart" onclick="addToCart(${product.id})">
                                Add to Cart
                            </button>
                        </div>
                    </div>
                </div>
            `).join('');
        }

        // Filter products by category
        function filterProducts(category) {
            currentCategory = category;
            
            // Update active category
            document.querySelectorAll('.category-card').forEach(card => {
                card.classList.remove('active');
            });
            event.target.closest('.category-card').classList.add('active');
            
            renderProducts();
        }

        // Add to cart
        function addToCart(productId) {
            const product = products.find(p => p.id === productId);
            const existingItem = cart.find(item => item.id === productId);

            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                cart.push({ ...product, quantity: 1 });
            }

            updateCartUI();
            
            // Visual feedback
            const button = event.target;
            const originalText = button.textContent;
            button.textContent = '✓ Added!';
            button.style.background = 'linear-gradient(135deg, #48bb78, #38a169)';
            
            setTimeout(() => {
                button.textContent = originalText;
                button.style.background = 'linear-gradient(135deg, #48bb78, #38a169)';
            }, 1000);
        }

        // Update cart UI
        function updateCartUI() {
            const cartCount = document.getElementById('cartCount');
            const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
            cartCount.textContent = totalItems;
            cartCount.style.display = totalItems > 0 ? 'flex' : 'none';

            renderCartItems();
        }

        // Render cart items
        function renderCartItems() {
            const cartItems = document.getElementById('cartItems');
            const cartTotal = document.getElementById('cartTotal');

            if (cart.length === 0) {
                cartItems.innerHTML = '<div class="empty-cart">Your cart is empty</div>';
                cartTotal.textContent = 'Total: $0.00';
                return;
            }

            cartItems.innerHTML = cart.map(item => `
                <div class="cart-item">
                    <div>
                        <strong>${item.name}</strong><br>
                        <small>$${item.price} each</small>
                    </div>
                    <div style="display: flex; align-items: center; gap: 1rem;">
                        <button onclick="updateQuantity(${item.id}, -1)" style="background: #e53e3e; color: white; border: none; border-radius: 50%; width: 30px; height: 30px; cursor: pointer;">-</button>
                        <span style="font-weight: bold; min-width: 20px; text-align: center;">${item.quantity}</span>
                        <button onclick="updateQuantity(${item.id}, 1)" style="background: #48bb78; color: white; border: none; border-radius: 50%; width: 30px; height: 30px; cursor: pointer;">+</button>
                        <span style="font-weight: bold; color: #667eea;">$${(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                </div>
            `).join('');

            const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
            cartTotal.textContent = `Total: $${total.toFixed(2)}`;
        }

        // Update quantity
        function updateQuantity(productId, change) {
            const item = cart.find(item => item.id === productId);
            if (item) {
                item.quantity += change;
                if (item.quantity <= 0) {
                    cart = cart.filter(item => item.id !== productId);
                }
                updateCartUI();
            }
        }

        // Toggle cart modal
        function toggleCart() {
            const modal = document.getElementById('cartModal');
            modal.style.display = modal.style.display === 'block' ? 'none' : 'block';
        }

        // Checkout
        function checkout() {
            if (cart.length === 0) {
                alert('Your cart is empty!');
                return;
            }

            const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
            alert(`Thank you for your order! Total: $${total.toFixed(2)}\n\nThis is a demo - no actual payment was processed.`);
            
            cart = [];
            updateCartUI();
            toggleCart();
        }

        // Close modal when clicking outside
        window.onclick = function(event) {
            const modal = document.getElementById('cartModal');
            if (event.target === modal) {
                toggleCart();
            }
        }

        // Initialize the application
        init();
    