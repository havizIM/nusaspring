const reminderController = ((SET) => {

    const _openAdd = () => {
        $('#btn_add').on('click', function(){
            $('#form_add')[0].reset();
            $('#modal_add').modal('show')
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
                description: 'required',
                start_date: 'required',
                end_date: 'required',
                color: 'required',
            },
            submitHandler: form => {
                $.ajax({
                    url: `${SET.apiURL()}reminders`,
                    type: 'POST',
                    dataType: 'JSON',
                    data: $(form).serialize(),
                    beforeSend: xhr => {
                        xhr.setRequestHeader("Authorization", "Bearer " + TOKEN)

                        SET.contentLoader('.modal-content')
                    },
                    success: res => {
                        toastr.success(res.message, 'Success', { "progressBar": true, "closeButton": true, "positionClass": 'toast-bottom-right' });
                        $('#calendar').fullCalendar('refetchEvents');
                        $('#modal_add').modal('hide')
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
                description: 'required',
                start_date: 'required',
                end_date: 'required',
                color: 'required',
            },
            submitHandler: form => {
                let id = $('#edit_id').val()

                $.ajax({
                    url: `${SET.apiURL()}reminders/${id}`,
                    type: 'PUT',
                    dataType: 'JSON',
                    data: $(form).serialize(),
                    beforeSend: xhr => {
                        xhr.setRequestHeader("Authorization", "Bearer " + TOKEN)

                        SET.contentLoader('.modal-content')
                    },
                    success: res => {
                        toastr.success(res.message, 'Success', { "progressBar": true, "closeButton": true, "positionClass": 'toast-bottom-right' });
                        $('#calendar').fullCalendar('refetchEvents');
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

    const _submitDelete = TOKEN => {
        $('#btn_delete').on('click', function(){
            let id = $('#edit_id').val()

            $.ajax({
                url: `${SET.apiURL()}reminders/${id}`,
                type: 'DELETE',
                dataType: 'JSON',
                beforeSend: xhr => {
                    xhr.setRequestHeader("Authorization", "Bearer " + TOKEN)

                    SET.contentLoader('.modal-content')
                },
                success: res => {
                    toastr.success(res.message, 'Success', { "progressBar": true, "closeButton": true, "positionClass": 'toast-bottom-right' });
                    $('#calendar').fullCalendar('refetchEvents');
                    $('#modal_edit').modal('hide')
                },
                error: ({ responseJSON }) => {
                    toastr.error(responseJSON.message, 'Failed', { "progressBar": true, "closeButton": true, "positionClass": 'toast-bottom-right' });
                },
                complete: () => {
                    SET.closeSelectedElement('.modal-content')
                }
            })
        })
    }

    return {
        init: TOKEN => {
            console.log('Reminder Controller is Running...')

            $(".date-mask").inputmask("datetime", {
                mask: "y-2-1 h:s:s",
                placeholder: "yyyy-mm-dd 00:00:00",
                leapday: "-02-29",
                separator: "-",
                alias: "yyyy-mm-dd 00:00:00"
            })

            const CALENDAR = $('#calendar').fullCalendar({
                header: {
                    left: 'prev,next today',
                    center: 'title',
                    right: 'month,basicWeek,basicDay'
                },
                defaultDate: moment().format("YYYY-MM-DD"),
                editable: false,
                eventLimit: true,
                droppable: false,
                allDay: true,
                events: {
                    url: `${SET.apiURL()}reminders`,
                    type: 'GET',
                    dataType: 'JSON',
                    beforeSend: xhr => {
                        xhr.setRequestHeader("Content-Type", 'application/json')
                        xhr.setRequestHeader("Authorization", "Bearer " + TOKEN)
                    },
                    error: function (err) {
                        let error = err.responseJSON
                        let status = err.status

                        if (status === 401 && error.message === 'Unauthenticated.') {
                            $('#app_content').load(`${SET.baseURL()}unauthenticated`)
                        }

                        if (status === 401 && error.message === 'Unauthorized.') {
                            $('#app_content').load(`${SET.baseURL()}unauthorized`)
                        }

                        toastr.error(responseJSON.message, 'Failed', { "progressBar": true, "closeButton": true, "positionClass": 'toast-bottom-right' });
                    },
                    success: function (res) {
                        var events_array = [];

                        $.each(res.results, function (k, v) {
                            var obj = {
                                id: v.id,
                                title: v.description,
                                start: v.start_date,
                                end: v.end_date,
                                className: `bg-${v.color}`
                            };

                            events_array.push(obj);
                        });

                        $('#count_events').text(res.results.length)

                        return events_array;
                    },
                    // statusCode: {
                    //     401: err => {
                    //         let error = err.responseJSON

                    //         if (error.message === 'Unauthenticated.') {
                    //             $('#app_content').load(`${SET.baseURL()}unauthenticated`)
                    //         }

                    //         if (error.message === 'Unauthorized.') {
                    //             $('#app_content').load(`${SET.baseURL()}unauthorized`)
                    //         }
                    //     }
                    // },
                },
                // loading: function(bool){
                //   alert('Loading....');
                // }
                eventClick: function (calEvent, jsEvent, view) {
                    let id = calEvent.id
                    let description = calEvent.title
                    let start_date = calEvent.start._i
                    let end_date = calEvent.end === null ? calEvent.start._i : calEvent.end._i
                    let color = calEvent.className[0].substr(3)

                    $('#edit_id').val(id)
                    $('#edit_description').val(description)
                    $('#edit_start_date').val(start_date)
                    $('#edit_end_date').val(end_date)
                    $('#edit_color').val(color)

                    $('#modal_edit').modal('show')
                }
            });

            _openAdd()
            _submitAdd(TOKEN)
            _submitEdit(TOKEN)
            _submitDelete(TOKEN)
        }
    }
})(settingController)

export default reminderController