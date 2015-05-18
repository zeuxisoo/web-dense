<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Topic extends Model {

    use SoftDeletes;

    protected $table    = 'topics';
    protected $fillable = ['user_id', 'subject', 'content', 'status'];
    protected $hidden   = ['user_id'];

    public function user() {
        return $this->belongsTo('App\Models\User');
    }

}
