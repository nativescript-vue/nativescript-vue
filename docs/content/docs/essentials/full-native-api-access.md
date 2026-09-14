# Full Native API Access

NativeScript exposes all available native APIs directly to your JavaScript. It does not convert your JavaScript to native code (ie. to Java/Objective-C). To understand this concept let's look at some examples.

## iOS

In Objective-C you can get the current UIDevice, and read the `batteryLevel` (see [Apple batteryLevel docs](https://developer.apple.com/documentation/uikit/uidevice/1620042-batterylevel?language=objc)):

```objc
float batteryLevel = UIDevice.currentDevice.batteryLevel

print("The battery level is \(batteryLevel)")
```

In NativeScript you can do the same in **JavaScript**

```ts
const batteryLevel = UIDevice.currentDevice.batteryLevel;

console.log(`The battery level is ${batteryLevel}`);
```

This works with **all** available native APIs that are exposed to Objective-C.

::: warning The API needs to be exposed to Objective-C

For NativeScript to be able to discover a native API it must be available in Objective-C. In case of Swift code this can be done using the `@objcMembers` decorator on classes, or `@objc` directly on individual members.

For example:

```swift
// Example.swift

@objcMembers class MyControllerA: UIViewController {
  func doSomething() {}
  doSomethingElse() {}
}

@objc class MyControllerB: UIViewController {
  @objc doSomething() {}
  doSomethingElse() {}
}

class MyControllerC: UIViewController {
  @objc doSomething() {}
  doSomethingElse() {}
}
```

In this case, NativeScript will expose everything that's visible to Objective-C:

```ts
const controllerA = new MyControllerA();
controllerA.doSomething(); // Ok
controllerA.doSomethingElse(); // Error // [!code error]

const controllerB = new MyControllerB();
controllerB.doSomething(); // Ok
controllerB.doSomethingElse(); // Error // [!code error]

const controllerC = new MyControllerC(); // Error // [!code error]
controllerC.doSomething(); // Error // [!code error]
controllerC.doSomethingElse(); // Error // [!code error]
```

:::

This works because metadata is generated at compile time for all available APIs - this is done by the [metadata-generator located in the iOS Runtime](https://github.com/NativeScript/ios/tree/main/metadata-generator). This metadata is then used by the runtime to look up and translate **JavaScript** calls to native <abbr title="Foreign Function Interface">FFI</abbr> calls. The process of translating between the native world and JavaScript is called **Marshalling**. You can learn more about it in-depth in the [NativeScript Docs about Marshalling](https://docs.nativescript.org/guide/marshalling/)

## Android

Similar to iOS, the same concepts work on Android. For example, getting the current time in Java/Android can be done with the [Calendar class](<https://developer.android.com/reference/java/util/Calendar#getTime()>).

```java
import java.util.Calendar;
import java.util.Date;

Date currentTime = Calendar.getInstance().getTime();

Log.d("The current time is: " + currentTime.toString());
```

In NativeScript, you can access the same API from **JavaScript**:

```ts
const currentTime = java.util.Calendar.getInstance().getTime();
console.log(`The current time is: ${currentTime.toString()}`);
```

Notice how we had to use the full namespace for `java.util.Calendar`. If you find yourself requiring the same class/namespace multiple times, you can cache it to a JavaScript variable, though in general it's recommended to keep the full namespace for clarity.

```ts
const Calendar = java.util.Calendar;
const currentTime = Calendar.getInstance().getTime();
// ...
```

::: info This is just an example!

The above is to illustrate the concept. In JavaScript, you would normally use the `Date` class rather than the Java/Android one to get the current date.

```ts
console.log(`The current time is: ${new Date().toString()}`);
```

:::

These are basic examples meant to illustrate the idea of how NativeScript works, only scratching the surface. A more in-depth overview covering advanced concepts like interfaces, subclassing and similar can be found in the [NativeScript Docs](https://docs.nativescript.org/guide/marshalling/)

All of these concepts work with **any** native code that's available during compile time, even if it's provided by the target platform, a Cocoapod, a SPM package, a Gradle dependency and more.

Thanks to this, there's very little that cannot be done in NativeScript - in fact, given the flexibility you can author parts of your app in native code and consume it from JavaScript when something turns out to be tricky to implement in JavaScript.
