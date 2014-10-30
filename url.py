#!/usr/bin/env python
#coding:utf-8

import sys
reload(sys)
sys.setdefaultencoding('utf-8')

from handler.index import IndexHandler
from handler.optform import OptionForm
url=[
    (r'/', IndexHandler),
    (r'/option', OptionForm),

    ]
