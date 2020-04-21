const taskUI = (() => {

    const _replaceNull = text => {
        if (text === null) {
            return '-'
        } else {
            return text;
        }
    }

    return {
        renderData: data => {
            let html = ''

            data.forEach(v => {
                html += `
                    <div class="d-flex flex-row comment-row m-t-0">
                        <div class="p-2">
                            <div class="round align-self-center round-${v.color}"><i class="ti-receipt"></i></div>
                        </div>
                        <div class="comment-text active w-100">
                            <h6 class="font-medium">${v.title}</h6>
                            <span class="m-b-15 d-block">${v.description !== null ? v.description.length >= 100 ? _replaceNull(v.description).substr(0, 100) + '[...]' : _replaceNull(v.description) : '-'}</span>
                            <div class="comment-footer">
                                <span class="text-muted float-right">${v.updated_at}</span>
                                <span class="action-icons active">
                                    <a href="javascript:void(0)" class="btn-edit" data-id="${v.id}">
                                        <i class="ti-pencil-alt"></i>
                                    </a>
                                    <a href="javascript:void(0)" class="btn-delete" data-id="${v.id}" data-name="${v.title}">
                                        <i class="ti-trash"></i>
                                    </a>
                                </span>
                            </div>
                        </div>
                    </div>
                `
            })

            $('#task_list').html(html)
        },

        renderNoData: () => {
            let html = `
                <div class="text-center mt-5">
                    <h1>No Data Founds</h1>
                    <h4>Please input your task</h4>
                </div>
            `

            $('#task_list').html(html)
        },
        renderError: () => {

        }
    }
})()

const taskController = ((SET, UI) => {

    const _fetchTask = TOKEN => {
        $.ajax({
            url: `${SET.apiURL()}tasks`,
            type: 'GET',
            dataType: 'JSON',
            beforeSend: xhr => {
                xhr.setRequestHeader("Authorization", "Bearer " + TOKEN)

                SET.contentLoader('#task_container')
            },
            success: res => {
                if(res.results.length === 0){
                    UI.renderNoData()
                } else {
                    $('#count_task').text(res.results.length)
                    UI.renderData(res.results)
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
                title: 'required',
                color: 'required',
            },
            submitHandler: form => {
                $.ajax({
                    url: `${SET.apiURL()}tasks`,
                    type: 'POST',
                    dataType: 'JSON',
                    data: $(form).serialize(),
                    beforeSend: xhr => {
                        xhr.setRequestHeader("Authorization", "Bearer " + TOKEN)

                        SET.contentLoader('#add_container')
                    },
                    success: res => {
                        toastr.success(res.message, 'Success', { "progressBar": true, "closeButton": true, "positionClass": 'toast-bottom-right' });
                        $('#form_add')[0].reset()
                        _fetchTask(TOKEN)
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

    const _openDelete = () => {
        $('#task_list').on('click', '.btn-delete', function(){
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
                    url: `${SET.apiURL()}tasks/${id}`,
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

    const _openEdit = TOKEN => {
        $('#task_list').on('click', '.btn-edit', function () {
            let id = $(this).data('id')

            $.ajax({
                url: `${SET.apiURL()}tasks/${id}`,
                type: 'GET',
                dataType: 'JSON',
                beforeSend: xhr => {
                    xhr.setRequestHeader("Authorization", "Bearer " + TOKEN)

                    SET.contentLoader('.modal-content')
                },
                success: ({ results }) => {
                        $('#edit_id').val(results.id)
                        $('#edit_title').val(results.title)
                        $('#edit_description').val(results.description)
                        $('#edit_color').val(results.color)
                },
                error: ({ responseJSON }) => {
                    UI.renderError()
                    toastr.error(responseJSON.message, 'Failed', { "progressBar": true, "closeButton": true, "positionClass": 'toast-bottom-right' });
                },
                complete: () => {
                    SET.closeSelectedElement('.modal-content')
                }
            })

            $('#modal_edit').modal('show')
            
        })
    }

    const _submitEdit = TOKEN => {
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
                title: 'required',
                color: 'required',
            },
            submitHandler: form => {
                let id = $('#edit_id').val()

                $.ajax({
                    url: `${SET.apiURL()}tasks/${id}`,
                    type: 'PUT',
                    dataType: 'JSON',
                    data: $(form).serialize(),
                    beforeSend: xhr => {
                        xhr.setRequestHeader("Authorization", "Bearer " + TOKEN)

                        SET.contentLoader('.modal-content')
                    },
                    success: res => {
                        toastr.success(res.message, 'Success', { "progressBar": true, "closeButton": true, "positionClass": 'toast-bottom-right' });
                        _fetchTask(TOKEN)
                        $('#modal_edit').modal('hide')
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

    return {
        init: TOKEN => {
            console.log('Task Controller is Running...')

            $(".scrollable").niceScroll({
                cursorborderradius: 4,
                cursorcolor: '#6e8cb6',
            });

            _fetchTask(TOKEN)
            _submitAdd(TOKEN)

            _openDelete()
            _submitDelete(TOKEN, data => {
                $('#modal_delete').modal('hide')
                _fetchTask(TOKEN)
            })

            _openEdit(TOKEN)
            _submitEdit(TOKEN)
        }
    }
})(settingController, taskUI)

export default taskController