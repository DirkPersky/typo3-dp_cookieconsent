.. include:: ../Includes.rst.txt

.. _checkboxes_code:

===========
Dynamic Checkboxes
===========
With this feature you can add or modify the checkbox types by configuration.
All you have to do is setting your new checkbox in TS and add it to the partial template:

Resources/Private/Partials/CookieSelection.html:

.. code-block:: html

    <label for="dp--cookie-thirdparty">
        <f:form.checkbox id="dp--cookie-thirdparty" class="dp--check-box" checked="{settings.checkboxes.thirdparty}" value="" />
        <f:translate key="dpThirdparty" extensionName="dp_cookieconsent" />
    </label>

`F.A.Q. How to remove unneccesary checkboxes <https://github.com/DirkPersky/typo3-dp_cookieconsent/wiki/How-to-remove-unneccesary-checkboxes>`_