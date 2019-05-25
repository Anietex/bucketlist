<?php


namespace App\Http\Transformers;



use App\Models\BucketList;
use League\Fractal\TransformerAbstract;

class BucketlistTransformer extends TransformerAbstract
{

    public function transform(BucketList $bucketlist){
        return [
           "id"=>$bucketlist->id,
            "name"=>$bucketlist->name,
            "date_created"=>$bucketlist->created_at,
            "date_modified"=>$bucketlist->updated_at,
            "created_by"=>$bucketlist->user_id
        ];
    }

}
