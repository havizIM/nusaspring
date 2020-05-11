const adjustmentUI = ((SET) => {
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
                                            <input type="text" class="form-control" readonly name="reference_number" id="reference_number" value="${_replaceNull(data.reference_number)}">
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
                                                    <th style="width: 20%;">Total</th>
                                                    <th style="width: 10%;">
                                                        <button class="btn btn-info btn-md btn_add_row" type="button" id="btn_add_row"><i class="fa fa-plus"></i></button>
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody id="coba">
                                                ${data.products.map((v, index) => {
                                                    count += 1

                                                    return `

                                                        <tr id="row_${count}">
                                                            <td>
                                                                <select name="product_id[${count}]" id="product_id_${count}" data-id="${count}" class="form-control product_id select2_${v.product_id}" data-sid="${v.product_id}" data-sname="${v.description}" data-sunit="${v.unit}" data-sprice="${v.unit_price}" required>
                                                                    <option value="" disabled="" selected="">-- Choose Product --</option>
                                                                </select>
                                                                <input type="hidden" name="description[${count}]" id="description_${count}" data-id="${count}" value="${v.description}">
                                                            </td>
                                                            <td>
                                                                <div class="input-group mb-3">
                                                                    <div class="input-group-prepend">
                                                                        <span class="input-group-text" id="basic-addon1">Rp. </span>
                                                                    </div>
                                                                <input type="number" min="0" name="unit_price[${count}]" id="unit_price_${count}" data-id="${count}" value="${v.unit_price}" class="form-control unit_price">
                                                                </div>
                                                            </td>
                                                            <td>
                                                                <div class="input-group mb-3">
                                                                        <input type="number" name="qty[${count}]" id="qty_${count}" data-id="${count}" value="${v.qty}" class="form-control qty" required>
                                                                        <div class="input-group-prepend">
                                                                            <input type="hidden" name="unit[${count}]" id="unit_${count}" data-id="${count}" value="${v.unit}" class="form-control" readonly>
                                                                            <span class="input-group-text" id="unit_text_${count}" data-id="${count}">${v.unit}</span>
                                                                        </div>
                                                                    </div>
                                                            </td>
                                                            <td>
                                                                <div class="input-group mb-3">
                                                                    <div class="input-group-prepend">
                                                                        <span class="input-group-text" id="basic-addon1">Rp. </span>
                                                                    </div>
                                                                    <input type="number" min="0" name="total[${count}]" id="total_${count}" data-id="${count}" class="form-control total" value="${parseFloat(v.unit_price) * parseFloat(v.qty)}">
                                                                </div>
                                                            </td>
                                                            <td>
                                                                <button class="btn btn-danger btn-md btn-remove" type="button" data-id="${count}" data-remove="true"><i class="fa fa-times"></i></button>
                                                            </td>
                                                        </tr>
                                                    `
                                                }).join('')}
                                            </tbody>
                                            <tfoot>
                                                <tr>
                                                    <td colspan="5">
                                                        <button class="btn btn-info btn-md btn_add_row" type="button" id="btn_add_row"><i class="fa fa-plus"></i> Add Product</button>
                                                    </td>
                                                </tr>
                                            </tfoot>
                                        </table>
                                    </div>
                                </div>
                                <div class="col-md-12 text-right">
                                    <h4>Grand Total : <b id="grand_total">Rp. 0</b></h4>
                                </div>
                                <div class="col-md-12 mt-5">
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
                                    <h3><b>ADJUSTMENT</b> <span class="pull-right">#${data.reference_number}</span></h3>
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
                                                        <h3>Details,</h3>
                                                        <h4 class="font-bold">Category: ${data.category},</h4>
                                                        <p class="m-t-30"><b><i class="fa fa-calendar"></i> Date :</b> ${data.date}</p>
                                                        <p><b><i class="mdi mdi-album"></i> Reference No :</b> ${_replaceNull(data.reference_number)}</p>
                                                    </address>
                                                </td>
                                            </tr>
                                        </table>
                                        <div class="col-md-12">
                                            <div class="table-responsive mt-5" style="clear: both;">
                                                <table class="table table-hover">
                                                    <thead>
                                                        <tr>
                                                            <th class="text-center">#</th>
                                                            <th>Description</th>
                                                            <th class="text-right">Quantity</th>
                                                            <th class="text-right">Unit Price</th>
                                                            <th class="text-right">Total</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        ${data.products.map(v => {
                                                            return `
                                                                <tr>
                                                                    <td class="text-center">${no++}</td>
                                                                    <td><a href="#/product/${v.product_id}">${v.description}</a></td>
                                                                    <td class="text-right">${v.qty} ${v.unit !== null ? v.unit : ''}</td>
                                                                    <td class="text-right"> Rp. ${SET.realCurrency(v.unit_price)} </td>
                                                                    <td class="text-right"> Rp. ${SET.realCurrency(v.total)} </td>
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
                                                        <i>* ${SET.replaceNull(data.memo)}</i>
                                                    </td>
                                                    <td class="w-50">
                                                        <div class="m-t-30 text-right">
                                                            <h3><b>Grand Total :</b> Rp. ${SET.realCurrency(data.products.reduce((a, b) => a + b.total, 0))}</h3>
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
                                <div class="card-body">
                                    <div class="text-right">
                                        <a class="btn btn-success" href="#/adjustment/edit/${data.id}"><i class="fa fa-edit"></i> Edit </a>
                                        <button class="btn btn-danger btn-delete" data-id="${data.id}" data-name="${data.category}" type="button"><i class="fa fa-times"></i> Delete </button>
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
                            <embed class="w-100" src="${SET.apiURL()}adjustments/file/${data.attachment}">
                        `}
                    </div>
                </div>

                
            `

            $('#main_content').html(html)
        },

        renderError: () => {

        },

        renderRow: TOKEN => {

            count += 1

            let html = `
                <tr id="row_${count}">
                    <td>
                        <select name="product_id[${count}]" id="product_id_${count}" data-id="${count}" class="form-control product_id" required>
                            <option value="" disabled="" selected="">-- Choose Product --</option>
                        </select>
                        <input type="hidden" name="description[${count}]" id="description_${count}" data-id="${count}">
                    </td>
                    <td>
                        <div class="input-group mb-3">
                            <div class="input-group-prepend">
                                <span class="input-group-text" id="basic-addon1">Rp. </span>
                            </div>
                        <input type="number" min="0" value="0" name="unit_price[${count}]" id="unit_price_${count}" data-id="${count}" class="form-control unit_price">
                        </div>
                    </td>
                    <td>
                        <div class="input-group mb-3">
                                <input type="number" value="0" name="qty[${count}]" id="qty_${count}" data-id="${count}" class="form-control qty" required>
                                <div class="input-group-prepend">
                                    <input type="hidden" name="unit[${count}]" id="unit_${count}" data-id="${count}" class="form-control" readonly>
                                    <span class="input-group-text" id="unit_text_${count}" data-id="${count}">-</span>
                                </div>
                            </div>
                    </td>
                    <td>
                        <div class="input-group mb-3">
                            <div class="input-group-prepend">
                                <span class="input-group-text" id="basic-addon1">Rp. </span>
                            </div>
                            <input type="number" min="0" value="0" name="total[${count}]" id="total_${count}" data-id="${count}" class="form-control total">
                        </div>
                    </td>
                    <td>
                        <button class="btn btn-danger btn-md btn-remove" type="button" id="btn_remove_row" data-id="${count}" data-remove="true"><i class="fa fa-times"></i></button>
                    </td>
                </tr>
            `

            $('#t_add_products tbody').append(html)

            $('#product_id_'+count).select2({
                ajax: {
                    url: `${SET.apiURL()}products`,
                    dataType: 'JSON',
                    type: 'GET',
                    headers: {
                        "Authorization": "Bearer " + TOKEN,
                        "Content-Type": "application/json",
                    },
                    data: function (params) {
                        var query = {
                            search: params.term,
                            limit: 100
                        }

                        return query;
                    },
                    processResults: function (data) {
                        let filtered = [];

                        data.results.map(v => {
                            let obj = {
                                id: v.id,
                                text: v.product_name,
                                price: v.purchase_price,
                                unit: v.unit === null ? null : v.unit.unit_name
                            }

                            filtered.push(obj)
                        })

                        return {
                            results: filtered
                        };
                    }
                }
            });

            $('#product_id_' + count).on('select2:open', () => {
                $(".select2-results:not(:has(a))").prepend('<a href="javascript:void(0)" class="select2_add_product" data-id="'+count+'" style="padding: 6px;height: 20px;display: inline-table;">Create new item</a>');
            })
        }
    }
})(settingController)

const adjustmentController = ((SET, DT, UI, LU) => {

    /* -------------------- ADD ACTION ----------------- */
    const _addRow = TOKEN => {
        $('.btn_add_row').click(function(){
            UI.renderRow(TOKEN)
        })
    }

    const _removeRow = () => {
        $('#t_add_products').on('click', '.btn-remove', function(){
            let id = $(this).data('id')
            let remove = $(this).data('remove')

            if(remove === true && id){
                $('#row_' + id).remove();
                _getTotal()
            }
        })
    }

    const _onChangeProduct = () => {
        $('#t_add_products').on('select2:select', '.product_id', function (e) {
            let data = e.params.data
            let id = $(this).data('id')
            let qty = $('#qty_0').val()
            
            $(`#description_${id}`).val(data.text)
            $(`#unit_price_${id}`).val(data.price).trigger('keyup')
            $(`#unit_${id}`).val(data.unit)
            $(`#unit_text_${id}`).text(data.unit)
            $(`#total_${id}`).text(parseFloat(data.price) * parseFloat(qty)).trigger('keyup')
        });
    }

    const _onKeyupQty = () => {
        $('#t_add_products').on('keyup blur change input', '.qty', function () {
            let id = $(this).data('id')
            let qty = $(this).val()
            let unit_price = $('#unit_price_'+id).val()

            $(`#total_${id}`).val(parseFloat(unit_price) * parseFloat(qty)).trigger('keyup')
        });
    }

    const _onUnitPrice = () => {
        $('#t_add_products').on('keyup blur change input', '.unit_price', function () {
            let id = $(this).data('id')
            let unit_price = $(this).val()
            let qty = $('#qty_' + id).val()

            $(`#total_${id}`).val(parseFloat(unit_price) * parseFloat(qty)).trigger('keyup')
        });
    }

    const _onTotalKeyup = () => {
        $('#t_add_products').on('keyup blur change input', '.total', function () {
            let id = $(this).data('id')

            _getTotal()
        });
    }

    const _getTotal = () => {
        let grand_total = 0;

        $('.total').each(function () {
            let total = $(this).val();

            if (total !== '') {
                grand_total += parseFloat(total)
            }

        })

        $('#grand_total').text(`Rp. ${SET.realCurrency(grand_total)}`)
    }

    const _submitAdd = TOKEN => {
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
                category: 'required',
                date: 'required',
            },
            submitHandler: form => {
                $.ajax({
                    url: `${SET.apiURL()}adjustments`,
                    type: 'POST',
                    dataType: 'JSON',
                    data: new FormData(form),
                    contentType: false,
                    processData: false,
                    beforeSend: xhr => {
                        xhr.setRequestHeader("Authorization", "Bearer " + TOKEN)

                        SET.contentLoader('#add_container')
                    },
                    success: res => {
                        toastr.success(res.message, 'Success', { "progressBar": true, "closeButton": true, "positionClass": 'toast-bottom-right' });
                        location.hash = `#/adjustment/${res.results.id}`
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
                    url: `${SET.apiURL()}adjustments/${id}`,
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

    /* -------------------- FETCH DATA ACTION ----------------- */
    const _fetchProduct = (TOKEN, success, error) => {
        $.ajax({
            url: `${SET.apiURL()}products`,
            type: 'GET',
            dataType: 'JSON',
            beforeSend: xhr => {
                xhr.setRequestHeader("Authorization", "Bearer " + TOKEN)
            },
            success: res => {
                success(res.results)
            },
            error: ({ responseJSON }) => {
                error(responseJSON)
            },
            complete: () => {

            }
        })
    }


    /* -------------------- EDIT ACTION ----------------- */
    const _editObserver = (TOKEN, id, adjustment) => {
        MutationObserver = window.MutationObserver || window.WebKitMutationObserver;

        let container = document.querySelector("#edit_container")

        let observer = new MutationObserver(function (mutations, observer) {
            if (container.contains($('#form_edit')[0])) {

                $('.dropify').dropify();

                $('.product_id').each(function (v) {
                    let myId = $(this).data('id');

                    let data = {
                        id: $(this).data('sid'),
                        text: $(this).data('sname'),
                        price: $(this).data('sprice'),
                        unit: $(this).data('sunit')
                    }

                    $(this).select2({
                        ajax: {
                            url: `${SET.apiURL()}products`,
                            dataType: 'JSON',
                            type: 'GET',
                            headers: {
                                "Authorization": "Bearer " + TOKEN,
                                "Content-Type": "application/json",
                            },
                            data: function (params) {
                                var query = {
                                    search: params.term,
                                    limit: 100
                                }

                                return query;
                            },
                            processResults: function (data) {
                                let filtered = [];

                                data.results.map(v => {
                                    let obj = {
                                        id: v.id,
                                        text: v.product_name,
                                        price: v.purchase_price,
                                        unit: v.unit === null ? null : v.unit.unit_name
                                    }

                                    filtered.push(obj)
                                })

                                return {
                                    results: filtered
                                };
                            }
                        }
                    })

                    let option = new Option(data.text, data.id, true, true);
                    $(this).append(option).trigger('change');

                    // manually trigger the `select2:select` event
                    $(this).trigger({
                        type: 'select2:select',
                        params: {
                            data: data
                        }
                    });

                    $(this).on('select2:open', () => {
                        $(".select2-results:not(:has(a))").prepend('<a href="javascript:void(0)" class="select2_add_product" data-id="' + myId +'" style="padding: 6px;height: 20px;display: inline-table;">Create new item</a>');
                    })

                })


                LU.lookupProduct(TOKEN, 'purchase')

                _addRow(TOKEN)
                _onChangeProduct()
                _onKeyupQty()
                _onUnitPrice()
                _onTotalKeyup()
                _getTotal()
                _removeRow()

                _submitEdit(TOKEN, id)
            }


            observer.disconnect();
        });

        observer.observe(container, {
            subtree: true,
            attributes: true,
            childList: true,
        });
    }

    const _submitEdit = (TOKEN, id) => {
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
                category: 'required',
                date: 'required',
            },
            submitHandler: form => {
                $.ajax({
                    url: `${SET.apiURL()}adjustments/${id}`,
                    type: 'POST',
                    dataType: 'JSON',
                    data: new FormData(form),
                    contentType: false,
                    processData: false,
                    beforeSend: xhr => {
                        xhr.setRequestHeader("Authorization", "Bearer " + TOKEN)

                        SET.contentLoader('#edit_container')
                    },
                    success: res => {
                        toastr.success(res.message, 'Success', { "progressBar": true, "closeButton": true, "positionClass": 'toast-bottom-right' });
                        location.hash = `#/adjustment/${res.results.id}`
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
    const _fetchAdjustment = (TOKEN, id, callback) => {
        $.ajax({
            url: `${SET.apiURL()}adjustments/${id}`,
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
            const table = $('#t_adjustment').DataTable({
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
                                    filename: 'DATA_ADJUSTMENT',
                                    title: 'Data Adjustment',
                                },
                                {
                                    extend: 'excelHtml5',
                                    text: 'Excel',
                                    exportOptions: {
                                        columns: [0, 1, 2, 3]
                                    },
                                    filename: 'DATA_ADJUSTMENT',
                                    title: 'Data Adjustment'
                                },
                                {
                                    extend: 'csvHtml5',
                                    text: 'CSV',
                                    exportOptions: {
                                        columns: [0, 1, 2, 3]
                                    },
                                    filename: 'DATA_ADJUSTMENT',
                                    title: 'Data Adjustment'
                                },
                                {
                                    extend: 'print',
                                    text: 'Print',
                                    exportOptions: {
                                        columns: [0, 1, 2, 3]
                                    },
                                    filename: 'DATA_ADJUSTMENT',
                                    title: '<h4>Data Adjustment</h4>'
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
                                location.hash = '#/adjustment/add'
                            },
                            titleAttr: 'Add'
                        },
                    ]
                },
                ajax: {
                    url: `${SET.apiURL()}adjustments`,
                    type: 'GET',
                    dataType: 'JSON',
                    beforeSend: xhr => {
                        xhr.setRequestHeader("Content-Type", 'application/json')
                        xhr.setRequestHeader("Authorization", "Bearer " + TOKEN)
                    },
                    dataSrc: res => {
                        let qty_awal = res.results.filter(v => v.category === 'Qty Awal').length;
                        let transfer_in = res.results.filter(v => v.category === 'Transfer In').length;
                        let transfer_out = res.results.filter(v => v.category === 'Transfer Out').length;
                        let other = res.results.filter(v => v.category === 'Other').length;

                        $('#count_qty_awal').text(SET.positiveCurrency(qty_awal))
                        $('#count_transfer_in').text(SET.positiveCurrency(transfer_in))
                        $('#count_transfer_out').text(SET.positiveCurrency(transfer_out))
                        $('#count_other').text(SET.positiveCurrency(other))

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
                                <a href="#/adjustment/${row.id}">${row.category}</a>
                            `;
                        }
                    },
                    {
                        data: "reference_number"
                    },
                    {
                        data: "date"
                    },
                    {
                        data: "grand_total",
                        render: function (data, type, row) {
                            return `
                                Rp. ${SET.realCurrency(row.grand_total)}
                            `;
                        }
                    },
                    {
                        data: "memo"
                    },
                    {
                        data: "id",
                        render: function (data, type, row) {
                            return `
                                <div class="btn-group">
                                    <button type="button" class="btn btn-light dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        <i class="ti-settings"></i>
                                    </button>
                                    <div class="dropdown-menu animated flipInY" x-placement="bottom-start" style="position: absolute; transform: translate3d(-33px, 35px, 0px); top: 0px; left: 0px; will-change: transform;">
                                        <a class="dropdown-item btn-delete" href="javascript:void(0)" id="btn_delete" data-id="${row.id}" data-name="${row.category}"><i class="fa fa-trash"></i> Delete</a>
                                        <div class="dropdown-divider"></div>
                                        <a class="dropdown-item" href="#/adjustment/edit/${row.id}"><i class="fa fa-edit"></i> Edit</a>
                                    </div>
                                </div>
                            `;
                        }
                    }
                ],
                footerCallback: function () {
                    let api = this.api()
                    let filtered = api.rows({ search: 'applied' }).data()
                    let data = api.rows().data()

                    let filtered_sum_total = filtered.reduce((a, b) => a + b.grand_total, 0);

                    let sum_total = data.reduce((a, b) => a + b.grand_total, 0);

                    $(api.column(1).footer()).html(
                        `<b>
                            Filtered Total : Rp. ${SET.positiveCurrency(filtered_sum_total)} <br />
                            Grand Total : Rp. ${SET.positiveCurrency(sum_total)}
                        </b>`
                    );
                },
                order: [[2, "desc"]]
            })

            DT.dtFilter(table)
            DT.dtFilterRange(table, 2)

            _openDelete('#t_adjustment')
            _submitDelete(TOKEN, data => {
                table.ajax.reload()
                $('#modal_delete').modal('hide')
            })
        },

        add: TOKEN => {
            UI.resetCount()

            $('.dropify').dropify();

            $('#product_id_0').select2({
                ajax: {
                    url: `${SET.apiURL()}products`,
                    dataType: 'JSON',
                    type: 'GET',
                    headers: {
                        "Authorization": "Bearer " + TOKEN,
                        "Content-Type": "application/json",
                    },
                    data: function (params) {
                        var query = {
                            search: params.term,
                            limit: 100
                        }

                        return query;
                    },
                    processResults: function (data) {
                        let filtered = [];

                        data.results.map(v => {
                            let obj = {
                                id: v.id,
                                text: v.product_name,
                                price: v.purchase_price,
                                unit: v.unit === null ? null : v.unit.unit_name
                            }

                            filtered.push(obj)
                        })

                        return {
                            results: filtered
                        };
                    }
                }
            });

            $('#product_id_0').on('select2:open', () => {
                $(".select2-results:not(:has(a))").prepend('<a href="javascript:void(0)" class="select2_add_product" data-id="0" style="padding: 6px;height: 20px;display: inline-table;">Create new item</a>');
            })

            LU.lookupProduct(TOKEN, 'purchase')

            _addRow(TOKEN)
            _onChangeProduct()
            _onKeyupQty()
            _onUnitPrice()
            _onTotalKeyup()
            _removeRow()

            _submitAdd(TOKEN)

        },

        edit: (TOKEN, id) => {
            UI.resetCount()

            _fetchAdjustment(TOKEN, id, data => {
                _editObserver(TOKEN, id, data)
                UI.renderEdit(data)
            })
        },
        
        detail: (TOKEN, id) => {
            _fetchAdjustment(TOKEN, id, data => {
                UI.renderDetail(data)
            })

            _printAll()
            _openDelete('#detail_container')
            _submitDelete(TOKEN, data => {
                location.hash = '#/adjustment'
            })
        }
    }
})(settingController, dtController, adjustmentUI, lookupController)

export default adjustmentController