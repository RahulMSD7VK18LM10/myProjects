<?php
/**
 * @file
 * Contains \Drupal\addtocart\Plugin\Block\ClearCartBlock.
 */

namespace Drupal\addtocart\Plugin\Block;

use Drupal\Core\Block\BlockBase;
use Drupal\Core\Form\FormInterface;

/**
 * Provides a 'Form' block.
 *
 * @Block(
 *   id = "clearcart_block",
 *   admin_label = @Translation("Clear Cart"),
 *   category = @Translation("Custom Form block clear cart")
 * )
 */
class ClearCartBlock extends BlockBase {

  /**
   * {@inheritdoc}
   */
  public function build() {

    $form = \Drupal::formBuilder()->getForm('Drupal\addtocart\Form\ClearCart');
    return $form;
   }
}
