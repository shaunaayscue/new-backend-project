"use strict";

let map;
let bookstoreListDiv;
let messageDiv;
let mapInitialized = false;

document.addEventListener('DOMContentLoaded', function () {
    const searchInput = document.getElementById('product-search-input');
    const genreFilter = document.getElementById('genre-filter');
    const allGenreOptions = Array.from(genreFilter.options); 

    searchInput.addEventListener('input', function () {
        const searchTerm = this.value.trim().toLowerCase();

        allGenreOptions.forEach(option => {
            if (option.value === 'all') {
                option.style.display = ''; 
            } else if (option.textContent.toLowerCase().includes(searchTerm)) {
                option.style.display = ''; 
            } else {
                option.style.display = 'none'; 
            }
        });
    });

    /**
    * Retrieves a query parameter from the current URL.
    * @param {string} name - The name of the query parameter to retrieve.
    * @returns {string|null} The value of the query parameter, or null if not found.
    */
    function applyFiltersAndSorting() {
        const sortByValue = document.getElementById('sort-by').value;
        const genreFilterValue = genreFilter.value;
        const searchTermValue = searchInput ? searchInput.value.trim() : '';

        let url = '/products?';

        if (searchTermValue !== '') {
            url += 'value=' + searchTermValue + '&';
        }

        if (sortByValue !== '') {
            url += 'sortBy=' + sortByValue + '&';
        }

        if (genreFilterValue !== 'all') {
            url += 'category_name=' + genreFilterValue + '&';
        }

        if (url.endsWith('&')) {
            url = url.slice(0, -1);
        }

        window.location.href = url;
    }

    genreFilter.addEventListener('change', applyFiltersAndSorting);

    const sortBySelect = document.getElementById('sort-by');
    if (sortBySelect) {
        const sortOptions = [
            { value: 'name-asc', text: 'Name (A-Z)' },
            { value: 'name-desc', text: 'Name (Z-A)' },
            { value: 'price-asc', text: 'Price (Low to High)' },
            { value: 'price-desc', text: 'Price (High to Low)' }
        ];

        sortOptions.forEach(optionData => {
            const option = document.createElement('option');
            option.value = optionData.value;
            option.textContent = optionData.text;
            const initialSortBy = getQueryParam('sortBy');
            if (initialSortBy === optionData.value) {
                option.selected = true;
            }
            sortBySelect.appendChild(option);
        });

        sortBySelect.addEventListener('change', applyFiltersAndSorting);
    }

    /**
    * Applies the selected filters and sorting options to the product list by redirecting the user.
    */
    function getQueryParam(name) {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get(name);
    }

    const addToCartBtn = document.getElementById('add-to-cart-btn');

    if (addToCartBtn) {
        addToCartBtn.addEventListener('click', function () {
            const productId = addToCartBtn.dataset.productId;
            const userId = '<%= user ? user.user_id : null %>';

            if (productId && userId) {
                fetch('/cart/add', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ product_id: productId, userId: userId, quantity: 1 }),
                })
                    .then(function (response) {
                        if (response.ok) {
                            return response.json();
                        } else {
                            return response.text().then(function (text) {
                                throw new Error('Server error: ' + response.status + ' - ' + text);
                            });
                        }
                    })
                    .then(function (data) {
                        console.log('Item added to cart:', data);
                        alert('Item added to cart!');
                    })
                    .catch(function (error) {
                        console.error('Error adding item to cart:', error);
                        alert('Failed to add item to cart.');
                    });
            } else {
                console.error('Product ID or User ID not found.');
                alert('Error: Could not identify the product or user. Make sure you are logged in.');
            }
        });
    }

    const deleteButtons = document.querySelectorAll(".cart-remove-btn");

    deleteButtons.forEach(function (button) {
        button.addEventListener("click", function (e) {
            const productId = e.currentTarget.getAttribute("id");
            const userId = document.getElementById('cart-container').dataset.userId;

            if (userId && productId) {
                fetch('/cart/products/delete/' + productId, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                })
                    .then(function (response) {
                        if (response.ok) {
                            alert('Item removed from cart!');
                            location.reload();
                        } else {
                            return response.text().then(function (text) {
                                throw new Error('Server error: ' + response.status + ' - ' + text);
                            });
                        }
                    })
                    .catch(function (error) {
                        console.error('Error removing item from cart:', error);
                        alert('Failed to remove item from cart.');
                    });
            }
        });
    });

    const abandonCartBtn = document.getElementById('abandon-cart-btn');
    const cartContainer = document.getElementById('cart-container');
    const checkoutBtn = document.getElementById('checkout-btn');

    if (cartContainer) {
        cartContainer.addEventListener('change', function (event) {
            if (event.target.classList.contains('cart-quantity')) {
                const quantityInput = event.target;
                const productId = quantityInput.dataset.productId;
                const newQuantity = parseInt(quantityInput.value, 10);
                const userId = cartContainer.dataset.userId;

                if (productId && userId && newQuantity > 0) {
                    fetch('/cart/' + userId + '/products/update/' + productId, {
                        method: 'PUT',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ quantity: newQuantity }),
                    })
                        .then(function (response) {
                            if (response.ok) return response.json();
                            return response.text().then(function (text) { throw new Error('Server error: ' + response.status + ' - ' + text); });
                        })
                        .then(function (data) {
                            console.log('Cart updated:', data);

                            const itemTotalElement = quantityInput.parentNode.querySelector('.item-total');
                            if (itemTotalElement && data.updatedItemTotal !== undefined) {
                                itemTotalElement.textContent = 'Total: $' + data.updatedItemTotal.toFixed(2);
                            }
                            document.getElementById('subtotal-price').textContent = '$' + data.subtotal.toFixed(2);
                            document.getElementById('tax-price').textContent = '$' + data.tax.toFixed(2);
                            document.getElementById('delivery-fee').textContent = '$' + data.deliveryFee.toFixed(2);
                            document.getElementById('cart-total-price').textContent = '$' + data.total.toFixed(2);
                        })
                        .catch(function (error) {
                            console.error('Error updating cart:', error);
                            alert('Failed to update cart.');
                        });
                } else if (newQuantity <= 0) {
                    alert('Quantity must be at least 1.');
                    quantityInput.value = 1;
                }
            }
        });

        cartContainer.addEventListener('keypress', function (event) {
            if (event.target.classList.contains('cart-quantity') && event.key === 'Enter') {
                event.preventDefault();

                const quantityInput = event.target;
                const productId = quantityInput.dataset.productId;
                const newQuantity = parseInt(quantityInput.value, 10);
                const userId = cartContainer.dataset.userId;

                if (productId && userId && newQuantity > 0) {
                    fetch('/cart/' + userId + '/products/update/' + productId, {
                        method: 'PUT',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ quantity: newQuantity }),
                    })
                        .then(function (response) {
                            if (response.ok) return response.json();
                            return response.text().then(function (text) { throw new Error('Server error: ' + response.status + ' - ' + text); });
                        })
                        .then(function (data) {
                            console.log('Cart updated on Enter:', data);

                            const itemTotalElement = quantityInput.parentNode.querySelector('.item-total');
                            if (itemTotalElement && data.updatedItemTotal !== undefined) {
                                itemTotalElement.textContent = 'Total: $' + data.updatedItemTotal.toFixed(2);
                            }
                            document.getElementById('subtotal-price').textContent = '$' + data.subtotal.toFixed(2);
                            document.getElementById('tax-price').textContent = '$' + data.tax.toFixed(2);
                            document.getElementById('delivery-fee').textContent = '$' + data.deliveryFee.toFixed(2);
                            document.getElementById('cart-total-price').textContent = '$' + data.total.toFixed(2);

                            alert('Cart quantity updated!');
                        })
                        .catch(function (error) {
                            console.error('Error updating cart on Enter:', error);
                            alert('Failed to update cart.');
                        });

                } else if (newQuantity <= 0) {
                    alert('Quantity must be at least 1.');
                    quantityInput.value = 1;
                }
            }
        });
    }

    if (abandonCartBtn && cartContainer) {
        abandonCartBtn.addEventListener('click', function () {
            const userId = cartContainer.dataset.userId;

            if (userId) {
                fetch('/cart/' + userId + '/abandon', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                })
                    .then(response => {
                        if (response.ok) {
                            return response.json();
                        } else {
                            return response.json().then(data => {
                                throw new Error(data.message || 'Failed to abandon cart.');
                            });
                        }
                    })
                    .then(data => {
                        alert(data.message || 'Cart abandoned successfully.');
                        window.location.reload();
                    })
                    .catch(error => {
                        console.error('Error abandoning cart:', error);
                        alert(error.message || 'Failed to abandon cart. Please try again.');
                    });
            } else {
                alert('Error: Could not identify the user. Please log in.');
            }
        });
    }

    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', function () {
            const userId = cartContainer.dataset.userId;

            if (userId) {
                fetch('/cart/' + userId + '/checkout', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ userId: userId }),
                })
                    .then(function (response) {
                        if (response.ok) {
                            return response.json();
                        } else {
                            return response.text().then(function (text) {
                                throw new Error('Checkout failed: ' + response.status + ' - ' + text);
                            });
                        }
                    })
                    .then(function (data) {
                        console.log('Checkout initiated:', data);
                        if (data.redirectUrl) {
                            window.location.href = data.redirectUrl;
                        } else if (data.orderConfirmation) {
                            alert('Order placed successfully!');
                            window.location.href = '/cart/orders';
                        } else {
                            alert('Checkout successful!');
                            window.location.href = '/cart/orders';
                        }
                    })
                    .catch(function (error) {
                        console.error('Error during checkout:', error);
                        alert('Checkout failed. Please try again.');
                    });
            } else {
                console.error('User ID not found. Cannot proceed with checkout.');
                alert('Error: User not identified. Please log in.');
            }
        });
    }

});

/**
 * Initializes the Google Maps API and centers the map on Oxford, NC.
 */
function initMap() {
    console.log('initMap called from scripts.js');
    const oxfordLocation = { lat: 36.3167744, lng: -78.5907712 };
    const mapContainer = document.getElementById('map-container');
    bookstoreListDiv = document.getElementById('bookstore-list');
    messageDiv = document.getElementById('message-container');
    if (mapContainer) {
        map = new google.maps.Map(mapContainer, {
            center: oxfordLocation,
            zoom: 12
        });
        console.log('Map object in initMap (scripts.js):', map);
        mapInitialized = true;
    } else {
        console.error('Map container not found.');
    }
}


window.onload = function () {
    initMap();
    const findBookstoresBtn = document.getElementById('find-bookstores-btn');

    findBookstoresBtn.addEventListener('click', function () {
        console.log('Button clicked!');
        console.log('findBookstoresBtn clicked, current map object:', map);
        if (mapInitialized) {
            if (navigator.geolocation) {
                if (messageDiv) {
                    messageDiv.textContent = 'Finding your location...';
                }
                navigator.geolocation.getCurrentPosition(
                    function (position) {
                        const userLocation = {
                            lat: position.coords.latitude,
                            lng: position.coords.longitude
                        };
                        if (messageDiv) {
                            messageDiv.textContent = '';
                        }
                        findNearbyBookstores(userLocation);
                    },
                    function (error) {
                        if (messageDiv) {
                            messageDiv.textContent = 'Error getting your location.';
                        }
                        console.error('Error getting location:', error);
                    }
                );
            } else {
                if (messageDiv) {
                    messageDiv.textContent = 'Geolocation is not supported by your browser.';
                }
            }
        } else {
            console.warn('Map not initialized yet. Please wait.');
            if (messageDiv) {
                messageDiv.textContent = 'Map is still loading. Please wait...';
            }
        }
    });

    /**
 * Finds nearby bookstores using the Google Places API based on the provided location.
 * @param {object} location - An object with 'lat' and 'lng' properties representing the user's location.
 */
    function findNearbyBookstores(location) {
        console.log('findNearbyBookstores called with location:', location, 'map:', map);
        if (bookstoreListDiv) {
            bookstoreListDiv.innerHTML = '';
        }
        if (messageDiv) {
            messageDiv.textContent = 'Searching for bookstores...';
        }

        const url = '/api/nearby-bookstores?lat=' + location.lat + '&lng=' + location.lng;

        fetch(url)
            .then(function (response) {
                if (!response.ok) {
                    console.error('HTTP error! status: ' + response.status);
                    throw new Error('HTTP error! status: ' + response.status);
                }
                return response.json();
            })
            .then(function (data) {
                console.log('Bookstore data received:', data);
                if (messageDiv) {
                    messageDiv.textContent = '';
                }
                if (data && data.results && data.results.length > 0 && map) {
                    const bounds = new google.maps.LatLngBounds();
                    data.results.forEach(function (bookstore) {
                        if (bookstore.geometry && bookstore.geometry.location) {
                            const marker = new google.maps.Marker({
                                position: bookstore.geometry.location,
                                map: map,
                                title: bookstore.name
                            });
                            bounds.extend(bookstore.geometry.location);

                            if (bookstoreListDiv) {
                                const listItem = document.createElement('div');
                                listItem.textContent = bookstore.name;
                                bookstoreListDiv.appendChild(listItem);
                            }
                        } else {
                            console.warn('Skipping bookstore due to missing geometry or location:', bookstore);
                        }
                    });
                    map.fitBounds(bounds);
                } else if (bookstoreListDiv) {
                    bookstoreListDiv.textContent = 'No bookstores found nearby.';
                } else {
                    console.warn('Data or data.results is undefined, or map is not initialized.');
                }
            })
            .catch(function (error) {
                if (bookstoreListDiv) {
                    bookstoreListDiv.textContent = 'Error fetching bookstore data.';
                }
                console.error('Error fetching bookstores:', error);
            });
    }
};