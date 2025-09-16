// Dados dos produtos (simulação de API)
const products = [
    {
        id: 1,
        name: "Bateria Moura M60GD 12V 60Ah",
        price: 299.90,
        installments: "12x de R$ 24,99 sem juros",
        image: "img/MJtDhi4YX1Oo.webp",
        category: "automotiva",
        amperage: 60,
        popular: true
    },
    {
        id: 2,
        name: "Bateria Moura MA5-D 5Ah Moto",
        price: 149.90,
        installments: "6x de R$ 24,98 sem juros",
        image: "img/ymERAiGjNqCK.jpg",
        category: "moto",
        amperage: 5,
        popular: true
    },
    {
        id: 3,
        name: "Bateria Moura M150BD 150Ah Pesada",
        price: 899.90,
        installments: "12x de R$ 74,99 sem juros",
        image: "img/QolTelpqWUHn.webp",
        category: "pesada",
        amperage: 150,
        popular: false
    },
    {
        id: 4,
        name: "Bateria Moura 12MB105 105Ah Náutica",
        price: 649.90,
        installments: "12x de R$ 54,16 sem juros",
        image: "img/GEZEIQOFMJRp.webp",
        category: "nautica",
        amperage: 105,
        popular: false
    },
    {
        id: 5,
        name: "Bateria Moura M50ED 12V 50Ah",
        price: 249.90,
        installments: "10x de R$ 24,99 sem juros",
        image: "img/k7AEyLPF3sEo.jpg",
        category: "automotiva",
        amperage: 50,
        popular: true
    },
    {
        id: 6,
        name: "Bateria Moura MA8.6-E 8.6Ah Moto",
        price: 189.90,
        installments: "8x de R$ 23,74 sem juros",
        image: "img/aYGKFN31I3PJ.jpg",
        category: "moto",
        amperage: 8.6,
        popular: false
    },
    {
        id: 7,
        name: "Bateria Moura M75LD 12V 75Ah",
        price: 349.90,
        installments: "12x de R$ 29,16 sem juros",
        image: "img/VwiA8LvfYxbQ.jpg",
        category: "automotiva",
        amperage: 75,
        popular: true
    },
    {
        id: 8,
        name: "Bateria Moura 12MB220 220Ah Náutica",
        price: 1299.90,
        installments: "12x de R$ 108,33 sem juros",
        image: "img/bS81PSsCxp49.webp",
        category: "nautica",
        amperage: 220,
        popular: false
    }
];

// Dados de veículos (simulação)
const vehicleData = {
    volkswagen: {
        gol: ['2020', '2021', '2022', '2023', '2024'],
        polo: ['2020', '2021', '2022', '2023', '2024'],
        jetta: ['2020', '2021', '2022', '2023', '2024']
    },
    chevrolet: {
        onix: ['2020', '2021', '2022', '2023', '2024'],
        cruze: ['2020', '2021', '2022', '2023', '2024'],
        tracker: ['2020', '2021', '2022', '2023', '2024']
    },
    ford: {
        ka: ['2020', '2021', '2022', '2023', '2024'],
        ecosport: ['2020', '2021', '2022', '2023', '2024'],
        ranger: ['2020', '2021', '2022', '2023', '2024']
    },
    fiat: {
        argo: ['2020', '2021', '2022', '2023', '2024'],
        uno: ['2020', '2021', '2022', '2023', '2024'],
        toro: ['2020', '2021', '2022', '2023', '2024']
    },
    toyota: {
        corolla: ['2020', '2021', '2022', '2023', '2024'],
        hilux: ['2020', '2021', '2022', '2023', '2024'],
        etios: ['2020', '2021', '2022', '2023', '2024']
    },
    honda: {
        civic: ['2020', '2021', '2022', '2023', '2024'],
        fit: ['2020', '2021', '2022', '2023', '2024'],
        hrv: ['2020', '2021', '2022', '2023', '2024']
    },
    hyundai: {
        hb20: ['2020', '2021', '2022', '2023', '2024'],
        creta: ['2020', '2021', '2022', '2023', '2024'],
        tucson: ['2020', '2021', '2022', '2023', '2024']
    },
    nissan: {
        march: ['2020', '2021', '2022', '2023', '2024'],
        versa: ['2020', '2021', '2022', '2023', '2024'],
        kicks: ['2020', '2021', '2022', '2023', '2024']
    }
};

// Estado da aplicação
let currentProducts = [...products];
let displayedProducts = [];
let currentPage = 0;
const productsPerPage = 6;
let cartCount = 0;

// Elementos DOM
const menuToggle = document.querySelector('.menu-toggle');
const sidebarMenu = document.querySelector('.sidebar-menu');
const closeMenu = document.querySelector('.close-menu');
const productsGrid = document.getElementById('products-grid');
const loading = document.getElementById('loading');
const cartCountElement = document.querySelector('.cart-count');

// Filtros
const categoryFilter = document.getElementById('category-filter');
const priceFilter = document.getElementById('price-filter');
const sortFilter = document.getElementById('sort-filter');

// Busca por veículo
const brandSelect = document.getElementById('brand');
const modelSelect = document.getElementById('model');
const yearSelect = document.getElementById('year');
const searchBtnForm = document.querySelector('.search-btn-form');

// Depoimentos
const testimonialCards = document.querySelectorAll('.testimonial-card');
const navDots = document.querySelectorAll('.nav-dot');
let currentTestimonial = 0;

// Inicialização
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    setupEventListeners();
    loadInitialProducts();
    setupInfiniteScroll();
    setupTestimonialsSlider();
    setupVehicleSearch();
}

function setupEventListeners() {
    // Menu lateral
    menuToggle.addEventListener('click', openSidebar);
    closeMenu.addEventListener('click', closeSidebar);
    
    // Clique fora do menu para fechar
    document.addEventListener('click', function(e) {
        if (!sidebarMenu.contains(e.target) && !menuToggle.contains(e.target)) {
            closeSidebar();
        }
    });
    
    // Filtros
    categoryFilter.addEventListener('change', applyFilters);
    priceFilter.addEventListener('change', applyFilters);
    sortFilter.addEventListener('change', applyFilters);
    
    // Categorias
    document.querySelectorAll('.category-card').forEach(card => {
        card.addEventListener('click', function() {
            const category = this.dataset.category;
            categoryFilter.value = category;
            applyFilters();
            document.getElementById('produtos').scrollIntoView({ behavior: 'smooth' });
        });
    });
    
    // CTA buttons
    document.querySelector('.cta-btn').addEventListener('click', function() {
        document.getElementById('produtos').scrollIntoView({ behavior: 'smooth' });
    });
    
    // Localização
    document.querySelector('.location-btn').addEventListener('click', function() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function(position) {
                alert('Funcionalidade de localização será implementada em breve!');
            }, function() {
                alert('Não foi possível acessar sua localização. Tente novamente.');
            });
        } else {
            alert('Geolocalização não é suportada neste navegador.');
        }
    });
}

function openSidebar() {
    sidebarMenu.classList.add('active');
}

function closeSidebar() {
    sidebarMenu.classList.remove('active');
}

function loadInitialProducts() {
    displayedProducts = [];
    currentPage = 0;
    productsGrid.innerHTML = '';
    loadMoreProducts();
}

function loadMoreProducts() {
    const startIndex = currentPage * productsPerPage;
    const endIndex = startIndex + productsPerPage;
    const newProducts = currentProducts.slice(startIndex, endIndex);
    
    if (newProducts.length === 0) {
        loading.style.display = 'none';
        return;
    }
    
    newProducts.forEach(product => {
        displayedProducts.push(product);
        const productCard = createProductCard(product);
        productsGrid.appendChild(productCard);
    });
    
    currentPage++;
    
    // Mostrar loading se ainda há produtos para carregar
    if (endIndex < currentProducts.length) {
        loading.style.display = 'block';
    } else {
        loading.style.display = 'none';
    }
}

function createProductCard(product) {
    const card = document.createElement('div');
    card.className = 'product-card';
    card.innerHTML = `
        <img src="${product.image}" alt="${product.name}" class="product-image" onerror="this.src='img/MJtDhi4YX1Oo.webp'">
        <h3 class="product-name">${product.name}</h3>
        <div class="product-price">R$ ${product.price.toFixed(2).replace('.', ',')}</div>
        <div class="product-installments">${product.installments}</div>
        <div class="warranty-badge">Garantia Moura inclusa</div>
        <button class="add-to-cart" onclick="addToCart(${product.id})">Adicionar ao carrinho</button>
    `;
    return card;
}

function addToCart(productId) {
    cartCount++;
    cartCountElement.textContent = cartCount;
    
    // Simular redirecionamento para link específico
    const product = products.find(p => p.id === productId);
    if (product) {
        // Aqui você pode redirecionar para o link específico
        // window.location.href = `https://exemplo.com/produto/${productId}`;
        alert(`${product.name} adicionado ao carrinho!`);
    }
}

function applyFilters() {
    const category = categoryFilter.value;
    const priceRange = priceFilter.value;
    const sortBy = sortFilter.value;
    
    // Filtrar produtos
    currentProducts = products.filter(product => {
        // Filtro por categoria
        if (category && product.category !== category) {
            return false;
        }
        
        // Filtro por preço
        if (priceRange) {
            const [min, max] = priceRange.split('-').map(p => p.replace('+', ''));
            const minPrice = parseInt(min);
            const maxPrice = max ? parseInt(max) : Infinity;
            
            if (product.price < minPrice || product.price > maxPrice) {
                return false;
            }
        }
        
        return true;
    });
    
    // Ordenar produtos
    switch (sortBy) {
        case 'price-asc':
            currentProducts.sort((a, b) => a.price - b.price);
            break;
        case 'price-desc':
            currentProducts.sort((a, b) => b.price - a.price);
            break;
        case 'newest':
            currentProducts.sort((a, b) => b.id - a.id);
            break;
        case 'popular':
        default:
            currentProducts.sort((a, b) => {
                if (a.popular && !b.popular) return -1;
                if (!a.popular && b.popular) return 1;
                return 0;
            });
            break;
    }
    
    loadInitialProducts();
}

function setupInfiniteScroll() {
    window.addEventListener('scroll', function() {
        if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000) {
            if (loading.style.display !== 'none') {
                loadMoreProducts();
            }
        }
    });
}

function setupTestimonialsSlider() {
    // Auto-play dos depoimentos
    setInterval(nextTestimonial, 5000);
    
    // Navegação manual
    navDots.forEach((dot, index) => {
        dot.addEventListener('click', () => showTestimonial(index));
    });
}

function showTestimonial(index) {
    testimonialCards.forEach(card => card.classList.remove('active'));
    navDots.forEach(dot => dot.classList.remove('active'));
    
    testimonialCards[index].classList.add('active');
    navDots[index].classList.add('active');
    
    currentTestimonial = index;
}

function nextTestimonial() {
    currentTestimonial = (currentTestimonial + 1) % testimonialCards.length;
    showTestimonial(currentTestimonial);
}

function setupVehicleSearch() {
    brandSelect.addEventListener('change', function() {
        const selectedBrand = this.value;
        
        // Limpar e habilitar select de modelo
        modelSelect.innerHTML = '<option value="">Selecione o modelo</option>';
        modelSelect.disabled = !selectedBrand;
        
        // Limpar e desabilitar select de ano
        yearSelect.innerHTML = '<option value="">Primeiro selecione o modelo</option>';
        yearSelect.disabled = true;
        
        if (selectedBrand && vehicleData[selectedBrand]) {
            Object.keys(vehicleData[selectedBrand]).forEach(model => {
                const option = document.createElement('option');
                option.value = model;
                option.textContent = model.charAt(0).toUpperCase() + model.slice(1);
                modelSelect.appendChild(option);
            });
        }
    });
    
    modelSelect.addEventListener('change', function() {
        const selectedBrand = brandSelect.value;
        const selectedModel = this.value;
        
        // Limpar e habilitar select de ano
        yearSelect.innerHTML = '<option value="">Selecione o ano</option>';
        yearSelect.disabled = !selectedModel;
        
        if (selectedBrand && selectedModel && vehicleData[selectedBrand][selectedModel]) {
            vehicleData[selectedBrand][selectedModel].forEach(year => {
                const option = document.createElement('option');
                option.value = year;
                option.textContent = year;
                yearSelect.appendChild(option);
            });
        }
    });
    
    searchBtnForm.addEventListener('click', function() {
        const brand = brandSelect.value;
        const model = modelSelect.value;
        const year = yearSelect.value;
        
        if (brand && model && year) {
            // Simular busca de bateria compatível
            alert(`Buscando bateria compatível para ${brand.charAt(0).toUpperCase() + brand.slice(1)} ${model.charAt(0).toUpperCase() + model.slice(1)} ${year}...`);
            
            // Filtrar por categoria automotiva e redirecionar
            categoryFilter.value = 'automotiva';
            applyFilters();
            document.getElementById('produtos').scrollIntoView({ behavior: 'smooth' });
        } else {
            alert('Por favor, selecione marca, modelo e ano do seu veículo.');
        }
    });
}

// Smooth scroll para links internos
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
        closeSidebar();
    });
});

// Animações ao scroll
function animateOnScroll() {
    const elements = document.querySelectorAll('.product-card, .category-card, .benefit-item');
    
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < window.innerHeight - elementVisible) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });
}

// Inicializar animações
window.addEventListener('scroll', animateOnScroll);

// CSS para animações (adicionar via JavaScript)
const style = document.createElement('style');
style.textContent = `
    .product-card, .category-card, .benefit-item {
        opacity: 0;
        transform: translateY(20px);
        transition: opacity 0.6s ease, transform 0.6s ease;
    }
`;
document.head.appendChild(style);

// Executar animação inicial
setTimeout(animateOnScroll, 100);

