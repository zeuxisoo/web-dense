<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the controller to call when that URI is requested.
|
*/

$app->get('/', ['as' => 'home.index', 'uses' => 'App\Http\Controllers\HomeController@index']);

$app->group(['prefix' => 'api', 'namespace' => 'App\Http\Controllers\Api'], function($app) {
    $app->post('/user/signup', ['as' => 'api.user.signup', 'uses' => 'UserController@signup']);
});
