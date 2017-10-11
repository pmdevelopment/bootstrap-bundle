/* ==========================================================
 * bc-bootstrap-collection.js
 * http://bootstrap.braincrafted.com
 * ==========================================================
 * Copyright 2013 Florian Eckerstorfer
 *
 * ========================================================== */


!function ($) {

    "use strict"; // jshint ;_;

    /* COLLECTION CLASS DEFINITION
     * ====================== */

    var addField = '[data-addfield="collection"]',
        removeField = '[data-removefield="collection"]',
        moveField = '[data-movefield="collection"]',
        CollectionAdd = function (el) {
            $(el).on('click', addField, this.addField);
        },
        CollectionRemove = function (el) {
            $(el).on('click', removeField, this.removeField);
        },
        CollectionMove = function (el) {
            $(el).on('click', moveField, this.moveField);
        };

    CollectionAdd.prototype.addField = function (e) {
        var $this = $(this),
            selector = $this.attr('data-collection'),
            prototypeName = $this.attr('data-prototype-name')
            ;

        e && e.preventDefault();

        var collection = $('#' + selector),
            list = collection.find('> ul'),
            count = list.find('> li').length
            ;

        var newWidget = collection.attr('data-prototype');

        // Check if an element with this ID already exists.
        // If it does, increase the count by one and try again
        var newName = newWidget.match(/id="(.*?)"/);
        var re = new RegExp(prototypeName, "g");
        while ($('#' + newName[1].replace(re, count)).length > 0) {
            count++;
        }
        newWidget = newWidget.replace(re, count);
        newWidget = newWidget.replace(/__id__/g, newName[1].replace(re, count));
        var newLi = $('<li></li>').html(newWidget);
        newLi.appendTo(list);
        $this.trigger('bc-collection-field-added');

        CollectionMove.prototype.updateIcons(list.find('li'));
    };

    CollectionRemove.prototype.removeField = function (e) {
        var $this = $(this),
            selector = $this.attr('data-field'),
            parent = $this.closest('li').parent()
            ;

        e && e.preventDefault();

        $this.trigger('bc-collection-field-removed');
        $this.trigger('bc-collection-field-removed-before');
        var listElement = $this.closest('li').remove();
        parent.trigger('bc-collection-field-removed-after');

        CollectionMove.prototype.updateIcons(parent.find('li'));
    };

    CollectionMove.prototype.moveField = function (e) {
        var $this = $(this),
            direction = $this.attr('href'),
            item = $this.closest('li'),
            indexNew, itemExchange;

        e && e.preventDefault();

        var indexCurrent = item.index();

        if ('#down' === direction) {
            itemExchange = item.next();
            indexNew = itemExchange.index();

            item.insertAfter(itemExchange);
        } else {
            itemExchange = item.prev();
            indexNew = itemExchange.index();

            item.insertBefore(itemExchange);
        }


        $(item).find('input,select').each(function () {
            console.log('[' + indexNew + ']');
            $(this).attr('name', $(this).attr('name').replace('[' + indexCurrent + ']', '[' + indexNew + ']'));
        });

        $(itemExchange).find('input,select').each(function () {
            $(this).attr('name', $(this).attr('name').replace('[' + indexNew + ']', '[' + indexCurrent + ']'));
        });

        CollectionMove.prototype.updateIcons(item.parent().find('li'));

        $this.trigger('bc-collection-sorted');
    };

    CollectionMove.prototype.updateIcons = function (items) {
        items.find('a' + moveField).removeClass('invisible');
        items.first().find('a' + moveField).first().addClass('invisible');
        items.last().find('a' + moveField).last().addClass('invisible');
    };


    /* COLLECTION DATA-API
     * ============== */

    $(document).on('click.addfield.data-api', addField, CollectionAdd.prototype.addField);
    $(document).on('click.removefield.data-api', removeField, CollectionRemove.prototype.removeField);
    $(document).on('click.movefield.data-api', moveField, CollectionMove.prototype.moveField);

    $(document).on('ready', function () {
        $('.bc-collection-sortable').each(function () {
            CollectionMove.prototype.updateIcons($(this).find('li'));
        });
    });

}(window.jQuery);