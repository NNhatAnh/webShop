package com.example.rolex.ui.contact;

import android.content.Intent;
import android.net.Uri;
import android.os.Bundle;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.webkit.WebChromeClient;
import android.webkit.WebResourceRequest;
import android.webkit.WebView;
import android.webkit.WebViewClient;

import androidx.fragment.app.Fragment;

import com.example.rolex.R;
import com.example.rolex.databinding.FragmentContactBinding;

public class ContactFragment extends Fragment {

    private FragmentContactBinding binding;

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container, Bundle savedInstanceState) {
        binding = FragmentContactBinding.inflate(inflater, container, false);
        View root = binding.getRoot();

        // Setup social media buttons
        binding.socialLinks.findViewById(R.id.facebookButton).setOnClickListener(v -> openLink("https://facebook.com"));
        binding.socialLinks.findViewById(R.id.instagramButton).setOnClickListener(v -> openLink("https://instagram.com"));
        binding.socialLinks.findViewById(R.id.twitterButton).setOnClickListener(v -> openLink("https://twitter.com"));

        // Setup WebView to load the Google Map as an iframe
        WebView webView = binding.getRoot().findViewById(R.id.map);
        webView.getSettings().setJavaScriptEnabled(true);
        webView.setWebViewClient(new WebViewClient());  // Handle link opening within the WebView itself
        webView.setWebChromeClient(new WebChromeClient());  // Handle JavaScript alerts, etc.

        // HTML content with iframe to embed the Google Map
        String mapHtml = "<html><body>" +
                "<iframe width=\"100%\" height=\"300\" src=\"https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3725.301267570859!2d105.78657997504257!3d20.98055738065673!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135ade83ba9e115%3A0x6f4fdb5e1e9e39ed!2zVHLGsOG7nW5nIMSQ4bqhaSBo4buNYyBLaeG6v24gdHLDumMgSMOgIE7hu5lp!5e0!3m2!1svi!2s!4v1734018265827!5m2!1svi!2s\" style=\"border:0;\" allowfullscreen=\"\" loading=\"lazy\"></iframe>" +
                "</body></html>";

        // Load the HTML content in the WebView
        webView.loadDataWithBaseURL(null, mapHtml, "text/html", "UTF-8", null);

        return root;
    }

    private void openLink(String url) {
        // Open the social media link in the browser
        Intent intent = new Intent(Intent.ACTION_VIEW, Uri.parse(url));
        startActivity(intent);
    }

    @Override
    public void onDestroyView() {
        super.onDestroyView();
        binding = null;
    }

    @Override
    public void onPause() {
        super.onPause();
        WebView webView = binding.getRoot().findViewById(R.id.map);
        if (webView != null) {
            webView.onPause();
        }
    }

    @Override
    public void onResume() {
        super.onResume();
        WebView webView = binding.getRoot().findViewById(R.id.map);
        if (webView != null) {
            webView.onResume();
        }
    }
}
