<?php

namespace App\Http\Controllers\front;

use App\Http\Controllers\Controller;
use App\Models\Service;
use Illuminate\Http\Request;

class ServiceController extends Controller
{
    // this method will return all active services
    public function index()
    {
        $services = Service::where('status', 1)
            ->orderby('created_at', 'DESC')
            ->get();
        return response()->json(['status' => true, 'data' => $services]);
    }

    // this method will return latest active services
    public function latestServices(Request $request)
    {
        $services = Service::where('status', 1)
            ->take($request->get('limit'))
            ->orderby('created_at', 'DESC')
            ->get();
        return response()->json(['status' => true, 'data' => $services]);
    }

    // new method to return a single service by ID
    public function show($id)
    {
        $service = Service::where('status', 1)->find($id);

        if (!$service) {
            return response()->json([
                'status' => false,
                'message' => 'Service not found'
            ], 404);
        }

        return response()->json([
            'status' => true,
            'data' => $service
        ]);
    }
}
