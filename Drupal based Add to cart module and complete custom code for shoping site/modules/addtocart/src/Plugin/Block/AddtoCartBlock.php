<?php
/**
 * @file
 * Contains \Drupal\addtocart\Plugin\Block\AddtoCartBlock.
 */

namespace Drupal\addtocart\Plugin\Block;

use Drupal\Core\Block\BlockBase;
use Drupal\Core\Form\FormInterface;

/**
 * Provides a 'Form' block.
 *
 * @Block(
 *   id = "form_block",
 *   admin_label = @Translation("Add to Cart"),
 *   category = @Translation("Custom Form block example")
 * )
 */
class AddtoCartBlock extends BlockBase {

  /**
   * {@inheritdoc}
   */
  public function build() {

    $form = \Drupal::formBuilder()->getForm('Drupal\addtocart\Form\AddtoCart');

    return $form;
   }
}
