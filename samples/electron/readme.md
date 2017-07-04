# electron-windows-notifications sample

A sample app using the electron-windows-notifications module.
Sample is based on: https://github.com/hokein/electron-sample-apps/tree/master/notifications

Install by running the following set of commands:

```
cd samples\electron
npm install
.\node_modules\.bin\electron-rebuild -m .\app
```

Run the sample using:

```
npm start
```

# Env setting up for Windows 10
- Open up a new cmd as administrator and run this command:
  `npm install --global --production windows-build-tools`
  then 
  `npm config set msvs_version 2015 --global`. 
- Set Python to your path in System variables, e.g. add `C:\Users\ibmadmin\.windows-build-tools\python27` to your path.
- Install [Window 10 SDK](https://developer.microsoft.com/en-us/windows/downloads/windows-10-sdk).
- Copy file `Windows.winmd` from `C:\Program Files (x86)\Windows Kits\10\UnionMetadata\10.0.15063.0\` to `C:\Program Files (x86)\Windows Kits\10\UnionMetadata`. Because npm modules search for the winmd files under `C:\Program Files (x86)\Windows Kits\10\UnionMetadata`, more explanation can be found [here](https://github.com/NodeRT/NodeRT/issues/65#issuecomment-303938757).

# Windows 10 persist notification in notification center.
See https://stackoverflow.com/questions/31772192/toastnotifications-sent-from-powershell-disappear-from-action-center/39564998#39564998


