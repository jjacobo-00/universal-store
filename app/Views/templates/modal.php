<div class="modal fade" id="inventory_edit_modal" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered">
    <div class="modal-content">
      <!-- <div class="modal-header">
        <h1 class="modal-title fs-5" id="staticBackdropLabel">Edit <span class="current_title">?</span></h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div> -->
      <div class="modal-body">
        <form id="inv_edit_form" method="post" novalidate>
            <div>
                <h1 class="modal-title fs-5 fw-bold text-center current_title">?</h1>
            </div>
            <div id="body">
                <div class="mb-3">
                    <label for="recipient-name" class="col-form-label">Product #:</label>
                    <input type="text" class="form-control" id="inv_productNumber" disabled>
                </div>
                <div class="mb-3">
                    <label for="message-text" class="col-form-label">Product Name:</label>
                    <input type="text" class="form-control" id="inv_productName" name="Product Name">
                    <!-- <textarea class="form-control" id="message-text"></textarea> -->
                </div>
                <div class="mb-3">
                    <label for="message-text" class="col-form-label">Description:</label>
                    <textarea class="form-control" id="inv_productDescription" name="Description"></textarea>
                </div>
            </div>
            <div class="d-flex justify-content-between">
                <button type="button" class="btn btn-danger" data-bs-dismiss="modal">Close</button>
                <button type="submit" class="btn btn-warning">Edit</button>
            </div>
        </form>
        
      </div>

    </div>
  </div>
</div>