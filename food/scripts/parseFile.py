import sys
import json


#
# jsonobj FORMAT:
# { 'title' : 'blah',
#   'content' :
#       [
#           {'filename' : 'blah.jpg', 'text' : 'this is how i blah'},
#           {'filename' : 'blarg.jpg', 'text' : 'this is me blarging'}
#       ]
# }
#


#Get input file
if (len(sys.argv) != 2):
  print('need file to parse')
  sys.exit()


jsonobj = {}
filename = sys.argv[1]
with open(filename) as f:
    content = f.readlines()





#First line is always the title
title = content[0].strip()
jsonobj['title'] = title
jsonobj['content'] = []
#In a loop, we parse "%n:" to start a new slide, create a link to %n.jpg, and print everything after it until the next %n as text in the subsection
i = 0
while (i < len(content)-1):
    i = i + 1
    #If the line is empty, add \n to the text
    if (len(content[i].strip()) == 0 or content[i] == '\n'):
        jsonobj['content'][-1]['text'] += '\n'
        continue
    #Check if this is a new section, defined by line ending in ':'
    if (content[i].strip()[-1] == ':'):
        section = content[i].strip()[0:-1]
        filename = ('%s.jpg' % section)
        newjsonobj = {'file' : filename, 'text' : ''}
        jsonobj['content'].append(newjsonobj)
        continue
    #Otherwise, this is not a new section, add to the text of that section
    #If this is throwing an error, you don't have a ":" at the end of the second line of your input file
    jsonobj['content'][-1]['text'] += content[i]

print('Final jsonobj: %s' % jsonobj)
underscore_title = title.replace(" ", "_")
f = open('%s.json' % underscore_title, 'w')
if (f):
    f.write(json.dumps(jsonobj))
