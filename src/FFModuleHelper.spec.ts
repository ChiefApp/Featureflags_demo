import chai = require("chai");
import { FFModuleHelper } from './FFModuleHelper'

var expect = chai.expect;

describe('user model unit tests: ', () => {
    describe("2+4", () => {
        it("should be 6", (done) => {
            expect(2+4).to.equals(6);
            done();
        })
    }); 

    it("should be 6", (done) => {
        let ff = new FFModuleHelper("WEB", "http://localhost:1337", undefined)
        ff.checkLocalFeatureRepo("Dashboard", "1")
        done()
    })

    it("should return a feature", (done) => {
        let ff = new FFModuleHelper("WEB", "http://localhost:1337", undefined)
        let serverF = ff.getFeature("Dashboard", "1")
        serverF.then(f =>{
            console.log("server feature");
            console.log(serverF);
        })
        done()
    });
})