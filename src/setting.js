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
                    <i class="fas fa-spin fa-sync text-white"></i>
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
                    <i class="fas fa-spin fa-sync text-white"></i>
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
                    <i class="fas fa-spin fa-sync text-white fa-5x"></i>
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