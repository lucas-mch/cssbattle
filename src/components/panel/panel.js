const panel = document.getElementById('panel-body');

initialize();

function initialize() {
    getDesafios();
}

function openModal(details) {
    console.log('open modal')
    var modal = document.getElementById("cardDetails");
    var modalDetails = document.getElementById("modalDetails");

    modalDetails.innerHTML = "";

    modalDetails.innerHTML = details;

    modal.style.display = "block";
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
                    filename: match[1].replace('/src/assets/%40files/desafios/', '').replace('.html', ''),
                    patch: match[1]
                };
                desafios.push(desafio);
            }
        }).finally(() => {

            var desafioObj = {
                desafios: desafios,
                getPosition: function (index) {
                    console.log('getPosition', index);
                    console.log(this.desafios.length);
                    if (index === 0) {
                        return ' first'
                    };
                    if ((index + 1) === this.desafios.length) { 
                        return ' last' 
                    };
                    return '';
                }
            };

            createCardContent(desafioObj);

        }).catch(err => console.error(err));
    return desafios;
}

function createCardContent(desafiosObj) {
    desafiosObj.desafios.forEach((desafio, index) => {
        var cardContent = document.createElement('div');
        cardContent.className = "card-content" + desafiosObj.getPosition(index);
        panel.appendChild(cardContent);
        fillContent(cardContent, desafio);
    });
}

function fillContent(cardContent, desafio) {
    var spanDate = document.createElement('span');
    spanDate.className = "badge text-bg-success date-holder";
    var checkIcon = document.createElement('i');
    checkIcon.className = "fa-solid fa-check";
    spanDate.innerHTML = desafio.filename;
    var card = document.createElement('div');
    card.className = "card";
    card.id = desafio.filename + 'card'
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
    frame.onload = function() {
        var iframeDoc = frame.contentDocument || frame.contentWindow.document;
        var style = iframeDoc.createElement('style');
        style.textContent = 'body { cursor: pointer; overflow: hidden; }';

        iframeDoc.head.appendChild(style);
    };
    card.appendChild(frame);
}