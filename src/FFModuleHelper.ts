"use strict";

import {DEVICE}  from 'FFModule'; 
import {FFModule, Feature, FeatureGrouping, FeatureFlags} from 'FFModule' 
import * as root from 'FFModule';
import fs = require('fs');  
import path = require('path');

export class FFModuleHelper extends FFModule { 
    
    constructor(device:DEVICE, url:string, customFeature?: any) {
        super(device, url, undefined)  
    }
    
    /**
     * Override the default getFeature method to check for localFeatureFlags first and 
     * then the apiFeatureFlags
     */
    getFeature(featureName: string, accessToken: string): Promise<Feature> {
        console.log("Override Get Feature");
        
        return this.checkLocalFeatureRepo(featureName, accessToken)
            .then(feature => {
                if(feature != undefined && feature.enabled) {
                    return super.getFeature(featureName, accessToken)
                } else {
                    return Promise.resolve(undefined)
                }
            }).catch(err => {
                console.log(err);
            })
    }

    checkLocalFeatureRepo(featureName:string, accessToken:string): Promise<Feature> { 
        // read file ->convert to FFlags -> check if the user group exists 
        let user_id = this.getUserFromAccessToken(accessToken)
        let user_type = "ADMIN"
        let file_contents = fs.readFileSync(path.resolve(__dirname, `../store/${this.config.device}/${user_type}.json`), "utf-8");
        if(file_contents.length > 0) {
            let fflags = FeatureFlags.fromJSON(file_contents) 
            let feature = this.featureLookup(featureName, fflags.children) 
            return  feature
        }
        //Promise.resolve(undefined)
    }  
 
    private getUserFromAccessToken(access_token: string): any {
        // check the redis store
        // TODO: Need to implement the functionality to store UserObject against AccessToken or it already exists.
        return 
    }

    /**
       * looks up the feature
       * returns feature and if the feature exists
       */
    featureLookup(featureName:string, fflags: Array<Feature | FeatureGrouping>): Promise<Feature> { // need to find a way to set retunrn type to null
            let featName: string = featureName
            if (featName.split(".").length == 1) {
                let feature: Feature = <Feature>this.getElement(featName,fflags)
                let featureEnabled = true
                if(feature === null || feature === undefined)
                     featureEnabled = false
                return Promise.resolve(feature)
            } else {
                let featureDomain = featName.split(".")
                let featureList = fflags
                let featureEnabled: Boolean = true
                let lastFeature: Feature | FeatureGrouping = undefined
                for(var featureName of featureDomain) {
                     lastFeature = this.getElement(featureName, featureList);
                     featureEnabled = true
                     if(lastFeature === null || lastFeature === undefined) {
                         featureEnabled = false
                         break
                     } else {
                        featureList = lastFeature.children
                    }
                }
                let feature = (lastFeature instanceof Feature) ? lastFeature:undefined
                return Promise.resolve(feature);
            }
    }


    getElement(featureName: string, ffElements: Array<Feature | FeatureGrouping>): Feature | FeatureGrouping {
        // remove the Variations
        let groupsAndFeatures: Array<Feature | FeatureGrouping> = []
        ffElements.forEach(element => {
            if(element instanceof Feature ||  element instanceof FeatureGrouping) {
                groupsAndFeatures.push(element)
            }
        });

        let featurePos = groupsAndFeatures.map(el => {
            if(el instanceof Feature)
                return el.featureKey
            else if(el instanceof FeatureGrouping)
                return el.featureGroupKey
        }).indexOf(featureName)

        let returnValue:Feature | FeatureGrouping = <Feature | FeatureGrouping>groupsAndFeatures[featurePos]
        return returnValue
    }

}
