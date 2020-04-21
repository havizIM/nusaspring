<div class="page-breadcrumb">
    <div class="row">
        <div class="col-5 align-self-center">
            <h4 class="page-title">Add Supplier</h4>
        </div>
        <div class="col-7 align-self-center">
            <div class="d-flex align-items-center justify-content-end">
                <nav aria-label="breadcrumb">
                    <ol class="breadcrumb">
                        <li class="breadcrumb-item">
                            <a href="#/dashboard">Dashboard</a>
                        </li>
                        <li class="breadcrumb-item">
                            <a href="#/supplier">Supplier</a>
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

        <div class="col-12">
            <div class="card" id="add_container">
                <div class="card-body">

                    <div class="row">
                        <div class="col-md-12">
                            <div class="row">
                                <div class="col-md-8">
                                    <form id="form_add">
                                        <div class="form-group">
                                            <label for="contact_name">Name</label>
                                            <input type="text" class="form-control" id="contact_name" name="contact_name">
                                        </div>
                                        <div class="form-group">
                                            <label for="pic">Pic</label>
                                            <input type="text" class="form-control" id="pic" name="pic">
                                        </div>
                                        <div class="form-group row">
                                            <div class="col-md-6">
                                                <label for="phone">Phone</label>
                                                <input type="text" class="form-control" id="phone" name="phone">
                                            </div>
                                            <div class="col-md-6">
                                                <label for="fax">Fax</label>
                                                <input type="text" class="form-control" id="fax" name="fax">
                                            </div>
                                        </div>
                                        <div class="form-group row">
                                            <div class="col-md-6">
                                                <label for="handphone">Handphone</label>
                                                <input type="text" class="form-control" id="handphone" name="handphone">
                                            </div>
                                            <div class="col-md-6">
                                                <label for="email">Email</label>
                                                <input type="text" class="form-control" id="email" name="email">
                                            </div>
                                        </div>
                                        <div class="form-group">
                                            <label for="address">Address</label>
                                            <textarea class="form-control" id="address" name="address"></textarea>
                                        </div>
                                        <div class="form-group">
                                            <label for="npwp">NPWP</label>
                                            <input type="text" class="form-control" id="npwp" name="npwp">
                                        </div>
                                        <div class="form-group">
                                            <label for="memo">Memo</label>
                                            <textarea class="form-control" id="memo" name="memo"></textarea>
                                        </div>
                                        <div class="form-group text-right">
                                            <a class="btn btn-md btn-danger" href="#/supplier">Cancel</a>
                                            <button class="btn btn-md btn-info" type="submit">Save</button>
                                        </div>
                                    </form>
                                </div>
                                <div class="col-md-4">
                                    <img src="<?= base_url() ?>assets/images/add.svg" class="img-fluid" alt="">
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<footer class="footer text-center">
    All Rights Reserved by UD. Nusa Spring. Designed and Developed by
    <a href="https://wrappixel.com">CodeManiac</a>.
</footer>

<script type="module">
    import supplierController from '<?= base_url() ?>src/modules/supplier.js';
    supplierController.add('<?= $this->session->userdata('api_token') ?>')
</script>