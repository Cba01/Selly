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

function validateForm() {
    let client = document.forms["frmPedido"]["clientRadio"].value;
    if (client == "") {
        const Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
                toast.addEventListener('mouseenter', Swal.stopTimer)
                toast.addEventListener('mouseleave', Swal.resumeTimer)
            }
        })

        Toast.fire({
            icon: 'error',
            title: 'Debe seleccionar un cliente'
        })
        return false;
    }else{
        window.localStorage.clear();
        return true;
    }

}