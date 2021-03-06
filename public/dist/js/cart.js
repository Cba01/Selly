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
            totalCart();
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
        <th scope="row"><h6 class="idCartProduct">${item.id}</h6></th>
        <td> <img src="${item.img}" width="30" height="30" class="rounded" alt="..."></td>
        <td>${item.nombre}</td>
        <td class="table-cantidad"><input type="number" min="1" class="input-element" value="${item.cantidad}"></td>
        <td>${item.precio}</td>
        <td><button type="button" class="btn btn-outline-danger deleteProduct"><i class="fas fa-circle-xmark"></i></button></td>

    `
        tr.innerHTML = content;
        tbody.append(tr);

        tr.querySelector(".deleteProduct").addEventListener('click', removeItemCart);

       tr.querySelector(".input-element").addEventListener('change', amountChange);
    })
    totalCart();
    
}

function removeItemCart(e) {
    const buttonDelete = e.target;
    const tr = buttonDelete.closest(".itemCart");
    const idProducto = tr.querySelector('.idCartProduct').textContent;
    for (let i = 0; i < carrito.length; i++) {
        if (carrito[i].id.trim()=== idProducto.trim()) {

            carrito.splice(i,1);
        }
    }
    tr.remove();
    totalCart();
}

/* Calcular total del carrito */
function totalCart() {
    let total = 0;
    const itemCartTotal = document.querySelector('.itemCartTotal');
    carrito.forEach((item) => {
        const precio = Number(item.precio.replace("$", ''))
        total = total + precio * item.cantidad;
    })
    itemCartTotal.innerHTML = `Total $${total}`;
    document.querySelector('.pedidoTotal')
    addLocalStorage();

    /* Enviar informacion al backend */
    totalPrice(total);
    cartChange();
}

 function amountChange(e){
    const sumaInput = e.target;
    const tr = sumaInput.closest(".itemCart");
    const idProducto = tr.querySelector('.idCartProduct').textContent;
    carrito.forEach(item =>{
        if(item.id.trim() === idProducto.trim()){
            sumaInput.value < 1 ? (sumaInput.value = 1) : sumaInput.value
            item.cantidad = sumaInput.value;
            totalCart();
        }
    })
} 

/* Informacion para pasar por el form */
        /* informacion del pedido */
function cartChange(){
    document.getElementById("datosPedido").value = JSON.stringify(carrito);
}
        /* informacion del precio total del pedido */
function totalPrice(total){
    document.getElementById("pedidoTotal").value = total;
}





/* LocalStorage */
function addLocalStorage(){
    localStorage.setItem('carrito', JSON.stringify(carrito));
}

window.onload = function(){
    const storage = JSON.parse(localStorage.getItem('carrito'));
    if (storage) {
        carrito = storage;
        renderCart();
    }
}

function getCart(){
    return carrito;
}



