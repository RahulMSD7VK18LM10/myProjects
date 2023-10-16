<?php
  namespace Drupal\placeorder\Controller;
  use Drupal\Core\Controller\ControllerBase;
  use Drupal\Core\Url;
  use Drupal\user\Entity\User;

  class Historyoforders extends ControllerBase{
    public function orderhistory(){
      drupal_flush_all_caches();
      $current_user = \Drupal::currentUser();
      $user=User::load($current_user->id());
      $userid=$user->get('uid')->value;
      $header_table=array(
        'order_id'=>$this->t('Order Id'),
        'product_name'=>$this->t('Product Name'),
        'total_price'=>$this->t('Total Price'),
        'total_quantity'=>$this->t('Total Quantity'),
        'order_date'=>$this->t("Ordered On"),
      );
      $query=\Drupal::database()->select('productorder','pod');
      $query->fields('pod',['order_id','product_name','total_quantity','total_price','order_date']);
      $result=$query
          ->condition('user_id',$userid)
          ->execute()
          ->fetchAll();
      if($result!=null){
        $flag=true;
        foreach($result as $data){
          $row[]=array(
            'order_id'=>$data->order_id,
            'product_name'=>$data->product_name,
            'total_price'=>$data->total_price,
            'total_quantity'=>$data->total_quantity,
            'order_date'=>$data->order_date,
          );
        }
        $build['table']=[
          '#type'=>'table',
          '#header'=>$header_table,
          '#rows'=>$row,
        ];
      }
      else{
        $flag=false;
      }
      $home=Url::fromUri('internal:/customexample')->toString();
      return[
        '#theme'=>'orderhistory',
        '#home'=>$home,
        '#flag'=>$flag,
        '#data'=>$build
      ];
    }
  }
?>
