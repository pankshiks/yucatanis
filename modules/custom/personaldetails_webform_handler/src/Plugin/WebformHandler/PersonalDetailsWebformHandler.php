<?php

namespace Drupal\personaldetails_webform_handler\Plugin\WebformHandler;

use Drupal\Core\Form\FormStateInterface;
use Drupal\webform\Plugin\WebformHandlerBase;
use Drupal\webform\webformSubmissionInterface;
use Drupal\profile\Entity\Profile;
use Drupal\user\Entity\User;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpKernel\HttpKernelInterface;
use Drupal\Core\Url;
use Symfony\Component\HttpFoundation\RedirectResponse;

/**
 * Webform submission handler.
 *
 * @WebformHandler(
 *   id = "personaldetails_webform_handler",
 *   label = @Translation("Personaldetails Webform Handler"),
 *   category = @Translation("Custom"),
 *   description = @Translation("Processes a webform submission to create customer profiles."),
 *   cardinality = \Drupal\webform\Plugin\WebformHandlerInterface::CARDINALITY_SINGLE,
 *   results = \Drupal\webform\Plugin\WebformHandlerInterface::RESULTS_PROCESSED,
 * )
 */
class PersonaldetailsWebformHandler extends WebformHandlerBase {

  /**
   * {@inheritdoc}
   */
  public function submitForm(array &$form, FormStateInterface $form_state, WebformSubmissionInterface $webform_submission) {

    $passenger_name = $webform_submission->getElementData('passenger_name');
    $command_name = $webform_submission->getElementData('command_name');
    $last_name =  $webform_submission->getElementData('last_name');
    $email = $webform_submission->getElementData('email');
    $phone_number = $webform_submission->getElementData('phone_number'); 
    $country = $webform_submission->getElementData('country');
    $hotel_name = $webform_submission->getElementData('hotel_name'); 
    $room_number = $webform_submission->getElementData('room_number');
    $note = $webform_submission->getElementData('note'); 
    $postal_code =$webform_submission->getElementData('postal_code');
    $company = $webform_submission->getElementData('company');
    $checkbox_1 = $webform_submission->getElementData('checkbox_1');
    $checkbox_2 = $webform_submission->getElementData('checkbox_2');
    $checkbox_3 = $webform_submission->getElementData('checkbox_3');
    $checkbox_4 = $webform_submission->getElementData('checkbox_4');
    $address_line_1 = $webform_submission->getElementData('address_line_1');
    $address_line_2 = $webform_submission->getElementData('address_line_2');
    $locality_e_g_city_ = $webform_submission->getElementData('locality_e_g_city_');
    $note = $webform_submission->getElementData('note');

     // Create a customer profile.
     
    //  $profile = Profile::create([
    //   'type' => 'customer', 
    //   'uid' => $webform_submission->getOwnerId(),
    //   'status' => 1,
    //   'field_hotel_information' => $hotel_name,
    //    'field_favourite_email' => $email,
    //   //'field_country' => $country,
    //    'field_phone_number'=> $phone_number,
    //    'field_hotel_information'=> $hotel_name,
    //    'field_room_number_' =>$room_number,
    //    'field_your_special_note' =>$note,
    //    'field_checkbox_label' =>  $checkbox_1,
    //    'field_checkbox_label2' => $checkbox_2,
    //    'field_we_totally_get_how_annoyin' => $checkbox_3,
    //    'field_checkbox_label4' => $checkbox_4,
       
       
    //   ]);
     
      $profile = \Drupal::entityTypeManager()
      ->getStorage('profile')
      ->loadByProperties(['uid' => $webform_submission->getOwnerId(), 'type' => 'customer']);
  
     if (empty($profile)) {
      
       $profile = Profile::create([
      'type' => 'customer', 
      'uid' => $webform_submission->getOwnerId(),
      'status' => 1,
      'field_hotel_information' => $hotel_name,
       'field_favourite_email' => $email,
       'field_country' => $country,
       'field_phone_number'=> $phone_number,
       'field_room_number_' =>$room_number,
       'field_your_special_note' =>$note,
       'field_checkbox_label' =>  $checkbox_1,
       'field_checkbox_label2' => $checkbox_2,
       'field_we_totally_get_how_annoyin' => $checkbox_3,
       'field_checkbox_label4' => $checkbox_4,
       
       
      ]);

      $profile->set('address', [
        // 'langcode' => 'pl',
        'additional_name' => 'additional',
        'country_code' => $country,
        'organization' => $company,
        'locality' => $locality_e_g_city_ ,
        'postal_code' => $postal_code,
        'address_line1' => $address_line_1 ,
        'address_line2' => $address_line_2 ,
        'given_name' => $passenger_name,
        'family_name' => $command_name,
        
      
      ]);
      
        $profile->save();
    
       }
      $node = \Drupal\node\Entity\Node::load($form_state->getValue('hotel_information'));
      if(!empty($node)){
      $hotel_name = $node->title->value;
  
      $hotel_time  = $form_state->getValue('output');
      $order_id =\Drupal::request()->query->get('order_id');
      $order = \Drupal::entityTypeManager()->getStorage('commerce_order')->load($order_id);
      $order->set('field_hotel_name',$hotel_name);
      $order->set('field_pick_up_time',$hotel_time);
      $order->save();
      }
      $order_id =\Drupal::request()->query->get('order_id');
      $checkoutUrl = Url::fromRoute('commerce_checkout.form', ['commerce_order' =>$order_id])->toString();
      $response = new RedirectResponse($checkoutUrl);
      $response->send();
   
  }
}
