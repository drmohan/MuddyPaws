// Draw table with items in cart 
function loadCartItems() {
    var keys = Object.keys(localStorage);
    for (var i = 0; i < keys.length-1; i++){

        var key = keys[i]
        var item = JSON.parse(localStorage.getItem(key));

        var id = item.id;
        var product = item.product;
        var size = item.size;
        var color = item.color;
        var quantity = item.quantity;
        var price = item.price;

        var html = "<tr><td class='id_column'>" + id + "</td><td>" + product + "</td><td>" + size + "</td><td>" + color + "</td><td>" + quantity + "</td><td>$" + price + "</td><td class='remove'>x</td></tr>"
 
        $("#my_table").append(html);
    }
}

// Draw table with items in wishlist 
function loadWishlistItems() {
    var wishlist = JSON.parse(localStorage.getItem('wishlist'));
    if (wishlist) {
        var keys = Object.keys(wishlist);
        for (var i=0; i < keys.length; i++) {

            var item = JSON.parse(wishlist[keys[i]]);
            var product = item.product;
            var size = item.size;
            var color = item.color;

            var html = "<tr><td>" + product + "</td><td>" + size + "</td><td>" + color + "</td></tr"

            $('#wishlist').append(html)

        }
    }
}

// Get number of items in cart
function getCartSize() {
    var keys = Object.keys(localStorage);
    var total = 0;
    for (var i = 0; i < keys.length-1; i++){
        var key = keys[i]
        var item = JSON.parse(localStorage.getItem(key));
        var quantity = item.quantity;
        total += quantity
    }
    return total
}

// Return price of given item (function of size and color)
function getPrice(product, size, color) {

    var sizes = {
        'Tiny': 5,
        'Small': 7,
        'Medium': 9,
        'Large': 11,
    }

    var colors = {
        "Strawberry": 3,
        "Blackberry": 5,
        "Crazyberry": 4,
        "Camouflage": 2,
        "Night Moon": 1,
        "Fire Orange": 6
    }

    return sizes[size] * colors[color]
    
}

// Return total of all items in cart
function getTotalPrice() {
    var keys = Object.keys(localStorage);
    var total = 0;
    for (var i = 0; i < keys.length-1; i++){
        var key = keys[i]
        var item = JSON.parse(localStorage.getItem(key));
        var quantity = item.quantity;
        var price = item.price
        total += quantity * price
    }
    return total
}

// Update total price of items in cart
function updateTotal() {
    var total_price = getTotalPrice();
    $('#total_price').text("$" + total_price)
}

// Update count of items in cart (# next to cart icon)
function updateCartCount() {
    var cartSize = getCartSize();
    $('#cart_items').text(cartSize);
}

// Update image on product detail page to reflect 
// color selection
function updateImage(color) {

    sources = {
        // https://www.caninemagnetix.com/product/magnetic-dog-collar-black/
        'Night Moon': 'assets/img/nightMoon.jpg',

        // http://www.sighthoundstuff.com/Images/CollarsLeashes/LC_1006_14_bg.jpg
        'Strawberry': 'assets/img/strawberry.jpg',

        // https://i.ytimg.com/vi/PAv59eWwQkI/maxresdefault.jpg
        'Blackberry': 'assets/img/blackberry.jpg',

        // http://animalinstinctsca.netfirms.com/animalinstincts/wp-content/uploads/2013/11/collar1.jpg
        'Crazyberry': 'assets/img/crazyberry.jpg',

        // https://i.pinimg.com/736x/df/98/51/df9851361b8ed5bea5a3cfd5b5ea596f--camo-wedding-rings-camo-wedding-dresses.jpg
        'Camouflage': 'assets/img/camo.jpg',

        // https://www.cannonballcollective.com/wp-content/uploads/2016/10/FMA-Dog-wearing-rope-collar.jpg
        'Fire Orange': 'assets/img/fireOrange.jpg'
    }

    $("#product_img_detail").attr('src', sources[color]);
}

// Returns id if product is in cart, null if not
function productInCart(product, size, color) {
    
    var keys = Object.keys(localStorage);
    for (var i = 0; i < keys.length; i++){

        var key = keys[i];
        var item = JSON.parse(localStorage.getItem(key));

        if (product == item.product && size == item.size && color == item.color) {
            return item.id
        } 
    }
    return null
}

$(document).ready(function() {

    updateCartCount();
    updateTotal(); 
    loadCartItems(); 
    loadWishlistItems();

    // add details of item to wishlist object in localStorage
    $("#add_to_wishlist").bind( "click", function(e) {
        var product = $('#product').val();
        var size = $('#size').val();
        var color = $('#color').val();

        var id = productInCart(product, size, color);
        if (! id) { 
            id = Math.floor(Math.random() * 100);
            while(! id in localStorage) {
                id = Math.floor(Math.random() * 100);
            }
        }

        var item = {
            'id': id,
            'product': product,
            'size': size,
            'color': color,
        };


        var add_item = {
            id: item
        }

        if (!localStorage.getItem('wishlist')) {
            localStorage.setItem('wishlist', JSON.stringify({}));
        }

        var wishlist = JSON.parse(localStorage.getItem('wishlist'));
        wishlist[id] = JSON.stringify(item);
        localStorage.setItem('wishlist', JSON.stringify(wishlist))
    });

    // update image and description text on selection 
    // of each size or color
    $("#product_form").bind( "change", function(e) {
        var product = $('#product').val();
        var size = $('#size').val();
        var color = $('#color').val();

        if (size && color) {
            $("#selected_size").text(size);
            $("#selected_color").text(color);
            $("#selected_price").text("$" + getPrice(product, size, color))
        }

        if (size) {
            $("#selected_size").text(size)
        }

        if (color) {
            $("#selected_color").text(color)

            // change image
            updateImage(color)
        }
    });

    // store selected item + size + color in localStorage
    $("#product_form").submit( "click", function(e) {
    	e.preventDefault();

    	var product = $('#product').val();
    	var size = $('#size').val();
    	var color = $('#color').val();
        var quantity;
        var price = getPrice(product, size, color);

        var id = productInCart(product, size, color);
        if (id) {
            quantity = JSON.parse(localStorage.getItem(id)).quantity + 1;
        } else {
            id = Math.floor(Math.random() * 100);
            while(! id in localStorage) {
                id = Math.floor(Math.random() * 100);
            }
            quantity = 1;
        }

        var item = {
            'id': id,
            'product': product,
            'size': size,
            'color': color,
            'quantity': quantity,
            'price': price
        };


        var jsonItem = JSON.stringify(item);
    	localStorage.setItem(id, jsonItem);

        // update cart and totals to reflect changes
        updateCartCount();
        updateTotal();  
	});

    // remove row from table on Cart page
    // remove object from localStorage
    $('.remove').click( function() {
        var parent = $(event.target).parent();
        var to_remove = parent[0].cells[0].innerHTML;
        var item = JSON.parse(localStorage.getItem(to_remove));

        if (item.quantity == '1') {
            localStorage.removeItem(to_remove);
            parent.remove()
        }
        else {
            item.quantity -= 1;
            localStorage.setItem(to_remove, JSON.stringify(item))
            parent[0].cells[4].innerHTML = JSON.parse(localStorage.getItem(to_remove)).quantity
        }
        
        updateCartCount();
        updateTotal();
    });

    // shift items in carousel to the right
    $('#shift_right').click(function(e) {
        e.preventDefault();
        var divs = ['#one', '#two', '#three', '#four']
        var temp = $(divs[divs.length-1]).html()
        for (var i=divs.length-1; i > -1; i--) {
            $(divs[i+1]).html($(divs[i]).html())
        }
        $(divs[0]).html(temp)
    });

    // shift items in carousel to the left
    $('#shift_left').click(function(e) {
        e.preventDefault();
        var divs = ['#one', '#two', '#three', '#four']
        var temp = $(divs[0]).html()
        for (var i=0; i < 3; i++) {
            $(divs[i]).html($(divs[i+1]).html())
        }
        $(divs[3]).html(temp)
    });

});