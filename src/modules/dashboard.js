const dashboardContoller = ((SET) => {

    const _fetchBussinessAnalytic = (TOKEN, filter, callback) => {
        $.ajax({
            url: `${SET.apiURL()}analytics/bussiness/${filter}`,
            type: 'GET',
            dataType: 'JSON',
            beforeSend: xhr => {
                xhr.setRequestHeader("Authorization", "Bearer " + TOKEN)

                SET.contentLoader('#bussiness_container')
            },
            success: res => {
                callback(res.results)
            },
            error: ({ responseJSON }) => {
                toastr.error(responseJSON.message, 'Failed', { "progressBar": true, "closeButton": true, "positionClass": 'toast-bottom-right' });
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
            complete: () => {
                SET.closeSelectedElement('#bussiness_container')
            }
        })
    }

    const _fetchTopTen = (TOKEN, filter, callback) => {
        $.ajax({
            url: `${SET.apiURL()}analytics/top_ten/${filter}`,
            type: 'GET',
            dataType: 'JSON',
            beforeSend: xhr => {
                xhr.setRequestHeader("Authorization", "Bearer " + TOKEN)

                SET.contentLoader('#top_10_container')
            },
            success: res => {
                callback(res.results)
            },
            error: ({ responseJSON }) => {
                toastr.error(responseJSON.message, 'Failed', { "progressBar": true, "closeButton": true, "positionClass": 'toast-bottom-right' });
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
            complete: () => {
                SET.closeSelectedElement('#top_10_container')
            }
        })
    }

    const _fetchPurchases = (TOKEN, callback) => {
        $.ajax({
            url: `${SET.apiURL()}purchases`,
            type: 'GET',
            dataType: 'JSON',
            beforeSend: xhr => {
                xhr.setRequestHeader("Authorization", "Bearer " + TOKEN)

                SET.contentLoader('#debt_container')
            },
            success: res => {
                callback(res.results)
            },
            error: ({ responseJSON }) => {
                toastr.error(responseJSON.message, 'Failed', { "progressBar": true, "closeButton": true, "positionClass": 'toast-bottom-right' });
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
            complete: () => {
                SET.closeSelectedElement('#debt_container')
            }
        })
    }

    const _fetchSellings = (TOKEN, callback) => {
        $.ajax({
            url: `${SET.apiURL()}sellings`,
            type: 'GET',
            dataType: 'JSON',
            beforeSend: xhr => {
                xhr.setRequestHeader("Authorization", "Bearer " + TOKEN)

                SET.contentLoader('#receiveable_container')
            },
            success: res => {
                callback(res.results)
            },
            error: ({ responseJSON }) => {
                toastr.error(responseJSON.message, 'Failed', { "progressBar": true, "closeButton": true, "positionClass": 'toast-bottom-right' });
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
            complete: () => {
                SET.closeSelectedElement('#receiveable_container')
            }
        })
    }

    const _getYears = function () {
        let html = '';
        let currentYear = new Date().getFullYear() + 1;
        let startYear = currentYear - 2;

        while (currentYear >= startYear) {
            currentYear--

            html += `
                <option value="${currentYear}">${currentYear}</option>
            `
        }

        $('#bussiness_filter').html(html)

    }

    const _onChangeEvent = (TOKEN, BUSSINESS_CHART) => {
        $('#bussiness_filter').on('change', function(){
            let filter = $(this).val()

            _fetchBussinessAnalytic(TOKEN, filter, data => {
                BUSSINESS_CHART.data.datasets[0].data = data.purchase.total
                BUSSINESS_CHART.data.datasets[1].data = data.selling.total
                BUSSINESS_CHART.update()
            })
        })

        $('#top_10_filter').on('change', function(){
            let filter = $(this).val()

            _fetchTopTen(TOKEN, filter, data => {
                if (data.length === 0) {

                } else {
                    let html = ''

                    data.forEach(v => {
                        html += `
                            <tr>
                                <td><a href="#/product/${v.product_id}">${v.product_name}</a></td>
                                <td>${SET.positiveNumber(v.qtyKey)}</td>
                                <td>Rp. ${SET.positiveCurrency(v.totalKey)}</td>
                            </tr>
                        `
                    })

                    $('#t_top_10 tbody').html(html)
                }
            })
        })
    }

    return {
        init: TOKEN => {
            _getYears()

            let bussiness = $('#bussiness_filter').val()
            let top_10 = $('#top_10_filter').val()

            const BUSSINESS_CHART = new Chart(document.getElementById('bussiness_chart').getContext('2d'), {
                type: 'line',
                data: {
                    labels: [
                        'Jan',
                        'Feb',
                        'Mar',
                        'Apr',
                        'May',
                        'Jun',
                        'Jul',
                        'Aug',
                        'Sep',
                        'Oct',
                        'Nov',
                        'Dec',
                    ],
                    datasets: [{
                        label: 'Purchase',
                        data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                        borderColor: "rgba(0, 176, 228, 0.75)",
                        backgroundColor: "transparent",
                        pointBorderColor: "rgba(0, 176, 228, 0)",
                        pointBackgroundColor: "rgba(0, 176, 228, 0.9)",
                        pointBorderWidth: 1,
                    }, {
                        label: 'Selling',
                        data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                        borderColor: "rgba(255, 178, 43, 0.75)",
                        backgroundColor: "transparent",
                        pointBorderColor: "rgba(255, 178, 43, 0)",
                        pointBackgroundColor: "rgba(255, 178, 43, 0.9)",
                        pointBorderWidth: 1,
                    }],
                },
                options: {
                    responsive: true,
                    legend: {
                        display: true,
                    },
                },
            });

            const DEBT_CHART = new Chart(document.getElementById('debt_chart').getContext('2d'), {
                type: 'doughnut',
                data: {
                    labels: ['Purchase', 'Payment'],
                    datasets: [{
                        data: [0, 0],
                        backgroundColor: [
                            "rgba(0, 176, 228, 0.75)",
                            "green"
                        ]
                    }],
                },

                options: {
                    legend: {
                        display: true,
                    },
                    responsive: true,
                    tooltips: {
                        enabled: true,
                    }
                }
            });

            const RECEIVEABLE_CHART = new Chart(document.getElementById('receiveable_chart').getContext('2d'), {
                type: 'doughnut',
                data: {
                    labels: ['Selling', 'Payment'],
                    datasets: [{
                        data: [0, 0],
                        backgroundColor: [
                            "rgba(255, 178, 43, 0.75)",
                            "green"
                        ]
                    }],
                },

                options: {
                    legend: {
                        display: true,
                    },
                    responsive: true,
                    tooltips: {
                        enabled: true,
                    }
                }
            });

            _fetchBussinessAnalytic(TOKEN, bussiness, data => {
                BUSSINESS_CHART.data.datasets[0].data = data.purchase.total
                BUSSINESS_CHART.data.datasets[1].data = data.selling.total
                BUSSINESS_CHART.update()
            })

            _fetchPurchases(TOKEN, data => {
                let sum_purchase = data.reduce((a, b) => a + b.grand_total, 0);
                let sum_ppn = data.reduce((a, b) => a + b.total_ppn, 0);
                let sum_discount = data.reduce((a, b) => a + SET.replaceNullToZero(b.total_discount), 0);

                let sum_return = data.reduce((a, b) => a + b.total_return, 0);
                let sum_return_ppn = data.reduce((a, b) => a + b.total_ppn_return, 0);
                let sum_return_discount = data.reduce((a, b) => a + b.total_return_discount, 0);

                let sum_payment = data.reduce((a, b) => a + b.total_payment, 0);
                let sum_total = parseFloat(sum_purchase) + parseFloat(sum_ppn) + parseFloat(sum_discount) + parseFloat(sum_return) + parseFloat(sum_return_ppn) + parseFloat(sum_return_discount)

                DEBT_CHART.data.datasets[0].data = [Math.abs(sum_total), Math.abs(sum_payment)]

                DEBT_CHART.update()
            })

            _fetchSellings(TOKEN, data => {

                let sum_selling = data.reduce((a, b) => a + b.grand_total, 0);
                let sum_ppn = data.reduce((a, b) => a + b.total_ppn, 0);
                let sum_discount = data.reduce((a, b) => a + SET.replaceNullToZero(b.total_discount), 0);

                let sum_return = data.reduce((a, b) => a + b.total_return, 0);
                let sum_return_ppn = data.reduce((a, b) => a + b.total_ppn_return, 0);
                let sum_return_discount = data.reduce((a, b) => a + b.total_return_discount, 0);

                let sum_payment = data.reduce((a, b) => a + b.total_payment, 0);
                let sum_total = parseFloat(sum_selling) + parseFloat(sum_ppn) + parseFloat(sum_discount) + parseFloat(sum_return) + parseFloat(sum_return_ppn) + parseFloat(sum_return_discount)

                RECEIVEABLE_CHART.data.datasets[0].data = [Math.abs(sum_total), Math.abs(sum_payment)]

                RECEIVEABLE_CHART.update()
            })

            _fetchTopTen(TOKEN, top_10, data => {

                let html = ''

                if(data.length === 0){
                    html = `
                        <tr>
                            <td colspan="3" class="text-center"><h4>Data Not Found</h4></td>
                        </tr>
                    `
                } else {

                    data.forEach(v => {
                        html += `
                            <tr>
                                <td><a href="#/product/${v.product_id}">${v.product_name}</a></td>
                                <td>${SET.positiveNumber(v.qtyKey)}</td>
                                <td>Rp. ${SET.positiveCurrency(v.totalKey)}</td>
                            </tr>
                        `
                    })
                }

                $('#t_top_10 tbody').html(html)
            })

            _onChangeEvent(TOKEN, BUSSINESS_CHART)
        }
    }
})(settingController)

export default dashboardContoller