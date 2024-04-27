const panel = document.getElementById('panel-body');
const challengesPath = './assets/@files/desafios/';

const challenges = [
    { filename: `13-04-2024`, name: `13-04-2024.html` },
    { filename: `14-04-2024`, name: `14-04-2024.html` },
    { filename: `15-04-2024`, name: `15-04-2024.html` },
    { filename: `16-04-2024`, name: `16-04-2024.html` },
    { filename: `17-04-2024`, name: `17-04-2024.html` },
    { filename: `18-04-2024`, name: `18-04-2024.html` },
    { filename: `22-04-2024`, name: `22-04-2024.html` },
];

initialize();

function initialize() {
    buildPanel();
}

async function buildPanel() {
    var desafioObj = {
        desafios: challenges,
        getPosition: function (index) {
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
    frame.src = challengesPath + desafio.name;
    frame.id = desafio.filename;
    frame.width = 400;
    frame.height = 300;
    frame.onload = function () {
        var iframeDoc = frame.contentDocument || frame.contentWindow.document;
        var style = iframeDoc.createElement('style');
        style.textContent = 'body { cursor: pointer; overflow: hidden; }';
        iframeDoc.head.appendChild(style);
        iframeDoc.addEventListener('click', () => {
            openModalViewCard(this.id);
        });
        iframeDoc.addEventListener('keydown',(e) => {
            console.log('eventListener bro')
            if(e.key === 'Escape') {
                closeModalViewCard();
            }
        })
    };
    card.appendChild(frame);
}