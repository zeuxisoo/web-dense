<?php
namespace App\Http\Controllers\Api;

use Auth;
use Validator;
use Illuminate\Http\Request;
use App\Http\Controllers\Api\APIController;
use App\Transformers\ValidationErrorTransformer;
use App\Transformers\TopicTransformer;
use App\Models\Topic;

class TopicController extends APIController {

    public function latest() {
        $topics = Topic::with('user')->orderBy('created_at', 'desc')->paginate();

        return $this->fractal->collection($topics, new TopicTransformer);
    }

    public function create(Request $request) {
        $validator = Validator::make($request->all(), [
            'subject' => 'required',
        ]);

        if ($validator->fails()) {
            $response = $this->fractal->item($validator->errors(), new ValidationErrorTransformer);
            $response = $this->withError($response);
        }else{
            $form_data = $request->only('subject', 'content');
            $form_data = array_merge($form_data, [
                'user_id' => Auth::user()->id,
                'status'  => 'open'
            ]);

            $topic = Topic::create($form_data);

            return $this->fractal->item($topic, new TopicTransformer);
        }

        return $response;
    }

    public function show($id) {
        $topic = Topic::find($id);

        if ($topic === null) {
            return $this->withErrorMessage('Can not found related topic');
        }else{
            return $this->fractal->item($topic, new TopicTransformer);
        }
    }

    public function search(Request $request) {
        $validator = Validator::make($request->all(), [
            'keyword' => 'required',
        ]);

        if ($validator->fails()) {
            $response = $this->fractal->item($validator->errors(), new ValidationErrorTransformer);
            $response = $this->withError($response);
        }else{
            $keyword  = $request->input('keyword');
            $topics   = Topic::where('subject', 'LIKE', '%'.$keyword.'%')->paginate();
            $response = $this->fractal->collection($topics, new TopicTransformer);
        }

        return $response;
    }

}
