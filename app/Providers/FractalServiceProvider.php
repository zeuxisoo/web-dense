<?php
namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use League\Fractal\Manager;
use League\Fractal\Serializer\DataArraySerializer;
use App\Services\FractalService;

class FractalServiceProvider extends ServiceProvider {

    public function register() {
        $this->app->singleton('fractal', function($app) {
            $manager = new Manager();
            $manager->setSerializer(new DataArraySerializer());

            return new FractalService($manager);
        });
    }

}
