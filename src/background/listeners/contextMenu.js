import { pause } from 'myrmidon';
import browser from '../../browser';
import contextMenu from '../contextMenu';
import { openConvert } from '../../constants/messages.json';
import { parseRawInput } from '../../utils/inputs';
import { SIDEBAR_OPEN_WAIT } from '../../constants/timeouts';

async function onContextMenuClick(info) {
    if (info.menuItemId === contextMenu.txtSelectedConvert) {
        const selectedText = info.selectionText;
        const { amount, symbol } = parseRawInput(selectedText);

        await browser.sidebarAction.open();
        await pause(SIDEBAR_OPEN_WAIT);

        browser.runtime.sendMessage({ type: openConvert, amount, symbol });
    }
}

browser.contextMenus.onClicked.addListener(onContextMenuClick);
