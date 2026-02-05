<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use App\Models\TempImage;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class TempImageController extends Controller
{
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'image' => 'required|mimes:jpeg,png,jpg,gif',
        ]);

        if ($validator->fails()) {
            return response()->json(['status' => false, 'errors' => $validator->errors()]);
        }

        $image = $request->image;

        $ext = $image->getClientOriginalExtension();
        $imageName = strtotime('now') . '.' . $ext;

        //save image to temp folder and save name to temp_images table
        $model = new TempImage();
        $model->name = $imageName;
        $model->save();

        //save image to temp folder
        $image->move(public_path('uploads/temp'), $imageName);
        return response()->json(['status' => true, 'data' => $model, 'message' => 'Image uploaded successfully', 'data' => ['name' => $imageName]]);
    }
}
