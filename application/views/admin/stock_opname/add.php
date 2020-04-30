<div class="page-breadcrumb">
    <div class="row">
        <div class="col-5 align-self-center">
            <h4 class="page-title">Add Stock Opname</h4>
        </div>
        <div class="col-7 align-self-center">
            <div class="d-flex align-items-center justify-content-end">
                <nav aria-label="breadcrumb">
                    <ol class="breadcrumb">
                        <li class="breadcrumb-item">
                            <a href="#/dashboard">Dashboard</a>
                        </li>
                        <li class="breadcrumb-item">
                            <a href="#/stock_opname">Stock Opname</a>
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
                                    <div class="col-md-8 mb-3">
                                        <div class="form-group">
                                            <label for="fax">Stock Opname No</label>
                                            <input type="text" readonly placeholder="[ AUTO ]" value="[ AUTO ]" class="form-control" name="so_number" id="so_number">
                                        </div>
                                        <div class="form-group">
                                            <label for="fax">Date</label>
                                            <input type="date" class="form-control" name="date" id="date">
                                        </div>
                                    </div>
                                    <div class="col-md-4">
                                        <div class="form-group">
                                            <label for="picture">Attachment</label>
                                            <input type="file" class="dropify" name="attachment" id="attachment">
                                        </div>
                                    </div>
                                    <div class="col-md-12 mb-5">
                                        <h4>Existing Products</h4>
                                        <div class="table-responsive">
                                            <table class="table" id="t_exist_products" style="overflow-x: scroll;">
                                                <thead>
                                                    <tr>
                                                        <th style="min-width: 100px;">SKU</th>
                                                        <th style="min-width: 300px;">Product</th>
                                                        <th style="min-width: 200px;">Unit Price</th>
                                                        <th style="min-width: 150px;">Qty</th>
                                                        <th style="min-width: 200px;">Total</th>
                                                        <th style="min-width: 200px;">Note</th>
                                                    </tr>
                                                </thead>
                                                <tbody></tbody>
                                            </table>
                                        </div>
                                    </div>
                                    <div class="col-md-12 mb-5">
                                        <h4>Additional Products</h4>
                                        <div class="table-responsive">
                                            <table class="table" id="t_add_products" style="overflow-x: scroll;">
                                                <thead>
                                                    <tr>
                                                        <th style="min-width: 100px;">SKU</th>
                                                        <th style="min-width: 300px;">Product</th>
                                                        <th style="min-width: 200px;">Unit Price</th>
                                                        <th style="min-width: 150px;">Qty</th>
                                                        <th style="min-width: 200px;">Total</th>
                                                        <th style="min-width: 200px;">Note</th>
                                                        <th>
                                                            <button class="btn btn-info btn-md btn_add_row" type="button"><i class="fa fa-plus"></i></button>
                                                        </th>
                                                    </tr>
                                                </thead>
                                                <tbody id="coba">

                                                </tbody>
                                                <tfoot>
                                                    <tr>
                                                        <td colspan="8">
                                                            <button class="btn btn-info btn-md btn_add_row" type="button"><i class="fa fa-plus"></i> Add Product</button>
                                                        </td>
                                                    </tr>
                                                </tfoot>
                                            </table>
                                        </div>
                                    </div>
                                    <div class="col-md-6">
                                        <div class="form-group">
                                            <label for="memo">Memo</label>
                                            <textarea class="form-control" id="memo" name="memo" rows="5"></textarea>
                                        </div>
                                        <div class="form-group">
                                            <label for="memo">Message</label>
                                            <textarea class="form-control" id="message" name="message" rows="5"></textarea>
                                        </div>
                                    </div>
                                    <div class="col-md-6">
                                        <div class="row">
                                            <div class="col-md-4 text-right">
                                                <h4>Total Actual Qty</h4>
                                            </div>
                                            <div class="col-md-8 text-right">
                                                <h4 id="sum_actual_qty_text">Rp. 0</h4>
                                                <input type="hidden" value="0" class="form-control" name="sum_actual_qty" id="sum_actual_qty">
                                            </div>
                                        </div>

                                        <div class="row mt-3">
                                            <div class="col-md-4 text-right">
                                                <h3><b>Total Actual Amount</b></h3>
                                            </div>
                                            <div class="col-md-8 text-right">
                                                <b><h3 id="sum_actual_total_text">Rp. 0</h3></b>
                                                <input type="hidden" value="0" class="form-control" name="sum_actual_total" id="sum_actual_total">
                                            </div>
                                        </div>

                                    </div>
                                    <div class="col-md-12 mt-3">
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

<form id="form_add_product_2">
    <div id="modal_add_product_2" class="modal fade" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true" style="display: none;">
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <div class="modal-header">
                    <h4 class="modal-title">Add Product</h4>
                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
                </div>
                <div class="modal-body">
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
                            <select class="form-control" id="category_id" name="category_id" style="width: 100%">
                                <option value="" disabled="" selected="">-- Choose Category --</option>
                            </select>
                        </div>
                        <div class="col-md-6">
                            <label for="fax">Unit</label>
                            <select class="form-control" id="unit_id" name="unit_id" style="width: 100%">
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
    import stockOpnameController from '<?= base_url() ?>src/modules/stock_opname.js';
    stockOpnameController.add('<?= $this->session->userdata('api_token') ?>')
</script>