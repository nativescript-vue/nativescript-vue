import { NativeScriptConfig } from "@nativescript/core";

export default {
	id: 'org.nativescript.application',
	appResourcesPath: 'app_resources',
	android: {
		markingMode: 'none',
		v8Flags: '--expose-gc',
		maxLogcatObjectSize: 9999,
	}
} as NativeScriptConfig
