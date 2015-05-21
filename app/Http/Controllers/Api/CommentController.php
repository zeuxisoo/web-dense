<?php
namespace App\Http\Controllers\Api;

use Auth;
use Validator;
use Illuminate\Http\Request;
use App\Http\Controllers\Api\APIController;
use App\Transformers\ValidationErrorTransformer;
use App\Transformers\CommentTransformer;
use App\Models\Topic;
use App\Models\Comment;

class CommentController extends APIController {

    public function create(Request $request) {
        $validator = Validator::make($request->all(), [
            'topic_id' => 'required',
            'content'  => 'required',
        ]);

        if ($validator->fails()) {
            $response = $this->fractal->item($validator->errors(), new ValidationErrorTransformer);
            $response = $this->withError($response);
        }else{
            $topic = Topic::find($request->input('topic_id'));

            if ($topic === null) {
                $response  = $this->withErrorMessage('Can not found related topic');
            }else{
                $form_data = $request->only('topic_id', 'content');
                $form_data = array_merge($form_data, [
                    'user_id' => Auth::user()->id,
                ]);

                $comment = Comment::create($form_data);

                return $this->fractal->item($comment, new CommentTransformer);
            }
        }

        return $response;
    }

    public function show($topic_id) {
        $topic = Topic::find($topic_id);

        if ($topic === null) {
            $response  = $this->withErrorMessage('Can not found related topic');
        }else{
            $comments = Comment::whereTopicId($topic_id)->orderBy('created_at', 'asc')->get();
            $response =  $this->fractal->collection($comments, new CommentTransformer);
        }

        return $response;
    }

}
