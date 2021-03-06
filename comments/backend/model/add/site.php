<?php
namespace Commentics;

class AddSiteModel extends Model
{
    public function add($data)
    {
        $this->db->query("INSERT INTO `" . CMTX_DB_PREFIX . "sites` SET `name` = '" . $this->db->escape($data['name']) . "', `domain` = '" . $this->db->escape($data['domain']) . "', `url` = '" . $this->db->escape($data['url']) . "', `iframe_enabled` = '" . (isset($data['iframe_enabled']) ? 1 : 0) . "', `new_pages` = '" . (isset($data['new_pages']) ? 1 : 0) . "', `from_name` = '" . $this->db->escape($data['from_name']) . "', `from_email` = '" . $this->db->escape($data['from_email']) . "', `reply_email` = '" . $this->db->escape($data['reply_email']) . "', `date_modified` = NOW(), `date_added` = NOW()");
    }
}
