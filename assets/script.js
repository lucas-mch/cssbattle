document.addEventListener('DOMContentLoaded', function () {
    var pageSize = 10; // Número máximo de resultados por página
    var currentPage = 1; // Página atual

    var desafiosTable = document.getElementById('desafios-table');
    var desafiosBody = document.getElementById('desafios-body');
    var pagination = document.getElementById('pagination');
    var iframe = document.getElementById('iframe');
    console.log('body', desafiosBody, document.getElementById('desafios-body'));
    function carregarDesafios() {

        fetch('./desafios/') // Obtém a lista de desafios
            .then(response => response.text())
            .then(text => {
                var regex = /href="([^"]+\.html)"/g;
                var match;
                var desafios = [];

                // Extrai os nomes dos arquivos HTML
                while (match = regex.exec(text)) {
                    var desafio = {
                        link: match[1],
                        data: match[1].replace('.html', '') // Usa o nome do arquivo como data
                    };
                    desafios.push(desafio);
                }

                // Mostra os desafios
                mostrarDesafios(desafios);
            });
    }

    function mostrarDesafios(desafios) {
        // Limpa o corpo da tabela
        desafiosBody.innerHTML = '';

        // Calcula o índice inicial e final para os resultados da página atual
        var startIndex = (currentPage - 1) * pageSize;
        var endIndex = Math.min(startIndex + pageSize, desafios.length);

        // Obtém os desafios para a página atual
        var desafiosPagina = desafios.slice(startIndex, endIndex);

        // Adiciona os desafios à tabela
        desafiosPagina.forEach(function (desafio) {
            var row = document.createElement('tr');
            var dataCell = document.createElement('td');
            dataCell.textContent = desafio.data;
            row.appendChild(dataCell);
            var linkCell = document.createElement('td');
            var link = document.createElement('a');
            link.href = '#'; // Não precisa definir o href aqui
            link.textContent = desafio.link;
            link.setAttribute('data-src', desafio.link); // Defina data-src para o iframe
            linkCell.appendChild(link);
            row.appendChild(linkCell);
            desafiosBody.appendChild(row);
        });

        // Atualiza a paginação
        mostrarPaginacao(desafios.length);
    }

    function mostrarPaginacao(totalDesafios) {
        // Calcula o número total de páginas
        var totalPages = Math.ceil(totalDesafios / pageSize);

        // Limpa a paginação
        pagination.innerHTML = '';

        // Adiciona botões de páginação
        for (var i = 1; i <= totalPages; i++) {
            var li = document.createElement('li');
            var a = document.createElement('a');
            a.href = '#';
            a.textContent = i;
            a.dataset.page = i; // Define o número da página como dataset
            li.appendChild(a);
            pagination.appendChild(li);
        }

        // Adiciona event listener para os botões de páginação
        pagination.addEventListener('click', function (event) {
            if (event.target.tagName === 'A') {
                currentPage = parseInt(event.target.dataset.page);
                carregarDesafios();
            }
        });
    }

    // Adiciona um event listener para os links
    desafiosBody.addEventListener('click', function (event) {
        var target = event.target;
        if (target.tagName === 'A') {
            var src = target.getAttribute('data-src');
            iframe.src = src; // Define o src do iframe com o data-src do link clicado
        }
    });

    // Mostra os desafios na página inicial
    carregarDesafios();
});