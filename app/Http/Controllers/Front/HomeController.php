<?php

namespace App\Http\Controllers\Front;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class HomeController extends Controller
{
    public function index()
    {
        return inertia('Front/Home');
    }

    public function show()
    {
        return inertia('Front/Show');
    }
}
