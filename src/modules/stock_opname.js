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
                                                        <p class="text-muted m-l-5">Jl. Radar Auri No.41,
                                                            <br/> Cisalak Ps, Cimanggis, Depok, Jawa Barat 16452, Indonesia,
                                                            <br/> Hp. 087880729929 / 081280999733,
                                                            <br/> Telp/Fax. 021-29616935</p>
                                                    </address>
                                                </td>
                                                <td class="w-50 text-right">
                                                    <address>
                                                        <p class="m-t-30"><b><i class="fa fa-calendar"></i> Date :</b> ${data.date}</p>
                                                        <p><b><i class="mdi mdi-album"></i> Stock Opname No :</b> ${_replaceNull(data.so_number)}</p>
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
                                                            <th class="text-right">Qty Difference</th>
                                                            <th class="text-right">Total Difference</th>
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
                                                            <p>Actual Qty : <b>Rp. ${SET.realCurrency(data.total_actual_qty)}</b></p>
                                                            <p>System Qty : <b>Rp. ${SET.realCurrency(data.total_system_qty)}</b></p>
                                                            <hr>
                                                            <p><h4>Qty Difference : <b>Rp. ${SET.realCurrency(parseFloat(data.total_actual_qty - data.total_system_qty))}</b></h4></p>
                                                        </div>
                                                        <div class="m-t-40 text-right">
                                                            <p>Actual Amount : <b>Rp. ${SET.realCurrency(data.total_actual_amount)}</b></p>
                                                            <p>System Amount : <b>Rp. ${SET.realCurrency(data.total_system_amount)}</b></p>
                                                            <hr>
                                                            <p><h4>Amount Difference : <b>Rp. ${SET.realCurrency(parseFloat(data.total_actual_amount - data.total_system_amount))}</b></h4></p>
                                                        </div>
                                                        <div class="m-t-40 text-right">
                                                            <p><h4>Shrinkage : <b>${SET.realCurrency(parseFloat(((data.total_actual_amount - data.total_system_amount) / data.total_system_amount) * 100))} %</b></h4></p>
                                                        </div>
                                                    </td>
                                                </tr>
                                            </table>
                                        </div>
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
                            <input type="number"  min="0" value="0" name="unit_price[${count}]" id="unit_price_${count}" data-id="${count}" class="form-control unit_price">
                        </div>
                    </td>
                    <td>
                        <div class="input-group mb-3">
                            <input type="number"  min="0" value="0" name="actual_qty[${count}]" id="actual_qty_${count}" data-id="${count}" class="form-control actual_qty" required>
                            <div class="input-group-prepend">
                                <input type="hidden" name="unit[${count}]" id="unit_${count}" data-id="${count}" class="form-control">
                                <span class="input-group-text" id="unit_text_${count}" data-id="${count}">-</span>
                            </div>
                        </div>
                    </td>
                    <td>
                        <div class="input-group mb-3">
                            <div class="input-group-prepend">
                                <span class="input-group-text" id="basic-addon1">Rp. </span>
                            </div>
                            <input type="number" min="0" value="0" name="actual_total[${count}]" id="actual_total_${count}" data-id="${count}" class="form-control actual_total">
                        </div>
                    </td>
                    <td>
                        <div class="form-group">
                            <textarea name="note[0]" id="note_0" data-id="0" rows="1" class="form-control"></textarea>
                        </div>
                    </td>
                    <td>
                        <input type="hidden" name="system_qty[${count}]" id="system_qty_${count}" data-id="${count}" class="system_qty" value="0">
                        <input type="hidden" name="system_total[${count}]" id="system_total_${count}" data-id="${count}" class="system_total" value="0">
                        <button class="btn btn-danger btn-md btn-remove" type="button" data-id="${count}" data-remove="true"><i class="fa fa-times"></i></button>
                    </td>
                </tr>
            `

            $('#t_add_products tbody').append(html)

            $('#product_id_' + count).select2({
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
                                unit: v.unit === null ? null : v.unit.unit_name,
                                stock: parseFloat(v.sum_adjustment) + parseFloat(v.sum_purchase) + parseFloat(v.sum_purchase_return) + parseFloat(v.sum_selling) + parseFloat(v.sum_selling_return)
                            }

                            filtered.push(obj)
                        })

                        return {
                            results: filtered
                        };
                    }
                }
            })

            $('#product_id_' + count).on('select2:open', () => {
                $(".select2-results:not(:has(a))").prepend('<a href="javascript:void(0)" class="btn_add_product" style="padding: 6px;height: 20px;display: inline-table;">Create new item</a>');
            })
        }
    }
})(settingController)

const stockOpnameController = ((SET, DT, UI) => {

    /* -------------------- ADD ACTION ----------------- */
    const _addRow = TOKEN => {
        $('.btn_add_row').click(function () {
            UI.renderRow(TOKEN)
        })
    }

    const _removeRow = () => {
        $('#t_add_products').on('click', '.btn-remove', function () {
            let id = $(this).data('id')
            let remove = $(this).data('remove')

            if (remove === true && id) {
                $('#row_' + id).remove();
                _calculateAll()
            }
        })
    }

    const _onChangeProduct = () => {
        $('#t_add_products').on('select2:select', '.product_id', function (e) {
            let data = e.params.data
            let id = $(this).data('id')

            $(`#description_${id}`).val(data.text)
            $(`#unit_price_${id}`).val(data.price).trigger('keyup')
            $(`#unit_${id}`).val(data.unit)
            $(`#unit_text_${id}`).text(data.unit)
            
            let system_total = data.price * data.stock;
            $(`#system_qty_${id}`).val(data.stock)
            $(`#system_total_${id}`).val(system_total)

            _calculateAll()
        });
    }

    const _onKeyupUnitPrice = () => {
        $('#t_add_products').on('keyup', '.unit_price', function () {
            let id = $(this).data('id')
            let thisVal = $(this).val()
            
            let actual_qty = $('#actual_qty_' + id).val()
            let system_qty = $('#system_qty_' + id).val()
            let actual_total = parseFloat(thisVal) * parseFloat(actual_qty)
            let system_total = parseFloat(thisVal) * parseFloat(system_qty)

            $('#actual_total_' + id).val(actual_total)
            $('#system_total_' + id).val(system_total)

            _calculateAll()
        });
    }

    const _onKeyupQty = () => {
        $('#t_add_products').on('keyup', '.actual_qty', function () {
            let id = $(this).data('id')
            let thisVal = $(this).val()
            let unit_price = $('#unit_price_' + id).val()
            let actual_total = parseFloat(unit_price) * parseFloat(thisVal)

            $('#actual_total_' + id).val(actual_total)

            _calculateAll()
        });
    }

    const _onKeyupTotal = () => {
        $('#t_add_products').on('keyup', '.actual_total', function (event, state) {
            _calculateAll()
        })
    }

    const _calculateAll = () => {
        let sum_actual_qty = 0
        let sum_actual_total = 0

        $('.actual_qty').each(function () {
            let total = $(this).val();

            if (total !== '') {
                sum_actual_qty += parseFloat(total)
            }
        })

        $('.actual_total').each(function () {
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
                so_number: 'required',
                date: 'required',
            },
            submitHandler: form => {
                $.ajax({
                    url: `${SET.apiURL()}stock_opnames`,
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

    /* -------------------- FETCH DATA ACTION ----------------- */
    const _fetchSupplier = (TOKEN, success, error) => {
        $.ajax({
            url: `${SET.apiURL()}suppliers`,
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

                _fetchProduct(TOKEN, data => {
                    let filtered = [];

                    data.filter(v => {
                        let obj = {
                            id: v.id,
                            text: v.product_name,
                            price: v.purchase_price,
                            unit: v.unit === null ? null : v.unit.unit_name
                        }

                        filtered.push(obj)
                    })

                    UI.renderSelect2(adjustment.products, filtered)

                    _addRow(filtered)
                    _onChangeProduct()
                    _removeRow()

                }, error => {
                    $('.product_id').select2({
                        data: []
                    });
                })

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

            console.log('Purchase Controller is running...')

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
                // language: SET.dtLanguage(),
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
                            return `${SET.realCurrency(parseFloat(((row.total_actual_amount - row.total_system_amount) / row.total_system_amount) * 100))} %`
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
                                            <a class="dropdown-item" href="javascript:void(0)" data-id="${row.id}" data-name="${row.so_number}"><i class="fa fa-check"></i> Validate</a>
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
        },
        add: TOKEN => {
            console.log('Add Adjustment Controller is running...')

            UI.resetCount()

            $('.dropify').dropify();

            $('.product_id').select2({
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
                                unit: v.unit === null ? null : v.unit.unit_name,
                                stock: parseFloat(v.sum_adjustment) + parseFloat(v.sum_purchase) + parseFloat(v.sum_purchase_return) + parseFloat(v.sum_selling) + parseFloat(v.sum_selling_return)

                            }

                            filtered.push(obj)
                        })

                        return {
                            results: filtered
                        };
                    }

                }
            });

            $('#contact_id').on('select2:open', () => {
                $(".select2-results:not(:has(a))").prepend('<a href="javascript:void(0)" class="btn_add_contact" style="padding: 6px;height: 20px;display: inline-table;">Create new item</a>');
            })

            $('.product_id').on('select2:open', () => {
                $(".select2-results:not(:has(a))").prepend('<a href="javascript:void(0)" class="btn_add_product" style="padding: 6px;height: 20px;display: inline-table;">Create new item</a>');
            })

            _addRow(TOKEN)
            _removeRow()
            _onChangeProduct()
            _onKeyupUnitPrice()
            _onKeyupQty()
            _onKeyupTotal()

            _submitAdd(TOKEN)

        },
        edit: (TOKEN, id) => {
            console.log('Edit Customer Controller is running...')

            UI.resetCount()

            _fetchAdjustment(TOKEN, id, data => {
                _editObserver(TOKEN, id, data)
                UI.renderEdit(data)
            })
        },
        detail: (TOKEN, id) => {
            console.log('Detail Adjustment Controller is running...')

            _fetcStockOpname(TOKEN, id, data => {
                UI.renderDetail(data)
            })

            _printAll()
            _openDelete('#detail_container')
            _submitDelete(TOKEN, data => {
                location.hash = '#/stock_opname'
            })
        }
    }
})(settingController, dtController, stockOpnameUI)

export default stockOpnameController