---
title: PromptDialog
apiRef: https://docs.nativescript.org/api-reference/modules/_ui_dialogs_#prompt
contributors: [MisterBrownRSA, rigor789, ikoevska]
---

The `prompt()` method shows a dialog with a single-line field for user input.

The method is part of the [`dialogs` module](https://docs.nativescript.org/api-reference/modules/_ui_dialogs_).

---

## Basic use

The `prompt()` method is available globally. You can call it anywhere in your app.

```JavaScript
prompt('Your message to the user', 'Suggested user input')
.then(result => {
  console.log(`Dialog result: ${result.result}, text: ${result.text}`)
})
```

## Configure dialog options

```JavaScript
prompt({
  title: "Your dialog title",
  message: "Your message",
  okButtonText: "Your OK button text",
  cancelButtonText: "Your Cancel button text",
  defaultText: "Suggested user input",
}).then(result => {
  console.log(`Dialog result: ${result.result}, text: ${result.text}`)
});
```

## Configure input type

You can also configure the input type using `inputType`. You can choose between plain text (`text`), email-enabled input (`email`), and password-like hidden input (`password`).

```JavaScript
inputType: dialogs.inputType.text
inputType: dialogs.inputType.email
inputType: dialogs.inputType.password
```

**NOTE:** This option is not globally available and you need to require the `dialogs` module in your app before using `inputType`.

```JavaScript
const dialogs = require('tns-core-modules/ui/dialogs')
```

### Example

```JavaScript
const dialogs = require('tns-core-modules/ui/dialogs')

prompt({
  title: "Email Prompt",
  message: "Provide your email address:",
  okButtonText: "OK",
  cancelButtonText: "Cancel",
  defaultText: "name@domain.com",
  inputType: dialogs.inputType.email
}).then(result => {
  console.log(`Dialog result: ${result.result}, text: ${result.text}`)
});
```

[> screenshots for=PromptDialog <]
