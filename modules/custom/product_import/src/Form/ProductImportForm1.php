<?php

namespace Drupal\product_import\Form;

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
use Drupal\node\Entity\Node;



class ProductImportForm1 extends FormBase {

  public function getFormId() {
    return 'product_import_form';
  }
  
  
  public function buildForm(array $form, FormStateInterface $form_state) {
    $form = array(
      '#attributes' => array('enctype' => 'multipart/form-data'),
    );
    $validators = array(
      'file_validate_extensions' => array('xlsx'),
    );
    $form['excel_file'] = [
      '#type' => 'managed_file',
      '#title' => t('File *'),
      '#size' => 20,
      '#description' => t('Excel format only .xlsx'),
      '#upload_validators' => $validators,
      '#upload_location' => 'public://',
    ];

    $form['example_excel_file'] = [
      '#type' => 'markup',
      '#markup' => '<a href="/sites/default/files/essential_product.xlsx" download>Download Excel</a>',
      '#attributes' => ['class' => ['btn-primary']],
    ];

    $form['submit'] = [
      '#type' => 'submit',
      '#value' => $this->t('Import products essential'),
      '#button_type' => 'primary',
    ];

    return $form;
  }
  
  public function validateForm(array &$form, FormStateInterface $form_state) {    
    if ($form_state->getValue('excel_file') == NULL) {
      $form_state->setErrorByName('excel_file', $this->t('upload proper File'));
    }
  }
  public function submitForm(array &$form, FormStateInterface $form_state) {
    $file = \Drupal::entityTypeManager()->getStorage('file')
    ->load($form_state->getValue('excel_file')[0]);
    
    $full_path = $file->get('uri')->value;
    $file_name = basename($full_path);
    
    $inputFileName = \Drupal::service('file_system')->realpath('public://'.$file_name);
		
		$spreadsheet = IOFactory::load($inputFileName);
		
		$sheetData = $spreadsheet->getActiveSheet();
		
		$rows = array();
		foreach ($sheetData->getRowIterator() as $row) {

			$cellIterator = $row->getCellIterator();
			$cellIterator->setIterateOnlyExistingCells(FALSE); 
			$cells = [];
			foreach ($cellIterator as $cell) {
				$cells[] = $cell->getValue();
      }
      $rows[] = $cells;
    
    }
    // Get the header values from the first row.
    $header_value = $rows[0];
    foreach($rows as $key=>$value){
      if($key>0 && !empty($value[0])){   
        $operations[] = ['Upload_product_essential',
        [$value],
        ];          
      }
		}
    $batch = [
      'title' => $this->t('Uploading product with batch processing...'),
      'operations' => $operations,
    ];
    batch_set($batch);
  }
}
