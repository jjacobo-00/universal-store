const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
];

const inventory = {
    getAllProducts: (sort) => {
        return new Promise((resolve, reject) => {

            $.ajax({
                url: "/inventory/getAllProducts",
                data: {sort: sort},
                method: "POST",
                success: (res) => {
                    resolve(res);
                }
            });
        });
    }
};

var sort;
const InventoryDataTable = {
    init: async(sort) => {
        const productData = await inventory.getAllProducts(sort);

        $('#inventory-table').dataTable({
            data: productData,
            columns: [
                // { title: 'id', data: 'id', visible: false},
                { title: 'Product #', data: 'product_num', className: "productNum", width: '11%' },
                { title: 'Product Name', data: 'product_name', className: "productName", width: '23%' },
                { title: 'Description', data: 'product_description', className: "productDescription" },
                { title: 'Date', data: 'date', className: "productDate", width: '9%'},
                { title: 'SRP', data: 'product_srp', className: "text-end fw-bold", render: $.fn.dataTable.render.number( ',', '.', 2, '₱ ' ), width: '10%' },
                // { title: 'Actions', data: null, className: "center", defaultContent: `<button class="btn btn-warning" data-id="${data.id}"><i class="fa-solid fa-pencil"></i></button> <button class="btn btn-danger"><i class="fa-solid fa-trash-can"></i></button>` },
                { title: 'Actions', data: null, sortable: false, width: '8%',
                    render: function ( data, type, full, meta ) {
                        return `<button type="button" class="btn btn-warning me-2" id="inv_edit" data-id="${full.id}"><i class="fa-solid fa-pencil"></i></button> <button type="button" class="btn btn-danger me-2" id="inv_delete" data-id="${full.id}"><i class="fa-solid fa-trash-can"></i></button>`;
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
    dateSort: () => {
        $('#inventory-table').DataTable().destroy();
        if(sort == 'asc') { sort = 'desc'; } 
        else { sort = 'asc'; }
        InventoryDataTable.init(sort);
    },
    edit: (e) => {
        const id = $(e.currentTarget).closest('tr').find('.productNum').html();
        const name = $(e.currentTarget).closest('tr').find('.productName').html();
        const productNum = $(e.currentTarget).closest('tr').find('.productNum').html();
        const description = $(e.currentTarget).closest('tr').find('.productDescription').html();

        Swal.fire({
            title: `Edit ${name}?`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#002451',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, edit'
          }).then((result) => {
            if (result.isConfirmed) {
                $('.current_title').html(name);
                $('#inv_productNumber').val(productNum);
                $('#inv_productName').val(name);
                $('#inv_productDescription').val(description);
                $('#inventory_edit_modal').attr('data-id', id);
                $('#inventory_edit_modal').modal('show');
            }
        })
        
    }
}

var proceed = false;
const InventoryForm = {
    editSubmit: (e) => {
        e.preventDefault();
        const formID = $(e.currentTarget).attr('id');
        const id = $('#inventory_edit_modal').attr('data-id');
        const title = $('#inv_productName').val();
        const description = $('#inv_productDescription').val();

        let check = validateForm(formID);
        if(check == true) {
            $.ajax({
                url: "/inventory/editProduct",
                data: {product_num: id, title: title, description: description},
                method: "POST",
                success: (res) => {
                    if(parseInt(res.success) > 0) {
                        $('#inventory-table').DataTable().destroy();
                        sort = 'desc';
                        InventoryDataTable.init(sort);
                        toastr["success"](res.msg);
                        
                    } else { console.log(res) }
                }
            }); 
        }
    },
    // showEditForm: (e) => {
    //     reloadForm('form#inventory_edit_modal');
    // },
}

$(document).ready(async function() { 
    InventoryDataTable.init('desc');
    
    $(document).on('click', 'thead th:eq(3)', (e) => InventoryDataTable.dateSort(e));
    $(document).on('click', '#inv_edit', (e) => InventoryDataTable.edit(e));
    $(document).on('submit', '#inv_edit_form', (e) => InventoryForm.editSubmit(e));
    // $(document).on('shown.bs.modal', '#inventory_edit_modal', (e) => InventoryForm.showEditForm(e));
});