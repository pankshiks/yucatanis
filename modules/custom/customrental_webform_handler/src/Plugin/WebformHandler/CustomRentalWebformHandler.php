<?php

namespace Drupal\customrental_webform_handler\Plugin\WebformHandler;

use Drupal\Core\Annotation\Translation;
use Drupal\Core\Config\ConfigFactoryInterface;
use Drupal\Core\Entity\EntityTypeManagerInterface;
use Drupal\Core\Form\FormStateInterface;
use Drupal\Core\Logger\LoggerChannelFactoryInterface;
use Drupal\Core\Plugin\ContainerFactoryPluginInterface;
use Drupal\webform\Annotation\WebformHandler;
use Drupal\webform\Plugin\WebformHandler\EmailWebformHandler;
use Drupal\webform\Plugin\WebformHandlerBase;
use Drupal\webform\Plugin\WebformHandlerInterface;
use Drupal\webform\Plugin\WebformHandlerMessageInterface;
use Drupal\webform\WebformSubmissionConditionsValidatorInterface;
use Drupal\webform\WebformSubmissionInterface;
use Symfony\Component\DependencyInjection\ContainerInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpKernel\HttpKernelInterface;
use Symfony\Component\HttpFoundation\RedirectResponse;
use Drupal\commerce_price\Price;
use Drupal\Core\Url;

/**
 * Form submission handler.
 *
 * @WebformHandler(
 *   id = "customrental_webform_handler",
 *   label = @Translation("Custom rental webform handler"),
 *   category = @Translation("Slack"),
 *   description = @Translation("Sends submission data to Slack."),
 *   cardinality = \Drupal\webform\Plugin\WebformHandlerInterface::CARDINALITY_SINGLE,
 *   results = \Drupal\webform\Plugin\WebformHandlerInterface::RESULTS_PROCESSED,
 * )
 */
final class CustomRentalWebformHandler extends WebformHandlerBase {
  
  /**
   * @var ConfigFactoryInterface
   */
  protected $configFactory;

  /**
   * @var WebformSubmissionConditionsValidatorInterface
   */
  protected $conditionsValidator;

  /**
   * @var EntityTypeManagerInterface
   */
  protected $entityTypeManager;

  /**
   *
   * @param array $configuration
   * @param $plugin_id
   * @param $plugin_definition
   * @param LoggerChannelFactoryInterface $logger_factory
   * @param ConfigFactoryInterface $config_factory
   * @param EntityTypeManagerInterface $entity_type_manager
   * @param WebformSubmissionConditionsValidatorInterface $conditions_validator
   */
  public function __construct(
    array $configuration,
    $plugin_id,
    $plugin_definition,
    LoggerChannelFactoryInterface $logger_factory,
    ConfigFactoryInterface $config_factory,
    EntityTypeManagerInterface $entity_type_manager,
    WebformSubmissionConditionsValidatorInterface $conditions_validator
  ) {
    parent::__construct($configuration, $plugin_id, $plugin_definition);
    $this->loggerFactory = $logger_factory->get('customrental_webform_handler');
    $this->configFactory = $config_factory;
    $this->conditionsValidator = $conditions_validator;
    $this->entityTypeManager = $entity_type_manager;
  }

  /**
   * @param ContainerInterface $container
   * @param array $configuration
   * @param string $plugin_id
   * @param mixed $plugin_definition
   *
   * @return ContainerFactoryPluginInterface|EmailWebformHandler|WebformHandlerBase|WebformHandlerInterface|WebformHandlerMessageInterface|static
   */
  public static function create(ContainerInterface $container, array $configuration, $plugin_id, $plugin_definition) {
    return new static(
      $configuration,
      $plugin_id,
      $plugin_definition,
      $container->get('logger.factory'),
      $container->get('config.factory'),
      $container->get('entity_type.manager'),
      $container->get('webform_submission.conditions_validator')
    );
  }

  /**
   * {@inheritdoc}
   */
  public function defaultConfiguration() {
    return [];
  }
  /**
   * {@inheritdoc}
   */
  public function submitForm(array &$form, FormStateInterface $form_state, WebformSubmissionInterface $webform_submission) {
    
    // \Drupal::messenger()->addError("added Booking Items for rental!");
    if (\Drupal::currentUser()->isAuthenticated()) {
      // \Drupal::messenger()->addError("user is authenticated enter successfully");
      $value = $webform_submission->getData();

    $product_id = \Drupal::routeMatch()->getParameter('commerce_product')->id();
    $product = \Drupal\commerce_product\Entity\Product::load((int)$product_id);
    $entity_manager = \Drupal::entityTypeManager();
    
    $product_variation = $entity_manager->getStorage('commerce_product_variation')->load((int)$product->getVariationIds()[0]);
  if ($product_variation) {
    if($product_variation->hasField('field_4hrs_rental')||$product_variation->hasField('field_6hrs_rental')||$product_variation->hasField('field_8hrs_rental')){
      $price_number_4h = $product_variation->get('field_4hrs_rental')->getValue()[0]['number'];
      $price_number_6h = $product_variation->get('field_6hrs_rental')->getValue()[0]['number'];
      $price_number_8h = $product_variation->get('field_8hrs_rental')->getValue()[0]['number'];
      $price_currency = $product_variation->get('price')->getValue()[0]['currency_code'];
    }
       
        $product_variation_id =$product->get('variations')
        ->getValue()[0]['target_id'];
        $storeId = $product->get('stores')->getValue()[0]['target_id'];
     
        $store = \Drupal::entityTypeManager()
        ->getStorage('commerce_store')
        ->load($storeId);
    
        $cartProvider = \Drupal::service('commerce_cart.cart_provider');
        $cart = $cartProvider->getCart('default', $store);
        
        if (!$cart) {
         $cart =   $cartProvider->createCart('default', $store);
        }
      
        $line_item_type_storage = \Drupal::entityTypeManager()
          ->getStorage('commerce_order_item_type');
    
        $cart_manager = \Drupal::service('commerce_cart.cart_manager');
  
        $total_items = count($cart-> getItems());
        $cart_provider = \Drupal::service('commerce_cart.cart_provider');
  
        $orders =$cart_provider->getCarts();
  
        if($total_items<1){
        $line_item = $cart_manager->addEntity($cart,$product_variation);
        
        foreach ($cart->getItems() as $order_item) {

  
          $order = $order_item->getOrder();
          $value = $webform_submission->getData();
          //14-nov
          $webform_submission->setSticky(!$webform_submission->isSticky())->save();
          // dd($webform_submission);
          $sid = $webform_submission->id();
          // $custom_submission_value =$order->set('field_submission_id',$order->id());
          $custom_submission_value =$order->set('field_submission_id',$sid);
          //14-nov
          $custom_adults_value = $order->set('field_adults_no',$value['adult_count']);
          $custom_infants_value = $order->set('field_infants_no',[$value['infants_no']]);
          $custom_kids_value = $order->set('field_kids_no',[$value['kids_no']]);
     
          $custom_pick_up_time = $order->set('field_booking_time',$value['desired_exact_date']);
          if( !empty($suggested_time)){
            $tour_time =$product->get('field_suggested_departure')->getValue();
          $total_minutes =$tour_time[0]['value']/60;
          $Remaining_minutes =  $total_minutes % 60;
  
          $Hours =   $total_minutes/ 60;
          $timeFormat = sprintf("%d:%02d",  $Hours ,$Remaining_minutes );

          $tour_start_time = $order->set('field_tour_start_time',$timeFormat);
          }
        
          $custom_pick_up_time = $order->set('field_booking_time',$value['desired_exact_date']);
          $order->save();
        
        }
        }
        else
        {
          foreach ($cart->getItems() as $order_item) {

     
            $order = $order_item->getOrder();
        
            $cart_manager->removeOrderItem($order, $order_item);//empty your cart
            $line_item = $cart_manager->addEntity($cart,$product_variation);//add items
            $value = $webform_submission->getData();
            
            $webform_submission->setSticky(!$webform_submission->isSticky())->save();
            $sid = $webform_submission->id();
             //22-nov
             $order_no = $order_item->get('order_id')->target_id;
             // dd($order_no);
              $order->load($order->id());

              $query = \Drupal::database()->select('webform_submission', 'w');
              $query->leftJoin('webform_submission_data', 'cname', 'w.sid = cname.sid');
              $query->fields('cname', ['sid']);
              $query->condition('cname.name', 'order_number', '=');
              $query->condition('cname.value', $order_no);

              $submission_ids = $query->execute()->fetchCol();
 
              foreach ($submission_ids as $submission_id) {
              $webform_submission_entity = \Drupal\webform\Entity\WebformSubmission::load($submission_id);

              if ($webform_submission_entity) {
              // \Drupal::logger('submit')->notice('<pre>' . print_r('Webform submission loaded successfully', true) . '</pre>');
              \Drupal::messenger()->addMessage('webform submission deleted successfully');
              $webform_submission_entity->delete();
              // \Drupal::logger('webform_delete')->notice('<pre>' . print_r('Webform submission deleted successfully.', true) . '</pre>');
              } else {
              \Drupal::logger('webform_delete2')->notice('<pre>' . print_r('Unable to load webform submission with ID.', true) . '</pre>');
              }
              }
            //22-nov
            $custom_submission_value =$order->set('field_submission_id', $sid );
            $custom_adults_value = $order->set('field_adults_no',$value['adult_count']);
            $custom_infants_value = $order->set('field_infants_no',[$value['infants_no']]);
            $custom_kids_value = $order->set('field_kids_no',[$value['kids_no']]);
            $custom_desired_timeframe= $order->set('field_time_frame',[$value['desired_time_frame_']]);
            if(!empty($suggested_time)){
              $tour_time =$product->get('field_suggested_departure')->getValue();
               $total_minutes =$tour_time[0]['value']/60;
              $Remaining_minutes =  $total_minutes % 60;
      
              $Hours =$total_minutes/ 60;
              $timeFormat = sprintf("%d:%02d",  $Hours ,$Remaining_minutes );
    
              $tour_start_time = $order->set('field_tour_start_time',$timeFormat);
              }
         
            $custom_booking_time = $order->set('field_booking_time',$value['desired_exact_date']);
     
          $order->save();
          
          $order_no_id = $order_item->get('order_item_id')[0]->get('value')->getValue();
          $order_NEW = \Drupal::entityTypeManager()->getStorage('commerce_order')->load($order->id());
          
          $checkoutUrl = Url::fromRoute('commerce_checkout.form', ['commerce_order' =>$order->id()])->toString();
            
          $roles = \Drupal::currentUser()->getRoles();
          $cart_session = \Drupal::service('commerce_cart.cart_session');
          $cart_session->addCartId($order->id());
 
          $url = Url::fromUri('internal:/form/personal-details', ['query' => ['order_id' =>$order->id()]]);
 
            \Drupal::messenger()->deleteAll();
      
            $redirect_url = $url->toString();

            // Redirect to the URL.
            $response = new RedirectResponse($redirect_url);
            $response->send();
          }
        }

        foreach ($cart->getItems() as $key=>$order_item) {

  

          $kids_no = $form_state->getValue('kids_no');
          $adult_no = $form_state->getValue('adult_count');
          $desired_time_frame = $form_state->getValue('desired_time_frame_');
          $extra_time_no = $form_state->getValue('extra_hour_optional_');
    
          $extra_price_value = ((int)$extra_time_no)*169;

           if($adult_no>=1){
             if( $desired_time_frame == '4'){
              $total_prices = $price_number_4h+$extra_price_value;
  
             }
             elseif($desired_time_frame=='6'){
              $total_prices= $price_number_6h+$extra_price_value;

             }elseif($desired_time_frame == '8'){
              $total_prices= $price_number_8h+$extra_price_value;
             }else{
              $total_prices=$price_number_8h+$extra_price_value;
             }
          $currencyCode = $order_item->getUnitPrice()->getCurrencyCode();

          $order = $order_item->getOrder();

          $unit_price = new Price($total_prices, $currencyCode);

          $custom_field_value = $order->get('field_submission_id')->value;
          $webform_submission->setSticky(!$webform_submission->isSticky())->save();
          $sid = $webform_submission->id();
          $custom_field_value =$order->set('field_submission_id',$sid);
     
          $data = $webform_submission->getData();
          $data['order_number'] = $order->id();
          $data['status']="in progress";
          $webform_submission->setData($data);
          // dd($webform_submission);
          $webform_submission->save();

          $order_item->setUnitPrice($unit_price,TRUE);
          $order_item->save();
          $order->save();
 
        }
         
          $order = $order_item->getOrder();
          
          $form['order_number'][0]['#default_value'] = $order->id();
          $custom_field_value = $order->get('field_submission_id')->value;
          $webform_submission->setSticky(!$webform_submission->isSticky())->save();
          $sid = $webform_submission->id();
          $custom_field_value =$order->set('field_submission_id',$sid);
     
            $data = $webform_submission->getData();
            $data['order_number'] = $order->id();
            $webform_submission->setData($data);
            $webform_submission->save();
  
          $order = \Drupal::entityTypeManager()->getStorage('commerce_order')->load($order->id());
          $checkoutUrl = Url::fromRoute('commerce_checkout.form', ['commerce_order' =>$order->id()])->toString();
          \Drupal::messenger()->deleteAll();
             $_SESSION['my_order']=$order;

             $product_entity = $order->getItems()[0];
             $purchased_product = $product_entity->getPurchasedEntity();
           $_SESSION['my_purchased_product']= $product_entity->getPurchasedEntity();
          //cart authenticated issue
          $cart_session = \Drupal::service('commerce_cart.cart_session');
          $cart_session->addCartId($order->id());
          $roles = \Drupal::currentUser()->getRoles();
          
          $url = Url::fromUri('internal:/form/personal-details', ['query' => ['order_id' =>$order->id()]]);
          $redirect_url = $url->toString();

          // Redirect to the URL.
          $response = new RedirectResponse($redirect_url);
          $response->send();
     
        }
      
        \Drupal::messenger()->deleteAll();
     
  }
  else {
    \Drupal::messenger()->addError("Product variation is empty or null.");
       // Get the URL of the product page
       $product_url = $product->toUrl()->toString();

       // Create a redirect response to the product page
       $response = new RedirectResponse($product_url);
       $response->send();
       return;

  }
}else{
    \Drupal::messenger()->addStatus('You must logged in before buying a Tour');
    $response = new RedirectResponse('/user/login');
    $response->send();
  }
}
}