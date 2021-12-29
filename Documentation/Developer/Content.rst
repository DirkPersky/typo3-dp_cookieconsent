.. include:: ../Includes.rst.txt

.. _content_code:

===========
load content after accepting
===========
**if you want to add contents that will only be visible if the consent hint is accepted**
You can also handle this part from an :ref:`Content element <content>` if you want.

Your HTML markup for this is

.. code-block:: html

    <dp-content
        data-cookieconsent="statistics"
        class="dp--iframe"

        data-cookieconsent-notice="Cookie Notice"
        data-cookieconsent-description="Loading this...."
        data-cookieconsent-btn="allow cookies and load this ...."
    >
        YOUR CONTENT
    </dp-content>