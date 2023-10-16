<?php
 namespace Drupal\products\services;

 class InsertProductService{
  public function addProduct($field){
    $query = \Drupal::database();
    $query->insert('productexample')
      ->fields($field)
      ->execute();
  }
 }
?>
