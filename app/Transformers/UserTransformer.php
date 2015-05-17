<?php
namespace App\Transformers;

use League\Fractal\TransformerAbstract;
use App\Models\User;

class UserTransformer extends TransformerAbstract {

    public function transform(User $user) {
        return [
            'username'   => $user->username,
            'created_at' => $user->created_at->toDateTimeString(),
            'updated_at' => $user->updated_at->toDateTimeString(),
        ];
    }

}
