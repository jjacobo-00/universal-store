<link rel="stylesheet" type="text/css" href="<?= base_url('assets/css/order.css');?>">  <!-- MAIN CSS -->
<!-- end::HEAD -->

    <!-- begin::BODY -->
    <?php include 'templates/nav.php'; ?>
    <div class="col">
        <div class="d-flex flex-column justify-content-center">
            <?php include 'templates/page-body-title.php'; ?>
            
            <div class="row">
                <div class="col-6">
                    <div class="card mt-3">
                        <div class="card-body"> 
                            <h5>Product List</h5>
                            <table id="order-table" class="table table-striped" style="width:100%"></table>
                        </div>
                    </div>
                </div>
                <div class="col-6">
                    <div class="card mt-3">
                        <div class="card-body"> 
                            <h5>Cart</h5>
                            <table id="cart-table">
                                <tbody></tbody>
                            </table>
                        </div>
                    </div>
                    <div class="card mt-3">
                        <div class="card-body d-flex justify-content-between">
                            <h3 class="fw-bolder">Total: </h3>
                            <h3 class="fw-bolder">₱ <span id="total">0.00</span></h3>
                        </div>
                    </div>
                </div>
            </div>
            
        </div>
    </div>
        

    <!-- end::BODY -->