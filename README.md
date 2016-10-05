
## Feature Toggle Client Demo
```
// client url
https://github.com/MyLocalEnterprises/FeatureFlags
```

This is a sample for how to use and extend the Feature Toggle Client. This sample shows how 
the FeatureFlag data is cached in locally and used as the lazy first level filter. The second level filter
is checking against the actual FeatureFlag Server.


## Info:
Check FFModuleHelper.ts file for a sample of how to extend it and use for your specific needs. 


## Other Notes:
use typings to install to type definitions files from definitely typed or npm
`typings install dt~express --global --save`
