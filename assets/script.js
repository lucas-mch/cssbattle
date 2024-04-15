document.addEventListener('DOMContentLoaded', function () {
    var pageSize = 10;
    var currentPage = 1;

    var desafiosTable = document.getElementById('desafios-table');
    var desafiosBody = document.getElementById('desafios-body');
    var pagination = document.getElementById('pagination');
    var iframe = document.getElementById('iframe');

    function carregarDesafios() {

        var desafios = [
            { link: `/desafios/13-04-2024.html`, data: `/desafios/13-04-2024` },
            { link: `/desafios/14-04-2024.html`, data: `/desafios/14-04-2024	` }
        ];
        mostrarDesafios(desafios);
    }

    function mostrarDesafios(desafios) {

        desafiosBody.innerHTML = '';


        var startIndex = (currentPage - 1) * pageSize;
        var endIndex = Math.min(startIndex + pageSize, desafios.length);

        var desafiosPagina = desafios.slice(startIndex, endIndex);

        desafiosPagina.forEach(function (desafio) {
            var row = document.createElement('tr');
            var dataCell = document.createElement('td');
            dataCell.textContent = desafio.data;
            row.appendChild(dataCell);
            var linkCell = document.createElement('td');
            var link = document.createElement('a');
            link.href = '#';
            link.textContent = desafio.link;
            link.setAttribute('data-src', desafio.link);
            linkCell.appendChild(link);
            row.appendChild(linkCell);
            desafiosBody.appendChild(row);
        });

        mostrarPaginacao(desafios.length);
    }

    function mostrarPaginacao(totalDesafios) {
        var totalPages = Math.ceil(totalDesafios / pageSize);

        pagination.innerHTML = '';

        for (var i = 1; i <= totalPages; i++) {
            var li = document.createElement('li');
            var a = document.createElement('a');
            a.href = '#';
            a.textContent = i;
            a.dataset.page = i;
            li.appendChild(a);
            pagination.appendChild(li);
        }


        pagination.addEventListener('click', function (event) {
            if (event.target.tagName === 'A') {
                currentPage = parseInt(event.target.dataset.page);
                carregarDesafios();
            }
        });
    }

    desafiosBody.addEventListener('click', function (event) {
        var target = event.target;
        if (target.tagName === 'A') {
            var src = target.getAttribute('data-src');
            iframe.src = src;
        }
    });

    carregarDesafios();
});