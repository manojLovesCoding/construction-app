<?php

namespace App\Http\Controllers\front;

use App\Http\Controllers\Controller;
use App\Models\Testimonial;
use Illuminate\Http\Request;

class TestimonialController extends Controller
{
    // this method will return latest testimonials
    public function latestTestimonials(Request $request)
    {
        $testimonials = Testimonial::orderBy('created_at', 'DESC')
            ->where('status', 1)
            ->limit($request->limit)
            ->get();

        return response()->json([
            'status' => true,
            'data' => $testimonials
        ]);
    }

    // this method will return all testimonials
    public function index()
    {
        $testimonials = Testimonial::orderBy('created_at', 'DESC')
            ->where('status', 1)
            ->get();

        return response()->json([
            'status' => true,
            'data' => $testimonials
        ]);
    }
}
