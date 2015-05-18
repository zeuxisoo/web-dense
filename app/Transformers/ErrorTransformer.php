<?php
namespace App\Transformers;

use League\Fractal\TransformerAbstract;
use Illuminate\Support\MessageBag;

class ErrorTransformer extends TransformerAbstract {

    public function transform(MessageBag $bag) {
        return [
            'message' => $bag->first()
        ];
    }

}
