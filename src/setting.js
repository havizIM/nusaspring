const settingController = (() => {

    return {
        baseURL: () => {
            const PROTOCOL = window.location.protocol
            const HOST = window.location.host
            const PATH = HOST === 'localhost' ? 'nusaspring/' : ''
            const BASE_URL = `${PROTOCOL}//${HOST}/${PATH}`

            return BASE_URL
        },

        apiURL: () => {
            const ENV = 'DEVELOPMENT';

            if(ENV === 'DEVELOPMENT'){
                return 'http://localhost/nusaspring-api/public/api/'
            } else {
                return 'http://localhost/nusaspring-api/public/api/'
            }
        },

        contentLoader: container => {
            $(container).block({
                message: `
                    <div class="loader-wrapper">
                      <div class="loader-container">
                        <div class="ball-pulse loader-primary">
                          <div></div>
                          <div></div>
                          <div></div>
                        </div>
                      </div>
                    </div>
                `,
                overlayCSS: {
                    backgroundColor: '#fff',
                    opacity: 0.8,
                    cursor: 'wait'
                },
                css: {
                    border: 0,
                    padding: 0,
                    backgroundColor: 'transparent'
                }
            });
        }, 

        buttonLoader: btn => {
            $(btn).block({
                message: `
                    <div class="loader-wrapper">
                      <div class="loader-container">
                        <div class="ball-clip-rotate loader-primary">
                          <div></div>
                        </div>
                      </div>
                    </div>
                `,
                overlayCSS: {
                    backgroundColor: '#fff',
                    opacity: 0.8,
                    cursor: 'wait'
                },
                css: {
                    border: 0,
                    padding: 0,
                    backgroundColor: 'transparent'
                }
            });
        },

        pageLoader: () => {
            $.blockUI({
                message: `
                    <div class="loader-wrapper">
                      <div class="loader-container">
                        <div class="ball-grid-pulse loader-primary">
                          <div></div>
                          <div></div>
                          <div></div>
                          <div></div>
                          <div></div>
                          <div></div>
                          <div></div>
                          <div></div>
                          <div></div>
                        </div>
                      </div>
                    </div>
                `,
                overlayCSS: {
                    backgroundColor: '#fff',
                    opacity: 0.8,
                    cursor: 'wait'
                },
                css: {
                    border: 0,
                    padding: 0,
                    backgroundColor: 'transparent'
                }
            })
        },

        closePageLoader: () => {
            $.unblockUI()
        },

        closeSelectedElement: el => {
            $(el).unblock()
        },

        dtLanguage: () => {
            const PROTOCOL = window.location.protocol
            const HOST = window.location.host
            const PATH = HOST === 'localhost' ? 'nusaspring/' : ''
            const BASE_URL = `${PROTOCOL}//${HOST}/${PATH}`

            return {
                "search": "Quick Search:",
                zeroRecords: function () {
                    return `
                        <div class="text-center">
                            <img class="img-fluid" style="width: 25%;" src="${BASE_URL}/assets/images/no_data.svg">
                            <div>No Data Found</div>
                        </div>`
                },
                loadingRecords: `
                    <div style="padding-top: 12%;">
                        <div class="loader-wrapper">
                            <div class="loader-container">
                                <div class="line-spin-fade-loader loader-blue">
                                <div></div>
                                <div></div>
                                <div></div>
                                <div></div>
                                <div></div>
                                <div></div>
                                <div></div>
                                <div></div>
                                </div>
                            </div>
                            </div>
                    </div>
                `,
                processing: `
                    <div style="padding-top: 12%;">
                        <div class="loader-wrapper">
                            <div class="loader-container">
                                <div class="line-spin-fade-loader loader-blue">
                                <div></div>
                                <div></div>
                                <div></div>
                                <div></div>
                                <div></div>
                                <div></div>
                                <div></div>
                                <div></div>
                                </div>
                            </div>
                            </div>
                    </div>
                `,
                infoFiltered: ""
            }
        },
        
        clearModal: () => {
            $(window).on('hashchange', function () {
                let modal = $('.modal').hasClass('open');

                if (modal) {

                }
            })
        },
        positiveNumber: num => {
            return Math.abs(num)
        },
        negativeNumber: num => {
            return Math.abs(num) * -1
        },
        realCurrency: num => {
            return parseFloat(num).toLocaleString(['ban', 'id'])
        },
        positiveCurrency: num => {
            return Math.abs(num).toLocaleString(['ban', 'id'])
        },
        negativeCurrency: num => {
            let new_num = Math.abs(num) * -1

            new_num.toLocaleString(['ban', 'id'])
        },
        replaceEnter: text => {
            return text.replace(/(\r\n|\n|\r)/gm, '<br>')
        },
        filterNull: text => {
            if (text === null) {
                return ''
            } else {
                return text;
            }
        },
        replaceNull: text => {
            if (text === null) {
                return '-'
            } else {
                return text;
            }
        },
        replaceNullToZero: text => {
            if (text === null) {
                return 0
            } else {
                return text;
            }
        }
    }
})()

const dtController = (() => {

    const _filterEvent = table => {
        $('#form_filter').on('submit', function (e) {
            e.preventDefault()

            $('.filter-data').each(function () {
                let index = $(this).data('column')

                table.column(index).search(
                    $(`#col-${index}-filter`).val()
                )
            })

            $('#modal_search').modal('hide')
            table.draw()
        })
    }

    const _resetFilter = table => {
        $('#btn_reset').on('click', function () {
            $('.filter-data').each(function () {
                let index = $(this).data('column')

                $(this).val('')
                table.column(index).search('')
            })

            table.draw()
        })
    }

    const _resetFilterRange = table => {
        $('#btn_reset_range').on('click', function () {
            $('.range-data').each(function () {
                $(this).val('')
            })

            table.draw()
        })
    }

    return {
        dtFilter: table => {
            _filterEvent(table);
            _resetFilter(table);
        },
        dtFilterRange: (table, index) => {
            $('#form_range').on('submit', function (e) {
                e.preventDefault()

                $.fn.dataTable.ext.search.push(
                    function (settings, data, dataIndex) {
                        let min = $('#start_date').val();
                        let max = $('#end_date').val();
                        let startDate = new Date(data[index]);

                        if (min == '' && max == '') return true;
                        if (min == '' && startDate <= new Date(max)) return true;
                        if (max == '' && startDate >= new Date(min)) return true;
                        if (startDate <= new Date(max) && startDate >= new Date(min)) return true;
                        return false;
                    }
                );

                $('#modal_range').modal('hide')
                table.draw()

                _resetFilterRange(table)
            })
        },
        dtLanguage: () => {
            return {
                "search": "Quick Search:",
                zeroRecords: function () {
                    return `
                        <div class="text-center">
                            <img class="img-fluid" style="width: 25%;" src="${BASE_URL}/assets/image/no_data.svg">
                        </div>`
                },
                loadingRecords: `
                    <div class="loader-wrapper">
                      <div class="loader-container">
                        <div class="line-spin-fade-loader loader-blue">
                          <div></div>
                          <div></div>
                          <div></div>
                          <div></div>
                          <div></div>
                          <div></div>
                          <div></div>
                          <div></div>
                        </div>
                      </div>
                    </div>
                `,
                infoFiltered: ""
            }
        },
        dtAjax: (TOKEN, path, param, resError) => {
            return {
                url: path,
                data: param,
                type: "GET",
                dataType: "JSON",
                beforeSend: function (xhr) {
                    xhr.setRequestHeader("Accept", "application/json");
                    xhr.setRequestHeader('Authorization', `Bearer ${TOKEN}`);
                },
                error: function (err) {
                    resError(err);
                }
            }
        },
        dtAjaxSrc: (TOKEN, path, param, callback, resError) => {
            return {
                url: path,
                data: param,
                type: "GET",
                dataType: "JSON",
                beforeSend: function (xhr) {
                    xhr.setRequestHeader("Accept", "application/json");
                    xhr.setRequestHeader('Authorization', `Bearer ${TOKEN}`);
                },
                dataSrc: function (res) {
                    return callback(res);
                },
                error: function (err) {
                    resError(err)
                }
            }
        }
    }
})()

const lookupController = ((SET) => {

    const _openAddProduct = (callback) => {
        $(document).on('click', '.select2_add_product', function () {
            let id = $(this).data('id')

            $('#form_add_product')[0].reset()
            $('#modal_add_product').modal('show')
            $('#product_id_' + id).select2('close')

            callback(id)
        })
    }

    const _openAddCustomer = (callback) => {
        $(document).on('click', '.select2_add_customer', function () {
            $('#form_add_customer')[0].reset()
            $('#modal_add_customer').modal('show')
            $('#contact_id').select2('close')
            callback()
        })
    }

    const _openAddSupplier = (callback) => {
        $(document).on('click', '.select2_add_supplier', function () {
            $('#form_add_supplier')[0].reset()
            $('#modal_add_supplier').modal('show')
            $('#contact_id').select2('close')
            callback()
        })
    }

    const _submitAddProduct = (TOKEN, type, id) => {
        $('#form_add_product').validate({
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
                        
                        let option = new Option(res.results.product_name, res.results.id, true, true);
                        $('#product_id_'+id).append(option).trigger('change');

                        $('#product_id_' + id).trigger({
                            type: 'select2:select',
                            params: {
                                data: {
                                    id: res.results.id,
                                    text: res.results.product_name,
                                    price: type === 'purchase' ? res.results.purchase_price : res.results.selling_price,
                                    unit: res.results.unit === null ? null : res.results.unit.unit_name
                                }
                            }
                        });

                        
                        $('#modal_add_product').modal('hide')
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
    
    const _submitAddCustomer = (TOKEN, id) => {
        $('#form_add_customer').validate({
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
                address: 'required'
            },
            submitHandler: form => {
                $.ajax({
                    url: `${SET.apiURL()}customers`,
                    type: 'POST',
                    dataType: 'JSON',
                    data: $(form).serialize(),
                    beforeSend: xhr => {
                        xhr.setRequestHeader("Authorization", "Bearer " + TOKEN)

                        SET.contentLoader('.modal-content')
                    },
                    success: res => {
                        toastr.success(res.message, 'Success', { "progressBar": true, "closeButton": true, "positionClass": 'toast-bottom-right' });
                        
                        let option = new Option(res.results.contact_name, res.results.id, true, true);
                        $('#contact_id').append(option).trigger('change');

                        $('#contact_id').trigger({
                            type: 'select2:select',
                            params: {
                                data: {
                                    id: res.results.id,
                                    text: res.results.contact_name,
                                    email: res.results.email,
                                    address: res.results.address,
                                }
                            }
                        });

                        $('#modal_add_customer').modal('hide')
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

    const _submitAddSupplier = TOKEN => {
        $('#form_add_supplier').validate({
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
                address: 'required'
            },
            submitHandler: form => {
                $.ajax({
                    url: `${SET.apiURL()}suppliers`,
                    type: 'POST',
                    dataType: 'JSON',
                    data: $(form).serialize(),
                    beforeSend: xhr => {
                        xhr.setRequestHeader("Authorization", "Bearer " + TOKEN)

                        SET.contentLoader('.modal-content')
                    },
                    success: res => {
                        toastr.success(res.message, 'Success', { "progressBar": true, "closeButton": true, "positionClass": 'toast-bottom-right' });
                        
                        let option = new Option(res.results.contact_name, res.results.id, true, true);
                        $('#contact_id').append(option).trigger('change');

                        $('#contact_id').trigger({
                            type: 'select2:select',
                            params: {
                                data: {
                                    id: res.results.id,
                                    text: res.results.contact_name,
                                    email: res.results.email,
                                    address: res.results.address,
                                }
                            }
                        });

                        $('#modal_add_supplier').modal('hide')
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

    const _addCategory = TOKEN => {
        $('#modal_add_product').on('click', '.select2_add_category', function () {
            let name = $(this).data('name')

            $.ajax({
                url: `${SET.apiURL()}categories`,
                type: 'POST',
                dataType: 'JSON',
                data: {
                    category_name: name
                },
                beforeSend: xhr => {
                    xhr.setRequestHeader("Authorization", "Bearer " + TOKEN)
                },
                success: res => {
                    $("#category_id").select2("close");

                    let option = new Option(res.results.category_name, res.results.id, true, true);
                    $('#category_id').append(option).trigger('change');

                    // manually trigger the `select2:select` event
                    $('#category_id').trigger({
                        type: 'select2:select',
                        params: {
                            data: {
                                id: res.results.id,
                                text: res.results.category_name
                            }
                        }
                    });

                    toastr.success(res.message, 'Success', { "progressBar": true, "closeButton": true, "positionClass": 'toast-bottom-right' });
                },
                error: ({ responseJSON }) => {
                    toastr.error(responseJSON.message, 'Failed', { "progressBar": true, "closeButton": true, "positionClass": 'toast-bottom-right' });
                }
            })
        })
    }

    const _addUnit = TOKEN => {
        $('#modal_add_product').on('click', '.select2_add_unit', function () {
            let name = $(this).data('name')

            $.ajax({
                url: `${SET.apiURL()}units`,
                type: 'POST',
                dataType: 'JSON',
                data: {
                    unit_name: name
                },
                beforeSend: xhr => {
                    xhr.setRequestHeader("Authorization", "Bearer " + TOKEN)
                },
                success: res => {
                    $("#unit_id").select2("close");

                    let option = new Option(res.results.unit_name, res.results.id, true, true);
                    $('#unit_id').append(option).trigger('change');

                    // manually trigger the `select2:select` event
                    $('#unit_id').trigger({
                        type: 'select2:select',
                        params: {
                            data: {
                                id: res.results.id,
                                text: res.results.unit_name
                            }
                        }
                    });

                    toastr.success(res.message, 'Success', { "progressBar": true, "closeButton": true, "positionClass": 'toast-bottom-right' });
                },
                error: ({ responseJSON }) => {
                    toastr.error(responseJSON.message, 'Failed', { "progressBar": true, "closeButton": true, "positionClass": 'toast-bottom-right' });
                }
            })
        })
    }

    return {
        lookupProduct: (TOKEN, type) => {
            _openAddProduct(id => {
                
                $('#category_id').select2({
                    dropdownParent: $('#modal_add_product'),
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
                    dropdownParent: $('#modal_add_product'),
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

                _addCategory(TOKEN)
                _addUnit(TOKEN)

                _submitAddProduct(TOKEN, type, id)
            })
        },
        lookupCustomer: TOKEN => {
            _openAddCustomer(() => {
                _submitAddCustomer(TOKEN)
            })
        },
        lookupSupplier: TOKEN => {
            _openAddSupplier(() => {
                _submitAddSupplier(TOKEN)
            })
        }
    }
})(settingController)