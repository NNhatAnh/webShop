//package com.example.rolex.api;
//
//import retrofit2.Retrofit;
//import retrofit2.converter.gson.GsonConverterFactory;
//
//public class ApiService {
//    private static final String BASE_URL = "https://localhost:8080/";
//
//    private static Retrofit retrofit;
//
//    public static Retrofit getRetrofitInstance() {
//        if (retrofit == null) {
//            retrofit = new Retrofit.Builder()
//                    .baseUrl(BASE_URL)
//                    .addConverterFactory(GsonConverterFactory.create())
//                    .build();
//        }
//        return retrofit;
//    }
//}