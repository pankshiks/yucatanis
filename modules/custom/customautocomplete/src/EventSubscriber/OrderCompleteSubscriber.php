<?php

namespace Drupal\customautocomplete\EventSubscriber;

use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use Drupal\state_machine\Event\WorkflowTransitionEvent;
use Drupal\Core\Entity\EntityTypeManager;
use Drupal\commerce_order\Entity\Order;
use Drupal\webform\Entity\WebformSubmission;
use Drupal\commerce_payment\Entity\Payment;
use Dompdf\Dompdf;
use Dompdf\Options;


/**
 * Class OrderCompleteSubscriber.
 *
 * @package Drupal\customautocomplete
 */
class OrderCompleteSubscriber implements EventSubscriberInterface {

  /**
   * {@inheritdoc}
   */
  static function getSubscribedEvents() {
    $events['commerce_order.place.post_transition'] = ['orderCompleteHandler'];

    return $events;
  }

  /**
   * This method is called whenever the commerce_order.place.post_transition event is
   * dispatched.
   *
   * @param WorkflowTransitionEvent $event
   */

 public function orderCompleteHandler(WorkflowTransitionEvent $event) {
    $content = "<h1>Reciept</h1><br>";
    $ReceiptBKNo =  date("dmY");
    $Receiptno= "Receipt No";
    $Invoice_number = "Invoice Number";
    $datepaid = date("m/d/Y H:i:s") . " HRS";
    $order = \Drupal::routeMatch()->getParameter('commerce_order');
    $total_price = $order->get('total_price')->getValue()[0]["number"] ?? '';
    $formatted_amount = number_format($total_price, 2, '.', ',');
    $currencyCode = $order->get('total_price')->getValue()[0]["currency_code"] ?? '';
    $order_id = $order->get('order_id')->getValue()[0]["value"] ?? '';
    $order_items = $order->getItems();
    $webform_submission_id = $order->get('field_submission_id')->getValue()[0]["value"];

    $webform_submission = \Drupal\webform\Entity\WebformSubmission::load($webform_submission_id);
    $webform_id = $webform_submission->getWebform()->id();

    if ($webform_id === 'booking') {
    $data = $webform_submission->getData();
    $adultCount = isset($data['adult_count']) ? $data['adult_count'] : '';
    $kidsCount = isset($data['kids_no']) ? $data['kids_no'] : '';
    $infantsCount = isset($data['infants_no']) ? $data['infants_no'] : '';
    $serviceDate = isset($data['desired_exact_date']) ? $data['desired_exact_date'] : '';

    // Here i have loaded the wbform submission - personal details
    $personalDetails = $this->get_last_webform_submission();
    $personalData = $personalDetails->getData();
    $roomNumber = isset($personalData['room_number']) ? $personalData['room_number'] : '';
    $leadPassenger =  isset($personalData['passenger_name']) ? $personalData['passenger_name'] : '';
    $leadPassengerPhone =  isset($personalData['phone_number']) ? $personalData['phone_number'] : '';
    $pickupHotel = isset($personalData['hotel_s_name_for_pick_up']) ? $personalData['hotel_s_name_for_pick_up'] : '';
    $hotelNotListed = isset($personalData['if_your_beach_hotel_is_not_listed']) ? $personalData['if_your_beach_hotel_is_not_listed'] : '';
    $specialNote = isset($personalData['note']) ? $personalData['note'] : '';

    $product_ids = [];
    foreach ($order_items as $order_item) {
     $purchased_entity = $order_item->getPurchasedEntity();

     $title =$purchased_entity->get('title')->getValue()[0]["value"];

    }

    // here is the billing address
    $billing_profile = $order->getBillingProfile();

    $address = $billing_profile->get('address')->first();

    $billing_information = [
        'first_name' => $address->getGivenName(),
        'last_name' => $address->getFamilyName(),
        'address_line1' => $address->getAddressLine1(),
        'address_line2' => $address->getAddressLine2(),
        'locality' => $address->getLocality(),
        'administrative_area' => $address->getAdministrativeArea(),
        'postal_code' => $address->getPostalCode(),
        'country_code' => $address->getCountryCode(),
    ];

    $first_name = $billing_information['first_name'];
    $last_name = $billing_information['last_name'];
    $fullname = $first_name. ' ' .$last_name;
    $address_line1 = $billing_information['address_line1'];
    $address_line2 = $billing_information['address_line2'];
    $locality = $billing_information['locality'];
    $administrative_area = $billing_information['administrative_area'];
    $postal_code = $billing_information['postal_code'];
    $country_code = $billing_information['country_code'];

    $order_id = $order->get('order_id')->getValue()[0]["value"];
    $oder_load = Order::load($order_id);
    $pikupHotel = $oder_load->get('field_hotel_name')->getValue()[0]["value"] ?? '';
    $pikupTime = $oder_load->get('field_pick_up_time')->getValue()[0]["value"] ?? '';
    $payment_storage = \Drupal::entityTypeManager()->getStorage('commerce_payment');
    $payments = $payment_storage->loadByProperties(['order_id' => $order_id]);
    $payment_method = '';
    if (!empty($payments)) {
      $payment = reset($payments);
      $payment_method = $payment->get('payment_gateway')->entity->label();

  }
  $content1 = "
  <h1>Receipt</h1>
  <p>Invoice Number : {$ReceiptBKNo}{$order_id}</p>
  <p>Date Paid : {$datepaid}</p>
  <p>Payment Method : {$payment_method}</p>
  <p>$ {$formatted_amount} Paid On - {$datepaid}</p>
  <p>Service Booked : {$title}</p>
  <p>Bill To : {$fullname}, {$address_line1}, {$administrative_area}</p>
";

    $options = new Options();
    $options->set('isHtml5ParserEnabled', true);
    $options->set('isPhpEnabled', false); // Disable PHP execution in HTML
    $options->set('defaultFont', 'Arial'); // Set a default font
    $dompdf = new Dompdf($options);
    $dompdf->loadHtml($content1);
    $dompdf->setPaper('A4', 'landscape');
    $dompdf->render();

    // Save the PDF to a file
    $tmpdir = 'sites/default/files/tmp';
    $tmp_dir = $_SERVER['DOCUMENT_ROOT']."/".$tmpdir;
    if (!is_writable($tmp_dir)) {
        throw new \Exception("Directory is not writable: " . $tmp_dir);
    }
    $pdf_path = $tmp_dir . '/Receipt_Tour_Package'.$order_id.'.pdf';
    file_put_contents($pdf_path, $dompdf->output());

    if (file_exists($pdf_path) && filesize($pdf_path) > 0) {
        $pdf_content = file_get_contents($pdf_path);
    } else {
        // Handle file creation issue
        throw new \Exception('Failed to create PDF file or file is empty.');
    }
    $pdf = str_replace("\0", '', $pdf_content);

    // here i send email for booking webform submission
    $mailManager = \Drupal::service('plugin.manager.mail');
    $module = "customautocomplete";
    $key = 'custom_order_receipt';
    $content2 = "
        <p><strong>Yucatanis.com</strong></p>
        <p>Date Paid : $datepaid</p>
        <strong><p style = 'color: rgba(203, 145, 47, 1);'>Receipt BK No ID : <span style = 'color: rgba(51, 126, 169, 1);'> $ReceiptBKNo$order_id</span></p></strong>
        <p>Lead Passenger: <strong>$leadPassenger</strong> </p>
        <p>Pick up: <strong>$pikupHotel at $pikupTime HRS </strong></p>
        <p>Room Number: <strong>$roomNumber</strong></p>
        <p>Service Date: <strong>$serviceDate</strong></p>
        <p>Service Booked : <strong>$title</strong></p>
        <p>Responsible entity : <strong>Yucatanis</strong></p>
        <p><strong>Passengers</strong></p>
        <p>Adults : $adultCount</p>
        <p>Kids : $kidsCount</p>
        <p>Infants : $infantsCount</p>
        <p>Amount paid : USD $ $formatted_amount</p>
        <p style = 'color: rgba(212, 76, 71, 1);'>This ticket is non-transferable due to insurance policies. Please show a picture ID.</p>
        <p style = 'color: rgba(159, 107, 83, 1);'><i>
        Cancellations within 24 hours of pick-up time: 100% cancellation fee. (exceptions apply depending on the chosen activity).</br>
        <br>Cancellations within 48 hours of pick-up time: 50% cancellation fee. (exceptions depending on the chosen activity).</br>
        We appreciate your understanding.</i></p>
        <p><strong>If you have a special concern or a medical emergency, please contact our customer support ninjas. Contact data at yucatanis.com</strong></p>
        <p>Thank you for your business!</p>
        <p><strong>Yucatanis Yours 🌍 🌏 🌎</strong></p>";
    $params['message'] = $content2;

    $to = "test.ckln@gmail.com";
    $params['subject'] = "Order Complete Confirmation Email";
    $params['attachments'] = [
        [
            'filecontent' => $pdf,
            'filename' => 'Receipt_Tour_Package'.$order_id.'.pdf',
            'filemime' => 'application/pdf'
        ]
    ];

    $langcode = \Drupal::currentUser()->getPreferredLangcode();
    $send = true;
    $result = $mailManager->mail($module, $key, $to, $langcode, $params, NULL, $send);

    if (file_exists($pdf_path)) {
      unlink($pdf_path);
  }

    return;
  }

   // here i have loaded the webform submission- booking_rantal(boat)

   if ($webform_id === 'booking_rental'){
    $data = $webform_submission->getData();
    $adultCount = isset($data['adult_count']) ? $data['adult_count'] : '';
    $kidsCount = isset($data['kids_no']) ? $data['kids_no'] : '';
    $infantsCount = isset($data['infants_no']) ? $data['infants_no'] : '';
    $serviceDate = isset($data['desired_exact_date']) ? $data['desired_exact_date'] : '';
    $timeFrame = isset($data['desired_time_frame_']) ? $data['desired_time_frame_'] : '';

        // Here i have loaded the wbform submission - personal details
        $personalDetails = $this->get_last_webform_submission();
        $personalData = $personalDetails->getData();
        $roomNumber = isset($personalData['room_number']) ? $personalData['room_number'] : '';
        $leadPassenger =  isset($personalData['passenger_name']) ? $personalData['passenger_name'] : '';
        $leadPassengerPhone =  isset($personalData['phone_number']) ? $personalData['phone_number'] : '';
        $pickupHotel = isset($personalData['hotel_s_name_for_pick_up']) ? $personalData['hotel_s_name_for_pick_up'] : '';
        $hotelNotListed = isset($personalData['if_your_beach_hotel_is_not_listed']) ? $personalData['if_your_beach_hotel_is_not_listed'] : '';
        $specialNote = isset($personalData['note']) ? $personalData['note'] : '';

        $product_ids = [];
        foreach ($order_items as $order_item) {
         $purchased_entity = $order_item->getPurchasedEntity();

         $title =$purchased_entity->get('title')->getValue()[0]["value"];

        }

        // here is the billing address
        $billing_profile = $order->getBillingProfile();

        $address = $billing_profile->get('address')->first();

        $billing_information = [
            'first_name' => $address->getGivenName(),
            'last_name' => $address->getFamilyName(),
            'address_line1' => $address->getAddressLine1(),
            'address_line2' => $address->getAddressLine2(),
            'locality' => $address->getLocality(),
            'administrative_area' => $address->getAdministrativeArea(),
            'postal_code' => $address->getPostalCode(),
            'country_code' => $address->getCountryCode(),
        ];

        $first_name = $billing_information['first_name'];
        $last_name = $billing_information['last_name'];
        $fullname = $first_name. ' ' .$last_name;
        $address_line1 = $billing_information['address_line1'];
        $address_line2 = $billing_information['address_line2'];
        $locality = $billing_information['locality'];
        $administrative_area = $billing_information['administrative_area'];
        $postal_code = $billing_information['postal_code'];
        $country_code = $billing_information['country_code'];

        $order_id = $order->get('order_id')->getValue()[0]["value"];
        $oder_load = Order::load($order_id);
        $pikupHotel = $oder_load->get('field_hotel_name')->getValue()[0]["value"] ?? '';
        $pikupTime = $oder_load->get('field_pick_up_time')->getValue()[0]["value"] ?? '';
        $payment_storage = \Drupal::entityTypeManager()->getStorage('commerce_payment');
        $payments = $payment_storage->loadByProperties(['order_id' => $order_id]);
        $payment_method = '';
        if (!empty($payments)) {
          $payment = reset($payments);
          $payment_method = $payment->get('payment_gateway')->entity->label();

      }

      $content1 = "
      <h1>Receipt</h1>
      <p>Invoice Number : {$ReceiptBKNo}{$order_id}</p>
      <p>Date Paid : {$datepaid}</p>
      <p>Payment Method : {$payment_method}</p>
      <p>$ {$formatted_amount} Paid On - {$datepaid}</p>
      <p>Service Booked : {$title}</p>
      <p>Bill To : {$fullname}, {$address_line1}, {$administrative_area}</p>
    ";

    $options = new Options();
    $options->set('isHtml5ParserEnabled', true);
    $options->set('isPhpEnabled', false); // Disable PHP execution in HTML
    $options->set('defaultFont', 'Arial'); // Set a default font
    $dompdf = new Dompdf($options);
    $dompdf->loadHtml($content1);
    $dompdf->setPaper('A4', 'landscape');
    $dompdf->render();

    // Save the PDF to a file
    $tmpdir = 'sites/default/files/tmp';
    $tmp_dir = $_SERVER['DOCUMENT_ROOT']."/".$tmpdir;
    if (!is_writable($tmp_dir)) {
        throw new \Exception("Directory is not writable: " . $tmp_dir);
    }
    $pdf_path = $tmp_dir . '/Receipt_Boat_Package'.$order_id.'.pdf';
    file_put_contents($pdf_path, $dompdf->output());

    if (file_exists($pdf_path) && filesize($pdf_path) > 0) {
        $pdf_content = file_get_contents($pdf_path);
    } else {
        // Handle file creation issue
        throw new \Exception('Failed to create PDF file or file is empty.');
    }
    $pdf = str_replace("\0", '', $pdf_content);

    // here i send email for booking webform submission
    $mailManager = \Drupal::service('plugin.manager.mail');
    $module = "customautocomplete";
    $key = 'custom_order_receipt';
    $content2 = "
        <p><strong>Yucatanis.com</strong></p>
        <p>Date Paid : $datepaid</p>
        <strong><p style = 'color: rgba(203, 145, 47, 1);'>Receipt BK No ID : <span style = 'color: rgba(51, 126, 169, 1);'> $ReceiptBKNo$order_id</span></p></strong>
        <p>Lead Passenger: <strong>$leadPassenger</strong> </p>
        <p>Pick up: <strong>$pikupHotel at $pikupTime HRS </strong></p>
        <p>Room Number: <strong>$roomNumber</strong></p>
        <p>Service Date: <strong>$serviceDate</strong></p>
        <p>Service Booked : <strong>$title</strong></p>
        <p style = 'color: rgba(68, 131, 97, 1);'>Time Frame : $timeFrame HRS.</p>
        <p>Responsible entity : <strong>Yucatanis</strong></p>
        <p><strong>Passengers</strong></p>
        <p>Adults : $adultCount</p>
        <p>Kids : $kidsCount</p>
        <p>Infants : $infantsCount</p>
        <p>Amount paid : USD $ $formatted_amount</p>
        <p style = 'color: rgba(212, 76, 71, 1);'>This ticket is non-transferable due to insurance policies. Please show a picture ID.</p>
        <p style = 'color: rgba(159, 107, 83, 1);'><i>
        Cancellations within 24 hours of pick-up time: 100% cancellation fee. (exceptions apply depending on the chosen activity).</br>
        <br>Cancellations within 48 hours of pick-up time: 50% cancellation fee. (exceptions depending on the chosen activity).</br>
        We appreciate your understanding.</i></p>
        <p><strong>If you have a special concern or a medical emergency, please contact our customer support ninjas. Contact data at yucatanis.com</strong></p>
        <p>Thank you for your business!</p>
        <p><strong>Yucatanis Yours 🌍 🌏 🌎</strong></p>";
    $params['message'] = $content2;

    $to = "test.ckln@gmail.com";
    $params['subject'] = "Order Complete Confirmation Email";
    $params['attachments'] = [
        [
            'filecontent' => $pdf,
            'filename' => 'Receipt_Boat_Package'.$order_id.'.pdf',
            'filemime' => 'application/pdf'
        ]
    ];

    $langcode = \Drupal::currentUser()->getPreferredLangcode();
    $send = true;
    $result = $mailManager->mail($module, $key, $to, $langcode, $params, NULL, $send);

    if (file_exists($pdf_path)) {
      unlink($pdf_path);
  }

    return;
      }
 }


function get_last_webform_submission() {
  $webform_id = 'personal_details';
  $database = \Drupal::service('database');
  $query = $database->select('webform_submission', 's')
    ->fields('s', ['sid'])
    ->condition('s.webform_id', $webform_id)
    ->orderBy('s.created', 'DESC')
    ->range(0, 1)
    ->execute();

  $result = $query->fetchField();

  if ($result) {
    return WebformSubmission::load($result);
  }

  return NULL;
}

}
