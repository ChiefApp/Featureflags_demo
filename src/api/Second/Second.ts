"use strict";

import {DEVICE}  from 'FFModule';  
import {FFModule, Feature} from 'FFModule' 
import * as root from 'FFModule';
import {FFModuleHelper} from '../../FFModuleHelper'

let ff = new FFModuleHelper("WEB", "http://localhost:1337", undefined) 
export class Second { 
    @ff.Feature("Dashboard", "22")
    flag:Promise<Feature>
    constructor(){
        this.flag.then(feature => {
            console.log(feature);
        })
    }
}