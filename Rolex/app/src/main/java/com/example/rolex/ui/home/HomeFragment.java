package com.example.rolex.ui.home;

import android.os.Bundle;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;

import androidx.annotation.NonNull;
import androidx.fragment.app.Fragment;

import com.example.rolex.databinding.FragmentHomeBinding;

public class HomeFragment extends Fragment {

    private FragmentHomeBinding binding;

    public View onCreateView(@NonNull LayoutInflater inflater,
                             ViewGroup container, Bundle savedInstanceState) {

        binding = FragmentHomeBinding.inflate(inflater, container, false);
        View root = binding.getRoot();

        binding.textHome.setText("Welcome to Watch Shop, your premier destination for exquisite timepieces...");
        binding.textMission.setText("Our mission is to provide exceptional quality, unmatched service, and a seamless shopping experience...");
        binding.textWhyChooseUs.setText("• Wide range of brands and styles\n• Authenticity guaranteed\n• Fast and reliable shipping\n• Friendly customer support");

        return root;
    }

    @Override
    public void onDestroyView() {
        super.onDestroyView();
        binding = null;
    }
}
