<?php

namespace App\Controllers\Admin;
use App\Controllers\BaseController;

class OrderController extends BaseController
{
    public function __construct() {
        $this->Order_model = model('App\Models\admin\Order_model');
    }

    public function index() {
        $page = 'Inventory';
        // $model = $this->Order_model->get()->getResultArray();
        $pageHeadData = array (
            'siteName' => 'Universal Store',
            'pageTitle' => $page,
        );
        $pageBodyData = array (
            'floor' => 2,
            'title' => 'Order',
            'link' => '/order',
        );
        $pageFooterData = array (
            'creator' => 'Jefferson A. Jacobo'
        );

        return   view('templates/header', ['pageHeadData' => $pageHeadData])
                .view('order.php', ['pageBodyData' => $pageBodyData])
                .view('templates/footer', $pageFooterData);
    }

    public function getAllOrders() {
        try {
            $sort = $this->request->getPost('sort');
            $result = $this->Order_model->getAllOrders($sort);
        } catch (\Throwable $th) {
            $result = [
                'statusCode' => $e->getCode(),
                'msg' => $e->getMessage()
            ];
        }
        return $this->response->setJSON($result);
    }
}