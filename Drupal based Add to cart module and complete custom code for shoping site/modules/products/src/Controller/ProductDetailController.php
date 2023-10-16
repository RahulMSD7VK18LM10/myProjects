<?php
  namespace Drupal\products\Controller;
  use Drupal\Core\Controller\ControllerBase;
  use Drupal\taxonomy\Entity\Term;

  class ProductDetailController extends ControllerBase{
    public function dispalyProduct(){
      drupal_flush_all_caches();
      $id=$_GET['id'];
      $service=\Drupal::service('products.productservice');
      $result=$service->getProductById($id);
      $taxaonomy_id=$result['product_category'];
      $term=Term::load($taxaonomy_id);//it loads an entity
      $tax_name=$term->getName();
      $result['product_category']=$tax_name;
      //$result['product_image']=Link::fromTextAndUrl(t($result['product_image']),Url::fromUri('internal:/sites/default/files/product-images/'.$result['product_image']))->toString();
      return[
        '#theme'=>'product-detail',
        '#title'=>'Product Detail',
        '#info2'=>'Full Product Detail',
        '#detail'=>$result
      ];
    }
  }
?>
