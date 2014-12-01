#!/usr/bin/env python
#coding:utf-8

import tornado.web

import sys
reload(sys)
sys.setdefaultencoding('utf-8') 

class IndexHandler(tornado.web.RequestHandler):
    def get(self):
        lst = "welcome you." 
        self.render("index.html", info=lst)

