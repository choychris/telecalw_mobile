Teleclaw Fontend

This project use React-native to be the core development framework
https://facebook.github.io/react-native/

For the version of libraries please check out package.json

Code push is used in the project too.
Main purpose of code push is to provide direct updates to client-side.
https://github.com/Microsoft/react-native-code-push

Main code-push command:
1. List deployment details and keys:
```
code-push deployment ls Teleclaw-Android -k
code-push deployment ls Teleclaw-iOS -k
```

2. Release update to staging env:
```
code-push release-react Teleclaw-iOS ios --des '...' -p './ios/mobile_app/info.plist'
code-push release-react Teleclaw-Android android --des '...'
```

3. Promote from Staging to Production:
```
code-push promote Teleclaw-iOS Staging Production
code-push promote Teleclaw-Android Staging Production
```
