<?php
namespace App\Transformers;

use League\Fractal\TransformerAbstract;
use App\Models\Comment;

class CommentTransformer extends TransformerAbstract {

    protected $defaultIncludes = [
        'user'
    ];

    public function transform(Comment $comment) {
        return [
            'id'         => $comment->id,
            'topic_id'   => $comment->topic_id,
            'content'    => $comment->content,
            'created_at' => $comment->created_at->toDateTimeString(),
            'updated_at' => $comment->updated_at->toDateTimeString(),
        ];
    }

    public function includeUser(Comment $comment) {
        return $this->item($comment->user, new UserTransformer);
    }

}
