import browser from '../browser';

const menu = {
    txtSelectedConvert : 'hermes-text-selected-convert'
};

export default menu;

browser.contextMenus.create({
    id       : menu.txtSelectedConvert,
    title    : 'Convert currency',
    contexts : [ 'selection' ]
});
