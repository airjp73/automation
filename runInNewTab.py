#!/usr/bin/env python3.7

import iterm2
import sys

command = sys.argv[1]
title = sys.argv[2]


async def runInNewTab(connection):
    app = await iterm2.async_get_app(connection)
    window = app.current_terminal_window
    if window is None:
        return 0
    tab = await window.async_create_tab(command=command, profile="Aaron")
    await tab.async_set_title(title)

iterm2.run_until_complete(runInNewTab)
