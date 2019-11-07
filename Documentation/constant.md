```typoscript
plugin.tx_cookieconsent.settings {
    # PID to Data Protection
    url =
    # Layout
    theme = edgeless
    # Position
    position = bottom-right
    # dismiss on scroll (in PX)
    dismissOnScroll =
    # Type (info, opt-out, opt-in)
    type = opt-in
    # extend layout with checkboxes (basic,dpextend)
    layout = dpextend
    #  pre check statistics in checkboxes layout
    statistics = true
    # pre check statistics in checkboxes layout
    marketing = false

    # show Iframe overlay
    overlay {
        # Enable Iframe overlay
        notice = true

        box {
            # Overlay: Background
            background = rgba(0,0,0,.8)
            # Overlay: Text
            text = #fff
        }
        button {
            # Overlay Button: Background
            background = #b81839
            # Overlay Button: Text
            text = #fff
        }
    }

    # Cookiehint Style
    palette {
        popup {
            # Bar: Background color
            background = #2473be
            # Bar: text color
            text = #fff
        }
        button {
            # Button: Background color
            background = #f96332
            # Button: text color
            text = #fff
        }
    }
}
```