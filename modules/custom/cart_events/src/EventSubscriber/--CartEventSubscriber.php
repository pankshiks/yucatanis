<?php

namespace Drupal\cart_events\EventSubscriber;

use Drupal\commerce_cart\Event\CartEntityAddEvent;
use Drupal\commerce_cart\Event\CartEvents;
use Drupal\Core\Entity\EntityTypeManagerInterface;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use Drupal\commerce_price\Price;
use Drupal\commerce_order\Entity\OrderItem;
use Drupal\commerce_order\Entity\Order;
use Drupal\cart_events\Services\WebFormSubmissionService;

/**
 * Event subscriber to capture product data after adding to cart.
 */
class CartEventSubscriber implements EventSubscriberInterface {

  /**
   * The entity type manager.
   *
   * @var \Drupal\Core\Entity\EntityTypeManagerInterface
   */
  protected $entityTypeManager;

  /**
   * Constructs a new CartEventSubscriber object.
   *
   * @param \Drupal\Core\Entity\EntityTypeManagerInterface $entityTypeManager
   *   The entity type manager.
   */
  public function __construct(EntityTypeManagerInterface $entityTypeManager) {
    //dd("hello");
    $this->entityTypeManager = $entityTypeManager;
  }

  /**
   * {@inheritdoc}
   */
  public static function getSubscribedEvents() {
    $events[CartEvents::CART_ENTITY_ADD][] = ['onCartEntityAdd', 0];
    return $events;
  }

  /**
   * Event callback to capture product data after adding to cart.
   *
   * @param \Drupal\commerce_cart\Event\CartEntityAddEvent $event
   *   The cart entity add event.
   */

  //working
  public function onCartEntityAdd(CartEntityAddEvent $event) {
    $order = $event->getEntity();
    \Drupal::messenger()->addMessage('running');
    $cart_provider = \Drupal::service('commerce_cart.cart_provider');
    $cart = $cart_provider->getCart('default');
    $order_items = $cart->order_items->referencedEntities();
   //dd($order_items);
    foreach ($order_items as $order_item) { 
      //dd($order_item);
      $order_no = $order_item->get('order_id')->target_id;
     // dd( $order_no);
      \Drupal::logger('order_no')->notice('<pre>'. print_r($order_no, true) .'</pre>');
      // Check if webform submissions exist for the order number.
      $submission_ids = $this->getWebformSubmissionIdsByOrder($order_no);
      dd( $submission_ids);
      // Delete existing webform submissions.
      foreach ($submission_ids as $submission_id) {
        // dd($submission_id);
        $webform_submission_entity = \Drupal\webform\Entity\WebformSubmission::load($submission_id);
      
        if ($webform_submission_entity) {
          
          \Drupal::messenger()->addMessage('webform submission deleted successfully');
          // \Drupal::logger('webform_submission_entity')->notice('<pre>'. print_r($webform_submission_entity, true) .'</pre>');
          $webform_submission_entity->delete();
        }
      }
    }
  }
  //
  protected function getWebformSubmissionIdsByOrder($order_no) {
    $submission_ids = [];
  
    $query = \Drupal::database()->select('webform_submission', 'w');
    $query->leftJoin('webform_submission_data', 'cname', 'w.sid = cname.sid');
    $query->fields('cname', ['sid']);
    $query->condition('cname.name', 'order_number', '=');
    $query->condition('cname.name', 'status', '=');
    // $query->condition('cname.name', 'in progress', '=');
    $query->condition('cname.value', $order_no);
    
    $submission_ids = $query->execute()->fetchCol();
    // dd($submission_ids);
    return $submission_ids;
  }

}
