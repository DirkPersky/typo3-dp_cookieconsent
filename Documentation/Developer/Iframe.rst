.. include:: ../Includes.rst.txt

.. _iframe_code:

===========
iFrame loading from HTML
===========
You can also handle this part from an :ref:`Content element <content>` if you want.

load iframe after accepting
^^^^^^^^^^^^^^^^^^^^^^^^^^
If you want to load iFrames (YouTube, GMap, ..) after the Cookie is accepted you can use this snippet

.. code-block:: html

    <iframe width="560" height="315"
        data-cookieconsent="statistics"
        data-src="https://www.youtube-nocookie.com/embed/XXXXXX?autoplay=1"
        class="dp--iframe"
        frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreenn >
    </iframe>

With the :guilabel:`class="dp--iframe"` the iFrame is hidden by default and would be shown after accepting of the cookie.

iframe overlay
^^^^^^^^^^^^^^
**if you want to add an overlay to accept Cookies outside of the cookie hint**

.. figure:: ../Images/iframe-overlay.png
   :class: with-shadow
   :width: 400px

You also can modify the text in this hint individually per iframe

.. code-block:: html

    <iframe
        data-cookieconsent="statistics"
        data-src="https://www.youtube-nocookie.com/embed/XXXXXX?autoplay=1"
        class="dp--iframe"

        data-cookieconsent-notice="Cookie Notice"
        data-cookieconsent-description="Loading this...."
        data-cookieconsent-btn="allow cookies and load this ...."
    >
