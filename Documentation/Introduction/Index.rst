.. include:: ../Includes.rst.txt

.. _introduction:

============
Introduction
============

.. container:: row m-0 p-0

    .. figure:: https://img.shields.io/badge/Donate-PayPal-green.svg?style=for-the-badge
      :alt: Donate
      :target: https://www.paypal.me/dirkpersky

    .. figure:: https://img.shields.io/packagist/v/dirkpersky/typo3-dp_cookieconsent?style=for-the-badge
      :alt: Latest Stable Version
      :target: https://packagist.org/packages/dirkpersky/typo3-dp_cookieconsent

    .. figure:: https://img.shields.io/badge/TYPO3-dp__cookieconsent-%23f49700?style=for-the-badge
      :alt: TYPO3
      :target: https://extensions.typo3.org/extension/dp_cookieconsent/

    .. figure:: https://img.shields.io/packagist/l/dirkpersky/typo3-dp_cookieconsent?style=for-the-badge
      :alt: License
      :target: https://github.com/DirkPersky/typo3-dp_cookieconsent

What does it do?
================
This Plugin includes a solution for the EU Cookie law (`ePrivacy`, `TTDSG`). It extends some function to load Scripts, iframe and content after the user accepted the consent.
Though don't care about the latest EU laws and handle your Cookies with this Plugins.

When is the popup shown to users?
---------------------------------

The popup is shown on every page load until the user saves the consent.


CS_SEO
---------------------------------
This Plugin extends the Config from `CS_SEO <https://extensions.typo3.org/extension/cs_seo/>`_ so that the Google analytics script, tag manager and piwiki will fire after the Cookie is accepted.
