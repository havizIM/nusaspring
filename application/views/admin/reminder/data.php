<div class="page-breadcrumb">
    <div class="row">
        <div class="col-5 align-self-center">
            <h4 class="page-title">Reminder</h4>
        </div>
        <div class="col-7 align-self-center">
            <div class="d-flex align-items-center justify-content-end">
                <nav aria-label="breadcrumb">
                    <ol class="breadcrumb">
                        <li class="breadcrumb-item">
                            <a href="#/dashboard">Dashboard</a>
                        </li>
                        <li class="breadcrumb-item active" aria-current="page">Reminder</li>
                    </ol>
                </nav>
            </div>
        </div>
    </div>
</div>

<div class="container-fluid">
    <div class="row">
        <div class="col-md-12">
            <div class="card">
                <div class="">
                    <div class="row">
                        <div class="col-lg-3 border-right p-r-0">
                            <div class="card-body border-bottom">
                                <!-- <h4 class="card-title m-t-10">Your Events</h4> -->

                                <div class="card">
                                    <div class="d-flex flex-row">
                                        <div class="p-10 bg-cyan">
                                            <h3 class="text-white box m-b-0"><i class="ti-calendar"></i></h3></div>
                                        <div class="align-self-center m-l-20">
                                            <h3 class="text-cyan m-b-0" id="count_events">0</h3>
                                            <span class="text-muted">Your Event</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="card-body">
                                <div class="row">
                                    <div class="col-md-12">
                                        <div id="calendar-events" class="">
                                            <div class="calendar-events m-b-20" data-class="bg-info"><i class="fa fa-circle text-info m-r-10"></i> Info</div>
                                            <div class="calendar-events m-b-20" data-class="bg-success"><i class="fa fa-circle text-success m-r-10"></i> Success</div>
                                            <div class="calendar-events m-b-20" data-class="bg-danger"><i class="fa fa-circle text-danger m-r-10"></i> Danger</div>
                                            <div class="calendar-events m-b-20" data-class="bg-warning"><i class="fa fa-circle text-warning m-r-10"></i> Warning</div>
                                        </div>
                                        <!-- checkbox -->
                                        <a href="javascript:void(0)"  id="btn_add" class="btn m-t-20 btn-info btn-block waves-effect waves-light">
                                            <i class="ti-plus"></i> Add New Event
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-lg-9">
                            <div class="card-body b-l calender-sidebar">
                                <div id="calendar"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<form id="form_add">
    <div id="modal_add" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true" style="display: none;">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h4 class="modal-title">Add Event</h4>
                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
                </div>
                <div class="modal-body">
                    <div class="form-group">
                        <label for="description">Description</label>
                        <textarea id="description" name="description" class="form-control" cols="4" rows="6"></textarea>
                    </div>
                    <div class="form-group">
                        <label for="start_date">Start Date</label>
                        <input id="start_date" name="start_date" type="text" class="form-control date-mask">
                    </div>
                    <div class="form-group">
                        <label for="end_date">End Date</label>
                        <input id="end_date" name="end_date" type="text" class="form-control date-mask">
                    </div>
                    <div class="form-group">
                        <label for="color">Color</label>
                        <select id="color" name="color" class="form-control">
                            <option value="info">Info</option>
                            <option value="success">Success</option>
                            <option value="warning">Warning</option>
                            <option value="danger">Danger</option>
                        </select>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-danger waves-effect" data-dismiss="modal">Close</button>
                    <button type="submit" class="btn btn-info waves-effect waves-light">Save</button>
                </div>
            </div>
        </div>
    </div>
</form>

<form id="form_edit">
    <div id="modal_edit" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true" style="display: none;">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h4 class="modal-title">Detail Event</h4>
                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
                </div>
                <div class="modal-body">
                    <div class="form-group">
                        <label for="description">Description</label>
                        <input type="hidden" name="id" id="edit_id">
                        <textarea id="edit_description" name="description" class="form-control edit" cols="4" rows="6"></textarea>
                    </div>
                    <div class="form-group">
                        <label for="start_date">Start Date</label>
                        <input id="edit_start_date" name="start_date" type="text" class="form-control date-mask">
                    </div>
                    <div class="form-group">
                        <label for="end_date">End Date</label>
                        <input id="edit_end_date" name="end_date" type="text" class="form-control date-mask">
                    </div>
                    <div class="form-group">
                        <label for="color">Color</label>
                        <select id="edit_color" name="color" class="form-control edit">
                            <option value="info">Info</option>
                            <option value="success">Success</option>
                            <option value="warning">Warning</option>
                            <option value="danger">Danger</option>
                        </select>
                    </div>
                </div>
                <div style="padding: 1rem; border-top: 1px solid #e9ecef;">
                    <div id="default_action">
                        <div class="row">
                            <div class="col-md-6">
                                <button type="button" id="btn_delete" class="btn btn-warning waves-effect">Delete</button>
                            </div>
                            <div class="col-md-6 text-right">
                                <button type="button" class="btn btn-danger waves-effect" data-dismiss="modal">Close</button>
                                <button type="submit" class="btn btn-success waves-effect waves-light">Update</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</form>

<footer class="footer text-center">
    All Rights Reserved by UD. Nusa Spring. Designed and Developed by
    <a href="https://wrappixel.com">CodeManiac</a>.
</footer>

<script type="module">
    import reminderController from '<?= base_url() ?>src/modules/reminder.js';
    reminderController.init('<?= $this->session->userdata('api_token') ?>')
</script>