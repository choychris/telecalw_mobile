package teleclaw.live;

import android.app.Application;

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

public class MainApplication extends NavigationApplication {

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
			new BraintreePackage()
		);
	}

	@Override
	public List<ReactPackage> createAdditionalReactPackages() {
			return getPackages();
	}

	@Override
	public String getJSMainModuleName() {
			 return "index";
	}

}



