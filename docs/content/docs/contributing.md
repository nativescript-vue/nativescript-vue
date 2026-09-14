---
title: Contributing
contributors: [vallemar]
---

# Contributing

Thank you for your interest in contributing to NativeScript-Vue!

## Development
Follow these steps to start contributing to the NativeScript-Vue codebase:

### Setup
Clone the [repository](https://github.com/nativescript-vue/nativescript-vue) to your local environment:

```bash
git clone https://github.com/nativescript-vue/nativescript-vue.git
```

Install all necessary dependencies using Yarn:

```bash
yarn install
```

Navigate to the demo application:

```bash
cd demo
```

Launch the application in debug mode for your chosen platform (iOS or Android):

```bash
ns debug ios|android
```

You can now modify the NativeScript-Vue source code located in the `src` directory. Changes made here will automatically reflect in the demo application.

## Documentation
We warmly welcome contributions to enhance the NativeScript-Vue documentation.

### Setup
Fork the official documentation repository [nativescript-vue.org](https://github.com/nativescript-vue/nativescript-vue.org), clone your fork locally, and install the required dependencies:

```bash
git clone https://github.com/<your-username>/nativescript-vue.org.git
cd nativescript-vue.org/
npm install
```

### Running the documentation locally

We utilize VitePress for rapid documentation development. Start the local development server with:

```bash
npm run dev
```

Open the URL provided in your terminal in your web browser to preview your changes live.

### Building the documentation

Build and preview the static documentation site locally with the following commands:

```bash
npm run build
npm run preview
```

### Best practices

#### Checking for broken links
After making extensive changes or modifying any links, it's recommended to verify all documentation links remain functional. Use Linkinator to generate a report highlighting any broken links:

```bash
npm run build
npm run check-links
```

