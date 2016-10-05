"use strict";
const FFModule_1 = require('FFModule');
const fs = require('fs');
const path = require('path');
class FFModuleHelper extends FFModule_1.FFModule {
    constructor(device, url, customFeature) {
        super(device, url, undefined);
    }
    /**
     * Override the default getFeature method to check for localFeatureFlags first and
     * then the apiFeatureFlags
     */
    getFeature(featureName, accessToken) {
        console.log("Override Get Feature");
        return this.checkLocalFeatureRepo(featureName, accessToken)
            .then(feature => {
            if (feature != undefined && feature.enabled) {
                return super.getFeature(featureName, accessToken);
            }
            else {
                return Promise.resolve(undefined);
            }
        }).catch(err => {
            console.log(err);
        });
    }
    checkLocalFeatureRepo(featureName, accessToken) {
        // read file ->convert to FFlags -> check if the user group exists 
        let user_id = this.getUserFromAccessToken(accessToken);
        let user_type = "ADMIN";
        let file_contents = fs.readFileSync(path.resolve(__dirname, `../store/${this.config.device}/${user_type}.json`), "utf-8");
        if (file_contents.length > 0) {
            let fflags = FFModule_1.FeatureFlags.fromJSON(file_contents);
            let feature = this.featureLookup(featureName, fflags.children);
            return feature;
        }
        //Promise.resolve(undefined)
    }
    getUserFromAccessToken(access_token) {
        // check the redis store
        return;
    }
    /**
       * looks up the feature
       * returns feature and if the feature exists
       */
    featureLookup(featureName, fflags) {
        let featName = featureName;
        if (featName.split(".").length == 1) {
            let feature = this.getElement(featName, fflags);
            let featureEnabled = true;
            if (feature === null || feature === undefined)
                featureEnabled = false;
            return Promise.resolve(feature);
        }
        else {
            let featureDomain = featName.split(".");
            let featureList = fflags;
            let featureEnabled = true;
            let lastFeature = undefined;
            for (var featureName of featureDomain) {
                lastFeature = this.getElement(featureName, featureList);
                featureEnabled = true;
                if (lastFeature === null || lastFeature === undefined) {
                    featureEnabled = false;
                    break;
                }
                else {
                    featureList = lastFeature.children;
                }
            }
            let feature = (lastFeature instanceof FFModule_1.Feature) ? lastFeature : undefined;
            return Promise.resolve(feature);
        }
    }
    getFeaturesForUserGroup() {
        return;
    }
    getElement(featureName, ffElements) {
        // remove the Variations
        let groupsAndFeatures = [];
        ffElements.forEach(element => {
            if (element instanceof FFModule_1.Feature || element instanceof FFModule_1.FeatureGrouping) {
                groupsAndFeatures.push(element);
            }
        });
        let featurePos = groupsAndFeatures.map(el => {
            if (el instanceof FFModule_1.Feature)
                return el.featureKey;
            else if (el instanceof FFModule_1.FeatureGrouping)
                return el.featureGroupKey;
        }).indexOf(featureName);
        let returnValue = groupsAndFeatures[featurePos];
        return returnValue;
    }
}
exports.FFModuleHelper = FFModuleHelper;
//# sourceMappingURL=FFModuleHelper.js.map