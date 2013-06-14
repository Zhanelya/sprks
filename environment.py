"""
Now separated settings from environment.
Environment takes care of the system objects that need to be used by many modules
"""

__author__ = 'mruskov'

import web

# Now assuming that views directory is fixed.
# It is invisible to the code which renderer is used
# the only difference is in the import line, e.g. use it as follows:
#
#   from environment import render_private as render
#   render.score(8,2,3)
#
render_private = web.template.render('views/', base='index')
render_public = web.template.render('views/', base='index_prelogin')

try:
    settings = __import__('settings')
    # Assuming that only MySQL is used
    db = web.database(dbn='mysql',
        user=getattr(settings,'dbuser'),
        pw=getattr(settings,'dbpw'),
        db=getattr(settings,'dbname'))
except ImportError, AttributeError:
    # Default DB credentials
    db = web.database(dbn='mysql',
        user='root',
        pw='1234',
        db='sprks')
