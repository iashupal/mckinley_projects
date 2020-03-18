package com.globaloutliers;

import android.app.Application;
import com.ninty.system.setting.SystemSettingPackage;
import com.facebook.react.ReactApplication;
import com.reactlibrary.RNPreventScreenshotPackage;
import fr.bamlab.rnimageresizer.ImageResizerPackage;
import org.devio.rn.splashscreen.SplashScreenReactPackage;
import com.babisoft.ReactNativeLocalization.ReactNativeLocalizationPackage;
import com.github.wumke.RNExitApp.RNExitAppPackage;
import com.reactnativecommunity.netinfo.NetInfoPackage;
import com.wheelpicker.WheelPickerPackage;
import com.learnium.RNDeviceInfo.RNDeviceInfo;
import com.swmansion.reanimated.ReanimatedPackage;
import com.imagepicker.ImagePickerPackage;
import com.henninghall.date_picker.DatePickerPackage;
import com.reactnativecommunity.asyncstorage.AsyncStoragePackage;
import com.swmansion.gesturehandler.react.RNGestureHandlerPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;
import com.agontuk.RNFusedLocation.RNFusedLocationPackage;
import com.rt2zz.reactnativecontacts.ReactNativeContacts;
import com.dooboolab.RNIap.RNIapPackage;

import java.util.Arrays;
import java.util.List;

public class MainApplication extends Application implements ReactApplication {

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
          new MainReactPackage(),
            new RNPreventScreenshotPackage(),
            new ImageResizerPackage(),
            new SplashScreenReactPackage(),
            new ReactNativeLocalizationPackage(),
            new RNFusedLocationPackage(),
            new RNExitAppPackage(),
            new NetInfoPackage(),
            new WheelPickerPackage(),
            new RNDeviceInfo(),
            new ReanimatedPackage(),
            new ImagePickerPackage(),
            new DatePickerPackage(),
            new AsyncStoragePackage(),
            new RNGestureHandlerPackage(),
            new ReactNativeContacts(),
              new RNIapPackage(),
              new SystemSettingPackage()
      );
    }

    @Override
    protected String getJSMainModuleName() {
      return "index";
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    SoLoader.init(this, /* native exopackage */ false);
  }
}
