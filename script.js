const imageCarouselDiv = document.querySelector('.image-carousel');
const qrBtn = document.querySelector('.qr-btn');
const productsCarousel = document.querySelector('#products-carousel');
const qrImage = document.querySelector('#qr');
const matchaCountDiv = document.querySelector('#matcha');
const miloCountDiv = document.querySelector('#milo');
const friesCountDiv = document.querySelector('#fries');
const miloFriesCountDiv = document.querySelector('#milo-fries');
const matchaFriesCountDiv = document.querySelector('#matcha-fries');
const incomeDisplayDiv = document.querySelector('.income-display');

// Counter related codes
let counts = {
    'matcha': [localStorage.getItem('counts') ? JSON.parse(localStorage.getItem('counts')).matcha : 0, matchaCountDiv],
    'milo': [localStorage.getItem('counts') ? JSON.parse(localStorage.getItem('counts')).milo : 0, miloCountDiv],
    'fries': [localStorage.getItem('counts') ? JSON.parse(localStorage.getItem('counts')).fries : 0, friesCountDiv],
    'miloFries': [localStorage.getItem('counts') ? JSON.parse(localStorage.getItem('counts')).miloFries : 0, miloFriesCountDiv],
    'matchaFries': [localStorage.getItem('counts') ? JSON.parse(localStorage.getItem('counts')).matchaFries : 0, matchaFriesCountDiv]
};

const saveCountsToLocalStorage = () => {
    localStorage.setItem('counts', JSON.stringify({
        matcha: counts['matcha'][0],
        milo: counts['milo'][0],
        fries: counts['fries'][0],
        miloFries: counts['miloFries'][0],
        matchaFries: counts['matchaFries'][0]
    }));
}

console.log(Object.entries(counts));

Object.entries(counts).forEach(([key, [count, div]]) => {
    div.innerHTML = `
        <button class="decrease-btn" id="${key}-decrease">-</button>
        <div class="in-counter" id="${key}-counter">${count}</div>
        <button class="increase-btn" id="${key}-increase">+</button>
    `;
});

const increaseBtn = document.querySelectorAll('.increase-btn');
const decreaseBtn = document.querySelectorAll('.decrease-btn');

increaseBtn.forEach(btn => {
    btn.addEventListener('click', () => {
        const type = btn.id.split('-')[0];
        counts[type][0]++;
        counts[type][1].querySelector('.in-counter').textContent = counts[type][0];
        console.log(type);
        saveCountsToLocalStorage();
        calculateIncome();
    });
});

decreaseBtn.forEach(btn => {
    btn.addEventListener('click', () => {
        const type = btn.id.split('-')[0];
        if (counts[type][0] > 0) {
            counts[type][0]--;
            counts[type][1].querySelector('.in-counter').textContent = counts[type][0];
            console.log(type);
            saveCountsToLocalStorage();
            calculateIncome();
        }
    });
});

// Images carousel related codes
const images = {
    0: {'src': './images/matcha-cat.jpg', 'alt': 'Matcha Drink'},
    1: {'src': './images/milo-cat.jpg', 'alt': 'Milo Ice'},
    2: {'src': './images/fries-cat.jpg', 'alt': 'Fries'}
}

const images_complete = {
    0: {'src': './images/milo-latte.jpg', 'alt': 'Matcha Drink'},
    1: {'src': './images/milo-cat.jpg', 'alt': 'Milo Ice'},
    2: {'src': './images/fries-cat.jpg', 'alt': 'Fries'},
    3: {'src': './images/mocha-cat.jpg', 'alt': 'Malaysia Mocha'},
    4: {'src': './images/kopi-c.jpg', 'alt': 'Kopi C'},
    5: {'src': './images/qr.jpg', 'alt': 'QR Code'},
    
}

// let i = 0;
// setInterval(() => {
//     imageCarouselDiv.innerHTML = `<img src="${images[i].src}" alt="${images[i].alt}" class="carousel-image">`;
//     i = (i + 1) % Object.keys(images).length;
// }, 3000);


Object.keys(images_complete).forEach((key) => {
    const image = images_complete[key];
    const imgElement = document.createElement('img');
    imgElement.src = image['src'];
    imgElement.alt = image['alt'];
    imgElement.classList.add('carousel-image');
    imageCarouselDiv.appendChild(imgElement);
});

qrBtn.addEventListener('click', () => {
    if (qrImage.style.display === 'none') {
        qrImage.style.display = 'block';
        productsCarousel.style.display = 'none';
    } else {
        qrImage.style.display = 'none';
        productsCarousel.style.display = 'block';
    }
});

// Income calculations
const calculateIncome = () => {
    const income = 199.51 + 
        (counts['matcha'][0] * 6) + 
        (counts['milo'][0] * 3) + 
        (counts['fries'][0] * 5) + 
        (counts['miloFries'][0] * 7) + 
        (counts['matchaFries'][0] * 10);
    incomeDisplayDiv.textContent = `RM ${income.toFixed(2)}`;
}

calculateIncome();