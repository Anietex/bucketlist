<?php

namespace App\Http\Controllers;

use App\Http\Requests\BucketListItemRequest;
use App\Http\Transformers\BucketListItemTransformer;
use App\Models\BucketList;
use App\Models\BucketListItem;
use Dotenv\Validator;
use Illuminate\Http\Request;

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


    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(BucketListItemRequest $request)
    {



        if(!BucketList::find($request->bucket_list_id))
             return $this->error("Bucket list does not exists");

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
        //
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
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}