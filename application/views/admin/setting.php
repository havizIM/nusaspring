<div class="page-breadcrumb">
    <div class="row">
        <div class="col-5 align-self-center">
            <h4 class="page-title">Setting</h4>
        </div>
        <div class="col-7 align-self-center">
            <div class="d-flex align-items-center justify-content-end">
                <nav aria-label="breadcrumb">
                    <ol class="breadcrumb">
                        <li class="breadcrumb-item">
                            <a href="#/dashboard">Dashboard</a>
                        </li>
                        <li class="breadcrumb-item active" aria-current="page">Setting</li>
                    </ol>
                </nav>
            </div>
        </div>
    </div>
</div>

<div class="container-fluid">
    <div class="row">
        <div class="col-lg-4 col-xlg-3 col-md-5">
            <div class="card">
                <div class="card-body">
                    <center class="m-t-30"> <img src="<?= base_url() ?>assets/images/user.png" class="rounded-circle" width="150" />
                        <h4 class="card-title m-t-10" id="profile_name">...</h4>
                        <h6 class="card-subtitle" id="profile_roles">...</h6>
                    </center>
                </div>
                <div>
                    <hr> </div>
                <div class="card-body">
                    <small class="text-muted">Email address </small>
                    <h6 id="profile_email">...</h6>
                    
                    <small class="text-muted p-t-30 db">Phone</small>
                    <h6>087880729929 / 081280999733</h6>

                    <small class="text-muted p-t-30 db">Address</small>
                    <h6>Jl. Tiga Berlian Blok Karizma No.41, Mekarsari, Cimanggis, Depok, Jawa Barat 16452, Indonesia,</h6>
                </div>
            </div>
        </div>

        <div class="col-lg-8 col-xlg-9 col-md-7">
            <div class="card">
                <ul class="nav nav-pills custom-pills" id="pills-tab" role="tablist">
                    <li class="nav-item">
                        <a class="nav-link active" id="pills-timeline-tab" data-toggle="pill" href="#logs" role="tab" aria-controls="pills-timeline" aria-selected="true">Logs</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" id="pills-setting-tab" data-toggle="pill" href="#password" role="tab" aria-controls="pills-setting" aria-selected="false">Password</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" id="pills-setting-tab" data-toggle="pill" href="#backup" role="tab" aria-controls="pills-setting" aria-selected="false">Database Backup</a>
                    </li>
                </ul>
                <div class="tab-content" id="pills-tabContent">
                    <div class="tab-pane fade show active" id="logs" role="tabpanel" aria-labelledby="pills-timeline-tab">
                        <div class="card-body" id="log_container">
                            <div class="text-center">
                                <i class="fa fa-spinner fa-spin fa-5x mb-3"></i>
                                <h1>Loading</h1>
                                <h4>Silahkan tunggu...</h4>
                            </div>
                        </div>
                    </div>
                    <div class="tab-pane fade" id="password" role="tabpanel" aria-labelledby="pills-setting-tab">
                        <div class="card-body" id="add_container">
                            <form class="form-horizontal form-material" id="form_password">
                                
                                <div class="form-group">
                                    <label class="col-md-12">Old Password</label>
                                    <div class="col-md-12">
                                        <input type="password" id="old_password" name="old_password" class="form-control form-control-line">
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="col-md-12">New Password</label>
                                    <div class="col-md-12">
                                        <input type="password" id="new_password" name="new_password" class="form-control form-control-line">
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="col-md-12">Retype Password</label>
                                    <div class="col-md-12">
                                        <input type="password" id="retype_password" name="retype_password" class="form-control form-control-line">
                                    </div>
                                </div>
                                <div class="form-group row">
                                    <div class="col-md-12">
                                        <div class="custom-control custom-checkbox float-right">
                                            <input type="checkbox" class="custom-control-input show-pass" id="customCheck1">
                                            <label class="custom-control-label" for="customCheck1">Show Password</label>
                                        </div>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <div class="col-sm-12">
                                        <button class="btn btn-danger" type="reset">Cancel</button>
                                        <button class="btn btn-success" type="submit">Change Password</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                    <div class="tab-pane fade" id="backup" role="tabpanel" aria-labelledby="pills-timeline-tab">
                        <div class="m-4">
                            <label for="">Click to backup your Database</label>
                            <button id="btn_backup" class="btn btn-info btn-block btn-lg">Backup</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    
</div>

<footer class="footer text-center">
    All Rights Reserved by UD. Nusa Spring. Designed and Developed by
    <a href="https://wrappixel.com">CodeManiac</a>.
</footer>

<script type="module">
    import profileController from '<?= base_url() ?>src/modules/profile.js';
    profileController.init('<?= $this->session->userdata('api_token') ?>')
</script>