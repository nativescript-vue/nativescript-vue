# Installing NativeScript

In order to get started you will have to install the NativeScript command-line interface.

## Install Node.js

The NativeScript CLI is built on Node.js, and as such you need to have Node.js installed to use NativeScript.

You can check if you have Node.js installed by opening up a terminal or command prompt on your development machine and executing

```command
node --version
```

If you get an error, head to https://nodejs.org/ and download and install the latest "LTS" (long-term support) version for your development machine.

<p class="tip">
    If you’re on macOS and use [Homebrew](https://brew.sh/), you can alternatively install the Node.js LTS release by running `brew update`, to download the latest available updates and then `brew install node@6` in your terminal.
</p>

<p class="tip">
    The NativeScript CLI supports a wide variety of Node.js versions, so if you already have Node.js installed you should be good to go. If, by chance, you’re running an unsupported version, the `tns doctor command` we’ll run momentarily will flag the problem so you can upgrade.
</p>

## Install the NativeScript CLI

Open your terminal or command prompt and execute the following command to install the NativeScript CLI from npm, which is Node.js’ package manager:

```command
npm install -g nativescript
```

<p class="tip">
    If you are on a *NIX based system and receive an EACCESS error, you probably have to run the previous command with `sudo`, that is `sudo npm install -g nativescript`
</p>

After completing the setup you should have two commands available from your terminal or command prompt:
- `tns` — which is short for Telerik NativeScript
- `nativescript`

The two commands are equivalent, so we'll stick with the shorter `tns`.

You can verify the installation was successful by running `tns` in your terminal. You should see something like this:
```terminal
$ tns
# NativeScript
┌─────────┬─────────────────────────────────────────────────────────────────────┐
│ Usage   │ Synopsis                                                            │
│ General │ $ tns <Command> [Command Parameters] [--command <Options>]          │
│ Alias   │ $ nativescript <Command> [Command Parameters] [--command <Options>] │
└─────────┴─────────────────────────────────────────────────────────────────────┘
```

## Install iOS and Android requirements
When you build with NativeScript you're building truly native iOS and Android apps, and as such, you need to set up each platform you intend to build for on your development machine. To ease the pain of installing all of these requirements manually, the NativeScript CLI provides quick-start scripts for Windows and macOS that handle the necessary setup for you automatically. Let's look at how the work.

<p class="tip">
    Setting up your machine for native development can be tricky, especially if you're new to mobile development. If you get stuck, or if you have questions while going through these instructions, the [NativeScript community forum](http://forum.nativescript.org) is a great place to get help.
</p>

<p class="warning">
    If you’re not comfortable with a script automatically installing dependencies on your development machine, or if you’re on Linux, refer to one of the advanced setup guides below for details on manually installing NativeScript’s iOS and Android dependencies.
    [Advanced setup: Windows](http://docs.nativescript.org/start/ns-setup-win),
    [Advanced setup: macOS](http://docs.nativescript.org/start/ns-setup-os-x),
    [Advanced setup: Linux](http://docs.nativescript.org/start/ns-setup-linux)
</p>

### Windows

If you’re on Windows, copy and paste the script below into your terminal or command prompt and press Enter:

```command
@powershell -NoProfile -ExecutionPolicy Bypass -Command "iex ((new-object net.webclient).DownloadString('https://www.nativescript.org/setup/win'))"
```

During installation you may need to accept a User Account Control prompt to grant the script administrative privileges. Also, be aware that the script downloads and installs some big dependencies — so it’s common for the script to take a while to complete. When the script finishes, close and reopen your command prompt.

<p class="tip">
    On Windows systems you can only use the NativeScript CLI to develop Android apps. This is because the NativeScript CLI uses Xcode to build iOS apps, which is only available on the macOS operating system. If you’re interested in building iOS apps on Windows, you may want to try out the public preview of [NativeScript Sidekick](https://www.nativescript.org/nativescript-sidekick). NativeScript Sidekick provides robust tooling for NativeScript apps, including a service that performs iOS and Android builds in the cloud, removing the need to complete these system requirements, and allowing you to build for iOS on Windows.
</p>

### macOS

If you’re on a Mac, copy and paste the script below into your terminal and press Enter:

```command
ruby -e "$(curl -fsSL https://www.nativescript.org/setup/mac)"
```

Much like the Windows script, the macOS script needs administrative access to run some commands using *sudo*; therefore, you may need to provide your password several times during execution. The macOS script also may take some time to complete, as it’s installing the dependencies for both iOS and Android development. When the script finishes, close and restart your terminal.

## Verify the setup

Once you've finished installing NativeScript and its dependencies, run the `tns doctor` command, which will check for any issues with your installation.

If you see "No issues were detected" you are good to go!