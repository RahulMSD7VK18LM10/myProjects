<?php
  namespace Drupal\products\services;
  use Drupal\user\Entity\User;
  class ExampleServices{
    protected $say;
    public function Hello(){
      // $current_user = \Drupal::currentUser();
      // $user=User::load($current_user->id());
      // // $username=$user->getAccountName();
      // // return $username." 'is the current user";
      $details=\Drupal::config('system.site');
      return $details;
    }
  }
?>
