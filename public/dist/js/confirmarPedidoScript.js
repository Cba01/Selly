//filtro de productos
const searchBar = document.querySelector('.buscador');
searchBar.addEventListener('keyup', function (e) {
    const term = e.target.value.toLowerCase();
    const clienteItems = document.querySelectorAll('.cliente-buscador');

    Array.from(clienteItems).forEach(function (clienteItems) {
        const nombreCliente = clienteItems.querySelector('.client-name').textContent;

        if (nombreCliente.toLowerCase().indexOf(term) != -1) {
            clienteItems.style.display = 'block';
        }
        else {
            clienteItems.style.display = 'none';
        }

    })

});