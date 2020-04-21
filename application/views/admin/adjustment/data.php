<div class="page-breadcrumb">
    <div class="row">
        <div class="col-5 align-self-center">
            <h4 class="page-title">Adjustment</h4>
        </div>
        <div class="col-7 align-self-center">
            <div class="d-flex align-items-center justify-content-end">
                <nav aria-label="breadcrumb">
                    <ol class="breadcrumb">
                        <li class="breadcrumb-item">
                            <a href="#/dashboard">Dashboard</a>
                        </li>
                        <li class="breadcrumb-item active" aria-current="page">Adjustment</li>
                    </ol>
                </nav>
            </div>
        </div>
    </div>
</div>

<div class="container-fluid">
    <div class="row">

        <div class="col-md-3">
            <div class="card bg-info">
                <div class="card-body">
                    <div class="d-flex no-block align-items-center">
                        <div class="text-white">
                            <h2 id="count_qty_awal">0</h2>
                            <h6>Qty Awal</h6>
                        </div>
                        <div class="ml-auto">
                            <span class="text-white display-6"><i class="ti-notepad"></i></span>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="col-md-3">
            <div class="card bg-success">
                <div class="card-body">
                    <div class="d-flex no-block align-items-center">
                        <div class="text-white">
                            <h2 id="count_transfer_in">0</h2>
                            <h6>Transfer In</h6>
                        </div>
                        <div class="ml-auto">
                            <span class="text-white display-6"><i class="ti-notepad"></i></span>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="col-md-3">
            <div class="card bg-danger">
                <div class="card-body">
                    <div class="d-flex no-block align-items-center">
                        <div class="text-white">
                            <h2 id="count_transfer_out">0</h2>
                            <h6>Transfer Out</h6>
                        </div>
                        <div class="ml-auto">
                            <span class="text-white display-6"><i class="ti-notepad"></i></span>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="col-md-3">
            <div class="card bg-primary">
                <div class="card-body">
                    <div class="d-flex no-block align-items-center">
                        <div class="text-white">
                            <h2 id="count_other">0</h2>
                            <h6>Other</h6>
                        </div>
                        <div class="ml-auto">
                            <span class="text-white display-6"><i class="ti-notepad"></i></span>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="col-12">
            <div class="card">
                <div class="card-body">
                    <div class="table-responsive">
                        <table class="table" id="t_adjustment" style="width: 100%">
                            <thead>
                                <tr>
                                    <th>Category</th>
                                    <th>Reference No</th>
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
                    <h4 class="modal-title">Filter Adjustment</h4>
                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
                </div>
                <div class="modal-body">
                    <div class="form-group">
                        <label for="col-0-filter">Category</label>
                        <input id="col-0-filter" type="text" class="form-control filter-data" data-column="0" placeholder="Search Category">
                    </div>
                    <div class="form-group">
                        <label for="col-1-filter">Reference No</label>
                        <input id="col-1-filter" type="text" class="form-control filter-data" data-column="1" placeholder="Search Reference No">
                    </div>
                    <div class="form-group">
                        <label for="col-2-filter">Date</label>
                        <input id="col-2-filter" type="text" class="form-control filter-data" data-column="2" placeholder="Search Date">
                    </div>
                    <div class="form-group">
                        <label for="col-3-filter">Memo</label>
                        <input id="col-3-filter" type="text" class="form-control filter-data" data-column="3" placeholder="Search Memo">
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
                    <h4 class="modal-title">Delete Adjustment</h4>
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
    import adjustmentController from '<?= base_url() ?>src/modules/adjustment.js';
    adjustmentController.data('<?= $this->session->userdata('api_token') ?>')
</script>