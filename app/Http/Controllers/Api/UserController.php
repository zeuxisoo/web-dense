<?php
namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Http\Controllers\Controller;
use App\Models\User;

class UserController extends Controller {

    public function signup(Request $request) {
        $validator = Validator::make($request->all(), [
            'username'              => 'required|alpha_dash|min:6|max:30|unique:users',
            'email'                 => 'required|email|unique:users',
            'password'              => 'required|min:8|confirmed',
            'password_confirmation' => 'required|min:8'
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors());
        }else{
            $user = User::create($request->only('username', 'email', 'password'));

            return response()->json($user);
        }
    }

}
