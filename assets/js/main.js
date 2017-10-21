// var key = localStorage.length + 1;

$(document).ready(function() {

    $("#myForm").submit( "click", function(e) {
    	e.preventDefault();

        var id = Math.floor(Math.random() * 100);
        console.log(id)
    	var product = $('#product').val();
    	var size = $('#size').val();
    	var color = $('#color').val();

        var item = {
            'id': id,
            'product': product,
            'size': size,
            'color':color
        };

        var jsonItem = JSON.stringify(item);

    	localStorage.setItem(id, jsonItem);
        // key += 1;

        $('#cart_items').text(localStorage.length);  


	});

});