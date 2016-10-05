"use strict";
const FFModule_1 = require('FFModule');
class CustomFeatureLookup extends FFModule_1.FFModule {
    constructor(device, url, customFeature) {
        super(device, url, undefined);
    }
    getFeature(featureName, accessToken) {
        return this.checkLocalFeatureRepo(featureName, accessToken)
            .then(feature => {
            let user_id = this.getUserIDFromAccessToken(accessToken);
            return super.getFeature(featureName, user_id);
        }).catch(err => {
            console.log(err);
        });
    }
    checkLocalFeatureRepo(featureName, accessToken) {
        return Promise.resolve(undefined);
    }
    getUserIDFromAccessToken(access_token) {
        // check the redis store
        return;
    }
}
exports.CustomFeatureLookup = CustomFeatureLookup;
//# sourceMappingURL=CustomFeatureLookup.js.map