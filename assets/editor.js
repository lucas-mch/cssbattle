// document.addEventListener('DOMContentLoaded', function () {
//     var pageSize = 10;
//     var currentPage = 1;
//     var desafiosBody = document.getElementById('desafios-body');
//     var pagination = document.getElementById('pagination');

//     const editor = document.getElementById('editor');
//     const preview = document.getElementById('iframe');

//     function updateLineNumbers() {
//         let lineCount = editor.value.split('\n').length;
//         let lines = '';
//         for (let i = 1; i <= lineCount; i++) {
//             lines += i + '\n';
//         }
//         lineNumbers.innerHTML = lines;
//     }

//     function updateCode() {

//         let content = editor.value;

//         content = content.replace(/&/g, '&amp;');
//         content = content.replace(/</g, '&lt;');
//         content = content.replace(/>/g, '&gt;');

//         codeBlock.innerHTML = content;
//         updateLineNumbers();

//         highlightJS();
//     }


//     function highlightJS() {
//         document.querySelectorAll('pre code').forEach((el) => {
//             hljs.highlightElement(el, 'html', true);
//         });
//     }

//     editor.addEventListener("input", () => {
//         updateCode();
//     });

//     editor.addEventListener("scroll", () => {
//         codeBlock.scrollTop = editor.scrollTop;
//         codeBlock.scrollLeft = editor.scrollLeft;
//         lineNumbers.scrollTop = editor.scrollTop;
//     });

//     bindCodeEditorShortcutKeys(editor);

//     function carregarDesafios() {

//         var desafios = [
//             { link: `desafios/13-04-2024.html`, data: `13/04/2024` },
//             { link: `desafios/14-04-2024.html`, data: `14/04/2024` },
//             { link: `desafios/15-04-2024.html`, data: `15/04/2024` }
//         ];
//         mostrarDesafios(desafios);
//     }

//     function mostrarDesafios(desafios) {

//         desafiosBody.innerHTML = '';


//         var startIndex = (currentPage - 1) * pageSize;
//         var endIndex = Math.min(startIndex + pageSize, desafios.length);

//         var desafiosPagina = desafios.slice(startIndex, endIndex);

//         desafiosPagina.forEach(function (desafio) {
//             var row = document.createElement('tr');
//             var dataCell = document.createElement('td');
//             dataCell.textContent = desafio.data;
//             row.appendChild(dataCell);
//             var linkCell = document.createElement('td');
//             var link = document.createElement('a');
//             link.href = '#';
//             link.textContent = desafio.link;
//             link.setAttribute('data-src', desafio.link);
//             linkCell.appendChild(link);
//             row.appendChild(linkCell);
//             desafiosBody.appendChild(row);
//         });

//         mostrarPaginacao(desafios.length);
//     }

//     function mostrarPaginacao(totalDesafios) {
//         var totalPages = Math.ceil(totalDesafios / pageSize);

//         pagination.innerHTML = '';

//         for (var i = 1; i <= totalPages; i++) {
//             var li = document.createElement('li');
//             var a = document.createElement('a');
//             a.href = '#';
//             a.textContent = i;
//             a.dataset.page = i;
//             li.appendChild(a);
//             pagination.appendChild(li);
//         }


//         pagination.addEventListener('click', function (event) {
//             if (event.target.tagName === 'A') {
//                 currentPage = parseInt(event.target.dataset.page);
//                 carregarDesafios();
//             }
//         });
//     }

//     desafiosBody.addEventListener('click', function (event) {
//         var target = event.target;
//         if (target.tagName === 'A') {
//             var src = target.getAttribute('data-src');
//             fetch(src)
//                 .then(response => response.text())
//                 .then(html => {
//                     editor.value = html;
//                     updatePreview();
//                 })
//                 .catch(error => console.error('Erro ao carregar o arquivo HTML:', error));
//         }
//     });

//     carregarDesafios();

//     const updatePreview = () => {
//         const content = editor.value;
//         preview.contentDocument.body.innerHTML = content;
//         updateCode();
//     };

//     updatePreview();
//     editor.addEventListener('input', updatePreview);

//     function bindCodeEditorShortcutKeys(textarea) {

//         textarea.addEventListener('keydown', function (e) {
//             if (e.key === 'Enter') {

//                 e.preventDefault();

//                 var cursorPos = textarea.selectionStart;

//                 var prevLine = textarea.value.substring(0, cursorPos).split('\n').slice(-1)[0];

//                 var indent = prevLine.match(/^\s*/)[0];

//                 textarea.setRangeText('\n' + indent, cursorPos, cursorPos, 'end');

//                 textarea.blur();

//                 textarea.focus();

//                 updateCode();
//                 return;
//             }


//             if (e.key === "Tab" && !e.shiftKey &&
//                 textarea.selectionStart == textarea.selectionEnd) {
//                 e.preventDefault();
//                 let cursorPosition = textarea.selectionStart;
//                 let newValue = textarea.value.substring(0, cursorPosition) + "    " +
//                     textarea.value.substring(cursorPosition);
//                 textarea.value = newValue;
//                 textarea.selectionStart = textarea.selectionEnd = cursorPosition + 4;
//                 updateCode();
//                 return;
//             }

//             if (e.key === "Tab" && e.shiftKey &&

//                 textarea.selectionStart == textarea.selectionEnd) {

//                 e.preventDefault();

//                 let cursorPosition = textarea.selectionStart;

//                 let leadingSpaces = 0;
//                 for (let i = 0; i < 4; i++) {
//                     if (textarea.value[cursorPosition - i - 1] === " ") {
//                         leadingSpaces++;
//                     } else {
//                         break;
//                     }
//                 }

//                 if (leadingSpaces > 0) {
//                     let newValue = textarea.value.substring(0, cursorPosition - leadingSpaces) +
//                         textarea.value.substring(cursorPosition);

//                     textarea.value = newValue;
//                     textarea.selectionStart = textarea.selectionEnd = cursorPosition - leadingSpaces;
//                 }

//                 updateCode();
//                 return;
//             }

//             if (e.key == 'Tab' & textarea.selectionStart != textarea.selectionEnd) {
//                 e.preventDefault();

//                 let lines = textarea.value.split('\n');

//                 let startPos = textarea.value.substring(0, textarea.selectionStart).split('\n').length - 1;
//                 let endPos = textarea.value.substring(0, textarea.selectionEnd).split('\n').length - 1;


//                 let spacesRemovedFirstLine = 0;
//                 let spacesRemoved = 0;


//                 if (e.shiftKey) {


//                     for (let i = startPos; i <= endPos; i++) {


//                         lines[i] = lines[i].replace(/^ {1,4}/, function (match) {


//                             if (i == startPos)
//                                 spacesRemovedFirstLine = match.length;


//                             spacesRemoved += match.length;

//                             return '';
//                         });
//                     }
//                 }


//                 else {

//                     for (let i = startPos; i <= endPos; i++) {

//                         lines[i] = '    ' + lines[i];
//                     }
//                 }


//                 let start = textarea.selectionStart;
//                 let end = textarea.selectionEnd;

//                 textarea.value = lines.join('\n');

//                 textarea.selectionStart = e.shiftKey ?
//                     start - spacesRemovedFirstLine : start + 4;

//                 textarea.selectionEnd = e.shiftKey ?
//                     end - spacesRemoved : end + 4 * (endPos - startPos + 1);

//                 updateCode();
//                 return;
//             }

//             if (e.shiftKey && (e.key === "Delete" || e.key === "Backspace")) {

//                 e.preventDefault();

//                 let startPos = textarea.value.substring(0, textarea.selectionStart).split('\n').length - 1;
//                 let endPos = textarea.value.substring(0, textarea.selectionEnd).split('\n').length - 1;

//                 let cursorLine = textarea.value.substring(0, textarea.selectionStart).split('\n').pop();

//                 let cursorPosInLine = cursorLine.length;


//                 let totalLinesRemove = endPos - startPos + 1;


//                 let lines = textarea.value.split('\n');


//                 let newStart = lines.slice(0, startPos).join('\n').length + (startPos > 0 ? 1 : 0);

//                 lines.splice(startPos, totalLinesRemove);


//                 let newLine = lines[startPos] || '';


//                 if (newLine.length < cursorPosInLine) {
//                     cursorPosInLine = newLine.length;
//                 }


//                 newStart += cursorPosInLine;

//                 textarea.value = lines.join('\n');


//                 textarea.selectionStart = textarea.selectionEnd = newStart;


//                 updateCode();

//                 return;
//             }

//             if (e.key === "Home") {
//                 let line = textarea.value.substring(0, textarea.selectionStart).split('\n').pop();

//                 let cursorPosInLine = line.length;

//                 let lineStartPos = textarea.value.substring(0, textarea.selectionStart).lastIndexOf('\n') + 1;

//                 let firstNonWhitespacePos = line.search(/\S/);

//                 if (firstNonWhitespacePos >= cursorPosInLine) {
//                     return true;
//                 }
//                 else if (firstNonWhitespacePos === -1) {
//                     return true;
//                 }

//                 e.preventDefault();

//                 textarea.selectionStart = textarea.selectionEnd = lineStartPos + firstNonWhitespacePos;

//                 return;
//             }


//         });


//     }

// });

document.addEventListener('DOMContentLoaded', function () {
    console.log('loading editor.js');
});