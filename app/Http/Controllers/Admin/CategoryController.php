<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Category;
use Illuminate\Http\Request;

class CategoryController extends Controller
{

    public function index()
    {
        return inertia('Admin/Category/Index', [
            'categories' => Category::paginate(10)
        ]);
    }

    public function create()
    {
        return inertia('Admin/Category/Create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required',
            'icon' => 'required'
        ]);

        Category::create($validated);

        return redirect()->route('admin.categories.index');
    }

    public function edit(Category $category)
    {
        return inertia('Admin/Category/Edit', [
            'category' => $category
        ]);
    }

    public function update(Request $request, Category $category)
    {
        $validated = $request->validate([
            'name' => 'required',
            'icon' => 'required'
        ]);

        $category->update($validated);

        return redirect()->route('admin.categories.index');
    }

    public function destroy(Category $category)
    {
        $category->delete();

        return redirect()->route('admin.categories.index');
    }
}
