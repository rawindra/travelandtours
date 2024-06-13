<?php

namespace App\Http\Controllers\Front;

use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Models\Product;
use Illuminate\Http\Request;

class HomeController extends Controller
{
    public function index()
    {
        return inertia('Front/Home', [
            'products' => Product::paginate(12)
        ]);
    }

    public function show(Product $product)
    {
        return inertia('Front/Show', [
            'product' => $product
        ]);
    }
}
