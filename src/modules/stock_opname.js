const stockOpnameUI = ((SET) => {
    const _filterNull = text => {
        if (text === null) {
            return ''
        } else {
            return text;
        }
    }

    const _replaceNull = text => {
        if (text === null) {
            return '-'
        } else {
            return text;
        }
    }

    let count = 0

    return {
        resetCount: () => {
            count = 0
        },

        renderEdit: data => {
            let category = ['Qty Awal', 'Transfer In', 'Transfer Out', 'Other'];

            let html = `
                <div class="row">
                    <div class="col-md-12">
                        <form id="form_edit">
                            <div class="row">
                                <div class="col-md-8">
                                        <div class="form-group">
                                            <label for="phone">Category</label>
                                            <select class="form-control" id="category" name="category">
                                                <option value="" disabled="" selected="">-- Choose Category --</option>
                                                ${category.map(v => `
                                                    <option value="${v}" ${v === data.category ? 'selected' : ''}>${v}</option>
                                                `).join('')}
                                            </select>
                                        </div>
                                        <div class="form-group">
                                            <label for="fax">Reference No</label>
                                            <input type="text" class="form-control" name="reference_number" id="reference_number" value="${_replaceNull(data.reference_number)}">
                                        </div>
                                        <div class="form-group">
                                            <label for="fax">Date</label>
                                            <input type="date" class="form-control" name="date" id="date" value="${data.date}">
                                        </div>
                                        <div class="form-group">
                                            <label for="memo">Memo</label>
                                            <textarea class="form-control" id="memo" name="memo">${_replaceNull(data.memo)}</textarea>
                                        </div>
                                        
                                </div>
                                <div class="col-md-4">
                                    <div class="form-group">
                                        <label for="picture">Attachment</label>
                                        <input type="file" class="dropify" name="attachment" id="attachment" ${data.attachment === null ? '' : `data-default-file="${SET.apiURL()}adjustments/file/${data.attachment}`}">
                                    </div>
                                </div>
                                <div class="col-md-12">
                                    <div class="table-responsive">
                                        <table class="table" id="t_add_products">
                                            <thead>
                                                <tr>
                                                    <th style="width: 30%;">Product</th>
                                                    <th style="width: 20%;">Unit Price</th>
                                                    <th style="width: 20%;">Qty</th>
                                                    <th style="width: 20%;">Unit</th>
                                                    <th style="width: 10%;">
                                                        <button class="btn btn-info btn-md" type="button" id="btn_add_row"><i class="fa fa-plus"></i></button>
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody id="coba">
                                                ${data.products.map((v, index) => {
                count += 1

                return `
                                                        <tr id="row_${count}">
                                                            <td>
                                                                <select name="product_id[${count}]" id="product_id_${count}" data-id="${count}" class="form-control product_id select2_${v.product_id}" required>
                                                                    <option value="" disabled="" selected="">-- Choose Product --</option>
                                                                </select>
                                                                <input type="hidden" name="description[${count}]" id="description_${count}" data-id="${count}" value="${v.description}">
                                                            </td>
                                                            <td>
                                                                <input type="number" name="unit_price[${count}]" id="unit_price_${count}" data-id="${count}" class="form-control"  value="${v.unit_price}" readonly>
                                                            </td>
                                                            <td>
                                                                <input type="number" name="qty[${count}]" id="qty_${count}" data-id="${count}" class="form-control" value="${v.qty}" required>
                                                            </td>
                                                            <td>
                                                                <input type="text" name="unit[${count}]" id="unit_${count}" data-id="${count}" class="form-control" value="${v.unit}" readonly>
                                                            </td>
                                                            <td>
                                                                <button class="btn btn-danger btn-md btn-remove" type="button" id="btn_remove_row_${count}" data-id="${count}" data-remove="true"><i class="fa fa-times"></i></button>
                                                            </td>
                                                        </tr>
                                                    `
            }).join('')}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                                <div class="col-md-12">
                                    <div class="form-group text-right">
                                        <input type="hidden" name="_method" id="_method" value="put">
                                        <a class="btn btn-md btn-danger" href="#/adjustment">Cancel</a>
                                        <button class="btn btn-md btn-success" type="submit">Update</button>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            `

            $('#main_content').html(html)
        },

        renderDetail: data => {
            let no = 1;
            let shrinkage = 0;
            let operations;

            if(data.total_actual_amount <= data.total_system_amount){
                operations = '-'
                shrinkage = parseFloat(((data.total_actual_amount - data.total_system_amount) / data.total_system_amount) * 100)
            } else {
                operations = '+'
                shrinkage = parseFloat(((data.total_actual_amount - data.total_system_amount) / data.total_actual_amount) * 100)
            }

            let html = `

                <ul class="nav nav-tabs" role="tablist">
                    <li class="nav-item"> <a class="nav-link active" data-toggle="tab" href="#detail" role="tab"><span class="hidden-sm-up"><i class="ti-home"></i></span> <span class="hidden-xs-down">Detail</span></a> </li>
                    <li class="nav-item"> <a class="nav-link" data-toggle="tab" href="#attachment" role="tab"><span class="hidden-sm-up"><i class="ti-user"></i></span> <span class="hidden-xs-down">Attachment</span></a> </li>
                </ul>

                <div class="tab-content tabcontent-border">
                    <div class="tab-pane active" id="detail" role="tabpanel">
                        <div class="row">
                            <div class="col-md-12">
                                <div class="card card-body printableArea">
                                    <h3>
                                        <b>STOCK OPNAME</b> <span class="pull-right">#${data.so_number}</span>
                                    </h3>
                                    <hr>
                                    <div class="row">
                                        <table class="w-100">
                                            <tr>
                                                <td class="w-50">
                                                    <address>
                                                        <img src="${SET.baseURL()}assets/images/logo-full-black.png" style="width: 50%" class="mb-3" />
                                                        <p class="text-muted m-l-5">Jl. Radar Auri No.2,
                                                            <br/> Cisalak Ps, Cimanggis, Depok, Jawa Barat 16452, Indonesia,
                                                            <br/> Hp. 087880729929 / 081280999733</p>
                                                    </address>
                                                </td>
                                                <td class="w-50 text-right">
                                                    <address>
                                                        <p class="m-t-30"><b><i class="fa fa-calendar"></i> Date :</b> ${data.date}</p>
                                                        <p><b><i class="mdi mdi-album"></i> Stock Opname No :</b> ${_replaceNull(data.so_number)}</p>
                                                        <p><b><i class="mdi mdi-check"></i> Status :</b> ${_replaceNull(data.status)}</p>
                                                    </address>
                                                </td>
                                            </tr>
                                        </table>
                                        <div class="col-md-12">
                                            <div class="table-responsive mt-5" style="clear: both; font-size: 12px;">
                                                <table class="table table-hover">
                                                    <thead>
                                                        <tr>
                                                            <th class="text-center">#</th>
                                                            <th>Product</th>
                                                            <th class="text-right">System Qty</th>
                                                            <th class="text-right">System Total</th>
                                                            <th class="text-right">Actual Qty</th>
                                                            <th class="text-right">Actual Total</th>
                                                            <th class="text-right">Qty Balance</th>
                                                            <th class="text-right">Total Balance</th>
                                                            <th class="text-right">Note</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        ${data.products.map(v => {
                return `
                                                                <tr>
                                                                    <td class="text-center">${no++}</td>
                                                                    <td><a href="#/product/${v.product_id}">${v.description}</a></td>
                                                                    <td class="text-right">${v.system_qty} ${v.unit}</td>
                                                                    <td class="text-right"> Rp. ${SET.realCurrency(v.system_total)} </td>
                                                                    <td class="text-right">${v.actual_qty} ${v.unit}</td>
                                                                    <td class="text-right"> Rp. ${SET.realCurrency(v.actual_total)} </td>
                                                                    <td class="text-right">${parseFloat(v.actual_qty - v.system_qty)} ${v.unit}</td>
                                                                    <td class="text-right"> Rp. ${SET.realCurrency(parseFloat(v.actual_total - v.system_total))} </td>
                                                                    <td class="text-right">${SET.replaceNull(v.note)} </td>
                                                                </tr>
                                                            `
            }).join('')}
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                        <div class="col-md-12">
                                            <hr>
                                            <table class="w-100">
                                                <tr>
                                                    <td class="w-50">
                                                        <i>* ${_replaceNull(data.message)}</i>
                                                    </td>
                                                    <td class="w-50">
                                                        <div class="m-t-30 text-right">
                                                            <p>Actual Qty : <b>${SET.realCurrency(data.total_actual_qty)}</b></p>
                                                            <p>System Qty : <b>${SET.realCurrency(data.total_system_qty)}</b></p>
                                                            <hr>
                                                            <p><h4>Qty Balance : <b>${SET.realCurrency(parseFloat(data.total_actual_qty - data.total_system_qty))}</b></h4></p>
                                                        </div>
                                                        <div class="m-t-40 text-right">
                                                            <p>Actual Amount : <b>Rp. ${SET.realCurrency(data.total_actual_amount)}</b></p>
                                                            <p>System Amount : <b>Rp. ${SET.realCurrency(data.total_system_amount)}</b></p>
                                                            <hr>
                                                            <p><h4>Amount Balance : <b>Rp. ${SET.realCurrency(parseFloat(data.total_actual_amount - data.total_system_amount))}</b></h4></p>
                                                        </div>
                                                        <div class="m-t-40 text-right">
                                                            <p><h4>Shrinkage : ( ${operations} ) <b>${SET.realCurrency(shrinkage)} %</b></h4></p>
                                                        </div>
                                                    </td>
                                                </tr>
                                            </table>
                                        </div>
                                        <div class="col-md-12 mt-5">
                                            <hr>
                                            <table style="width: 100%">
                                                <tr>
                                                    <td style="width: 50%" class="text-center">
                                                        <h5>Mengetahui</h5>
                                                        <br>
                                                        <br>
                                                        <br>
                                                        <br>
                                                        <br>
                                                        <hr style="width: 50%">
                                                    </td>
                                                    <td style="width: 50%" class="text-center">
                                                        <h5>Dibuat Oleh</h5>
                                                        <br>
                                                        <br>
                                                        <br>
                                                        <br>
                                                        <br>
                                                        <hr style="width: 50%">
                                                    </td>
                                                </tr>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-12">
                                <div class="row">
                                    <div class="col-md-6 text-left">
                                        ${data.status === 'Valid' ? '' : `<button class="btn btn-outline-success btn-validate" data-id="${data.id}" data-name="${data.so_number}"><i class="fa fa-check"></i> Validate </button>`}
                                    </div>

                                    <div class="col-md-6 text-right">
                                        ${data.status === 'Valid' ? '' : `
                                            <a class="btn btn-success" href="#/stock_opname/edit/${data.id}"><i class="fa fa-edit"></i> Edit </a>
                                            <button class="btn btn-danger btn-delete" data-id="${data.id}" data-name="${data.so_number}" type="button"><i class="fa fa-times"></i> Delete </button>
                                        `}
                                        <button id="print" class="btn btn-default btn-outline" type="button"> <span><i class="fa fa-print"></i> Print</span> </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="tab-pane  p-20" id="attachment" role="tabpanel">
                        ${data.attachment === null ? `
                            <h3>Tidak ada Attachment</h3>
                        ` : `
                            <embed class="w-100" src="${SET.apiURL()}stock_opnames/file/${data.attachment}">
                        `}
                    </div>
                </div>
            `

            $('#main_content').html(html)
        },

        renderError: () => {

        },

        renderRow: data => {

            count += 1

            let html = `
                <tr id="row_add_${count}">
                    <td>
                        ${data.sku}
                        <input type="hidden" value="${data.id}" name="add_product_id[${count}]" id="add_product_id_${count}" data-id="${count}">
                    </td>
                    <td>
                        ${data.product_name}
                        <input type="hidden" value="${data.product_name}" name="add_description[${count}]" id="add_description_${count}" data-id="${count}">
                    </td>
                    <td>
                        <div class="input-group mb-3">
                            <div class="input-group-prepend">
                                <span class="input-group-text" id="basic-addon1">Rp. </span>
                            </div>
                            <input type="number"  min="0" value="${data.purchase_price}" name="add_unit_price[${count}]" id="add_unit_price_${count}" data-id="${count}" class="form-control add_unit_price">
                        </div>
                    </td>
                    <td>
                        <div class="input-group mb-3">
                            <input type="number"  min="0" value="0" name="add_actual_qty[${count}]" id="add_actual_qty_${count}" data-id="${count}" class="form-control add_actual_qty" required>
                            <div class="input-group-prepend">
                                <input type="hidden" value="${data.unit !== null ? data.unit.unit_name : '-'}" name="add_unit[${count}]" id="add_unit_${count}" data-id="${count}" class="form-control">
                                <span class="input-group-text" id="add_unit_text_${count}" data-id="${count}">${data.unit !== null ? data.unit.unit_name : '-'}</span>
                            </div>
                        </div>
                    </td>
                    <td>
                        <div class="input-group mb-3">
                            <div class="input-group-prepend">
                                <span class="input-group-text" id="basic-addon1">Rp. </span>
                            </div>
                            <input type="number" min="0" value="0" name="add_actual_total[${count}]" id="add_actual_total_${count}" data-id="${count}" class="form-control add_actual_total">
                        </div>
                    </td>
                    <td>
                        <div class="form-group">
                            <textarea name="add_note[${count}]" id="add_note_${count}" data-id="${count}" rows="1" class="form-control"></textarea>
                        </div>
                    </td>
                    <td>
                        <input type="hidden" name="add_system_qty[${count}]" id="add_system_qty_${count}" data-id="${count}" class="add_system_qty" value="0">
                        <input type="hidden" name="add_system_total[${count}]" id="add_system_total_${count}" data-id="${count}" class="add_system_total" value="0">
                        <button class="btn btn-danger btn-md btn-remove" type="button" data-id="${count}" data-remove="true"><i class="fa fa-times"></i></button>
                    </td>
                </tr>
            `

            $('#t_add_products tbody').append(html)
        },

        renderFormEdit: data => {
            let html = `
                <div class="row">
                    <div class="col-md-12">
                        <form id="form_edit">
                            <div class="row">
                                <div class="col-md-8 mb-3">
                                    <div class="form-group">
                                        <label for="fax">Stock Opname No</label>
                                        <input type="text" readonly placeholder="[ AUTO ]" value="${data.so_number}" class="form-control" name="so_number" id="so_number">
                                    </div>
                                    <div class="form-group">
                                        <label for="fax">Date</label>
                                        <input type="date" class="form-control" name="date" id="date" value="${data.date}">
                                    </div>
                                </div>
                                <div class="col-md-4">
                                    <div class="form-group">
                                        <label for="picture">Attachment</label>
                                        <input type="file" class="dropify" name="attachment" id="attachment" ${data.attachment === null ? '' : `data-default-file="${SET.apiURL()}stock_opnames/file/${data.attachment}`}">
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
                                        <textarea class="form-control" id="memo" name="memo" rows="5">${SET.filterNull(data.memo)}</textarea>
                                    </div>
                                    <div class="form-group">
                                        <label for="memo">Message</label>
                                        <textarea class="form-control" id="message" name="message" rows="5">${SET.filterNull(data.message)}</textarea>
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
                                        <input type="hidden" name="_method" id="_method" value="put">
                                        <a class="btn btn-md btn-danger" href="#/product">Cancel</a>
                                        <button class="btn btn-md btn-success" type="submit">Update</button>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            `

            $('#main_content').html(html)
        }
    }
})(settingController)

const stockOpnameController = ((SET, DT, UI) => {

    /* -------------------- ADD ACTION ----------------- */
    const _addRow = TOKEN => {
        $('.btn_add_row').click(function () {

            $('#form_add_product_2')[0].reset()
            $('#modal_add_product_2').modal('show')

            _submitAddProduct(TOKEN, data => {
                UI.renderRow(data)
            })
        })
    }

    const _submitAddProduct = (TOKEN, callback) => {
        $('#form_add_product_2').validate({
            errorClass: 'is-invalid',
            successClass: 'is-valid',
            validClass: 'is-valid',
            errorElement: 'div',
            errorPlacement: function (error, element) {
                error.addClass('invalid-feedback');
                error.insertAfter(element)
            },
            rules: {
                product_name: 'required',
            },
            submitHandler: form => {
                $.ajax({
                    url: `${SET.apiURL()}products`,
                    type: 'POST',
                    dataType: 'JSON',
                    data: new FormData(form),
                    contentType: false,
                    processData: false,
                    beforeSend: xhr => {
                        xhr.setRequestHeader("Authorization", "Bearer " + TOKEN)

                        SET.contentLoader('.modal-content')
                    },
                    success: res => {
                        toastr.success(res.message, 'Success', { "progressBar": true, "closeButton": true, "positionClass": 'toast-bottom-right' });
                        $('#modal_add_product_2').modal('hide')
                        callback(res.results)
                    },
                    error: ({ responseJSON }) => {
                        toastr.error(responseJSON.message, 'Failed', { "progressBar": true, "closeButton": true, "positionClass": 'toast-bottom-right' });
                    },
                    complete: () => {
                        SET.closeSelectedElement('.modal-content')
                    }
                })
            }
        })
    }

    const _removeRow = table => {
        $('#t_add_products').on('click', '.btn-remove', function () {
            let id = $(this).data('id')
            let remove = $(this).data('remove')

            if (remove === true && id) {
                $('#row_' + id).remove();
                _calculateAll(table)
            }
        })
    }

    const _onKeyupUnitPrice = table => {
        $('#t_exist_products').on('keyup blur change input', '.unit_price', function () {
            let id = $(this).data('id')
            let thisVal = $(this).val()
            
            let actual_qty = $('#actual_qty_' + id).val()
            let system_qty = $('#system_qty_' + id).val()
            let actual_total = parseFloat(thisVal) * parseFloat(actual_qty)
            let system_total = parseFloat(thisVal) * parseFloat(system_qty)

            $('#actual_total_' + id).val(actual_total)
            $('#system_total_' + id).val(system_total)

            _calculateAll(table)
        });
    }

    const _onKeyupQty = table => {
        $('#t_exist_products').on('keyup blur change input', '.actual_qty', function () {
            let id = $(this).data('id')
            let thisVal = $(this).val()
            let unit_price = $('#unit_price_' + id).val()
            let actual_total = parseFloat(unit_price) * parseFloat(thisVal)

            $('#actual_total_' + id).val(actual_total)

            _calculateAll(table)
        });
    }

    const _onKeyupTotal = table => {
        $('#t_exist_products').on('keyup blur change input', '.actual_total', function (event, state) {
            _calculateAll(table)
        })
    }

    const _onKeyupAddUnitPrice = table => {
        $('#t_add_products').on('keyup blur change input', '.add_unit_price', function () {
            let id = $(this).data('id')
            let thisVal = $(this).val()

            let actual_qty = $('#add_actual_qty_' + id).val()
            let system_qty = $('#add_system_qty_' + id).val()
            let actual_total = parseFloat(thisVal) * parseFloat(actual_qty)
            let system_total = parseFloat(thisVal) * parseFloat(system_qty)

            $('#add_actual_total_' + id).val(actual_total)
            $('#add_system_total_' + id).val(system_total)

            _calculateAll(table)
        });
    }

    const _onKeyupAddQty = table => {
        $('#t_add_products').on('keyup blur change input', '.add_actual_qty', function () {
            let id = $(this).data('id')
            let thisVal = $(this).val()
            let unit_price = $('#add_unit_price_' + id).val()
            let actual_total = parseFloat(unit_price) * parseFloat(thisVal)

            $('#add_actual_total_' + id).val(actual_total)

            _calculateAll(table)
        });
    }

    const _onKeyupAddTotal = table => {
        $('#t_add_products').on('keyup blur change input', '.add_actual_total', function (event, state) {
            _calculateAll(table)
        })
    }

    const _calculateAll = table => {
        let sum_actual_qty = 0
        let sum_actual_total = 0

        // let data = table.$('input').serialize();

        table.$('.actual_qty').each(function () {
            let total = $(this).val();

            if (total !== '') {
                sum_actual_qty += parseFloat(total)
            }
        })

        table.$('.actual_total').each(function () {
            let total = $(this).val();

            if (total !== '') {
                sum_actual_total += parseFloat(total)
            }
        })

        $('.add_actual_qty').each(function () {
            let total = $(this).val();

            if (total !== '') {
                sum_actual_qty += parseFloat(total)
            }
        })

        $('.add_actual_total').each(function () {
            let total = $(this).val();

            if (total !== '') {
                sum_actual_total += parseFloat(total)
            }
        })

        $('#sum_actual_qty').val(sum_actual_qty).trigger('input')
        $('#sum_actual_qty_text').text(`${SET.realCurrency(sum_actual_qty)}`)

        $('#sum_actual_total').val(sum_actual_total).trigger('input')
        $('#sum_actual_total_text').text(`Rp. ${SET.realCurrency(sum_actual_total)}`)



    }

    const _submitAdd = (TOKEN, table) => {
        $('#form_add').validate({
            errorClass: 'is-invalid',
            successClass: 'is-valid',
            validClass: 'is-valid',
            errorElement: 'div',
            errorPlacement: function (error, element) {
                error.addClass('invalid-feedback');
                error.insertAfter(element)
            },
            rules: {
                so_number: 'required',
                date: 'required',
            },
            submitHandler: form => {
                var oldFormData = new FormData(form);
                let newFormData = new FormData();
                let exist = table.$('input').serializeArray();
                let additional = $('#t_add_products input').serializeArray();
                
                newFormData.append('so_number', oldFormData.get('so_number'))
                newFormData.append('date', oldFormData.get('date'))
                newFormData.append('memo', oldFormData.get('memo'))
                newFormData.append('message', oldFormData.get('message'))
                newFormData.append('attachment', oldFormData.get('attachment'))
                exist.forEach(v => newFormData.append(v.name, v.value));
                additional.forEach(v => newFormData.append(v.name, v.value));

                // Check Value Form Data has Appended
                // for (var pair of newFormData.entries()) {
                //     console.log(pair[0] + ', ' + pair[1]);
                // }

                $.ajax({
                    url: `${SET.apiURL()}stock_opnames`,
                    type: 'POST',
                    dataType: 'JSON',
                    data: newFormData,
                    contentType: false,
                    processData: false,
                    beforeSend: xhr => {
                        xhr.setRequestHeader("Authorization", "Bearer " + TOKEN)

                        SET.contentLoader('#add_container')
                    },
                    success: res => {
                        toastr.success(res.message, 'Success', { "progressBar": true, "closeButton": true, "positionClass": 'toast-bottom-right' });
                        location.hash = `#/stock_opname/${res.results.id}`
                    },
                    error: ({ responseJSON }) => {
                        toastr.error(responseJSON.message, 'Failed', { "progressBar": true, "closeButton": true, "positionClass": 'toast-bottom-right' });
                    },
                    complete: () => {
                        SET.closeSelectedElement('#add_container')
                    }
                })
            }
        })
    }


    /* -------------------- DELETE ACTION ----------------- */
    const _openValidate = parent => {
        $(parent).on('click', '.btn-validate', function () {
            let id = $(this).data('id')
            let name = $(this).data('name')

            $('#validate_id').val(id)
            $('#validate_desc').text(name)

            $('#modal_validate').modal('show')
        })
    }

    const _submitValidate = (TOKEN, callback) => {
        $('#form_validate').on('submit', function (e) {
            e.preventDefault()

            let id = $('#validate_id').val()

            if (id === '') {
                toastr.error('Data cannot be proccessed', 'Failed', { "progressBar": true, "closeButton": true, "positionClass": 'toast-bottom-right' });
            } else {
                $.ajax({
                    url: `${SET.apiURL()}stock_opnames/validate/${id}`,
                    type: 'PUT',
                    dataType: 'JSON',
                    beforeSend: xhr => {
                        xhr.setRequestHeader("Authorization", "Bearer " + TOKEN)
                        SET.contentLoader('.modal-content')
                    },
                    success: res => {
                        toastr.success(res.message, 'Success', { "progressBar": true, "closeButton": true, "positionClass": 'toast-bottom-right' });
                        callback(res)
                    },
                    error: ({ responseJSON }) => {
                        toastr.error(responseJSON.message, 'Failed', { "progressBar": true, "closeButton": true, "positionClass": 'toast-bottom-right' });
                    },
                    complete: () => {
                        SET.closeSelectedElement('.modal-content')
                    }
                })
            }
        })
    }

    const _openDelete = parent => {
        $(parent).on('click', '.btn-delete', function () {
            let id = $(this).data('id')
            let name = $(this).data('name')

            $('#delete_id').val(id)
            $('#delete_desc').text(name)

            $('#modal_delete').modal('show')
        })
    }

    const _submitDelete = (TOKEN, callback) => {
        $('#form_delete').on('submit', function (e) {
            e.preventDefault()

            let id = $('#delete_id').val()

            if (id === '') {
                toastr.error('Data cannot be proccessed', 'Failed', { "progressBar": true, "closeButton": true, "positionClass": 'toast-bottom-right' });
            } else {
                $.ajax({
                    url: `${SET.apiURL()}stock_opnames/${id}`,
                    type: 'DELETE',
                    dataType: 'JSON',
                    beforeSend: xhr => {
                        xhr.setRequestHeader("Authorization", "Bearer " + TOKEN)
                        SET.contentLoader('.modal-content')
                    },
                    success: res => {
                        toastr.success(res.message, 'Success', { "progressBar": true, "closeButton": true, "positionClass": 'toast-bottom-right' });
                        callback(res)
                    },
                    error: ({ responseJSON }) => {
                        toastr.error(responseJSON.message, 'Failed', { "progressBar": true, "closeButton": true, "positionClass": 'toast-bottom-right' });
                    },
                    complete: () => {
                        SET.closeSelectedElement('.modal-content')
                    }
                })
            }
        })
    }


    /* -------------------- EDIT ACTION ----------------- */
    const _editObserver = (TOKEN, id, so) => {
        MutationObserver = window.MutationObserver || window.WebKitMutationObserver;

        let container = document.querySelector("#edit_container")

        let observer = new MutationObserver(function (mutations, observer) {
            if (container.contains($('#form_edit')[0])) {

                $('.dropify').dropify();

                const table = $('#t_exist_products').DataTable({
                    columnDefs: [
                        {
                            targets: [2, 3, 4, 5],
                            orderable: false
                        },
                        {
                            targets: [2, 3, 4, 5],
                            searchable: false
                        }
                    ],
                    autoWidth: true,
                    responsive: false,
                    scrollX: true,
                    scrollY: 300,
                    processing: false,
                    keys: { columns: [0, 1, 2, 3, 4, 5] },
                    pageLength: 50,
                    language: SET.dtLanguage(),
                    ajax: {
                        url: `${SET.apiURL()}products`,
                        type: 'GET',
                        dataType: 'JSON',
                        beforeSend: xhr => {
                            xhr.setRequestHeader("Content-Type", 'application/json')
                            xhr.setRequestHeader("Authorization", "Bearer " + TOKEN)
                        },
                        dataSrc: res => {

                            let filtered = res.results.filter(v => v.product_name !== 'Penjualan / Pembelian');

                            let real_data = filtered.map(v => {
                                let founding = so.products.find(i => {
                                    return i.product_id === v.id
                                })

                                if(founding !== undefined){
                                    v.values = founding
                                } else {
                                    v.values = null
                                }

                                return v
                            })

                            return real_data;
                        },
                        error: err => {

                        }
                    },
                    columns: [
                        {
                            data: "id",
                            render: function (data, type, row, meta) {
                                return `
                                    ${row.sku}
                                    <input type="hidden" value="${row.id}" name="product_id[${meta.row}]" id="product_id_${meta.row}" data-id="${meta.row}">
                                `;
                            }
                        },
                        {
                            data: "id",
                            render: function (data, type, row, meta) {
                                return `
                                    ${row.product_name} <br/> <small>Category : ${row.category !== null ? row.category.category_name : '-'}</small>
                                    <input type="hidden" value="${row.product_name}" name="description[${meta.row}]" id="description_${meta.row}" data-id="${meta.row}">
                                `;
                            }
                        },
                        {
                            data: "purchase_price",
                            render: function (data, type, row, meta) {
                                return `
                                    <div class="input-group">
                                        <div class="input-group-prepend">
                                            <span class="input-group-text" id="basic-addon1">Rp. </span>
                                        </div>
                                        <input type="number" min="0" value="${row.values !== null ? row.values.unit_price : 0}" name="unit_price[${meta.row}]" id="unit_price_${meta.row}" data-id="${meta.row}" class="form-control unit_price">
                                    </div>
                                `;
                            }
                        },
                        {
                            data: "purchase_price",
                            render: function (data, type, row, meta) {
                                return `
                                    <div class="input-group">
                                        <input type="number"  min="0" value="${row.values !== null ? row.values.actual_qty : 0}" name="actual_qty[${meta.row}]" id="actual_qty_${meta.row}" data-id="${meta.row}" class="form-control actual_qty" required>
                                        <div class="input-group-prepend">
                                            <input type="hidden" value="${row.values !== null ? row.values.system_qty : 0}" name="system_qty[${meta.row}]" id="system_qty_${meta.row}" data-id="${meta.row}">
                                            <input type="hidden" value="${row.unit !== null ? row.unit.unit_name : '-'}" name="unit[${meta.row}]" id="unit_${meta.row}" data-id="${meta.row}">
                                            <span class="input-group-text" id="unit_text_${meta.row}" data-id="${meta.row}">${row.unit !== null ? row.unit.unit_name : '-'}</span>
                                        </div>
                                    </div>
                                `;
                            }
                        },
                        {
                            data: "purchase_price",
                            render: function (data, type, row, meta) {
                                return `
                                    <div class="input-group">
                                        <div class="input-group-prepend">
                                            <span class="input-group-text" id="basic-addon1">Rp. </span>
                                        </div>
                                        <input type="number" min="0" value="${row.values !== null ? row.values.actual_total : 0}" name="actual_total[${meta.row}]" id="actual_total_${meta.row}" data-id="${meta.row}" class="form-control actual_total">
                                        <input type="hidden" value="${row.values !== null ? row.values.system_total : 0}" name="system_total[${meta.row}]" id="system_total_${meta.row}" data-id="${meta.row}">
                                    </div>
                                `;
                            }
                        },
                        {
                            data: null,
                            render: function (data, type, row, meta) {
                                return `
                                    <div class="form-group">
                                        <textarea name="note[${meta.row}]" id="note_${meta.row}" data-id="${meta.row}" rows="1" class="form-control">${data.values !== null ? SET.filterNull(row.values.note) : ''}</textarea>
                                    </div>
                                `;
                            }
                        },
                    ],
                    initComplete: function () {
                        _calculateAll(table)
                    },
                    order: [[2, "desc"]]
                })

                $('#category_id').select2({
                    ajax: {
                        url: `${SET.apiURL()}categories`,
                        dataType: 'JSON',
                        type: 'GET',
                        headers: {
                            "Authorization": "Bearer " + TOKEN,
                            "Content-Type": "application/json",
                        },
                        data: function (params) {
                            var query = {
                                search: params.term,
                                limit: 100,
                            }

                            return query;
                        },
                        processResults: function (data) {
                            let filtered = [];

                            data.results.map(v => {
                                let obj = {
                                    id: v.id,
                                    text: v.category_name
                                }

                                filtered.push(obj)
                            })

                            return {
                                results: filtered
                            };
                        },
                        cache: true
                    },
                    language: {
                        noResults: function (term) {
                            let search = $('#category_id')
                                .data("select2")
                                .$dropdown.find("input").val();

                            let no_results = $(`<a href="javascript:void(0);" class="select2_add_category" data-name="${search}">Create new item: <b>${search}</b></a>`)

                            return no_results;
                        },
                    }
                });

                $('#unit_id').select2({
                    ajax: {
                        url: `${SET.apiURL()}units`,
                        dataType: 'JSON',
                        type: 'GET',
                        headers: {
                            "Authorization": "Bearer " + TOKEN,
                            "Content-Type": "application/json",
                        },
                        data: function (params) {
                            var query = {
                                search: params.term,
                                limit: 100,
                            }

                            return query;
                        },
                        processResults: function (data) {
                            let filtered = [];

                            data.results.map(v => {
                                let obj = {
                                    id: v.id,
                                    text: v.unit_name
                                }

                                filtered.push(obj)
                            })

                            return {
                                results: filtered
                            };
                        },
                        cache: true
                    },
                    language: {
                        noResults: function (term) {
                            let search = $('#unit_id')
                                .data("select2")
                                .$dropdown.find("input").val();

                            let no_results = $(`<a href="javascript:void(0);" class="select2_add_unit" data-name="${search}">Create new item: <b>${search}</b></a>`)

                            return no_results;
                        },
                    }
                });

                
                _addRow(TOKEN)
                _removeRow(table)
                _onKeyupUnitPrice(table)
                _onKeyupQty(table)
                _onKeyupTotal(table)

                _onKeyupAddUnitPrice(table)
                _onKeyupAddQty(table)
                _onKeyupAddTotal(table)

                _submitEdit(TOKEN, table, id)
            }


            observer.disconnect();
        });

        observer.observe(container, {
            subtree: true,
            attributes: true,
            childList: true,
        });
    }

    const _submitEdit = (TOKEN, table, id) => {
        $('#form_edit').validate({
            errorClass: 'is-invalid',
            successClass: 'is-valid',
            validClass: 'is-valid',
            errorElement: 'div',
            errorPlacement: function (error, element) {
                error.addClass('invalid-feedback');
                error.insertAfter(element)
            },
            rules: {
                so_number: 'required',
                date: 'required',
            },
            submitHandler: form => {
                var oldFormData = new FormData(form);
                let newFormData = new FormData();
                let exist = table.$('input').serializeArray();
                let additional = $('#t_add_products input').serializeArray();

                newFormData.append('so_number', oldFormData.get('so_number'))
                newFormData.append('date', oldFormData.get('date'))
                newFormData.append('memo', oldFormData.get('memo'))
                newFormData.append('message', oldFormData.get('message'))
                newFormData.append('attachment', oldFormData.get('attachment'))
                newFormData.append('_method', oldFormData.get('_method'))
                exist.forEach(v => newFormData.append(v.name, v.value));
                additional.forEach(v => newFormData.append(v.name, v.value));

                // Check Value Form Data has Appended
                // for (var pair of newFormData.entries()) {
                //     console.log(pair[0] + ', ' + pair[1]);
                // }

                $.ajax({
                    url: `${SET.apiURL()}stock_opnames/${id}`,
                    type: 'POST',
                    dataType: 'JSON',
                    data: newFormData,
                    contentType: false,
                    processData: false,
                    beforeSend: xhr => {
                        xhr.setRequestHeader("Authorization", "Bearer " + TOKEN)

                        SET.contentLoader('#edit_container')
                    },
                    success: res => {
                        toastr.success(res.message, 'Success', { "progressBar": true, "closeButton": true, "positionClass": 'toast-bottom-right' });
                        location.hash = `#/stock_opname/${res.results.id}`
                    },
                    error: ({ responseJSON }) => {
                        toastr.error(responseJSON.message, 'Failed', { "progressBar": true, "closeButton": true, "positionClass": 'toast-bottom-right' });
                    },
                    complete: () => {
                        SET.closeSelectedElement('#edit_container')
                    }
                })
            }
        })
    }

    /* -------------------- DETAIL ACTION ----------------- */
    const _fetcStockOpname = (TOKEN, id, callback) => {
        $.ajax({
            url: `${SET.apiURL()}stock_opnames/${id}`,
            type: 'GET',
            dataType: 'JSON',
            beforeSend: xhr => {
                xhr.setRequestHeader("Authorization", "Bearer " + TOKEN)
            },
            success: res => {
                callback(res.results)
            },
            error: ({ responseJSON }) => {
                toastr.error(responseJSON.message, 'Failed', { "progressBar": true, "closeButton": true, "positionClass": 'toast-bottom-right' });
            },
            statusCode: {
                404: () => {
                    $('#app_content').load(`${SET.baseURL()}data_not_found`)
                },
                401: err => {
                    let error = err.responseJSON

                    if (error.message === 'Unauthenticated.') {
                        $('#app_content').load(`${SET.baseURL()}unauthenticated`)
                    }

                    if (error.message === 'Unauthorized.') {
                        $('#app_content').load(`${SET.baseURL()}unauthorized`)
                    }
                }
            },
            complete: () => {

            }
        })
    }

    const _printAll = () => {
        $('#detail_container').on('click', '#print', function () {
            var mode = 'iframe'; //popup
            var close = mode == "popup";
            var options = {
                mode: mode,
                popClose: close
            };
            $("div.printableArea").printArea(options);
        });
    }

    return {
        data: TOKEN => {

            const table = $('#t_stock_opnames').DataTable({
                columnDefs: [
                    {
                        targets: [4],
                        orderable: false
                    },
                    {
                        targets: [4],
                        searchable: false
                    }
                ],
                autoWidth: true,
                responsive: false,
                scrollX: true,
                scrollY: 300,
                processing: false,
                // select: {
                //     style: "multiple",
                //     selector: "td:first-child"
                // },
                language: SET.dtLanguage(),
                dom: "<'row mt-2 mb-2'<'col-md-6'B><'col-md-6'f>><t><'row'<'col-md-6'i><'col-md-6'p>>",
                keys: { columns: [1, 2] },
                pageLength: 50,
                buttons: {
                    dom: {
                        button: {
                            tag: 'button',
                            className: 'btn btn-md btn-primary my-action'
                        }
                    },
                    buttons: [
                        {
                            extend: 'collection',
                            text: '<i class="fa fa-download"></i> ',
                            titleAttr: 'Export Data',
                            buttons: [
                                {
                                    extend: 'pdfHtml5',
                                    text: 'PDF',
                                    exportOptions: {
                                        columns: [0, 1, 2, 3]
                                    },
                                    filename: 'DATA_STOCK_OPNAME',
                                    title: 'Data Stock Opname',
                                },
                                {
                                    extend: 'excelHtml5',
                                    text: 'Excel',
                                    exportOptions: {
                                        columns: [0, 1, 2, 3]
                                    },
                                    filename: 'DATA_STOCK_OPNAME',
                                    title: 'Data Stock Opname'
                                },
                                {
                                    extend: 'csvHtml5',
                                    text: 'CSV',
                                    exportOptions: {
                                        columns: [0, 1, 2, 3]
                                    },
                                    filename: 'DATA_STOCK_OPNAME',
                                    title: 'Data Stock Opname'
                                },
                                {
                                    extend: 'print',
                                    text: 'Print',
                                    exportOptions: {
                                        columns: [0, 1, 2, 3]
                                    },
                                    filename: 'DATA_STOCK_OPNAME',
                                    title: '<h4>Data Stock Opname</h4>'
                                },
                            ]
                        },
                        {
                            extend: 'colvis',
                            text: '<i class="fa fa-eye"></i>',
                            columns: [1, 2, 3],
                            titleAttr: 'Hide Coloum'
                        },
                        {
                            text: '<i class="fa fa-spinner"></i>',
                            action: function (e, dt, node, config) {
                                dt.ajax.reload()
                            },
                            titleAttr: 'Refresh'
                        },
                        {
                            text: '<i class="fa fa-search"></i>',
                            action: function (e, dt, node, config) {
                                $('#modal_search').modal('show')
                            },
                            titleAttr: 'Search'
                        },
                        {
                            text: '<i class="fa fa-calendar"></i>',
                            action: function (e, dt, node, config) {
                                $('#modal_range').modal('show')
                            },
                            titleAttr: 'Search Range'
                        },
                        {
                            text: '<i class="fa fa-plus"></i>',
                            action: function (e, dt, node, config) {
                                location.hash = '#/stock_opname/add'
                            },
                            titleAttr: 'Add'
                        },
                    ]
                },
                ajax: {
                    url: `${SET.apiURL()}stock_opnames`,
                    type: 'GET',
                    dataType: 'JSON',
                    beforeSend: xhr => {
                        xhr.setRequestHeader("Content-Type", 'application/json')
                        xhr.setRequestHeader("Authorization", "Bearer " + TOKEN)
                    },
                    dataSrc: res => {
                        let sum_actual_qty = res.results.reduce((a, b) => a + b.total_actual_qty, 0);
                        let sum_system_qty = res.results.reduce((a, b) => a + b.total_system_qty, 0);
                        let sum_actual_amount = res.results.reduce((a, b) => a + b.total_actual_amount, 0);
                        let sum_system_amount = res.results.reduce((a, b) => a + b.total_system_amount, 0);

                        let sum_qty = parseFloat(sum_actual_qty) - parseFloat(sum_system_qty)
                        let sum_total = parseFloat(sum_actual_amount) - parseFloat(sum_system_amount)

                        $('#sum_qty').text(SET.realCurrency(sum_qty))
                        $('#sum_total').text(`Rp. ${SET.realCurrency(sum_total)}`)

                        return res.results
                    },
                    statusCode: {
                        401: err => {
                            let error = err.responseJSON

                            if (error.message === 'Unauthenticated.') {
                                $('#app_content').load(`${SET.baseURL()}unauthenticated`)
                            }

                            if (error.message === 'Unauthorized.') {
                                $('#app_content').load(`${SET.baseURL()}unauthorized`)
                            }
                        }
                    },
                    error: err => {

                    }
                },
                columns: [
                    {
                        data: "id",
                        render: function (data, type, row) {
                            return `
                                <a href="#/stock_opname/${row.id}">${row.so_number}</a>
                            `;
                        }
                    },
                    {
                        data: "status",
                        render: function (data, type, row) {
                            if(row.status === 'Proccess'){
                                return `
                                    <a class="text-warning">${row.status}</a>
                                `;
                            } else {
                                return `
                                    <a class="text-success">${row.status}</a>
                                `;
                            }
                        }
                    },
                    {
                        data: "date"
                    },
                    {
                        data: "grand_total",
                        render: function (data, type, row) {
                            let sum_qty = parseFloat(row.total_actual_qty) - parseFloat(row.total_system_qty)
                            return `${sum_qty}`
                        }
                    },
                    {
                        data: "grand_total",
                        render: function (data, type, row) {
                            let sum_total = parseFloat(row.total_actual_amount) - parseFloat(row.total_system_amount)
                            return `Rp. ${SET.realCurrency(sum_total)}`
                        }
                    },
                    {
                        data: "memo",
                        render: function (data, type, row) {
                            let shrinkage = 0;
                            let operations;

                            if (row.total_actual_amount <= row.total_system_amount) {
                                operations = '-'
                                shrinkage = parseFloat(((row.total_actual_amount - row.total_system_amount) / row.total_system_amount) * 100)
                            } else {
                                operations = '+'
                                shrinkage = parseFloat(((row.total_actual_amount - row.total_system_amount) / row.total_actual_amount) * 100)
                            }

                            return `${SET.realCurrency(parseFloat(shrinkage))} %`
                        }
                    },
                    {
                        data: "id",
                        render: function (data, type, row) {
                            if(row.status === 'Proccess'){
                                return `
                                    <div class="btn-group">
                                        <button type="button" class="btn btn-light dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                            <i class="ti-settings"></i>
                                        </button>
                                        <div class="dropdown-menu animated flipInY" x-placement="bottom-start" style="position: absolute; transform: translate3d(-33px, 35px, 0px); top: 0px; left: 0px; will-change: transform;">
                                            <a class="dropdown-item btn-delete" href="javascript:void(0)" id="btn_delete" data-id="${row.id}" data-name="${row.so_number}"><i class="fa fa-trash"></i> Delete</a>
                                            <div class="dropdown-divider"></div>
                                            <a class="dropdown-item" href="#/stock_opname/edit/${row.id}"><i class="fa fa-edit"></i> Edit</a>
                                            <div class="dropdown-divider"></div>
                                            <a class="dropdown-item btn-validate" href="javascript:void(0)" data-id="${row.id}" data-name="${row.so_number}"><i class="fa fa-check"></i> Validate</a>
                                        </div>
                                    </div>
                                `;
                            } else {
                                return `<i class="fa fa-check"></i>`
                            }
                        }
                    }
                ],
                footerCallback: function () {
                    let api = this.api()
                    let filtered = api.rows({ search: 'applied' }).data()
                    let data = api.rows().data()

                    let sum_actual_amount = data.reduce((a, b) => a + b.total_actual_amount, 0);
                    let sum_system_amount = data.reduce((a, b) => a + b.total_system_amount, 0);
                    let filtered_sum_actual_amount = filtered.reduce((a, b) => a + b.total_actual_amount, 0);
                    let filtered_sum_system_amount = filtered.reduce((a, b) => a + b.total_system_amount, 0);

                    let sum_total = parseFloat(sum_actual_amount) - parseFloat(sum_system_amount)
                    let filtered_sum_total = parseFloat(filtered_sum_actual_amount) - parseFloat(filtered_sum_system_amount)

                    $(api.column(1).footer()).html(
                        `<b>
                            Filtered Total : Rp. ${SET.realCurrency(filtered_sum_total)} <br />
                            Grand Total : Rp. ${SET.realCurrency(sum_total)}
                        </b>`
                    );
                },
                order: [[2, "desc"]]
            })

            DT.dtFilter(table)
            DT.dtFilterRange(table, 2)

            _openDelete('#t_stock_opnames')
            _submitDelete(TOKEN, data => {
                table.ajax.reload()
                $('#modal_delete').modal('hide')
            })

            _openValidate('#t_stock_opnames')
            _submitValidate(TOKEN, data => {
                table.ajax.reload()
                $('#modal_validate').modal('hide')
            })
        },
        add: TOKEN => {

            UI.resetCount()

            const table = $('#t_exist_products').DataTable({
                columnDefs: [
                    {
                        targets: [2, 3, 4, 5],
                        orderable: false
                    },
                    {
                        targets: [2, 3, 4, 5],
                        searchable: false
                    }
                ],
                autoWidth: true,
                responsive: false,
                scrollX: true,
                scrollY: 300,
                processing: false,
                keys: { columns: [0, 1, 2, 3, 4, 5] },
                pageLength: 50,
                language: SET.dtLanguage(),
                ajax: {
                    url: `${SET.apiURL()}products`,
                    type: 'GET',
                    dataType: 'JSON',
                    beforeSend: xhr => {
                        xhr.setRequestHeader("Content-Type", 'application/json')
                        xhr.setRequestHeader("Authorization", "Bearer " + TOKEN)
                    },
                    dataSrc: res => {

                        let filtered = res.results.filter(v => v.product_name !== 'Penjualan / Pembelian');

                        return filtered;
                    },
                    error: err => {

                    }
                },
                columns: [
                    {
                        data: "id",
                        render: function (data, type, row, meta) {
                            return `
                                ${row.sku}
                                <input type="hidden" value="${row.id}" name="product_id[${meta.row}]" id="product_id_${meta.row}" data-id="${meta.row}">
                            `;
                        }
                    },
                    {
                        data: "id",
                        render: function (data, type, row, meta) {
                            return `
                                ${row.product_name} <br/> <small>Category : ${row.category !== null ? row.category.category_name : '-'}</small>
                                <input type="hidden" value="${row.product_name}" name="description[${meta.row}]" id="description_${meta.row}" data-id="${meta.row}">
                            `;
                        }
                    },
                    {
                        data: "purchase_price",
                        render: function (data, type, row, meta) {
                            return `
                                <div class="input-group">
                                    <div class="input-group-prepend">
                                        <span class="input-group-text" id="basic-addon1">Rp. </span>
                                    </div>
                                    <input type="number" min="0" value="${row.purchase_price}" name="unit_price[${meta.row}]" id="unit_price_${meta.row}" data-id="${meta.row}" class="form-control unit_price">
                                </div>
                            `;
                        }
                    },
                    {
                        data: "purchase_price",
                        render: function (data, type, row, meta) {

                            let system_qty = parseFloat(row.sum_adjustment + row.sum_purchase + row.sum_purchase_return + row.sum_selling + row.sum_selling_return)

                            return `
                                <div class="input-group">
                                    <input type="number"  min="0" value="0" name="actual_qty[${meta.row}]" id="actual_qty_${meta.row}" data-id="${meta.row}" class="form-control actual_qty" required>
                                    <div class="input-group-prepend">
                                        <input type="hidden" value="${system_qty}" name="system_qty[${meta.row}]" id="system_qty_${meta.row}" data-id="${meta.row}">
                                        <input type="hidden" value="${row.unit !== null ? row.unit.unit_name : '-'}" name="unit[${meta.row}]" id="unit_${meta.row}" data-id="${meta.row}">
                                        <span class="input-group-text" id="unit_text_${meta.row}" data-id="${meta.row}">${row.unit !== null ? row.unit.unit_name : '-'}</span>
                                    </div>
                                </div>
                            `;
                        }
                    },
                    {
                        data: "purchase_price",
                        render: function (data, type, row, meta) {
                            let system_qty = parseFloat(row.sum_adjustment + row.sum_purchase + row.sum_purchase_return + row.sum_selling + row.sum_selling_return)

                            let system_total = parseFloat(row.purchase_price) * parseFloat(system_qty)

                            return `
                                <div class="input-group">
                                    <div class="input-group-prepend">
                                        <span class="input-group-text" id="basic-addon1">Rp. </span>
                                    </div>
                                    <input type="number" min="0" value="0" name="actual_total[${meta.row}]" id="actual_total_${meta.row}" data-id="${meta.row}" class="form-control actual_total">
                                    <input type="hidden" value="${system_total}" name="system_total[${meta.row}]" id="system_total_${meta.row}" data-id="${meta.row}">
                                </div>
                            `;
                        }
                    },
                    {
                        data: null,
                        render: function (data, type, row, meta) {
                            return `
                                <div class="form-group">
                                    <textarea name="note[${meta.row}]" id="note_${meta.row}" data-id="${meta.row}" rows="1" class="form-control"></textarea>
                                </div>
                            `;
                        }
                    },
                ],
                order: [[2, "desc"]]
            })

            $('.dropify').dropify();

            $('#category_id').select2({
                ajax: {
                    url: `${SET.apiURL()}categories`,
                    dataType: 'JSON',
                    type: 'GET',
                    headers: {
                        "Authorization": "Bearer " + TOKEN,
                        "Content-Type": "application/json",
                    },
                    data: function (params) {
                        var query = {
                            search: params.term,
                            limit: 100,
                        }

                        return query;
                    },
                    processResults: function (data) {
                        let filtered = [];

                        data.results.map(v => {
                            let obj = {
                                id: v.id,
                                text: v.category_name
                            }

                            filtered.push(obj)
                        })

                        return {
                            results: filtered
                        };
                    },
                    cache: true
                },
                language: {
                    noResults: function (term) {
                        let search = $('#category_id')
                            .data("select2")
                            .$dropdown.find("input").val();

                        let no_results = $(`<a href="javascript:void(0);" class="select2_add_category" data-name="${search}">Create new item: <b>${search}</b></a>`)

                        return no_results;
                    },
                }
            });

            $('#unit_id').select2({
                ajax: {
                    url: `${SET.apiURL()}units`,
                    dataType: 'JSON',
                    type: 'GET',
                    headers: {
                        "Authorization": "Bearer " + TOKEN,
                        "Content-Type": "application/json",
                    },
                    data: function (params) {
                        var query = {
                            search: params.term,
                            limit: 100,
                        }

                        return query;
                    },
                    processResults: function (data) {
                        let filtered = [];

                        data.results.map(v => {
                            let obj = {
                                id: v.id,
                                text: v.unit_name
                            }

                            filtered.push(obj)
                        })

                        return {
                            results: filtered
                        };
                    },
                    cache: true
                },
                language: {
                    noResults: function (term) {
                        let search = $('#unit_id')
                            .data("select2")
                            .$dropdown.find("input").val();

                        let no_results = $(`<a href="javascript:void(0);" class="select2_add_unit" data-name="${search}">Create new item: <b>${search}</b></a>`)

                        return no_results;
                    },
                }
            });

            _addRow(TOKEN)
            _removeRow(table)
            _onKeyupUnitPrice(table)
            _onKeyupQty(table)
            _onKeyupTotal(table)

            _onKeyupAddUnitPrice(table)
            _onKeyupAddQty(table)
            _onKeyupAddTotal(table)

            _submitAdd(TOKEN, table)

        },
        edit: (TOKEN, id) => {

            UI.resetCount()

            _fetcStockOpname(TOKEN, id, data => {
                _editObserver(TOKEN, id, data)
                UI.renderFormEdit(data)
            })
        },
        detail: (TOKEN, id) => {

            _fetcStockOpname(TOKEN, id, data => {
                UI.renderDetail(data)
            })

            _printAll()
            _openDelete('#detail_container')
            _submitDelete(TOKEN, data => {
                location.hash = '#/stock_opname'
            })

            _openValidate('#detail_container')
            _submitValidate(TOKEN, data => {
                location.hash = '#/stock_opname'
            })
        }
    }
})(settingController, dtController, stockOpnameUI)

export default stockOpnameController