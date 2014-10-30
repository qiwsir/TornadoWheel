#!/usr/bin/env python
#coding:utf-8

import tornado.web

import sys
reload(sys)
sys.setdefaultencoding('utf-8') 

class IndexHandler(tornado.web.RequestHandler):
    def get(self):
        lst = ["python","www.itdiffer.com","qiwsir@gmail.com"]
        self.render("index.html", info=lst)

