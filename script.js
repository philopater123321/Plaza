let cart = [];

document.addEventListener("DOMContentLoaded", () => {
    fetch('menu.json')
        .then(response => response.json())
        .then(data => displayMenu(data))
        .catch(error => console.error('Error Loading Menu: ', error));
});

function displayMenu(menuItems) {
    const container = document.getElementById('menu-container');
    container.innerHTML = '';
    const categories = [...new Set(menuItems.map(item => item.category))];

    categories.forEach(category => {
        const wrapper = document.createElement('div');
        wrapper.className = 'category-wrapper';
        const heading = document.createElement('h2');
        heading.innerText = category;
        heading.className = 'category-heading';
        wrapper.appendChild(heading);
        container.appendChild(wrapper);

        const grid = document.createElement('div');
        grid.className = 'category-container';

        const categoryItems = menuItems.filter(item => item.category === category);

        categoryItems.forEach( item => {
            const itemDiv = document.createElement('div');
            itemDiv.className = 'menu-item';

            let priceHTML = '';

            if(item.sizes){
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
                ${priceHTML}
            `;
            grid.appendChild(itemDiv);
        });

    container.appendChild(grid);
    });
}

function toggleCart(){
    const sidebar = document.getElementById('cart-sidebar');
    sidebar.classList.toggle('open');
}
function addToCart(name, priceInCents){
    cart.push({ name: name, price: priceInCents});
    updateCartUI();
}

function updateCartUI() {
    const cartList = document.getElementById('cart-items');
    const totalDisplay = document.getElementById('cart-total');

    const badgeCount = document.getElementById('cart-badge-count');

    cartList.innerHTML = '';
    let totalCents= 0;

    cart.forEach((item, index) => {
        totalCents += item.price;
        const li = document.createElement('li');

        const textSpan = document.createElement('span');

        textSpan.innerText = `${item.name} - $${(item.price/100).toFixed(2)}`


        const removeBtn = document.createElement('button');
        removeBtn.innerText = "X";
        removeBtn.onclick = () => {
            cart.splice(index, 1);
            updateCartUI();
        };
        li.appendChild(textSpan);
        li.appendChild(removeBtn);
        cartList.appendChild(li);
        
    });
    totalDisplay.innerText = (totalCents /100).toFixed(2);

    badgeCount.innerText = cart.length;
}

document.getElementById('checkout-btn').addEventListener('click' , () => {
    if (cart.length ===0) {
        alert('Your Cart is Empty!');
        return;
    }
    let finalTotalCents = cart.reduce((sum, item) => sum +item.price, 0);
    alert(`🍕Order Confirmed! \n\n Your payment of $${(finalTotalCents/100).toFixed(2)} was successful !`)
    cart = [];
    updateCartUI();
    
    toggleCart();
});

