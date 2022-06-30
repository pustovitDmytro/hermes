import { openConvert } from '../constants/messages.json';
import browser from '../browser';

export default async function messageReceiver(request) {
    await window._app._ready;
    if (request.type === openConvert) handleConvertInput(request);
}

async function handleConvertInput({ amount, symbol }) {
    window._app.set({ amount, symbol });
}

browser.runtime.onMessage.addListener(messageReceiver);
