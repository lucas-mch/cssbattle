document.addEventListener('DOMContentLoaded', function () {

    const carousel = document.getElementById('carousel-body');

    function getDesafios() {
        var desafios = [];
        fetch('/desafios')
            .then(response => response.text())
            .then(text => {
                var regex = /href="([^"]+\.html)"/g;
                var match;
                while (match = regex.exec(text)) {
                    var desafio = {
                        patch: match[1].replace('.html', '')
                    };
                    desafios.push(desafio);
                }
            }).catch(err => console.error(err));
        return desafios;
    }

    function buildCarousel() {
        carousel.innerHTML = '';
        var carouselItem = document.createElement('div');
        carouselItem.className = isFirstElement() ? "carousel-item active fill-element card-holder" : "carousel-item fill-element card-holder";
        carousel.appendChild(carouselItem);
        var cardContent = document.createElement('div');
        cardContent.className = "card-content";
        var spanDate = document.createElement('span');
        spanDate.className = "badge text-bg-success date-holder";
    }

});


