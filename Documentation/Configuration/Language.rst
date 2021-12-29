.. include:: ../Includes.rst.txt

.. _language:

===========
Language changes
===========

You can change the default language packs by adding new translations via TypoScript

.. note::
   **If you are from a country other than Germany, let me know your legal text and I will mark it for the next version!**

Arguments
=========
.. _language_arguments:
plugin.tx_dp_cookieconsent._LOCAL_LANG.##LANG##.
--------------------
:aspect:`message`
    the default consent message

:aspect:`dismiss`
    allow cookie button

:aspect:`link`
    read more link

:aspect:`deny`
    decline button

:aspect:`allow`
    allow cookie button

:aspect:`allowall`
    allow all cookie button

:aspect:`dpRequire`
    checkbox required label

:aspect:`dpStatistik`
    checkbox statistic label

:aspect:`dpMarketing`
    checkbox marketing label

:aspect:`media.notice`
    overlay notice headline

:aspect:`media.desc`
    overlay notice text

:aspect:`media.btn`
    overlay button text


.. code-block:: typoscript
    :caption: TypoScript setup

    plugin.tx_dp_cookieconsent._LOCAL_LANG {
        de {
            message = XXX
            dismiss = XXX
            allow = XXX
            link = XXX
            deny = XXX
            allowall = XXX

            # Checkbox labels
            dpRequire = XXX
            dpStatistik = XXX
            dpMarketing = XXX

            # Iframe Overlay text
            media.notice = XXX
            media.desc = XXX
            media.btn = XXX
        }
    }