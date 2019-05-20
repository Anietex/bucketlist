<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class BucketListItem extends Model
{
    protected $fillable = ['name','bucket_list_id'];


    public function bucketList(){
        return $this->belongsTo(BucketList::class);
    }
}
