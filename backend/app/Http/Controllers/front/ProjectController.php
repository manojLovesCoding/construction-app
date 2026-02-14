<?php

namespace App\Http\Controllers\front;

use App\Http\Controllers\Controller;
use App\Models\Project;
use Illuminate\Http\Request;

class ProjectController extends Controller
{
    // //this method will return latest active projects
    public function latestProjects(Request $request)
    {
        $projects = Project::orderBy('created_at', 'DESC')
            ->where('status', 1)->limit($request->limit)->get();
        return response()->json(['status' => true, 'data' => $projects]);
    }

    //this method will return all active projects
    public function index()
    {
        $projects = Project::orderBy('created_at', 'DESC')
            ->where('status', 1)->get();
        return response()->json(['status' => true, 'data' => $projects]);
    }

    // new method to return a single project by ID
    public function show($id)
    {
        // Find the project by ID and ensure it's active
        $project = Project::where('status', 1)->find($id);

        // If not found, return a 404 response
        if (!$project) {
            return response()->json([
                'status' => false,
                'message' => 'Project not found'
            ], 404);
        }

        // If found, return the project data
        return response()->json([
            'status' => true,
            'data' => $project
        ]);
    }
}
