<?php

namespace App\Controllers;

class Home extends BaseController
{
    public function index()
    {
        // return view('welcome_message');

        $page = 'index';
        $pageHeadData = array (
            'siteName' => 'Universal Store',
            'pageTitle' => 'index'
        );
        $pageFooterData = array (
            'siteName' => 'Universal Store',
            'pageTitle' => 'index'
        );

        return   view('templates/header', ['pageHeadData' => $pageHeadData])
                .view('index.php')
                .view('templates/footer', $pageFooterData);
    }
}
