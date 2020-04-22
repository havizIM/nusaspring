<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Purchase_payment extends CI_Controller {

    function __construct()
    {
		parent::__construct();
        $this->load->library('session');
        $this->roles = $this->session->userdata('roles');
        
        // if(!$this->session->has_userdata('logged_in')){
        //     redirect('login');
        // }

    }
    
	public function index()
	{
		$this->load->view(strtolower($this->roles).'/purchase_payment/data');
    }
    
    public function detail($id)
	{
		$data['id'] = $id;
		$this->load->view(strtolower($this->roles).'/purchase_payment/detail', $data);
    }
    
	public function add()
	{
		$this->load->view(strtolower($this->roles).'/purchase_payment/add');
		
	}

	public function add_with_purchase($id)
	{
		$data['id'] = $id;
		$this->load->view(strtolower($this->roles).'/purchase_payment/add_with_purchase', $data);
	}
    
	public function edit($id)
	{
		$data['id'] = $id;
		$this->load->view(strtolower($this->roles).'/purchase_payment/edit', $data);
	}


}
