
<!DOCTYPE html>
<html dir="ltr">

<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="">
    <meta name="author" content="">
    <link rel="icon" type="image/png" sizes="16x16" href="<?= base_url() ?>assets/images/favicon.png">
    <title>Nusa Spring | Login</title>
    
	<link href="https://fonts.googleapis.com/css?family=Roboto:400,300,100,500,700,900" rel="stylesheet" type="text/css">
    <link href="<?= base_url() ?>dist/css/style.min.css" rel="stylesheet">
    <link href="<?= base_url() ?>assets/libs/toastr/build/toastr.min.css" rel="stylesheet">
    
    <script src="<?= base_url() ?>src/setting.js"></script>
    <script src="<?= base_url() ?>src/auth.js"></script>
    <script>
        document.addEventListener('DOMContentLoaded', function () {
            authController.init()
        })
    </script>
</head>

<body>
    <div class="main-wrapper">

        <div class="preloader">
            <div class="lds-ripple">
                <div class="lds-pos"></div>
                <div class="lds-pos"></div>
            </div>
        </div>

        <div class="auth-wrapper d-flex no-block justify-content-center align-items-center" style="background:url(<?= base_url() ?>assets/images/background1.jpg) no-repeat center center;">
            <div class="auth-box on-sidebar">
                <div id="loginform">
                    <div class="logo">
                        <span class="db"><img src="<?= base_url() ?>assets/images/logo-icon.png" alt="logo" /></span>
                        <h5 class="font-medium m-b-20">Sign In to Adminstrator</h5>
                    </div>

                    <div class="row">
                        <div class="col-12">
                            <form class="form-horizontal m-t-20" id="form_login">
                                <div class="form-group mb-3">
                                    <label for="username">Username</label>
                                    <input type="text" id="username" name="username" class="form-control form-control-lg" placeholder="Enter your username..." aria-label="Username" aria-describedby="basic-addon1">
                                </div>
                                <div class="form-group mb-3">
                                    <label for="passowrd">Password</label>
                                    <input type="password" id="password" name="password" class="form-control form-control-lg" placeholder="Enter your password..." aria-label="Password" aria-describedby="basic-addon1">
                                </div>
                                <div class="form-group row">
                                    <div class="col-md-12">
                                        <div class="custom-control custom-checkbox float-right">
                                            <input type="checkbox" class="custom-control-input show-pass" id="customCheck1">
                                            <label class="custom-control-label" for="customCheck1">Show Password</label>
                                        </div>
                                    </div>
                                </div>
                                <div class="form-group text-center">
                                    <div class="col-xs-12 p-b-20">
                                        <button class="btn btn-block btn-lg btn-info" type="submit">Log In</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </div>


    <script src="<?= base_url() ?>assets/libs/jquery/dist/jquery.min.js"></script>
    <script src="<?= base_url() ?>assets/libs/popper.js/dist/umd/popper.min.js"></script>
    <script src="<?= base_url() ?>assets/libs/bootstrap/dist/js/bootstrap.min.js"></script>

    <script src="<?= base_url() ?>assets/libs/block-ui/jquery.blockUI.js"></script>
    <script src="<?= base_url() ?>assets/libs/toastr/build/toastr.min.js"></script>
    <script src="<?= base_url() ?>assets/libs/jquery-validation/dist/jquery.validate.min.js"></script>
    <script>
        $(".preloader").fadeOut();
    </script>
</body>

</html>