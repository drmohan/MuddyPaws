
function getCartSize() {
    var keys = Object.keys(localStorage);
    var total = 0;
    for (var i = 0; i < keys.length; i++){
        var key = keys[i]
        var item = JSON.parse(localStorage.getItem(key));
        var quantity = item.quantity;
        console.log(quantity)
        total += quantity
    }
    return total
}

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

    var cartSize = getCartSize();
    $('#cart_items').text(getCartSize);  

    $("#myForm").submit( "click", function(e) {
    	e.preventDefault();

    	var product = $('#product').val();
    	var size = $('#size').val();
    	var color = $('#color').val();
        var quantity;

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
            'quantity': quantity
        };

        var jsonItem = JSON.stringify(item);
    	localStorage.setItem(id, jsonItem);

        var cartSize = getCartSize();
        $('#cart_items').text(getCartSize);  
	});

});