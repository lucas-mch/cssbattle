document.addEventListener('DOMContentLoaded', function () {

    const carousel = document.getElementById('carousel-body');

    initialize();

    function initialize() {
        getDesafios();
    }

    async function getDesafios() {
        var desafios = [];
        fetch('../src/assets/@files/desafios')
            .then(response => response.text())
            .then(text => {
                var regex = /href="([^"]+\.html)"/g;
                var match;
                while (match = regex.exec(text)) {
                    var desafio = {
                        filename: match[1].replace('/desafios/', '').replace('.html', ''),
                        patch: match[1]
                    };
                    desafios.push(desafio);
                }
            }).finally(() => {
                createCarousel(desafios);
            }).catch(err => console.error(err));
        return desafios;
    }

    function getDesafio(path) {
        fetch(path)
            .then(response => response.text()).then(text => {
                return text;
            })
    }

    async function createCarousel(desafios) {
        console.log('creating carousel with challenges: ', desafios);
        carousel.innerHTML = '';
        createCarouselItem(desafios);
    }

    function createCarouselItem(desafios) {
        var carouselItem = document.createElement('div');
        carouselItem.className = "carousel-item active fill-element card-holder";
        carousel.appendChild(carouselItem);
        desafios.forEach(desafio => {
            createCardContent(carouselItem, desafio);
        });
    }

    function createCardContent(carouselItem, desafio) {
        var cardContent = document.createElement('div');
        cardContent.className = "card-content";
        carouselItem.appendChild(cardContent);
        fillContent(cardContent, desafio);
    }

    function fillContent(cardContent, desafio) {
        var spanDate = document.createElement('span');
        spanDate.className = "badge text-bg-success date-holder";
        var checkIcon = document.createElement('i');
        checkIcon.className = "fa-solid fa-check";
        spanDate.appendChild(checkIcon);
        spanDate.innerHTML = desafio.filename;
        var card = document.createElement('div');
        card.className = "card";
        cardContent.appendChild(spanDate);
        cardContent.appendChild(card);
        fillCard(card, desafio);
    }

    function fillCard(card, desafio) {
        var frame = document.createElement('iframe');
        frame.src = desafio.patch;
        frame.id = desafio.filename;
        frame.width = 400;
        frame.height = 300;
        card.appendChild(frame);
    }

});


