// 히어로 캐러셀 관련 변수들입니다
let currentSlideIndex = 0; // 현재 보이는 슬라이드의 번호입니다 (0부터 시작)
let slideInterval; // 자동 슬라이딩을 위한 타이머 변수입니다
const slideInterval_Time = 5000; // 5초마다 자동으로 슬라이드가 바뀝니다

// 페이지가 완전히 로드된 후에 실행되는 코드입니다
document.addEventListener('DOMContentLoaded', function() {
    console.log('THE BELLE 웹사이트가 로드되었습니다!'); // 콘솔에 메시지를 출력합니다
    
    // 히어로 캐러셀을 초기화합니다
    initializeCarousel();
    
    // 자동 슬라이딩을 시작합니다
    startAutoSlide();
    
    // 모바일 메뉴 링크 클릭 시 메뉴 닫기 기능을 추가합니다
    const mobileNavItems = document.querySelectorAll('.mobile-nav-item');
    mobileNavItems.forEach(function(item) {
        item.addEventListener('click', function(e) {
            // 링크가 '#'이 아닌 실제 앵커 링크일 때만 메뉴를 닫습니다
            if (this.getAttribute('href') !== '#') {
                const mobileMenu = document.querySelector('.mobile-menu');
                const menuBtn = document.querySelector('.mobile-menu-btn');
                
                // 메뉴를 닫습니다
                mobileMenu.classList.remove('active');
                menuBtn.classList.remove('active');
                
                console.log('모바일 메뉴 링크 클릭으로 메뉴를 닫았습니다');
            }
        });
    });
});

/**
 * 모바일 메뉴를 열고 닫는 함수입니다
 * 햄버거 메뉴 버튼을 클릭했을 때 실행됩니다
 */
function toggleMobileMenu() {
    // 모바일 메뉴 요소를 찾습니다
    const mobileMenu = document.querySelector('.mobile-menu');
    
    // 모바일 메뉴 버튼 요소를 찾습니다
    const menuBtn = document.querySelector('.mobile-menu-btn');
    
    // 만약 모바일 메뉴가 현재 열려있다면
    if (mobileMenu.classList.contains('active')) {
        // 'active' 클래스를 제거해서 메뉴를 닫습니다
        mobileMenu.classList.remove('active');
        console.log('모바일 메뉴를 닫았습니다'); // 콘솔에 메시지를 출력합니다
        
        // 햄버거 메뉴 버튼을 원래 모양으로 돌립니다
        menuBtn.classList.remove('active');
        
    } else {
        // 'active' 클래스를 추가해서 메뉴를 엽니다
        mobileMenu.classList.add('active');
        console.log('모바일 메뉴를 열었습니다'); // 콘솔에 메시지를 출력합니다
        
        // 햄버거 메뉴 버튼을 X 모양으로 변경합니다
        menuBtn.classList.add('active');
    }
}



/**
 * 화면 크기가 변경될 때 실행되는 함수입니다
 * 반응형 웹사이트에서 화면 크기에 따라 메뉴를 자동으로 조정합니다
 */
function handleResize() {
    // 현재 화면의 너비를 가져옵니다
    const screenWidth = window.innerWidth;
    
    // 모바일 메뉴 요소를 찾습니다
    const mobileMenu = document.querySelector('.mobile-menu');
    
    // 화면이 768px보다 클 때 (태블릿/데스크톱)
    if (screenWidth > 768) {
        // 모바일 메뉴가 열려있다면 닫습니다
        if (mobileMenu.classList.contains('active')) {
            mobileMenu.classList.remove('active');
            console.log('화면이 커져서 모바일 메뉴를 자동으로 닫았습니다');
        }
    }
}

// 화면 크기가 변경될 때마다 handleResize 함수를 실행합니다
window.addEventListener('resize', handleResize);

/**
 * 페이지의 다른 곳을 클릭했을 때 모바일 메뉴를 닫는 함수입니다
 * 사용자 경험을 좋게 만들기 위한 기능입니다
 */
document.addEventListener('click', function(event) {
    // 모바일 메뉴와 메뉴 버튼을 찾습니다
    const mobileMenu = document.querySelector('.mobile-menu');
    const menuBtn = document.querySelector('.mobile-menu-btn');
    
    // 클릭한 곳이 메뉴나 메뉴 버튼이 아니고, 메뉴가 열려있다면
    if (!mobileMenu.contains(event.target) && 
        !menuBtn.contains(event.target) && 
        mobileMenu.classList.contains('active')) {
        
        // 모바일 메뉴를 닫습니다
        mobileMenu.classList.remove('active');
        menuBtn.classList.remove('active');
        console.log('메뉴 바깥쪽을 클릭해서 모바일 메뉴를 닫았습니다');
    }
});

/**
 * 스크롤할 때 헤더에 그림자 효과를 추가하는 함수입니다
 * 페이지를 스크롤하면 헤더가 더 눈에 띄게 만듭니다
 */
function handleScroll() {
    // 헤더 요소를 찾습니다
    const header = document.querySelector('.header');
    
    // 현재 스크롤 위치를 가져옵니다
    const scrollY = window.scrollY;
    
    // 스크롤이 50px 이상이면 헤더에 그림자를 더 진하게 만듭니다
    if (scrollY > 50) {
        header.style.boxShadow = '0 4px 10px rgba(0,0,0,0.15)';
    } else {
        // 스크롤이 50px 미만이면 원래 그림자로 돌립니다
        header.style.boxShadow = '0 2px 5px rgba(0,0,0,0.1)';
    }
}

// 페이지를 스크롤할 때마다 handleScroll 함수를 실행합니다
window.addEventListener('scroll', handleScroll);

/**
 * 히어로 캐러셀을 초기화하는 함수입니다
 * 페이지가 로드되었을 때 실행되어 첫 번째 슬라이드를 보여줍니다
 */
function initializeCarousel() {
    // 모든 슬라이드 요소들을 찾습니다
    const slides = document.querySelectorAll('.slide');
    
    // 각 슬라이드에 배경 이미지를 설정합니다
    slides.forEach(function(slide) {
        const backgroundImage = slide.getAttribute('data-bg'); // data-bg 속성에서 이미지 경로를 가져옵니다
        slide.style.backgroundImage = `url(${backgroundImage})`; // CSS 배경 이미지로 설정합니다
    });
    
    // 첫 번째 슬라이드를 활성화합니다
    showSlide(0);
    
    console.log('히어로 캐러셀이 초기화되었습니다!'); // 콘솔에 메시지를 출력합니다
}

/**
 * 특정 슬라이드를 보여주는 함수입니다
 * @param {number} index - 보여줄 슬라이드의 번호 (0부터 시작)
 */
function showSlide(index) {
    // 모든 슬라이드와 인디케이터를 찾습니다
    const slides = document.querySelectorAll('.slide');
    const indicators = document.querySelectorAll('.indicator');
    
    // 슬라이드 번호가 범위를 벗어나면 조정합니다
    if (index >= slides.length) {
        currentSlideIndex = 0; // 마지막 슬라이드 다음은 첫 번째 슬라이드입니다
    } else if (index < 0) {
        currentSlideIndex = slides.length - 1; // 첫 번째 슬라이드 이전은 마지막 슬라이드입니다
    } else {
        currentSlideIndex = index; // 정상적인 범위면 그대로 사용합니다
    }
    
    // 모든 슬라이드에서 'active' 클래스를 제거합니다 (숨깁니다)
    slides.forEach(function(slide) {
        slide.classList.remove('active');
    });
    
    // 모든 인디케이터에서 'active' 클래스를 제거합니다
    indicators.forEach(function(indicator) {
        indicator.classList.remove('active');
    });
    
    // 현재 슬라이드와 인디케이터에 'active' 클래스를 추가합니다 (보여줍니다)
    slides[currentSlideIndex].classList.add('active');
    indicators[currentSlideIndex].classList.add('active');
    
    console.log(`슬라이드 ${currentSlideIndex + 1}을 보여주고 있습니다`); // 콘솔에 현재 슬라이드 번호를 출력합니다
}

/**
 * 슬라이드를 변경하는 함수입니다
 * 화살표 버튼을 클릭했을 때 실행됩니다
 * @param {number} direction - 1이면 다음 슬라이드, -1이면 이전 슬라이드
 */
function changeSlide(direction) {
    // 자동 슬라이딩을 멈추고 다시 시작합니다 (사용자가 조작했으므로)
    stopAutoSlide();
    
    // 다음 또는 이전 슬라이드를 보여줍니다
    showSlide(currentSlideIndex + direction);
    
    // 자동 슬라이딩을 다시 시작합니다
    startAutoSlide();
    
    console.log(`슬라이드를 ${direction > 0 ? '다음' : '이전'}으로 변경했습니다`); // 콘솔에 메시지를 출력합니다
}

/**
 * 인디케이터를 클릭했을 때 해당 슬라이드로 이동하는 함수입니다
 * @param {number} slideNumber - 이동할 슬라이드 번호 (1부터 시작)
 */
function currentSlide(slideNumber) {
    // 자동 슬라이딩을 멈추고 다시 시작합니다
    stopAutoSlide();
    
    // 클릭한 슬라이드를 보여줍니다 (slideNumber는 1부터 시작하므로 1을 빼줍니다)
    showSlide(slideNumber - 1);
    
    // 자동 슬라이딩을 다시 시작합니다
    startAutoSlide();
    
    console.log(`인디케이터 클릭으로 슬라이드 ${slideNumber}로 이동했습니다`); // 콘솔에 메시지를 출력합니다
}

/**
 * 자동 슬라이딩을 시작하는 함수입니다
 * 5초마다 자동으로 다음 슬라이드로 넘어갑니다
 */
function startAutoSlide() {
    // 기존 타이머가 있다면 먼저 정리합니다
    if (slideInterval) {
        clearInterval(slideInterval);
    }
    
    // 새로운 타이머를 설정합니다
    slideInterval = setInterval(function() {
        showSlide(currentSlideIndex + 1); // 다음 슬라이드로 이동합니다
    }, slideInterval_Time);
    
    console.log('자동 슬라이딩이 시작되었습니다 (5초 간격)'); // 콘솔에 메시지를 출력합니다
}

/**
 * 자동 슬라이딩을 멈추는 함수입니다
 * 사용자가 화살표나 인디케이터를 클릭했을 때 호출됩니다
 */
function stopAutoSlide() {
    if (slideInterval) {
        clearInterval(slideInterval); // 타이머를 정리합니다
        slideInterval = null; // 변수를 초기화합니다
        console.log('자동 슬라이딩이 멈췄습니다'); // 콘솔에 메시지를 출력합니다
    }
}

/**
 * 마우스가 히어로 영역에 들어왔을 때 자동 슬라이딩을 멈춥니다
 * 사용자가 내용을 읽을 수 있도록 배려하는 기능입니다
 */
document.addEventListener('DOMContentLoaded', function() {
    const heroSection = document.querySelector('.hero-section');
    
    if (heroSection) {
        // 마우스가 히어로 영역에 들어오면 자동 슬라이딩을 멈춥니다
        heroSection.addEventListener('mouseenter', function() {
            stopAutoSlide();
            console.log('마우스가 히어로 영역에 들어와서 자동 슬라이딩을 멈췄습니다');
        });
        
        // 마우스가 히어로 영역에서 나가면 자동 슬라이딩을 다시 시작합니다
        heroSection.addEventListener('mouseleave', function() {
            startAutoSlide();
            console.log('마우스가 히어로 영역에서 나가서 자동 슬라이딩을 다시 시작했습니다');
        });
    }
});

/**
 * 제품 설명의 더보기/접기 기능을 구현하는 함수입니다
 * 더보기 버튼을 클릭했을 때 실행됩니다
 * @param {HTMLElement} button - 클릭된 더보기 버튼 요소
 */
function toggleDescription(button) {
    // 버튼이 속한 product-description 영역을 찾습니다
    const description = button.closest('.product-description');
    
    // 미리보기와 전체 설명 영역을 찾습니다
    const preview = description.querySelector('.description-preview');
    const full = description.querySelector('.description-full');
    
    // 현재 전체 설명이 보이는지 확인합니다
    const isExpanded = full.style.display !== 'none';
    
    if (isExpanded) {
        // 현재 펼쳐져 있다면 접습니다
        preview.style.display = 'block'; // 미리보기를 보여줍니다
        full.style.display = 'none'; // 전체 설명을 숨깁니다
        button.textContent = '더보기'; // 버튼 텍스트를 '더보기'로 변경합니다
        console.log('제품 설명을 접었습니다'); // 콘솔에 메시지를 출력합니다
    } else {
        // 현재 접혀있다면 펼칩니다
        preview.style.display = 'none'; // 미리보기를 숨깁니다
        full.style.display = 'block'; // 전체 설명을 보여줍니다
        button.textContent = '접기'; // 버튼 텍스트를 '접기'로 변경합니다
        console.log('제품 설명을 펼쳤습니다'); // 콘솔에 메시지를 출력합니다
    }
    
    // 부드러운 애니메이션 효과를 위해 약간의 딜레이를 줍니다
    setTimeout(function() {
        // 변경된 내용이 화면에 반영되도록 합니다
        description.style.opacity = '0.9';
        setTimeout(function() {
            description.style.opacity = '1';
        }, 100);
    }, 50);
}

/**
 * 페이지가 스크롤될 때 제품 아이템들에 애니메이션 효과를 주는 함수입니다
 * 화면에 나타나는 제품들을 부드럽게 보여줍니다
 */
function animateProductsOnScroll() {
    // 모든 제품 아이템을 찾습니다
    const productItems = document.querySelectorAll('.product-item');
    
    // 각 제품 아이템을 확인합니다
    productItems.forEach(function(item, index) {
        // 요소가 화면에 보이는지 확인합니다
        const rect = item.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        
        // 요소의 상단이 화면 아래쪽 80% 지점에 도달했을 때
        if (rect.top < windowHeight * 0.8) {
            // 약간의 딜레이를 주어서 순차적으로 나타나게 합니다
            setTimeout(function() {
                item.style.opacity = '1';
                item.style.transform = 'translateY(0)';
            }, index * 100); // 각 아이템마다 100ms씩 딜레이
        }
    });
}

/**
 * 제품 아이템들의 초기 상태를 설정하는 함수입니다
 * 페이지 로드 시 애니메이션을 위해 투명하게 만듭니다
 */
function initializeProductAnimations() {
    const productItems = document.querySelectorAll('.product-item');
    
    productItems.forEach(function(item) {
        // 초기에는 투명하고 약간 아래에 위치시킵니다
        item.style.opacity = '0';
        item.style.transform = 'translateY(30px)';
        item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });
    
    console.log('제품 애니메이션이 초기화되었습니다');
}

// 페이지가 로드되었을 때 제품 애니메이션을 초기화합니다
document.addEventListener('DOMContentLoaded', function() {
    // 제품 섹션이 존재할 때만 애니메이션을 적용합니다
    if (document.querySelector('.product-section')) {
        initializeProductAnimations();
        
        // 스크롤 이벤트에 제품 애니메이션을 연결합니다
        window.addEventListener('scroll', animateProductsOnScroll);
        
        // 페이지 로드 직후에도 한 번 실행합니다 (이미 화면에 보이는 요소들을 위해)
        setTimeout(animateProductsOnScroll, 500);
    }
    
    // 이용안내 섹션이 존재할 때만 애니메이션을 적용합니다
    if (document.querySelector('.guide-section')) {
        initializeGuideAnimations();
        
        // 스크롤 이벤트에 이용안내 애니메이션을 연결합니다
        window.addEventListener('scroll', animateGuideOnScroll);
        
        // 페이지 로드 직후에도 한 번 실행합니다
        setTimeout(animateGuideOnScroll, 700);
    }
});

/**
 * 브랜드 스토리 전체 내용을 보여주거나 숨기는 함수입니다
 * 더보기 버튼을 누르면 전체 스토리가 나오고, 닫기 버튼으로 바뀝니다
 */
function toggleStory() {
    // HTML에서 필요한 요소들을 찾습니다
    const storyPreview = document.getElementById('storyPreview'); // 미리보기 텍스트
    const storyFull = document.getElementById('storyFull'); // 전체 텍스트
    const toggleBtn = document.getElementById('storyToggleBtn'); // 더보기/닫기 버튼
    
    // 현재 전체 스토리가 보이는지 확인합니다
    const isFullVisible = storyFull.style.display === 'block';
    
    if (isFullVisible) {
        // 전체 스토리가 보이고 있다면 숨기고 미리보기를 보여줍니다
        storyFull.style.display = 'none'; // 전체 스토리를 숨깁니다
        storyPreview.style.display = 'block'; // 미리보기를 보여줍니다
        toggleBtn.textContent = '더보기'; // 버튼 텍스트를 '더보기'로 변경합니다
        
        console.log('브랜드 스토리를 접었습니다');
    } else {
        // 미리보기만 보이고 있다면 전체 스토리를 보여줍니다
        storyPreview.style.display = 'none'; // 미리보기를 숨깁니다
        storyFull.style.display = 'block'; // 전체 스토리를 보여줍니다
        toggleBtn.textContent = '닫기'; // 버튼 텍스트를 '닫기'로 변경합니다
        
        console.log('브랜드 스토리를 펼쳤습니다');
    }
    
    // 버튼에 부드러운 애니메이션 효과를 줍니다
    toggleBtn.style.transform = 'scale(0.95)'; // 버튼을 살짝 축소합니다
    setTimeout(function() {
        toggleBtn.style.transform = 'scale(1)'; // 0.1초 후 원래 크기로 돌립니다
    }, 100);
}

/**
 * 이용안내 아이템들의 초기 상태를 설정하는 함수입니다
 * 페이지 로드 시 애니메이션을 위해 투명하게 만듭니다
 */
function initializeGuideAnimations() {
    const guideItems = document.querySelectorAll('.guide-item');
    
    guideItems.forEach(function(item, index) {
        // 초기에는 투명하고 약간 아래에 위치시킵니다
        item.style.opacity = '0';
        item.style.transform = 'translateY(50px) scale(0.9)';
        item.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        
        // 각 아이템마다 다른 지연시간을 줍니다
        item.style.transitionDelay = (index * 0.1) + 's';
    });
    
    console.log('이용안내 애니메이션이 초기화되었습니다');
}

/**
 * 페이지가 스크롤될 때 이용안내 아이템들에 애니메이션 효과를 주는 함수입니다
 * 화면에 나타나는 이용안내 아이템들을 부드럽게 보여줍니다
 */
function animateGuideOnScroll() {
    // 모든 이용안내 아이템을 찾습니다
    const guideItems = document.querySelectorAll('.guide-item');
    
    // 각 이용안내 아이템을 확인합니다
    guideItems.forEach(function(item, index) {
        // 요소가 화면에 보이는지 확인합니다
        const rect = item.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        
        // 요소의 상단이 화면 아래쪽 85% 지점에 도달했을 때
        if (rect.top < windowHeight * 0.85) {
            // 부드럽게 나타나게 합니다
            item.style.opacity = '1';
            item.style.transform = 'translateY(0) scale(1)';
            
            console.log(`이용안내 아이템 ${index + 1}이 화면에 나타났습니다`);
        }
    });
}

/**
 * 이용안내 아이템에 마우스를 올렸을 때 특별한 효과를 주는 함수입니다
 * 각 아이템의 내용을 더 강조해서 보여줍니다
 */
function enhanceGuideItemInteraction() {
    const guideItems = document.querySelectorAll('.guide-item');
    
    guideItems.forEach(function(item) {
        // 마우스가 아이템에 들어왔을 때
        item.addEventListener('mouseenter', function() {
            // 다른 아이템들을 살짝 투명하게 만듭니다
            guideItems.forEach(function(otherItem) {
                if (otherItem !== item) {
                    otherItem.style.opacity = '0.7';
                    otherItem.style.transform = 'scale(0.95)';
                }
            });
            
            console.log('이용안내 아이템에 마우스가 올라갔습니다');
        });
        
        // 마우스가 아이템에서 나갔을 때
        item.addEventListener('mouseleave', function() {
            // 모든 아이템을 원래 상태로 돌립니다
            guideItems.forEach(function(otherItem) {
                otherItem.style.opacity = '1';
                otherItem.style.transform = 'scale(1)';
            });
            
            console.log('이용안내 아이템에서 마우스가 나왔습니다');
        });
    });
}

// 페이지가 완전히 로드된 후 이용안내 인터랙션을 활성화합니다
document.addEventListener('DOMContentLoaded', function() {
    // 이용안내 섹션이 존재할 때만 인터랙션을 적용합니다
    if (document.querySelector('.guide-section')) {
        // 약간의 딜레이를 주고 인터랙션을 활성화합니다
        setTimeout(enhanceGuideItemInteraction, 1000);
    }
});