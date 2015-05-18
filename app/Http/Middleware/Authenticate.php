<?php
namespace App\Http\Middleware;

use Closure;
use Illuminate\Contracts\Auth\Guard;
use Illuminate\Contracts\Routing\Middleware;
use Illuminate\Support\MessageBag;
use App\Transformers\ErrorTransformer;

class Authenticate implements Middleware {

    protected $auth;

    public function __construct(Guard $auth) {
        $this->auth = $auth;
    }

    public function handle($request, Closure $next) {
        if ($this->auth->guest() === true) {
            $messageBag = new MessageBag([
                'message' => 'Please sign in first'
            ]);

            return app('fractal')->item($messageBag, new ErrorTransformer)->setStatusCode(400);
        }

        return $next($request);
    }

}
