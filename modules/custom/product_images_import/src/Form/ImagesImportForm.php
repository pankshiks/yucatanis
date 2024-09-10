<?php

namespace Drupal\product_images_import\Form;

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
use Drupal\media\Entity\Media;
use Drupal\file\Entity\File;
use Drupal\Core\StreamWrapper\PublicStream;
use Drupal\Core\Url;
use Drupal\Core\Utility\UrlHelper;
use Drupal\Core\File\FileSystemInterface;
use Drupal\image\Entity\ImageStyle;

class ImagesImportForm extends FormBase {

  public function getFormId() {
    return 'product_images_import_form';
  }
  
  
  public function buildForm(array $form, FormStateInterface $form_state) {
  
    $options = [
      'boat_rentals' => t('Boat Rental'),
      'essential_rarities' => t('Essential Rarities'),
      'shop_classic_experiences' => t('Shop Classic Experiences'),
    ];
    $form['option'] = [
      '#type' => 'select',
      '#title' => t('Select an option'),
      '#options' => $options,
      '#required' => TRUE,
    ];
  
    // Add a submit button.
    $form['submit'] = [
      '#type' => 'submit',
      '#value' => t('Submit'),
    ];

    $form['submit'] = [
      '#type' => 'submit',
      '#value' => $this->t('Import Images Products '),
      '#button_type' => 'primary',
    ];

    return $form;
  }
  
  public function validateForm(array &$form, FormStateInterface $form_state) {    
  }

  public function submitForm(array &$form, FormStateInterface $form_state) {
    $type =  $form_state->getValue('option');
    $dirPath = 'public://migrate/product_images/'.$type;
    $processedTitles = [];
    $files = scandir($dirPath);
    //dd($files);
    // $x = 0;
    $batch = [
      'title' => $this->t('Migrating Product Image with batch processing...'),
      'operations' => [],
    ];
    
    foreach ($files as $key => $file) {
      if ($file === '.' || $file === '..' || strpos($file, '.') === 0){
        continue;
       }
       $images = scandir($dirPath.'/'.$file);
      
       $imagePath = [];
      if (!empty($images)) {
        foreach ($images as $key => $ImageFileName) {
          $allowed_ext = ['jpg','JPEG','png','webp'];
          if (in_array(pathinfo($ImageFileName, PATHINFO_EXTENSION),$allowed_ext)){
            $VaridaitonFolderPath = realpath($dirPath.'/'.$file);
            $imagePaths = $VaridaitonFolderPath.'/'.$ImageFileName;
            $imagePath[] =  $file.$imagePaths;
          } 
        }
        $files = $this->SaveLocalFile($dirPath, $imagePath);
        $value = \Drupal::entityQuery('commerce_product')->condition('title',$file)->accessCheck(TRUE)->execute();
        $pid = reset($value);
        if (!$pid) {
          return false; 
        }
        $operations[] = ['upload_product_images', 
          [$pid,$files],
        ];

        $batch = [
          'title' => $this->t('Migrating Product Image with batch processing...'),
          'operations' => $operations,
        ];
    
        batch_set($batch);   
      }
    }

  }

  public function SaveLocalFile($dirPath, $filePaths)
  {
    $dir = 'public://migrate/product_images/';
    $medias = [];
    foreach ($filePaths as $key => $filePath) {
      $filename = $dirPath."/".$filePath;
      $file_system = \Drupal::service('file_system');
      $image_data = file_get_contents($filename);
      $fileRepository = \Drupal::service('file.repository');
      $fileRepository->writeData($image_data, $dir.basename($filename), FileSystemInterface::EXISTS_REPLACE);
      $file = File::create([
        'filename' => basename($filename),
        'uri' => $dir.basename($filename),
        'status' => 1,
        'uid' => 1,
      ]);
      $file->save();

      $image_media = Media::create([
        'bundle' => 'image',
        'uid' => 1,
        'langcode' => 'en',
        'status' => 1,
        'field_media_image' => [
          'target_id' => $file->id(),
          'alt' => t('My media alt attribute'),
          'title' => t('My media title attribute'),
        ],
       ]);
      $image_media->save(); 
      $medias[]['target_id'] =  $image_media->id();
    }
    return $medias;
  }
}

