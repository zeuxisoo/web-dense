<!doctype html>
<html class="no-js" lang="en">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>Dense</title>
<link rel="stylesheet" href="static/vendor/foundation/css/foundation.min.css" />
<link rel="stylesheet" href="static/client/css/application.css" />
<script src="static/vendor/modernizr/modernizr.js"></script>
</head>
<body>
<div class="contain-to-grid">
    <nav class="top-bar foundation-bar" data-topbar>
        <ul class="title-area">
            <li class="name">
                <h1><a href="{{ route('home.index') }}">Dense</a></h1>
            </li>
            <li class="toggle-topbar menu-icon">
                <a href="#"><span>Menu</span></a>
            </li>
        </ul>
        <section class="top-bar-section">
            <ul class="left">
                <li><a href="{{ route('home.index') }}">Home</a></li>
                <li><a href="#">Sign in</a></li>
                <li><a href="#">Sign up</a></li>
            </ul>
            <ul class="right">
                <li class="has-form">
                    <div class="row collapse">
                        <div class="large-8 small-9 columns">
                            <input type="text" placeholder="Search article">
                        </div>
                        <div class="large-4 small-3 columns">
                            <a href="#" class="button expand">Search</a>
                        </div>
                    </div>
                </li>
            </ul>
        </section>
    </nav>
</div>

<div class="row">
    <div class="large-12 columns">
        <br>
        @yield('container')
    </div>
</div>
<script src="static/vendor/jquery/jquery.js"></script>
<script src="static/vendor/foundation/js/foundation.min.js"></script>
<script src="static/vendor/foundation/js/foundation/foundation.topbar.js"></script>
<script src="static/client/js/application.js"></script>
</body>
</html>
