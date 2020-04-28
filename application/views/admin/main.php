
<!DOCTYPE html>
<html dir="ltr" lang="en">

<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="">
    <meta name="author" content="">
    
    <link rel="icon" type="image/png" sizes="16x16" href="<?= base_url() ?>assets/images/logo-black.png">
    <title>Nusa Spring | <?= $this->session->userdata('roles') ?></title>
    <link href="<?= base_url() ?>assets/libs/toastr/build/toastr.min.css" rel="stylesheet">
    <link href="<?= base_url() ?>assets/libs/datatables-bs4/datatables.min.css" rel="stylesheet">
    <link href="<?= base_url() ?>assets/libs/sweetalert2/dist/sweetalert2.min.css" rel="stylesheet">
    
    <link href="<?= base_url() ?>assets/libs/fullcalendar/dist/fullcalendar.min.css" rel="stylesheet" />
    <link href="<?= base_url() ?>assets/libs/dropify/dist/css/dropify.min.css" rel="stylesheet" />
    <link href="<?= base_url() ?>assets/extra-libs/calendar/calendar.css" rel="stylesheet" />
    <link rel="stylesheet" type="text/css" href="<?= base_url() ?>assets/libs/select2/dist/css/select2.min.css">
    <link rel="stylesheet" type="text/css" href="<?= base_url() ?>assets/libs/bootstrap-switch/dist/css/bootstrap3/bootstrap-switch.min.css">
    <link href="<?= base_url() ?>dist/css/style.min.css" rel="stylesheet">

    <style>
        .dataTables_scrollHeadInner, .table{
            width:100%!important
         };
    </style>
</head>

<body>
    <div class="preloader">
        <div class="lds-ripple">
            <div class="lds-pos"></div>
            <div class="lds-pos"></div>
        </div>
    </div>

    <div id="main-wrapper">

        <header class="topbar">
            <nav class="navbar top-navbar navbar-expand-md navbar-dark">
                <div class="navbar-header">
                
                    <a class="nav-toggler waves-effect waves-light d-block d-md-none" href="javascript:void(0)">
                        <i class="ti-menu ti-close"></i>
                    </a>

                    <div class="navbar-brand">
                        <a href="#/dashboard" class="logo">
                            <b class="logo-icon">
                                <img src="<?= base_url() ?>assets/images/logo-black.png" style="width: 20%" alt="homepage" class="dark-logo" />
                                <img src="<?= base_url() ?>assets/images/logo-white.png" style="width: 20%" alt="homepage" class="light-logo" />
                            </b>
                            <span class="logo-text">
                                <img src="<?= base_url() ?>assets/images/logo-text-black.png" style="width: 70%" alt="homepage" class="dark-logo" />
                                <img src="<?= base_url() ?>assets/images/logo-text-white.png" style="width: 70%" class="light-logo" alt="homepage" />
                            </span>
                        </a>
                        <a class="sidebartoggler d-none d-md-block" href="javascript:void(0)" data-sidebartype="mini-sidebar">
                            <i class="mdi mdi-toggle-switch mdi-toggle-switch-off font-20"></i>
                        </a>
                    </div>

                    <a class="topbartoggler d-block d-md-none waves-effect waves-light" href="javascript:void(0)" data-toggle="collapse" data-target="#navbarSupportedContent"
                        aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <i class="ti-more"></i>
                    </a>
                </div>

                <div class="navbar-collapse collapse" id="navbarSupportedContent">

                    <ul class="navbar-nav float-left mr-auto">
                        <li class="nav-item search-box">
                            <a class="nav-link waves-effect waves-dark" href="javascript:void(0)">
                                <div class="d-flex align-items-center">
                                    <i class="mdi mdi-magnify font-20 mr-1"></i>
                                    <div class="ml-1 d-none d-sm-block">
                                        <span>Search</span>
                                    </div>
                                </div>
                            </a>
                            <form class="app-search position-absolute">
                                <input type="text" class="form-control typeahead" placeholder="Search &amp; enter" id="typeahead">
                                <a class="srh-btn">
                                    <i class="ti-close"></i>
                                </a>
                            </form>
                        </li>
                    </ul>

                    <ul class="navbar-nav float-right">

                        <li class="nav-item dropdown">
                            <a class="nav-link dropdown-toggle waves-effect waves-dark pro-pic" href="" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                <img src="<?= base_url() ?>assets/images/user.png" alt="user" class="rounded-circle" width="40">
                                <span class="m-l-5 font-medium d-none d-sm-inline-block"><?= $this->session->userdata('name') ?> <i class="mdi mdi-chevron-down"></i></span>
                            </a>
                            <div class="dropdown-menu dropdown-menu-right user-dd animated flipInY">
                                <span class="with-arrow">
                                    <span class="bg-primary"></span>
                                </span>
                                <div class="d-flex no-block align-items-center p-15 bg-primary text-white m-b-10">
                                    <div class="">
                                        <img src="<?= base_url() ?>assets/images/user.png" alt="user" class="rounded-circle" width="60">
                                    </div>
                                    <div class="m-l-10">
                                        <h4 class="m-b-0"><?= $this->session->userdata('name') ?></h4>
                                        <p class=" m-b-0">Roles : <?= $this->session->userdata('roles') ?></p>
                                    </div>
                                </div>
                                <div class="profile-dis scrollable">
                                    <a class="dropdown-item" href="#/setting">
                                        <i class="ti-settings m-r-5 m-l-5"></i> Account Setting</a>
                                    <div class="dropdown-divider"></div>
                                    <a class="dropdown-item logout" href="javascript:void(0)">
                                        <i class="fa fa-power-off m-r-5 m-l-5"></i> Logout</a>
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
            </nav>
        </header>

        <aside class="left-sidebar">
            <!-- Sidebar scroll-->
            <div class="scroll-sidebar">
                <!-- Sidebar navigation-->
                <nav class="sidebar-nav">
                    <ul id="sidebarnav">
                        <li class="sidebar-item"> <a class="sidebar-link waves-effect waves-dark sidebar-link" href="#/dashboard" aria-expanded="false"><i class="mdi mdi-av-timer"></i><span class="hide-menu">Dashboard</span></a></li>
                        <li class="sidebar-item"> <a class="sidebar-link has-arrow waves-effect waves-dark" href="javascript:void(0)" aria-expanded="false"><i class="mdi mdi-account-multiple"></i><span class="hide-menu">Contact</span></a>
                            <ul aria-expanded="false" class="collapse first-level">
                                <li class="sidebar-item"><a href="#/supplier" class="sidebar-link"><i class="mdi mdi-adjust"></i><span class="hide-menu"> Supplier</span></a></li>
                                <li class="sidebar-item"><a href="#/customer" class="sidebar-link"><i class="mdi mdi-adjust"></i><span class="hide-menu"> Customer</span></a></li>
                            </ul>
                        </li>
                        <li class="sidebar-item"> <a class="sidebar-link has-arrow waves-effect waves-dark" href="javascript:void(0)" aria-expanded="false"><i class="far fa-list-alt"></i><span class="hide-menu">Master</span></a>
                            <ul aria-expanded="false" class="collapse first-level">
                                <li class="sidebar-item"><a href="#/category" class="sidebar-link"><i class="mdi mdi-adjust"></i><span class="hide-menu"> Category</span></a></li>
                                <li class="sidebar-item"><a href="#/unit" class="sidebar-link"><i class="mdi mdi-adjust"></i><span class="hide-menu"> Unit</span></a></li>
                                <li class="sidebar-item"><a href="#/product" class="sidebar-link"><i class="mdi mdi-adjust"></i><span class="hide-menu"> Product</span></a></li>
                            </ul>
                        </li>
                        <li class="sidebar-item"> <a class="sidebar-link waves-effect waves-dark sidebar-link" href="#/adjustment" aria-expanded="false"><i class="ti-loop"></i><span class="hide-menu">Adjustment</span></a></li>
                        <li class="sidebar-item"> <a class="sidebar-link has-arrow waves-effect waves-dark" href="javascript:void(0)" aria-expanded="false"><i class="mdi mdi-checkbox-multiple-blank-outline"></i><span class="hide-menu">Transaction</span></a>
                            <ul aria-expanded="false" class="collapse first-level">
                                <li class="sidebar-item"><a href="#/purchase" class="sidebar-link"><i class="mdi mdi-adjust"></i><span class="hide-menu"> Purchase</span></a></li>
                                <li class="sidebar-item"><a href="#/selling" class="sidebar-link"><i class="mdi mdi-adjust"></i><span class="hide-menu"> Selling</span></a></li>
                            </ul>
                        </li>
                        <li class="sidebar-item"> <a class="sidebar-link has-arrow waves-effect waves-dark" href="javascript:void(0)" aria-expanded="false"><i class="mdi mdi-keyboard-return"></i><span class="hide-menu">Return</span></a>
                            <ul aria-expanded="false" class="collapse first-level">
                                <li class="sidebar-item"><a href="#/purchase_return" class="sidebar-link"><i class="mdi mdi-adjust"></i><span class="hide-menu"> Purchase Return</span></a></li>
                                <li class="sidebar-item"><a href="#/selling_return" class="sidebar-link"><i class="mdi mdi-adjust"></i><span class="hide-menu"> Selling Return</span></a></li>
                            </ul>
                        </li>
                        <li class="sidebar-item"> <a class="sidebar-link has-arrow waves-effect waves-dark" href="javascript:void(0)" aria-expanded="false"><i class="ti-wallet"></i><span class="hide-menu">Payment</span></a>
                            <ul aria-expanded="false" class="collapse first-level">
                                <li class="sidebar-item"><a href="#/purchase_payment" class="sidebar-link"><i class="mdi mdi-adjust"></i><span class="hide-menu"> Purchase Payment</span></a></li>
                                <li class="sidebar-item"><a href="#/selling_payment" class="sidebar-link"><i class="mdi mdi-adjust"></i><span class="hide-menu"> Selling Payment</span></a></li>
                            </ul>
                        </li>
                        <li class="sidebar-item"> <a class="sidebar-link has-arrow waves-effect waves-dark" href="javascript:void(0)" aria-expanded="false"><i class="mdi mdi-notification-clear-all"></i><span class="hide-menu">Report</span></a>
                            <ul aria-expanded="false" class="collapse first-level">
                                <li class="sidebar-item"><a href="#/stock_card" class="sidebar-link"><i class="mdi mdi-adjust"></i><span class="hide-menu"> Stock Card</span></a></li>
                                <li class="sidebar-item"><a href="#/stock_opname" class="sidebar-link"><i class="mdi mdi-adjust"></i><span class="hide-menu"> Stock Opname</span></a></li>
                            </ul>
                        </li>
                        <li class="sidebar-item"> <a class="sidebar-link waves-effect waves-dark sidebar-link" href="#/cost" aria-expanded="false"><i class="fas fa-dollar-sign"></i><span class="hide-menu">Cost</span></a></li>
                        <li class="sidebar-item"> <a class="sidebar-link waves-effect waves-dark sidebar-link" href="#/task" aria-expanded="false"><i class="mdi mdi-clipboard-text"></i><span class="hide-menu">Task</span></a></li>
                        <li class="sidebar-item"> <a class="sidebar-link waves-effect waves-dark sidebar-link" href="#/reminder" aria-expanded="false"><i class="mdi mdi-calendar"></i><span class="hide-menu">Reminder</span></a></li>
                    </ul>
                </nav>

            </div>

        </aside>

        <div class="page-wrapper" id="app_content">
            <!-- LOAD ALL CONTENT HERE -->
        </div>

    </div>

    <aside class="customizer">
        <a href="javascript:void(0)" class="service-panel-toggle" id="btn_panel"><i class="fa fa-spin fa-cog"></i></a>
        <div class="customizer-body">
            <ul class="nav customizer-tab" role="tablist">
                <li class="nav-item">
                    <a class="nav-link active" id="pills-home-tab" data-toggle="pill" href="#pills-home" role="tab" aria-controls="pills-home" aria-selected="true"><i class="mdi mdi-wrench font-20"></i> <br/> Setting</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" id="pills-contact-tab" data-toggle="pill" href="#pills-contact" role="tab" aria-controls="pills-contact" aria-selected="false"><i class="mdi mdi-star-circle font-20"></i> <br/> Logs</a>
                </li>
            </ul>
            <div class="tab-content" id="pills-tabContent">
                <div class="tab-pane fade show active" id="pills-home" role="tabpanel" aria-labelledby="pills-home-tab">
                    <div class="p-15 border-bottom">
                        <!-- Sidebar -->
                        <h5 class="font-medium m-b-10 m-t-10">Layout Settings</h5>
                        <div class="custom-control custom-checkbox m-t-10">
                            <input type="checkbox" class="custom-control-input" name="theme-view" id="theme-view">
                            <label class="custom-control-label" for="theme-view">Dark Theme</label>
                        </div>
                        <div class="custom-control custom-checkbox m-t-10">
                            <input type="checkbox" class="custom-control-input sidebartoggler" name="collapssidebar" id="collapssidebar">
                            <label class="custom-control-label" for="collapssidebar">Collapse Sidebar</label>
                        </div>
                        <div class="custom-control custom-checkbox m-t-10">
                            <input type="checkbox" class="custom-control-input" name="sidebar-position" id="sidebar-position">
                            <label class="custom-control-label" for="sidebar-position">Fixed Sidebar</label>
                        </div>
                        <div class="custom-control custom-checkbox m-t-10">
                            <input type="checkbox" class="custom-control-input" name="header-position" id="header-position">
                            <label class="custom-control-label" for="header-position">Fixed Header</label>
                        </div>
                        <div class="custom-control custom-checkbox m-t-10">
                            <input type="checkbox" class="custom-control-input" name="boxed-layout" id="boxed-layout">
                            <label class="custom-control-label" for="boxed-layout">Boxed Layout</label>
                        </div>
                    </div>
                    <div class="p-15 border-bottom">
                        <!-- Logo BG -->
                        <h5 class="font-medium m-b-10 m-t-10">Logo Backgrounds</h5>
                        <ul class="theme-color">
                            <li class="theme-item"><a href="javascript:void(0)" class="theme-link" data-logobg="skin1"></a></li>
                            <li class="theme-item"><a href="javascript:void(0)" class="theme-link" data-logobg="skin2"></a></li>
                            <li class="theme-item"><a href="javascript:void(0)" class="theme-link" data-logobg="skin3"></a></li>
                            <li class="theme-item"><a href="javascript:void(0)" class="theme-link" data-logobg="skin4"></a></li>
                            <li class="theme-item"><a href="javascript:void(0)" class="theme-link" data-logobg="skin5"></a></li>
                            <li class="theme-item"><a href="javascript:void(0)" class="theme-link" data-logobg="skin6"></a></li>
                        </ul>
                        <!-- Logo BG -->
                    </div>
                    <div class="p-15 border-bottom">
                        <!-- Navbar BG -->
                        <h5 class="font-medium m-b-10 m-t-10">Navbar Backgrounds</h5>
                        <ul class="theme-color">
                            <li class="theme-item"><a href="javascript:void(0)" class="theme-link" data-navbarbg="skin1"></a></li>
                            <li class="theme-item"><a href="javascript:void(0)" class="theme-link" data-navbarbg="skin2"></a></li>
                            <li class="theme-item"><a href="javascript:void(0)" class="theme-link" data-navbarbg="skin3"></a></li>
                            <li class="theme-item"><a href="javascript:void(0)" class="theme-link" data-navbarbg="skin4"></a></li>
                            <li class="theme-item"><a href="javascript:void(0)" class="theme-link" data-navbarbg="skin5"></a></li>
                            <li class="theme-item"><a href="javascript:void(0)" class="theme-link" data-navbarbg="skin6"></a></li>
                        </ul>
                        <!-- Navbar BG -->
                    </div>
                    <div class="p-15 border-bottom">
                        <!-- Logo BG -->
                        <h5 class="font-medium m-b-10 m-t-10">Sidebar Backgrounds</h5>
                        <ul class="theme-color">
                            <li class="theme-item"><a href="javascript:void(0)" class="theme-link" data-sidebarbg="skin1"></a></li>
                            <li class="theme-item"><a href="javascript:void(0)" class="theme-link" data-sidebarbg="skin2"></a></li>
                            <li class="theme-item"><a href="javascript:void(0)" class="theme-link" data-sidebarbg="skin3"></a></li>
                            <li class="theme-item"><a href="javascript:void(0)" class="theme-link" data-sidebarbg="skin4"></a></li>
                            <li class="theme-item"><a href="javascript:void(0)" class="theme-link" data-sidebarbg="skin5"></a></li>
                            <li class="theme-item"><a href="javascript:void(0)" class="theme-link" data-sidebarbg="skin6"></a></li>
                        </ul>
                        <!-- Logo BG -->
                    </div>
                </div>
                <div class="tab-pane fade p-15" id="pills-contact" role="tabpanel" aria-labelledby="pills-contact-tab">
                    <h6 class="m-t-20 m-b-20">Activity Timeline</h6>
                    <div id="sidebar_log">
                        <div class="text-center">
                            <i class="fa fa-spinner fa-spin fa-3x mb-3"></i>
                            <h3>Loading</h3>
                            <h6>Silahkan tunggu...</h6>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </aside>
    

    <script src="<?= base_url() ?>assets/libs/jquery/dist/jquery.min.js"></script>
    <script src="<?= base_url() ?>assets/libs/popper.js/dist/umd/popper.min.js"></script>
    <script src="<?= base_url() ?>assets/libs/bootstrap/dist/js/bootstrap.min.js"></script>
    
    <script src="<?= base_url() ?>dist/js/app.min.js"></script>
    <script src="<?= base_url() ?>dist/js/app.init.js"></script>
    <script src="<?= base_url() ?>dist/js/app-style-switcher.js"></script>

    <script src="<?= base_url() ?>assets/libs/perfect-scrollbar/dist/perfect-scrollbar.jquery.min.js"></script>
    <script src="<?= base_url() ?>assets/extra-libs/sparkline/sparkline.js"></script>
    <script src="<?= base_url() ?>dist/js/waves.js"></script>
    <script src="<?= base_url() ?>dist/js/sidebarmenu.js"></script>
    <script src="<?= base_url() ?>dist/js/custom.min.js"></script>
    
    <script src="<?= base_url() ?>assets/libs/block-ui/jquery.blockUI.js"></script>
    <script src="<?= base_url() ?>assets/libs/toastr/build/toastr.min.js"></script>
    <script src="<?= base_url() ?>assets/libs/jquery-validation/dist/jquery.validate.min.js"></script>
    <script src="<?= base_url() ?>assets/libs/datatables-bs4/datatables.min.js"></script>
    <script src="<?= base_url() ?>assets/libs/sweetalert2/dist/sweetalert2.all.min.js"></script>
    <script src="<?= base_url() ?>assets/libs/moment/min/moment.min.js"></script>
    <script src="<?= base_url() ?>assets/libs/fullcalendar/dist/fullcalendar.min.js"></script>
    <script src="<?= base_url() ?>assets/libs/inputmask/dist/min/jquery.inputmask.bundle.min.js"></script>
    <script src="<?= base_url() ?>assets/libs/nicescroll/jquery.nicescroll.min.js"></script>
    <script src="<?= base_url() ?>assets/libs/dropify/dist/js/dropify.min.js"></script>
    <script src="<?= base_url() ?>assets/libs/select2/dist/js/select2.full.min.js"></script>
    <script src="<?= base_url() ?>assets/libs/select2/dist/js/select2.min.js"></script>
    <script src="<?= base_url() ?>dist/js/pages/samplepages/jquery.PrintArea.js"></script>
    <script src="<?= base_url() ?>assets/libs/typeahead.js/dist/typeahead.jquery.min.js"></script>
    <script src="<?= base_url() ?>assets/libs/typeahead.js/dist/bloodhound.min.js"></script>
    <script src="<?= base_url() ?>assets/libs/chart.js/dist/Chart.min.js"></script>


    <script src="<?= base_url() ?>src/setting.js"></script>
    <script src="<?= base_url() ?>src/main.js"></script>
    <script>
        document.addEventListener('DOMContentLoaded', function () {
            mainController.init('<?= $this->session->userdata('api_token') ?>')
        })
    </script>
</body>

</html>