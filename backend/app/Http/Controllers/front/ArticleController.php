<?php

namespace App\Http\Controllers\front;

use App\Http\Controllers\Controller;
use App\Models\Article;
use Illuminate\Http\Request;

class ArticleController extends Controller
{
    // this method will return latest active articles
    public function latestArticles(Request $request)
    {
        $articles = Article::orderBy('created_at', 'DESC')
            ->where('status', 1)
            ->limit($request->limit)
            ->get();

        return response()->json([
            'status' => true,
            'data' => $articles
        ]);
    }

    // this method will return all active articles
    public function index()
    {
        $articles = Article::orderBy('created_at', 'DESC')
            ->where('status', 1)
            ->get();

        return response()->json([
            'status' => true,
            'data' => $articles
        ]);
    }

    // this method will return a single active article by ID
    public function show($id)
    {
        $article = Article::where('status', 1)->find($id);

        if (!$article) {
            return response()->json([
                'status' => false,
                'message' => 'Article not found'
            ], 404);
        }

        return response()->json([
            'status' => true,
            'data' => $article
        ]);
    }
}
