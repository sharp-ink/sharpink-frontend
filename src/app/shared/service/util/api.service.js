"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
var core_1 = require("@angular/core");
/**
 * Classe permettant de communiquer avec l'API RESTful exposée par le backend.
 */
var ApiService = /** @class */ (function () {
    function ApiService(http) {
        this.http = http;
        this.API = 'http://sharpink.io:8888/api';
    }
    ApiService.prototype.get = function (endpoint, options) {
        if (options) {
            return this.http.get(this.API + "/" + endpoint, options);
        }
        else {
            return this.http.get(this.API + "/" + endpoint);
        }
    };
    ApiService.prototype.patch = function (endpoint, body, options) {
        if (options) {
            return this.http.patch(this.API + "/" + endpoint, body, options);
        }
        else {
            return this.http.patch(this.API + "/" + endpoint, body);
        }
    };
    ApiService.prototype.post = function (endpoint, body, options) {
        if (options) {
            return this.http.post(this.API + "/" + endpoint, body, options);
        }
        else {
            return this.http.post(this.API + "/" + endpoint, body);
        }
    };
    ApiService.prototype.put = function (endpoint, body, options) {
        if (options) {
            return this.http.put(this.API + "/" + endpoint, body, options);
        }
        else {
            return this.http.put(this.API + "/" + endpoint, body);
        }
    };
    ApiService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], ApiService);
    return ApiService;
}());
exports.ApiService = ApiService;
