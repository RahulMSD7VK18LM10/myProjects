<?php
  namespace Drupal\products\Action;
  use Drupal\Core\Form\FormBase;
  use Drupal\Core\Form\FormStateInterface;
  use Drupal\Core\Form\ConfirmFormBase;
  use Drupal\Core\Url;
  use Drupal\Core\Render\Element;
  class Delete extends ConfirmFormBase {
    public function getFormId() {
      return 'delete_form';
    }
    public $cid;
    public function getQuestion() {
      return t('Do you want to delete %cid?', array('%cid' => $this->cid));
    }
    public function getCancelUrl() {
        return new Url('products.example_controller_view');
    }
    public function getDescription() {
        return t('Only do this if you are sure!');
      }
    public function getConfirmText() {
      return t('Delete it!');
    }
    public function getCancelText() {
      return t('Cancel');
    }
    public function buildForm(array $form, FormStateInterface $form_state, $cid = NULL) {

      $this->id = $cid;
      return parent::buildForm($form, $form_state);
    }
    public function validateForm(array &$form, FormStateInterface $form_state) {
      parent::validateForm($form, $form_state);
    }
    public function submitForm(array &$form, FormStateInterface $form_state) {
        // $query = \Drupal::database();
        // $query->delete('productexample')
        //       ->condition('product_id',$this->id)
        //       ->execute();
        $service=\Drupal::service('products.productservice');
        $result=$service->deleteProductById($this->id);
        if($result==null){
          drupal_flush_all_caches(); //to clear cache automatically
          \Drupal::messenger()->addMessage("succesfully deleted");
          $form_state->setRedirect('products.example_controller_view'); // using route name
        }
        else{
          \Drupal::messenger()->addMessage("There was some problem");
        }
    }
  }
?>
