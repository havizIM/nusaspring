<div class="page-breadcrumb">
    <div class="row">
        <div class="col-5 align-self-center">
            <h4 class="page-title">Purchase Payment</h4>
        </div>
        <div class="col-7 align-self-center">
            <div class="d-flex align-items-center justify-content-end">
                <nav aria-label="breadcrumb">
                    <ol class="breadcrumb">
                        <li class="breadcrumb-item">
                            <a href="#/dashboard">Dashboard</a>
                        </li>
                        <li class="breadcrumb-item active" aria-current="page">Purchase Payment</li>
                    </ol>
                </nav>
            </div>
        </div>
    </div>
</div>

<div class="container-fluid">
    <div class="row">

        <div class="col-md-6">
            <div class="card">
                <div class="card-body">
                    <div class="d-flex flex-row">
                        <div class="round align-self-center round-info"><i class="ti-receipt"></i></div>
                        <div class="m-l-10 align-self-center">
                            <h4 class="m-b-0">Total</h4>
                            <span class="text-muted">Purchase Payment</span>
                        </div>
                        <div class="ml-auto align-self-center">
                            <h2 class="font-medium m-b-0" id="count_purchase_payment">0</h2>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="col-md-6">
            <div class="card">
                <div class="card-body">
                    <div class="d-flex flex-row">
                        <div class="round align-self-center round-success"><i class="ti-wallet"></i></div>
                        <div class="m-l-10 align-self-center">
                            <h4 class="m-b-0">Summary</h4>
                            <span class="text-muted">Purchase Payment</span>
                        </div>
                        <div class="ml-auto align-self-center">
                            <h2 class="font-medium m-b-0" id="sum_purchase_payment">0</h2>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="col-12">
            <div class="card">
                <div class="card-body">
                    <div class="table-responsive">
                        <table class="table" id="t_payments" style="width: 100%">
                            <thead>
                                <tr>
                                    <th>Payment No</th>
                                    <th>Purchase</th>
                                    <th>Date</th>
                                    <th>Amount</th>
                                    <th>Memo</th>
                                    <th>Settings</th>
                                </tr>
                            </thead>
                            <tbody></tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<form id="form_filter">
    <div id="modal_search" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true" style="display: none;">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h4 class="modal-title">Filter Purchase Payment</h4>
                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
                </div>
                <div class="modal-body">
                    <div class="form-group">
                        <label for="col-0-filter">Payment No</label>
                        <input id="col-0-filter" type="text" class="form-control filter-data" data-column="0" placeholder="Search Payment No">
                    </div>
                    <div class="form-group">
                        <label for="col-1-filter">Purchase</label>
                        <input id="col-1-filter" type="text" class="form-control filter-data" data-column="1" placeholder="Search Purchase">
                    </div>
                    <div class="form-group">
                        <label for="col-2-filter">Date</label>
                        <input id="col-2-filter" type="text" class="form-control filter-data" data-column="2" placeholder="Search Date">
                    </div>
                    <div class="form-group">
                        <label for="col-3-filter">Amount</label>
                        <input id="col-3-filter" type="text" class="form-control filter-data" data-column="3" placeholder="Search Amount">
                    </div>
                    <div class="form-group">
                        <label for="col-4-filter">Memo</label>
                        <input id="col-4-filter" type="text" class="form-control filter-data" data-column="4" placeholder="Search Memo">
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-danger waves-effect" data-dismiss="modal">Close</button>
                    <button type="button" class="btn btn-warning waves-effect" id="btn_reset">Reset</button>
                    <button type="submit" class="btn btn-info waves-effect waves-light">Search</button>
                </div>
            </div>
        </div>
    </div>
</form>

<form id="form_delete">
    <div id="modal_delete" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true" style="display: none;">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h4 class="modal-title">Delete Purchase Payment</h4>
                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
                </div>
                <div class="modal-body">
                    <h4><b>Are You Sure?</b></h4>
                    <p><b id="delete_desc"></b> will removed from table permanently.</p>
                </div>
                <div class="modal-footer">
                    <input type="hidden" id="delete_id" name="delete_id">
                    <button type="button" class="btn btn-danger waves-effect" data-dismiss="modal">No</button>
                    <button type="submit" class="btn btn-info waves-effect waves-light">Yes</button>
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
    purchasePaymentController.data('<?= $this->session->userdata('api_token') ?>')
</script>