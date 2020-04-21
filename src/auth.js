const authController = ((SET) => {
    
    const _submitLogin = () => {
        $('#form_login').validate({
            errorClass: 'is-invalid',
            successClass: 'is-valid',
            validClass: 'is-valid',
            errorElement: 'div',
            errorPlacement: function (error, element) {
                error.addClass('invalid-feedback');
                error.insertAfter(element)
            },
            rules: {
                username: 'required',
                password: 'required'  
            },
            submitHandler: form => {
                $.ajax({
                    url: `${SET.baseURL()}authenticate`,
                    type: 'POST',
                    dataType: 'JSON',
                    data: $(form).serialize(),
                    beforeSend: xhr => {
                        SET.contentLoader('.auth-box')
                    },
                    success: ({ data }) => {
                        window.location.replace(`${SET.baseURL()}`);
                    },
                    error: ({ responseJSON }) => {
                        toastr.error(responseJSON.message, 'Failed', { "progressBar": true, "closeButton": true, "positionClass": 'toast-bottom-right' });
                    },
                    complete: () => {
                        SET.closeSelectedElement('.auth-box')
                    }
                })
            }
        })
    }

    const _showPassword = () => {
        $('.show-pass').on('click', function(){
            if($(this).is(':checked')) {
                $('#password').attr('type', 'text');
            } else {
                $('#password').attr('type', 'password');
            }
        })
    }

    return {
        init: () => {
            console.log('Auth Controller is Running...')

            _submitLogin();
            _showPassword();
        }
    }
})(settingController)