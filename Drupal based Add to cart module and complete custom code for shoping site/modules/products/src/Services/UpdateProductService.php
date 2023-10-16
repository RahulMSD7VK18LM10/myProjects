<?php
  namespace Drupal\products\services;
  use Drupal\Core\Database\Connection;
  use Drupal\products\services\ProductService;
  class UpdateProductService{
    public function __construct(Connection $database){
      $this->database=$database;
    }
    public function updateProduct($id,$field){
      $query = \Drupal::database();
      $query=$this->database->update('productexample');
      $query->fields($field)
            ->condition('product_id', $id)
            ->execute();
    }
  }
?>
