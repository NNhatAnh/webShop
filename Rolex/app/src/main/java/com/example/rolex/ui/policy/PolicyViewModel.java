package com.example.rolex.ui.policy;

import androidx.lifecycle.LiveData;
import androidx.lifecycle.MutableLiveData;
import androidx.lifecycle.ViewModel;

public class PolicyViewModel extends ViewModel {

    private final MutableLiveData<String> mText;

    public PolicyViewModel() {
        mText = new MutableLiveData<>();
//        mText.setValue("This is slideshow fragment");
    }

    public LiveData<String> getText() {
        return mText;
    }
}