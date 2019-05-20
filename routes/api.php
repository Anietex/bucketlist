<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

$api = app('Dingo\Api\Routing\Router');

$api->version('v1',["namespace"=>"App\\Http\\Controllers"], function (Dingo\Api\Routing\Router $api) {
    $api->get('bucketlists','BucketListController@index');
    $api->get('bucketlists/{id}','BucketListController@show');
    $api->post('bucketlists','BucketListController@store');
    $api->put('bucketlists/{id}','BucketListController@update');

});


Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});
