<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Selling_payment extends CI_Controller {

    function __construct()
    {
		parent::__construct();
        $this->load->library('session');
        $this->roles = $this->session->userdata('roles');
        
        if(!$this->session->has_userdata('logged_in')){
            redirect('unauthenticated');
        }

    }
    
	public function index()
	{
		$this->load->view(strtolower($this->roles).'/selling_payment/data');
    }
    
    public function detail($id)
	{
		$data['id'] = $id;
		$this->load->view(strtolower($this->roles).'/selling_payment/detail', $data);
    }
    
	public function add()
	{
		$this->load->view(strtolower($this->roles).'/selling_payment/add');
	}

	public function add_with_selling($id)
	{
		$data['id'] = $id;
		$this->load->view(strtolower($this->roles).'/selling_payment/add_with_selling', $data);
	}

	public function edit($id)
	{
		$data['id'] = $id;
		$this->load->view(strtolower($this->roles).'/selling_payment/edit', $data);
	}
    
	
}
