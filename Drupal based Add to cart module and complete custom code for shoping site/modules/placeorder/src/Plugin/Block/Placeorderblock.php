<?php
/**
 * @file
 * Contains \Drupal\addtocart\Plugin\Block\AddtoCartBlock.
 */

namespace Drupal\placeorder\Plugin\Block;

use Drupal\Core\Block\BlockBase;
use Drupal\Core\Form\FormInterface;

/**
 * Provides a 'Form' block.
 *
 * @Block(
 *   id = "placeorder_block",
 *   admin_label = @Translation("Place Order"),
 *   category = @Translation("Custom Form block example")
 * )
 */
class Placeorderblock extends BlockBase {

  /**
   * {@inheritdoc}
   */
  public function build() {
    $form = \Drupal::formBuilder()->getForm('Drupal\placeorder\Form\Placeorder');
    return $form;
   }
}
