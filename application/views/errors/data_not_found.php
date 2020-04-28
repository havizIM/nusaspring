
<div class="container-fluid">

    <div class="error-box" style="position: relative !important; min-height: 76vh">
        <div class="error-body text-center">
            <h1 class="error-title">404</h1>
            <h3 class="text-uppercase error-subtitle">DATA NOT FOUND !</h3>
            <p class="text-muted m-t-30 m-b-30">THE DATA WITH THIS ID NOT FOUND IN OUR API </p>
            <a href="javascript:void(0);" class="btn btn-primary btn-rounded waves-effect waves-light m-b-40 btn-back">Back</a>
        </div>
    </div>

</div>

<footer class="footer text-center">
    All Rights Reserved by UD. Nusa Spring. Designed and Developed by
    <a href="https://wrappixel.com">CodeManiac</a>.
</footer>

<script>
    $(document).ready(function(){
        $('.btn-back').on('click', function(){
            window.history.back();
        })
    })
</script>