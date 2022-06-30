/* eslint-disable import/unambiguous */
// import './messageReceiver';
import BackboneSync from '../adapters/BackboneSync';
import View from '../Views/SidebarApp';

Backbone.sync = BackboneSync;

$(() =>  {
    const app = new View();

    window._app = app.model;
});

