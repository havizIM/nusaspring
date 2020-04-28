<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Stock_card extends CI_Controller {

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
        redirect('maintenance');
        // $this->load->view(strtolower($this->roles).'/stock_card/data');
    }
}
