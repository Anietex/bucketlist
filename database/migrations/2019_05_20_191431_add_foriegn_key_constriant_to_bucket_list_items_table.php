<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddForiegnKeyConstriantToBucketListItemsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('bucket_list_items', function (Blueprint $table) {
            $table->foreign('bucket_list_id')
                ->references('id')->on('bucket_lists')
                ->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('bucket_list_items', function (Blueprint $table) {
            $table->dropForeign('bucket_list_items_bucket_list_id_foreign');
        });
    }
}
