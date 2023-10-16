<?php
namespace Drupal\addtocart\Form;
use Drupal\Core\Form\FormBase;
use Drupal\Core\Form\FormStateInterface;
use Drupal\Core\Link;
use Drupal\Core\Url;
use Drupal\user\Entity\User;
use Drupal\Core\Database\Database;
use Drupal\Core\Database\Connection;

class ClearCart extends FormBase{
  public function getFormId(){
    return 'clearcart_form';
  }
  public function buildForm(array $form, FormStateInterface $form_state){
    $form['submit'] = [
      '#type' => 'submit',
      '#value' => 'Clear Cart',
    ];
  return $form;
  }
  public function submitForm(array &$form, FormStateInterface $form_state){
    $current_user = \Drupal::currentUser();
    $user=User::load($current_user->id());
    $userid=$user->get('uid')->value;
    // print_r($userid);
    // exit();
    $query=\Drupal::database();
    $query->delete('productcart')
          ->condition('user_id',$userid)
          ->execute();
    if($query){
      drupal_flush_all_caches(); //to clear cache automatically
      \Drupal::messenger()->addMessage("Cart is cleared!!");
    }
    else{
        drupal_flush_all_caches(); //to clear cache automatically
        \Drupal::messenger()->addMessage("There was some problem");
    }
  }
}
