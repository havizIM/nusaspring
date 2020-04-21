<div class="page-breadcrumb">
    <div class="row">
        <div class="col-5 align-self-center">
            <h4 class="page-title">Supplier</h4>
        </div>
        <div class="col-7 align-self-center">
            <div class="d-flex align-items-center justify-content-end">
                <nav aria-label="breadcrumb">
                    <ol class="breadcrumb">
                        <li class="breadcrumb-item">
                            <a href="#/dashboard">Dashboard</a>
                        </li>
                        <li class="breadcrumb-item active" aria-current="page">Supplier</li>
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
                        <div class="round align-self-center round-info"><i class="ti-user"></i></div>
                        <div class="m-l-10 align-self-center">
                            <h4 class="m-b-0">Total Suppliers</h4>
                            <span class="text-muted">Contact</span>
                        </div>
                        <div class="ml-auto align-self-center">
                            <h2 class="font-medium m-b-0" id="count_supplier">0</h2>
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
                            <h4 class="m-b-0">Total Debts</h4>
                            <span class="text-muted">Debts</span>
                        </div>
                        <div class="ml-auto align-self-center">
                            <h2 class="font-medium m-b-0" id="sum_debts">0</h2>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="col-12">
            <div class="card">
                <div class="card-body">
                    <div class="table-responsive">
                        <table class="table" id="t_supplier" style="width: 100%">
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Phone</th>
                                    <th>Address</th>
                                    <th>Pic</th>
                                    <th>Debts</th>
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
                    <h4 class="modal-title">Filter Supplier</h4>
                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
                </div>
                <div class="modal-body">
                    <div class="form-group">
                        <label for="col-0-filter">Name</label>
                        <input id="col-0-filter" type="text" class="form-control filter-data" data-column="0" placeholder="Search Name">
                    </div>
                    <div class="form-group">
                        <label for="col-1-filter">Phone</label>
                        <input id="col-1-filter" type="text" class="form-control filter-data" data-column="1" placeholder="Search Phone">
                    </div>
                    <div class="form-group">
                        <label for="col-2-filter">Address</label>
                        <input id="col-2-filter" type="text" class="form-control filter-data" data-column="2" placeholder="Search Address">
                    </div>
                    <div class="form-group">
                        <label for="col-3-filter">Pic</label>
                        <input id="col-3-filter" type="text" class="form-control filter-data" data-column="3" placeholder="Search Pic">
                    </div>
                    <div class="form-group">
                        <label for="col-4-filter">Debts</label>
                        <input type="text" id="col-4-filter" class="form-control filter-data" data-column="4" placeholder="Search Debts">
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
                    <h4 class="modal-title">Delete Supplier</h4>
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
    import supplierController from '<?= base_url() ?>src/modules/supplier.js';
    supplierController.data('<?= $this->session->userdata('api_token') ?>')
</script>