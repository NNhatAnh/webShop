package com.example.rolex.api;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;

import retrofit2.Retrofit;
import retrofit2.converter.gson.GsonConverterFactory;

public class RetrofitClient {
    private static Retrofit retrofit = null;

    public static Retrofit getClient(String baseUrl) {
        if (retrofit == null) {
            // Tạo Gson với setLenient(true)
            Gson gson = new GsonBuilder()
                    .setLenient() // Cho phép chấp nhận JSON không hoàn toàn hợp lệ
                    .create();

            retrofit = new Retrofit.Builder()
                    .baseUrl(baseUrl)
                    .addConverterFactory(GsonConverterFactory.create(gson)) // Sử dụng Gson với lenient mode
                    .build();
        }
        return retrofit;
    }
}
