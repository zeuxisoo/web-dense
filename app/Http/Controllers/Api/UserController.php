<?php
namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;

class UserController extends Controller {

    public function signup() {
        return response()->json($this);
    }

}
