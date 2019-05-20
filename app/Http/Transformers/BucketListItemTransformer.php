<?php


namespace App\Http\Transformers;


use App\Models\BucketListItem;
use League\Fractal\TransformerAbstract;

class BucketListItemTransformer extends TransformerAbstract
{

    public function transform(BucketListItem $item){

        return [
            "id"=>$item->id,
            "bucket_list"=>$item->bucketList->name,
            "name"=>$item->name,
            "done"=>(boolean)$item->done,
            "date_created"=>$item->created_at,
            "date_modified"=>$item->updated_at,
        ];
    }
}
