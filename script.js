let cart = [];

document.addEventListener("DOMContentLoaded", () => {
    fetch('menu.json')
        .then(response => response.json())
        .then(data => displayMenu(data))
        .catch(error => console.error('Error Loading Menu: ', error));
});

function displayMenu(menuItems) {
    const container = document.getElementById('menu-container');

    menuItems.forEach(item => {
        const itemDiv = document.createElement("div");
        itemDiv.classList.add("menu-item");
        itemDiv.style.border = "1px solid gray";
        itemDiv.style.margin = "10px";
        itemDiv.style.padding = "10px";

        let priceHTML = '';
        if (item.sizes) {
            priceHTML = `
                <p>Small: $${(item.sizes.Small/100).toFixed(2)}
                    <button onclick="addToCart('${item.name} (Small)', ${item.sizes.Small})">Add Small</button>
                </p>
                <p>Large: $${(item.sizes.Large/100).toFixed(2)}
                    <button onclick="addToCart('${item.name} (Large)', ${item.sizes.Large})">Add Large</button>
                </p>
            `;
        } else if (item.price){
            priceHTML = `
                <p>Price: $${(item.price/100).toFixed(2)}
                    <button onclick="addToCart('${item.name}', ${item.price})">Add to Cart</button>
                </p>
            `;
        }

        itemDiv.innerHTML = `
            <h3>${item.name}</h3>
            <p><i>${item.category}</i></p>
            ${priceHTML}
        `;
        container.appendChild(itemDiv);
    });

}

function addToCart(name, priceInCents){
    cart.push({ name: name, price: priceInCents});
    updateCartUI();
}

function updateCartUI() {
    const cartList = document.getElementById('cart-items');
    const totalDisplay = document.getElementById('cart-total');

    cartList.innerHTML = '';
    let totalCents= 0;

    cart.forEach((item, index) => {
        totalCents += item.price;
        const li = document.createElement('li');
        li.innerText = `${item.name} - $${(item.price/100).toFixed(2)}`


        const removeBtn = document.createElement('button');
        removeBtn.innerText = "X";
        removeBtn.onclick = () => {
            cart.splice(index, 1);
            updateCartUI();
        };
        li.appendChild(removeBtn);
        cartList.appendChild(li);
    });
    totalDisplay.innerText = (totalCents /100).toFixed(2);
}

document.getElementsById('checkout-btn').addEventListener('click' , () => {
    if (cart.length ===0) {
        alert('Your Cart is Empty!');
        return;
    }

    
}

