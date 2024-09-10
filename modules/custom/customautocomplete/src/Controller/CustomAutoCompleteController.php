<?php

namespace Drupal\customautocomplete\Controller;

use Drupal\Core\Controller\ControllerBase;
use Drupal\Core\DependencyInjection\ContainerInjectionInterface;
use Symfony\Component\DependencyInjection\ContainerInterface;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Drupal\Core\Entity\EntityTypeManagerInterface;

/**
 * Controller for the customautocomplete module.
 */
class CustomAutoCompleteController extends ControllerBase implements ContainerInjectionInterface {

  /**
   * The entity type manager service.
   *
   * @var \Drupal\Core\Entity\EntityTypeManagerInterface
   */
  protected $entityTypeManager;

  /**
   * CustomAutoCompleteController constructor.
   *
   * @param \Drupal\Core\Entity\EntityTypeManagerInterface $entityTypeManager
   *   The entity type manager service.
   */
  public function __construct(EntityTypeManagerInterface $entityTypeManager) {
    $this->entityTypeManager = $entityTypeManager;
  }

  /**
   * {@inheritdoc}
   */
  public static function create(ContainerInterface $container) {
    return new static(
      $container->get('entity_type.manager')
    );
  }

  /**
   * Returns the autocomplete suggestions.
   *
   * @param string $field_hotel_info_target_id
   *   The field value from the route parameter.
   *
   * @return \Symfony\Component\HttpFoundation\JsonResponse
   *   The JSON response containing autocomplete suggestions.
   */
  public function autocompleteCallback(Request $request) {

    $results = [];
    $input = $request->query->get('q');

    if (!$input) {
      return new JsonResponse($results);
    }
          $query = \Drupal::database()->select('node_field_data', 'n');
          $query->fields('n', ['nid']);
          $query->fields('n', ['title']);
          $query->condition('n.type', 'hotel_information', '=');

          $query->condition('n.title', '%' . $input . '%', 'LIKE');
          $result = $query->execute();
          $hotel = $result->fetchAll();

              $titles = [];

              foreach ($hotel as $item) {
              $titles[] = $item->title;
              }
          $suggestions =  $titles;

    return new JsonResponse($suggestions);

  }

}

