// define your share project, if your main project is com.sample1, then com.sample1.share makes sense....
package com.toby.shareExt;

import com.facebook.react.ReactActivity;

public class ShareExtActivity extends ReactActivity {
    @Override
    protected String getMainComponentName() {
      // this is the name AppRegistry will use to launch the Share View
        return "ShareExt";
    }

}
