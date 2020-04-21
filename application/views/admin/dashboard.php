<div class="page-breadcrumb">
    <div class="row">
        <div class="col-5 align-self-center">
            <h4 class="page-title">Dashboard</h4>
        </div>
        <div class="col-7 align-self-center">
            <div class="d-flex align-items-center justify-content-end">
                <!-- <nav aria-label="breadcrumb">
                    <ol class="breadcrumb">
                        <li class="breadcrumb-item active" aria-current="page">Dashboard</li>
                    </ol>
                </nav> -->
            </div>
        </div>
    </div>
</div>

<div class="container-fluid">
    <div class="row">
        <div class="col-12">
            <div class="card">
                <div class="card-body" id="bussiness_container">
                    <div class="d-flex align-items-center">
                        <div>
                            <h4 class="card-title mb-0">Bussiness</h4>
                        </div>
                        <div class="ml-auto">
                            <select class="custom-select border-0 text-muted" id="bussiness_filter">
                            </select>
                        </div>
                    </div>
                    <canvas id="bussiness_chart" height="100"></canvas>
                </div>
            </div>
        </div>
        <div class="col-6">
            <div class="card">
                <div class="card-body" id="debt_container">
                    <h4 class="card-title">Debt</h4>
                    <canvas id="debt_chart"></canvas>
                </div>
            </div>
        </div>
        <div class="col-6">
            <div class="card">
                <div class="card-body" id="receiveable_container">
                    <h4 class="card-title">Receiveable</h4>
                    <canvas id="receiveable_chart"></canvas>
                </div>
            </div>
        </div>
        <div class="col-md-6">
            <div class="card" id="top_10_container" style="max-height: 500px;">
                <div class="card-body">
                    <div class="d-flex align-items-center">
                        <div>
                            <h4 class="card-title mb-0">Top 10 Products</h4>
                        </div>
                        <div class="ml-auto">
                            <select class="custom-select border-0 text-muted" id="top_10_filter">
                                <option value="qtyKey">By Qty</option>
                                <option value="totalKey">By Sales</option>                           
                            </select>
                        </div>
                    </div>
                </div>
                <div class="table-responsive">
                    <table class="table table-hover" id="t_top_10">
                        <thead>
                            <tr>
                                <th class="border-top-0">NAME</th>
                                <th class="border-top-0">QTY</th>
                                <th class="border-top-0">TOTAL</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td class="txt-oflo text-center" colspan="3">Loading</td>
                            </tr>
                        </tbody>
                    </table>
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
    import dashboardController from '<?= base_url() ?>src/modules/dashboard.js';
    dashboardController.init('<?= $this->session->userdata('api_token') ?>')
</script>