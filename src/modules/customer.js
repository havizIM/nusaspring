const customerUI = ((SET) => {
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

    return {
        renderEdit: data => {
            let html = `
                <div class="row">
                    <div class="col-md-12">
                        <div class="row">
                            <div class="col-md-8">
                                <form id="form_edit">
                                    <div class="form-group">
                                        <label for="contact_name">Name</label>
                                        <input type="text" class="form-control" id="contact_name" name="contact_name" value="${_filterNull(data.contact_name)}">
                                    </div>
                                    <div class="form-group">
                                        <label for="pic">Pic</label>
                                        <input type="text" class="form-control" id="pic" name="pic" value="${_filterNull(data.pic)}">
                                    </div>
                                    <div class="form-group row">
                                        <div class="col-md-6">
                                            <label for="phone">Phone</label>
                                            <input type="text" class="form-control" id="phone" name="phone" value="${_filterNull(data.phone)}">
                                        </div>
                                        <div class="col-md-6">
                                            <label for="fax">Fax</label>
                                            <input type="text" class="form-control" id="fax" name="fax" value="${_filterNull(data.fax)}">
                                        </div>
                                    </div>
                                    <div class="form-group row">
                                        <div class="col-md-6">
                                            <label for="handphone">Handphone</label>
                                            <input type="text" class="form-control" id="handphone" name="handphone" value="${_filterNull(data.handphone)}">
                                        </div>
                                        <div class="col-md-6">
                                            <label for="email">Email</label>
                                            <input type="text" class="form-control" id="email" name="email" value="${_filterNull(data.email)}">
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <label for="address">Address</label>
                                        <textarea class="form-control" id="address" name="address">${_filterNull(data.address)}</textarea>
                                    </div>
                                    <div class="form-group">
                                        <label for="npwp">NPWP</label>
                                        <input type="text" class="form-control" id="npwp" name="npwp" value="${_filterNull(data.npwp)}">
                                    </div>
                                    <div class="form-group">
                                        <label for="memo">Memo</label>
                                        <textarea class="form-control" id="memo" name="memo">${_filterNull(data.memo)}</textarea>
                                    </div>
                                    <div class="form-group text-right">
                                        <a class="btn btn-md btn-danger" href="#/customer">Cancel</a>
                                        <button class="btn btn-md btn-success" type="submit">Update</button>
                                    </div>
                                </form>
                            </div>
                            <div class="col-md-4">
                                <img src="${SET.baseURL()}assets/images/edit.svg" class="img-fluid" alt="">
                            </div>
                        </div>
                    </div>
                </div>
            `

            $('#main_content').html(html)
        },

        renderDetail: data => {
            let html = `
                <ul class="nav nav-tabs customtab" role="tablist">
                    <li class="nav-item"> <a class="nav-link active" data-toggle="tab" href="#info" role="tab"><span class="hidden-sm-up"><i class="ti-info"></i></span> <span class="hidden-xs-down">Info</span></a> </li>
                    <li class="nav-item"> <a class="nav-link" data-toggle="tab" href="#selling" role="tab"><span class="hidden-sm-up"><i class="mdi mdi-checkbox-multiple-blank-outline"></i></span> <span class="hidden-xs-down">Selling</span></a> </li>
                    <li class="nav-item"> <a class="nav-link" data-toggle="tab" href="#return" role="tab"><span class="hidden-sm-up"><i class="mdi mdi-keyboard-return"></i></span> <span class="hidden-xs-down">Return</span></a> </li>
                    <li class="nav-item"> <a class="nav-link" data-toggle="tab" href="#payment" role="tab"><span class="hidden-sm-up"><i class="ti-wallet"></i></span> <span class="hidden-xs-down">Payment</span></a> </li>
                </ul>
                <div class="tab-content">

                    <div class="tab-pane active" id="info" role="tabpanel">
                        <div class="row">
                            <div class="col-md-8">
                                <div class="p-20">
                                    <p>
                                        <div><b>Name</b></div>
                                        <div>${_replaceNull(data.contact_name)}</div>
                                    </p>
                                    <p>
                                        <div><b>Pic</b></div>
                                        <div>${_replaceNull(data.pic)}</div>
                                    </p>
                                    <p>
                                        <div class="row">
                                            <div class="col-md-6">
                                                <div><b>Phone</b></div>
                                                <div>${_replaceNull(data.phone)}</div>
                                            </div>
                                            <div class="col-md-6">
                                                <div><b>Fax</b></div>
                                                <div>${_replaceNull(data.fax)}</div>
                                            </div>
                                        </div>
                                    </p>
                                    <p>
                                        <div class="row">
                                            <div class="col-md-6">
                                                <div><b>Handphone</b></div>
                                                <div>${_replaceNull(data.handphone)}</div>
                                            </div>
                                            <div class="col-md-6">
                                                <div><b>Email</b></div>
                                                <div>${_replaceNull(data.email)}</div>
                                            </div>
                                        </div>
                                    </p>
                                    <p>
                                        <div><b>Address</b></div>
                                        <div>${_replaceNull(data.address)}</div>
                                    </p>
                                    <p>
                                        <div><b>NPWP</b></div>
                                        <div>${_replaceNull(data.npwp)}</div>
                                    </p>
                                    <p>
                                        <div><b>Memo</b></div>
                                        <div>${_replaceNull(data.memo)}</div>
                                    </p>
                                </div>
                            </div>
                            <div class="col-md-4">
                                <div class="form-group p-20">
                                    <a href="#/customer/edit/${data.id}" class="btn btn-md btn-block btn-success">Edit</a>
                                    <button class="btn btn-md btn-block btn-danger btn-delete" data-id="${data.id}" data-name="${data.contact_name}" type="button">Delete</button>
                                </div>

                                <img src="${SET.baseURL()}assets/images/detail.svg" class="img-fluid" alt="">
                            </div>
                        </div>
                    </div>

                    <div class="tab-pane  p-20" id="selling" role="tabpanel">
                        <div class="row">

                            <div class="col-md-8">
                                <div class="card bg-info">
                                    <div class="card-body text-white">
                                        <div class="d-flex flex-row">
                                            <div class="display-6 align-self-center"><i class="ti-user"></i></div>
                                            <div class="p-10 align-self-center">
                                                <h4 class="m-b-0">Total Receiveable</h4>
                                                <span><span id="count_selling">0</span> Selling</span>
                                            </div>
                                            <div class="ml-auto align-self-center">
                                                <h2 class="font-medium m-b-0" id="sum_receiveable">0</h2>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="col-md-12">
                                <div class="table-responsive">
                                    <table id="t_selling" class="table" style="width: 100%">
                                        <thead>
                                            <tr>
                                                <th>Selling No.</th>
                                                <th>Reference No.</th>
                                                <th>Date</th>
                                                <th>Status</th>
                                                <th>Total</th>
                                                <th>Return</th>
                                                <th>Payment</th>
                                                <th>Bill</th>
                                            </tr>
                                        </thead>
                                        <tbody></tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="tab-pane p-20" id="return" role="tabpanel">

                        <div class="row">
                            <div class="col-md-8">
                                <div class="card bg-danger">
                                    <div class="card-body text-white">
                                        <div class="d-flex flex-row">
                                            <div class="display-6 align-self-center"><i class="ti-user"></i></div>
                                            <div class="p-10 align-self-center">
                                                <h4 class="m-b-0">Total Return</h4>
                                                <span><span id="count_return">0</span> Return</span>
                                            </div>
                                            <div class="ml-auto align-self-center">
                                                <h2 class="font-medium m-b-0" id="sum_returns">0</h2>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-12">
                                <div class="table-responsive">
                                    <table id="t_return" class="table" style="width: 100%">
                                        <thead>
                                            <tr>
                                                <th>Return No.</th>
                                                <th>Purchase No.</th>
                                                <th>Date</th>
                                                <th>Total</th>
                                            </tr>
                                        </thead>
                                        <tbody></tbody>
                                    </table>
                                </div>
                            </div>
                        </div>

                        
                    </div>

                    <div class="tab-pane p-20" id="payment" role="tabpanel">

                        <div class="row">
                            <div class="col-md-8">
                                <div class="card bg-success">
                                    <div class="card-body text-white">
                                        <div class="d-flex flex-row">
                                            <div class="display-6 align-self-center"><i class="ti-wallet"></i></div>
                                            <div class="p-10 align-self-center">
                                                <h4 class="m-b-0">Total Payment</h4>
                                                <span><span id="count_payment">0</span> Payment</span>
                                            </div>
                                            <div class="ml-auto align-self-center">
                                                <h2 class="font-medium m-b-0" id="sum_payment">0</h2>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-12">
                                <div class="table-responsive">
                                    <table id="t_payment" class="table" style="width: 100%">
                                        <thead>
                                            <tr>
                                                <th>Payment No.</th>
                                                <th>Purchase No.</th>
                                                <th>Date</th>
                                                <th>Amount</th>
                                            </tr>
                                        </thead>
                                        <tbody></tbody>
                                    </table>
                                </div>
                            </div>
                        </div>

                        
                    </div>
                </div>
            `

            $('#main_content').html(html)
        },


        renderError: () => {

        },
    }
})(settingController)

const customerController = ((SET, DT, UI) => {

    /* -------------------- ADD ACTION ----------------- */
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
                contact_name: 'required',
                phone: 'required',
                address: 'required',
            },
            submitHandler: form => {
                $.ajax({
                    url: `${SET.apiURL()}customers`,
                    type: 'POST',
                    dataType: 'JSON',
                    data: $(form).serialize(),
                    beforeSend: xhr => {
                        xhr.setRequestHeader("Authorization", "Bearer " + TOKEN)

                        SET.contentLoader('#add_container')
                    },
                    success: res => {
                        toastr.success(res.message, 'Success', { "progressBar": true, "closeButton": true, "positionClass": 'toast-bottom-right' });
                        location.hash = `#/customer/${res.results.id}`
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
                    url: `${SET.apiURL()}customers/${id}`,
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
    const _fetchCustomer = (TOKEN, id, callback) => {
        $.ajax({
            url: `${SET.apiURL()}customers/${id}`,
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


    /* -------------------- EDIT ACTION ----------------- */
    const _editObserver = (TOKEN, id) => {
        MutationObserver = window.MutationObserver || window.WebKitMutationObserver;

        let container = document.querySelector("#edit_container")

        let observer = new MutationObserver(function (mutations, observer) {
            if (container.contains($('#form_edit')[0])) {
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
                contact_name: 'required',
                phone: 'required',
                address: 'required',
            },
            submitHandler: form => {
                $.ajax({
                    url: `${SET.apiURL()}customers/${id}`,
                    type: 'PUT',
                    dataType: 'JSON',
                    data: $(form).serialize(),
                    beforeSend: xhr => {
                        xhr.setRequestHeader("Authorization", "Bearer " + TOKEN)

                        SET.contentLoader('#edit_container')
                    },
                    success: res => {
                        toastr.success(res.message, 'Success', { "progressBar": true, "closeButton": true, "positionClass": 'toast-bottom-right' });
                        location.hash = `#/customer/${res.results.id}`
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
    const _detailObserver = (TOKEN, id, data) => {
        MutationObserver = window.MutationObserver || window.WebKitMutationObserver;

        let container = document.querySelector("#detail_container")

        let observer = new MutationObserver(function (mutations, observer) {
            if (container.contains($('#t_selling')[0])) {
                let sum_selling = data.sellings.reduce((a, b) => a + b.grand_total, 0);
                let sum_selling_discount = data.sellings.reduce((a, b) => a + b.total_discount, 0);
                let sum_selling_payment = data.sellings.reduce((a, b) => a + b.total_payment, 0);
                let sum_selling_ppn = data.sellings.reduce((a, b) => a + b.total_ppn, 0);
                let sum_selling_return = data.sellings.reduce((a, b) => a + b.total_return, 0);
                let sum_selling_return_ppn = data.sellings.reduce((a, b) => a + b.total_ppn_return, 0);
                let sum_selling_return_discount = data.sellings.reduce((a, b) => a + b.total_return_discount, 0);

                let total = parseFloat(sum_selling + sum_selling_ppn + sum_selling_payment + sum_selling_return + sum_selling_return_ppn + sum_selling_discount + sum_selling_return_discount)

                $('#count_selling').text(data.sellings.length);
                $('#sum_receiveable').text(`Rp. ${SET.positiveCurrency(total)}`);

                $('#t_selling').DataTable({
                    data: data.sellings,
                    columns: [
                        {
                            data: "id",
                            render: function (data, type, row) {
                                return `
                                    <a href="#/selling/${row.id}">${row.selling_number}</a>
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
                            data: "date",
                            render: function (data, type, row) {
                                let total = parseFloat((row.grand_total + row.total_ppn + row.total_discount) + (row.total_return + row.total_ppn_return + row.total_return_discount))
                                let payment = SET.positiveCurrency(row.total_payment)

                                if (parseFloat(payment) === 0) {
                                    return `<b class="text-danger">Open</b>`
                                } else {
                                    if (total === payment) {
                                        return `<b class="text-success">Paid</b>`
                                    } else {
                                        return `<b class="text-warning">Partial</b>`
                                    }
                                }
                            }
                        },
                        {
                            data: null,
                            render: function (data, type, row) {
                                let total = parseFloat(row.grand_total + row.total_ppn + row.total_discount)

                                return `
                                    Rp. ${SET.positiveCurrency(total)}
                                `;
                            }
                        },
                        {
                            data: null,
                            render: function (data, type, row) {
                                let total = parseFloat(row.total_return + row.total_ppn_return + row.total_return_discount)

                                return `
                                    Rp. ${SET.positiveCurrency(total)}
                                `;
                            }
                        },
                        {
                            data: null,
                            render: function (data, type, row) {
                                return `
                                    Rp. ${SET.positiveCurrency(row.total_payment)}
                                `;
                            }
                        },
                        {
                            data: null,
                            render: function (data, type, row) {
                                let total = parseFloat((row.grand_total + row.total_ppn + row.total_discount) + (row.total_return + row.total_ppn_return + row.total_return_discount) + row.total_payment)

                                return `
                                    Rp. ${SET.positiveCurrency(total)}
                                `;
                            }
                        }
                    ],
                    order: [[0, "asc"]]
                })
            }

            if (container.contains($('#t_return')[0])) {
                let sum_total = data.selling_returns.reduce((a, b) => a + b.grand_total, 0);
                let sum_discount = data.selling_returns.reduce((a, b) => a + b.total_discount, 0);
                let sum_ppn = data.selling_returns.reduce((a, b) => a + b.total_ppn, 0);

                let total = parseFloat((sum_total + sum_ppn) + sum_discount)

                $('#count_return').text(data.selling_returns.length);
                $('#sum_returns').text(`Rp. ${SET.positiveCurrency(total)}`);

                $('#t_return').DataTable({
                    data: data.selling_returns,
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
                            data: "reference_number",
                            render: function (data, type, row) {
                                return `
                                    <a href="#/selling/${row.selling.id}">${row.selling.selling_number}</a>
                                `;
                            }
                        },
                        {
                            data: "date"
                        },
                        {
                            data: "memo",
                            render: function (data, type, row) {
                                let discount = row.total_discount === null ? 0 : row.total_discount;
                                let total = parseFloat((row.grand_total + row.total_ppn) + discount)

                                return `
                                    Rp. ${SET.positiveCurrency(total)}
                                `;
                            }
                        },
                    ],
                    order: [[0, "asc"]]
                })
            }

            if (container.contains($('#t_payment')[0])) {
                let total = data.selling_payments.reduce((a, b) => a + b.amount, 0);

                $('#count_payment').text(data.selling_payments.length);
                $('#sum_payment').text(`Rp. ${SET.positiveCurrency(total)}`);

                $('#t_payment').DataTable({
                    data: data.selling_payments,
                    columns: [
                        {
                            data: "id",
                            render: function (data, type, row) {
                                return `
                                <a href="#/selling_payment/${row.id}">${row.payment_number}</a>
                            `;
                            }
                        },
                        {
                            data: "reference_number",
                            render: function (data, type, row) {
                                return `
                                    <a href="#/selling/${row.selling.id}">${row.selling.selling_number}</a>
                                `;
                            }
                        },
                        {
                            data: "date"
                        },
                        {
                            data: "memo",
                            render: function (data, type, row) {
                                return `
                                    Rp. ${SET.positiveCurrency(row.amount)}
                                `;
                            }
                        },
                    ],
                    order: [[0, "asc"]]
                })
            }

            if (container.contains($('.btn-delete')[0])) {
                _openDelete('#main_content')
                _submitDelete(TOKEN, data => {
                    location.hash = '#/customer'
                })
            }


            observer.disconnect();
        });

        observer.observe(container, {
            subtree: true,
            attributes: true,
            childList: true,
        });
    }

    return {
        data: TOKEN => {
            console.log('Customer Controller is running...')

            const table = $('#t_customer').DataTable({
                columnDefs: [
                    {
                        targets: [5],
                        orderable: false
                    },
                    {
                        targets: [5],
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
                                        columns: [0, 1, 2, 3, 4]
                                    },
                                    filename: 'DATA_CUSTOMER',
                                    title: 'Data Customer',
                                },
                                {
                                    extend: 'excelHtml5',
                                    text: 'Excel',
                                    exportOptions: {
                                        columns: [0, 1, 2, 3, 4]
                                    },
                                    filename: 'DATA_CUSTOMER',
                                    title: 'Data Customer'
                                },
                                {
                                    extend: 'csvHtml5',
                                    text: 'CSV',
                                    exportOptions: {
                                        columns: [0, 1, 2, 3, 4]
                                    },
                                    filename: 'DATA_CUSTOMER',
                                    title: 'Data Customer'
                                },
                                {
                                    extend: 'print',
                                    text: 'Print',
                                    exportOptions: {
                                        columns: [0, 1, 2, 3, 4]
                                    },
                                    filename: 'DATA_CUSTOMER',
                                    title: '<h4>Data Customer</h4>'
                                },
                            ]
                        },
                        {
                            extend: 'colvis',
                            text: '<i class="fa fa-eye"></i>',
                            columns: [1, 2, 3, 4],
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
                                location.hash = '#/customer/add'
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
                    url: `${SET.apiURL()}customers`,
                    type: 'GET',
                    dataType: 'JSON',
                    beforeSend: xhr => {
                        xhr.setRequestHeader("Content-Type", 'application/json')
                        xhr.setRequestHeader("Authorization", "Bearer " + TOKEN)
                    },
                    dataSrc: res => {
                        let sum_selling = res.results.reduce((a, b) => a + b.sum_selling, 0);
                        let sum_selling_discount = res.results.reduce((a, b) => a + b.sum_selling_discount, 0);
                        let sum_selling_payment = res.results.reduce((a, b) => a + b.sum_selling_payment, 0);
                        let sum_selling_ppn = res.results.reduce((a, b) => a + b.sum_selling_ppn, 0);
                        let sum_selling_return = res.results.reduce((a, b) => a + b.sum_selling_return, 0);
                        let sum_selling_return_ppn = res.results.reduce((a, b) => a + b.sum_selling_return_ppn, 0);
                        let sum_selling_return_discount = res.results.reduce((a, b) => a + b.sum_selling_return_discount, 0);

                        let total = parseFloat(sum_selling + sum_selling_ppn + sum_selling_payment + sum_selling_return + sum_selling_return_ppn + sum_selling_discount + sum_selling_return_discount)

                        
                        $('#count_customer').text(res.results.length)
                        $('#sum_receiveable').text(`Rp. ${SET.positiveCurrency(total)}`)

                        console.log(res.results)

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
                                <a href="#/customer/${row.id}">${row.contact_name}</a>
                            `;
                        }
                    },
                    {
                        data: "phone"
                    },
                    {
                        data: "address"
                    },
                    {
                        data: "pic"
                    },
                    {
                        data: null,
                        render: function (data, type, row) {
                            let piutang = parseFloat(row.sum_selling + row.sum_selling_ppn + row.sum_selling_payment + row.sum_selling_return + row.sum_selling_return_ppn + row.sum_selling_discount + row.sum_selling_return_discount)
                            return `
                                Rp. ${SET.positiveCurrency(piutang)}
                            `;
                        }
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
                                        <a class="dropdown-item btn-delete" href="javascript:void(0)" id="btn_delete" data-id="${row.id}" data-name="${row.contact_name}"><i class="fa fa-trash"></i> Delete</a>
                                        <div class="dropdown-divider"></div>
                                        <a class="dropdown-item" href="#/customer/edit/${row.id}"><i class="fa fa-edit"></i> Edit</a>
                                    </div>
                                </div>
                            `;
                        }
                    }
                ],
                order: [[0, "asc"]]
            })

            DT.dtFilter(table)

            _openDelete('#t_customer')
            _submitDelete(TOKEN, data => {
                table.ajax.reload()
                $('#modal_delete').modal('hide')
            })
        },
        add: TOKEN => {
            console.log('Add Customer Controller is running...')

            _submitAdd(TOKEN)
        },
        edit: (TOKEN, id) => {
            console.log('Edit Customer Controller is running...')

            _fetchCustomer(TOKEN, id, data => {
                _editObserver(TOKEN, id)
                UI.renderEdit(data)
            })
        },
        detail: (TOKEN, id) => {
            console.log('Detail Customer Controller is running...')

            _fetchCustomer(TOKEN, id, data => {
                _detailObserver(TOKEN, id, data)
                UI.renderDetail(data)
            })
        }
    }
})(settingController, dtController, customerUI)

export default customerController