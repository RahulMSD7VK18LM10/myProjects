<?php
namespace Drupal\placeorder\Form;
use Drupal\placeorder\Controller\Placeorderrecepit;
use Drupal\Core\Form\FormBase;
use Drupal\Core\Form\FormStateInterface;
use Drupal\Core\Link;
use Drupal\Core\Url;
use Drupal\user\Entity\User;
use Drupal\Core\Database\Database;
use Drupal\Core\Database\Connection;

class Placeorder extends FormBase{
  public function getFormId(){
    return 'placeorder_form';
  }
  public function buildForm(array $form, FormStateInterface $form_state){
    $form['submit'] = [
      '#type' => 'submit',
      '#value' => 'Place order',
    ];
  return $form;
  }
  public function submitForm(array &$form, FormStateInterface $form_state){
    $current_user = \Drupal::currentUser();
    $user=User::load($current_user->id());
    $userid=$user->get('uid')->value;
    $query1=\Drupal::database()->select('productcart','pct');
    $query1->fields('pct',['cart_id','product_id','user_id','product_name','product_image','product_price','product_quantity','product_category','added_on',]);
    $result1=$query1
            ->condition('user_id',$userid)
            ->execute()
            ->fetchAll();
    foreach($result1 as $data){
      $listofitems=$listofitems.$data->product_name.' x'.$data->product_quantity.',';
      $totalquantity=$totalquantity+$data->product_quantity;
      $totalprice=$totalprice+($data->product_price)*($data->product_quantity);
    }
    $field  = array(
      'user_id'=>$userid,
      'product_name'   =>  $listofitems,
      'total_price'=> $totalprice,
      'total_quantity' =>$totalquantity,
      'order_date' =>date('Y/m/d H:i:s'),
    );
    $query2=\Drupal::database();
    $query2->insert('productorder')
      ->fields($field)
      ->execute();
    if($query2){
      $query3=\Drupal::database();
      $query3->select('productcart','pct');
      $query3->delete('productcart')
            ->condition('user_id',$userid)
            ->execute();
      drupal_flush_all_caches();
      \Drupal::messenger()->addMessage("Order Placed Successfully");
    }
    else{
      drupal_flush_all_caches();
      \Drupal::messenger()->addMessage("There was some problem");
    }
    // $this->mysubmit();
  }
  public function mysubmit(){
    $mailManager = \Drupal::service('plugin.manager.mail');
    $module = 'placeorder';
    $key = 'general_mail'; // Replace with Your key
    // $to = \Drupal::currentUser()->getEmail();
    $to = "rahul9424527610@gmail.com";
    $params['message'] = "Thank You";
    $params['title'] = "Order Placed";
    $langcode = \Drupal::currentUser()->getPreferredLangcode();
    $send = true;

    $result = $mailManager->mail($module, $key, $to, $langcode, $params, NULL, $send);
    if ($result['result'] != true) {
      $message = $this->t('There was a problem sending your email notification to @email.', array('@email' => $to));
      //drupal_set_message($message, 'error');
      \Drupal::messenger()->addError($message);
      \Drupal::logger('mail-log')->error($message);
      return;
    }

    $message = t('An email notification has been sent to @email ', array('@email' => $to));
    // drupal_set_message($message);
    \Drupal::messenger()->addMessage($message);
    \Drupal::logger('mail-log')->notice($message);
  }
}
