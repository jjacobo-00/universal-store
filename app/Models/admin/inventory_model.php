<?php
    namespace App\Models;
    use CodeIgniter\Model;

    class ProductsModel extends Model {
        protected $table = 'tbl_products_info';
        protected $allowedFields = [
            'product_num ',
            'product_name',
            'product_description',
            'product_qty',
            'product_srp',
            'status'
          ];
        protected $db;

        public function __construct() {
            parent::__construct();
            $this->db = \Config\Database::connect();
        }

        public function getAllProducts($sort) {
            $builder = $this->db->table('tbl_products');
            $builder->select('tbl_products.*,  tbl_products_info.product_name, tbl_products_info.product_description,  tbl_products_info.product_qty, tbl_products_info.product_srp')
                    ->join('tbl_products_info', 'tbl_products.product_num  = tbl_products_info.product_num ', 'left')
                    ->where('tbl_products_info.status', '1')
                    ->where('tbl_products_info.product_qty!=', '0')
                    ->orderBy('tbl_products.date', $sort);
                    // ->groupBy('tbl_sm_job_centre_member.employee_code');
            $query = $builder->get();
              
            return $query->getResultArray();
        }

        public function editProduct($productID, $name, $description) {
            $builder = $this->db->table('tbl_products_info');
            $builder->where(['product_num' => $productID])
                    ->set(['product_name' => $name, 'product_description' => $description])
                    ->update();
            return $this->db->affectedRows();
        }

        public function deleteProduct($productID, $status) {
            $builder = $this->db->table('tbl_products_info');
            $builder->where(['product_num' => $productID])
                    ->set(['status' => $status])
                    ->update();
            return $this->db->affectedRows();
        }
    }
?>