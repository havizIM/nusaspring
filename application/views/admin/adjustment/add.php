<div class="page-breadcrumb">
    <div class="row">
        <div class="col-5 align-self-center">
            <h4 class="page-title">Add Adjustment</h4>
        </div>
        <div class="col-7 align-self-center">
            <div class="d-flex align-items-center justify-content-end">
                <nav aria-label="breadcrumb">
                    <ol class="breadcrumb">
                        <li class="breadcrumb-item">
                            <a href="#/dashboard">Dashboard</a>
                        </li>
                        <li class="breadcrumb-item">
                            <a href="#/adjustment">Adjustment</a>
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
                                                <label for="phone">Category</label>
                                                <select class="form-control" id="category" name="category">
                                                    <option value="" disabled="" selected="">-- Choose Category --</option>
                                                    <option value="Qty Awal">Qty Awal</option>
                                                    <option value="Transfer In">Transfer In</option>
                                                    <option value="Transfer Out">Transfer Out</option>
                                                    <option value="Other">Other</option>
                                                </select>
                                            </div>
                                            <div class="form-group">
                                                <label for="fax">Reference No</label>
                                                <input type="text" readonly placeholder="[ AUTO ]" class="form-control" name="reference_number" id="reference_number">
                                            </div>
                                            <div class="form-group">
                                                <label for="fax">Date</label>
                                                <input type="date" class="form-control" name="date" id="date">
                                            </div>
                                            <div class="form-group">
                                                <label for="memo">Memo</label>
                                                <textarea class="form-control" id="memo" name="memo"></textarea>
                                            </div>
                                            
                                    </div>
                                    <div class="col-md-4">
                                        <div class="form-group">
                                            <label for="picture">Attachment</label>
                                            <input type="file" class="dropify" name="attachment" id="attachment">
                                        </div>
                                    </div>
                                    <div class="col-md-12">
                                        <div class="table-responsive">
                                            <table class="table" id="t_add_products" style="overflow-x: scroll;">
                                                <thead>
                                                    <tr>
                                                        <th style="min-width: 350px;">Product</th>
                                                        <th style="min-width: 200px;">Unit Price</th>
                                                        <th style="min-width: 150px;">Qty</th>
                                                        <th style="min-width: 200px;">Total</th>
                                                        <th>
                                                            <button class="btn btn-info btn-md" type="button" id="btn_add_row"><i class="fa fa-plus"></i></button>
                                                        </th>
                                                    </tr>
                                                </thead>
                                                <tbody id="coba">
                                                    <tr id="row_0">
                                                        <td>
                                                            <select name="product_id[0]" id="product_id_0" data-id="0" class="form-control product_id" required>
                                                                <option value="" disabled="" selected="">-- Choose Product --</option>
                                                            </select>
                                                            <input type="hidden" name="description[0]" id="description_0" data-id="0">
                                                        </td>
                                                        <td>
                                                            <div class="input-group mb-3">
                                                                <div class="input-group-prepend">
                                                                    <span class="input-group-text" id="basic-addon1">Rp. </span>
                                                                </div>
                                                                <input type="number" min="0" value="0" name="unit_price[0]" id="unit_price_0" data-id="0" class="form-control unit_price">
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <div class="input-group mb-3">
                                                                <input type="number" value="0" name="qty[0]" id="qty_0" data-id="0" class="form-control qty" required>
                                                                <div class="input-group-prepend">
                                                                    <input type="hidden" name="unit[0]" id="unit_0" data-id="0" class="form-control" readonly>
                                                                    <span class="input-group-text" id="unit_text_0" data-id="0">-</span>
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <div class="input-group mb-3">
                                                                <div class="input-group-prepend">
                                                                    <span class="input-group-text" id="basic-addon1">Rp. </span>
                                                                </div>
                                                                <input type="number" min="0" value="0" name="total[0]" id="total_0" data-id="0" class="form-control total">
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <!-- <button class="btn btn-danger btn-md" type="button" id="btn_remove_row" data-id="0" data-remove="false"><i class="fa fa-times"></i></button> -->
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                    <div class="col-md-12 text-right">
                                        <h4>Grand Total : <b id="grand_total">Rp. 0</b></h4>
                                    </div>
                                    <div class="col-md-12 mt-5">
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

<form id="form_add_product">
    <div id="modal_add_product" class="modal fade" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true" style="display: none;">
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
    import adjustmentController from '<?= base_url() ?>src/modules/adjustment.js';
    adjustmentController.add('<?= $this->session->userdata('api_token') ?>')
</script>