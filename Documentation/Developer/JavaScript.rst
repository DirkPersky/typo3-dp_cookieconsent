.. include:: ../Includes.rst.txt

.. _javascript-api:

=============================================================
JavaScript API
=============================================================

Events
=======

dp--cookie-init
^^^^^^^^^^^^^^^
.. rst-class:: dl-parameters

dp--cookie-init
    :sep:`|`
    fire event when initialize process is done

dp--cookie-fire
^^^^^^^^^^^^^^^
.. rst-class:: dl-parameters

dp--cookie-fire
    :sep:`|` :aspect:`Event paremeter:` event.detail.$el
    :sep:`|`
    fire after a consent script/iframe is loaded

dp--cookie-accept
^^^^^^^^^^^^^^^
.. rst-class:: dl-parameters

dp--cookie-accept
    :sep:`|`
    fire when the consent is accepted

dp--cookie-accept-init
^^^^^^^^^^^^^^^
.. rst-class:: dl-parameters

dp--cookie-accept-init
    :sep:`|`
    fire accepted event on revisited

dp--cookie-deny
^^^^^^^^^^^^^^^
.. rst-class:: dl-parameters

dp--cookie-deny
    :sep:`|`
    fire when the consend is denied

dp--cookie-revoke
^^^^^^^^^^^^^^^
.. rst-class:: dl-parameters

dp--cookie-revoke
    :sep:`|`
    fire when the consent is revoked

.. code-block:: js

    document.addEventListener('dp--cookie-fire', function (e) {
        console.log('dp--cookie-fire', e.detail.$el);
    });
    document.addEventListener('dp--cookie-accept', function (e) {
        console.log('dp--cookie-accept', e);
    });
    document.addEventListener('dp--cookie-deny', function (e) {
        console.log('dp--cookie-deny', e);
    });
    document.addEventListener('dp--cookie-revoke', function (e) {
        console.log('dp--cookie-deny', e);
    });