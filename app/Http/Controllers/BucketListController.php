<?php

namespace App\Http\Controllers;

use App\Http\Transformers\BucketlistTransformer;
use App\Models\Bucketlist;
use Illuminate\Http\Request;

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

        return $this->transform($this->bucketlist,$this->bucketlistTransformer);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        dump($request->name);
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
