<?php
namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Ballen\Gravel\Gravatar;

class GravatarServiceProvider extends ServiceProvider {

    public function register() {
        $this->app->singleton('gravatar', function($app) {
            return new Gravatar();
        });
    }

}
