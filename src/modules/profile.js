const profileUI = ((SET) => {
    return {
        renderError: err => {

        },
        renderLog: data => {
            let html = `
                <ul class="timeline timeline-left">
                    ${data.map(v => {
                        return `
                            <li class="timeline-inverted timeline-item">
                                <div class="timeline-badge info"><i class="fa fa-check"></i> </div>
                                <div class="timeline-panel">
                                    <a href="${v.url}">
                                        <div class="timeline-heading">
                                            <h4 class="timeline-title">${v.description}</h4>
                                        </div>
                                        <div class="timeline-body">
                                            <p>${v.created_at}</p>
                                        </div>
                                    </a>
                                </div>
                            </li>
                        `
                    }).join('')}
                </ul>
            `

            $('#log_container').html(html)
        },
        renderNoData: () => {
            let html = `
                <div class="text-center">
                    <i class="fa far fa-list-alt fa-5x mb-3"></i>
                    <h1>Not Found</h1>
                    <h4>Data tidak ditemukan</h4>
                </div>
            `

            $('#log_container').html(html)
        }
    }
})(settingController)

const profileController = ((SET, UI) => {

    const _fetchProfile = TOKEN => {
        $.ajax({
            url: `${SET.apiURL()}setting/profile`,
            type: 'GET',
            dataType: 'JSON',
            beforeSend: xhr => {
                xhr.setRequestHeader("Authorization", "Bearer " + TOKEN)

                SET.contentLoader('#task_container')
            },
            success: ({ results }) => {
                $('#profile_name').text(results.name)
                $('#profile_roles').text(results.roles)
                $('#profile_phone').text(SET.replaceNull(results.phone))
                $('#profile_address').text(SET.replaceNull(results.address))
                $('#profile_email').text(SET.replaceNull(results.email))

                if(results.logs.length === 0){
                    UI.renderNoData()
                } else {
                    UI.renderLog(results.logs)
                }
            },
            error: ({ responseJSON }) => {
                UI.renderError()
                toastr.error(responseJSON.message, 'Failed', { "progressBar": true, "closeButton": true, "positionClass": 'toast-bottom-right' });
            },
            complete: () => {
                SET.closeSelectedElement('#task_container')
            }
        })
    }

    const _submitPassword = TOKEN => {
        $('#form_password').validate({
            errorClass: 'is-invalid',
            successClass: 'is-valid',
            validClass: 'is-valid',
            errorElement: 'div',
            errorPlacement: function (error, element) {
                error.addClass('invalid-feedback');
                error.insertAfter(element)
            },
            rules: {
                old_password: 'required',
                new_password: 'required',
                retype_password: 'required',
            },
            submitHandler: form => {
                $.ajax({
                    url: `${SET.apiURL()}setting/change_password`,
                    type: 'POST',
                    dataType: 'JSON',
                    data: $(form).serialize(),
                    beforeSend: xhr => {
                        xhr.setRequestHeader("Authorization", "Bearer " + TOKEN)

                        SET.contentLoader('#add_container')
                    },
                    success: res => {
                        toastr.success(res.message, 'Success', { "progressBar": true, "closeButton": true, "positionClass": 'toast-bottom-right' });
                        $('#form_password')[0].reset()
                        _fetchProfile(TOKEN)
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

    const _backupDatabase = TOKEN => {
        $('#btn_backup').on('click', function(){
            $.ajax({
                url: `${SET.apiURL()}export/database`,
                type: 'GET',
                dataType: 'JSON',
                beforeSend: xhr => {
                    xhr.setRequestHeader("Authorization", "Bearer " + TOKEN)

                    SET.buttonLoader('#btn_backup')
                },
                success: res => {
                    toastr.success(res.message, 'Success', { "progressBar": true, "closeButton": true, "positionClass": 'toast-bottom-right' });
                    _fetchProfile(TOKEN)
                },
                error: ({ responseJSON }) => {
                    toastr.error(responseJSON.message, 'Failed', { "progressBar": true, "closeButton": true, "positionClass": 'toast-bottom-right' });
                },
                complete: () => {
                    SET.closeSelectedElement('#btn_backup')
                }
            })
        })
    }

    const _showPassword = () => {
        $('.show-pass').on('click', function () {
            if ($(this).is(':checked')) {
                $('#old_password').attr('type', 'text');
                $('#new_password').attr('type', 'text');
                $('#retype_password').attr('type', 'text');
            } else {
                $('#old_password').attr('type', 'password');
                $('#new_password').attr('type', 'password');
                $('#retype_password').attr('type', 'password');
            }
        })
    }

    return {
        init: TOKEN => {
            _fetchProfile(TOKEN)
            _submitPassword(TOKEN)
            _backupDatabase(TOKEN)
            _showPassword()
        }
    }
})(settingController, profileUI)

export default profileController