#!/usr/bin/evn python
#coding:utf-8

import MySQLdb

import sys
reload(sys)
sys.setdefaultencoding('utf-8') 

con = MySQLdb.connect(host='localhost',user='root', passwd='123123', db='weixin_public',charset='utf8')

cur = con.cursor()

cur_dict = con.cursor(cursorclass=MySQLdb.cursors.DictCursor) 
