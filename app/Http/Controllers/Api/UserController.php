<?php
namespace App\Http\Controllers\Api;

use Auth;
use Validator;
use Illuminate\Http\Request;
use App\Models\User;
use App\Transformers\ErrorTransformer;
use App\Transformers\ValidationErrorTransformer;
use App\Transformers\UserTransformer;

class UserController extends APIController {

    public function status() {
        if (Auth::check() === false) {
            $message  = $this->messageBag('Please sign in first');
            $response = $this->fractal->item($message, new ErrorTransformer);
            $response = $this->withError($response);
        }else{
            $response = $this->fractal->item(Auth::user(), new UserTransformer);
        }

        return $response;
    }

    public function signup(Request $request) {
        $validator = Validator::make($request->all(), [
            'username'              => 'required|alpha_dash|min:6|max:30|unique:users',
            'email'                 => 'required|email|unique:users',
            'password'              => 'required|min:8|confirmed',
            'password_confirmation' => 'required|min:8'
        ]);

        if ($validator->fails()) {
            $response = $this->fractal->item($validator->errors(), new ValidationErrorTransformer);
            $response = $this->withError($response);
        }else{
            $request->merge([
                'password' => bcrypt($request->input('password'))
            ]);

            $user     = User::create($request->only('username', 'email', 'password'));
            $response = $this->fractal->item($user, new UserTransformer);
        }

        return $response;
    }

    public function signin(Request $request) {
        $validator = Validator::make($request->all(), [
            'account'  => 'required',
            'password' => 'required',
        ]);

        if ($validator->fails()) {
            $response = $this->fractal->item($validator->errors(), new ValidationErrorTransformer);
            $response = $this->withError($response);
        }else{
            $account = $request->input('account');
            $user    = User::where('username', $account)->orWhere('email', $account)->find(1);

            if ($user === null) {
                $message  = $this->messageBag('Can not found related account record');
                $response = $this->fractal->item($message, new ErrorTransformer);
                $response = $this->withError($response);
            }else{
                // Compare account is or not email to find out match column
                $accountColumn = filter_var($request->input('account'), FILTER_VALIDATE_EMAIL) ? 'email' : 'username';

                // Put find out column into request data
                $request->merge([
                    $accountColumn => $request->input('account')
                ]);

                if (Auth::attempt($request->only($accountColumn, 'password')) === false) {
                    $message  = $this->messageBag('These account do not match our records');
                    $response = $this->fractal->item($message, new ErrorTransformer);
                    $response = $this->withError($response);
                }else{
                    $response = $this->fractal->item($user, new UserTransformer);
                }
            }
        }

        return $response;
    }

}
