<?php
  namespace Drupal\products\Controller;
  use Drupal\user\Entity\User;
  class ServiceController{
    public function content(){
      $service=\Drupal::service('products.sayhello');
      $details=$service->Hello();
      // $sitename=$user->getValue('name');
      $sitename=$details->get('name');
      //print_r($service);
      // print_r($details);
      print_r($sitename);
      exit();
    }
  }
?>
