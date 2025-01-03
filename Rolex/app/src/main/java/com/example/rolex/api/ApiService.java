package com.example.rolex.api;

import com.example.rolex.ui.login.LoginRequest;

import java.util.Map;

import okhttp3.ResponseBody;
import retrofit2.Call;
import retrofit2.http.Body;
import retrofit2.http.POST;

public interface ApiService {
    @POST("/user/signin")
    Call<String> signIn(@Body LoginRequest loginRequest);

    @POST("/user/signup")
    Call<Void> signUp(@Body Map<String, String> body);
}
