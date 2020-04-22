<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Stock_opname extends CI_Controller {

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
		$this->load->view(strtolower($this->roles).'/stock_opname/data');
    }
    
    public function detail($id)
	{
		$data['id'] = $id;
		$this->load->view(strtolower($this->roles).'/stock_opname/detail', $data);
    }
    
	public function add()
	{
		$this->load->view(strtolower($this->roles).'/stock_opname/add');
    }
    
	public function edit($id)
	{
		$data['id'] = $id;
		$this->load->view(strtolower($this->roles).'/stock_opname/edit', $data);
	}
}
