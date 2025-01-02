package com.example.rolex.api;

import com.example.rolex.ui.login.LoginRequest;

import retrofit2.Call;
import retrofit2.http.Body;
import retrofit2.http.POST;

public interface ApiService {
    @POST("/user/signin")
    Call<String> signIn(@Body LoginRequest loginRequest);
}
