<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use App\Models\TempImage;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Intervention\Image\ImageManager;
use Intervention\Image\Drivers\Gd\Driver;

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

        // create new image instance (800 x 600)
        $sourcePath = public_path('uploads/temp/' . $imageName);
        $destPath = public_path('uploads/temp/thumb/' . $imageName);
        $manager = new ImageManager(Driver::class);
        $image = $manager->read($sourcePath);
        $image->coverDown(300, 300);
        $image->save($destPath);

        return response()->json([
            'status' => true,
            'message' => 'Image uploaded successfully',
            'data' => [
                'id' => $model->id,
                'name' => $model->name,
                'created_at' => $model->created_at,
                'updated_at' => $model->updated_at,
            ]
        ]);
    }
}
