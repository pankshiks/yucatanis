<?php

// src/Form/CustomRegistrationForm.php
namespace Drupal\custom_registration_form\Form;
use Drupal\Core\Database\Connection;
use Drupal\user\Entity\User;
use Drupal\Core\Form\FormBase;
use Drupal\Core\Form\FormStateInterface;
use CommerceGuys\Addressing\Subdivision\SubdivisionRepository;
use Drupal\Core\Ajax\AjaxResponse;
use Drupal\Core\Ajax\ReplaceCommand;
use \Datetime;

class CustomRegistrationForm extends FormBase {

  public function getFormId() {
    return 'custom_registration_form';
  }
  public function getFormPrefix($step){
    
    switch ($step) {
      case 1:
   
        break;
      case 2:
       
        break;
      case 3:

        break;
      default:
         return '';
        
        }
}
  
  public function buildForm(array $form, FormStateInterface $form_state) {

    // validation
    $current_step = 'step_1'; 

    // Set the current step in $form_state.
    $form_state->set('step', $current_step);


    //validation
    $form['#prefix'] = $this->getFormPrefix(1);
    if ($form_state->has('page_num') && $form_state->get('page_num') == 2) {

      return $this->PageTwo($form, $form_state);
    }
  
    if ($form_state->has('page_num') && $form_state->get('page_num') == 3) {
      return $this->PageThree($form, $form_state);
    }

        $form['email'] = [
          '#type' => 'email',
          '#title' => $this->t('Email*'),
          '#required' => TRUE,
        ];

        $form['password'] = [
          '#type' => 'password',
          '#title' => $this->t('Password*'),
          '#required' => TRUE,
        ];

        $form['retype_password'] = [
          '#type' => 'password',
          '#title' => $this->t('Re-type Password*'),
          '#required' => TRUE,
        ];
        $form['terms_agreement'] = [
          '#type' => 'checkbox',
          '#title' => $this->t('I agree to Yucatanis’s the Terms of Service'),
          '#default_value'=>$form_state->getValue('terms_agreement',''),
          '#required' => TRUE,
        ];
        $form['actions'] = [
          '#type' => 'actions',
        ];

        $form['actions']['submit'] = [
          '#type' => 'submit',
          '#value' => $this->t('Sign Up'),
          '#submit' => ['::FirstNextSubmit'],
           // Custom validation handler for page 1.
          // '#validate' => ['::fapiExampleMultistepFormNextValidate'],
         
        ];
   

    $form_state->set('page_num', 1);
 

    return $form;
  }

  public function FirstNextSubmit(array &$form, FormStateInterface $form_state) {


    $form_state
      ->set('page_values', [
        // Keep only first step values to minimize stored data.
        'email' => $form_state->getValue('email'),
        'password' => $form_state->getValue('password'),
        'retype_password' => $form_state->getValue('retype_password'),
    
      ])
      ->set('page_num', 2)
   
      ->setRebuild(TRUE);
  }
  // validations for first page

  public function validateForm(array &$form, FormStateInterface $form_state) {

      $current_step = $form_state->get('step');

      if ($current_step === 'step_1') {
      $email = $form_state->getValue('email');
      if(!preg_match("/^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/",$email)) { 
      
        // $form_state->setErrorByName('email', $this->t('Invalid email address.'));
        $this->messenger()->addError('Invalid email address');
        $form_state->setRebuild();
      }
      
      $value = $form_state->getValue('email');

      $existing_account = \Drupal::entityTypeManager()->getStorage('user')->loadByProperties(['mail' => $email]);

      if (!empty($existing_account)) {

      // $form_state->setErrorByName('email',t('The email address is already in use. Please choose a different email.'));
      $this->messenger()->addError('The email address is already in use. Please choose a different email.');
      $form_state->setRebuild();
      }

      if ($value == !\Drupal::service('email.validator')->isValid( $email)) {
      $form_state->setErrorByName(
          'email',
          t('The email address %mail is not valid.', array('%mail' => $value)));
      }  
      $password = $form_state->getValue('password');
      if (strlen($password) < 8  ) {
        // $form_state->setErrorByName('password', t('Password must be at least 8 characters long'));
        $this->messenger()->addError('Password must be at least 8 characters long');
        $form_state->setRebuild();
      }
      
      // if (!preg_match('/[!@#$%^&*()_+{}\[\]:;<>,.?~\\-]/', $password)) {
      //   $form_state->setErrorByName('password', $this->t('The password must contain at least one special character.'));
      // }
      
      $retype_password = $form_state->getValue('retype_password');
      if ($password === $retype_password  ) {
        //$form_state->setErrorByName('retype_password', t('Password matches'));
        $this->messenger()->addStatus('Password matches');
        
      }
      else
      {
        // $form_state->setErrorByName('password', t('Please check Retype Password'));
        $this->messenger()->addError('Please check Retype Password');
        $form_state->setRebuild();
      }
    }
      //Validations for page 2 start 
      if ($current_step === 'step_2') {

        $first_name = $form_state->getValue('first_name');
        if(!preg_match("/^[a-zA-Z\-\ ]+$/",$first_name)) {
          //  $form_state->setErrorByName('first_name', t('Invalid Name'));
           $this->messenger()->addError('Invalid Name');
           $form_state->setRebuild();
          }

        $last_name = $form_state->getValue('last_name');
        if(!preg_match("/^[a-zA-Z\-\ ]+$/",$last_name)) { 
         // $form_state->setErrorByName('first_name', t('Invalid Last Name'));
          $this->messenger()->addError('Invalid Last Name');
          $form_state->setRebuild();
        }
        $date_of_birth = $form_state->getValue('date_of_birth');
        $date = DateTime::createFromFormat('Y-m-d', $date_of_birth);
        $current_date = new DateTime();

        if (!$date || $date > $current_date ) {
          $this->messenger()->addError('Please enter a valid date of birth.');
          $form_state->setRebuild();
        }
        if ($date == $current_date  ) {
          $this->messenger()->addError('You can not enter today date');
          $form_state->setRebuild();
        }

         $phone_number = $form_state->getValue('phone_number');
         if (strlen($form_state->getValue('phone_number')) < 10) {
          // $form_state->setErrorByName('phone_number', $this->t('Mobile number is too short.'));
          $this->messenger()->addError('Mobile number is too short.');
          $form_state->setRebuild();
        }
        if(preg_match('/^[0-9]+$/', $phone_number)) { 
          } else {
            // $form_state->setErrorByName('phone_number', $this->t('Invalid Phone Number'));
            $this->messenger()->addError('Invalid Phone Number');
            $form_state->setRebuild();
          }

      }
       //Validations for page 2 end
       
    }

  // validations end 
  public function PageTwo(array &$form, FormStateInterface $form_state) {
    
    $current_step = 'step_2'; 

    // Set the current step in $form_state.
    $form_state->set('step', $current_step);

   
    $form['first_name'] = [
      '#type' => 'textfield',
      '#title' => $this->t('First Name'),
      '#default_value'=>$form_state->getValue('first_name',''),
      '#required' => TRUE,
    ];

    $form['last_name'] = [
      '#type' => 'textfield',
      '#title' => $this->t('Last Name'),
      '#default_value'=>$form_state->getValue('last_name',''),
      '#required' => TRUE,
    ];

    $form['date_of_birth'] = [
      '#type' => 'date',
      '#title' => $this->t('Date of Birth'),
      '#default_value'=>$form_state->getValue('date_of_birth',''),
      '#required' => TRUE,
    ];

    $form['phone_number'] = [
      '#type' => 'tel',
      '#title' => $this->t('Phone Number'),
      '#default_value'=>$form_state->getValue('phone_number',''),
      '#required' => TRUE,
    ];


    $form['back'] = [
      '#type' => 'submit',
      '#value' => $this->t('Back'),
      // Custom submission handler for 'Back' button.
      '#submit' => ['::PageTwoBack'],
      // We won't bother validating the required 'color' field, since they
      // have to come back to this page to submit anyway.
      '#limit_validation_errors' => [],
    ];
    $form['submit'] = [
      '#type' => 'submit',
      '#button_type' => 'primary',
      '#value' => $this->t('Next'),
      '#attributes' => array(
        'class' => array('btn btn-secondary w-100')
      ),
      '#submit' => ['::SecondNextSubmit']
    ];
    $form['#prefix'] = $this->getFormPrefix(2);
   
  
    return $form;
  }
  

  public function SecondNextSubmit(array &$form, FormStateInterface $form_state) {
    $name = $form_state->get('page_values');



    $form_state
      ->set('page_values', [
        'first_name' => $form_state->getValue('first_name'),
        'last_name' => $form_state->getValue('last_name'),
        'date_of_birth' => $form_state->getValue('date_of_birth'),
        'phone_number' => $form_state->getValue('phone_number'),
        'email' => $name['email'],
        'password' => $name['retype_password'],
  
      ])
      ->set('page_num', 3)
      
      ->setRebuild(TRUE);
  }

  public function PageThree(array &$form, FormStateInterface $form_state) {
    
    $current_step = 'step_3'; 

    // Set the current step in $form_state.

    $form['country'] = [
      '#type' => 'select',
      '#title' => $this->t('Country'),
      '#options' => \Drupal::service('country_manager')->getList(),
      '#default_value'=>$form_state->getValue('country',''),
      '#required' => TRUE,
      '#ajax' => [
        'callback' => '::myAjaxCallback', // don't forget :: when calling a class method.
        'event' => 'change',
        'wrapper' => 'edit-output', // This element is updated with this AJAX callback.
      ]
    ];
    $form['city'] = [
      '#type' => 'textfield',
      '#title' => t('City'),
      '#required' => true,
    ];
    // dd($form['country']['#options']);

    $form_state->set('step', $current_step);
  

    $form['state'] = [
      '#type' => 'select',
      '#title' =>$this->t('STATE'),
      '#default_value' =>$form_state->getValue('state', 'default_value'),
      '#options' =>['0'=>'None'],  
      '#required' => TRUE,
      '#prefix' => '<div id="edit-output">',
      '#suffix' => '</div>',
      '#validated' => TRUE,
    ];

    $form['city'] = [
      '#type' => 'textfield',
      '#title' => t('City'),
      '#required' => true,
    ];

    // $databaseConnection = \Drupal::database();
    // $query = $databaseConnection->select('node_field_data', 'n')
    // ->fields('n', ['title'])
    // ->condition('type','hotel_information');
    // $result = $query->execute();
    // $titles = [];


    // foreach ($result as $row) {
    //   $titles[] = $row->title;
    // }
  
    // $hotels = ['Hotel A', 'Hotel B', 'Hotel C'];
    // $form['hotel'] = [
    //   '#type' => 'select',
    //   '#title' => $this->t('Select Hotel'),
    //   '#options' => $titles,
    //   '#required' => TRUE,
    // ];


    $form['back'] = [
      '#type' => 'submit',
      '#value' => $this->t('Back'),
      '#submit' => ['::PageThreeBack'],
      // We won't bother validating the required 'color' field, since they
      // have to come back to this page to submit anyway.
      '#limit_validation_errors' => [],
    ];
    $form['submit'] = [
      '#type' => 'submit',
      '#button_type' => 'primary',
      '#attributes' => array(
        'class' => array('btn btn-secondary w-100')
      ),
      '#value' => $this->t('Finish Sign Up'),
    ];
    $form['#prefix'] = $this->getFormPrefix(3);
   
  
    return $form;
  }


  public function myAjaxCallback(&$form, \Drupal\Core\Form\FormStateInterface $form_state) {

    $selected_value = $form_state->getValue('country');
  
    $subdivisionRepository = new SubdivisionRepository();
    $states = $subdivisionRepository->getList([$selected_value]);//get list of states
    
    if (!empty($states)) {

      $form['state']['#options'] = $states;
    } else {

      $form['state']['#options'] = ['0' => $this->t('No states')];
    }

    $response = new AjaxResponse();
    $response->addCommand(new ReplaceCommand('#edit-output', $form['state']));
  
    return $response;

    }
  
  public function submitForm(array &$form, FormStateInterface $form_state) {
    
    $page_values = $form_state->get('page_values');
    $first_name = $page_values['first_name'];
    $last_name = $page_values['last_name'];
    $date_of_birth = $page_values['date_of_birth'];
    $ph_no = $page_values['phone_number'];
    
    $subdivisionRepository = new SubdivisionRepository();
    $states = $subdivisionRepository->getAll(['BR']);

    foreach ($states as $state) {
      $municipalities = $state->getChildren();
    }

    $state = $form_state->getValue('state');
    //$state = $form_state->getValue('hotel');
    $city = $form_state->getValue('city');
    // $hotel_key = $form_state->getValue('hotel');
    // $hotel_value = $form['hotel']['#options'][$hotel_key];

    
    $email = $page_values['email'];
    $password = $page_values['password'];
    $user = User::create();
    $key_Country = $form_state->getValue('country');

    $country_list =\Drupal::service('country_manager')->getList();

foreach($country_list as $key=>$value){
$array_country[]=$key;
}   
    $country = $form['country']['#options'][$key_Country]->__toString();
    
    $keys = array_search($key_Country,$array_country);
   $user_load = \Drupal\user\Entity\User::load(1);
  //  dd($user_load);
    $user->set('name',$email);
    $user->set('pass',$password); 
    $user->set('mail',$email);
    $user->set('field_first_name',$first_name);
    $user->set('field_last_name',$last_name);
    $user->set('field_phone_number',$ph_no);
    $user->set('field_date_of_birth',$date_of_birth);
    $user->set('field_country',$country);
    $user->set('field_state',$state);
    $user->set('field_city',$city);
    // $user->set('field_hotel',$hotel_value);
    // $user->enforceIsNew();
    $user->activate();
    $user->save();
    _user_mail_notify('register_no_approval_required', $user);
    _user_mail_notify('email_verification', $user);
    
      \Drupal::messenger()->addStatus('Registration done Successsfully');

 }

 public function PageTwoBack(array &$form, FormStateInterface $form_state) {
  $form_state
  
    ->setValues($form_state->get('page_values'))
    ->set('page_num', 1)

    ->setRebuild(TRUE);
}

public function PageThreeBack(array &$form, FormStateInterface $form_state) {
  $form_state

    ->setValues($form_state->get('page_values'))
    ->set('page_num', 2)

    ->setRebuild(TRUE);
}
}