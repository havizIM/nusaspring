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
                                                            <p class="text-muted m-l-5">Jl. Tiga Berlian Blok Karizma No.41,
                                                                <br/> Mekarsari, Cimanggis, Depok, Jawa Barat 16452, Indonesia,
                                                                <br/> Hp. 087880729929 / 081280999733,
                                                                <br/> Telp/Fax. 021-29616935</p>
                                                        </address>
                                                    </td>
                                                    <td class="w-50 text-right">
                                                        <address>
                                                            <h3>To</h3>
                                                            <h4 class="font-bold"><a href="#/supplier/${data.purchase.contact.id}">${data.purchase.contact.contact_name}</a></h4>
                                                            <p class="text-muted m-l-30">${SET.filterNull(data.purchase.address)},
                                                            <br> ${SET.filterNull(data.purchase.email)}</p>

                                                            <p class="m-t-30"><b><i class="fa fa-calendar"></i> Date :</b> ${data.date}</p>
                                                            <p><b><i class="mdi mdi-album"></i> Payment No :</b> ${SET.replaceNull(data.payment_number)}</p>
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
                                                                <td><a href="#/purchase/${data.purchase.id}">${data.purchase.purchase_number}</a></td>
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
        }
    }
})(settingController)

const purchasePaymentController = ((SET, DT, UI) => {

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
                            text: '<i class="fa fa-plus"></i>',
                            action: function (e, dt, node, config) {
                                location.hash = '#/purchase_payment/add'
                            },
                            titleAttr: 'Add'
                        },
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
                                <a href="#/purchase/${row.purchase.id}">${row.purchase.purchase_number}</a>
                                <div>${row.purchase.contact.contact_name}</div>
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
                order: [[2, "asc"]]
            })

            DT.dtFilter(table)

            _openDelete('#t_payments')
            _submitDelete(TOKEN, data => {
                table.ajax.reload()
                $('#modal_delete').modal('hide')
            })
        },
        detail: (TOKEN, id) => {
            console.log('Detail Adjustment Controller is running...')

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

            _onChangeContact(TOKEN)
            _submitAdd(TOKEN)
        }
    }
})(settingController, dtController, purchasePaymentUI)

export default purchasePaymentController