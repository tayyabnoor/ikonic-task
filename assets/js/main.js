/**
 * Theme Name: Alquran
 * Author: tayyab1823@gmail.com/
*/



(function() {
  "use strict";

  /**
   * Easy selector helper function
   */
  const select = (el, all = false) => {
    el = el.trim()
    if (all) {
      return [...document.querySelectorAll(el)]
    } else {
      return document.querySelector(el)
    }
  }

  /**
   * Easy event listener function
   */
  const on = (type, el, listener, all = false) => {
    let selectEl = select(el, all)
    if (selectEl) {
      if (all) {
        selectEl.forEach(e => e.addEventListener(type, listener))
      } else {
        selectEl.addEventListener(type, listener)
      }
    }
  }

  /**
   * Easy on scroll event listener 
   */
  const onscroll = (el, listener) => {
    el.addEventListener('scroll', listener)
  }

  /**
   * Back to top button
   */
  let backtotop = select('.back-to-top')
  if (backtotop) {
    const toggleBacktotop = () => {
      if (window.scrollY > 100) {
        backtotop.classList.add('active')
      } else {
        backtotop.classList.remove('active')
      }
    }
    window.addEventListener('load', toggleBacktotop)
    onscroll(document, toggleBacktotop)
  }

  /**
   * Mobile nav toggle
   */
  on('click', '.mobile-nav-toggle', function(e) {
    select('#navbar').classList.toggle('navbar-mobile')
    this.classList.toggle('bi-list')
    this.classList.toggle('bi-x')
  })


  /**
   * Preloader
   */
  let preloader = select('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove()
    });
  }

 

  /**
   * Animation on scroll
   */
  window.addEventListener('load', () => {
    AOS.init({
      duration: 1000,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    })
  });


  /**
  * Cart 
  */

  // Get the products and cart elements
  const products = document.getElementById('products');
  const cart = document.getElementById('cart');
  const cartItems = document.getElementById('cart-items');
  const cartTotal = document.getElementById('cart-total');
  const checkoutButton = document.getElementById('checkout');

  // Get the cart data from local storage or initialize it as an empty array
  let cartData = JSON.parse(localStorage.getItem('cartData')) || [];

  // Update the cart UI based on the cart data
  function updateCart() {
    // Clear the cart items list
    cartItems.innerHTML = '';
    
    // Calculate the total price
    let total = 0;
    for (const item of cartData) {
      const product = getProductById(item.id);
      total += product.price * item.quantity;
      const li = document.createElement('li');
      li.textContent = `${product.name} x ${item.quantity}`;
      cartItems.appendChild(li);
    }
    cartTotal.textContent = total.toFixed(2);
    
    // Save the cart data to local storage
    localStorage.setItem('cartData', JSON.stringify(cartData));
  }

  // Get a product object by its ID
  function getProductById(id) {
    const productElements = products.getElementsByClassName('product');
    for (const productElement of productElements) {
      if (productElement.querySelector('.add-to-cart').dataset.productId === id) {
        const name = productElement.querySelector('h3').textContent;
        const price = parseFloat(productElement.querySelector('p.price').textContent.slice(8));
        //console.log(price);
        return {id, name, price};
      }
    }
    return null;
  }

  // Add an item to the cart
  function addToCart(id) {
    const existingItem = cartData.find(item => item.id === id);
    if (existingItem) {
      existingItem.quantity++;
    } else {
      cartData.push({id, quantity: 1});
    }
    updateCart();
  }

  // Add event listeners to the "Add to cart" buttons
  const addToCartButtons = products.getElementsByClassName('add-to-cart');
  for (const button of addToCartButtons) {
    const productId = button.dataset.productId;
    button.addEventListener('click', () => addToCart(productId));
  }

  // Add event listener to the "Checkout" button
  checkoutButton.addEventListener('click', () => {
    // TODO: Implement checkout functionality
    alert('Checkout not yet implemented');
  });

  // Update the cart UI based on the initial

  
  

})()