<?php
namespace App\Transformers;

use League\Fractal\TransformerAbstract;
use App\Models\Topic;
use App\Models\User;

class TopicTransformer extends TransformerAbstract {

    protected $defaultIncludes = [
        'user'
    ];

    public function transform(Topic $topic) {
        return [
            'id'      => $topic->id,
            'subject' => $topic->subject,
            'content' => $topic->content,
            'created_at' => $topic->created_at->toDateTimeString(),
            'updated_at' => $topic->updated_at->toDateTimeString(),
        ];
    }

    public function includeUser(Topic $topic) {
        return $this->item($topic->user, new UserTransformer);
    }

}
