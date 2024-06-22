<?php

namespace App\Http\Controllers\Front;

use App\Http\Controllers\Controller;
use App\Models\Booking;
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

    public function show($id)
    {
        $product = Product::find($id);
        $avgRating = round($product->reviews->avg('rating'), 1);
        $product = $product->with('reviews.user')->get();
        return inertia('Front/Show', [
            'product' => $product,
            'avgRating' => $avgRating,
        ]);
    }

    public function categoryProducts(Category $category)
    {
        return inertia('Front/Home', [
            'products' => Product::where('category_id', $category->id)->paginate(12)
        ]);
    }

    public function bookings()
    {
        return inertia('Front/Bookings', [
            'bookings' => auth()->user()->bookings->load('product')
        ]);
    }

    public function bookingStore(Request $request)
    {
        $validated = $request->validate([
            'date' => 'required',
            'quantity' => 'required',
            'product_id' => 'required',
            'members' => 'required|array|min:1',
            'members.*.name' => 'required|string',
            'members.*.number' => 'required|string',
        ]);

        $validated['user_id'] = auth()->user()->id;

        $booking = Booking::create($validated);

        $booking->members()->createMany($request->members);

        return redirect()->route('bookings');
    }

    public function bookingDestroy($id)
    {
        $booking = Booking::find($id);
        $booking->delete();

        return redirect()->route('bookings');
    }
}
