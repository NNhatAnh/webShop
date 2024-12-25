package com.example.rolex;

import android.os.Bundle;
import android.view.Menu;
import android.view.View;

import androidx.appcompat.app.AppCompatActivity;
import androidx.drawerlayout.widget.DrawerLayout;
import androidx.navigation.NavController;
import androidx.navigation.Navigation;
import androidx.navigation.ui.AppBarConfiguration;
import androidx.navigation.ui.NavigationUI;
import androidx.viewpager2.widget.ViewPager2;

import com.example.rolex.adapter.HomeAdapter;
import com.example.rolex.databinding.ActivityMainBinding;
import com.google.android.material.navigation.NavigationView;

import java.util.Arrays;
import java.util.List;

public class MainActivity extends AppCompatActivity {

    private AppBarConfiguration mAppBarConfiguration;
    private ActivityMainBinding binding;
    private ViewPager2 viewPager2;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        binding = ActivityMainBinding.inflate(getLayoutInflater());
        setContentView(binding.getRoot());

        setSupportActionBar(binding.appBarMain.toolbar);

        DrawerLayout drawer = binding.drawerLayout;
        NavigationView navigationView = binding.navView;
        mAppBarConfiguration = new AppBarConfiguration.Builder(
                R.id.nav_home, R.id.nav_product, R.id.nav_policy, R.id.nav_contact)
                .setOpenableLayout(drawer)
                .build();
        NavController navController = Navigation.findNavController(this, R.id.nav_host_fragment_content_main);
        NavigationUI.setupActionBarWithNavController(this, navController, mAppBarConfiguration);
        NavigationUI.setupWithNavController(navigationView, navController);

        navController.addOnDestinationChangedListener((controller, destination, arguments) -> {
            if (destination.getId() == R.id.nav_home) {
                setupSlider();
            } else {
                hideSlider();
            }
        });
    }

    private void setupSlider() {
        if (viewPager2 == null) {
            viewPager2 = findViewById(R.id.slider);

            List<Integer> imgList = Arrays.asList(
                    R.drawable.slide1,
                    R.drawable.slide2,
                    R.drawable.slide3
            );

            HomeAdapter homeAdapter = new HomeAdapter(this, imgList);
            viewPager2.setAdapter(homeAdapter);

            autoSlide();
        }

        if (viewPager2 != null) {
            viewPager2.setVisibility(View.VISIBLE);
        }
    }

    private void hideSlider() {
        if (viewPager2 != null) {
            viewPager2.setVisibility(View.GONE);
        }
    }

    private void autoSlide() {
        final int delayMillis = 5000;
        viewPager2.postDelayed(new Runnable() {
            @Override
            public void run() {
                int nextItem = (viewPager2.getCurrentItem() + 1) % 3;
                viewPager2.setCurrentItem(nextItem, true);
                viewPager2.postDelayed(this, delayMillis);
            }
        }, delayMillis);
    }


    @Override
    public boolean onCreateOptionsMenu(Menu menu) {
        getMenuInflater().inflate(R.menu.main, menu);
        return true;
    }

    @Override
    public boolean onSupportNavigateUp() {
        NavController navController = Navigation.findNavController(this, R.id.nav_host_fragment_content_main);
        return NavigationUI.navigateUp(navController, mAppBarConfiguration)
                || super.onSupportNavigateUp();
    }
}
