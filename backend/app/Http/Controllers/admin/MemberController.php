<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use App\Models\Member;
use App\Models\TempImage;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Validator;
use Intervention\Image\Drivers\Gd\Driver;
use Intervention\Image\ImageManager;

class MemberController extends Controller
{
    //this function will return all members to the admin panel
    public function index()
    {
        $members = Member::orderBy('created_at', 'desc')->get();
        return response()->json(['status' => true, 'members' => $members]);
    }

    //this function will return the view of creating a new member
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string',
            'job_title' => 'required|string',
        ]);

        if ($validator->fails()) {
            return response()->json(['status' => false, "errors" => $validator->errors()]);
        }

        $member = new Member();
        $member->name = $request->name;
        $member->job_title = $request->job_title;
        $member->linkedin_url = $request->linkedin_url;
        $member->status = $request->status;
        $member->save();

        //save temp images to member
        if ($request->imageId > 0) {
            $tempImage = TempImage::find($request->imageId);
            if ($tempImage != null) {
                $extArray = explode('.', $tempImage->name);
                $ext = last($extArray);

                $fileName = strtotime('now') . $member->id . '.' . $ext;

                //create small thumbnail here
                $sourcePath = public_path('uploads/temp/' . $tempImage->name);
                $destPath = public_path('uploads/members/' . $fileName);
                $manager = new ImageManager(Driver::class);
                $image = $manager->read($sourcePath);
                $image->coverDown(400, 500);
                $image->save($destPath);

                $member->image = $fileName;
                $member->save();
            }
        }

        return response()->json(['status' => true, 'message' => 'Member created successfully']);
    }

    //this method will return single member
    public function show($id)
    {
        $member = Member::find($id);
        if ($member == null) {
            return response()->json(['status' => false, 'message' => 'Member not found']);
        }
        return response()->json(['status' => true, 'member' => $member]);
    }

    //this method will update the member
    public function update($id, Request $request)
    {

        $member = Member::find($id);
        if ($member == null) {
            return response()->json(['status' => false, 'message' => 'Member not found']);
        }


        $validator = Validator::make($request->all(), [
            'name' => 'required',
            'job_title' => 'required',
        ]);

        if ($validator->fails()) {
            return response()->json(['status' => false, "errors" => $validator->errors()]);
        }

        $member->name = $request->name;
        $member->job_title = $request->job_title;
        $member->linkedin_url = $request->linkedin_url;
        $member->status = $request->status;
        $member->save();

        //save temp images to member
        if ($request->imageId > 0) {
            $tempImage = TempImage::find($request->imageId);
            if ($tempImage != null) {
                //delete old image
                if (File::exists(public_path('uploads/members/' . $member->image))) {
                    File::delete(public_path('uploads/members/' . $member->image));
                }

                $extArray = explode('.', $tempImage->name);
                $ext = last($extArray);

                $fileName = strtotime('now') . $member->id . '.' . $ext;

                //create small thumbnail here
                $sourcePath = public_path('uploads/temp/' . $tempImage->name);
                $destPath = public_path('uploads/members/' . $fileName);
                $manager = new ImageManager(Driver::class);
                $image = $manager->read($sourcePath);
                $image->coverDown(400, 500);
                $image->save($destPath);

                $member->image = $fileName;
                $member->save();
            }
        }

        return response()->json(['status' => true, 'message' => 'Member updated successfully']);
    }

    //this method will delete the member
    public function destroy() {}
}
