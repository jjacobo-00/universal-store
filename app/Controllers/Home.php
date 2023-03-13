<?php

namespace App\Controllers;
use CodeIgniter\Controller;
use App\Models\admin\ProductsModel;

class Home extends BaseController
{
    public function __construct(){
        // $this->Inventory_model = model('App\Models\admin\products_model');
    }

    public function index()
    {
        // return view('welcome_message');

        $page = 'index';
        // $model = model(ProductsModel::class);
        // $model = $this->Inventory_model->get()->getResultArray();
        $pageHeadData = array (
            'siteName' => 'Universal Store',
            'pageTitle' => 'index',
        );
        $pageBodyData = array (
            'floor' => 1,
            'title' => 'Dashboard',
            'link' => '/',
        );
        $pageFooterData = array (
            'creator' => 'Jefferson A. Jacobo'
        );

        return   view('templates/header', ['pageHeadData' => $pageHeadData])
                .view('index.php', ['pageBodyData' => $pageBodyData])
                .view('templates/footer', $pageFooterData);
    }
}
