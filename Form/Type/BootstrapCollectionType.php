<?php
/**
 * This file is part of BraincraftedBootstrapBundle.
 * (c) 2012-2013 by Florian Eckerstorfer
 */

namespace Braincrafted\Bundle\BootstrapBundle\Form\Type;

use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\CollectionType;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\FormInterface;
use Symfony\Component\Form\FormView;
use Symfony\Component\OptionsResolver\Options;
use Symfony\Component\OptionsResolver\OptionsResolver;

/**
 * BootstrapCollectionType
 *
 * @package    BraincraftedBootstrapBundle
 * @subpackage Form
 * @author     Florian Eckerstorfer <florian@eckerstorfer.co>
 * @copyright  2012-2013 Florian Eckerstorfer
 * @license    http://opensource.org/licenses/MIT The MIT License
 * @link       http://bootstrap.braincrafted.com Bootstrap for Symfony2
 */
class BootstrapCollectionType extends AbstractType
{
    /**
     * {@inheritdoc}
     */
    public function buildView(FormView $view, FormInterface $form, array $options)
    {
        $view->vars = array_replace(
            $view->vars,
            [
                'allow_add'          => $options['allow_add'],
                'allow_delete'       => $options['allow_delete'],
                'add_button_text'    => $options['add_button_text'],
                'delete_button_text' => $options['delete_button_text'],
                'sub_widget_col'     => $options['sub_widget_col'],
                'button_col'         => $options['button_col'],
                'prototype_name'     => $options['prototype_name'],
                'sortable'           => $options['sortable'],
            ]
        );

        if (false === $view->vars['allow_delete']) {
            $view->vars['sub_widget_col'] += $view->vars['button_col'];
        }

        if ($form->getConfig()->hasAttribute('prototype')) {
            $view->vars['prototype'] = $form->getConfig()->getAttribute('prototype')->createView($view);
        }
    }

    /**
     * {@inheritDoc}
     */
    public function configureOptions(OptionsResolver $resolver)
    {
        $optionsNormalizer = function (Options $options, $value) {
            // @codeCoverageIgnoreStart
            $value['block_name'] = 'entry';

            return $value;
            // @codeCoverageIgnoreEnd
        };

        $defaults = [
            'allow_add'          => false,
            'allow_delete'       => false,
            'prototype'          => true,
            'prototype_name'     => '__name__',
            'add_button_text'    => 'Add',
            'delete_button_text' => 'Delete',
            'sub_widget_col'     => 10,
            'button_col'         => 2,
            'options'            => [],
            'sortable'           => false,
        ];


        // map old class to new one using LegacyFormHelper
        $defaults['entry_type'] = TextType::class;

        $resolver->setDefaults($defaults);

        $resolver->setNormalizer('options', $optionsNormalizer);
    }

    /**
     * {@inheritDoc}
     */
    public function getParent()
    {
        // map old class to new one using LegacyFormHelper
        return CollectionType::class;
    }

    /**
     * {@inheritDoc}
     */
    public function getBlockPrefix()
    {
        return 'bootstrap_collection';
    }
}