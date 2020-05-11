const purchasePaymentUI = ((SET) => {
    return {
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
                                        <h3><b>PURCHASE PAYMENT</b> <span class="pull-right">#${data.payment_number}</span></h3>
                                        <hr>
                                        <div class="row">
                                            <table class="w-100">
                                                <tr>
                                                    <td class="w-50">
                                                        <address>
                                                            <img src="${SET.baseURL()}assets/images/logo-full-black.png" style="width: 50%" class="mb-3" />
                                                            <p class="text-muted m-l-5">Jl. Radar Auri No.2,
                                                                <br/> Cisalak Ps, Cimanggis, Depok, Jawa Barat 16452, Indonesia,
                                                                <br/> Hp. 087880729929 / 081280999733,
                                                                <br/> Telp/Fax. 021-29616935</p>
                                                        </address>
                                                    </td>
                                                    <td class="w-50 text-right">
                                                        <address>
                                                            <h3>To</h3>
                                                            <h4 class="font-bold"><a href="#/supplier/${data.contact.id}">${data.contact.contact_name}</a></h4>
                                                            <p class="text-muted m-l-30">${SET.filterNull(data.purchase !== null ? data.purchase.address : data.contact.address)},
                                                            <br> ${SET.filterNull(data.purchase !== null ? data.purchase.email : data.contact.email)}</p>

                                                            <p class="m-t-30"><b><i class="fa fa-calendar"></i> Date :</b> ${data.date}</p>
                                                            <p><b><i class="mdi mdi-album"></i> Payment No :</b> ${SET.replaceNull(data.payment_number)}</p>
                                                            <p><b><i class="ti-wallet"></i> Type payment :</b> ${SET.replaceNull(data.type)}</p>
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
                                                                <th>Purchase</th>
                                                                <th class="text-right">Amount</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            <tr>
                                                                <td class="text-center">1</td>
                                                                <td>${data.purchase !== null ? `<a href="#/purchase/${data.purchase.id}">${data.purchase.purchase_number}</a>` : `Pembelian`}</td>
                                                                <td class="text-right"> Rp. ${SET.positiveCurrency(data.amount)} </td>
                                                            </tr>
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
                                                                <hr>
                                                                <h3><b>Grand Total :</b> Rp. ${SET.positiveCurrency(parseFloat(data.amount))}</h3>
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
                                            <a class="btn btn-success" href="#/purchase_payment/edit/${data.id}"><i class="fa fa-edit"></i> Edit </a>
                                            <button class="btn btn-danger btn-delete" data-id="${data.id}" data-name="${data.payment_number}" type="button"><i class="fa fa-times"></i> Delete </button>
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
                                <embed class="w-100" src="${SET.apiURL()}purchase_payments/file/${data.attachment}">
                            `}
                        </div>
                    </div>
                `

            
            $('#main_content').html(html)
        },
        
        renderFormAdd: data => {
            let bills = parseFloat(data.grand_total + data.total_ppn + data.total_discount + data.total_return + data.total_ppn_return + data.total_return_discount);
            let html;

            if(SET.positiveNumber(data.total_payment) === bills){
                html = `
                    <div class="card" id="">
                        <div class="card-body">
                            <div class="text-center">
                                <i class="fa fa-check fa-5x mb-3"></i>
                                <h1>Purchase has been paid</h1>
                                <h4>Please back</h4>
                            </div>
                        </div>
                    </div>
                `
            } else {
                html = `
                    <form id="form_add">
                        <div class="row">
                            <div class="col-md-9 col-lg-9">
                                <div class="card">
                                    <div class="card-header bg-info">
                                        <h5 class="m-b-0 text-white">Form Payment</h5>
                                    </div>
                                    <div class="card-body">
                                        <div class="row">
                                            <div class="col-md-4">
                                                <div class="form-group">
                                                    <label for="picture">Attachment</label>
                                                    <input type="file" class="dropify" name="attachment" id="attachment">
                                                </div>
                                                <div class="form-group">
                                                    <label>Date</label>
                                                    <input type="date" name="date" id="date" class="form-control">
                                                </div>
                                                <div class="form-group">
                                                    <label>Memo</label>
                                                    <textarea name="memo" id="memo" class="form-control"></textarea>
                                                </div>
                                            </div>
                                            <div class="col-md-8">
                                                <div class="form-group">
                                                    <label>Payment No.</label>
                                                    <input type="text" name="payment_number" id="payment_number" class="form-control">
                                                </div>
                                                
                                                <div class="form-group">
                                                    <label>Type</label>
                                                    <select name="type" id="type" class="form-control">
                                                        <option value="Cash">Cash</option>
                                                        <option value="Transfer">Transfer</option>
                                                        <option value="Cek/Giro">Cek/Giro</option>
                                                        <option value="Kartu Kredit">Kartu Kredit</option>
                                                    </select>
                                                </div>

                                                <div class="form-group">
                                                    <label>Amount</label>
                                                    <div class="input-group mb-3">
                                                        <div class="input-group-prepend">
                                                            <span class="input-group-text" id="basic-addon1">Rp. </span>
                                                        </div>
                                                        <input type="number"  min="0" max="${parseFloat(data.total_payment + bills)}" value="0" name="amount" id="amount" class="form-control amount">
                                                    </div>
                                                </div>
                                                
                                                <div class="form-group">
                                                    <label>Description</label>
                                                    <textarea name="description" id="description" class="form-control" rows="6"></textarea>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="col-md-3 col-lg-3">
                                <div class="card">
                                    <div class="card-body">
                                        <h5 class="card-title">PURCHASE SUMMARY</h5>
                                        <hr>
                                        <small>Total Price</small>
                                        <h2>Rp. ${SET.realCurrency(bills)}</h2>
                                        <hr>
                                        <small>Bills</small>
                                        <h2>Rp. ${SET.realCurrency(bills + data.total_payment)}</h2>
                                    </div>
                                </div>
                                <div class="card">
                                    <div class="card-body">
                                        <h5 class="card-title">INFORMATION</h5>
                                        <hr>
                                        <h4><i class="mdi mdi-album"></i> <a href="#/purchase/${data.id}">${data.purchase_number}</a></h4> <small>${data.contact.contact_name}</small>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <input type="hidden" name="contact_id" id="contact_id" value="${data.contact.id}">
                                    <input type="hidden" name="purchase_id" id="purchase_id" value="${data.id}">
                                    <button class="btn btn-info btn-block" type="submit">Save</button>
                                    <a href="#/purchase/${data.id}" class="btn btn-secondary btn-outline btn-block">Cancel</a>
                                </div>
                            </div>
                        </div>
                    </form>
                `

            }

            
            $('#main_content').html(html)
        },

        renderFormEdit: data => {
            let type = ['Cash', 'Transfer', 'Cek/Giro', 'Kartu Kredit'];

            let html = `
                <form id="form_edit">
                    <div class="row">
                        <div class="col-md-9 col-lg-9">
                            <div class="card">
                                <div class="card-header bg-success">
                                    <h5 class="m-b-0 text-white">Form Payment</h5>
                                </div>
                                <div class="card-body">
                                    <div class="row">
                                        <div class="col-md-4">
                                            <div class="form-group">
                                                <label for="picture">Attachment</label>
                                                <input type="file" class="dropify" name="attachment" id="attachment" ${data.attachment === null ? '' : `data-default-file="${SET.apiURL()}purchase_payments/file/${data.attachment}`}">
                                            </div>
                                            <div class="form-group">
                                                <label>Date</label>
                                                <input type="date" name="date" id="date" class="form-control" value="${data.date}">
                                            </div>
                                            <div class="form-group">
                                                <label>Memo</label>
                                                <textarea name="memo" id="memo" class="form-control">${SET.filterNull(data.memo)}</textarea>
                                            </div>
                                        </div>
                                        <div class="col-md-8">
                                            <div class="form-group">
                                                <label>Payment No.</label>
                                                <input type="text" readonly placeholder="[ AUTO ]" value="${data.payment_number}" name="payment_number" id="payment_number" class="form-control">
                                            </div>

                                            <div class="form-group">
                                                <label>Type</label>
                                                <select name="type" id="type" class="form-control">
                                                    ${type.map(v => {
                                                        return `<option value="${v}" ${v === data.type ? 'selected' : ''}>${v}</option>`
                                                    }).join('')}
                                                </select>
                                            </div>

                                            <div class="form-group">
                                                <label>Amount</label>
                                                <div class="input-group mb-3">
                                                    <div class="input-group-prepend">
                                                        <span class="input-group-text" id="basic-addon1">Rp. </span>
                                                    </div>
                                                    <input type="number"  min="0" value="${SET.positiveNumber(data.amount)}" name="amount" id="amount" class="form-control amount">
                                                </div>
                                            </div>
                                            
                                            <div class="form-group">
                                                <label>Description</label>
                                                <textarea name="description" id="description" class="form-control" rows="6">${SET.filterNull(data.description)}</textarea>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="col-md-3 col-lg-3">
                            <div class="card">
                                <div class="card-body">
                                    <div class="form-group">
                                        <label>Supplier</label>
                                        <select class="form-control" id="contact_id" name="contact_id">
                                            <option value="" disabled="" selected="">-- Choose Supplier --</option>
                                        </select>
                                    </div>
                                    <div class="form-group">
                                        <label>Purchase</label>
                                        <select class="form-control" id="purchase_id" name="purchase_id">
                                            <option value="" disabled="" selected="">-- Choose Purchase --</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div class="form-group">
                                <input type="hidden" name="_method" id="_method" value="put">
                                <button class="btn btn-success btn-block" type="submit">Update</button>
                                <a href="#/purchase_payment" class="btn btn-secondary btn-outline btn-block">Cancel</a>
                            </div>
                        </div>
                    </div>
                </form>
            `

            $('#main_content').html(html);
        }
    }
})(settingController)

const purchasePaymentController = ((SET, DT, UI, LU) => {

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
                    url: `${SET.apiURL()}purchase_payments/${id}`,
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

    /* -------------------- DETAIL ACTION ----------------- */
    const _fetchPurchasePayment = (TOKEN, id, callback) => {
        $.ajax({
            url: `${SET.apiURL()}purchase_payments/${id}`,
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

    const _fetchPurchase = (TOKEN, id, callback) => {
        $.ajax({
            url: `${SET.apiURL()}purchases/${id}`,
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

    const _addObserver = (TOKEN, data) => {

        MutationObserver = window.MutationObserver || window.WebKitMutationObserver;

        let container = document.querySelector("#main_content")

        let observer = new MutationObserver(function (mutations, observer) {
            if (container.contains($('#form_add')[0])) {
                $('.dropify').dropify();

                _submitAdd(TOKEN)
            }


            observer.disconnect();
        });

        observer.observe(container, {
            subtree: true,
            attributes: true,
            childList: true,
        });
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
                payment_number: 'required',
                type: 'required',
                date: 'required',
                amount: 'required',
            },
            submitHandler: form => {
                $.ajax({
                    url: `${SET.apiURL()}purchase_payments`,
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
                        location.hash = `#/purchase_payment/${res.results.id}`
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

    const _onChangeContact = TOKEN => {
        $('#contact_id').on('select2:select', function (e) {
            let data = e.params.data

            $('#purchase_id').select2({
                ajax: {
                    url: `${SET.apiURL()}purchases`,
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
                            supplier: data.id
                        }

                        return query;
                    },
                    processResults: function (data) {
                        let filtered = [];

                        data.results.map(v => {
                            let obj = {
                                id: v.id,
                                text: v.purchase_number,
                            }

                            filtered.push(obj)
                        })

                        return {
                            results: filtered
                        };
                    }
                }
            })

            $("#purchase_id").val('').trigger('change');
            $('#purchase_id').removeAttr('disabled')
        });
    }

    const _editObserver = (TOKEN, id, payments) => {
        MutationObserver = window.MutationObserver || window.WebKitMutationObserver;

        let container = document.querySelector("#edit_container")

        let observer = new MutationObserver(function (mutations, observer) {
            if (container.contains($('#form_edit')[0])) {

                $('.dropify').dropify();

                $('#contact_id').select2({
                    ajax: {
                        url: `${SET.apiURL()}suppliers`,
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
                                type: 'Supplier'
                            }

                            return query;
                        },
                        processResults: function (data) {
                            let filtered = [];

                            data.results.map(v => {
                                let obj = {
                                    id: v.id,
                                    text: v.contact_name,
                                    email: v.email,
                                    address: v.address
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
                    $(".select2-results:not(:has(a))").prepend('<a href="javascript:void(0)" class="select2_add_customer" style="padding: 6px;height: 20px;display: inline-table;">Create new item</a>');
                })

                let option = new Option(payments.contact.contact_name, payments.contact.id, true, true);
                $('#contact_id').append(option).trigger('change');

                $('#contact_id').trigger({
                    type: 'select2:select',
                    params: {
                        data: {
                            id: payments.contact.id,
                            text: payments.contact.contact_name,
                            email: payments.contact.email,
                            address: payments.contact.address
                        }
                    }
                });

                $('#purchase_id').select2({
                    ajax: {
                        url: `${SET.apiURL()}purchases`,
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
                                supplier: payments.contact.id
                            }

                            return query;
                        },
                        processResults: function (data) {
                            let filtered = [];

                            data.results.map(v => {
                                let obj = {
                                    id: v.id,
                                    text: v.purchase_number,
                                }

                                filtered.push(obj)
                            })

                            return {
                                results: filtered
                            };
                        }
                    }
                })

                if (payments.purchase !== null) {
                    let option2 = new Option(payments.purchase.purchase_number, payments.purchase.id, true, true);
                    $('#purchase_id').append(option2).trigger('change');

                    $('#purchase_id').trigger({
                        type: 'select2:select',
                        params: {
                            data: {
                                id: payments.purchase.id,
                                text: payments.purchase.purchase_number
                            }
                        }
                    });
                }

                LU.lookupCustomer(TOKEN)

                _onChangeContact(TOKEN)

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
                contact_id: 'required',
                payment_number: 'required',
                date: 'required',
            },
            submitHandler: form => {
                $.ajax({
                    url: `${SET.apiURL()}purchase_payments/${id}`,
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
                        location.hash = `#/purchase_payment/${res.results.id}`
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

    return {
        data: TOKEN => {
            const table = $('#t_payments').DataTable({
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
                                    filename: 'DATA_PURCHASE_PAYMENT',
                                    title: 'Data Purchase Payment',
                                },
                                {
                                    extend: 'excelHtml5',
                                    text: 'Excel',
                                    exportOptions: {
                                        columns: [0, 1, 2, 3]
                                    },
                                    filename: 'DATA_PURCHASE_PAYMENT',
                                    title: 'Data Purchase Payment'
                                },
                                {
                                    extend: 'csvHtml5',
                                    text: 'CSV',
                                    exportOptions: {
                                        columns: [0, 1, 2, 3]
                                    },
                                    filename: 'DATA_PURCHASE_PAYMENT',
                                    title: 'Data Purchase Payment'
                                },
                                {
                                    extend: 'print',
                                    text: 'Print',
                                    exportOptions: {
                                        columns: [0, 1, 2, 3]
                                    },
                                    filename: 'DATA_PURCHASE_PAYMENT',
                                    title: '<h4>Data Purchase Payment</h4>'
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
                                location.hash = '#/purchase_payment/add'
                            },
                            titleAttr: 'Add'
                        },
                    ]
                },
                ajax: {
                    url: `${SET.apiURL()}purchase_payments`,
                    type: 'GET',
                    dataType: 'JSON',
                    beforeSend: xhr => {
                        xhr.setRequestHeader("Content-Type", 'application/json')
                        xhr.setRequestHeader("Authorization", "Bearer " + TOKEN)
                    },
                    dataSrc: res => {
                        let total = res.results.reduce((a, b) => a + b.amount, 0);

                        $('#count_purchase_payment').text(SET.positiveCurrency(res.results.length))
                        $('#sum_purchase_payment').text(`Rp. ${SET.positiveCurrency(total)}`)

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
                                <a href="#/purchase_payment/${row.id}">${row.payment_number}</a>
                            `;
                        }
                    },
                    {
                        data: "contact",
                        render: function (data, type, row) {
                            return `
                                <a href="#/supplier/${row.contact.id}">${row.contact.contact_name}</a>
                                ${row.purchase !== null ? `<div><small><a href="#/purchase/${row.purchase.id}">${row.purchase.purchase_number}</a></small></div>` : '<div>Pembelian</div>'}
                            `;
                        }
                    },
                    {
                        data: "date"
                    },
                    {
                        data: "grand_total",
                        render: function (data, type, row) {
                            return `
                                Rp. ${SET.positiveCurrency(row.amount)}
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
                                        <a class="dropdown-item btn-delete" href="javascript:void(0)" id="btn_delete" data-id="${row.id}" data-name="${row.payment_number}"><i class="fa fa-trash"></i> Delete</a>
                                        <div class="dropdown-divider"></div>
                                        <a class="dropdown-item" href="#/purchase_payment/edit/${row.id}"><i class="fa fa-edit"></i> Edit</a>
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

                    let filtered_sum_total = filtered.reduce((a, b) => a + b.amount, 0);

                    let sum_total = data.reduce((a, b) => a + b.amount, 0);

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

            _openDelete('#t_payments')
            _submitDelete(TOKEN, data => {
                table.ajax.reload()
                $('#modal_delete').modal('hide')
            })
        },

        detail: (TOKEN, id) => {

            _fetchPurchasePayment(TOKEN, id, data => {
                UI.renderDetail(data)
            })

            _printAll()
            _openDelete('#detail_container')
            _submitDelete(TOKEN, data => {
                location.hash = '#/purchase_payment'
            })
        },

        addWithPurchase: (TOKEN, id) => {
            _fetchPurchase(TOKEN, id, data => {
                _addObserver(TOKEN, data)
                UI.renderFormAdd(data)
            })
        },

        add: TOKEN => {
            $('.dropify').dropify()

            $('#contact_id').select2({
                ajax: {
                    url: `${SET.apiURL()}suppliers`,
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
                            type: 'Supplier'
                        }

                        return query;
                    },
                    processResults: function (data) {
                        let filtered = [];

                        data.results.map(v => {
                            let obj = {
                                id: v.id,
                                text: v.contact_name,
                                email: v.email,
                                address: v.address
                            }

                            filtered.push(obj)
                        })

                        return {
                            results: filtered
                        };
                    }

                }
            })

            $('#purchase_id').select2()

            $('#contact_id').on('select2:open', () => {
                $(".select2-results:not(:has(a))").prepend('<a href="javascript:void(0)" class="select2_add_supplier" style="padding: 6px;height: 20px;display: inline-table;">Create new item</a>');
            })


            LU.lookupSupplier(TOKEN)

            _onChangeContact(TOKEN)

            _submitAdd(TOKEN)
        },

        edit: (TOKEN, id) => {
            _fetchPurchasePayment(TOKEN, id, data => {
                _editObserver(TOKEN, id, data);
                UI.renderFormEdit(data)
            })
        }
    }
})(settingController, dtController, purchasePaymentUI, lookupController)

export default purchasePaymentController