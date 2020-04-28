<div class="container-fluid">
    <div class="error-box" style="position: relative !important; min-height: 76vh">
        <div class="error-body text-center">
            <img src="<?= base_url() ?>assets/images/authenticate.svg" class="img-fluid mb-2" style="width: 37%">
            <h4 class="text-dark font-24">UD. Nusa Spring</h4>
            <div class="m-t-30">
                <h3>Your session has expired</h3>
                <h5 class="m-b-10 text-muted font-medium">Please click button below for re-login.</h5>
                <a href="<?= base_url('login') ?>" class="btn btn-primary btn-rounded waves-effect waves-light m-b-40">Login</a>
            </div>
        </div>
    </div>
</div>

<footer class="footer text-center">
    All Rights Reserved by UD. Nusa Spring. Designed and Developed by
    <a href="https://wrappixel.com">CodeManiac</a>.
</footer>