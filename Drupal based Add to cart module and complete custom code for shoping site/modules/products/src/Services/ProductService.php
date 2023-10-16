<?php

  namespace Drupal\products\services;
  use Drupal\Core\Database\Database;
  use Drupal\Core\Database\Connection;
  use Drupal\user\Entity\User;
  class ProductService{
    protected $database;
    public function __construct(Connection $database){
      $this->database=$database;
    }
    public function getAllProducts(){
      $current_user = \Drupal::currentUser();
      $user=User::load($current_user->id());
      $userid=$user->get('uid')->value;
        // $query=\Drupal::database()->select('productexample','pde');
        $query=$this->database->select('productexample','pde');
          $query->fields('pde',['product_id','product_name','product_category','product_image','product_quantity','product_price','created_on','created_by']);
          $result=$query
            ->condition('user_id',$userid)
            ->orderBy('product_id', 'DESC')
            ->execute()
            ->fetchAll();
        return $result;
    }
    public function getProductById($id){
      // $query=\Drupal::database()->select('productexample','pde');
      $query=$this->database->select('productexample','pde');
          $query->fields('pde',['product_id','product_name','product_category','product_image','product_quantity','product_price','created_on','created_by']);
          $result=$query
            ->condition('product_id',$id)
            ->execute()
            ->fetchAssoc();
        return $result;
    }
    public function deleteProductById($id){
      $query=$this->database;
      $query->delete('productexample')
            ->condition('product_id',$id)
            ->execute();
    }
  }
?>
