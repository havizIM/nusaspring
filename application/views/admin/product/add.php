<div class="page-breadcrumb">
    <div class="row">
        <div class="col-5 align-self-center">
            <h4 class="page-title">Add Product</h4>
        </div>
        <div class="col-7 align-self-center">
            <div class="d-flex align-items-center justify-content-end">
                <nav aria-label="breadcrumb">
                    <ol class="breadcrumb">
                        <li class="breadcrumb-item">
                            <a href="#/dashboard">Dashboard</a>
                        </li>
                        <li class="breadcrumb-item">
                            <a href="#/product">Product</a>
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
                            <form id="form_add">
                                <div class="row">
                                    <div class="col-md-8">
                                            <div class="form-group">
                                                <label for="contact_name">Name</label>
                                                <input type="text" class="form-control" id="product_name" name="product_name">
                                            </div>
                                            <div class="form-group">
                                                <label for="pic">SKU</label>
                                                <input type="text" class="form-control" id="sku" name="sku">
                                            </div>
                                            <div class="form-group row">
                                                <div class="col-md-6">
                                                    <label for="phone">Category</label>
                                                    <select class="form-control" id="category_id" name="category_id">
                                                        <option value="" disabled="" selected="">-- Choose Category --</option>
                                                    </select>
                                                </div>
                                                <div class="col-md-6">
                                                    <label for="fax">Unit</label>
                                                    <select class="form-control" id="unit_id" name="unit_id">
                                                        <option value="" disabled="" selected="">-- Choose Unit --</option>
                                                    </select>
                                                </div>
                                            </div>
                                            <div class="form-group row">
                                                <div class="col-md-6">
                                                    <label for="handphone">Purchase Price</label>
                                                    <div class="input-group mb-3">
                                                        <div class="input-group-prepend">
                                                            <span class="input-group-text" id="basic-addon1">Rp. </span>
                                                        </div>
                                                        <input type="number" min="0" value="0" class="form-control" name="purchase_price" id="purchase_price">
                                                    </div>
                                                </div>
                                                <div class="col-md-6">
                                                    <label for="email">Selling Price</label>
                                                    <div class="input-group mb-3">
                                                        <div class="input-group-prepend">
                                                            <span class="input-group-text" id="basic-addon1">Rp. </span>
                                                        </div>
                                                        <input type="number" min="0" value="0" class="form-control" name="selling_price" id="selling_price">
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="form-group">
                                                <label for="memo">Memo</label>
                                                <textarea class="form-control" id="memo" name="memo"></textarea>
                                            </div>
                                            
                                    </div>
                                    <div class="col-md-4">
                                        <div class="form-group">
                                            <label for="picture">Picture</label>
                                            <input type="file" class="dropify" name="picture" id="picture">
                                        </div>
                                    </div>
                                    <div class="col-md-12">
                                        <div class="form-group text-right">
                                            <a class="btn btn-md btn-danger" href="#/product">Cancel</a>
                                            <button class="btn btn-md btn-info" type="submit">Save</button>
                                        </div>
                                    </div>
                                </div>
                            </form>
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
    import productController from '<?= base_url() ?>src/modules/product.js';
    productController.add('<?= $this->session->userdata('api_token') ?>')
</script>