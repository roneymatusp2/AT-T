// MODO EXTREMO - Eliminador agressivo de blur e efeitos
document.addEventListener('DOMContentLoaded', function() {
    console.log('🔥 MODO EXTREMO ANTIBLUR ATIVADO 🔥');

    // Cache para imagens originais
    const originalImages = new Map();
    const originalBackgrounds = new Map();

    // Função que remove qualquer tipo de blur de um elemento
    function removeBlur(element) {
        if (!element || element.nodeType !== 1) return;

        // Remover todos os estilos que causam blur
        const importantStyles = {
            'filter': 'none',
            '-webkit-filter': 'none',
            '-moz-filter': 'none',
            '-o-filter': 'none',
            '-ms-filter': 'none',
            'backdrop-filter': 'none',
            '-webkit-backdrop-filter': 'none',
            'transform': 'none',
            '-webkit-transform': 'none',
            '-moz-transform': 'none',
            '-o-transform': 'none',
            '-ms-transform': 'none',
            'transition': 'none',
            '-webkit-transition': 'none',
            'animation': 'none',
            '-webkit-animation': 'none',
            'background-blend-mode': 'normal',
            'mix-blend-mode': 'normal',
            'opacity': '1',
            'visibility': 'visible',
            'text-shadow': 'none',
            'box-shadow': 'none',
            'mask-image': 'none',
            '-webkit-mask-image': 'none',
            'perspective': 'none',
            '-webkit-perspective': 'none',
            'transform-style': 'flat',
            '-webkit-transform-style': 'flat',
            'backface-visibility': 'visible',
            '-webkit-backface-visibility': 'visible',
            'will-change': 'auto'
        };

        // Aplicar estilos importantes
        for (const [prop, value] of Object.entries(importantStyles)) {
            element.style.setProperty(prop, value, 'important');
        }

        // Verificar se é elemento de overlay
        if (element.classList && (
            element.classList.contains('overlay') || 
            /overlay/.test(element.className) || 
            element.classList.contains('hero-slide') ||
            element.classList.contains('bg-image') ||
            element.classList.contains('slick-slide') ||
            element.classList.contains('owl-item') ||
            element.classList.contains('carousel-item')
        )) {
            // Remove qualquer background gradiente ou overlay
            element.style.setProperty('background', 'none', 'important');
            element.style.setProperty('background-color', 'transparent', 'important');
            element.style.setProperty('z-index', '1', 'important');
        }

        // Desativar qualquer animação
        if (element.classList) {
            const animationClasses = ['animate__animated', 'wow', 'aos-animate', 'animated', 'motion', 'gsap-animate'];
            animationClasses.forEach(cls => {
                if (element.classList.contains(cls)) {
                    element.classList.remove(cls);
                }
            });

            // Remover data attributes relacionados a animações
            ['data-aos', 'data-animation', 'data-animate', 'data-wow-delay'].forEach(attr => {
                if (element.hasAttribute(attr)) {
                    element.removeAttribute(attr);
                }
            });
        }

        // Melhorar a qualidade das imagens
        if (element.tagName === 'IMG') {
            element.style.setProperty('filter', 'contrast(1.1)', 'important');
            element.style.setProperty('-webkit-filter', 'contrast(1.1)', 'important');
            element.style.setProperty('image-rendering', '-webkit-optimize-contrast', 'important');
            element.style.setProperty('transform', 'translateZ(0)', 'important');
            element.style.setProperty('backface-visibility', 'hidden', 'important');
            
            // Armazenar a imagem original se ainda não foi armazenada
            if (!originalImages.has(element)) {
                originalImages.set(element, element.src);
            }
            
            // Garantir que a imagem esteja visível
            element.style.setProperty('opacity', '1', 'important');
            element.style.setProperty('visibility', 'visible', 'important');
        }
        
        // Eliminar qualquer backdrop
        element.style.removeProperty('backdrop-filter');
        element.style.removeProperty('-webkit-backdrop-filter');
    }

    // Processar imagens de fundo
    function processBackgroundImages() {
        const elementsWithBgImage = document.querySelectorAll('[style*="background-image"], .bg-image, .bg-cover, .bg-fixed, .bg-parallax, .hero-section, .hero-banner, .hero-image');
        
        elementsWithBgImage.forEach(element => {
            // Salvar o background original se não estiver já salvo
            if (!originalBackgrounds.has(element)) {
                const computedStyle = window.getComputedStyle(element);
                originalBackgrounds.set(element, computedStyle.backgroundImage);
            }
            
            // Certificar que a imagem de fundo está sendo mostrada corretamente
            if (originalBackgrounds.get(element) && originalBackgrounds.get(element) !== 'none') {
                element.style.setProperty('background-image', originalBackgrounds.get(element), 'important');
                element.style.setProperty('background-size', 'cover', 'important');
                element.style.setProperty('background-position', 'center center', 'important');
                element.style.setProperty('background-blend-mode', 'normal', 'important');
                element.style.setProperty('background-color', 'transparent', 'important');
                element.style.setProperty('filter', 'none', 'important');
                element.style.setProperty('-webkit-filter', 'none', 'important');
                element.style.setProperty('opacity', '1', 'important');
            }
        });
    }

    // Eliminar todos os pseudo-elementos que possam causar overlays
    function removeAllPseudoElements() {
        // Criar uma folha de estilo especial para remover todos os pseudo-elementos
        const style = document.createElement('style');
        style.textContent = `
            *:before, *:after {
                content: none !important;
                display: none !important;
                opacity: 0 !important;
                visibility: hidden !important;
                background: transparent !important;
                background-color: transparent !important;
                background-image: none !important;
                filter: none !important;
                -webkit-filter: none !important;
                position: absolute !important;
                top: -9999px !important;
                left: -9999px !important;
                width: 0 !important;
                height: 0 !important;
                z-index: -9999 !important;
            }
        `;
        document.head.appendChild(style);
    }

    // Corrija problemas com carrosséis Owl específicos
    function fixOwlCarousel() {
        // Fixar o Owl Carousel
        const owlItems = document.querySelectorAll('.owl-carousel, .owl-item, .owl-stage, .owl-stage-outer');
        owlItems.forEach(item => {
            item.style.setProperty('transform', 'none', 'important');
            item.style.setProperty('-webkit-transform', 'none', 'important');
            item.style.setProperty('transition', 'none', 'important');
            item.style.setProperty('-webkit-transition', 'none', 'important');
            item.style.setProperty('animation', 'none', 'important');
            item.style.setProperty('-webkit-animation', 'none', 'important');
            item.style.setProperty('opacity', '1', 'important');
            item.style.setProperty('visibility', 'visible', 'important');
            item.style.setProperty('overflow', 'visible', 'important');
            
            // Se for um item ativo, garanta que ele esteja visível e sem filtros
            if (item.classList.contains('active')) {
                item.style.setProperty('z-index', '999', 'important');
                item.style.setProperty('display', 'block', 'important');
            }
        });
        
        // O mesmo para Slick Slider
        const slickItems = document.querySelectorAll('.slick-slider, .slick-list, .slick-track, .slick-slide');
        slickItems.forEach(item => {
            item.style.setProperty('transform', 'none', 'important');
            item.style.setProperty('-webkit-transform', 'none', 'important');
            item.style.setProperty('transition', 'none', 'important');
            item.style.setProperty('-webkit-transition', 'none', 'important');
            item.style.setProperty('animation', 'none', 'important');
            item.style.setProperty('-webkit-animation', 'none', 'important');
            item.style.setProperty('opacity', '1', 'important');
            item.style.setProperty('visibility', 'visible', 'important');
            item.style.setProperty('overflow', 'visible', 'important');
            
            // Se for um item ativo, garanta que ele esteja visível e sem filtros
            if (item.classList.contains('slick-active')) {
                item.style.setProperty('z-index', '999', 'important');
                item.style.setProperty('display', 'block', 'important');
            }
        });
    }

    // Melhorar contraste de todas as imagens
    function enhanceImages() {
        const images = document.querySelectorAll('img, video, picture, figure img, .product-img img, .featured-img img, .slider img, .carousel img');
        images.forEach(img => {
            img.style.setProperty('filter', 'contrast(1.1)', 'important');
            img.style.setProperty('-webkit-filter', 'contrast(1.1)', 'important');
            img.style.setProperty('image-rendering', '-webkit-optimize-contrast', 'important');
            img.style.setProperty('image-rendering', 'crisp-edges', 'important');
            img.style.setProperty('opacity', '1', 'important');
            img.style.setProperty('visibility', 'visible', 'important');
        });
    }

    // Prevenir transformações durante transições em carrosséis
    function preventCarouselTransforms() {
        // Tenta encontrar e desabilitar qualquer função de transição nos carrosséis
        if (window.jQuery) {
            try {
                // Desabilitar transições e animações nos plugins de carousel
                if (jQuery.fn.owlCarousel) {
                    jQuery('.owl-carousel').trigger('destroy.owl.carousel');
                    jQuery('.owl-carousel').owlCarousel({
                        animateOut: false,
                        animateIn: false,
                        smartSpeed: 0,
                        dots: false,
                        mouseDrag: false,
                        touchDrag: false,
                        pullDrag: false,
                        autoplay: false
                    });
                }
                
                // Desabilitar Slick Slider
                if (jQuery.fn.slick) {
                    jQuery('.slick-slider').slick('unslick');
                }
                
                // Desabilitar outros plugins comuns
                jQuery('.carousel, .slider, .slideshow').each(function() {
                    jQuery(this).off('transitionend webkitTransitionEnd oTransitionEnd');
                });
            } catch (e) {
                console.log('Erro ao desabilitar plugins de carrossel: ', e);
            }
        }
    }

    // Configurar o MutationObserver para aplicar as mudanças aos novos elementos adicionados ao DOM
    function setupMutationObserver() {
        const observer = new MutationObserver(mutations => {
            mutations.forEach(mutation => {
                // Aplicar a função removeBlur a todos os novos nós adicionados
                if (mutation.addedNodes.length) {
                    mutation.addedNodes.forEach(node => {
                        // Verificar se é um elemento
                        if (node.nodeType === 1) {
                            removeBlur(node);
                            
                            // Processar todos os filhos do elemento
                            if (node.querySelectorAll) {
                                const children = node.querySelectorAll('*');
                                children.forEach(child => removeBlur(child));
                            }
                        }
                    });
                }
                
                // Verificar se algum atributo de estilo mudou
                if (mutation.type === 'attributes' && mutation.attributeName === 'style') {
                    removeBlur(mutation.target);
                }
                
                // Verificar se alguma classe mudou
                if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
                    removeBlur(mutation.target);
                }
            });
            
            // Reprocessar tudo para garantir
            processAllElements();
        });
        
        // Observar todo o documento para mudanças no DOM, atributos de estilo e classes
        observer.observe(document.documentElement, { 
            childList: true, 
            subtree: true, 
            attributes: true, 
            attributeFilter: ['style', 'class'] 
        });
        
        return observer;
    }

    // Processar todos os elementos na página
    function processAllElements() {
        console.log('Processando todos os elementos...');
        
        // Processar todos os elementos para remover blur
        const allElements = document.querySelectorAll('*');
        allElements.forEach(element => removeBlur(element));
        
        // Processar backgrounds
        processBackgroundImages();
        
        // Fixar carrosséis
        fixOwlCarousel();
        
        // Melhorar imagens
        enhanceImages();
        
        // Prevenir transformações
        preventCarouselTransforms();
    }

    // INÍCIO DA EXECUÇÃO

    // Desabilitar qualquer efeito de transição global
    document.documentElement.style.setProperty('transition', 'none', 'important');
    document.body.style.setProperty('transition', 'none', 'important');
    
    // Remover todos os pseudo-elementos que causam overlays
    removeAllPseudoElements();
    
    // Processar todos os elementos inicialmente
    processAllElements();
    
    // Configurar MutationObserver para monitorar mudanças futuras
    const observer = setupMutationObserver();
    
    // Forçar um repaint para garantir que as mudanças tenham efeito
    void document.documentElement.offsetHeight;
    
    console.log('Processo agressivo de remoção de blur concluído com sucesso!');

    // Quando a janela for totalmente carregada, reprocessar tudo para garantir
    window.addEventListener('load', function() {
        setTimeout(function() {
            processAllElements();
            
            // Desabilitar quaisquer bibliotecas de animação conhecidas
            if (window.AOS) window.AOS.refreshHard = function() {};
            if (window.WOW) window.WOW = function() {};
            
            console.log('Reprocessamento após carregamento completo concluído!');
            
            // Garantir que novos elementos dinâmicos sejam processados
            setTimeout(processAllElements, 1000);
            setTimeout(processAllElements, 3000);
        }, 500);
    });

    // Interceptar qualquer tentativa de adicionar blur posteriormente
    const originalSetAttribute = Element.prototype.setAttribute;
    Element.prototype.setAttribute = function(name, value) {
        // Se estiver tentando adicionar um filtro, backdrop-filter ou transform, bloquear
        if (name === 'style' && 
            (value.includes('filter') || 
             value.includes('backdrop-filter') || 
             value.includes('transform') ||
             value.includes('blur'))) {
            return;
        }
        
        // Chamar o método original para outros casos
        originalSetAttribute.call(this, name, value);
        
        // Processar o elemento após a mudança de atributo
        removeBlur(this);
    };

    // Interceptar mudanças de estilo com CSS
    const originalInsertRule = CSSStyleSheet.prototype.insertRule;
    CSSStyleSheet.prototype.insertRule = function(rule, index) {
        // Se a regra contém estilos de blur, modificá-la
        if (rule.includes('filter') || 
            rule.includes('backdrop-filter') || 
            rule.includes('transform') ||
            rule.includes('blur')) {
            rule = rule.replace(/filter\s*:\s*[^;]+/g, 'filter: none !important')
                       .replace(/backdrop-filter\s*:\s*[^;]+/g, 'backdrop-filter: none !important')
                       .replace(/transform\s*:\s*[^;]+/g, 'transform: none !important')
                       .replace(/blur\s*\([^)]+\)/g, 'blur(0px)');
        }
        
        return originalInsertRule.call(this, rule, index);
    };
}); 