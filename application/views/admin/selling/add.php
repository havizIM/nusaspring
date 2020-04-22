<div class="page-breadcrumb">
    <div class="row">
        <div class="col-5 align-self-center">
            <h4 class="page-title">Add Selling</h4>
        </div>
        <div class="col-7 align-self-center">
            <div class="d-flex align-items-center justify-content-end">
                <nav aria-label="breadcrumb">
                    <ol class="breadcrumb">
                        <li class="breadcrumb-item">
                            <a href="#/dashboard">Dashboard</a>
                        </li>
                        <li class="breadcrumb-item">
                            <a href="#/selling">Selling</a>
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
                                                <label for="phone">Customer</label>
                                                <select class="form-control" id="contact_id" name="contact_id">
                                                    <option value="" disabled="" selected="">-- Choose Customer --</option>
                                                </select>
                                            </div>
                                            <div class="form-group">
                                                <label for="fax">Email</label>
                                                <input type="text" class="form-control" name="email" id="email">
                                            </div>
                                            <div class="form-group">
                                                <label for="fax">Address</label>
                                                <textarea class="form-control" id="address" name="address" rows="3"></textarea>
                                            </div>
                                            <div class="form-group row">
                                                <div class="col-md-6">
                                                    <label for="fax">Selling No</label>
                                                    <input type="text" class="form-control" name="selling_number" id="selling_number">
                                                </div>
                                                <div class="col-md-6">
                                                    <label for="fax">Reference No</label>
                                                    <input type="text" class="form-control" name="reference_number" id="reference_number">
                                                </div>
                                            </div>
                                            <div class="form-group row">
                                                <div class="col-md-6">
                                                    <label for="fax">Date</label>
                                                    <input type="date" class="form-control" name="date" id="date">
                                                </div>
                                                <div class="col-md-6">
                                                    <label for="fax">Due Date</label>
                                                    <input type="date" class="form-control" name="due_date" id="due_date">
                                                </div>
                                            </div>
                                            
                                            
                                    </div>
                                    <div class="col-md-4">
                                        <div class="form-group">
                                            <label for="picture">Attachment</label>
                                            <input type="file" class="dropify" name="attachment" id="attachment">
                                        </div>
                                    </div>
                                    <div class="col-md-12 mb-3">
                                        <div class="form-group text-right">
                                            <div class="custom-control custom-checkbox">
                                                <input type="checkbox" class="custom-control-input check_all_ppn" id="check_all_ppn">
                                                <label class="custom-control-label" for="check_all_ppn">PPN for All</label>
                                            </div>
                                        </div>
                                        <div class="table-responsive">
                                            <table class="table" id="t_add_products">
                                                <thead>
                                                    <tr>
                                                        <th style="min-width: 350px;">Product</th>
                                                        <th style="min-width: 200px;">Unit Price</th>
                                                        <th style="min-width: 150px;">Qty</th>
                                                        <th style="min-width: 150px;">Disc (%)</th>
                                                        <th style="min-width: 200px;">Disc (Rp.)</th>
                                                        <th>PPN</th>
                                                        <th style="min-width: 200px;">Total</th>
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
                                                                <input type="number"  min="0" value="0" name="qty[0]" id="qty_0" data-id="0" class="form-control qty" required>
                                                                <div class="input-group-prepend">
                                                                    <input type="hidden" name="unit[0]" id="unit_0" data-id="0" class="form-control">
                                                                    <span class="input-group-text" id="unit_text_0" data-id="0">-</span>
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <div class="input-group mb-3">
                                                                <input type="number"  min="0" value="0" name="discount_percent[0]" id="discount_percent_0" data-id="0" class="form-control discount_percent">
                                                                <div class="input-group-prepend">
                                                                    <span class="input-group-text" id="basic-addon1">%</span>
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <div class="input-group mb-3">
                                                                <div class="input-group-prepend">
                                                                    <span class="input-group-text" id="basic-addon1">Rp. </span>
                                                                </div>
                                                                <input type="number"  min="0" value="0" name="discount_amount[0]" id="discount_amount_0" data-id="0" class="form-control discount_amount">
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <div class="text-center">
                                                                <div class="custom-control custom-checkbox">
                                                                    <input type="checkbox" class="custom-control-input ppn" id="ppn_0" name="ppn[0]" data-id="0">
                                                                    <label class="custom-control-label" for="ppn_0"></label>
                                                                </div>
                                                                <input type="hidden" value="0" data-id="0" id="ppn_amount_0" name="ppn_amount[0]" class="ppn_amount">
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
                                                <h4>Sub Total</h4>
                                            </div>
                                            <div class="col-md-8 text-right">
                                                <h4 id="sub_total_text">Rp. 0</h4>
                                                <input type="hidden" value="0" class="form-control" name="sub_total" id="sub_total">
                                            </div>
                                        </div>

                                        <div class="row">
                                            <div class="col-md-4 text-right">
                                                <h4>Discount</h4>
                                            </div>
                                            <div class="col-md-8 text-right">
                                                <h4 id="all_discount_text">Rp. 0</h4>
                                                <input type="hidden" value="0" class="form-control" name="all_discount" id="all_discount">
                                            </div>
                                        </div>

                                        <div class="row">
                                            <div class="col-md-4 text-right">
                                                <h4>Total</h4>
                                            </div>
                                            <div class="col-md-8 text-right">
                                                <h4 id="total_dpp_text">Rp. 0</h4>
                                                <input type="hidden" value="0" class="form-control" name="total_dpp" id="total_dpp">
                                            </div>
                                        </div>

                                        <div class="row">
                                            <div class="col-md-4 text-right">
                                                <h4>PPN (10%)</h4>
                                            </div>
                                            <div class="col-md-8 text-right">
                                                <h4 id="ppn_text">Rp. 0</h4>
                                                <input type="hidden" value="0" class="form-control" name="total_ppn" id="total_ppn">
                                            </div>
                                        </div>

                                        <div class="row mt-3">
                                            <div class="col-md-4 text-right">
                                                <h3><b>Grand Total</b></h3>
                                            </div>
                                            <div class="col-md-8 text-right">
                                                <b><h3 id="grand_total_text">Rp. 0</h3></b>
                                                <input type="hidden" value="0" class="form-control" name="grand_total" id="grand_total">
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
    import sellingController from '<?= base_url() ?>src/modules/selling.js';
    sellingController.add('<?= $this->session->userdata('api_token') ?>')
</script>