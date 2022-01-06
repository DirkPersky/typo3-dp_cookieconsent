.. include:: ../Includes.rst.txt

.. _scripts:

===========
Script loading
===========
Since version 1.3.0, you can define scripts such as Google Analytics in the TYPO3 backend that are loaded after the content has been accepted.
To do this, define the cookie and select the consent type.

.. note::
   make sure u defined the storagePid :ref:`Configuration <config_arguments>`

.. figure:: ../Images/be-cookies.png
   :class: with-shadow
   :width: 600px

    list of defined cookies

.. figure:: ../Images/be-cookie-example.png
   :class: with-shadow
   :width: 400px

    basic cookie information

.. figure:: ../Images/be-cookie-example-scripts.png
   :class: with-shadow
   :width: 400px

    script that loads after consent


If you want to define the script directly in your code, look in the :ref:`developer area <scripts_code>`.