<?php


namespace App\Http\Transformers;



use App\Models\Bucketlist;
use League\Fractal\TransformerAbstract;

class BucketlistTransformer extends TransformerAbstract
{

    public function transform(Bucketlist $bucketlist){
        return [
           "id"=>"12345",
            "name"=>"Bucketlist1"
        ];
    }

}
