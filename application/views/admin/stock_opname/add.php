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
                                    <div class="col-md-8">
                                        <div class="form-group">
                                            <label for="fax">Stock Opname No</label>
                                            <input type="text" class="form-control" name="so_number" id="so_number">
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
                                    <div class="col-md-12 mb-3">
                                        <div class="table-responsive">
                                            <table class="table" id="t_add_products" style="overflow-x: scroll;">
                                                <thead>
                                                    <tr>
                                                        <th style="min-width: 350px;">Product</th>
                                                        <th style="min-width: 200px;">Unit Price</th>
                                                        <th style="min-width: 150px;">Qty</th>
                                                        <th style="min-width: 200px;">Total</th>
                                                        <th style="min-width: 200px;">Note</th>
                                                        <th>
                                                            <button class="btn btn-info btn-md btn_add_row" type="button" id="btn_add_row"><i class="fa fa-plus"></i></button>
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
                                                                <input type="number"  min="0" value="0" name="unit_price[0]" id="unit_price_0" data-id="0" class="form-control unit_price">
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <div class="input-group mb-3">
                                                                <input type="number"  min="0" value="0" name="actual_qty[0]" id="actual_qty_0" data-id="0" class="form-control actual_qty" required>
                                                                <div class="input-group-prepend">
                                                                    <input type="hidden" name="unit[0]" id="unit_0" data-id="0" class="form-control">
                                                                    <span class="input-group-text" id="unit_text_0" data-id="0">-</span>
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <div class="input-group mb-3">
                                                                <div class="input-group-prepend">
                                                                    <span class="input-group-text" id="basic-addon1">Rp. </span>
                                                                </div>
                                                                <input type="number" min="0" value="0" name="actual_total[0]" id="actual_total_0" data-id="0" class="form-control actual_total">
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <div class="form-group">
                                                                <textarea name="note[0]" id="note_0" data-id="0" rows="1" class="form-control"></textarea>
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <input type="hidden" name="system_qty[0]" id="system_qty_0" data-id="0" class="system_qty" value="0">
                                                            <input type="hidden" name="system_total[0]" id="system_total_0" data-id="0" class="system_total" value="0">
                                                            <!-- <button class="btn btn-danger btn-md" type="button" id="btn_remove_row" data-id="0" data-remove="false"><i class="fa fa-times"></i></button> -->
                                                        </td>
                                                    </tr>
                                                </tbody>
                                                <tfoot>
                                                    <tr>
                                                        <td colspan="8">
                                                            <button class="btn btn-info btn-md btn_add_row" type="button" id="btn_add_row"><i class="fa fa-plus"></i> Add Product</button>
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

<footer class="footer text-center">
    All Rights Reserved by UD. Nusa Spring. Designed and Developed by
    <a href="https://wrappixel.com">CodeManiac</a>.
</footer>

<script type="module">
    import stockOpnameController from '<?= base_url() ?>src/modules/stock_opname.js';
    stockOpnameController.add('<?= $this->session->userdata('api_token') ?>')
</script>