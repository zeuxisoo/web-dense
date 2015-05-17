<?php
namespace App\Services;

use League\Fractal\Manager;
use League\Fractal\TransformerAbstract;
use League\Fractal\Resource\Item;
use League\Fractal\Resource\Collection;
use League\Fractal\Resource\ResourceInterface;
use League\Fractal\Pagination\IlluminatePaginatorAdapter;
use Illuminate\Pagination\AbstractPaginator as IlluminateAbstractPaginator;

class FractalService {

    private $manager;

    public function __construct(Manager $manager) {
        $this->manager = $manager;
    }

    public function getManager() {
        return $this->manager;
    }

    public function item($item, TransformerAbstract $transformer, $resource_key = null) {
        $resource = new Item($item, $transformer, $resource_key);

        return $this->createResponse($resource);
    }

    public function collection($items, TransformerAbstract $transformer, $resource_key = null) {
        $resources = new Collection($items, $transformer, $resource_key);

        if ($items instanceof IlluminateAbstractPaginator) {
            $this->createPaginatorAdapter($resources, $items);
        }

        return $this->createResponse($resources);
    }

    private function createPaginatorAdapter(Collection $collection, IlluminateAbstractPaginator $paginator) {
        $collection->setPaginator(new IlluminatePaginatorAdapter($paginator));
    }

    private function createResponse(ResourceInterface $resource) {
        $data = $this->manager->createData($resource);

        return response()->make($data->toArray());
    }

}
