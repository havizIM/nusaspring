<div class="page-breadcrumb">
    <div class="row">
        <div class="col-5 align-self-center">
            <h4 class="page-title">Task</h4>
        </div>
        <div class="col-7 align-self-center">
            <div class="d-flex align-items-center justify-content-end">
                <nav aria-label="breadcrumb">
                    <ol class="breadcrumb">
                        <li class="breadcrumb-item">
                            <a href="#/dashboard">Dashboard</a>
                        </li>
                        <li class="breadcrumb-item active" aria-current="page">Task</li>
                    </ol>
                </nav>
            </div>
        </div>
    </div>
</div>

<div class="container-fluid">
    <div class="row">
        <div class="col-5">
            <div class="card">
                <div class="d-flex flex-row">
                    <div class="p-10 bg-inverse">
                        <h3 class="text-white box m-b-0"><i class="ti-clipboard"></i></h3></div>
                    <div class="align-self-center m-l-20">
                        <h3 class="m-b-0" id="count_task">0</h3>
                        <span class="text-muted">Total Task</span>
                    </div>
                </div>
            </div>

            <div class="card" id="add_container">
                <div class="card-body">
                    <form id="form_add">
                        <div class="form-group">
                            <label for="title">Title</label>
                            <input type="text" class="form-control" id="title" name="title">
                        </div>
                        <div class="form-group">
                            <label for="description">Description</label>
                            <textarea class="form-control" id="description" name="description" rows="5"></textarea>
                        </div>
                        <div class="form-group">
                            <label for="color">Color</label>
                            <select class="form-control" id="color" name="color">
                                <option value="primary">Primary</option>
                                <option value="info">Info</option>
                                <option value="success">Success</option>
                                <option value="warning">Warning</option>
                                <option value="danger">Danger</option>
                            </select>
                        </div>
                        <div class="form-group text-right">
                            <button type="reset" class="btn btn-md btn-warning">Reset</button>
                            <button type="submit" class="btn btn-md btn-info">Save</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
        <div class="col-7">
            <div class="card" id="task_container">
                <div class="card-body">
                    <h4 class="card-title">Your Tasks</h4>
                </div>
                <div class="comment-widgets scrollable" id="task_list" style="height:430px;">
                    
                </div>
            </div>
        </div>
    </div>
</div>

<form id="form_edit">
    <div id="modal_edit" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true" style="display: none;">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h4 class="modal-title">Edit Task</h4>
                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
                </div>
                <div class="modal-body">
                    <div class="form-group">
                            <label for="title">Title</label>
                            <input type="hidden" id="edit_id" name="id">
                            <input type="text" class="form-control" id="edit_title" name="title">
                        </div>
                        <div class="form-group">
                            <label for="description">Description</label>
                            <textarea class="form-control" id="edit_description" name="description" rows="10"></textarea>
                        </div>
                        <div class="form-group">
                            <label for="color">Color</label>
                            <select class="form-control" id="edit_color" name="color">
                                <option value="primary">Primary</option>
                                <option value="info">Info</option>
                                <option value="success">Success</option>
                                <option value="warning">Warning</option>
                                <option value="danger">Danger</option>
                            </select>
                        </div>
                </div>
                <div class="modal-footer">
                    <div class="col-md-6 text-right">
                        <button type="button" class="btn btn-danger waves-effect" data-dismiss="modal">Close</button>
                        <button type="submit" class="btn btn-success waves-effect waves-light">Update</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</form>

<form id="form_delete">
    <div id="modal_delete" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true" style="display: none;">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h4 class="modal-title">Delete Task</h4>
                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
                </div>
                <div class="modal-body">
                    <h4><b>Are You Sure?</b></h4>
                    <p><b id="delete_desc"></b> will removed from table permanently.</p>
                </div>
                <div class="modal-footer">
                    <input type="hidden" id="delete_id" name="delete_id">
                    <button type="button" class="btn btn-danger waves-effect" data-dismiss="modal">No</button>
                    <button type="submit" class="btn btn-info waves-effect waves-light">Yes</button>
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
    import taskController from '<?= base_url() ?>src/modules/task.js';
    taskController.init('<?= $this->session->userdata('api_token') ?>')
</script>