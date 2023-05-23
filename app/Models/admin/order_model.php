<?php
    namespace App\Models;
    use CodeIgniter\Model;

    class OrdersModel extends Model {
        // protected $table = 'tbl_products_info';
        // protected $allowedFields = [
        //     'product_num ',
        //     'product_name',
        //     'product_description',
        //     'product_srp',
        //     'status'
        //   ];
        protected $db;

        public function __construct() {
            parent::__construct();
            $this->db = \Config\Database::connect();
        }

    }
?>