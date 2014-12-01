#!/usr/bin/env python
#coding:utf-8

import tornado.web

from db.db import *

import sys
reload(sys)
sys.setdefaultencoding('utf-8')

class QueryGene(tornado.web.RequestHandler):
    def post(self):
        pos_start = self.get_argument("posstart")
        pos_end = self.get_argument("posend")
        genechr = self.get_argument("genechr")
        vartype = self.get_argument("vartype")
        generef = self.get_argument("generef")
#根据值，组装查询条件，即向字典中插入key:value
        pos_find = db.find({"pos":{"$gte":int(pos_start), "$lte":int(pos_end)}})
        self.render("query.html", result=pos_find)
