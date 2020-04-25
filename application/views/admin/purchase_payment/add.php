<div class="page-breadcrumb">
    <div class="row">
        <div class="col-5 align-self-center">
            <h4 class="page-title">Add Purchase Payment</h4>
        </div>
        <div class="col-7 align-self-center">
            <div class="d-flex align-items-center justify-content-end">
                <nav aria-label="breadcrumb">
                    <ol class="breadcrumb">
                        <li class="breadcrumb-item">
                            <a href="#/dashboard">Dashboard</a>
                        </li>
                        <li class="breadcrumb-item">
                            <a href="#/purchase_payment">Purchase Payment</a>
                        </li>
                        <li class="breadcrumb-item active" aria-current="page">Add</li>
                    </ol>
                </nav>
            </div>
        </div>
    </div>
</div>

<div class="container-fluid">
    <div class="row">

        <div class="col-12" id="main_content">
            <form id="form_add">
                <div class="row">
                    <div class="col-md-9 col-lg-9">
                        <div class="card">
                            <div class="card-header bg-info">
                                <h5 class="m-b-0 text-white">Form Payment</h5>
                            </div>
                            <div class="card-body">
                                <div class="row">
                                    <div class="col-md-4">
                                        <div class="form-group">
                                            <label for="picture">Attachment</label>
                                            <input type="file" class="dropify" name="attachment" id="attachment">
                                        </div>
                                        <div class="form-group">
                                            <label>Date</label>
                                            <input type="date" name="date" id="date" class="form-control">
                                        </div>
                                        <div class="form-group">
                                            <label>Memo</label>
                                            <textarea name="memo" id="memo" class="form-control"></textarea>
                                        </div>
                                    </div>
                                    <div class="col-md-8">
                                        <div class="form-group">
                                            <label>Payment No.</label>
                                            <input type="text" name="payment_number" readonly placeholder="[ AUTO ]" value="[ AUTO ]" id="payment_number" class="form-control">
                                        </div>
                                        
                                        <div class="form-group">
                                            <label>Type</label>
                                            <select name="type" id="type" class="form-control">
                                                <option value="Cash">Cash</option>
                                                <option value="Transfer">Transfer</option>
                                                <option value="Cek/Giro">Cek/Giro</option>
                                                <option value="Kartu Kredit">Kartu Kredit</option>
                                            </select>
                                        </div>

                                        <div class="form-group">
                                            <label>Amount</label>
                                            <div class="input-group mb-3">
                                                <div class="input-group-prepend">
                                                    <span class="input-group-text" id="basic-addon1">Rp. </span>
                                                </div>
                                                <input type="number"  min="0" value="0" name="amount" id="amount" class="form-control amount">
                                            </div>
                                        </div>
                                        
                                        <div class="form-group">
                                            <label>Description</label>
                                            <textarea name="description" id="description" class="form-control" rows="6"></textarea>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="col-md-3 col-lg-3">
                        <div class="card">
                            <div class="card-body">
                                <div class="form-group">
                                    <label>Supplier</label>
                                    <select class="form-control" id="contact_id" name="contact_id">
                                        <option value="" disabled="" selected="">-- Choose Supplier --</option>
                                    </select>
                                </div>
                                <div class="form-group">
                                    <label>Purchase</label>
                                    <select class="form-control" id="purchase_id" name="purchase_id" disabled="">
                                        <option value="" disabled="" selected="">-- Choose Purchase --</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div class="form-group">
                            <button class="btn btn-info btn-block" type="submit">Save</button>
                            <a href="#/purchase_payment" class="btn btn-secondary btn-outline btn-block">Cancel</a>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    </div>
</div>


<form id="form_add_supplier">
    <div id="modal_add_supplier" class="modal fade" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true" style="display: none;">
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <div class="modal-header">
                    <h4 class="modal-title">Add Supplier</h4>
                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
                </div>
                <div class="modal-body">
                    <div class="form-group">
                        <label for="contact_name">Name</label>
                        <input type="text" class="form-control" id="lu_contact_name" name="contact_name">
                    </div>
                    <div class="form-group">
                        <label for="phone">Phone</label>
                        <input type="text" class="form-control" id="lu_phone" name="phone">
                    </div>
                    <div class="form-group">
                        <label for="address">Address</label>
                        <textarea class="form-control" id="lu_address" name="address" rows="3"></textarea>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-danger waves-effect" data-dismiss="modal">Close</button>
                    <button type="submit" class="btn btn-info waves-effect waves-light">Save</button>
                </div>
            </div>
        </div>
    </div>
</form>

<footer class="footer text-center">
    All Rights Reserved by UD. Nusa Spring. Designed and Developed by
    <a href="https://wrappixel.com">CodeManiac</a>.
</footer>

<script type="module">
    import purchasePaymentController from '<?= base_url() ?>src/modules/purchase_payment.js';
    purchasePaymentController.add('<?= $this->session->userdata('api_token') ?>')
</script>