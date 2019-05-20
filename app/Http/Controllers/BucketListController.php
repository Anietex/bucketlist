<?php

namespace App\Http\Controllers;

use App\Http\Requests\BucketListRequest;
use App\Http\Transformers\BucketListTransformer;
use App\Models\BucketList;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class BucketListController extends Controller
{

    /**
     * @var BucketList
     */
    protected $bucketList;


    /**
     * @var BucketListTransformer
     */
    protected $bucketListTransformer;



    public function __construct(BucketList $bucketList,
                                BucketListTransformer $bucketListTransformer)
    {

        $this->bucketList = $bucketList;
        $this->bucketListTransformer = $bucketListTransformer;
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {

        $bucketLists = $this->bucketList->paginate();
        return $this->transformWithPages($bucketLists,$this->bucketListTransformer);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(BucketListRequest $request)
    {

        $data['name'] = $request->name;
        $data["user_id"] = 1;
        $bucketList = BucketList::create($data);
       if($bucketList)
           return $this->transform($bucketList,$this->bucketListTransformer,201);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $bucketList = $this->bucketList->find($id);
        if(!$bucketList)
            return $this->error("BucketList not found", 404);

        return $this->transform($bucketList,$this->bucketListTransformer);
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
        $bucketList = $this->bucketList->find($id);

        if(!$bucketList)
            return $this->error("The bucketList you are trying to update does not exist",404);

        Validator::make($request->all(),[
            "name"=>"required"
        ])->validate();


        $bucketList->name = $request->name;
        if($bucketList->save())
             return $this->transform($bucketList,$this->bucketListTransformer);

        return $this->error("Unable to update bucketList");

    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $bucketList = $this->bucketList->find($id);
        if(!$bucketList)
            return $this->error("The bucketList you are trying to  delete does not exist");

        if($bucketList->delete())
            return $this->success(["message"=>"bucketList deleted successfully"]);

        return $this->error("Unable to delete bucketList");

    }
}
