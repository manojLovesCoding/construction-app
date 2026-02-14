<?php

namespace App\Http\Controllers\front;

use App\Http\Controllers\Controller;
use App\Models\Member;
use Illuminate\Http\Request;

class MemberController extends Controller
{
    // return latest active members
    public function latestMembers(Request $request)
    {
        $limit = $request->limit ?? 4;

        $members = Member::orderBy('created_at', 'DESC')
            ->where('status', 1)
            ->limit($limit)
            ->get();

        return response()->json([
            'status' => true,
            'data' => $members
        ]);
    }

    // return all active members
    public function index()
    {
        $members = Member::orderBy('created_at', 'DESC')
            ->where('status', 1)
            ->get();

        return response()->json([
            'status' => true,
            'data' => $members
        ]);
    }

    // return single active member
    public function show($id)
    {
        $member = Member::where('id', $id)
            ->where('status', 1)
            ->first();

        if ($member == null) {
            return response()->json([
                'status' => false,
                'message' => 'Member not found'
            ]);
        }

        return response()->json([
            'status' => true,
            'data' => $member
        ]);
    }
}
