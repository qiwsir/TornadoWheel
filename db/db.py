#!/usr/bin/env python
#coding:utf-8

import pymongo

import sys
reload(sys)
sys.setdefaultencoding("utf-8")


#connect with mongodb
conn = pymongo.Connection("localhost", 27017)

#connect with collection
db = conn.genetest.tordb

#dbcoll = db.tordb

#lastdb = db.genedoc_mygene_20141019_efqag2hg
#newdb = db.genedoc_mygene_20141026_g6svo5ct

