.. include:: /Includes.rst.txt

.. _example:

===========
Example Configuration
===========
This example configuration is based on the base TypoScript-Constants configuration (see :ref:`installation`).

.. code-block:: typoscript
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
        statistics = false
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
                background = rgba(0,0,0,.8)
                # Bar: text color
                text = #fff
            }
            button {
                # Button: Background color
                background = #b81839
                # Button: text color
                text = #fff
            }
        }
    }

