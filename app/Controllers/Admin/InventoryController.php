<?php

namespace App\Controllers\Admin;
use App\Controllers\BaseController;

class InventoryController extends BaseController
{
    public function __construct() {
        $this->Inventory_model = model('App\Models\admin\Inventory_model');
    }

    public function index() {
        $page = 'Inventory';
        // $model = $this->Inventory_model->get()->getResultArray();
        $pageHeadData = array (
            'siteName' => 'Universal Store',
            'pageTitle' => $page,
        );
        $pageBodyData = array (
            'floor' => 2,
            'title' => 'Inventory',
            'link' => '/inventory',
        );
        $pageFooterData = array (
            'creator' => 'Jefferson A. Jacobo'
        );

        return   view('templates/header', ['pageHeadData' => $pageHeadData])
                .view('inventory.php', ['pageBodyData' => $pageBodyData])
                .view('templates/footer', $pageFooterData);
    }

    public function getAllProducts() {
        try {
            $sort = $this->request->getPost('sort');
            $result = $this->Inventory_model->getAllProducts($sort);
        } catch (\Throwable $th) {
            $result = [
                'statusCode' => $e->getCode(),
                'msg' => $e->getMessage()
            ];
        }
        return $this->response->setJSON($result);
    }

    public function editProduct() {
        try {
            $id = $this->request->getPost('product_num');
            $name = $this->request->getPost('title');
            $description = $this->request->getPost('description');

            $num = $this->Inventory_model->editProduct($id, $name, $description);
            $result = [
                'success' => $num,
                'msg' => $name . ' Update Success'
            ];
        } catch (\Throwable $th) {
            $result = [
                'statusCode' => $e->getCode(),
                'msg' => $e->getMessage()
            ];
        }
        return $this->response->setJSON($result);
    }
}