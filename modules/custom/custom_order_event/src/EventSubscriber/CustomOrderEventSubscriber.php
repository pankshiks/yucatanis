<?php

namespace Drupal\custom_order_event\EventSubscriber;
use Drupal\state_machine\Event\WorkflowTransitionEvent;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use Symfony\Component\EventDispatcher\Event;
use Drupal\commerce_order\Event\OrderEvent;
use Drupal\webform\Entity\WebformSubmission;

class CustomOrderEventSubscriber implements EventSubscriberInterface {

  public static function getSubscribedEvents() {
    return [
      'commerce_order.place.post_transition' => 'onOrderComplete',
    ];
  }

  public function onOrderComplete(WorkflowTransitionEvent $event) {

    //get submission id
      $entity = $event->getEntity();
      // dd($entity);
       if ($entity->getEntityTypeId() == 'commerce_order') {
      // Get the submission ID from the order entity.
      $submission_id = $entity->get('field_submission_id')->value;
      //dd($submission_id);
      // $webform_id = 'booking_rental';
      $webform_ids = ['booking', 'booking_rental'];
      // Load the webform submission.
      // $webform_id = $submission->get('webform_id')->getValue()[0]['target_id'];
      $submission = WebformSubmission::load($submission_id);

      //  dd($submission->get('webform_id')->getValue()[0]['target_id']);
     
      if ($submission && in_array($submission->webform_id->entity->id(), $webform_ids) && $submission->id() === $submission_id) {
    //  if ($submission && $submission->webform_id->entity->id() === $webform_id  && $submission->id() === $submission_id) {
      $data=$submission->getData();
      // dd($data);
      $data['status'] = 'completed';
       $submission->setData($data);
      $submission->save();
  
    }
    
    }
    //get submission id 
    
    
    
  }


}

  

