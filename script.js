// JavaScript para interatividade avançada

document.addEventListener('DOMContentLoaded', () => {
    // Intersection Observer para animações
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);

    // Observar elementos para animação
    document.querySelectorAll('.product-card, .category-item, .benefit-item').forEach(el => {
        observer.observe(el);
    });

    // Menu Hambúrguer com animação
    const hamburgerBtn = document.querySelector('.hamburger-menu');
    const navLinks = document.querySelector('.nav-links');
    let isMenuOpen = false;

    hamburgerBtn.addEventListener('click', () => {
        isMenuOpen = !isMenuOpen;
        navLinks.classList.toggle('active');
        
        // Animação do ícone hambúrguer
        if (isMenuOpen) {
            hamburgerBtn.innerHTML = '✕';
            hamburgerBtn.style.transform = 'rotate(180deg)';
        } else {
            hamburgerBtn.innerHTML = '☰';
            hamburgerBtn.style.transform = 'rotate(0deg)';
        }
    });

    // Fechar menu ao clicar fora
    document.addEventListener('click', (e) => {
        if (!hamburgerBtn.contains(e.target) && !navLinks.contains(e.target) && isMenuOpen) {
            navLinks.classList.remove('active');
            hamburgerBtn.innerHTML = '☰';
            hamburgerBtn.style.transform = 'rotate(0deg)';
            isMenuOpen = false;
        }
    });

    // Scroll suave para links internos
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

    // Carrinho de Compras com animações
    const cartCount = document.querySelector('.cart-count');
    let itemCount = 0;

    function attachCartListeners() {
        document.querySelectorAll('.add-to-cart-btn').forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                
                // Animação do botão
                button.style.transform = 'scale(0.95)';
                setTimeout(() => {
                    button.style.transform = 'scale(1)';
                }, 150);

                itemCount++;
                cartCount.textContent = itemCount;
                
                // Animação do contador
                cartCount.style.animation = 'none';
                setTimeout(() => {
                    cartCount.style.animation = 'pulse 0.5s ease';
                }, 10);

                // Notificação toast
                showToast('Item adicionado ao carrinho!', 'success');
                
                // Redirecionar após um delay
                setTimeout(() => {
                    window.location.href = e.target.href;
                }, 1000);
            });
        });
    }

    // Sistema de notificações toast
    function showToast(message, type = 'info') {
        const toast = document.createElement('div');
        toast.className = `toast toast-${type}`;
        toast.textContent = message;
        
        toast.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${type === 'success' ? '#10b981' : '#3b82f6'};
            color: white;
            padding: 12px 24px;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
            z-index: 10000;
            transform: translateX(100%);
            transition: transform 0.3s ease;
        `;
        
        document.body.appendChild(toast);
        
        setTimeout(() => {
            toast.style.transform = 'translateX(0)';
        }, 100);
        
        setTimeout(() => {
            toast.style.transform = 'translateX(100%)';
            setTimeout(() => {
                document.body.removeChild(toast);
            }, 300);
        }, 3000);
    }

    // Filtros de categoria com animações
    const categoryFilter = document.querySelector('.filter-category');
    const sortBy = document.querySelector('.sort-by');
    const searchIcon = document.querySelector('.search-icon');

    // Busca avançada
    let searchModal = null;

    searchIcon.addEventListener('click', () => {
        if (!searchModal) {
            createSearchModal();
        }
        searchModal.style.display = 'flex';
        setTimeout(() => {
            searchModal.classList.add('active');
        }, 10);
    });

    function createSearchModal() {
        searchModal = document.createElement('div');
        searchModal.className = 'search-modal';
        searchModal.innerHTML = `
            <div class="search-modal-content">
                <div class="search-header">
                    <h3>Buscar Baterias</h3>
                    <button class="close-search">✕</button>
                </div>
                <div class="search-body">
                    <input type="text" id="search-input" placeholder="Digite o nome da bateria ou modelo do veículo...">
                    <div class="search-filters">
                        <select id="search-category">
                            <option value="">Todas as categorias</option>
                            <option value="automotiva">Automotiva</option>
                            <option value="moto">Moto</option>
                            <option value="pesada">Pesada</option>
                            <option value="nautica">Náutica</option>
                        </select>
                        <input type="range" id="price-range" min="100" max="1000" value="500">
                        <span id="price-display">Até R$ 500</span>
                    </div>
                    <div class="search-results"></div>
                </div>
            </div>
        `;

        searchModal.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,0.8);
            display: none;
            align-items: center;
            justify-content: center;
            z-index: 10000;
            opacity: 0;
            transition: opacity 0.3s ease;
        `;

        const modalContent = searchModal.querySelector('.search-modal-content');
        modalContent.style.cssText = `
            background: white;
            border-radius: 12px;
            padding: 30px;
            max-width: 500px;
            width: 90%;
            max-height: 80vh;
            overflow-y: auto;
            transform: scale(0.9);
            transition: transform 0.3s ease;
        `;

        document.body.appendChild(searchModal);

        // Event listeners para o modal
        searchModal.querySelector('.close-search').addEventListener('click', closeSearchModal);
        searchModal.addEventListener('click', (e) => {
            if (e.target === searchModal) closeSearchModal();
        });

        const searchInput = searchModal.querySelector('#search-input');
        const priceRange = searchModal.querySelector('#price-range');
        const priceDisplay = searchModal.querySelector('#price-display');

        priceRange.addEventListener('input', (e) => {
            priceDisplay.textContent = `Até R$ ${e.target.value}`;
        });

        searchInput.addEventListener('input', performSearch);
    }

    function closeSearchModal() {
        searchModal.classList.remove('active');
        setTimeout(() => {
            searchModal.style.display = 'none';
        }, 300);
    }

    // Adicionar classe active ao modal
    searchModal && searchModal.classList.add('active') && (searchModal.style.opacity = '1') && 
    (searchModal.querySelector('.search-modal-content').style.transform = 'scale(1)');

    function performSearch() {
        const searchTerm = searchModal.querySelector('#search-input').value.toLowerCase();
        const searchResults = searchModal.querySelector('.search-results');
        
        if (searchTerm.length < 2) {
            searchResults.innerHTML = '';
            return;
        }

        // Simular busca (em um app real, seria uma chamada à API)
        const mockResults = [
            'Bateria Moura M60GD 12V 60Ah',
            'Bateria Moura MA6-D 12V 6Ah',
            'Bateria Moura M180BD 12V 180Ah'
        ].filter(item => item.toLowerCase().includes(searchTerm));

        searchResults.innerHTML = mockResults.map(result => 
            `<div class="search-result-item">${result}</div>`
        ).join('');
    }

    categoryFilter.addEventListener('change', () => {
        filterProducts();
        showToast(`Filtro aplicado: ${categoryFilter.options[categoryFilter.selectedIndex].text}`, 'info');
    });

    sortBy.addEventListener('change', () => {
        sortProducts();
        showToast(`Ordenação: ${sortBy.options[sortBy.selectedIndex].text}`, 'info');
    });

    function filterProducts() {
        const selectedCategory = categoryFilter.value;
        const productCards = document.querySelectorAll('.product-card');

        productCards.forEach((card, index) => {
            setTimeout(() => {
                if (selectedCategory === 'all' || card.dataset.category === selectedCategory) {
                    card.style.display = 'block';
                    card.style.animation = 'fadeInUp 0.5s ease forwards';
                } else {
                    card.style.animation = 'fadeOut 0.3s ease forwards';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            }, index * 50);
        });
    }

    function sortProducts() {
        const sortValue = sortBy.value;
        const productGrid = document.querySelector('.product-grid');
        const productCards = Array.from(document.querySelectorAll('.product-card'));

        productCards.sort((a, b) => {
            const priceA = parseFloat(a.querySelector('.price').textContent.replace('R$ ', '').replace(',', '.'));
            const priceB = parseFloat(b.querySelector('.price').textContent.replace('R$ ', '').replace(',', '.'));

            switch (sortValue) {
                case 'preco-menor':
                    return priceA - priceB;
                case 'preco-maior':
                    return priceB - priceA;
                default:
                    return 0;
            }
        });

        // Animação de reordenação
        productCards.forEach((card, index) => {
            card.style.animation = 'fadeOut 0.2s ease forwards';
            setTimeout(() => {
                productGrid.appendChild(card);
                card.style.animation = 'fadeInUp 0.4s ease forwards';
            }, 200 + (index * 50));
        });
    }

    // Função para carregar produtos (scroll infinito)
    function loadProducts() {
        const productGrid = document.querySelector('.product-grid');
        const products = [
            {
                name: "Bateria Moura M60GD 12V 60Ah",
                price: 289.90,
                installment: 28.99,
                image: "../img/bateria_carro.webp",
                category: "automotiva"
            },
            {
                name: "Bateria Moura MA6-D 12V 6Ah",
                price: 159.90,
                installment: 15.99,
                image: "../img/bateria_moto.png",
                category: "moto"
            },
            {
                name: "Bateria Moura M180BD 12V 180Ah",
                price: 899.90,
                installment: 89.99,
                image: "../img/bateria_caminhao.jpg",
                category: "pesada"
            },
            {
                name: "Bateria Moura 12MB105 12V 105Ah",
                price: 649.90,
                installment: 64.99,
                image: "../img/bateria_nautica.webp",
                category: "nautica"
            },
            {
                name: "Bateria Moura M48FE 12V 48Ah",
                price: 239.90,
                installment: 23.99,
                image: "../img/bateria_carro.webp",
                category: "automotiva"
            },
            {
                name: "Bateria Moura MA10-E 12V 10Ah",
                price: 189.90,
                installment: 18.99,
                image: "../img/bateria_moto.png",
                category: "moto"
            }
        ];

        products.forEach(product => {
            const productCard = `
                <div class="product-card" data-category="${product.category}">
                    <img src="${product.image}" alt="${product.name}">
                    <h3>${product.name}</h3>
                    <p class="price">R$ ${product.price.toFixed(2)}</p>
                    <p class="installment">em até 10x de R$ ${product.installment.toFixed(2)}</p>
                    <span class="guarantee">Garantia Moura inclusa</span>
                    <a href="https://exemplo.com" class="add-to-cart-btn">Adicionar ao carrinho</a>
                </div>
            `;
            productGrid.innerHTML += productCard;
        });

        // Reattach event listeners for new products
        attachCartListeners();
    }

    loadProducts(); // Carregar produtos iniciais

    // Placeholder para carrossel de ofertas
    function loadOffers() {
        const carousel = document.querySelector('.carousel');
        for (let i = 0; i < 3; i++) {
            const offerCard = `
                <div class="offer-card">
                    <img src="https://via.placeholder.com/200x150" alt="Oferta ${i+1}">
                    <h3>Bateria em Oferta ${i+1}</h3>
                    <p class="old-price">R$ ${(250 + i * 15).toFixed(2)}</p>
                    <p class="new-price">R$ ${(200 + i * 10).toFixed(2)}</p>
                    <a href="#" class="btn-primary">Ver Oferta</a>
                </div>
            `;
            carousel.innerHTML += offerCard;
        }
    }
    loadOffers();

    // Placeholder para depoimentos
    function loadTestimonials() {
        const testimonialSlider = document.querySelector('.testimonial-slider');
        const testimonialsData = [
            { text: "Excelente bateria, durabilidade incrível! Recomendo a todos.", author: "João S." },
            { text: "Atendimento e produto de primeira linha. Muito satisfeito com a Moura.", author: "Maria P." },
            { text: "Nunca mais tive problemas com bateria depois que comecei a usar Moura.", author: "Carlos R." }
        ];

        testimonialsData.forEach(testimonial => {
            const testimonialCard = `
                <div class="testimonial-card">
                    <p>"${testimonial.text}"</p>
                    <p class="author">- ${testimonial.author}</p>
                </div>
            `;
            testimonialSlider.innerHTML += testimonialCard;
        });
    }
    loadTestimonials();

    // Placeholder para busca por veículo
    const brandSelect = document.getElementById('brand');
    const modelSelect = document.getElementById('model');
    const yearSelect = document.getElementById('year');
    const searchForm = document.querySelector('.vehicle-search .search-form');
    const compatibleBatteriesDiv = document.querySelector('.compatible-batteries');

    // Popular marcas (exemplo)
    const brands = ["Fiat", "Volkswagen", "Chevrolet"];
    brands.forEach(brand => {
        const option = document.createElement('option');
        option.value = brand.toLowerCase();
        option.textContent = brand;
        brandSelect.appendChild(option);
    });

    // Lógica de busca (apenas exemplo)
    searchForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const selectedBrand = brandSelect.value;
        const selectedModel = modelSelect.value;
        const selectedYear = yearSelect.value;

        if (selectedBrand && selectedModel && selectedYear) {
            compatibleBatteriesDiv.innerHTML = `<p>Baterias compatíveis para ${selectedBrand} ${selectedModel} ${selectedYear} serão exibidas aqui.</p>`;
        } else {
            compatibleBatteriesDiv.innerHTML = `<p>Por favor, selecione Marca, Modelo e Ano.</p>`;
        }
    });

    // Placeholder para geolocalização (CTA secundária)
    document.querySelector('.cta-secondary .btn-secondary').addEventListener('click', () => {
        alert('Funcionalidade de geolocalização para encontrar lojas será implementada aqui.');
        // Exemplo de uso da API de Geolocalização do navegador
        // if (navigator.geolocation) {
        //     navigator.geolocation.getCurrentPosition((position) => {
        //         console.log(`Latitude: ${position.coords.latitude}, Longitude: ${position.coords.longitude}`);
        //         // Integrar com API de mapas para encontrar lojas próximas
        //     });
        // } else {
        //     alert('Geolocalização não é suportada pelo seu navegador.');
        // }
    });
});


