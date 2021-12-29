.. include:: ../Includes.rst.txt

.. _config:

===========
Configuration
===========

.. _config_arguments:
plugin.tx_cookieconsent.settings.
=========

url
--------------------
:aspect:`Description`
   PID to Data Protection

target
--------------------
:aspect:`Description`
   Link target of read more link
:aspect:`Default`
   _bank

theme
--------------------
:aspect:`Description`
   Layout Class of the consent
:aspect:`Options`
   edgeless, ... following ..
:aspect:`Default`
   edgeless

position
--------------------
:aspect:`Description`
   position of the consent
:aspect:`Options`
   bottom, top, bottom-left, bottom-right
:aspect:`Default`
   bottom-right

revokable
--------------------
:aspect:`Description`
   Some countries REQUIRE that users can change their mind
:aspect:`Options`
   true, false
:aspect:`Default`
   true

reloadOnRevoke
--------------------
:aspect:`Description`
   force page reload after revoke
:aspect:`Options`
   true, false
:aspect:`Default`
   false

type
--------------------
:aspect:`Description`
   consent types
:aspect:`Options`
   opt-in, ... following ..
:aspect:`Default`
   opt-in

statistics
--------------------
:aspect:`Description`
   pre check statistics in checkboxes layout
:aspect:`Options`
   true, false
:aspect:`Default`
   false

marketing
--------------------
:aspect:`Description`
   pre check marketing in checkboxes layout
:aspect:`Options`
   true, false
:aspect:`Default`
   false

overlay.notice
--------------------
:aspect:`Description`
   enable or disable overlays (iframe, content)
:aspect:`Options`
   true, false
:aspect:`Default`
   true

overlay.box.background
--------------------
:aspect:`Description`
   Overlay: Background color
:aspect:`Options`
   rgba(), #hexa
:aspect:`Default`
   rgba(0,0,0,.8)

overlay.box.text
--------------------
:aspect:`Description`
   Overlay: text color
:aspect:`Options`
   rgba(), #hexa
:aspect:`Default`
   #fff

overlay.button.background
--------------------
:aspect:`Description`
   Overlay: Button Background color
:aspect:`Options`
   rgba(), #hexa
:aspect:`Default`
   #b81839

overlay.button.text
--------------------
:aspect:`Description`
   Overlay: Button text color
:aspect:`Options`
   rgba(), #hexa
:aspect:`Default`
   #fff

palette.popup.background
--------------------
:aspect:`Description`
   Consent Background color
:aspect:`Options`
   rgba(), #hexa
:aspect:`Default`
  rgba(0,0,0,.8)

palette.popup.background
--------------------
:aspect:`Description`
   Consent Text color
:aspect:`Options`
   rgba(), #hexa
:aspect:`Default`
  #fff

palette.button.background
--------------------
:aspect:`Description`
   Consent Button Background color
:aspect:`Options`
   rgba(), #hexa
:aspect:`Default`
  #b81839

palette.button.text
--------------------
:aspect:`Description`
   Consent Button Text color
:aspect:`Options`
   rgba(), #hexa
:aspect:`Default`
  #fff


.. _example:
Example Configuration
=========
This example configuration is based on the base TypoScript-Constants configuration (see :ref:`installation`).

.. code-block:: typoscript
   :caption: TypoScript constants

    plugin.tx_cookieconsent.settings {
        # PID to Data Protection
        url =
        # PID of Cookie Storage
        storagePid =
        # Layout
        theme = edgeless
        # Position
        position = bottom-right
        # Type (info, opt-out, opt-in)
        type = opt-in
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
