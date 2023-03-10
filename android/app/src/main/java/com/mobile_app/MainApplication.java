package teleclaw.live;

import android.app.Application;

//import android.support.multidex.MultiDexApplication;
import android.support.multidex.MultiDex;
import android.content.Context;

import com.facebook.react.ReactApplication;
import com.zmxv.RNSound.RNSoundPackage;
import com.brentvatne.react.ReactVideoPackage;
import com.oblador.vectoricons.VectorIconsPackage;
import com.learnium.RNDeviceInfo.RNDeviceInfo;
import com.facebook.reactnative.androidsdk.FBSDKPackage;

import com.reactnativenavigation.NavigationApplication;
import com.reactnativenavigation.controllers.ActivityCallbacks;

import com.oney.WebRTCModule.WebRTCModulePackage;
import com.pw.droplet.braintree.BraintreePackage;
import android.content.Intent; 

import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;

import com.facebook.CallbackManager;
import com.facebook.FacebookSdk;
import com.facebook.reactnative.androidsdk.FBSDKPackage;
import com.facebook.appevents.AppEventsLogger;
import com.facebook.react.ReactInstanceManager;

import com.sbugert.rnadmob.RNAdMobPackage;
import com.microsoft.codepush.react.ReactInstanceHolder;
import com.microsoft.codepush.react.CodePush;

import java.util.Arrays;
import java.util.List;

//public class MainApplication extends Application implements ReactApplication {

	//private static CallbackManager mCallbackManager = CallbackManager.Factory.create();

	//protected static CallbackManager getCallbackManager() {
			//return mCallbackManager;
	//}

  //private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    //@Override
    //public boolean getUseDeveloperSupport() {
      //return BuildConfig.DEBUG;
    //}

    //@Override
    //protected List<ReactPackage> getPackages() {
      //return Arrays.<ReactPackage>asList(
          //new MainReactPackage(),
					//new ReactVideoPackage(),
					//new VectorIconsPackage(),
					//new RNDeviceInfo(),
					//new FBSDKPackage(mCallbackManager),
					//new WebRTCModulePackage(),
					//new BraintreePackage()
      //);
    //}

    //@Override
    //protected String getJSMainModuleName() {
      //return "index";
    //}
  //};

  //@Override
  //public ReactNativeHost getReactNativeHost() {
    //return mReactNativeHost;
  //}

  //@Override
  //public void onCreate() {
    //super.onCreate();
    //SoLoader.init(this, [> native exopackage <] false);
  //}
//}

public class MainApplication extends NavigationApplication implements ReactInstanceHolder {

	@Override
	protected void attachBaseContext(Context base) {
	    super.attachBaseContext(base);
	    MultiDex.install(this);
	}

	private static CallbackManager mCallbackManager = CallbackManager.Factory.create();

	protected static CallbackManager getCallbackManager() {
		return mCallbackManager;		  
	}

	@Override
	public void onCreate() {
		super.onCreate();
		setActivityCallbacks(new ActivityCallbacks() {
			@Override
			public void onActivityResult(int requestCode, int resultCode, Intent data) {
				mCallbackManager.onActivityResult(requestCode, resultCode, data);
																												
			}
		});														
	}

	@Override
	public boolean isDebug() {
		// Make sure you are using BuildConfig from your own application
		return BuildConfig.DEBUG;
	}


	protected List<ReactPackage> getPackages() {
		// Add additional packages you require here
		// No need to add RnnPackage and MainReactPackage
		return Arrays.<ReactPackage>asList(
			new ReactVideoPackage(),
			new RNSoundPackage(),
			new VectorIconsPackage(),
			new RNDeviceInfo(),
			new FBSDKPackage(mCallbackManager),
			new WebRTCModulePackage(),
			new BraintreePackage(),
			new RNAdMobPackage(),
			new CodePush("QmkocT2ky3GpZXfWTLNrcgLZVNmP81b6a9fd-77a2-469f-9167-88c2209de41d", getApplicationContext(), BuildConfig.DEBUG)
		);
	}

	@Override
	public List<ReactPackage> createAdditionalReactPackages() {
			return getPackages();
	}

	@Override
	public String getJSBundleFile() {
        // Override default getJSBundleFile method with the one CodePush is providing
		return CodePush.getJSBundleFile();
	}

	@Override
	public String getJSMainModuleName() {
			 return "index";
	}

	@Override
	public ReactInstanceManager getReactInstanceManager() {
			// CodePush must be told how to find React Native instance
			return getReactNativeHost().getReactInstanceManager();
	}

}



