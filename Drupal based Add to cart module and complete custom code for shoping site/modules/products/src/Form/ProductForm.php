<?php
namespace Drupal\products\Form;
use Drupal\Core\Form\FormBase;
use Drupal\Core\Form\FormStateInterface;
use Drupal\taxonomy\Entity\Term;
use Drupal\user\Entity\User;
use Drupal\Core\Session\AccountInterface;
use Drupal\file\Entity\File;
use Symfony\Component\HttpFoundation\RedirectResponse;
use Drupal\Core\Entity\EntityManagerInterface;

class ProductForm extends FormBase{
  public function getFormId(){
    return 'products_form';
  }
  public function buildForm(array $form, FormStateInterface $form_state){
    $form['product_name'] = array(
      '#type' => 'textfield',
      '#title' => $this->t('Product Name:'),
      '#required' => TRUE,
    );
    $products_terms = \Drupal::entityTypeManager()->getStorage('taxonomy_term')->loadTree('Products');
    //entityTypeManager is used to get entity type manager
    // getStorage takes entity type id as parameter and returns a storage instance
    // loadtree finds all the term in a vocabulary iy creates a array of indexes other options are like load or loadmultiple
    $products = array();
    foreach ($products_terms as $product_term) {
        $products[$product_term->tid] = $product_term->name;
    }

    $form['product_category'] = array(
      '#type' => 'select',
      '#options' => $products,
      '#title' => $this->t('Producy Category'),
      '#required' => TRUE,
    );
    $form['product_image'] = array(
      '#type' => 'managed_file',
      '#title' => $this->t('Product Picture'),
      '#multiple'=>FALSE,
      '#upload_validators' =>array(
          'file_validate_extensions' => array('gif png jpg jpeg'),
          'file_validate_size' => array(25600000),
      ),
      '#upload_location' => 'public://product-images',
      '#required' => TRUE,
    );

    $form['product_quantity'] = array(
      '#type' => 'number',
      '#title' => $this->t('Product Quantity:'),
      '#required' => TRUE,
    );
    $form['product_price'] = array(
      '#type' => 'number',
      '#title' => $this->t('Product Price:'),
      '#required' => TRUE,
    );
    $form['submit'] = [
      '#type' => 'submit',
      '#value' => 'ADD',
    ];
  return $form;
  }
  public function submitForm(array &$form, FormStateInterface $form_state){
    $current_user = \Drupal::currentUser();
    $user=User::load($current_user->id());
    $username=$user->getAccountName();
    $userid=$user->get('uid')->value;
    $field=$form_state->getValues();
    $image=$field['product_image'];
    $file=File::load($image[0]);
    $file->setPermanent();
    $file->save();
    $filename=$file->getFilename();
    // $taxaonomy_id=$field['product_category'];
    // $term=Term::load($taxaonomy_id);//it loads an entity
    // $tax_name=$term->getName();// returns the machine name in the field
    $name=$field['product_name'];
    $price=$field['product_price'];
    $quantity=$field['product_quantity'];
    $field  = array(
      'user_id' => $userid,
      'product_name'   =>  $name,
      'product_category' =>  $field['product_category'],
      // 'product_category' =>  $tax_name,
      'product_image' =>  $filename,
      'product_quantity' => $quantity,
      'product_price'=> $price,
      'created_on' => date('Y/m/d'),
      'created_by'=>$username,
  );
  // print_r($tax_name);
  // exit();
  $service = \Drupal::service('products.insertproductservice');
  $result=$service->addProduct($field);
  // print_r($result);
  // exit();
  if($result==null){
    drupal_flush_all_caches(); //to clear cache automatically
    \Drupal::messenger()->addMessage("Product added successfully");
    $form_state->setRedirect('products.example_controller_view'); // using route name
  }
  else{
    \Drupal::messenger()->addMessage("There was some problem");
  }
  }
}
