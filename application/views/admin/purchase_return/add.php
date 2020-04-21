<div class="page-breadcrumb">
    <div class="row">
        <div class="col-5 align-self-center">
            <h4 class="page-title">Add Supplier Return</h4>
        </div>
        <div class="col-7 align-self-center">
            <div class="d-flex align-items-center justify-content-end">
                <nav aria-label="breadcrumb">
                    <ol class="breadcrumb">
                        <li class="breadcrumb-item">
                            <a href="#/dashboard">Dashboard</a>
                        </li>
                        <li class="breadcrumb-item">
                            <a href="#/supplier_return">Supplier Return</a>
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
                                                <label for="phone">Supplier</label>
                                                <select class="form-control" id="contact_id" name="contact_id">
                                                    <option value="" disabled="" selected="">-- Choose Supplier --</option>
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
                                                    <label for="fax">Return No</label>
                                                    <input type="text" class="form-control" name="return_number" id="return_number">
                                                </div>
                                                <div class="col-md-6">
                                                    <label for="fax">Reference No</label>
                                                    <input type="text" class="form-control" name="reference_number" id="reference_number">
                                                </div>
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
                                        <fieldset class="checkbox text-right">
                                            <label>
                                                <input type="checkbox" value="Y" name="ppn" id="ppn"> PPN
                                            </label>
                                        </fieldset>
                                        <div class="table-responsive">
                                            <table class="table" id="t_add_products">
                                                <thead>
                                                    <tr>
                                                        <th style="width: 20%;">Product</th>
                                                        <th style="width: 20%;">Unit Price</th>
                                                        <th style="width: 15%;">Qty</th>
                                                        <th style="width: 10%;">Unit</th>
                                                        <th style="width: 15%;">Total</th>
                                                        <th style="width: 15%;">PPN</th>
                                                        <th style="width: 5%;">
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
                                                            <input type="number" name="unit_price[0]" id="unit_price_0" data-id="0" class="form-control input-unit-price">
                                                        </td>
                                                        <td>
                                                            <input type="number" name="qty[0]" id="qty_0" data-id="0" class="form-control input-qty" required>
                                                        </td>
                                                        <td>
                                                            <input type="text" name="unit[0]" id="unit_0" data-id="0" class="form-control" readonly>
                                                        </td>
                                                        <td>
                                                            <input type="number" name="total[0]" id="total_0" data-id="0" class="form-control input-total" readonly>
                                                        </td>
                                                        <td>
                                                            <input type="number" name="ppn[0]" id="ppn_0" data-id="0" class="form-control input-ppn">
                                                        </td>
                                                        <td>
                                                            <!-- <button class="btn btn-danger btn-md" type="button" id="btn_remove_row" data-id="0" data-remove="false"><i class="fa fa-times"></i></button> -->
                                                        </td>
                                                    </tr>
                                                </tbody>
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
                                        <div class="form-group">
                                            <label for="fax">Subtotal</label>
                                            <input type="number" class="form-control" name="sub_total" id="sub_total" readonly>
                                        </div>
                                        <div class="form-group row">
                                            <div class="col-md-6">
                                                <label for="fax">Discount (%)</label>
                                                <input type="number" class="form-control" name="discount_percent" id="discount_percent">
                                            </div>
                                            <div class="col-md-6">
                                                <label for="fax">Discount Amount</label>
                                                <input type="number" class="form-control" name="discount_amount" id="discount_amount">
                                            </div>
                                        </div>
                                        <div class="form-group">
                                            <label for="fax">Total PPN (10%)</label>
                                            <input type="number" class="form-control" name="total_ppn" id="total_ppn" readonly>
                                        </div>
                                        <div class="form-group">
                                            <label for="fax">Grand Total</label>
                                            <input type="number" class="form-control" name="grand_total" id="grand_total" readonly>
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
    import supplierReturnController from '<?= base_url() ?>src/modules/supplier_return.js';
    supplierReturnController.add('<?= $this->session->userdata('api_token') ?>')
</script>