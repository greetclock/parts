# todos-registry

Even though this library is ridiculously small, it's a powerful tool on a larger scale. You can put here information related to the parent feature (todo) that you want to import statically in the main application. Why? You'll get the best of two worlds: you can isolate feature-related code outside of the application (and thus potentially re-use this library in other applications) and use some feature-specific information _before_ lazy loading happens.

Examples:

- The base route of the feature. It doesn't belong to the main application. It belongs to the feature itself. But if you statically import it from the feature library, then the lazy loading will not work.
- Icon of the feature. You can display it in the main app navigation.
- Human-readable name of the feature for the main navigation. It can even employ translation, e.g. by [ngx-translate](https://github.com/ngx-translate/core).
- Other things that you need to run together with the main application.
