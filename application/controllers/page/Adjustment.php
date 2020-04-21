<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Adjustment extends CI_Controller {

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
		$this->load->view(strtolower($this->roles).'/adjustment/data');
    }
    
    public function detail($id)
	{
		$data['id'] = $id;
		$this->load->view(strtolower($this->roles).'/adjustment/detail', $data);
    }
    
	public function add()
	{
		$this->load->view(strtolower($this->roles).'/adjustment/add');
    }
    
	public function edit($id)
	{
		$data['id'] = $id;
		$this->load->view(strtolower($this->roles).'/adjustment/edit', $data);
	}
}
