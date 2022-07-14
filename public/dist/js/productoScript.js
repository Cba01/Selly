//filtro de productos
const searchBar = document.querySelector('.buscador');
searchBar.addEventListener('keyup', function (e) {
    const term = e.target.value.toLowerCase();
    const productosItems = document.querySelectorAll('.productos-buscador');

    Array.from(productosItems).forEach(function (productosItems) {
        const nombreProducto = productosItems.querySelector('.product-title').textContent;

        if (nombreProducto.toLowerCase().indexOf(term) != -1) {
            productosItems.style.display = 'block';
        }
        else {
            productosItems.style.display = 'none';
        }
    })

});

//SweetAlert2 - Confirmar Eliminacion de producto
$('.formulario-eliminar').submit(function (e) {
    e.preventDefault();
    Swal.fire({
        title: 'Estas seguro de eliminar este producto?',
        text: "Esta accion no se podrá revertir!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, Eliminarlo!',
        cancelButtonText: 'Cancelar'
    }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire(
                'Eliminarlo!',
                'El producto ha sido eliminado.',
                'success'
            )
            this.submit();
        }
    })
});