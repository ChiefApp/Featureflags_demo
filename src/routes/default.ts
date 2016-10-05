"use strict";
import { Controller, get, post } from 'vio';
import analytics =  require("analytics-node");

export default class Default extends Controller {
    @get()
    default() {
        return {
            title: "dasda",
            content: 'Keep calm and read the doc!'
        }
    }
}
