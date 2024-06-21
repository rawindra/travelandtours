<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Laravel\Socialite\Facades\Socialite;

class SocialiteController extends Controller
{
        /***
     * Handle the Facebook callback using the Socialite library
     */
    public function handleLoginWithFacebook()
    {
        // $this->handleSocialiteLogin('facebook');
        try {
            return Socialite::driver('facebook')->redirect();
        } catch (\Throwable $th) {
            return redirect()->back()->withErrors(['error' => 'An error occurred while logging in with Facebook.']);
        }
    }

    /***
     * Handle the Facebook callback and authenticate the user
     * user is updated if not created based on the Facebook user information
     */

    public function handleFacebookCallback(){

        // $this->handleSocialiteCallback('facebook');
        $facebookUser = Socialite::driver('facebook')->stateless()->user();
    
        $currentUser = User::updateOrCreate([
            'email' => $facebookUser->email,
        ], [
            'facebook_id' => $facebookUser->id,
            'name' => $facebookUser->name,
            'facebook_token' => $facebookUser->token,
            'facebook_refresh_token' => $facebookUser->refreshToken,
        ]);
    
        auth()->login($currentUser);

        return redirect()->route('home');

    
    }

    public function handleSocialiteLogin($provider)
    {
        try {
            return Socialite::driver($provider)->redirect();
        } catch (\Throwable $th) {
            return redirect()->back()->withErrors(['error' => 'An error occurred while logging in with Facebook.']);
        }
    }

    public function handleSocialiteCallback($provider)
    {
        $socialiteUser = Socialite::driver($provider)->stateless()->user();
        $currentUser = User::updateOrCreate([
            'email' => $socialiteUser->email,
        ], [
            'facebook_id' => $socialiteUser->id,
            'name' => $socialiteUser->name,
            'facebook_token' => $socialiteUser->token,
            'facebook_refresh_token' => $socialiteUser->refreshToken,
        ]);
    
        auth()->login($currentUser);

        return redirect()->route('home');
    }
}
