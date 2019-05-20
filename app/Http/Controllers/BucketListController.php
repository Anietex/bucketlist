<?php

namespace App\Http\Controllers;

use App\Http\Requests\BucketlistRequest;
use App\Http\Transformers\BucketlistTransformer;
use App\Models\Bucketlist;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class BucketListController extends Controller
{

    /**
     * @var Bucketlist
     */
    protected $bucketlist;


    /**
     * @var BucketlistTransformer
     */
    protected $bucketlistTransformer;



    public function __construct(Bucketlist $bucketlist,
                                BucketlistTransformer $bucketlistTransformer)
    {

        $this->bucketlist = $bucketlist;
        $this->bucketlistTransformer = $bucketlistTransformer;
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {

        $bucketlists = $this->bucketlist->paginate();
        return $this->transformWithPages($bucketlists,$this->bucketlistTransformer);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(BucketlistRequest $request)
    {

        $data['name'] = $request->name;
        $data["user_id"] = 1;
        $bucketlist = Bucketlist::create($data);
       if($bucketlist)
           return $this->transform($bucketlist,$this->bucketlistTransformer,201);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $bucketlist = $this->bucketlist->find($id);
        if(!$bucketlist)
            return $this->error("Bucketlist not found", 404);

        return $this->transform($bucketlist,$this->bucketlistTransformer);
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
        $bucketlist = $this->bucketlist->find($id);

        if(!$bucketlist)
            return $this->error("The bucketlist you are trying to update does not exist",404);

        Validator::make($request->all(),[
            "name"=>"required"
        ])->validate();


        $bucketlist->name = $request->name;
        if($bucketlist->save())
             return $this->transform($bucketlist,$this->bucketlistTransformer);

        return $this->error("Unable to update bucketlist");

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
