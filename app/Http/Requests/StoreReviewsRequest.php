<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreReviewsRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
           'product_id' => ['required', 'exists:products,id'],
           'user_id' => ['required', 'exists:users,id'],
           'review' => ['required','string','max:255'],
           'rating' => ['required', 'integer','min:1','max:5'],
        ];
    }

    /**
     * Prepare the data for validation.
     */
    protected function prepareForValidation(): void
    {
        //if post is coming from route name reviews.create then we need to merge the product_id and user_id with the request data
        if ($this->routeIs('product.show')) {
            $this->merge([
                'product_id' => $this->product_id,
                'user_id' => $this->user_id,
            ]);
        }
    }


}
