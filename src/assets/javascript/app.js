document.addEventListener('DOMContentLoaded', function () {
  
    class HTMLInjector extends HTMLElement {
        constructor() {
            super();

            const src = this.getAttribute('src');
            if (src) {

                fetch(src)
                    .then(response => response.text())
                    .then(html => {
                        this.innerHTML = html;
                        const scriptSRC = this.getAttribute('script-src');
                        const styleSRC = this.getAttribute('style-src');
                        if(scriptSRC) {
                            const script = document.createElement('script');
                            script.src = scriptSRC;
                            document.head.appendChild(script);
                        }
                        if(styleSRC) { 
                            const link = document.createElement('link');
                            link.rel = 'stylesheet';
                            link.href = styleSRC;
                            document.head.appendChild(link);
                        }
                    })
                    .catch(error => {
                        console.error('Erro ao carregar o arquivo:', error);
                    });
            } else {
                console.error('Atributo "src" não especificado.');
            }
        }
    }

    customElements.define('html-injector', HTMLInjector);
  
});


