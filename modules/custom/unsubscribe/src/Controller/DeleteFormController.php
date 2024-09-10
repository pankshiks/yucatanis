<?php

namespace Drupal\unsubscribe\Controller;
use Drupal\Core\Controller\ControllerBase;
use Drupal\Core\Form\FormStateInterface;
use Drupal\Core\Form\FormBase;
use Drupal\node\Entity\Node;
use Drupal\Core\Url;
use Drupal\Core\Routing;
use Drupal\Core\Form;
use Symfony\Component\HttpFoundation\RedirectResponse;

class DeleteFormController extends ControllerBase {
/**
 * {@inheritdoc}
 */

 
 public function delete($uid) { 
    // dd($uid);
    $connection = \Drupal::database();
    $connection->delete('simplenews_subscriber')
      ->condition('uid', $uid)
      ->execute();
   // dd($connection);
    // Optionally, you can show a message to the user.
    \Drupal::messenger()->addMessage('You have been unsubscribed from our newsletter.');
    
    
    // Redirect the user to a specific page after unsubscribing.
    return new RedirectResponse('/');


  
 }
}