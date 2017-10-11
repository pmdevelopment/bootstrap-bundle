[BraincraftedBootstrapBundle](http://bootstrap.braincrafted.com)
=================

Forked to continue development of this bundle.

## Targets

* Fixing issues bothering us
* Integration of Bootstrap 4

## Releases

### 2.2.3
Adds boolean `sortable` setting for `BootstrapCollectionType`. Requires FontAwesome to display arrow up/down.

### 2.2.2
Fixes missing `choice_translation_domain` in expanded `ChoiceType`

### 2.2.1
Fixes Symfony3 deprecations 

## Setup

Update your `composer.json`:

    "repositories": [
        {
            "type": "composer",
            "url": "https://packagist.org"
        },
        {
            "type": "vcs",
            "url": "https://github.com/pmdevelopment/bootstrap-bundle"
        },
        ...
    ],
    "require": {
        "braincrafted/bootstrap-bundle": "^2.2.2"
    }

License
-------

- The bundle is licensed under the [MIT License](http://opensource.org/licenses/MIT)
- The CSS and Javascript files from Twitter Bootstrap are licensed under the [Apache License 2.0](http://www.apache.org/licenses/LICENSE-2.0) for all versions before 3.1
- The CSS and Javascript files from Twitter Bootstrap are licensed under the [MIT License](http://opensource.org/licenses/MIT) for 3.1 and after

