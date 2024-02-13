<?php

namespace Drupal\hotel_import\Form;

use Drupal\Core\Form\FormBase;
use Drupal\Core\Form\FormStateInterface;
use League\Csv\Reader;
use PhpOffice\PhpSpreadsheet\Spreadsheet;
use PhpOffice\PhpSpreadsheet\IOFactory;
use PhpOffice\PhpSpreadsheet\Style\Fill;
use PhpOffice\PhpSpreadsheet\Cell\DataType;
use PhpOffice\PhpSpreadsheet\Style\Alignment;
use PhpOffice\PhpSpreadsheet\Style\Border;
use Symfony\Component\HttpFoundation\File\UploadedFile;
use Drupal\commerce_product\Entity\Product;
use Drupal\node\Entity\Node;
use Drupal\paragraphs\Entity\Paragraph;

class HotelImportFormTime extends FormBase {

  public function getFormId() {
    return 'hotel_import_form_time';
  }

  public function buildForm(array $form, FormStateInterface $form_state) {
    // Set the form attributes for file upload.
    $form = array(
      '#attributes' => array('enctype' => 'multipart/form-data'),
    );

    // Set up file validators for file upload.
    $validators = array(
      'file_validate_extensions' => array('xlsx'),
    );

    // Add the managed file field to upload the Excel file.
    $form['excel_file'] = [
      '#type' => 'managed_file',
      '#title' => t('File *'),
      '#size' => 200,
      '#description' => t('Excel format only'),
      '#upload_validators' => $validators,
      '#upload_location' => 'public://',
    ];

    // Add the submit button.
    $form['submit'] = [
      '#type' => 'submit',
      '#value' => $this->t('Import Hotels Time'),
      '#button_type' => 'primary',
    ];

    return $form;
  }
  public function validateForm(array &$form, FormStateInterface $form_state) {    
    if ($form_state->getValue('excel_file') == NULL) {
      $form_state->setErrorByName('excel_file', $this->t('Please Upload a file'));
    }
  }
  public function submitForm(array &$form, FormStateInterface $form_state) {
    // Load the uploaded file entity.
    $file = \Drupal::entityTypeManager()->getStorage('file')
      ->load($form_state->getValue('excel_file')[0]);

    // Get the full path and file name.
    $full_path = $file->get('uri')->value;
    $file_name = basename($full_path);

    // Get the absolute path of the uploaded file.
    $inputFileName = \Drupal::service('file_system')->realpath('public://' . $file_name);

    // Load the Excel spreadsheet.
    $spreadsheet = IOFactory::load($inputFileName);
    $sheetData = $spreadsheet->getActiveSheet();
    $rows = array();

    // Iterate through each row in the spreadsheet.
    foreach ($sheetData->getRowIterator() as $row) {
      $cellIterator = $row->getCellIterator();
      $cellIterator->setIterateOnlyExistingCells(FALSE);
      $cells = [];
      // Iterate through each cell in the row.
      foreach ($cellIterator as $cell) {
        $cells[] = $cell->getValue();
      }
      $rows[] = $cells;
    }

    // Get the header values from the first row.
    $header_value = $rows[0];

    // Iterate through each header value.
    foreach ($header_value as $key => $value) {
      // Query for the product ID based on the title.
      $id = \Drupal::entityTypeManager()->getStorage('commerce_product')->getQuery()
        ->condition('title', $value)
        ->accessCheck(FALSE)
        ->range(0, 1);
      $result = $id->execute();

    $firstValue = reset($result);
   
    $operations[] = ['Upload_time',
    [$firstValue,$rows,$key],
    ];

    }
    // Setup and define batch informations.
$batch = [
  'title' => $this->t('Migrating Image to Media with batch processing...'),
  'operations' => $operations,
];

batch_set($batch);
  }
}
