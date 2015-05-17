<?php
namespace App\Http\Controllers\Api;

use Illuminate\Http\Response;
use App\Http\Controllers\Controller;

class APIController extends Controller {

    protected $fractal;

    public function __construct() {
        $this->fractal = app('fractal');
    }

    public function withFailed(Response $response) {
        return $response->setStatusCode(400);
    }

    public function withError(Response $response) {
        return $this->withFailed($response);
    }

}
