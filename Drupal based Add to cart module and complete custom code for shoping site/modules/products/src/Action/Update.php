<?php
namespace Drupal\products\Action;

use Drupal\Core\Database\Database;
use Drupal\Core\Form\FormBase;
use Drupal\Core\Form\FormStateInterface;
use Drupal\taxonomy\Entity\Term;
use Drupal\user\Entity\User;
use Drupal\Core\Session\AccountInterface;
use Drupal\file\Entity\File;
use Symfony\Component\HttpFoundation\RedirectResponse;

class Update extends FormBase
{
  public function getFormId()
  {
    return 'update_form';
  }
  public function buildForm(array $form, FormStateInterface $form_state)
  {
    $conn = Database::getConnection();
    $record = array();
    if (isset($_GET['num'])) {
      // $query = $conn->select('productexample', 'pde')
      //   ->condition('product_id', $_GET['num']) // used as a where clause when given only one parameter
      //   ->fields('pde');
      // $record = $query->execute()->fetchAssoc();
      $service1=\Drupal::service('products.productservice');
      $record=$service1->getProductById($_GET['num']);
    }
    $form['product_name'] = array(
      '#type' => 'textfield',
      '#title' => $this->t('Product Name:'),
      '#required' => TRUE,
      '#default_value' => (isset($record['product_name']) && $_GET['num']) ? $record['product_name'] : '',
    );
    $products_terms = \Drupal::entityTypeManager()->getStorage('taxonomy_term')->loadTree('products');
    //entityTypeManager is
    // getStorage takes entity type id as parameter and returns a storage instance
    // loadtree finds all the term in a vocabulary other options are like load or loadmultiple
    $products = array();
    foreach ($products_terms as $product_term) {
        $products[$product_term->tid] = $product_term->name;
    }
    $taxaonomy_id=$record['product_category'];
    // print_r($taxaonomy_id);
    // exit();
    $term=Term::load($taxaonomy_id);
    // print_r($term);
    // exit();
    $tax_name=$term->getName();
    // print_r($tax_name);
    // exit();
    $form['product_category'] = array(
      '#type' => 'select',
      '#options' => $products,
      '#title' => $this->t('Producy Category'),
      '#required' => TRUE,
      // '#default_value'=> $products[$record['product_category']]
      '#default_value'=> $tax_name,
    );
    // print_r($tax_name);
    // exit();
    $form['product_image'] = array(
      '#type' => 'managed_file',
      '#title' => $this->t('Product Picture'),
      '#description'=>$record['product_image'].' has been already uploaded',
      '#multiple' => FALSE,
      '#upload_validators' => array(
        'file_validate_extensions' => array('gif png jpg jpeg'),
        'file_validate_size' => array(25600000),
      ),
      '#upload_location' => 'public://product-images',
    );

    $form['product_quantity'] = array(
      '#type' => 'number',
      '#title' => $this->t('Product Quantity:'),
      '#required' => TRUE,
      '#default_value' => (isset($record['product_quantity']) && $_GET['num']) ? $record['product_quantity'] : '',
    );
    $form['product_price'] = array(
      '#type' => 'number',
      '#title' => $this->t('Product Price:'),
      '#required' => TRUE,
      '#default_value' => (isset($record['product_price']) && $_GET['num']) ? $record['product_price'] : '',
    );
    $form['submit'] = [
      '#type' => 'submit',
      '#value' => 'Update',
    ];
    return $form;
  }
  public function submitForm(array &$form, FormStateInterface $form_state)
  {
    $field = $form_state->getValues();
    $current_user = \Drupal::currentUser();
    $user = User::load($current_user->id());
    $username = $user->getAccountName();
    $image = $field['product_image'];
    $file = File::load($image[0]);
    $file->setPermanent();
    $file->save();
    $filename=$file->getFilename(); // to get filename
    // $taxaonomy_id=$field['product_category'];
    // $term=Term::load($taxaonomy_id);
    // $tax_name=$term->getName();
    if (isset($_GET['num'])) {
      $field = array(
        'product_name' => $field['product_name'],
        'product_category' => $field['product_category'],
        'product_image' => $filename,
        'product_quantity' => $field['product_quantity'],
        'product_price'=> $field['product_price'],
        'created_on' => date('Y/m/d'),
        'created_by' => $username,
      );
      // $query = \Drupal::database();
      // $query->update('productexample')
      //   ->fields($field)
      //   ->condition('product_id', $_GET['num'])
      //   ->execute();
      $service2=\Drupal::service('products.updateproductservice');
      $result=$service2->updateProduct($_GET['num'],$field);
      if($result==null){
        drupal_flush_all_caches(); //to clear cache automatically
        \Drupal::messenger()->addMessage("succesfully updated");
        $form_state->setRedirect('products.example_controller_view'); // using route name
      }
      else{
        \Drupal::messenger()->addMessage("There was some problem");
      }
    }
  }
}
?>
