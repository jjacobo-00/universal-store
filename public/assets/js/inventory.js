const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

const inventory = {
    getAllProducts: () => {
        return new Promise((resolve, reject) => {

            $.ajax({
                url: "/inventory/getAllProducts",
                method: "POST",
                success: (res) => {
                    resolve(res);
                }
            });
        });
    }
};

const InventoryDataTable = {
    init: async() => {
        const productData = await inventory.getAllProducts();

        var inventoryTable = $('#inventory-table').dataTable({
            data: productData,
            columns: [
                // { title: 'ID', data: 'id' },
                { title: 'Product #', data: 'product_num' },
                { title: 'Product', data: 'product_name' },
                { title: 'Description', data: 'product_description' },
                { title: 'Date', data: 'date'},
                { title: 'SRP', data: 'product_srp', className: "text-end", render: $.fn.dataTable.render.number( ',', '.', 2, '₱ ' ) },
            ],
            columnDefs: [
                {
                    targets: 3,
                    render: function (data) {
                        var date = new Date(data);
                        return (monthNames[date.getMonth()] + ", " + date.getDate() + " " + date.getFullYear());
                    }
                },
            ],
            responsive: true,
            aaSorting: []
        });
    },
    dateSort: () => {

    }
}

$(document).ready(async function() { 
    InventoryDataTable.init();
    var dataArr = [];
    $('#inventory-table').on( 'click', 'thead th:eq(3)', function () {
        // inventoryTable.init()
    });

    // $(document).on('click', '.difficulty', (e) => InventoryDataTable.dateSort(e));
});