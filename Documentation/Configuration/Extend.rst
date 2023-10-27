.. include:: ../Includes.rst.txt

.. _extend:

===========
Extend Mode
===========
Is available with version 12.1.0

.. code-block:: typoscript
   :caption: TypoScript constants

    plugin.tx_cookieconsent.settings {
        # PID of Cookie Storage
        storagePid = 10
        # Type (extend, opt-in)
        type = extend
    }


As a result, you will receive a more informative cookie consent.


.. figure:: ../Images/config-mode.png
   :class: with-shadow
   :width: 400px

   Consent Box `extend` mode

.. figure:: ../Images/config_overlay.png
   :class: with-shadow
   :width: 400px

   Consent Config `extend` mode