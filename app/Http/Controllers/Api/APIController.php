<?php
namespace App\Http\Controllers\Api;

use Illuminate\Http\Response;
use Illuminate\Support\MessageBag;
use App\Http\Controllers\Controller;
use App\Transformers\MessageBagTransformer;

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

    public function withErrorMessage($message) {
        $messageBag = new MessageBag([
            'message' => $message
        ]);

        $response = $this->fractal->item($messageBag, new MessageBagTransformer);

        return $this->withError($response);
    }

    public function withSuccessMessage($message) {
        $messageBag = new MessageBag([
            'message' => $message
        ]);

        return $response = $this->fractal->item($messageBag, new MessageBagTransformer);
    }

}
