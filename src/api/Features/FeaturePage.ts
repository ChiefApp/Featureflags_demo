"use strict";

import {DEVICE}  from 'FFModule';  
import {FFModule, Feature} from 'FFModule' 
import * as root from 'FFModule';
import {FFModuleHelper} from '../../FFModuleHelper'

let ff = new FFModuleHelper("WEB", "http://localhost:1337", undefined) 
export class FeaturePage { 

    @ff.Feature("Dashboard", "1")
    flag:Promise<Feature>
     
    constructor() { 
    //   ff.getFeature("das","1").then(f => {
    //         console.log(f);
    //   })
    }

    valueOfFeature(): Promise<Feature> {

        return this.flag.then(feature => {
            console.log("Feature is:"+feature);
            
            return feature
        })
    }
}