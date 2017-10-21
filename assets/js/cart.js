$(document).ready(function() {

    // $('#cart_items').text(localStorage.length); 

    var keys = Object.keys(localStorage);
    for (var i = 0; i < keys.length; i++){

        var key = keys[i]
        var item = JSON.parse(localStorage.getItem(key));

        var id = item.id;
        var product = item.product;
        var size = item.size;
        var color = item.color;

        var html = "<tr><td>" + id + "</td><td>" + product + "</td><td>" + size + "</td><td>" + color + "</td><td>" + "1" + "</td><td>" + "$10.80" + "</td><td class='remove'>x</td></tr>"
 
        $("#my_table").append(html);
    }

    $('.remove').click( function() {
        var parent = $(event.target).parent();
        console.log(parent[0].cells[0].innerHTML)
        console.log(parent)
        var to_remove = parent[0].cells[0].innerHTML;
        localStorage.removeItem(to_remove);
        parent.remove()
    });

});