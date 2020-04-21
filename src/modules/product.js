const productUI = ((SET) => {
    
    return {
        renderFormEdit: data => {
            let html = `
                <div class="row">
                    <div class="col-md-12">
                        <form id="form_edit">
                            <div class="row">
                                <div class="col-md-8">
                                        <div class="form-group">
                                            <label for="contact_name">Name</label>
                                            <input type="text" class="form-control" id="product_name" name="product_name" value="${data.product_name}">
                                        </div>
                                        <div class="form-group">
                                            <label for="pic">SKU</label>
                                            <input type="text" class="form-control" id="sku" name="sku" value="${data.sku}">
                                        </div>
                                        <div class="form-group row">
                                            <div class="col-md-6">
                                                <label for="phone">Category</label>
                                                <select class="form-control" id="category_id" name="category_id">
                                                    <option value="" disabled="" selected="">-- Choose Category --</option>
                                                </select>
                                            </div>
                                            <div class="col-md-6">
                                                <label for="fax">Unit</label>
                                                <select class="form-control" id="unit_id" name="unit_id">
                                                    <option value="" disabled="" selected="">-- Choose Unit --</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div class="form-group row">
                                            <div class="col-md-6">
                                                <label for="handphone">Purchase Price</label>
                                                <div class="input-group mb-3">
                                                    <div class="input-group-prepend">
                                                        <span class="input-group-text" id="basic-addon1">Rp. </span>
                                                    </div>
                                                    <input type="number" class="form-control" name="purchase_price" id="purchase_price" value="${data.purchase_price}">
                                                </div>
                                            </div>
                                            <div class="col-md-6">
                                                <label for="email">Selling Price</label>
                                                <div class="input-group mb-3">
                                                    <div class="input-group-prepend">
                                                        <span class="input-group-text" id="basic-addon1">Rp. </span>
                                                    </div>
                                                    <input type="number" class="form-control" name="selling_price" id="selling_price" value="${data.selling_price}">
                                                </div>
                                            </div>
                                        </div>
                                        <div class="form-group">
                                            <label for="memo">Memo</label>
                                            <textarea class="form-control" id="memo" name="memo">${data.memo}</textarea>
                                        </div>
                                        
                                </div>
                                <div class="col-md-4">
                                    <div class="form-group">
                                        <label for="picture">Picture</label>
                                        <input type="file" class="dropify" name="picture" id="picture" ${data.picture === null ? '' : `data-default-file="${SET.apiURL()}products/file/${data.picture}"`}>
                                    </div>
                                </div>
                                <div class="col-md-12">
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
        },
        renderDetail: data => {
            let html = `
                <ul class="nav nav-tabs customtab" role="tablist">
                    <li class="nav-item"> <a class="nav-link active" data-toggle="tab" href="#info" role="tab"><span class="hidden-sm-up"><i class="ti-info"></i></span> <span class="hidden-xs-down">Info</span></a> </li>
                    <li class="nav-item"> <a class="nav-link" data-toggle="tab" href="#adjustment" role="tab"><span class="hidden-sm-up"><i class="ti-wallet"></i></span> <span class="hidden-xs-down">Adjustment</span></a> </li>
                    <li class="nav-item"> <a class="nav-link" data-toggle="tab" href="#purchase" role="tab"><span class="hidden-sm-up"><i class="mdi mdi-checkbox-multiple-blank-outline"></i></span> <span class="hidden-xs-down">Purchase</span></a> </li>
                    <li class="nav-item"> <a class="nav-link" data-toggle="tab" href="#purchase_return" role="tab"><span class="hidden-sm-up"><i class="mdi mdi-keyboard-return"></i></span> <span class="hidden-xs-down">Purchase Return</span></a></li>
                    <li class="nav-item"> <a class="nav-link" data-toggle="tab" href="#selling" role="tab"><span class="hidden-sm-up"><i class="mdi mdi-checkbox-multiple-blank-outline"></i></span> <span class="hidden-xs-down">Selling</span></a> </li>
                    <li class="nav-item"> <a class="nav-link" data-toggle="tab" href="#selling_return" role="tab"><span class="hidden-sm-up"><i class="mdi mdi-keyboard-return"></i></span> <span class="hidden-xs-down">Selling Return</span></a> </li>
                </ul>

                <div class="tab-content">

                    <div class="tab-pane active p-20" id="info" role="tabpanel">
                        <div class="row">
                            <div class="col-md-8">
                                <div class="p-20">
                                    <p>
                                        <div class="row">
                                            <div class="col-md-6">
                                                <div><b>Name</b></div>
                                                <div>${SET.replaceNull(data.product_name)}</div>
                                            </div>
                                            <div class="col-md-6">
                                                <div><b>SKU</b></div>
                                                <div>${SET.replaceNull(data.sku)}</div>
                                            </div>
                                        </div>
                                    </p>
                                    <p>
                                        <div class="row">
                                            <div class="col-md-6">
                                                <div><b>Purchase Price</b></div>
                                                <div>Rp. ${SET.realCurrency(data.purchase_price)}</div>
                                            </div>
                                            <div class="col-md-6">
                                                <div><b>Selling Price</b></div>
                                                <div>Rp. ${SET.realCurrency(data.selling_price)}</div>
                                            </div>
                                        </div>
                                    </p>
                                    <p>
                                        <div class="row">
                                            <div class="col-md-6">
                                                <div><b>Unit</b></div>
                                                <div>${SET.replaceNull(data.unit.unit_name)}</div>
                                            </div>
                                            <div class="col-md-6">
                                                <div><b>Category</b></div>
                                                <div>${SET.replaceNull(data.category.category_name)}</div>
                                            </div>
                                        </div>
                                    </p>

                                    <div class="form-group mt-5">
                                        <a href="#/product/edit/${data.id}" class="btn btn-md btn-block btn-success">Edit</a>
                                        <button class="btn btn-md btn-block btn-danger btn-delete" data-id="${data.id}" data-name="${data.product_name}" type="button">Delete</button>
                                    </div>

                                </div>
                            </div>

                            <div class="col-md-4">
                                <p class="p-20">
                                    <label>Picture</label>
                                    <img src="${data.picture === null ? `${SET.baseURL()}assets/images/detail.svg` : `${SET.apiURL()}products/file/${data.picture}`}" class="img-fluid" alt="">
                                </p>
                            </div>

                            <div class="col-md-12 mt-5">
                                <h4>Product History</h4>
                                <table class="table table-striped">
                                    <thead>
                                        <tr>
                                            <td style="width: 11%">Qty Awal</td>
                                            <td style="width: 11%">Transfer In</td>
                                            <td style="width: 11%">Transfer Out</td>
                                            <td style="width: 11%">Purchase</td>
                                            <td style="width: 11%">Purchase Return</td>
                                            <td style="width: 11%">Selling</td>
                                            <td style="width: 11%">Selling Return</td>
                                            <td style="width: 11%">Other</td>
                                            <td style="width: 12%">Stock Akhir</td>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>${data.sum_qty_awal}</td>
                                            <td>${data.sum_transfer_in}</td>
                                            <td>${data.sum_transfer_out}</td>
                                            <td>${data.sum_purchase}</td>
                                            <td>${data.sum_purchase_return}</td>
                                            <td>${data.sum_selling}</td>
                                            <td>${data.sum_selling_return}</td>
                                            <td>${data.sum_other}</td>
                                            <td><b>${parseFloat(data.sum_qty_awal) + parseFloat(data.sum_transfer_in) + parseFloat(data.sum_transfer_out) + parseFloat(data.sum_purchase) + parseFloat(data.sum_purchase_return) + parseFloat(data.sum_selling) + parseFloat(data.sum_selling_return) + parseFloat(data.sum_other)}</b></td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>

                    <div class="tab-pane p-20" id="adjustment" role="tabpanel">
                        <div class="row">
                            <div class="col-md-8">
                                <div class="card bg-info">
                                    <div class="card-body text-white">
                                        <div class="d-flex flex-row">
                                            <div class="display-6 align-self-center"><i class="ti-user"></i></div>
                                            <div class="p-10 align-self-center">
                                                <h4 class="m-b-0">Total Adjustment</h4>
                                                <span><span id="count_adjustment">0</span> Adjustment</span>
                                            </div>
                                            <div class="ml-auto align-self-center">
                                                <h2 class="font-medium m-b-0" id="sum_adjustment">0</h2>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-12">
                                <div class="table-responsive">
                                    <table id="t_adjustment" class="table" style="width: 100%">
                                        <thead>
                                            <tr>
                                                <th>Reference No.</th>
                                                <th>Category</th>
                                                <th>Date</th>
                                                <th>Unit Price</th>
                                                <th>Qty</th>
                                                <th>Total</th>
                                            </tr>
                                        </thead>
                                        <tbody></tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="tab-pane p-20" id="purchase" role="tabpanel">
                        <div class="row">
                            <div class="col-md-8">
                                <div class="card bg-success">
                                    <div class="card-body text-white">
                                        <div class="d-flex flex-row">
                                            <div class="display-6 align-self-center"><i class="ti-user"></i></div>
                                            <div class="p-10 align-self-center">
                                                <h4 class="m-b-0">Total Purchase</h4>
                                                <span><span id="count_purchase">0</span> Purchase</span>
                                            </div>
                                            <div class="ml-auto align-self-center">
                                                <h2 class="font-medium m-b-0" id="sum_purchase">0</h2>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-12">
                                <div class="table-responsive">
                                    <table id="t_purchase" class="table" style="width: 100%">
                                        <thead>
                                            <tr>
                                                <th>Purchase No.</th>
                                                <th>Date</th>
                                                <th>Unit Price</th>
                                                <th>Qty</th>
                                                <th>Total</th>
                                            </tr>
                                        </thead>
                                        <tbody></tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="tab-pane p-20" id="purchase_return" role="tabpanel">
                        <div class="row">
                            <div class="col-md-8">
                                <div class="card bg-danger">
                                    <div class="card-body text-white">
                                        <div class="d-flex flex-row">
                                            <div class="display-6 align-self-center"><i class="ti-user"></i></div>
                                            <div class="p-10 align-self-center">
                                                <h4 class="m-b-0">Total Purchase Return</h4>
                                                <span><span id="count_purchase_return">0</span> Return</span>
                                            </div>
                                            <div class="ml-auto align-self-center">
                                                <h2 class="font-medium m-b-0" id="sum_purchase_return">0</h2>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-12">
                                <div class="table-responsive">
                                    <table id="t_purchase_return" class="table" style="width: 100%">
                                        <thead>
                                            <tr>
                                                <th>Return No.</th>
                                                <th>Date</th>
                                                <th>Unit Price</th>
                                                <th>Qty</th>
                                                <th>Total</th>
                                            </tr>
                                        </thead>
                                        <tbody></tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="tab-pane p-20" id="selling" role="tabpanel">
                        <div class="row">
                            <div class="col-md-8">
                                <div class="card bg-primary">
                                    <div class="card-body text-white">
                                        <div class="d-flex flex-row">
                                            <div class="display-6 align-self-center"><i class="ti-user"></i></div>
                                            <div class="p-10 align-self-center">
                                                <h4 class="m-b-0">Total Selling</h4>
                                                <span><span id="count_selling">0</span> Selling</span>
                                            </div>
                                            <div class="ml-auto align-self-center">
                                                <h2 class="font-medium m-b-0" id="sum_selling">0</h2>
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
                                                <th>Date</th>
                                                <th>Unit Price</th>
                                                <th>Qty</th>
                                                <th>Total</th>
                                            </tr>
                                        </thead>
                                        <tbody></tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="tab-pane p-20" id="selling_return" role="tabpanel">
                        <div class="row">
                            <div class="col-md-8">
                                <div class="card bg-danger">
                                    <div class="card-body text-white">
                                        <div class="d-flex flex-row">
                                            <div class="display-6 align-self-center"><i class="ti-user"></i></div>
                                            <div class="p-10 align-self-center">
                                                <h4 class="m-b-0">Total Selling Return</h4>
                                                <span><span id="count_selling_return">0</span> Return</span>
                                            </div>
                                            <div class="ml-auto align-self-center">
                                                <h2 class="font-medium m-b-0" id="sum_selling_return">0</h2>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-12">
                                <div class="table-responsive">
                                    <table id="t_selling_return" class="table" style="width: 100%">
                                        <thead>
                                            <tr>
                                                <th>Return No.</th>
                                                <th>Date</th>
                                                <th>Unit Price</th>
                                                <th>Qty</th>
                                                <th>Total</th>
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
        renderNoData: () => {

        },
        renderError: () => {

        }
    }
})(settingController)

const productController = ((SET, DT, UI) => {

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

                        SET.contentLoader('#add_container')
                    },
                    success: res => {
                        toastr.success(res.message, 'Success', { "progressBar": true, "closeButton": true, "positionClass": 'toast-bottom-right' });
                        location.hash = `#/product/${res.results.id}`
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

    const _fetchCategory = (TOKEN, callback) => {
        $.ajax({
            url: `${SET.apiURL()}categories`,
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

    const _fetchUnit = (TOKEN, callback) => {
        $.ajax({
            url: `${SET.apiURL()}units`,
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
                    url: `${SET.apiURL()}products/${id}`,
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

    const _fetchProduct = (TOKEN, id, callback) => {
        $.ajax({
            url: `${SET.apiURL()}products/${id}`,
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

    /* -------------------- DETAIL ACTION ----------------- */
    const _detailObserver = (TOKEN, id, data) => {
        MutationObserver = window.MutationObserver || window.WebKitMutationObserver;

        let container = document.querySelector("#detail_container")

        let observer = new MutationObserver(function (mutations, observer) {

            if (container.contains($('#t_adjustment')[0])) {
                let total = data.adjustments.reduce((a, b) => a + b.pivot.qty, 0);

                $('#count_adjustment').text(data.adjustments.length);
                $('#sum_adjustment').text(`${SET.positiveCurrency(total)} ${data.unit.unit_name}`);

                $('#t_adjustment').DataTable({
                    data: data.adjustments,
                    columns: [
                        {
                            data: "id",
                            render: function (data, type, row) {
                                return `
                                <a href="#/adjustment/${row.id}">${row.reference_number}</a>
                            `;
                            }
                        },
                        {
                            data: "category"
                        },
                        {
                            data: "date"
                        },
                        {
                            data: "pivot.unit_price",
                            render: function (data, type, row) {
                                return `
                                    Rp. ${SET.realCurrency(row.pivot.unit_price)}
                                `;
                            }
                        },
                        {
                            data: "pivot.qty",
                        },
                        {
                            data: "pivot.total",
                            render: function (data, type, row) {
                                return `
                                    Rp. ${SET.realCurrency(row.pivot.total)}
                                `;
                            }
                        },
                    ],
                    order: [[2, "desc"]]
                })
            }

            if (container.contains($('#t_purchase')[0])) {
                let total = data.purchases.reduce((a, b) => a + b.pivot.qty, 0);

                $('#count_purchase').text(data.purchases.length);
                $('#sum_purchase').text(`${SET.positiveCurrency(total)} ${data.unit.unit_name}`);

                $('#t_purchase').DataTable({
                    data: data.purchases,
                    columns: [
                        {
                            data: "id",
                            render: function (data, type, row) {
                                return `
                                <a href="#/purchase/${row.id}">${row.purchase_number}</a>
                            `;
                            }
                        },
                        {
                            data: "date"
                        },
                        {
                            data: "pivot.unit_price",
                            render: function (data, type, row) {
                                return `
                                    Rp. ${SET.realCurrency(row.pivot.unit_price)}
                                `;
                            }
                        },
                        {
                            data: "pivot.qty",
                        },
                        {
                            data: "pivot.total",
                            render: function (data, type, row) {
                                return `
                                    Rp. ${SET.realCurrency(row.pivot.total)}
                                `;
                            }
                        },
                    ],
                    order: [[1, "desc"]]
                })
            }

            if (container.contains($('#t_purchase_return')[0])) {
                let total = data.purchase_returns.reduce((a, b) => a + b.pivot.qty, 0);

                $('#count_purchase_return').text(data.purchase_returns.length);
                $('#sum_purchase_return').text(`${SET.positiveCurrency(total)} ${data.unit.unit_name}`);

                $('#t_purchase_return').DataTable({
                    data: data.purchase_returns,
                    columns: [
                        {
                            data: "id",
                            render: function (data, type, row) {
                                return `
                                <a href="#/purchase_return/${row.id}">${row.return_number}</a>
                            `;
                            }
                        },
                        {
                            data: "date"
                        },
                        {
                            data: "pivot.unit_price",
                            render: function (data, type, row) {
                                return `
                                    Rp. ${SET.realCurrency(row.pivot.unit_price)}
                                `;
                            }
                        },
                        {
                            data: "pivot.qty",
                        },
                        {
                            data: "pivot.total",
                            render: function (data, type, row) {
                                return `
                                    Rp. ${SET.realCurrency(row.pivot.total)}
                                `;
                            }
                        },
                    ],
                    order: [[1, "desc"]]
                })
            }

            if (container.contains($('#t_selling')[0])) {
                let total = data.sellings.reduce((a, b) => a + b.pivot.qty, 0);

                $('#count_selling').text(data.sellings.length);
                $('#sum_selling').text(`${SET.positiveCurrency(total)} ${data.unit.unit_name}`);

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
                            data: "date"
                        },
                        {
                            data: "pivot.unit_price",
                            render: function (data, type, row) {
                                return `
                                    Rp. ${SET.realCurrency(row.pivot.unit_price)}
                                `;
                            }
                        },
                        {
                            data: "pivot.qty",
                        },
                        {
                            data: "pivot.total",
                            render: function (data, type, row) {
                                return `
                                    Rp. ${SET.realCurrency(row.pivot.total)}
                                `;
                            }
                        },
                    ],
                    order: [[1, "desc"]]
                })
            }

            if (container.contains($('#t_selling_return')[0])) {
                let total = data.selling_returns.reduce((a, b) => a + b.pivot.qty, 0);

                $('#count_selling_return').text(data.selling_returns.length);
                $('#sum_selling_return').text(`${SET.positiveCurrency(total)} ${data.unit.unit_name}`);

                $('#t_selling_return').DataTable({
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
                            data: "date"
                        },
                        {
                            data: "pivot.unit_price",
                            render: function (data, type, row) {
                                return `
                                    Rp. ${SET.realCurrency(row.pivot.unit_price)}
                                `;
                            }
                        },
                        {
                            data: "pivot.qty",
                        },
                        {
                            data: "pivot.total",
                            render: function (data, type, row) {
                                return `
                                    Rp. ${SET.realCurrency(row.pivot.total)}
                                `;
                            }
                        },
                    ],
                    order: [[1, "desc"]]
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



    /* -------------------- EDIT ACTION ----------------- */
    const _editObserver = (TOKEN, id, detail) => {
        MutationObserver = window.MutationObserver || window.WebKitMutationObserver;

        let container = document.querySelector("#edit_container")

        let observer = new MutationObserver(function (mutations, observer) {
            if (container.contains($('#form_edit')[0])) {
                $('.dropify').dropify();

                _fetchCategory(TOKEN, data => {
                    let filtered = [];

                    data.map(v => {
                        let obj = {
                            id: v.id,
                            text: v.category_name
                        }

                        filtered.push(obj)
                    })

                    $('#category_id').select2({ data: filtered });


                    if(detail.category !== null){
                        $('#category_id').val(detail.category.id).trigger('change')
                    }
                })

                _fetchUnit(TOKEN, data => {
                    let filtered = [];

                    data.map(v => {
                        let obj = {
                            id: v.id,
                            text: v.unit_name
                        }

                        filtered.push(obj)
                    })

                    $('#unit_id').select2({ data: filtered });

                    if (detail.unit !== null) {
                        $('#unit_id').val(detail.unit.id).trigger('change')
                    }
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
                product_name: 'required',
            },
            submitHandler: form => {
                $.ajax({
                    url: `${SET.apiURL()}products/${id}`,
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
                        location.hash = `#/product/${res.results.id}`
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
            console.log('Product Controller is Running...')

            const table = $('#t_product').DataTable({
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
                                        columns: [0, 1, 2, 3, 4, 5]
                                    },
                                    filename: 'DATA_SUPPLIER',
                                    title: 'Data Supplier',
                                },
                                {
                                    extend: 'excelHtml5',
                                    text: 'Excel',
                                    exportOptions: {
                                        columns: [0, 1, 2, 3, 4, 5]
                                    },
                                    filename: 'DATA_SUPPLIER',
                                    title: 'Data Supplier'
                                },
                                {
                                    extend: 'csvHtml5',
                                    text: 'CSV',
                                    exportOptions: {
                                        columns: [0, 1, 2, 3, 4, 5]
                                    },
                                    filename: 'DATA_SUPPLIER',
                                    title: 'Data Supplier'
                                },
                                {
                                    extend: 'print',
                                    text: 'Print',
                                    exportOptions: {
                                        columns: [0, 1, 2, 3, 4, 5]
                                    },
                                    filename: 'DATA_SUPPLIER',
                                    title: '<h4>Data Supplier</h4>'
                                },
                            ]
                        },
                        {
                            extend: 'colvis',
                            text: '<i class="fa fa-eye"></i>',
                            columns: [1, 2, 3, 4, 5],
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
                                location.hash = '#/product/add'
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
                    url: `${SET.apiURL()}products`,
                    type: 'GET',
                    dataType: 'JSON',
                    beforeSend: xhr => {
                        xhr.setRequestHeader("Content-Type", 'application/json')
                        xhr.setRequestHeader("Authorization", "Bearer " + TOKEN)
                    },
                    dataSrc: res => {
                        $('#count_product').text(res.results.length)

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
                                <a href="#/product/${row.id}">${row.product_name}</a>
                            `;
                        }
                    },
                    {
                        data: "sku"
                    },
                    {
                        data: "category.category_name",
                        render: function (data, type, row) {
                            if(row.category === null){
                                return '-'
                            } else {
                                return row.category.category_name
                            }
                        }
                    },
                    {
                        data: "sku",
                        render: function (data, type, row) {
                            let total_stock = parseFloat(row.sum_adjustment) + parseFloat(row.sum_purchase) + parseFloat(row.sum_purchase_return) + parseFloat(row.sum_selling) + parseFloat(row.sum_selling_return)

                            return SET.realCurrency(total_stock)
                        }
                    },
                    {
                        data: "unit.unit_name",
                        render: function (data, type, row) {
                            if (row.unit === null) {
                                return '-'
                            } else {
                                return row.unit.unit_name
                            }
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
                                        <a class="dropdown-item btn-delete" href="javascript:void(0)" id="btn_delete" data-id="${row.id}" data-name="${row.product_name}"><i class="fa fa-trash"></i> Delete</a>
                                        <div class="dropdown-divider"></div>
                                        <a class="dropdown-item" href="#/product/edit/${row.id}"><i class="fa fa-edit"></i> Edit</a>
                                    </div>
                                </div>
                            `;
                        }
                    }
                ],
                order: [[0, "asc"]]
            })

            DT.dtFilter(table)

            _openDelete('#t_product')
            _submitDelete(TOKEN, data => {
                table.ajax.reload()
                $('#modal_delete').modal('hide')
            })
        },

        add: TOKEN => {
            $('.dropify').dropify();
            $('#category_id').select2();
            $('#unit_id').select2();

            _submitAdd(TOKEN)

            _fetchCategory(TOKEN, data => {
                let filtered = [];

                data.map(v => {
                    let obj = {
                        id: v.id,
                        text: v.category_name
                    }

                    filtered.push(obj)
                })

                $('#category_id').select2({ data: filtered });
            })

            _fetchUnit(TOKEN, data => {
                let filtered = [];

                data.map(v => {
                    let obj = {
                        id: v.id,
                        text: v.unit_name
                    }

                    filtered.push(obj)
                })

                $('#unit_id').select2({ data: filtered });
            })
        },

        edit: (TOKEN, id) => {
            _fetchProduct(TOKEN, id, data => {
                _editObserver(TOKEN, id, data)
                UI.renderFormEdit(data)
            })
        },

        detail: (TOKEN, id) => {
            console.log('Detail Product Controller is running...')

            _fetchProduct(TOKEN, id, data => {
                _detailObserver(TOKEN, id, data)
                UI.renderDetail(data)
            })
        }
    }
})(settingController, dtController, productUI)

export default productController