<?php

namespace App\Http\Controllers\front;

use App\Http\Controllers\Controller;
use App\Models\Service;
use Illuminate\Http\Request;

class ServiceController extends Controller
{
    //this methos will return all active services
    public function index()
    {
        $services = Service::where('status', 1)->orderby('created_at', 'DESC')->get();
        return response()->json(['status' => true, 'data' => $services]);
    }

    //this method will return latest active services
    public function latestServices(Request $request)
    {
        $services = Service::where('status', 1)->take($request->get('limit'))
            ->orderby('created_at', 'DESC')->get();
        return response()->json(['status' => true, 'data' => $services]);
    }
}
