<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Comment extends Model {

    use SoftDeletes;

    protected $table    = 'comments';
    protected $fillable = ['user_id', 'topic_id', 'content'];
    protected $hidden   = [];

    public function user() {
        return $this->belongsTo('App\Models\User');
    }

}
