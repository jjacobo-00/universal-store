<?php
    namespace App\Models;
    use CodeIgniter\Model;

    class ProductsModel extends Model {
        protected $table = 'tbl_products';
        protected $allowedFields = [
            'id',
            'product_num',
            'date'
          ];
        protected $db;

        public function __construct() {
            parent::__construct();
            $this->db = \Config\Database::connect();
        }

        public function getAllProducts() {
            $builder = $this->db->table('tbl_products');
            $builder->select('tbl_products.*,  tbl_products_info.product_name, tbl_products_info.product_description, tbl_products_info.product_srp');
            $builder->join('tbl_products_info', 'tbl_products.product_num  = tbl_products_info.product_num ', 'left');
            $builder->where('tbl_products_info.status', '1');
            $builder->orderBy('tbl_products.date', 'DESC');
            // $builder->groupBy('tbl_sm_job_centre_member.employee_code');
            $query = $builder->get();
              
            return $query->getResultArray();
        }
    }
?>