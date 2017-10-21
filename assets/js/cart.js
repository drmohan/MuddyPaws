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

$(document).ready(function() {

    var cartSize = getCartSize();
    $('#cart_items').text(cartSize);


    var keys = Object.keys(localStorage);
    for (var i = 0; i < keys.length; i++){

        var key = keys[i]
        var item = JSON.parse(localStorage.getItem(key));

        var id = item.id;
        var product = item.product;
        var size = item.size;
        var color = item.color;
        var quantity = item.quantity;

        var html = "<tr><td>" + id + "</td><td>" + product + "</td><td>" + size + "</td><td>" + color + "</td><td>" + quantity + "</td><td>" + "$10.80" + "</td><td class='remove'>x</td></tr>"
 
        $("#my_table").append(html);
    }

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
        
        cartSize = getCartSize();
        $('#cart_items').text(cartSize);
    });

});