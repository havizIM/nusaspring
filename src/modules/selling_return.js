const sellingReturnUI = ((SET) => {
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

        renderSelect2: (adjustment, product) => {
            adjustment.forEach(v => {
                $(`.select2_${v.product_id}`).select2({ data: product }).val(v.product_id).trigger('change');
            })
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
                                    <h3><b>SELLING RETURN</b> <span class="pull-right">#${data.return_number}</span></h3>
                                    <hr>
                                    <div class="row">
                                        <table class="w-100">
                                            <tr>
                                                <td class="w-50">
                                                    <address>
                                                        <img src="${SET.baseURL()}assets/images/logo-full-black.png" style="width: 50%" class="mb-3" />
                                                        <p class="text-muted m-l-5">Jl. Tiga Berlian Blok Karizma No.41,
                                                            <br/> Mekarsari, Cimanggis, Depok, Jawa Barat 16452, Indonesia,
                                                            <br/> Hp. 087880729929 / 081280999733,
                                                            <br/> Telp/Fax. 021-29616935</p>
                                                    </address>
                                                </td>
                                                <td class="w-50 text-right">
                                                    <address>
                                                        <h3>From</h3>
                                                        <h4 class="font-bold"><a href="#/customer/${data.selling.contact.id}">${data.selling.contact.contact_name}</a></h4>
                                                        <p class="text-muted m-l-30">${_filterNull(data.selling.address)},
                                                        <br> ${_filterNull(data.selling.email)}</p>

                                                        <p class="m-t-30"><b><i class="fa fa-calendar"></i> Date :</b> ${data.date}</p>
                                                        <p><b><i class="mdi mdi-album"></i> Return No :</b> ${_replaceNull(data.return_number)}</p>
                                                        <p><b><i class="mdi mdi-animation"></i> Selling No :</b> <a href="#/selling/${data.selling.id}">${_replaceNull(data.selling.selling_number)}</a></p>
                                                        <p><b><i class="mdi mdi-animation"></i> Reference No :</b> ${_replaceNull(data.reference_number)}</p>
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
                                                                    <td class="text-right">${Math.abs(v.qty)} ${v.unit}</td>
                                                                    <td class="text-right"> Rp. ${SET.positiveCurrency(v.unit_price)} </td>
                                                                    <td class="text-right"> Rp. ${SET.positiveCurrency(v.total)} </td>
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
                                                        <i>* ${_replaceNull(data.memo)}</i>
                                                    </td>
                                                    <td class="w-50">
                                                        <div class="m-t-30 text-right">
                                                            <p>Sub Total : <b>Rp. ${SET.positiveCurrency(data.grand_total)}</b></p>
                                                            <p>Discount : <b>(Rp. ${SET.positiveCurrency(data.total_discount)})</b></p>
                                                            <p>Total DPP : <b>Rp. ${SET.positiveCurrency(parseFloat(data.grand_total + data.total_discount))}</b></p>
                                                            <p>Vat (10%) : <b>Rp. ${SET.positiveCurrency(parseFloat(data.total_ppn))}</b></p>
                                                            <hr>
                                                            <h3><b>Grand Total :</b> Rp. ${SET.positiveCurrency(parseFloat(data.grand_total) + parseFloat(data.total_ppn) + parseFloat(data.total_discount))}</h3>
                                                        </div>
                                                    </td>
                                                </tr>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                                <div class="card-body">
                                    <div class="text-right">
                                        <a class="btn btn-success" href="#/selling_return/edit/${data.id}"><i class="fa fa-edit"></i> Edit </a>
                                        <button class="btn btn-danger btn-delete" data-id="${data.id}" data-name="${data.selling_number}" type="button"><i class="fa fa-times"></i> Delete </button>
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
                            <embed class="w-100" src="${SET.apiURL()}selling_returns/file/${data.attachment}">
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
                <tr id="row_${count}">
                    <td>
                        <select name="product_id[${count}]" id="product_id_${count}" data-id="${count}" class="form-control product_id" required>
                            <option value="" disabled="" selected="">-- Choose Product --</option>
                        </select>
                        <input type="hidden" name="description[${count}]" id="description_${count}" data-id="${count}">
                    </td>
                    <td>
                        <input type="number" name="unit_price[${count}]" id="unit_price_${count}" data-id="${count}" class="form-control input-unit-price">
                    </td>
                    <td>
                        <input type="number" name="qty[${count}]" id="qty_${count}" data-id="${count}" class="form-control input-qty" required>
                    </td>
                    <td>
                        <input type="text" name="unit[${count}]" id="unit_${count}" data-id="${count}" class="form-control" readonly>
                    </td>
                    <td>
                        <input type="number" name="total[${count}]" id="total_${count}" data-id="${count}" class="form-control input-total" readonly>
                    </td>
                    <td>
                        <input type="number" name="ppn[${count}]" id="ppn_${count}" data-id="${count}" class="form-control input-ppn">
                    </td>
                    <td>
                        <button class="btn btn-danger btn-md btn-remove" type="button" id="btn_remove_row" data-id="${count}" data-remove="true"><i class="fa fa-times"></i></button>
                    </td>
                </tr>
            `

            $('#t_add_products tbody').append(html)

            $('.product_id').select2({
                data: data
            });
        }
    }
})(settingController)

const sellingReturnController = ((SET, DT, UI) => {

    /* -------------------- ADD ACTION ----------------- */
    const _addRow = data => {
        $('#btn_add_row').click(function () {
            UI.renderRow(data)
        })
    }

    const _removeRow = () => {
        $('#t_add_products').on('click', '.btn-remove', function () {
            let id = $(this).data('id')
            let remove = $(this).data('remove')

            if (remove === true && id) {
                $('#row_' + id).remove();
            }
        })
    }

    const _onChangeCustomer = () => {
        $('#contact_id').on('select2:select', function (e) {
            let data = e.params.data

            $(`#email`).val(data.email)
            $(`#address`).val(data.address)
        });
    }

    const _onChangeProduct = () => {
        $('#t_add_products').on('select2:select', '.product_id', function (e) {
            let data = e.params.data
            let id = $(this).data('id')

            $(`#description_${id}`).val(data.text)
            $(`#unit_price_${id}`).val(data.price)
            $(`#unit_${id}`).val(data.unit)

            if ($('#ppn').is(':checked')) {
                $('.input-ppn').each(function () {
                    let id = $(this).data('id')
                    let unit_price = $('#unit_price_' + id).val()
                    let qty = $('#qty_' + id).val()

                    if (unit_price !== null && qty !== null) {
                        let ppn = (parseFloat(unit_price) * parseFloat(qty)) * 10 / 100;
                        let total = parseFloat(unit_price) * parseFloat(qty);

                        $('#ppn_' + id).val(ppn)
                        $('#total_' + id).val(total)
                    }

                })
            } else {
                let unit_price = $('#unit_price_' + id).val()
                let qty = $('#qty_' + id).val()
                let total = parseFloat(unit_price) * parseFloat(qty);

                if (unit_price !== '' && qty !== '') {
                    $('#total_' + id).val(total)
                }

                $('.input-ppn').val('');
            }


            _getSubTotal()

        });

    }

    const _onChangePpn = () => {
        $('#ppn').on('change', function () {
            if ($(this).is(':checked')) {
                $('.input-ppn').each(function () {
                    let id = $(this).data('id')
                    let unit_price = $('#unit_price_' + id).val()
                    let qty = $('#qty_' + id).val()

                    if (unit_price !== '' && qty !== '') {
                        let ppn = (parseFloat(unit_price) * parseFloat(qty)) * 10 / 100;
                        $('#ppn_' + id).val(ppn)
                    }

                })
            } else {
                $('.input-ppn').each(function () {
                    $('.input-ppn').val('');
                })
            }

            _getSubTotal()
        });
    }

    const _onKeyupQty = () => {
        $('#t_add_products').on('keyup', '.input-qty', function () {
            let id = $(this).data('id')
            let unit_price = $('#unit_price_' + id).val()
            let qty = $('#qty_' + id).val()

            if ($('#ppn').is(':checked')) {
                $('.input-ppn').each(function () {
                    if (unit_price !== '' && qty !== '') {
                        let ppn = (parseFloat(unit_price) * parseFloat(qty)) * 10 / 100;
                        let total = parseFloat(unit_price) * parseFloat(qty);

                        $('#ppn_' + id).val(ppn)
                        $('#total_' + id).val(total)
                    }

                })
            } else {
                $('.input-ppn').each(function () {
                    let total = parseFloat(unit_price) * parseFloat(qty);

                    $('.input-ppn').val('');
                    $('#total_' + id).val(total)
                })
            }

            _getSubTotal()
        });
    }

    const _onKeyupUnitPrice = () => {
        $('#t_add_products').on('keyup', '.input-unit-price', function () {
            let id = $(this).data('id')
            let unit_price = $(this).val()
            let qty = $('#qty_' + id).val()

            if ($('#ppn').is(':checked')) {
                $('.input-ppn').each(function () {
                    if (unit_price !== '' && qty !== '') {
                        let ppn = (parseFloat(unit_price) * parseFloat(qty)) * 10 / 100;
                        let total = parseFloat(unit_price) * parseFloat(qty);

                        $('#ppn_' + id).val(ppn)
                        $('#total_' + id).val(total)
                    }

                })
            } else {
                $('.input-ppn').each(function () {
                    let total = parseFloat(unit_price) * parseFloat(qty);

                    $('.input-ppn').val('');
                    $('#total_' + id).val(total)
                })
            }

            _getSubTotal()
        });
    }

    const _onKeyupPercent = () => {
        $('#discount_percent').on('keyup', function () {
            let percent = $(this).val()
            let sub_total = $('#sub_total').val()

            if (sub_total !== '') {
                $('#total_discount').val(parseFloat((sub_total * percent) / 100)).trigger('keyup')
            }
        })
    }

    const _onKeyupDiscount = () => {
        $('#total_discount').on('keyup', function () {
            _getSubTotal()
        })
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
                contact_id: 'required',
                return_number: 'required',
                date: 'required',
            },
            submitHandler: form => {
                $.ajax({
                    url: `${SET.apiURL()}customer_returns`,
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
                        location.hash = `#/customer_return/${res.results.id}`
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

    const _getSubTotal = () => {
        var sub_total = 0;
        var total_ppn = 0;
        let discount = $('#total_discount').val();

        if (discount === '') {
            discount = 0;
        }

        $('.input-total').each(function () {
            let total = $(this).val();

            if (total !== '') {
                sub_total += parseFloat(total)
            }

        })

        $('.input-ppn').each(function () {
            let ppn = $(this).val();

            if (ppn !== '') {
                total_ppn += parseFloat(ppn)
            }

        })

        $('#sub_total').val(sub_total)
        $('#total_ppn').val(total_ppn)
        $('#grand_total').val(parseFloat((sub_total + total_ppn) - parseFloat(discount)))
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
                    url: `${SET.apiURL()}selling_returns/${id}`,
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
    const _fetchCustomer = (TOKEN, success, error) => {
        $.ajax({
            url: `${SET.apiURL()}customers`,
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
                            price: v.selling_price,
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
    const _fetchCustomerReturn = (TOKEN, id, callback) => {
        $.ajax({
            url: `${SET.apiURL()}selling_returns/${id}`,
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
            console.log('Customer Return Controller is running...')

            const table = $('#t_returns').DataTable({
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
                                    filename: 'DATA_CUSTOMER_RETURN',
                                    title: 'Data Customer Return',
                                },
                                {
                                    extend: 'excelHtml5',
                                    text: 'Excel',
                                    exportOptions: {
                                        columns: [0, 1, 2, 3]
                                    },
                                    filename: 'DATA_CUSTOMER_RETURN',
                                    title: 'Data Customer Return'
                                },
                                {
                                    extend: 'csvHtml5',
                                    text: 'CSV',
                                    exportOptions: {
                                        columns: [0, 1, 2, 3]
                                    },
                                    filename: 'DATA_CUSTOMER_RETURN',
                                    title: 'Data Customer Return'
                                },
                                {
                                    extend: 'print',
                                    text: 'Print',
                                    exportOptions: {
                                        columns: [0, 1, 2, 3]
                                    },
                                    filename: 'DATA_CUSTOMER_RETURN',
                                    title: '<h4>Data Customer Return</h4>'
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
                        // {
                        //     text: '<i class="fa fa-plus"></i>',
                        //     action: function (e, dt, node, config) {
                        //         location.hash = '#/customer_return/add'
                        //     },
                        //     titleAttr: 'Add'
                        // },
                        {
                            text: '<i class="fa fa-search"></i>',
                            action: function (e, dt, node, config) {
                                $('#modal_search').modal('show')
                            },
                            titleAttr: 'Search'
                        },
                    ]
                },
                ajax: {
                    url: `${SET.apiURL()}selling_returns`,
                    type: 'GET',
                    dataType: 'JSON',
                    beforeSend: xhr => {
                        xhr.setRequestHeader("Content-Type", 'application/json')
                        xhr.setRequestHeader("Authorization", "Bearer " + TOKEN)
                    },
                    dataSrc: res => {
                        let sum_cust_returns = res.results.reduce((a, b) => a + b.grand_total, 0);
                        let sum_ppn = res.results.reduce((a, b) => a + b.total_ppn, 0);
                        let sum_discount = res.results.reduce((a, b) => a + b.total_discount, 0);

                        let sum_total = parseInt((sum_cust_returns + sum_ppn) + sum_discount)

                        $('#count_cust_returns').text(SET.positiveCurrency(res.results.length))
                        $('#sum_cust_returns').text(`Rp. ${SET.positiveCurrency(sum_total)}`)

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
                                <a href="#/selling_return/${row.id}">${row.return_number}</a>
                            `;
                        }
                    },
                    {
                        data: "contact",
                        render: function (data, type, row) {
                            return `
                                <a href="#/selling/${row.selling.id}">${row.selling.selling_number}</a>
                                <div>${row.selling.contact.contact_name}</div>
                            `;
                        }
                    },
                    {
                        data: "date"
                    },
                    {
                        data: "grand_total",
                        render: function (data, type, row) {
                            let amount = parseInt((row.grand_total + row.total_ppn) + row.total_discount)

                            return `
                                Rp. ${SET.positiveCurrency(amount)}
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
                                        <a class="dropdown-item btn-delete" href="javascript:void(0)" id="btn_delete" data-id="${row.id}" data-name="${row.return_number}"><i class="fa fa-trash"></i> Delete</a>
                                        <div class="dropdown-divider"></div>
                                        <a class="dropdown-item" href="#/selling_return/edit/${row.id}"><i class="fa fa-edit"></i> Edit</a>
                                    </div>
                                </div>
                            `;
                        }
                    }
                ],
                order: [[2, "asc"]]
            })

            DT.dtFilter(table)

            _openDelete('#t_returns')
            _submitDelete(TOKEN, data => {
                table.ajax.reload()
                $('#modal_delete').modal('hide')
            })
        },
        add: TOKEN => {
            console.log('Add Adjustment Controller is running...')

            UI.resetCount()

            $('.dropify').dropify();

            $('.product_id').select2();
            $('#contact_id').select2();

            _fetchProduct(TOKEN, data => {
                let filtered = [];

                data.filter(v => {
                    let obj = {
                        id: v.id,
                        text: v.product_name,
                        price: v.selling_price,
                        unit: v.unit === null ? null : v.unit.unit_name
                    }

                    filtered.push(obj)
                })

                $('.product_id').select2({
                    data: filtered
                });

                _addRow(filtered)
                _onChangeProduct()
                _removeRow()

            }, error => {
                $('.product_id').select2({
                    data: []
                });
            })

            _fetchCustomer(TOKEN, data => {
                let filtered = [];

                data.filter(v => {
                    let obj = {
                        id: v.id,
                        text: v.contact_name,
                        email: v.email,
                        address: v.address
                    }

                    filtered.push(obj)
                })

                $('#contact_id').select2({
                    data: filtered
                });


                _onChangeCustomer()

            }, error => {
                $('#contact_id').select2({
                    data: []
                });
            })

            _onChangePpn()
            _onKeyupQty()
            _onKeyupUnitPrice()
            _onKeyupPercent()
            _onKeyupDiscount()

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

            _fetchCustomerReturn(TOKEN, id, data => {
                UI.renderDetail(data)
            })

            _printAll()
            _openDelete('#detail_container')
            _submitDelete(TOKEN, data => {
                location.hash = '#/customer_return'
            })
        }
    }
})(settingController, dtController, sellingReturnUI)

export default sellingReturnController