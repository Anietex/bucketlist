<?php

namespace App\Http\Controllers;

use App\Http\Requests\BucketListItemRequest;
use App\Http\Transformers\BucketListItemTransformer;
use App\Models\BucketList;
use App\Models\BucketListItem;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Input;
use Illuminate\Support\Facades\Validator;

class BucketListItemController extends Controller
{

    protected $bucketListItem;

    protected $itemTransformer;

    public function __construct(BucketListItem $bucketListItem,
                                BucketListItemTransformer $itemTransformer)
    {
        $this->bucketListItem = $bucketListItem;
        $this->itemTransformer = $itemTransformer;

    }

    /**
     * Display a listing of the resource.
     *
     * @param BucketListItem $bucketListItem
     * @param BucketListItemTransformer $itemTransformer
     * @return void
     */
    public function index()
    {
        if(!$this->isValidBucketLisId())
            return $this->error("Bucket list does not exists",404);

        $bucketList = $this->bucketListItem->where('bucket_list_id', request()->bucket_list_id)->get();

        return $this->transform($bucketList,$this->itemTransformer);

    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(BucketListItemRequest $request)
    {



        if(!$this->isValidBucketLisId())
             return $this->error("Bucket list does not exists",404);

        $data["name"] = $request->name;
        $data["bucket_list_id"] = $request->bucket_list_id;

        $bucketListItem = BucketListItem::create($data);

        if(!$bucketListItem)
            return $this->error("Unable to create bucket list item");

        return $this->transform($bucketListItem,$this->itemTransformer,201);

    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {

        $item = BucketListItem::where('bucket_list_id',request()->bucket_list_id)
        ->where('id',$id)->first();

        if(!$item)
            $this->error('Bucket list item does not exist',404);


        return $this->transform($item,$this->itemTransformer);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {

        Validator::make($request->all(),[
            'done'=>'boolean'
        ])->validate();

        $item = BucketListItem::where('bucket_list_id',request()->bucket_list_id)
            ->where('id',$id)->first();

        if(!$item)
            return $this->error("Bucket list item not found",404);


        $item->name = Input::get('name',$item->name);
        $item->done = Input::get('done',$item->done);

        if($item->save())
            return $this->transform($item->refresh(),$this->itemTransformer);

        return $this->error("Unable to update item");


    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $item = BucketListItem::where('bucket_list_id',request()->bucket_list_id)
            ->where('id',$id)->first();

        if(!$item)
            return $this->error("Bucket list item does not exist",404);

        if($item->delete())
            return $this->success(["message"=>"Item deleted successfully"]);

        return $this->error("Unable to delete item");
    }

    public function isValidBucketLisId(){
       return !!BucketList::find(request()->bucket_list_id);
    }
}
