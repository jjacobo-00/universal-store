function updateSubTotal(id, price, status) {
    let currentQty = parseInt($( '#qty-'+ id ).val());
    if(status == 1) {currentQty += 1;} else if(status == 0) {currentQty -= 1;}
    
    $( '#qty-'+ id ).val(currentQty);
    let subtotal = currentQty.toFixed(2)*price.toFixed(2);
    $( '#subtotal-'+ id ).html(`₱${numberWithCommas(subtotal.toFixed(2))}`);
    updateTotal();
}


function updateTotal() {
    let result;
    let prices = [];
    $('#cart-table tr td:nth-child(4)').each( function( cmp ) { 
        let subtotal = $(this).text();
        subtotal=parseFloat((subtotal.replace(/\,/g,'')).substring(1));
        result = parseFloat(result) + parseFloat(subtotal);
        prices.push(parseFloat(subtotal));
    });
    console.log(prices);
    let sum = prices.reduce((partialSum, a) => partialSum + a, 0);
    $('#total').html(sum.toFixed(2));
}

function addRow(id, name, price, qty) {
    var table = $('#cart-table').DataTable();
    const qtyid = `qty-${id}`;
    const subtotalid = `subtotal-${id}`;
    price = parseInt(price);
    var rowNode = table
    .row.add([   
        name, 
        `<span id="price-${id}">₱${numberWithCommas(price)}</span>`,
        `<div class="d-flex justify-content-center" style="display: inline-block;">
            <button class="btn btn-dark qty-dec" data-id="${id}" data-qty="${qty}" style="border-radius: 7px 0 0 7px;"><i class="fa-solid fa-minus float-end"></i></button>
            <input type="text" id="${qtyid}" class="form-control text-center qty" value="1" style="width: 35%; border-radius: 0;" data-id="${id}">
            <button class="btn btn-dark float-start qty-inc"  data-id="${id}" data-qty="${qty}" style="border-radius: 0 7px 7px 0;"><i class="fa-solid fa-plus"></i></button>
        </div>`, 
        `<span id="${subtotalid}">₱${numberWithCommas(price.toFixed(2))}</span>`, 
        `<button class="btn btn-danger rounded-circle remove-prod" data-id="${id}"><i class="fa-solid fa-x"></i></button>`
    ]).draw();
    dataSet.push(id);
    updateTotal();
}


var dataSet = [];
var qtySet = [];
let ctr = 1;
let qty = 0;
const OrderDataTable = {
    init: async(sort) => {
        const productData = await inventory.getAllProducts(sort);

        $('#cart-table').dataTable({
            searching: false,
            bPaginate: false,
            info: false,
            ordering: false,
            responsive: true,
            columns: [
                { title: 'Product Name', "width": "45%" },
                { title: 'Price', "width": "5%" },
                { title: 'Qty', "width": "30%", className: "text-center"},
                { title: 'Subtotal', "width": "10%", className: "text-end fw-bold" },
                { title: ' ', "width": "10%", className: "text-end" },
            ],
            fixedHeader: {
                header: true,
                footer: true
            },
            "fnCreatedRow": function( nRow, aData, index ) {
                $(nRow).attr('id', index);
                $(nRow).attr('data-index', index);
            }
        })
        $('#order-table').dataTable({
            data: productData,
            columns: [
                // { title: 'id', data: 'id', visible: false},
                { title: 'Product #', data: 'product_num', className: "productNum", width: '11%' },
                { title: 'Product Name', data: 'product_name', className: "productName", width: '23%' },
                { title: 'Qty', data: 'product_qty', width: '10%' },
                { title: 'SRP', data: 'product_srp', className: "text-end fw-bold", render: $.fn.dataTable.render.number( ',', '.', 2, '₱ ' ), width: '10%' },
                { title: 'Actions', data: null, sortable: false, width: '8%',
                    render: function ( data, type, full, meta ) {
                        return `<button type="button" class="btn btn-success me-2" id="ord_add" data-id="${full.id}" data-name="${full.product_name}" data-price="${full.product_srp}" data-qty="${full.product_qty}"><i class="fa-solid fa-cart-plus"></i></button>`;
                    }
                },
            ],
            columnDefs: [
                {
                    targets: 3,
                    render: function (data) {
                        var date = new Date(data);
                        return (monthNames[date.getMonth()] + " " + date.getDate() + ", " + date.getFullYear());
                    }
                },
            ],
            responsive: true,
            aaSorting: [],
            lengthChange: false,
        });
    },
    add: (e) => {
        const id = $(e.currentTarget).attr('data-id');
        const name = $(e.currentTarget).attr('data-name');
        const qty = parseInt($(e.currentTarget).attr('data-qty'));
        const max_qty = parseInt($(`#qty-${id}`).val());
        const price = parseInt($(e.currentTarget).attr('data-price'));

        if(dataSet.includes(id) == true) {
            if(qty > max_qty) { updateSubTotal(id, price, 1); } else { $('.close-toastr').closest('.toast').remove(); toastr["error"]('Quantity Exceeded!'); }
        } else {
            addRow(id, name, price, qty);
        }
    },
    increment: (e) => {
        const id = $(e.currentTarget).attr("data-id");
        let qty = parseInt($(e.currentTarget).closest('div').find('input').val());
        let max_qty = parseInt($(e.currentTarget).attr('data-qty'));
        let price = parseInt($(`#price-${id}`).html().substring(1));

        if(qty < max_qty) {
            $(e.currentTarget).closest('div').find('input').val(qty + 1);
            updateSubTotal(id, price, 2);
        }  else { $('.close-toastr').closest('.toast').remove(); toastr["error"]('Quantity Exceed!'); }
    },
    quantity: (e) => {
        const id = $(e.currentTarget).attr("data-id");
        let qty = parseInt($(e.currentTarget).val());
        let price = parseInt($(`#price-${id}`).html().substring(1));

        console.log(isNaN(parseFloat(qty)));
        if(isNaN(parseFloat(qty)) == false) {
            $(e.currentTarget).closest('div').find('input').val(qty + 1);
            updateSubTotal(id, price, 0);
        } else {
            $(e.currentTarget).val(1);
            updateTotal();
        }
        
        
    },
    decrement: (e) => {
        var table = $('#cart-table').DataTable();
        const id = $(e.currentTarget).attr("data-id");
        let qty = parseInt($(e.currentTarget).closest('div').find('input').val());
        let price = parseInt($(`#price-${id}`).html().substring(1));
        if(qty > 1) {
            updateSubTotal(id, price, 0);
        } else {
            Swal.fire({
                title: 'Remove?',
                showDenyButton: true,
                confirmButtonText: 'Yes',
                cancelButtonText: `No`,
            }).then((result) => {
                if (result.isConfirmed) {
                    const index = $(e.currentTarget).closest('tr').attr('data-index');
                    table.row(`#${index}`).remove().draw();
                    dataSet.splice( $.inArray(id, dataSet), 1 );
                    updateTotal();
                }
            })
        }
    },
    removeProduct: (e) => {
        var table = $('#cart-table').DataTable();
        const id = $(e.currentTarget).attr("data-id");

        Swal.fire({
            title: 'Remove?',
            showDenyButton: true,
            confirmButtonText: 'Yes',
            cancelButtonText: `No`,
        }).then((result) => {
            if (result.isConfirmed) {
                const index = $(e.currentTarget).closest('tr').attr('data-index');
                table.row(`#${index}`).remove().draw();
                dataSet.splice( $.inArray(id, dataSet), 1 );
            }
        })
    },
}

$(document).ready(async function() { 
    OrderDataTable.init('desc');
     
    $(document).on('click', '#ord_add', (e) => OrderDataTable.add(e));
    $(document).on('click', '.qty-inc', (e) => OrderDataTable.increment(e));
    $(document).on('keyup', '.qty', (e) => OrderDataTable.quantity(e));
    // $(".qty").on("keyup change", (e) => OrderDataTable.quantity(e));
    $(document).on('click', '.qty-dec', (e) => OrderDataTable.decrement(e));
    $(document).on('click', '.remove-prod', (e) => OrderDataTable.removeProduct(e));
    
});