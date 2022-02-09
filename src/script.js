var products = [];
flag = -1;

$(document).ready(function(){
    $('#add_product').click(function(){
        var p_sku = $('#product_sku').val();
        var p_name = $('#product_name').val();
        var p_price = $('#product_price').val();
        var p_qty = $('#product_quantity').val();
        if (checkValues(p_sku, p_name, p_price, p_qty) && idValidate(p_sku, products)){
            var product = getArray(p_sku, p_name, p_price, p_qty);

            if (flag == -1){
                products.push(product);
                display(products);
                $('.success').css('display', 'block');
                $('.error').css('display', 'none');
            }
        }
        else{
            $('.error').css('display', 'block');
            $('.success').css('display', 'none');
        }
           
    });
    $('body').on("click", "#edit_form", function(){
        $('#update').css('display', 'inline');
        $('#add_product').css('display', 'none');
        
        var p_id = $(this).data("id");
        prod = getProduct(p_id);

        $('#product_sku').val(prod.sku);
        $('#product_name').val(prod.name);
        $('#product_price').val(prod.price);
        $('#product_quantity').val(prod.qty);
    });

    $('body').on("click", "#delete", function(){
        var p_id = $(this).data("id");
        prod = getProduct(p_id);
        products.splice(products.indexOf(prod),1);
        display(products);
    });

    $('#update').click(function(){
        var update_sku = $('#product_sku').val();
        var update_name = $('#product_name').val();
        var update_price = $('#product_price').val();
        var update_qty = $('#product_quantity').val();
        
        var temp = getProduct(update_sku);
        temp.name = update_name;
        temp.price = update_price;
        temp.qty = update_qty;
        display(products);
    });

});

function getProduct(p_sku){
    for (var i = 0; i < products.length; i++){
        if (p_sku == products[i].sku){
            return products[i];
        }
    }  
}


function display(products){

    var html = '<tr>\
        <th>SKU</th>\
        <th>Name</th>\
        <th>Price</th>\
        <th>Quantity</th>\
        <th>Action</th>\
    </tr> ';

    for (var i=0; i < products.length; i++){
        html += '<tr>\
        <td>'+products[i].sku+'</td>\
        <td>'+products[i].name+'</td>\
        <td>'+products[i].price+'</td>\
        <td>'+products[i].qty+'</td>\
        <td><a href ="#" id="edit_form" data-id='+ products[i].sku +'>Edit</a>/<a href ="#" id="delete" data-id='+ products[i].sku +'>Delete</a></td>\
    </tr>'
    }
    // document.getElementById('table').innerHTML = html;
    $('#table').html(html);

}


function getArray(p_sku, p_name, p_price, p_qty){
    flag = -1;
    return {
        'sku' : p_sku,
        'name' : p_name,
        'price' : p_price,
        'qty' : p_qty
    };
}


function idValidate(p_sku, products){
    for (var i = 0; i<products.length; i++){
        if (p_sku == products[i].sku){
            return false;
        }
    }
    return true;
}

function checkValues(p_sku, p_name, p_price, p_qty){
    if (p_sku == "" || isNaN(p_sku)){
        $('#product_sku').css('border', 'red 3px solid');
        return false;
    }
    else if(p_name == "" ){
        $('#product_name').css('border', 'red 3px solid');
        return false;
    }
    else if(p_price == "" || isNaN(p_price)){
        $('#product_price').css('border', 'red 3px solid');
        return false;
    }
    else if(p_qty == "" || isNaN(p_qty)){
        $('#product_quantity').css('border', 'red 3px solid');
        return false;
    }
    else{
        return true;
    }
}