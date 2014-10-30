#!/usr/bin/env python
#coding:utf-8

import tornado.web

import sys
reload(sys)
sys.setdefaultencoding('utf-8')

class OptionForm(tornado.web.RequestHandler):
    def post(self):
        website = self.get_argument("website")
        self.render("info.html",web=website)
