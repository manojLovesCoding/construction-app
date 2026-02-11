<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use App\Models\Testimonial;
use App\Models\TempImage;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Validator;
use Intervention\Image\Drivers\Gd\Driver;
use Intervention\Image\ImageManager;

class TestimonialController extends Controller
{
    // this method will show all testimonials
    public function index()
    {
        $testimonials = Testimonial::orderBy('created_at', 'DESC')->get();

        return response()->json([
            'status' => true,
            'data' => $testimonials,
        ]);
    }

    // this method will return single testimonial
    public function show($id)
    {
        $testimonial = Testimonial::find($id);

        if ($testimonial == null) {
            return response()->json([
                'status' => false,
                'message' => 'Testimonial not found',
            ]);
        }

        return response()->json([
            'status' => true,
            'data' => $testimonial,
        ]);
    }

    // this method will create testimonial
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'testimonial' => 'required',
            'citation' => 'required',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => false,
                'errors' => $validator->messages(),
            ]);
        }

        $testimonial = new Testimonial();
        $testimonial->testimonial = $request->testimonial;
        $testimonial->citation = $request->citation;
        $testimonial->status = $request->status;
        $testimonial->save();

        // Save image
        if ($request->imageId > 0) {

            $tempImage = TempImage::find($request->imageId);

            if ($tempImage != null) {

                $extArray = explode('.', $tempImage->name);
                $ext = last($extArray);

                $fileName = strtotime('now') . $testimonial->id . '.' . $ext;

                $manager = new ImageManager(Driver::class);

                // small thumbnail
                $sourcePath = public_path('uploads/temp/' . $tempImage->name);
                $destPath = public_path('uploads/testimonials/small/' . $fileName);

                $image = $manager->read($sourcePath);
                $image->coverDown(300, 300);
                $image->save($destPath);

                // large thumbnail
                $destPath = public_path('uploads/testimonials/large/' . $fileName);

                $image = $manager->read($sourcePath);
                $image->scaleDown(800);
                $image->save($destPath);

                $testimonial->image = $fileName;
                $testimonial->save();
            }
        }

        return response()->json([
            'status' => true,
            'message' => 'Testimonial created successfully',
        ]);
    }

    // this method will update testimonial
    public function update(Request $request, $id)
    {
        $testimonial = Testimonial::find($id);

        if ($testimonial == null) {
            return response()->json([
                'status' => false,
                'message' => 'Testimonial not found',
            ]);
        }

        $validator = Validator::make($request->all(), [
            'testimonial' => 'required',
            'citation' => 'required',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => false,
                'errors' => $validator->messages(),
            ]);
        }

        $testimonial->testimonial = $request->testimonial;
        $testimonial->citation = $request->citation;
        $testimonial->status = $request->status;
        $testimonial->save();

        // Update image
        if ($request->imageId > 0) {

            $oldImage = $testimonial->image;
            $tempImage = TempImage::find($request->imageId);

            if ($tempImage != null) {

                $extArray = explode('.', $tempImage->name);
                $ext = last($extArray);

                $fileName = strtotime('now') . $testimonial->id . '.' . $ext;

                $manager = new ImageManager(Driver::class);

                // small thumbnail
                $sourcePath = public_path('uploads/temp/' . $tempImage->name);
                $destPath = public_path('uploads/testimonials/small/' . $fileName);

                $image = $manager->read($sourcePath);
                $image->coverDown(300, 300);
                $image->save($destPath);

                // large thumbnail
                $destPath = public_path('uploads/testimonials/large/' . $fileName);

                $image = $manager->read($sourcePath);
                $image->scaleDown(800);
                $image->save($destPath);

                $testimonial->image = $fileName;
                $testimonial->save();

                // delete old image
                if ($oldImage != '') {
                    File::delete(public_path('uploads/testimonials/large/' . $oldImage));
                    File::delete(public_path('uploads/testimonials/small/' . $oldImage));
                }
            }
        }

        return response()->json([
            'status' => true,
            'message' => 'Testimonial updated successfully',
        ]);
    }

    // this method will delete testimonial
    public function destroy($id)
    {
        $testimonial = Testimonial::find($id);

        if ($testimonial == null) {
            return response()->json([
                'status' => false,
                'message' => 'Testimonial not found',
            ]);
        }

        File::delete(public_path('uploads/testimonials/large/' . $testimonial->image));
        File::delete(public_path('uploads/testimonials/small/' . $testimonial->image));

        $testimonial->delete();

        return response()->json([
            'status' => true,
            'message' => 'Testimonial deleted successfully',
        ]);
    }
}
