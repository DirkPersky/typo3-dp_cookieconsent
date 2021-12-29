.. include:: ../Includes.rst.txt

.. _more_code:

===========
build your own overlay
===========
or accept/deny cookies outside of the cookie hint, you can use the followed examples

.. code-block:: html

    <button
        onclick="window.DPCookieConsent.forceAccept(this)"
        data-cookieconsent="statistics"
    >allow cookies and play video</button>

**allow cookies**

.. code-block:: js

    window.DPCookieConsent.forceAccept(this)

**deny cookies**
.. code-block:: js

    window.DPCookieConsent.forceDeny(this)