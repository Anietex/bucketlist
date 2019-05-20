<?php

use Dingo\Api\Routing\Router;
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
    $api->group(['prefix'=>'bucketlists'],function (Dingo\Api\Routing\Router $api){
        $api->get('/','BucketListController@index');
        $api->get('/{id}','BucketListController@show');
        $api->post('/','BucketListController@store');
        $api->put('/{id}','BucketListController@update');
        $api->delete('/{id}','BucketListController@destroy');


        $api->post('/{bucket_list_id}/items','BucketListItemController@store');
    });



});


Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});
