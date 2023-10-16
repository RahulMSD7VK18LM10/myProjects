<?php
  namespace Drupal\products\Controller;
  use Drupal\Core\Controller\ControllerBase;
  use Drupal\Code\Database\Database;
  use Drupal\Core\Link;
  use Drupal\Core\Url;
  use Drupal\taxonomy\Entity\Term;
  class ExampleController extends ControllerBase{
    public function displayAllProducts(){
      drupal_flush_all_caches();
      $header_table=array(
        'product_id'=>$this->t('Product Id'),
        'product_name'=>$this->t('Product Name'),
        'product_category'=>$this->t('Product Category'),
        'product_price'=>$this->t('Product Price'),
        'product_image'=>$this->t('Product Image'),
        'product_quantity'=>$this->t('Product Quantity'),
        'created_on'=>$this->t("Created On"),
        'created_by'=>$this->t("Created By"),
        'opt' => t('Edit'),
        'opt1' => t('Delete'),
        'opt2' => t('View'),
      );
        $service=\Drupal::service('products.productservice'); // global service container
        $result=$service->getAllProducts();
        $row=array();
        // print_r($result[0]);
        // exit();
        foreach($result as $data){
          $taxaonomy_id=$data->product_category;
          $term=Term::load($taxaonomy_id);//it loads an entity
          $tax_name=$term->getName();
          // print_r($tax_name);
          // exit();
          // $data->product_category=$tax_name;
          // // print_r($data->product_category);
          // // exit();
          $row[]=array(
            'product_id'=>$data->product_id,
            'product_name'=>$data->product_name,
            // 'product_category'=>$data->product_category,
            'product_category'=>$tax_name,
            // 'product_category'=>$term_name,
            'product_price'=>$data->product_price,
            'product_image'=>Link::fromTextAndUrl($this->t($data->product_image),Url::fromUri('internal:/sites/default/files/product-images/'.$data->product_image))->toString(),
            'product_quantity'=>$data->product_quantity,
            'created_on'=>$data->created_on,
            'created_by'=>$data->created_by,
            'opt'=>Link::fromTextAndUrl($this->t('Edit'),Url::fromUri('internal:/product/action/update?num='.$data->product_id))->toString(),
            'opt1'=>Link::fromTextAndUrl($this->t('Delete'),Url::fromUri('internal:/product/action/delete/'.$data->product_id))->toString(),
            'opt2'=>Link::fromTextAndUrl($this->t('View'),Url::fromUri('internal:/product/product/detail?id='.$data->product_id))->toString(),
          );
          // print_r($tax_name);
          // exit();
        }
        $build['table']=[
          '#type'=>'table',
          '#header'=>$header_table,
          '#rows'=>$row,
        ];
        $msg=\Drupal::config('products.settings')->get('message');
      return[
        '#theme'=>'product-demo',
        '#title'=>'Product Data',
        '#info'=>'All Product Details is here',
        '#msg'=>$msg,
        '#data'=>$build
      ];
    }
  }
?>
