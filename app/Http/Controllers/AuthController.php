<?php

namespace App\Http\Controllers;

use App\Http\Requests\LoginRequest;


class AuthController extends Controller
{


    public function login(LoginRequest $request){
        $credentials = $request->only(['email', 'password']);


        if (! $token = auth()->attempt($credentials)) {
            return $this->error("Invalid username or password",401);
        }



        return $this->success(["token"=>$token,"user"=>auth()->user()]);

    }



    /**
     * Log the user out (Invalidate the token).
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function logout()
    {
        auth()->logout();
        return $this->success(["message"=>"Logged out successfully"]);
    }
}
