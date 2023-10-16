<?php
namespace Drupal\addtocart\Form;
use Drupal\Core\Form\FormBase;
use Drupal\Core\Form\FormStateInterface;
use Drupal\Core\Link;
use Drupal\Core\Url;
use Drupal\user\Entity\User;
use Drupal\Core\Database\Database;
use Drupal\Core\Database\Connection;

class AddtoCart extends FormBase{
  public function getFormId(){
    return 'addtocart_form';
  }
  public function buildForm(array $form, FormStateInterface $form_state){
    $form['submit'] = [
      '#type' => 'submit',
      '#value' => 'Add To Cart',
    ];
  return $form;
  }
  public function submitForm(array &$form, FormStateInterface $form_state){
    $current_user = \Drupal::currentUser();
    $user=User::load($current_user->id());
    $userid=$user->get('uid')->value;
    // print_r($userid);
    // exit();
    if($userid==0){
      \Drupal::messenger()->addMessage("Please Login to add product to cart");
    }
    else{
      $query3=\Drupal::database()->select('productcart','pct');
      $query3->fields('pct',['cart_id','product_id','user_id','product_name','product_image','product_price','product_quantity','product_category','added_on',]);
      $result3=$query3
        ->condition('product_id',$_GET['id'])
        ->condition('user_id',$userid)
        ->execute()
        ->fetchAssoc();
      if($result3==null){
        $query=\Drupal::database()->select('productexample','pde');
        $query->fields('pde',['product_id','product_name','product_category','product_image','product_quantity','product_price','created_on','created_by']);
        $result=$query
          ->condition('product_id', $_GET['id'])
          ->execute()
          ->fetchAssoc();
        $quantity=1;
        $field  = array(
          'product_id'=>$result['product_id'],
          'user_id'=>$userid,
          'product_name'   =>  $result['product_name'],
          'product_category' =>  $result['product_category'],
          'product_image' =>  $result['product_image'],
          'product_price'=> $result['product_price'],
          'product_quantity' =>$quantity,
          'added_on' => date('Y/m/d'),
        );
        $query1=\Drupal::database();
        $query1->insert('productcart')
          ->fields($field)
          ->execute();
        if($query1){
          drupal_flush_all_caches(); //to clear cache automatically
          \Drupal::messenger()->addMessage("Product added to cart!! View Cart to continue");
        }
        else{
          drupal_flush_all_caches();
          \Drupal::messenger()->addMessage("There was some problem");
        }
      }
      else{
        $newquantity=$result3['product_quantity']+1;
        $field=array(
          'product_quantity'=>$newquantity
        );
        $query4 = \Drupal::database()->update('productcart');
        $query4->fields($field)
              ->condition('product_id',$_GET['id'])
              ->condition('user_id',$userid)
              ->execute();
        if($query4){
          drupal_flush_all_caches(); //to clear cache automatically
          \Drupal::messenger()->addMessage("Item Added to Cart Successfully");
        }
        else{
          drupal_flush_all_caches();
          \Drupal::messenger()->addMessage("There was some problem");
        }
      }
    }
  }
}
