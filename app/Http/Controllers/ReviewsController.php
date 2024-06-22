<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreReviewsRequest;
use App\Http\Requests\UpdateReviewsRequest;
use App\Models\Product;
use App\Models\Reviews;
use App\Models\User;
use Inertia\Inertia;

class ReviewsController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $reviews = Reviews::with(['user', 'product'])->paginate(10);
        return Inertia::render('Admin/Review/Index', [
            'reviews' => $reviews,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $packages = Product::all();
        $reviewers = User::where('role', 'user')->get();
        return Inertia::render('Admin/Review/Create', [
            'packages' => $packages,
            'reviewers' => $reviewers,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreReviewsRequest $request)
    {
        $result = Reviews::create($request->validated());
        if ($result) {
            return redirect()->route('admin.reviews.index')->with('success', 'Review created successfully.');
        } else {
            return redirect()->back()->withErrors(['error' => 'An error occurred while creating the review.']);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Reviews $reviews)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Reviews $reviews)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateReviewsRequest $request, Reviews $reviews)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Reviews $reviews)
    {
        //
    }
}
