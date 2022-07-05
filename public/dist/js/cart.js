const clickButton = document.querySelectorAll('.button');
const tbody = document.querySelector('.tbody');
let carrito = [];

clickButton.forEach(btn => {
    btn.addEventListener('click', addToCartItem);
})

function addToCartItem(e) {
    const button = e.target;
    const item = button.closest('.card');
    const itemId = item.querySelector('.product-id').textContent;
    const itemTitle = item.querySelector('.product-title').textContent;
    const itemPrice = item.querySelector('.price').textContent;
    const itemImg = item.querySelector('.product-img').src;

    const newItem = {
        id: itemId,
        nombre: itemTitle,
        precio: itemPrice,
        img: itemImg,
        cantidad: 1
    }

    addItemCart(newItem);
    console.log(carrito);
}

function addItemCart(newItem) {

    const inputElement = tbody.getElementsByClassName('input-element');
    for (let i = 0; i < carrito.length; i++) {
        if (carrito[i].id.trim() === newItem.id.trim()) {
            carrito[i].cantidad++;
            const inputValue = inputElement[i];
            inputValue.value++;
            console.log(carrito);
            return null;
        }

    }

    carrito.push(newItem);
    renderCart();
}

function renderCart() {
    tbody.innerHTML = '';
    carrito.map(item => {
        const tr = document.createElement('tr');
        tr.classList.add('itemCart');
        const content = `
        <th scope="row">${item.id}</th>
        <td> <img src="${item.img}" width="30" height="30" class="rounded" alt="..."></td>
        <td>${item.nombre}</td>
        <td class="table-cantidad"><input type="number" min="1" class="input-element" value="${item.cantidad}"></td>
        <td>${item.precio}</td>
    `
        tr.innerHTML = content;
        tbody.append(tr);
    })
}

//filtro de productos
const searchBar = document.querySelector('.buscador');
searchBar.addEventListener('keyup', function (e) {
    console.log(e.target.value);
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
        console.log(nombreProducto);

    })

});

//SweetAlert2 - Confirmar Eliminacion de producto
$('.formulario-eliminar').submit(function(e){
    e.preventDefault();
    Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire(
                'Deleted!',
                'Your file has been deleted.',
                'success'
              )
            this.submit();
        }
      })
});