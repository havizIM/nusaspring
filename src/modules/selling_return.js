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

    const _getMaxQty = (returns, id) => {
        let max = 0

        returns.map(v => {
            v.products.filter(i => i.product_id === id).map(x => {
                max += x.qty
            })
        })

        return max;
    }

    let count = 0

    return {
        resetCount: () => {
            count = 0
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
                                                        <p class="text-muted m-l-5">Jl. Radar Auri No.41,
                                                            <br/> Cisalak Ps, Cimanggis, Depok, Jawa Barat 16452, Indonesia,
                                                            <br/> Hp. 087880729929 / 081280999733,
                                                            <br/> Telp/Fax. 021-29616935</p>
                                                    </address>
                                                </td>
                                                <td class="w-50 text-right">
                                                    <address>
                                                        <h3>From</h3>
                                                        <h4 class="font-bold"><a href="#/customer/${data.contact.id}">${data.contact.contact_name}</a></h4>
                                                        <p class="text-muted m-l-30">${data.selling !== null ? `${SET.replaceNull(data.selling.address)}` : `${SET.replaceNull(data.contact.address)}`},
                                                        <br> ${data.selling !== null ? `${SET.replaceNull(data.selling.email)}` : `${SET.replaceNull(data.contact.email)}`}</p>

                                                        <p class="m-t-30"><b><i class="fa fa-calendar"></i> Date :</b> ${data.date}</p>
                                                        <p><b><i class="mdi mdi-album"></i> Return No :</b> ${_replaceNull(data.return_number)}</p>
                                                        <p><b><i class="mdi mdi-animation"></i> Selling No :</b> ${data.selling !== null ? `<a href="#/selling/${data.selling.id}">${_replaceNull(data.selling.selling_number)}</a>` : 'Penjualan'}</p>
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

                                                            let discount_unit = parseFloat(v.discount_amount / v.qty)

                                                            return `
                                                                <tr>
                                                                    <td class="text-center">${no++}</td>
                                                                    <td><a href="#/product/${v.product_id}">${v.description}</a></td>
                                                                    <td class="text-right">${Math.abs(v.qty)} ${v.unit !== null ? v.unit : ''}</td>
                                                                    <td class="text-right"> Rp. ${SET.positiveCurrency(v.unit_price + discount_unit)} </td>
                                                                    <td class="text-right"> Rp. ${SET.positiveCurrency(v.total + v.discount_amount)} </td>
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
                                                            <p>Sub Total : <b>Rp. ${SET.positiveCurrency(parseFloat(data.grand_total + data.total_discount))}</b></p>
                                                            <p>Vat (10%) : <b>Rp. ${SET.positiveCurrency(parseFloat(data.total_ppn))}</b></p>
                                                            <hr>
                                                            <h3><b>Grand Total :</b> Rp. ${SET.positiveCurrency(parseFloat(data.grand_total) + parseFloat(data.total_ppn) + parseFloat(data.total_discount))}</h3>
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
                                                        <h5>Penerima</h5>
                                                        <br>
                                                        <br>
                                                        <br>
                                                        <br>
                                                        <br>
                                                        <hr style="width: 50%">
                                                    </td>
                                                    <td style="width: 50%" class="text-center">
                                                        <h5>Hormat Kami</h5>
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
                            <input type="number"  min="0" value="0" name="qty[${count}]" id="qty_${count}" data-id="${count}" class="form-control qty" required>
                            <div class="input-group-prepend">
                                <input type="hidden" name="unit[${count}]" id="unit_${count}" data-id="${count}" class="form-control">
                                <span class="input-group-text" id="unit_text_${count}" data-id="${count}">-</span>
                            </div>
                        </div>
                    </td>
                    <td>
                        <div class="input-group mb-3">
                            <input type="number"  min="0" value="0" name="discount_percent[${count}]" id="discount_percent_${count}" data-id="${count}" class="form-control discount_percent">
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
                            <input type="number"  min="0" value="0" name="discount_amount[${count}]" id="discount_amount_${count}" data-id="${count}" class="form-control discount_amount">
                        </div>
                    </td>
                    <td>
                        <div class="text-center">
                            <div class="custom-control custom-checkbox">
                                <input type="checkbox" class="custom-control-input ppn" id="ppn_${count}" name="ppn[${count}]" data-id="${count}" value="Y">
                                <label class="custom-control-label" for="ppn_${count}"></label>
                            </div>
                            <input type="hidden" value="0" data-id="${count}" id="ppn_amount_${count}" name="ppn_amount[${count}]" class="ppn_amount">
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
                                price: v.selling_price,
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
        },

        renderFormAdd: data => {

            let html = `
                <div class="card" id="add_container">
                    <div class="card-body">

                        <div class="row">
                            <div class="col-md-12">
                                <form id="form_add">
                                    <div class="row">
                                        <div class="col-md-4">
                                            <div class="card">
                                                <div class="card-body">
                                                    <h5 class="card-title">Selling Info</h5>
                                                    <hr>
                                                    <small>Total Price</small>
                                                    <h2>Rp. ${SET.positiveCurrency((parseFloat(data.grand_total + data.total_ppn + data.total_discount)) + (parseFloat(data.total_return + data.total_ppn_return + data.total_return_discount)))}</h2>
                                                    <hr>
                                                    <h4><i class="ti-mobile"></i> <a href="#/selling/${data.id}">${data.selling_number}</a></h4>
                                                    <small>${data.contact.contact_name}</small>
                                                </div>
                                            </div>
                                            
                                            <input type="hidden" name="selling_id" id="selling_id" value="${data.id}">
                                            <input type="hidden" name="contact_id" id="contact_id" value="${data.contact.id}">
                                        </div>
                                        <div class="col-md-4">
                                            <div class="form-group">
                                                <label for="fax">Return No</label>
                                                <input type="text" class="form-control" name="return_number" id="return_number">
                                            </div>
                                            <div class="form-group">
                                                    <label for="fax">Reference No</label>
                                                    <input type="text" class="form-control" name="reference_number" id="reference_number">
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
                                            <div class="table-responsive">
                                                <table class="table" id="t_add_products" style="overflow-x: scroll;">
                                                    <thead>
                                                        <tr>
                                                            <th style="min-width: 200px;">Product</th>
                                                            <th style="min-width: 200px;">Unit Price</th>
                                                            <th style="min-width: 150px;">Available Qty</th>
                                                            <th style="min-width: 150px;">Qty Return</th>
                                                            <th style="min-width: 150px;">Disc (%)</th>
                                                            <th style="min-width: 200px;">Disc (Rp.)</th>
                                                            <th>PPN</th>
                                                            <th style="min-width: 200px;">Total</th>
                                                            <th style="min-width: 200px;">Total Return</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody id="coba">
                                                        ${data.products.map(v => {
                                                            count += 1
                                                            return `
                                                                <tr id="row_${count}">
                                                                    <td>
                                                                        ${v.description}
                                                                        <input type="hidden" data-id="${count}" class="product_id" id="product_id_${count}" name="product_id[${count}]" value="${v.product_id}">
                                                                        <input type="hidden" data-id="${count}" class="description" id="description_${count}" name="description[${count}]" value="${v.description}">
                                                                    </td>
                                                                    <td>
                                                                        Rp. ${SET.positiveCurrency(v.unit_price)}
                                                                        <input type="hidden" data-id="${count}" class="unit_price" id="unit_price_${count}" name="unit_price[${count}]" value="${v.unit_price}">
                                                                    </td>
                                                                    <td>
                                                                        ${SET.positiveNumber(parseFloat(v.qty + _getMaxQty(data.returns, v.product_id)))}
                                                                    </td>
                                                                    <td>
                                                                        <div class="input-group mb-3">
                                                                            <input type="number"  data-id="${count}" min="0" value="0" max="${SET.positiveNumber(parseFloat(v.qty + _getMaxQty(data.returns, v.product_id)))}" name="qty[${count}]" id="qty_${count}" data-id="${count}" class="form-control qty" required>
                                                                            <div class="input-group-prepend">
                                                                                <input type="hidden" data-id="${count}" name="unit[${count}]" id="unit_${count}" data-id="${count}" class="unit" value="${v.unit}">
                                                                                <span class="input-group-text" id="unit_text_${count}" data-id="${count}">${v.unit}</span>
                                                                            </div>
                                                                        </div>
                                                                    </td>
                                                                    <td>
                                                                        ${v.discount_percent} %
                                                                        <input type="hidden" data-id="${count}" id="discount_percent_${count}" name="discount_percent[${count}]" value="${v.discount_percent}" class="discount_percent">
                                                                    </td>
                                                                    <td>
                                                                       Rp. ${SET.positiveCurrency(v.discount_amount)}
                                                                        <input type="hidden" data-id="${count}" id="discount_amount_${count}" name="discount_amount[${count}]" value="${v.discount_amount}" class="discount_amount">
                                                                    </td>
                                                                    <td>
                                                                        ${v.ppn}
                                                                        <input type="hidden" data-id="${count}" id="ppn_${count}" name="ppn[${count}]" value="${v.ppn}" class="ppn">
                                                                        <input type="hidden" data-id="${count}" class="ppn_amount" id="ppn_amount_${count}" name="ppn_amount[${count}]" value="0">
                                                                    </td>
                                                                    <td>
                                                                        Rp. ${SET.positiveCurrency(parseFloat(v.unit_price) * (parseFloat(v.qty + _getMaxQty(data.returns, v.product_id))))}
                                                                        <input type="hidden" data-id="${count}" id="total_${count}" name="total[${count}]" value="${parseFloat(v.unit_price) * (parseFloat(v.qty + _getMaxQty(data.returns, v.product_id)))}" class="total">
                                                                    </td>
                                                                    <td>
                                                                        <div class="input-group mb-3">
                                                                            <div class="input-group-prepend">
                                                                                <span class="input-group-text" id="basic-addon1">Rp. </span>
                                                                            </div>
                                                                            <input type="number" min="0" value="0" name="total_return[${count}]" id="total_return_${count}" data-id="${count}" class="form-control total_return">
                                                                        </div>
                                                                    </td>
                                                                </tr>
                                                            `
                                                        }).join('')}
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
            `

            $('#main_content').html(html)
        },

        renderFormEdit: data => {

            let html = `
                <div class="row">
                    <div class="col-md-12">
                        <form id="form_edit">
                            <div class="row">
                                <div class="col-md-8">
                                    <div class="form-group">
                                        <label for="phone">Customer</label>
                                        <select class="form-control" id="contact_id" name="contact_id">
                                            <option value="" disabled="" selected="">-- Choose Customer --</option>
                                        </select>
                                    </div>
                                    <div class="form-group">
                                        <label for="phone">Selling</label>
                                        <select class="form-control" id="selling_id" name="selling_id">
                                            <option value="" disabled="" selected="">-- Choose Selling --</option>
                                        </select>
                                    </div>
                                    <div class="form-group row">
                                        <div class="col-md-6">
                                            <label for="fax">Return No</label>
                                            <input type="text" readonly placeholder="[ AUTO ]" value="${data.return_number}" class="form-control" name="return_number" id="return_number">
                                        </div>
                                        <div class="col-md-6">
                                            <label for="fax">Reference No</label>
                                            <input type="text" class="form-control" name="reference_number" id="reference_number" value="${SET.filterNull(data.reference_number)}">
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <label for="fax">Date</label>
                                        <input type="date" class="form-control" name="date" id="date" value="${SET.filterNull(data.date)}">
                                    </div>
                                </div>
                                <div class="col-md-4">
                                    <div class="form-group">
                                        <label for="picture">Attachment</label>
                                        <input type="file" class="dropify" name="attachment" id="attachment" ${data.attachment === null ? '' : `data-default-file="${SET.apiURL()}selling_returns/file/${data.attachment}`}">
                                    </div>
                                </div>
                                <div class="col-md-12 mb-3">
                                    <!-- <div class="form-group text-right">
                                        <div class="custom-control custom-checkbox">
                                            <input type="checkbox" class="custom-control-input include_ppn" id="include_ppn">
                                            <label class="custom-control-label" for="include_ppn">Price Include PPN</label>
                                        </div>
                                    </div> -->
                                    <div class="table-responsive">
                                        <table class="table" id="t_add_products" style="overflow-x: scroll;">
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
                                                ${data.products.map(v => {

                                                    count += 1
                                                    let ppn_amount = parseFloat(((v.unit_price * v.qty) + v.discount_amount) * 10 / 100)

                                                    return `
                                                        <tr id="row_${count}">
                                                            <td>
                                                                <select name="product_id[${count}]" id="product_id_${count}" data-id="${count}" class="form-control product_id"  data-sid="${v.product_id}" data-sname="${v.description}" data-sunit="${v.unit}" data-sprice="${v.unit_price}" required>
                                                                    <option value="" disabled="" selected="">-- Choose Product --</option>
                                                                </select>
                                                                <input type="hidden" value="${v.description}" name="description[${count}]" id="description_${count}" data-id="${count}">
                                                            </td>
                                                            <td>
                                                                <div class="input-group mb-3">
                                                                    <div class="input-group-prepend">
                                                                        <span class="input-group-text" id="basic-addon1">Rp. </span>
                                                                    </div>
                                                                    <input type="number"  min="0" value="${v.unit_price}" name="unit_price[${count}]" id="unit_price_${count}" data-id="${count}" class="form-control unit_price">
                                                                </div>
                                                            </td>
                                                            <td>
                                                                <div class="input-group mb-3">
                                                                    <input type="number"  min="0" value="${v.qty}" name="qty[${count}]" id="qty_${count}" data-id="${count}" class="form-control qty" required>
                                                                    <div class="input-group-prepend">
                                                                        <input type="hidden" value="${v.unit}" name="unit[${count}]" id="unit_${count}" data-id="${count}" class="form-control">
                                                                        <span class="input-group-text" id="unit_text_${count}" data-id="${count}">${v.unit}</span>
                                                                    </div>
                                                                </div>
                                                            </td>
                                                            <td>
                                                                <div class="input-group mb-3">
                                                                    <input type="number"  min="0" value="${v.discount_percent !== null ? v.discount_percent : 0}" name="discount_percent[${count}]" id="discount_percent_${count}" data-id="${count}" class="form-control discount_percent">
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
                                                                    <input type="number"  min="0" value="${SET.positiveNumber(v.discount_amount)}" name="discount_amount[${count}]" id="discount_amount_${count}" data-id="${count}" class="form-control discount_amount">
                                                                </div>
                                                            </td>
                                                            <td>
                                                                <div class="text-center">
                                                                    <div class="custom-control custom-checkbox">
                                                                        <input type="checkbox" value="Y" class="custom-control-input ppn" id="ppn_${count}" name="ppn[${count}]" data-id="${count}" ${v.ppn === 'Y' ? 'checked' : ''}>
                                                                        <label class="custom-control-label" for="ppn_${count}"></label>
                                                                    </div>
                                                                    <input type="hidden" value="${v.ppn === 'Y' ? ppn_amount : 0}" data-id="${count}" id="ppn_amount_${count}" name="ppn_amount[${count}]" class="ppn_amount">
                                                                </div>
                                                            </td>
                                                            <td>
                                                                <div class="input-group mb-3">
                                                                    <div class="input-group-prepend">
                                                                        <span class="input-group-text" id="basic-addon1">Rp. </span>
                                                                    </div>
                                                                    <input type="number" min="0" value="${SET.positiveNumber(v.total)}" name="total[${count}]" id="total_${count}" data-id="${count}" class="form-control total">
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

const sellingReturnController = ((SET, DT, UI, LU) => {

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

    const _fetchSelling = (TOKEN, id, callback) => {
        $.ajax({
            url: `${SET.apiURL()}sellings/${id}`,
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

    const _onKeyupQty = () => {
        $('#t_add_products').on('keyup blur change input', '.qty', function () {
            let id = $(this).data('id')
            let thisVal = $(this).val()
            let unit_price = $('#unit_price_' + id).val()
            let discount_amount = $('#discount_amount_' + id).val()
            let total = (parseFloat(unit_price) * parseFloat(thisVal)) - parseFloat(discount_amount)
            let ppn_amount;

            if ($('#ppn_' + id).val() === 'Y') {
                ppn_amount = (total * 10) / 100
            } else {
                ppn_amount = 0
            }

            $('#ppn_amount_' + id).val(ppn_amount)
            $('#total_return_' + id).val(parseFloat(unit_price) * parseFloat(thisVal))

            _calculateAll()
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
                contact_id: 'required',
                return_number: 'required',
                date: 'required',
            },
            submitHandler: form => {
                $.ajax({
                    url: `${SET.apiURL()}selling_returns`,
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
                        location.hash = `#/selling_return/${res.results.id}`
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

    const _calculateAll = () => {
        let sub_total = 0;
        let discount = 0;
        let total_ppn = 0;

        $('.total').each(function () {
            let total = $(this).val();

            if (total !== '') {
                sub_total += parseFloat(total)
            }
        })

        $('.discount_amount').each(function () {
            let total = $(this).val();

            if (total !== '') {
                discount += parseFloat(total)
            }
        })

        $('.ppn_amount').each(function () {
            let total = $(this).val();

            if (total !== '') {
                total_ppn += parseFloat(total)
            }
        })

        $('#sub_total').val(sub_total).trigger('input')
        $('#sub_total_text').text(`Rp. ${SET.realCurrency(sub_total)}`)

        $('#total_ppn').val(total_ppn).trigger('input')
        $('#ppn_text').text(`Rp. ${SET.realCurrency(total_ppn)}`)

        $('#all_discount').val(discount).trigger('input')
        $('#all_discount_text').text(`Rp. ${SET.realCurrency(discount)}`)

        let total_dpp = parseFloat(sub_total) - parseFloat(discount);
        $('#total_dpp').val(total_dpp).trigger('input')
        $('#total_dpp_text').text(`Rp. ${SET.realCurrency(total_dpp)}`)

        let grand_total = parseFloat(total_dpp) + parseFloat(total_ppn)
        $('#grand_total').val(grand_total).trigger('input')
        $('#grand_total_text').text(`Rp. ${SET.realCurrency(grand_total)}`)
    }

    const _addObserver = (TOKEN) => {

        MutationObserver = window.MutationObserver || window.WebKitMutationObserver;

        let container = document.querySelector("#main_content")

        let observer = new MutationObserver(function (mutations, observer) {
            if (container.contains($('#form_add')[0])) {
                $('.dropify').dropify();

                _onKeyupQty()
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
                _calculateAllReturn()
            }
        })
    }

    const _onChangeCustomer = TOKEN => {
        $('#contact_id').on('select2:select', function (e) {
            let data = e.params.data

            $('#selling_id').select2({
                ajax: {
                    url: `${SET.apiURL()}sellings`,
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
                            customer: data.id
                        }

                        return query;
                    },
                    processResults: function (data) {
                        let filtered = [];

                        data.results.map(v => {
                            let obj = {
                                id: v.id,
                                text: v.selling_number,
                            }

                            filtered.push(obj)
                        })

                        return {
                            results: filtered
                        };
                    }
                }
            })

            $('#selling_id').removeAttr('disabled')
            $('#selling_id').val('').trigger('change')
        });
    }

    const _onChangeProduct = () => {
        $('#t_add_products').on('select2:select', '.product_id', function (e) {
            let data = e.params.data

            let id = $(this).data('id')

            $(`#description_${id}`).val(data.text)
            $(`#unit_price_${id}`).val(data.price).trigger('keyup')
            $(`#unit_${id}`).val(data.unit)
            $(`#unit_text_${id}`).text(data.unit)

            if ($('#ppn_' + id).is(':checked')) {
                let qty = $('#qty_' + id).val()
                let discount_amount = $('#discount_amount_' + id).val()
                let total = (parseFloat(data.price) * parseFloat(qty)) - parseFloat(discount_amount)
                let ppn_amount = (total * 10) / 100

                $('#ppn_amount_' + id).val(ppn_amount)
                $('#total_' + id).val(total)
            } else {
                $('#ppn_amount_' + id).val('0')
            }

            $('#discount_percent_' + id).trigger('keyup')

            _calculateAllReturn()
        });
    }

    const _onChangePpn = () => {
        $('#check_all_ppn').on('change', function () {
            if ($(this).is(':checked')) {
                $('.ppn').each(function () {
                    $('.ppn').attr('checked', true).trigger('change');
                })
            } else {
                $('.ppn').each(function () {
                    $('.ppn').attr('checked', false).trigger('change');
                })
            }

            _calculateAllReturn()
        });
    }

    const _onKeyupUnitPrice = () => {
        $('#t_add_products').on('keyup blur change input', '.unit_price', function () {
            let id = $(this).data('id')
            let thisVal = $(this).val()
            let qty = $('#qty_' + id).val()
            let discount_amount = $('#discount_amount_' + id).val()
            let total = (parseFloat(thisVal) * parseFloat(qty)) - parseFloat(discount_amount)
            let ppn_amount;

            if ($('#ppn_' + id).is(':checked')) {
                ppn_amount = (total * 10) / 100
            } else {
                ppn_amount = 0
            }

            $('#ppn_amount_' + id).val(ppn_amount)
            $('#total_' + id).val(total)

            $('#discount_percent_' + id).trigger('keyup')

            _calculateAllReturn()
        });
    }

    const _onKeyupQtyReturn = () => {
        $('#t_add_products').on('keyup blur change input', '.qty', function () {
            let id = $(this).data('id')
            let thisVal = $(this).val()
            let unit_price = $('#unit_price_' + id).val()
            let discount_amount = $('#discount_amount_' + id).val()
            let total = (parseFloat(unit_price) * parseFloat(thisVal)) - parseFloat(discount_amount)
            let ppn_amount;

            if ($('#ppn_' + id).is(':checked')) {
                ppn_amount = (total * 10) / 100
            } else {
                ppn_amount = 0
            }

            $('#ppn_amount_' + id).val(ppn_amount)
            $('#total_' + id).val(parseFloat(unit_price) * parseFloat(thisVal))

            $('#discount_percent_' + id).trigger('keyup')

            _calculateAllReturn()
        });
    }

    const _onPercentKeyup = () => {
        $('#t_add_products').on('keyup blur change input', '.discount_percent', function () {
            let id = $(this).data('id')
            let thisVal = $(this).val()

            let unit_price = $('#unit_price_' + id).val()
            let qty = $('#qty_' + id).val()
            let total = parseFloat(unit_price) * parseFloat(qty)

            let discount_amount = (parseFloat(total) * parseFloat(thisVal)) / 100

            $('#discount_amount_' + id).val(discount_amount).trigger('keyup')
        });
    }

    const _onKeyupDiscount = () => {
        $('#t_add_products').on('keyup blur change input', '.discount_amount', function () {
            let thisVal = $(this).val()
            let thisId = $(this).data('id')
            let ppn_amount;

            let unit_price = $('#unit_price_' + thisId).val()
            let qty = $('#qty_' + thisId).val()
            let total = (parseFloat(unit_price) * parseFloat(qty)) - thisVal;

            if ($('#ppn_' + thisId).is(':checked')) {
                ppn_amount = (total * 10) / 100
            } else {
                ppn_amount = 0
            }

            $('#ppn_amount_' + thisId).val(ppn_amount)

            _calculateAllReturn()
        })
    }

    const _onPpnCheck = () => {
        $('#t_add_products').on('change', '.ppn', function (event, state) {
            let ppn_amount;
            let id = $(this).data('id');

            let unit_price = $('#unit_price_' + id).val()
            let qty = $('#qty_' + id).val()
            let discount_amount = $('#discount_amount_' + id).val()
            let total = (parseFloat(unit_price) * parseFloat(qty)) - parseFloat(discount_amount)

            if ($(this).is(':checked')) {
                ppn_amount = (total * 10) / 100
            } else {
                ppn_amount = 0
            }

            $('#ppn_amount_' + id).val(ppn_amount)

            _calculateAllReturn()
        })
    }

    const _onKeyupTotal = () => {
        $('#t_add_products').on('keyup blur change input', '.total', function (event, state) {
            _calculateAllReturn()
        })
    }

    const _calculateAllReturn = () => {
        let sub_total = 0;
        let discount = 0;
        let total_ppn = 0;

        $('.total').each(function () {
            let total = $(this).val();

            if (total !== '') {
                sub_total += parseFloat(total)
            }
        })

        $('.discount_amount').each(function () {
            let total = $(this).val();

            if (total !== '') {
                discount += parseFloat(total)
            }
        })

        $('.ppn_amount').each(function () {
            let total = $(this).val();

            if (total !== '') {
                total_ppn += parseFloat(total)
            }
        })

        $('#sub_total').val(sub_total).trigger('input')
        $('#sub_total_text').text(`Rp. ${SET.realCurrency(sub_total)}`)

        $('#total_ppn').val(total_ppn).trigger('input')
        $('#ppn_text').text(`Rp. ${SET.realCurrency(total_ppn)}`)

        $('#all_discount').val(discount).trigger('input')
        $('#all_discount_text').text(`Rp. ${SET.realCurrency(discount)}`)

        let total_dpp = parseFloat(sub_total) - parseFloat(discount);
        $('#total_dpp').val(total_dpp).trigger('input')
        $('#total_dpp_text').text(`Rp. ${SET.realCurrency(total_dpp)}`)

        let grand_total = parseFloat(total_dpp) + parseFloat(total_ppn)
        $('#grand_total').val(grand_total).trigger('input')
        $('#grand_total_text').text(`Rp. ${SET.realCurrency(grand_total)}`)

    }

    const _editObserver = (TOKEN, id, returns) => {
        MutationObserver = window.MutationObserver || window.WebKitMutationObserver;

        let container = document.querySelector("#edit_container")

        let observer = new MutationObserver(function (mutations, observer) {
            if (container.contains($('#form_edit')[0])) {

                $('.dropify').dropify();

                $('#contact_id').select2({
                    ajax: {
                        url: `${SET.apiURL()}customers`,
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
                                type: 'Customer'
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

                let option = new Option(returns.contact.contact_name, returns.contact.id, true, true);
                $('#contact_id').append(option).trigger('change');

                $('#contact_id').trigger({
                    type: 'select2:select',
                    params: {
                        data: {
                            id: returns.contact.id,
                            text: returns.contact.contact_name,
                            email: returns.contact.email,
                            address: returns.contact.address
                        }
                    }
                });

                $('#selling_id').select2({
                    ajax: {
                        url: `${SET.apiURL()}sellings`,
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
                                customer: returns.contact.id
                            }

                            return query;
                        },
                        processResults: function (data) {
                            let filtered = [];

                            data.results.map(v => {
                                let obj = {
                                    id: v.id,
                                    text: v.selling_number,
                                }

                                filtered.push(obj)
                            })

                            return {
                                results: filtered
                            };
                        }
                    }
                })

                if(returns.selling !== null) {
                    let option2 = new Option(returns.selling.selling_number, returns.selling.id, true, true);
                    $('#selling_id').append(option2).trigger('change');

                    $('#selling_id').trigger({
                        type: 'select2:select',
                        params: {
                            data: {
                                id: returns.selling.id,
                                text: returns.selling.selling_number
                            }
                        }
                    });
                }

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
                                        price: v.selling_price,
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

                    $(this).trigger({
                        type: 'select2:select',
                        params: {
                            data: data
                        }
                    });

                    $(this).on('select2:open', () => {
                        $(".select2-results:not(:has(a))").prepend('<a href="javascript:void(0)" data-id="' + myId + '" class="select2_add_product" style="padding: 6px;height: 20px;display: inline-table;">Create new item</a>');
                    })

                })


                LU.lookupProduct(TOKEN, 'selling')
                LU.lookupCustomer(TOKEN)

                _calculateAll()
                _onChangeCustomer(TOKEN)
                _addRow(TOKEN)
                _onChangeProduct()
                _removeRow()
                _onChangePpn()
                _onKeyupUnitPrice()
                _onKeyupQtyReturn()
                _onPercentKeyup()
                _onKeyupDiscount()
                _onPpnCheck()
                _onKeyupTotal()


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
                selling_number: 'required',
                date: 'required',
            },
            submitHandler: form => {
                $.ajax({
                    url: `${SET.apiURL()}selling_returns/${id}`,
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
                        location.hash = `#/selling_return/${res.results.id}`
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
                                location.hash = '#/selling_return/add'
                            },
                            titleAttr: 'Add'
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
                                <a href="#/selling_return/${row.id}">${row.return_number}</a>
                            `;
                        }
                    },
                    {
                        data: "contact",
                        render: function (data, type, row) {
                            return `
                                <a href="#/customer/${row.contact.id}">${row.contact.contact_name}</a>
                                ${row.selling !== null ? `<div><small><a href="#/selling/${row.selling.id}">${row.selling.selling_number}</a></small></div>` : '<div>Penjualan</div>'}
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
                footerCallback: function () {
                    let api = this.api()
                    let filtered = api.rows({ search: 'applied' }).data()
                    let data = api.rows().data()

                    let filtered_sum_total = filtered.reduce((a, b) => a + b.grand_total, 0);
                    let filtered_sum_ppn = filtered.reduce((a, b) => a + b.total_ppn, 0);
                    let filtered_sum_discount = filtered.reduce((a, b) => a + SET.replaceNullToZero(b.total_discount), 0);

                    let sum_total = data.reduce((a, b) => a + b.grand_total, 0);
                    let sum_ppn = data.reduce((a, b) => a + b.total_ppn, 0);
                    let sum_discount = data.reduce((a, b) => a + SET.replaceNullToZero(b.total_discount), 0);

                    let filtered_grand_total = parseFloat(filtered_sum_total) + parseFloat(filtered_sum_ppn) + parseFloat(filtered_sum_discount)
                    let grand_total = parseFloat(sum_total) + parseFloat(sum_ppn) + parseFloat(sum_discount)

                    $(api.column(1).footer()).html(
                        `<b>
                            Filtered Total : Rp. ${SET.positiveCurrency(filtered_grand_total)} <br />
                            Grand Total : Rp. ${SET.positiveCurrency(grand_total)}
                        </b>`
                    );
                },
                order: [[2, "desc"]]
            })

            DT.dtFilter(table)
            DT.dtFilterRange(table, 2)

            _openDelete('#t_returns')
            _submitDelete(TOKEN, data => {
                table.ajax.reload()
                $('#modal_delete').modal('hide')
            })
        },

        addWithSelling: (TOKEN, id) => {
            UI.resetCount()

            _fetchSelling(TOKEN, id, data => {
                _addObserver(TOKEN, data)
                UI.renderFormAdd(data)
            })

        },

        detail: (TOKEN, id) => {

            _fetchCustomerReturn(TOKEN, id, data => {
                UI.renderDetail(data)
            })

            _printAll()
            _openDelete('#detail_container')
            _submitDelete(TOKEN, data => {
                location.hash = '#/customer_return'
            })
        },

        add: TOKEN => {
            UI.resetCount()

            $('.dropify').dropify();

            $('#contact_id').select2({
                ajax: {
                    url: `${SET.apiURL()}customers`,
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
                            type: 'Customer'
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

            $('#selling_id').select2()

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
                                price: v.selling_price,
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

            $('#contact_id').on('select2:open', () => {
                $(".select2-results:not(:has(a))").prepend('<a href="javascript:void(0)" class="select2_add_customer" style="padding: 6px;height: 20px;display: inline-table;">Create new item</a>');
            })

            $('#product_id_0').on('select2:open', () => {
                $(".select2-results:not(:has(a))").prepend('<a href="javascript:void(0)" class="select2_add_product" data-id="0" style="padding: 6px;height: 20px;display: inline-table;">Create new item</a>');
            })

            LU.lookupProduct(TOKEN, 'selling')
            LU.lookupCustomer(TOKEN)

            _onChangeCustomer(TOKEN)
            _addRow(TOKEN)
            _onChangeProduct()
            _removeRow()
            _onChangePpn()
            _onKeyupUnitPrice()
            _onKeyupQtyReturn()
            _onPercentKeyup()
            _onKeyupDiscount()
            _onPpnCheck()
            _onKeyupTotal()

            _submitAdd(TOKEN)

        },

        edit: (TOKEN, id) => {
            UI.resetCount()

            _fetchCustomerReturn(TOKEN, id, data => {
                _editObserver(TOKEN, id, data)
                UI.renderFormEdit(data)
            })
        }
    }
})(settingController, dtController, sellingReturnUI, lookupController)

export default sellingReturnController