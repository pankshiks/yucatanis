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
use Drupal\node\Entity\Node;


class HotelImportForm extends FormBase {

  public function getFormId() {
    return 'hotel_import_form';
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
      '#description' => t('Excel format only'),
      '#upload_validators' => $validators,
      '#upload_location' => 'public://',
    ];
    
    $form['submit'] = [
      '#type' => 'submit',
      '#value' => $this->t('Import Hotels'),
      '#button_type' => 'primary',
    ];

    return $form;
  }
  
  public function validateForm(array &$form, FormStateInterface $form_state) {    
    if ($form_state->getValue('excel_file') == NULL) {
      $form_state->setErrorByName('excel_file', $this->t('Please upload a file'));
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

    foreach($rows as $row){
     
			$values = \Drupal::entityQuery('node')->condition('title',$row[0])->execute();
  
      $term_name =$row[1];
      $vid = 'location';
      
      $vocabulary = \Drupal\taxonomy\Entity\Vocabulary::load($vid);
   
      if ($vocabulary) {
        
        $query = \Drupal::entityQuery('taxonomy_term');
        $query->condition('name', $row[1]);
        $query->condition('vid', $vocabulary->id());
        $tids = $query->execute();
        $terms = \Drupal\taxonomy\Entity\Term::loadMultiple($tids);

        }

        if( !empty($terms)){
        $term_val=array_values($terms);
        $term_value=$term_val[0]->id();
      }else{
        $term_val=array_values($terms);
        $term_value=118;
      }
 
			$node_not_exists = empty($values);
			if($node_not_exists && !empty($row[0])){

        $node = Node::create(array(
          'type' => 'hotel_information',
          'title' => $row[0],
          'field_location'=>[$term_value],

        ));
        
				$node->save();
        \Drupal::messenger()->addMessage('Hotel information imported successfully');
			}else{
        $node = \Drupal\node\Entity\Node::load(66);

	      $term_name =$row[1];
        $vid = 'location';
        $vocabulary = \Drupal\taxonomy\Entity\Vocabulary::load($vid);
 
      if ($vocabulary) {
        
        $query = \Drupal::entityQuery('taxonomy_term');
        $query->condition('name', $row[1]);
        $query->condition('vid', $vocabulary->id());
        $tids = $query->execute();
        $terms = \Drupal\taxonomy\Entity\Term::loadMultiple($tids);
      
      } 
      
      $term_val=array_values($terms);

     if( !empty($term_val) && !empty($row[0]) ){
    
				$nid = reset($values);
				$node = \Drupal\node\Entity\Node::load($nid);
				$node->setTitle($row[0]);
				$node->set('field_location',$term_val[0]->id());
				$node->save();
      
     }
     \Drupal::messenger()->addMessage('Hotel information updated successfully');
			}
		}
  
  }
}
