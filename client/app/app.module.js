angular.module('app', ['app.nav', 'ui.router', 'uiGmapgoogle-maps'])
       .config(function (uiGmapGoogleMapApiProvider) {
         uiGmapGoogleMapApiProvider.configure({
           v: '3.20'
         });
       });
