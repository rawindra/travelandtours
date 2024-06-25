<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Models\Product;
use App\Models\ProductImage;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class ProductController extends Controller
{
    public function index()
    {
        return inertia('Admin/Product/Index', [
            'products' => Product::with(['category'])->paginate(10)
        ]);
    }

    public function create()
    {
        return inertia('Admin/Product/Create', [
            'categories' => Category::all()
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required',
            'excerpt' => 'required',
            'description' => 'required',
            'image' => 'required',
            'price' => 'required',
            'category_id' => 'required'
        ]);

        if ($request->hasFile('image')) {
            $validated['image'] = $request->file('image')->store('products', 'public');
        }

        Product::create($validated);

        return redirect()->route('admin.products.index');
    }

    public function edit(Product $product)
    {
        return inertia('Admin/Product/Edit', [
            'product' => $product,
            'categories' => Category::all()
        ]);
    }

    public function update(Request $request, Product $product)
    {
        $validated = $request->validate([
            'name' => 'required',
            'excerpt' => 'required',
            'description' => 'required',
            'price' => 'required',
            'category_id' => 'required'
        ]);

        if ($request->hasFile('image')) {
            Storage::disk('public')->delete($product->image);
            $validated['image'] = $request->file('image')->store('products', 'public');
        }

        $product->update($validated);

        return redirect()->route('admin.products.index');
    }

    public function destroy(Product $product)
    {
        Storage::disk('public')->delete($product->image);
        $product->delete();

        return redirect()->route('admin.products.index');
    }

    public function images(Product $product)
    {
        return inertia('Admin/Product/Images', [
            'product' => $product->load('images'),
        ]);
    }

    public function imageUpload(Request $request, Product $product)
    {
        $validated = $request->validate([
            'image' => 'required|image'
        ]);

        if ($request->hasFile('image')) {
            $validated['image'] = $request->file('image')->store('products', 'public');
        }

        $product->images()->create($validated);

        return redirect()->route('admin.products.images', $product);
    }

    public function imageDestroy(Product $product, ProductImage $productImage)
    {
        Storage::disk('public')->delete($productImage->image);
        $product->images()->where('id', $productImage->id)->delete();

        return redirect()->route('admin.products.images', $product);
    }

}
