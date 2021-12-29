.. include:: ../Includes.rst.txt

.. _scripts_code:

===========
Script loading from HTML
===========

load scripts after accepting
^^^^^^^^^^^^^^^^^^^^^^

**load script sources**
If you want to load JavaScript resources after the Cookie is accepted you can use this snippet

.. code-block:: html

    <script data-ignore="1" data-cookieconsent="statistics" type="text/plain" data-src="{YOUR_LINK_TO_JS}"></script>

**load inline script**
If you want to load Inline JavaScript after the Cookie is accepted use this snippet.

.. code-block:: html

    <script data-ignore="1" data-cookieconsent="statistics" type="text/plain">
    {YOUT_DYN_JS_CODE}
    </script>

The :guilabel:`data-ignore="1"` attribute is to cover the `Scriptmerger <https://extensions.typo3.org/extension/scriptmerger/>`_ engine to not combine these parts.

Checkbox mode
^^^^^^^^^^^^
Your customer can choose what types of scripts/cookies he wants to allow.
These 2 types are possible and handled by the consent:


statistics
--------------------
:aspect:` data-cookieconsent
   statistics
    .. code-block:: html

        <script data-cookieconsent="statistics" type="text/plain" data-ignore="1">

marketing
--------------------
:aspect:` data-cookieconsent
   marketing
    .. code-block:: html

        <script data-cookieconsent="marketing" type="text/plain" data-ignore="1">
