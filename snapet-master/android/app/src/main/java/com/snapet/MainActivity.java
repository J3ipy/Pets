package com.snapet;
import com.facebook.react.ReactActivity;

import android.widget.LinearLayout;
import android.graphics.Color;
import android.view.Gravity;
import android.widget.ImageView;
import android.util.TypedValue;

import com.reactnativenavigation.controllers.SplashActivity;

public class MainActivity extends SplashActivity {
  @Override
  public LinearLayout createSplashLayout(){
    LinearLayout view = new LinearLayout(this);
    ImageView imageView = new ImageView(this);

    view.setBackgroundColor(Color.parseColor("#36bb75"));
    view.setGravity(Gravity.CENTER);

    imageView.setImageResource(R.drawable.splash_screen);
    //imageView.setGravity(Gravity.CENTER);

    view.addView(imageView);
    return view;
  }
}
