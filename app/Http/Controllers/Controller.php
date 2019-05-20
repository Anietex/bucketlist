<?php

namespace App\Http\Controllers;


use Illuminate\Database\Eloquent\Model;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Routing\Controller as BaseController;
use League\Fractal\Pagination\IlluminatePaginatorAdapter;
use League\Fractal\Serializer\ArraySerializer;
use League\Fractal\TransformerAbstract;


class Controller extends BaseController
{
    use AuthorizesRequests, DispatchesJobs, ValidatesRequests;


    protected function transform(Model $model, TransformerAbstract $transformer,$code=200){
        $data =  fractal($model,$transformer)->serializeWith(new ArraySerializer());

        return $this->success($data,$code);
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

    protected function success($data,$code=200){
        return response()->json(["status"=>"success","data"=>$data],$code);
    }

    protected function error($message,$code=500){
        return response()->json(["status"=>"error","message"=>$message],$code);
    }


}
