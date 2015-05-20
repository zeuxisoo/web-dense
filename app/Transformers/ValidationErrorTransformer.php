<?php
namespace App\Transformers;

use Illuminate\Support\MessageBag;

class ValidationErrorTransformer extends MessageBagTransformer {

    public function transform(MessageBag $bag) {
        return [
            'message' => $bag->first()
        ];
    }

}
