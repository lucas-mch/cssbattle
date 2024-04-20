document.addEventListener('DOMContentLoaded', function () {

    const carousel = document.getElementById('carousel-body');

    initialize();

    function initialize() {
        createCarousel();
        var desafios = getDesafios(); 
        console.log(desafios)
        desafios.forEach((desafio) => {
            console.log(desafio)
        }); 
    }

    function getDesafios() {
        var desafios = [];
        fetch('/desafios')
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
            }).catch(err => console.error(err));
        return desafios;
    }

    function getDesafio(path) {
        fetch(path)
            .then(response => response.text()).then(text => {
                return text;
            })
    }

    function createCarousel() {
        carousel.innerHTML = '';
        createCarouselItem();
    }

    function createCarouselItem(carosel) {
        var carouselItem = document.createElement('div');
        carouselItem.className = "carousel-item active fill-element card-holder";
        carousel.appendChild(carouselItem);
        createCardContent(carouselItem);
    }

    function createCardContent(carouselItem) {
        var cardContent = document.createElement('div');
        cardContent.className = "card-content";
        carouselItem.appendChild(cardContent);
        fillContent(cardContent);
    }

    function fillContent(cardContent) {
        var spanDate = document.createElement('span');
        spanDate.className = "badge text-bg-success date-holder";
        var checkIcon = document.createElement('i');
        checkIcon.className = "fa-solid fa-check";
        spanDate.appendChild(checkIcon);
        spanDate.innerHTML = ' APR 21';
        var card = document.createElement('div');
        card.className = "card";
        cardContent.appendChild(spanDate);
        cardContent.appendChild(card);
    }


});


