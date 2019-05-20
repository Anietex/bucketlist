<?php

namespace App\Http\Controllers;


use Illuminate\Database\Eloquent\Model;
use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Pagination\Paginator;
use Illuminate\Routing\Controller as BaseController;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use League\Fractal\Pagination\IlluminatePaginatorAdapter;
use League\Fractal\Serializer\ArraySerializer;
use League\Fractal\Serializer\JsonApiSerializer;
use League\Fractal\TransformerAbstract;
use Spatie\Fractal\Fractal;


class Controller extends BaseController
{
    use AuthorizesRequests, DispatchesJobs, ValidatesRequests;


    protected function transform(Model $model, TransformerAbstract $transformer,$status=200){
        $data =  fractal($model,$transformer)->serializeWith(new ArraySerializer());

        return $this->success($data,$status);
    }

    protected function transformWithPages( $paginator, TransformerAbstract $transformer){

        $collection = $paginator->getCollection();

       $transformItems = \fractal()
            ->collection($collection)
           ->transformWith($transformer)
            ->serializeWith(new ArraySerializer())
            ->withResourceName('items')
            ->paginateWith(new IlluminatePaginatorAdapter($paginator))
            ->toArray();

       return $this->success($transformItems);
    }

    protected function success($data,$status=200){
        return response()->json(["status"=>"success","data"=>$data],$status);
    }

    protected function error($message,$status=500){

    }


}
